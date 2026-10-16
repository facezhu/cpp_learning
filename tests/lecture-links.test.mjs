import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../src/content/curriculum.mjs';
import {exampleFiles,paragraphSegments,resolveExample} from '../src/lecture-model.mjs';

test('all 32 lectures have stable, explicit and valid prose-to-code links',()=>{
  for(const lesson of lessons){
    const sections=lesson.lecture;
    assert.equal(new Set(sections.map(s=>s.id)).size,sections.length,lesson.id);
    assert.ok(sections.reduce((n,s)=>n+(s.bindings?.length??0),0)>=5,`${lesson.id}: insufficient links`);
    for(const section of sections){
      const label=`${lesson.id}/${section.id}`;
      assert.match(section.id,/^l\d+-[a-z0-9-]+$/,label);
      assert.ok(exampleFiles(sections.find(s=>s.id===section.exampleId)).length,`${label}: missing example`);
      if(exampleFiles(section).length)assert.ok(section.bindings?.length,`${label}: code needs explanation links`);
      const ranges=new Map();
      for(const binding of section.bindings??[]){
        const text=section.paragraphs[binding.paragraph];
        assert.ok(typeof text==='string',`${label}: paragraph`);
        const start=text.indexOf(binding.text);
        assert.ok(binding.text.length>0&&start>=0,`${label}: text not found ${binding.text}`);
        assert.equal(text.indexOf(binding.text,start+1),-1,`${label}: ambiguous text`);
        const previous=ranges.get(binding.paragraph)??[];
        assert.ok(previous.every(([a,b])=>start>=b||start+binding.text.length<=a),`${label}: overlapping links`);
        previous.push([start,start+binding.text.length]);ranges.set(binding.paragraph,previous);
        const resolved=resolveExample(sections,section.id,binding);
        const file=resolved.files.find(f=>f.name===resolved.file);
        assert.ok(file,`${label}: missing linked file`);
        assert.ok(binding.lines.length,`${label}: no lines`);
        for(const line of binding.lines)assert.ok(Number.isInteger(line)&&line>0&&line<=file.content.split('\n').length,`${label}: invalid line ${line}`);
      }
      section.paragraphs.forEach((paragraph,p)=>assert.equal(paragraphSegments(paragraph,(section.bindings??[]).filter(b=>b.paragraph===p)).map(s=>s.text).join(''),paragraph,`${label}: lost prose`));
    }
  }
});

test('multi-file examples resolve an explicitly linked file and exact lines',()=>{
  for(const n of [12,21]){
    const lecture=lessons[n-1].lecture;
    const section=lecture.find(s=>s.codeFiles?.length>1);
    assert.ok(section,`lesson ${n}: multifile example`);
    assert.ok(section.bindings.some(b=>b.file),`lesson ${n}: file-specific links`);
    for(const binding of section.bindings){
      const resolved=resolveExample(lecture,section.id,binding);
      assert.equal(resolved.file,binding.file??section.codeFiles[0].name);
      assert.deepEqual(resolved.lines,binding.lines);
    }
  }
});

test('paragraph splitting preserves inline formatting and authored link order',()=>{
  const text='使用 **virtual** 声明，再用 `override` 检查。';
  const a={text:'**virtual**',lines:[2]},b={text:'`override`',lines:[8]};
  const parts=paragraphSegments(text,[b,a]);
  assert.equal(parts.map(p=>p.text).join(''),text);
  assert.deepEqual(parts.filter(p=>p.binding).map(p=>p.binding),[a,b]);
});
