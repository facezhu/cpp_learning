import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { lessons } from '../src/content/curriculum.mjs';
import { historicalTemplates } from '../src/content/exercise-templates.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
test('408 specific questions have stable unique ids, answers and key points',()=>{
  assert.equal(lessons.reduce((n,l)=>n+l.questions.length,0),408);
  for(const l of lessons){assert.equal(new Set(l.questions.map(q=>q.id)).size,l.questions.length);for(const q of l.questions){assert.ok(q.q.length>5,`${l.id}/${q.id}`);assert.ok(q.a.length>15,`${l.id}/${q.id}`);assert.ok(q.keyPoints.length>0);}}
});
test('interview question and answer content stays unchanged during the reading redesign',()=>{
  const rows=lessons.flatMap(l=>l.questions.map(({id,q,a})=>({lesson:l.id,id,q,a})));
  assert.equal(createHash('sha256').update(JSON.stringify(rows)).digest('hex'),'e523af2d8551c9866e3a55de81186455c8241eb0e84e5f31a1ee9706b34ea9b9');
});
test('every exercise is prebuilt and the reference files match curriculum examples',async()=>{
  assert.equal(lessons.length,32);
  for(const l of lessons){const dir=path.join(root,'exercises',`lesson${String(l.n).padStart(2,'0')}`);for(const f of l.starterFiles)await fs.access(path.join(dir,f.name));for(const f of l.files)assert.equal((await fs.readFile(path.join(dir,'reference',f.name),'utf8')).replace(/\r/g,''),f.content.replace(/\r/g,''),`${l.id}/${f.name}`);}
});
test('historical web templates are genuine TODO exercises rather than filled-in references',()=>{
  for(let n=1;n<=14;++n){
    const files=historicalTemplates[n];
    assert.ok(files?.length,`lesson${n} template missing`);
    assert.ok(files.some(f=>f.content.includes('TODO')),`lesson${n} lacks work to complete`);
    assert.deepEqual(lessons[n-1].starterFiles,files,`lesson${n} does not use the template`);
    assert.ok(files.some(f=>!lessons[n-1].files.some(r=>r.name===f.name&&r.content===f.content)),`lesson${n} template is the complete reference`);
  }
  assert.deepEqual(historicalTemplates[12].map(f=>f.name).sort(),['Player.cpp','Player.h','Weapon.cpp','Weapon.h','main.cpp'].sort());
});
test('the project has a single root README outside third-party dependencies',async()=>{
  const readmes=[];
  async function visit(dir){
    for(const entry of await fs.readdir(dir,{withFileTypes:true})){
      if(entry.name==='node_modules'||entry.name==='.git')continue;
      const file=path.join(dir,entry.name);
      if(entry.isDirectory())await visit(file);
      else if(/^readme(?:\.|$)/i.test(entry.name))readmes.push(path.relative(root,file).replaceAll(path.sep,'/'));
    }
  }
  await visit(root);
  assert.deepEqual(readmes,['README.md']);
});
