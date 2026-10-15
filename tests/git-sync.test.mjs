import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { LearningStore } from '../server/store.mjs';

test('device A push -> device B pull restores progress, notes, time and exercise code',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'engine-lab-git-'));t.after(()=>{assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep+'engine-lab-git-'));return fs.rm(root,{recursive:true,force:true});});
  const remote=path.join(root,'remote.git'),a=path.join(root,'device-a'),b=path.join(root,'device-b');
  function git(cwd,args){const result=spawnSync('git',['-c','protocol.file.allow=always',...args],{cwd,encoding:'utf8',windowsHide:true});assert.equal(result.status,0,result.stderr);return result.stdout;}
  git(root,['init','--bare',remote]);git(root,['clone',remote,a]);git(a,['config','user.name','Engine Lab Test']);git(a,['config','user.email','test@example.invalid']);
  await fs.writeFile(path.join(a,'README.md'),'sync test');git(a,['add','.']);git(a,['commit','-m','Initial test']);git(a,['push','origin','HEAD']);git(root,['clone',remote,b]);
  const storeA=new LearningStore(path.join(a,'learning-data'));const record=await storeA.getLesson('lesson-14');await storeA.saveLesson(record.id,{...record,notes:'理解override',completed:true});
  await storeA.manual({lessonId:'lesson-14',date:'2026-10-14',minutes:30,note:'VS Code exercise',revision:0},randomUUID());
  await fs.mkdir(path.join(a,'exercises'));await fs.writeFile(path.join(a,'exercises','lesson14.cpp'),'// My exercise\n');git(a,['add','.']);git(a,['commit','-m','Study lesson14']);git(a,['push','origin','HEAD']);git(b,['pull','--ff-only']);
  const stateB=await new LearningStore(path.join(b,'learning-data')).state();assert.equal(stateB.lessons['lesson-14'].notes,'理解override');assert.equal(stateB.lessons['lesson-14'].completed,true);assert.equal(stateB.sessions[0].durationMs,1800000);assert.equal((await fs.readFile(path.join(b,'exercises/lesson14.cpp'),'utf8')).replace(/\r/g,''),'// My exercise\n');
});
