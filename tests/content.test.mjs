import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lessons } from '../src/content/curriculum.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
test('408 specific questions have stable unique ids, answers and key points',()=>{
  assert.equal(lessons.reduce((n,l)=>n+l.questions.length,0),408);
  for(const l of lessons){assert.equal(new Set(l.questions.map(q=>q.id)).size,l.questions.length);for(const q of l.questions){assert.ok(q.q.length>5,`${l.id}/${q.id}`);assert.ok(q.a.length>15,`${l.id}/${q.id}`);assert.ok(q.keyPoints.length>0);}}
});
test('every exercise is prebuilt and the reference files match curriculum examples',async()=>{
  for(const l of lessons){const dir=path.join(root,'exercises',`lesson${String(l.n).padStart(2,'0')}`);assert.ok((await fs.readFile(path.join(dir,'README.md'),'utf8')).includes('预期结果'));for(const f of l.starterFiles)await fs.access(path.join(dir,f.name));for(const f of l.files)assert.equal((await fs.readFile(path.join(dir,'reference',f.name),'utf8')).replace(/\r/g,''),f.content.replace(/\r/g,''),`${l.id}/${f.name}`);}
});
test('lectures provide specific explanatory prose, progressive code and chapter titles',()=>{
  for(const l of lessons){assert.ok(l.lecture.length>=8,`${l.id} missing sections`);assert.equal(new Set(l.lecture.map(s=>s.title)).size,l.lecture.length);assert.ok(l.lecture.filter(s=>s.code).length>=4,`${l.id} lacks code steps`);const prose=l.lecture.flatMap(s=>s.paragraphs).join('');assert.ok(prose.length>=1200,`${l.id} explanatory prose too short: ${prose.length}`);}
  const fourteen=JSON.stringify(lessons[13].lecture);for(const term of ['virtual','override','重载','抽象','析构','静态','动态'])assert.ok(fourteen.includes(term),term);
});
