import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import { createApiServer } from './http.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const production = process.argv.includes('--production');
const port = Number(process.env.PORT || 5173);
let vite;
if (!production) {
  const { createServer } = await import('vite');
  vite = await createServer({ root, server: { middlewareMode: true, hmr: { port: port + 1, host: '127.0.0.1' }, fs: { strict: true, allow: [root] } }, appType: 'spa' });
}
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };
const { server } = createApiServer({
  dataRoot: process.env.LAB_DATA_DIR || path.join(root, 'learning-data'),
  fallback: vite ? vite.middlewares : async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
      const dist = path.join(root, 'dist');
      const target = path.resolve(dist, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!target.startsWith(dist + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
      let file;
      try { file = await fs.readFile(target); } catch { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' }); res.end(file);
    } catch { res.writeHead(400); res.end('Bad request'); }
  }
});
server.on('error', async error => { console.error(error.code === 'EADDRINUSE' ? `端口 ${port} 已被占用，请使用已运行的网站或先停止它。` : error.message); await vite?.close(); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`\n  引擎学堂 · C++ ENGINE LAB\n  Local: http://127.0.0.1:${port}\n  学习数据: ${process.env.LAB_DATA_DIR || path.join(root, 'learning-data')}\n  Ctrl+C 停止。请停止网站后再执行 Git 同步。\n`));
async function close() { server.close(); await vite?.close(); process.exit(0); }
process.on('SIGINT', close); process.on('SIGTERM', close);
