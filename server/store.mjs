import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export class AppError extends Error {
  constructor(status, message, details) { super(message); this.status = status; this.details = details; }
}
export const lessonId = value => {
  if (typeof value !== 'string' || !/^lesson-(0[1-9]|[12]\d|3[0-2])$/.test(value)) throw new AppError(400, '无效课程编号');
  return value;
};
const uuid = value => {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) throw new AppError(400, '无效记录编号');
  return value;
};
const text = (v, limit) => { if (typeof v !== 'string' || v.length > limit) throw new AppError(400, '文本格式或长度不正确'); return v; };
const object = v => v && typeof v === 'object' && !Array.isArray(v);
const dateKey = time => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(time));
export const hkDate = dateKey;
export const emptyLesson = id => ({ schemaVersion: 1, id, revision: 0, completed: false, historical: false, checks: [], notes: '', code: '', answers: {}, updatedAt: null });
export function validateLesson(v, id) {
  if (!object(v) || v.schemaVersion !== 1 || v.id !== id || !Number.isInteger(v.revision) || v.revision < 0 || typeof v.completed !== 'boolean' || typeof v.historical !== 'boolean') throw new AppError(400, '课程记录格式不正确');
  if (!Array.isArray(v.checks) || v.checks.length > 20 || v.checks.some(x => typeof x !== 'boolean') || !object(v.answers) || Object.keys(v.answers).length > 10) throw new AppError(400, '自查或面试记录格式不正确');
  text(v.notes, 100000); text(v.code, 300000);
  for (const [key, answer] of Object.entries(v.answers)) {
    if (!/^q[1-5]$/.test(key) || !object(answer) || !['review', 'mastered'].includes(answer.status)) throw new AppError(400, '面试回答格式不正确');
    text(answer.text, 30000);
  }
  return v;
}
function validateSession(s, id) {
  if (!object(s) || s.schemaVersion !== 1 || s.id !== id || !['auto', 'manual'].includes(s.source) || !Number.isInteger(s.revision) || s.revision < 1 || typeof s.deleted !== 'boolean' || !Number.isFinite(s.durationMs) || s.durationMs < 0 || !object(s.days)) throw new AppError(400, '计时记录格式不正确');
  lessonId(s.lessonId); text(s.note, 10000);
  let total = 0;
  for (const [date, ms] of Object.entries(s.days)) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(ms) || ms < 0) throw new AppError(400, '每日计时格式不正确'); total += ms; }
  if (Math.abs(total - s.durationMs) > 1) throw new AppError(400, '计时合计不一致');
  return s;
}

export class LearningStore {
  constructor(root, now = () => Date.now()) { this.root = path.resolve(root); this.now = now; this.queue = Promise.resolve(); this.lease = null; }
  exclusive(fn) { const result = this.queue.then(fn); this.queue = result.catch(() => {}); return result; }
  async read(file, fallback, validate = v => v) {
    try { return validate(JSON.parse(await fs.readFile(path.join(this.root, file), 'utf8'))); }
    catch (error) {
      if (error.code === 'ENOENT') return fallback;
      throw new AppError(503, `无法读取 ${file}，请修复文件后重试，现有文件未覆盖。`, { file });
    }
  }
  async write(file, data) {
    const target = path.join(this.root, file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    const temp = `${target}.${randomUUID()}.tmp`;
    try { await fs.writeFile(temp, JSON.stringify(data, null, 2) + '\n', { flag: 'wx' }); await fs.rename(temp, target); }
    catch (error) { await fs.unlink(temp).catch(() => {}); throw new AppError(503, '文件保存失败，请保留草稿并重试。'); }
  }
  async getLesson(id) { lessonId(id); return this.read(`lessons/${id}.json`, emptyLesson(id), v => validateLesson(v, id)); }
  async getProfile() {
    return this.read('profile.json', { schemaVersion: 1, recoveryDismissed: false, restored: false }, v => {
      if (!object(v) || v.schemaVersion !== 1 || typeof v.recoveryDismissed !== 'boolean' || typeof v.restored !== 'boolean') throw new Error('Invalid profile'); return v;
    });
  }
  async sessions() {
    let names; try { names = await fs.readdir(path.join(this.root, 'sessions')); } catch (e) { if (e.code === 'ENOENT') return []; throw e; }
    const records = [];
    for (const name of names.filter(n => n.endsWith('.json'))) {
      const id = uuid(name.slice(0, -5));
      records.push(await this.read(`sessions/${name}`, null, v => validateSession(v, id)));
    }
    return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  async state() {
    const lessons = {};
    for (let n = 1; n <= 32; n++) { const id = `lesson-${String(n).padStart(2, '0')}`; lessons[id] = await this.getLesson(id); }
    return { profile: await this.getProfile(), lessons, sessions: await this.sessions() };
  }
  saveLesson(id, incoming) {
    return this.exclusive(async () => {
      lessonId(id); validateLesson(incoming, id);
      const current = await this.getLesson(id);
      if (incoming.revision !== current.revision) throw new AppError(409, '另一页面已修改本课，请先比较版本。你的草稿已保留。', { current });
      const next = { ...incoming, revision: current.revision + 1, updatedAt: new Date(this.now()).toISOString() };
      await this.write(`lessons/${id}.json`, next); return next;
    });
  }
  recover(restore) {
    return this.exclusive(async () => {
      const profile = await this.getProfile();
      // Validate all targets before changing any file. A corrupt record is never replaced.
      const records = await Promise.all(Array.from({ length: 13 }, (_, i) => this.getLesson(`lesson-${String(i + 1).padStart(2, '0')}`)));
      if (restore && !profile.restored) for (const record of records) {
        if (!record.completed) await this.write(`lessons/${record.id}.json`, { ...record, completed: true, historical: true, revision: record.revision + 1, updatedAt: new Date(this.now()).toISOString() });
      }
      const next = { ...profile, recoveryDismissed: true, restored: profile.restored || restore };
      await this.write('profile.json', next); return next;
    });
  }
  manual(data, id = randomUUID()) {
    return this.exclusive(async () => {
      uuid(id); lessonId(data.lessonId);
      const date = text(data.date, 10);
      const parsed = new Date(`${date}T00:00:00+08:00`).getTime();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed) || hkDate(parsed) !== date || date > hkDate(this.now()) || date < '2000-01-01') throw new AppError(400, '请选择有效日期，不能补记未来时间。');
      if (!Number.isInteger(data.minutes) || data.minutes < 1 || data.minutes > 1440) throw new AppError(400, '分钟数应为 1 到 1440 的整数');
      text(data.note, 10000);
      const existing = await this.read(`sessions/${id}.json`, null, v => validateSession(v, id));
      if (existing && existing.source !== 'manual') throw new AppError(400, '自动记录不能改写为补记');
      if ((existing?.revision ?? 0) !== data.revision) throw new AppError(409, '时间记录已有新版本，请刷新统计后重试。');
      const durationMs = data.minutes * 60000;
      const next = { schemaVersion: 1, id, lessonId: data.lessonId, source: 'manual', revision: (existing?.revision ?? 0) + 1, durationMs, days: { [date]: durationMs }, note: data.note, createdAt: existing?.createdAt ?? new Date(this.now()).toISOString(), updatedAt: new Date(this.now()).toISOString(), deleted: false };
      await this.write(`sessions/${id}.json`, next); return next;
    });
  }
  deleteSession(id, revision) {
    return this.exclusive(async () => {
      uuid(id); const s = await this.read(`sessions/${id}.json`, null, v => validateSession(v, id));
      if (!s) throw new AppError(404, '记录不存在');
      if (s.source !== 'manual') throw new AppError(400, '仅能删除手动补记');
      if (s.revision !== revision) throw new AppError(409, '记录已修改，请刷新后重试');
      const next = { ...s, deleted: true, revision: s.revision + 1, updatedAt: new Date(this.now()).toISOString() };
      await this.write(`sessions/${id}.json`, next); return next;
    });
  }
  claim(clientId, id) {
    return this.exclusive(async () => {
      uuid(clientId); lessonId(id);
      const now = this.now();
      if (this.lease && now < this.lease.expires && this.lease.clientId !== clientId) return { acquired: false };
      if (this.lease?.clientId === clientId && this.lease.lessonId === id && now < this.lease.expires) return { acquired: true, sessionId: this.lease.id, seq: this.lease.seq };
      const sessionId = randomUUID();
      const record = { schemaVersion: 1, id: sessionId, lessonId: id, source: 'auto', revision: 1, durationMs: 0, days: {}, note: '', createdAt: new Date(now).toISOString(), updatedAt: new Date(now).toISOString(), deleted: false };
      await this.write(`sessions/${sessionId}.json`, record);
      this.lease = { id: sessionId, lessonId: id, clientId, last: now, expires: now + 25000, seq: 0 };
      return { acquired: true, sessionId, seq: 0 };
    });
  }
  pulse(data) {
    return this.exclusive(async () => {
      uuid(data.clientId); uuid(data.sessionId);
      const lease = this.lease; const now = this.now();
      if (!lease || lease.clientId !== data.clientId || lease.id !== data.sessionId || now > lease.expires) { if (lease?.id === data.sessionId) this.lease = null; return { acquired: false }; }
      if (!Number.isInteger(data.seq) || data.seq < 1 || !Number.isFinite(data.deltaMs) || data.deltaMs < 0 || data.deltaMs > 20000 || typeof data.release !== 'boolean') throw new AppError(400, '心跳格式不正确');
      const record = await this.read(`sessions/${lease.id}.json`, null, v => validateSession(v, lease.id));
      if (!record) throw new AppError(503, '计时文件缺失，请重新开始计时。');
      if (data.seq <= lease.seq) return { acquired: true, record }; // Retry is idempotent.
      if (data.seq !== lease.seq + 1) throw new AppError(409, '计时序号不连续，请重新开始');
      const ms = Math.floor(Math.max(0, Math.min(data.deltaMs, now - lease.last, 20000)));
      const days = { ...record.days };
      const start = now - ms;
      if (dateKey(start) === dateKey(now)) days[dateKey(now)] = (days[dateKey(now)] ?? 0) + ms;
      else {
        const midnight = new Date(`${dateKey(now)}T00:00:00+08:00`).getTime();
        days[dateKey(start)] = (days[dateKey(start)] ?? 0) + midnight - start;
        days[dateKey(now)] = (days[dateKey(now)] ?? 0) + now - midnight;
      }
      const next = { ...record, durationMs: record.durationMs + ms, days, revision: record.revision + 1, updatedAt: new Date(now).toISOString() };
      await this.write(`sessions/${lease.id}.json`, next);
      lease.seq = data.seq; lease.last = now; lease.expires = now + 25000;
      if (data.release) this.lease = null;
      return { acquired: !data.release, record: next };
    });
  }
}
