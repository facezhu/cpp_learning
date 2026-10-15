import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import { LearningStore } from '../server/store.mjs';
async function fixture(t){const root=await fs.mkdtemp(path.join(os.tmpdir(),'engine-elapsed-'));t.after(()=>{assert.ok(root.startsWith(path.join(os.tmpdir(),'engine-elapsed-')));return fs.rm(root,{recursive:true,force:true});});let time=Date.parse('2026-10-15T23:59:50+08:00');return {root,store:new LearningStore(root,()=>time),now:()=>time,advance:ms=>time+=ms};}
function opening(f,lessonId='lesson-14'){return {clientId:randomUUID(),sessionId:randomUUID(),lessonId,startedAt:f.now()};}
function update(o,elapsedMs,ended=false){return {clientId:o.clientId,sessionId:o.sessionId,elapsedMs,ended};}
test('hours of elapsed time include sleep and persist across a server restart',async t=>{
  const f=await fixture(t),o=opening(f);await f.store.startElapsed(o);f.advance(7200000);
  const {record}=await f.store.updateElapsed(update(o,7200000));assert.equal(record.durationMs,7200000);assert.equal(Object.keys(record.days).length,2);
  const restarted=new LearningStore(f.root,f.now);f.advance(15000);assert.equal((await restarted.updateElapsed(update(o,7215000))).record.durationMs,7215000);
});
test('cumulative retries and reordered checkpoints never count twice',async t=>{
  const f=await fixture(t),o=opening(f);await f.store.startElapsed(o);f.advance(45000);
  await f.store.updateElapsed(update(o,45000));await f.store.updateElapsed(update(o,45000));await f.store.updateElapsed(update(o,15000));
  assert.equal((await f.store.sessions())[0].durationMs,45000);
});
test('opening another lesson takes ownership, with the previous final save bounded by takeover',async t=>{
  const f=await fixture(t),a=opening(f);await f.store.startElapsed(a);f.advance(10000);const b=opening(f,'lesson-15');await f.store.startElapsed(b);f.advance(5000);
  assert.equal((await f.store.updateElapsed(update(a,15000))).acquired,false);
  assert.equal((await f.store.updateElapsed(update(a,15000,true))).record.durationMs,10000);
  await f.store.updateElapsed(update(b,5000));assert.equal((await f.store.sessions()).reduce((s,r)=>s+r.durationMs,0),15000);
  assert.equal((await f.store.startElapsed(a)).acquired,false);
});
test('a delayed old start cannot steal ownership from a more recent course',async t=>{
  const f=await fixture(t),old=opening(f);f.advance(1000);const current=opening(f,'lesson-16');await f.store.startElapsed(current);
  assert.equal((await f.store.startElapsed(old)).acquired,false);f.advance(1000);assert.equal((await f.store.updateElapsed(update(current,1000))).acquired,true);
  assert.equal((await f.store.updateElapsed(update(old,2000,true))).record.durationMs,1000);
});
test('normal exit then reload starts a new session and never fills the closed interval',async t=>{
  const f=await fixture(t),a=opening(f);await f.store.startElapsed(a);f.advance(12000);await f.store.updateElapsed(update(a,12000,true));
  f.advance(3600000);const b=opening(f);await f.store.startElapsed(b);f.advance(3000);await f.store.updateElapsed(update(b,3000,true));
  assert.equal((await f.store.sessions()).reduce((s,r)=>s+r.durationMs,0),15000);
});
test('a crashed page only keeps checkpoints; restart and new page do not guess downtime',async t=>{
  const f=await fixture(t),a=opening(f);await f.store.startElapsed(a);f.advance(15000);await f.store.updateElapsed(update(a,15000));
  f.advance(86400000);const restarted=new LearningStore(f.root,f.now);const b=opening(f,'lesson-20');await restarted.startElapsed(b);
  const old=(await restarted.sessions()).find(s=>s.id===a.sessionId);assert.equal(old.durationMs,15000);assert.equal(old.endedAt,a.startedAt+15000);
  assert.equal((await restarted.updateElapsed(update(a,86415000))).acquired,false);
});
test('elapsed updates validate ownership, negative and impossible future values',async t=>{
  const f=await fixture(t),a=opening(f);await f.store.startElapsed(a);
  await assert.rejects(f.store.updateElapsed(update(a,-1)),{status:400});await assert.rejects(f.store.updateElapsed(update(a,60000)),{status:400});
  await assert.rejects(f.store.updateElapsed({...update(a,0),clientId:randomUUID()}),{status:409});
});
test('all 18 answers persist alongside existing q1 notes without a data reset',async t=>{
  const f=await fixture(t),original=await f.store.getLesson('lesson-14');const answers=Object.fromEntries(Array.from({length:18},(_,i)=>[`q${i+1}`,{text:`note ${i+1}`,status:i?'review':'mastered'}]));
  await f.store.saveLesson(original.id,{...original,answers});assert.equal(Object.keys((await new LearningStore(f.root).getLesson(original.id)).answers).length,18);
});
test('opening a homepage tab and replaying a checkpoint does not end the live owner',async t=>{
  const f=await fixture(t),a=opening(f);await f.store.startElapsed(a);f.advance(15000);
  await f.store.updateElapsed({...a,...update(a,15000)},true);
  f.advance(15000);const reply=await f.store.updateElapsed(update(a,30000));assert.equal(reply.acquired,true);assert.equal(reply.record.endedAt,null);assert.equal(reply.record.durationMs,30000);
});
test('a failed initial start recovers measured time without taking a live tab ownership',async t=>{
  const f=await fixture(t),unsaved=opening(f);f.advance(10000);
  const live=opening(f,'lesson-15');await f.store.startElapsed(live);f.advance(5000);
  const recovery=await f.store.updateElapsed({...unsaved,...update(unsaved,10000,true)},true);
  assert.equal(recovery.record.durationMs,10000);assert.equal(recovery.record.endedAt,unsaved.startedAt+10000);
  assert.equal((await f.store.updateElapsed(update(live,5000))).acquired,true);
  f.advance(86400000);assert.equal((await f.store.updateElapsed({...unsaved,...update(unsaved,10000,true)},true)).record.durationMs,10000);
});
