import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { elapsedDays } from '../src/timer-policy.mjs';

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
  if (!Array.isArray(v.checks) || v.checks.length > 20 || v.checks.some(x => typeof x !== 'boolean') || !object(v.answers) || Object.keys(v.answers).length > 40) throw new AppError(400, '自查或面试记录格式不正确');
  text(v.notes, 100000); text(v.code, 300000);
  for (const [key, answer] of Object.entries(v.answers)) {
    if (!/^q([1-9]|[12]\d|3\d|40)$/.test(key) || !object(answer) || !['review', 'mastered'].includes(answer.status)) throw new AppError(400, '面试回答格式不正确');
    text(answer.text, 30000);
  }
  return v;
}
function validateSession(s, id) {
  if (!object(s) || ![1,2].includes(s.schemaVersion) || s.id !== id || !['auto', 'manual'].includes(s.source) || !Number.isInteger(s.revision) || s.revision < 1 || typeof s.deleted !== 'boolean' || !Number.isFinite(s.durationMs) || s.durationMs < 0 || !object(s.days)) throw new AppError(400, '计时记录格式不正确');
  if(s.schemaVersion===2){uuid(s.clientId);if(!Number.isFinite(s.startedAt)||s.startedAt<946684800000||!(s.endedAt===null||Number.isFinite(s.endedAt)&&s.endedAt>=s.startedAt))throw new AppError(400,'起止时间格式不正确');}
  lessonId(s.lessonId); text(s.note, 10000);
  let total = 0;
  for (const [date, ms] of Object.entries(s.days)) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(ms) || ms < 0) throw new AppError(400, '每日计时格式不正确'); total += ms; }
  if (Math.abs(total - s.durationMs) > 1) throw new AppError(400, '计时合计不一致');
  return s;
}

export class LearningStore {
  constructor(root, now = () => Date.now()) { this.root = path.resolve(root); this.now = now; this.queue = Promise.resolve(); this.activeElapsed = null; }
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
  startElapsed(data) {
    return this.exclusive(async()=>{
      uuid(data.clientId);uuid(data.sessionId);lessonId(data.lessonId);
      const now=this.now();
      if(!Number.isFinite(data.startedAt)||data.startedAt<946684800000||data.startedAt>now+5000)throw new AppError(400,'开始时间无效');
      const file=`sessions/${data.sessionId}.json`;
      const existing=await this.read(file,null,v=>validateSession(v,data.sessionId));
      if(existing&&(existing.clientId!==data.clientId||existing.lessonId!==data.lessonId||existing.startedAt!==data.startedAt))throw new AppError(409,'计时编号已使用');
      if(!this.activeElapsed){
        for(const old of await this.sessions())if(old.schemaVersion===2&&old.endedAt===null&&old.id!==data.sessionId)await this.write(`sessions/${old.id}.json`,{...old,endedAt:old.startedAt+old.durationMs,revision:old.revision+1,updatedAt:new Date(now).toISOString()});
      }
      if(existing){
        if(existing.endedAt!==null)return {acquired:false,record:existing};
        if(!this.activeElapsed)this.activeElapsed={id:existing.id,clientId:existing.clientId,startedAt:existing.startedAt};
        return {acquired:this.activeElapsed.id===existing.id,record:existing};
      }
      const stale=this.activeElapsed&&this.activeElapsed.startedAt>data.startedAt;
      if(this.activeElapsed&&!stale){
        const oldId=this.activeElapsed.id;
        const previous=await this.read(`sessions/${oldId}.json`,null,v=>validateSession(v,oldId));
        // Do not invent time after a potentially crashed page. A live old page
        // may send its final cumulative value, bounded by this takeover.
        if(previous)await this.write(`sessions/${oldId}.json`,{...previous,endedAt:Math.max(previous.startedAt+previous.durationMs,data.startedAt),revision:previous.revision+1,updatedAt:new Date(now).toISOString()});
      }
      const record={schemaVersion:2,id:data.sessionId,clientId:data.clientId,lessonId:data.lessonId,startedAt:data.startedAt,endedAt:stale?this.activeElapsed.startedAt:null,source:'auto',revision:1,durationMs:0,days:{},note:'打开课程至退出页面',createdAt:new Date(now).toISOString(),updatedAt:new Date(now).toISOString(),deleted:false};
      await this.write(file,record);if(!stale)this.activeElapsed={id:record.id,clientId:record.clientId,startedAt:record.startedAt};return {acquired:!stale,record};
    });
  }
  updateElapsed(data,recover=false) {
    return this.exclusive(async()=>{
      uuid(data.clientId);uuid(data.sessionId);
      if(!Number.isFinite(data.elapsedMs)||data.elapsedMs<0||typeof data.ended!=='boolean')throw new AppError(400,'累计时长格式不正确');
      const file=`sessions/${data.sessionId}.json`;
      let current=await this.read(file,null,v=>validateSession(v,data.sessionId));
      if(!current&&recover){
        lessonId(data.lessonId);const now=this.now();
        if(!Number.isFinite(data.startedAt)||data.startedAt<946684800000||data.startedAt>now+5000||data.elapsedMs>Math.max(0,now-data.startedAt)+5000)throw new AppError(400,'恢复计时的起止时间无效');
        // A failed first start can be recovered as a finished historical record.
        // This operation never takes ownership away from an actually live tab.
        const durationMs=Math.floor(data.elapsedMs);
        current={schemaVersion:2,id:data.sessionId,clientId:data.clientId,lessonId:data.lessonId,startedAt:data.startedAt,endedAt:data.startedAt+durationMs,source:'auto',revision:1,durationMs,days:elapsedDays(data.startedAt,durationMs),note:'恢复已测量的未保存计时',createdAt:new Date(now).toISOString(),updatedAt:new Date(now).toISOString(),deleted:false};
        await this.write(file,current);return {acquired:false,record:current};
      }
      if(!current||current.schemaVersion!==2||current.clientId!==data.clientId)throw new AppError(409,'本次计时不存在，请重新打开课程');
      const now=this.now();
      if(data.elapsedMs>Math.max(0,now-current.startedAt)+5000)throw new AppError(400,'累计时间超出实际经过时间');
      if(current.endedAt!==null&&!data.ended)return {acquired:false,record:current};
      const limit=current.endedAt===null?Infinity:current.endedAt-current.startedAt;
      const durationMs=Math.max(current.durationMs,Math.floor(Math.min(limit,data.elapsedMs)));
      const endedAt=current.endedAt??(data.ended?current.startedAt+durationMs:null);
      const changed=durationMs!==current.durationMs||endedAt!==current.endedAt;
      const record=changed?{...current,durationMs,days:elapsedDays(current.startedAt,durationMs),endedAt,revision:current.revision+1,updatedAt:new Date(now).toISOString()}:current;
      if(changed)await this.write(file,record);
      if(data.ended&&this.activeElapsed?.id===current.id)this.activeElapsed=null;
      if(!recover&&!data.ended&&record.endedAt===null&&!this.activeElapsed)this.activeElapsed={id:current.id,clientId:current.clientId,startedAt:current.startedAt};
      if(!data.ended&&this.activeElapsed?.id!==current.id)return {acquired:false,record};
      return {acquired:!data.ended&&record.endedAt===null,record};
    });
  }
}
