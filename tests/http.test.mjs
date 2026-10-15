import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApiServer } from '../server/http.mjs';

test('HTTP persistence, validation and same-origin write boundary',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'engine-lab-http-'));const {server}=createApiServer({dataRoot:root});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
  t.after(async()=>{await new Promise(resolve=>server.close(resolve));assert.ok(path.resolve(root).startsWith(path.resolve(os.tmpdir())+path.sep+'engine-lab-http-'));await fs.rm(root,{recursive:true,force:true});});
  const state=await fetch(base+'/api/state').then(r=>r.json());assert.equal(Object.keys(state.lessons).length,32);
  const headers={'Content-Type':'application/json','X-Lab-Token':state.token};
  let response=await fetch(base+'/api/lessons/lesson-01',{method:'PUT',headers,body:JSON.stringify({...state.lessons['lesson-01'],notes:'Saved via API'})});assert.equal(response.status,200);
  response=await fetch(base+'/api/lessons/lesson-01',{method:'PUT',headers,body:JSON.stringify(state.lessons['lesson-01'])});assert.equal(response.status,409);
  response=await fetch(base+'/api/recover',{method:'POST',headers:{...headers,Origin:'https://untrusted.example'},body:'{"restore":false}'});assert.equal(response.status,403);
  response=await fetch(base+'/api/recover',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"restore":false}'});assert.equal(response.status,403);
  response=await fetch(base+'/api/recover',{method:'POST',headers,body:'{broken'});assert.equal(response.status,400);
  response=await fetch(base+'/api/export');const exported=await response.json();assert.equal(exported.lessons['lesson-01'].notes,'Saved via API');assert.equal(exported.token,undefined);
});
