import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { LearningStore, hkDate } from '../server/store.mjs';
import { lessons } from '../src/content/curriculum.mjs';

async function fixture(t,now) { const root=await fs.mkdtemp(path.join(os.tmpdir(),'engine-lab-test-'));t.after(()=>{assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep+'engine-lab-test-'));return fs.rm(root,{recursive:true,force:true});});return {root,store:new LearningStore(root,now)}; }
test('32 complete, uniquely numbered lessons and coherent visual frames',()=>{
  assert.equal(lessons.length,32);assert.equal(new Set(lessons.map(l=>l.id)).size,32);
  lessons.forEach((l,i)=>{assert.equal(l.n,i+1);assert.ok(l.sections.length>=4);assert.equal(l.questions.length,l.n<=8?10:l.n===14?18:l.n<=26?14:12);assert.ok(l.lecture.length>=8);assert.ok(l.lecture.filter(s=>s.code).length>=4);assert.ok(l.frames.length>=3);assert.ok(l.tasks.length>=3);assert.ok(l.memory.rule);assert.ok(l.memory.trap);assert.ok(l.files.length);assert.ok(l.starterFiles.length);for(const f of l.frames){assert.ok(f.explanation);assert.ok(f.nodes.length>=3);for(const line of f.lines)assert.ok(line>0&&line<=l.code.split('\n').length,`${l.id}: visual line ${line}`);}});
});
test('save, restart, revision conflict and invalid path',async t=>{
  const {root,store}=await fixture(t);const initial=await store.getLesson('lesson-14');
  const saved=await store.saveLesson('lesson-14',{...initial,notes:'虚函数根据真实类型分派',checks:[true,false],answers:{q1:{text:'通过基类引用调用',status:'mastered'}}});
  assert.equal(saved.revision,1);assert.equal((await new LearningStore(root).getLesson('lesson-14')).notes,saved.notes);
  await assert.rejects(store.saveLesson('lesson-14',{...initial,notes:'stale'}),{status:409});
  await assert.rejects(store.getLesson('../profile'),{status:400});
  assert.equal((await store.getLesson('lesson-14')).notes,saved.notes);
});
test('completion-only updates preserve hidden legacy notes, answers, checks and code',async t=>{
  const {root,store}=await fixture(t);const original=await store.getLesson('lesson-14');
  const legacy={notes:'旧笔记仍属于学习档案',code:'// 自己保存的解答',checks:[true,false,true],answers:{q1:{text:'已有回答',status:'mastered'},q2:{text:'复习笔记',status:'review'}}};
  const saved=await store.saveLesson(original.id,{...original,...legacy});
  await store.saveLesson(saved.id,{...saved,completed:true,historical:false});
  const reloaded=await new LearningStore(root).getLesson(saved.id);
  assert.equal(reloaded.completed,true);
  for(const key of Object.keys(legacy))assert.deepEqual(reloaded[key],legacy[key],key);
});

test('corrupt JSON is never overwritten; all recovery targets prevalidated',async t=>{
  const {root,store}=await fixture(t);await fs.mkdir(path.join(root,'lessons'));await fs.writeFile(path.join(root,'lessons/lesson-02.json'),'{broken');
  await assert.rejects(store.state(),{status:503});await assert.rejects(store.recover(true),{status:503});
  assert.equal(await fs.readFile(path.join(root,'lessons/lesson-02.json'),'utf8'),'{broken');
  await assert.rejects(fs.access(path.join(root,'lessons/lesson-01.json')));
});
test('write failure does not report success or replace existing data',async t=>{
  const {root,store}=await fixture(t);const current=await store.getLesson('lesson-01');await fs.writeFile(path.join(root,'lessons'),'not a directory');
  await assert.rejects(store.saveLesson('lesson-01',{...current,notes:'unsaved'}));assert.equal(await fs.readFile(path.join(root,'lessons'),'utf8'),'not a directory');
});
test('history recovery preserves edits and never fabricates time',async t=>{
  const {store}=await fixture(t);const r=await store.getLesson('lesson-03');await store.saveLesson(r.id,{...r,notes:'existing note'});
  await store.recover(true);const state=await store.state();assert.equal(Object.values(state.lessons).filter(l=>l.completed).length,13);assert.equal(state.lessons['lesson-14'].completed,false);assert.equal(state.lessons['lesson-03'].notes,'existing note');assert.equal(state.sessions.length,0);
  await store.recover(true);assert.equal((await store.getLesson('lesson-03')).revision,2);
});
test('manual times validate dates and minutes, edit and soft-delete',async t=>{
  const {store}=await fixture(t,()=>new Date('2026-10-15T12:00:00+08:00').getTime());const id=randomUUID();
  const values={lessonId:'lesson-14',date:'2026-10-15',minutes:25,note:'VS Code',revision:0};
  const s=await store.manual(values,id);assert.equal(s.durationMs,1500000);assert.equal(s.days['2026-10-15'],1500000);
  await assert.rejects(store.manual({...values,date:'2026-02-30'},randomUUID()),{status:400});await assert.rejects(store.manual({...values,date:'2026-10-16'},randomUUID()),{status:400});
  await assert.rejects(store.manual({...values,minutes:0},randomUUID()),{status:400});await assert.rejects(store.manual(values,id),{status:409});
  const edited=await store.manual({...values,minutes:40,revision:1},id);assert.equal(edited.durationMs,2400000);const deleted=await store.deleteSession(id,2);assert.equal(deleted.deleted,true);assert.equal((await store.sessions()).length,1);
});
