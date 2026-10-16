export function exampleFiles(section){
  if(section?.codeFiles?.length)return section.codeFiles.map(file=>({...file,language:file.language??(file.name==='CMakeLists.txt'?'cmake':section.language??'cpp')}));
  if(typeof section?.code==='string')return [{name:section.codeName??(section.language==='cmake'?'CMakeLists.txt':'示例.cpp'),content:section.code,language:section.language??'cpp'}];
  return [];
}
export function resolveExample(sections,sectionId,binding){
  const section=sections.find(s=>s.id===sectionId)??sections[0];
  const id=binding?.exampleId??section?.exampleId;
  const example=sections.find(s=>s.id===id);
  const files=exampleFiles(example);
  return {id,section:example,files,file:binding?.file??files[0]?.name,lines:binding?.lines??[]};
}
// These spans are authored against a paragraph and explicit example/line IDs.
// No runtime C++ keyword matching is used to infer a highlight.
export function paragraphSegments(text,bindings){
  const ranges=bindings.map((binding,index)=>({binding,index,start:text.indexOf(binding.text)})).filter(r=>r.start>=0).sort((a,b)=>a.start-b.start);
  const result=[];let cursor=0;
  for(const range of ranges){if(range.start<cursor)continue;if(range.start>cursor)result.push({text:text.slice(cursor,range.start)});result.push({text:range.binding.text,binding:range.binding,index:range.index});cursor=range.start+range.binding.text.length;}
  if(cursor<text.length)result.push({text:text.slice(cursor)});
  return result;
}
