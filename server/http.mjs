import http from 'node:http';
import { randomBytes } from 'node:crypto';
import { LearningStore, AppError } from './store.mjs';

export function createApiServer({ dataRoot, now, fallback } = {}) {
  const store = new LearningStore(dataRoot, now);
  const token = randomBytes(32).toString('hex');
  const server = http.createServer(async (req, res) => {
    const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(body)); };
    try {
      const host = req.headers.host ?? '';
      if (!/^(127\.0\.0\.1|localhost):\d+$/.test(host)) throw new AppError(403, '仅允许本机访问');
      const url = new URL(req.url, `http://${host}`);
      if (!url.pathname.startsWith('/api/')) { if (fallback) return fallback(req, res); return send(404, { error: 'Not found' }); }
      const origin = req.headers.origin;
      if (origin && origin !== `http://${host}`) throw new AppError(403, '不允许跨来源访问');
      if (req.method === 'GET' && url.pathname === '/api/state') return send(200, { ...await store.state(), token });
      if (req.method === 'GET' && url.pathname === '/api/export') return send(200, { schemaVersion: 1, exportedAt: new Date().toISOString(), ...await store.state() });
      if (!['POST', 'PUT', 'DELETE'].includes(req.method)) throw new AppError(404, '接口不存在');
      if (req.headers['x-lab-token'] !== token) throw new AppError(403, '页面会话已过期，请刷新网站。草稿会保留。');
      if (!req.headers['content-type']?.startsWith('application/json')) throw new AppError(415, '需要 JSON 请求');
      let body = ''; let size = 0;
      for await (const chunk of req) { size += chunk.length; if (size > 1500000) throw new AppError(413, '记录内容过大'); body += chunk; }
      let data; try { data = JSON.parse(body || '{}'); } catch { throw new AppError(400, 'JSON 格式不正确'); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new AppError(400, '请求格式不正确');
      const lesson = url.pathname.match(/^\/api\/lessons\/(lesson-\d{2})$/);
      if (req.method === 'PUT' && lesson) return send(200, await store.saveLesson(lesson[1], data));
      if (req.method === 'POST' && url.pathname === '/api/recover') {
        if (typeof data.restore !== 'boolean') throw new AppError(400, '恢复参数格式不正确');
        return send(200, await store.recover(data.restore));
      }
      if (req.method === 'POST' && url.pathname === '/api/timer/claim') return send(200, await store.claim(data.clientId, data.lessonId));
      if (req.method === 'POST' && url.pathname === '/api/timer/pulse') return send(200, await store.pulse(data));
      const session = url.pathname.match(/^\/api\/sessions\/([a-f0-9-]+)$/i);
      if (session && req.method === 'PUT') return send(200, await store.manual(data, session[1]));
      if (session && req.method === 'DELETE') return send(200, await store.deleteSession(session[1], data.revision));
      throw new AppError(404, '接口不存在');
    } catch (error) { send(error.status ?? 500, { error: error.status ? error.message : '本地服务发生错误，请保留草稿并重试。', details: error.details }); }
  });
  return { server, store };
}
