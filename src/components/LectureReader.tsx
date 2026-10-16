import {useEffect,useRef,useState} from 'react';
import {Braces,ChevronDown} from 'lucide-react';
import type {CodeBinding,CodeFile,Lesson,LectureSection} from '../types';
import {paragraphSegments, resolveExample} from '../lecture-model.mjs';
import {CodeBlock} from './CodeBlock';
import {InlineText} from './Text';

type Selection={sectionId:string;binding:CodeBinding;kind:'pointer'|'keyboard'|'touch'};
function ExamplePanel({sections,sectionId,binding,onSelectFile}:{sections:LectureSection[];sectionId:string;binding?:CodeBinding;onSelectFile?:(exampleId:string)=>void}){
  const example=resolveExample(sections,sectionId,binding);
  const [selected,setSelected]=useState<Record<string,string>>({});
  const chosen=binding?.file??selected[example.id]??example.files[0]?.name;
  const file:CodeFile|undefined=example.files.find((f:CodeFile)=>f.name===chosen)??example.files[0];
  return <div className="example-panel"><div className="example-heading"><Braces size={17}/><span><small>对应示例</small><strong aria-live="polite">{example.section?.title??'本课示例'}</strong></span></div>{example.files.length>1&&<div className="file-tabs" aria-label="示例文件">{example.files.map((f:CodeFile)=><button key={f.name} aria-pressed={f.name===file?.name} className={f.name===file?.name?'active':''} onMouseDown={e=>e.preventDefault()} onClick={()=>{setSelected(prev=>({...prev,[example.id]:f.name}));onSelectFile?.(example.id);}}>{f.name}</button>)}</div>}{file?<CodeBlock code={file.content} name={file.name} language={file.language??'cpp'} lines={binding?example.lines:[]}/>:<p className="example-empty">本节说明概念，示例将随下一个小节展示。</p>}<p className="example-caption">{binding?`对应第 ${example.lines.join('、')} 行`:'将鼠标放在左侧带虚线标记的文字上，查看对应代码。'} · 示例片段请结合上下文阅读</p></div>;
}

export function LectureReader({lesson}:{lesson:Lesson}){
  const sections=lesson.lecture;
  const [current,setCurrent]=useState(sections[0].id);
  const [selection,setSelection]=useState<Selection|null>(null);
  const [mobileOpen,setMobileOpen]=useState<string|null>(null);
  const elements=useRef(new Map<string,HTMLElement>());
  useEffect(()=>{
    const visible=new Set<string>();
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){const id=(entry.target as HTMLElement).dataset.sectionId!;if(entry.isIntersecting)visible.add(id);else visible.delete(id);}
      const candidates=sections.filter(s=>visible.has(s.id)).map(s=>({id:s.id,top:elements.current.get(s.id)?.getBoundingClientRect().top??Infinity}));
      const passed=candidates.filter(s=>s.top<=180).sort((a,b)=>b.top-a.top);
      const next=passed[0]??candidates.sort((a,b)=>a.top-b.top)[0];if(next)setCurrent(next.id);
    },{rootMargin:'-95px 0px -55% 0px',threshold:0});
    for(const element of elements.current.values())observer.observe(element);
    return()=>observer.disconnect();
  },[sections]);
  function activate(sectionId:string,binding:CodeBinding,kind:Selection['kind']){
    setCurrent(sectionId);
    setSelection({sectionId,binding,kind});
    if(kind!=='pointer'&&window.matchMedia('(max-width: 1099px)').matches)setMobileOpen(sectionId);
  }
  function clear(sectionId:string,binding:CodeBinding,kind:Selection['kind']){setSelection(prev=>prev?.sectionId===sectionId&&prev.binding===binding&&prev.kind===kind?null:prev);}
  const selectedSection=selection?.sectionId??current;
  return <article className="linked-lecture" aria-label="概念与代码对照"><div className="concept-prose">{sections.map((section,index)=><section key={section.id} id={section.id} data-section-id={section.id} className="concept-chapter" ref={el=>{if(el)elements.current.set(section.id,el);else elements.current.delete(section.id);}}><span className="section-number">{String(index+1).padStart(2,'0')}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph,p)=>{
    const bindings=(section.bindings??[]).filter(b=>b.paragraph===p);
    return <p className="rich-paragraph" key={p}>{paragraphSegments(paragraph,bindings).map((segment,i)=>segment.binding?<button type="button" className="code-anchor" key={i} title="查看对应代码" aria-label={`查看对应代码：${segment.text.replace(/\*\*|`/g,'')}`} onMouseEnter={()=>activate(section.id,segment.binding!,'pointer')} onMouseLeave={()=>clear(section.id,segment.binding!,'pointer')} onFocus={()=>activate(section.id,segment.binding!,'keyboard')} onBlur={e=>{if(!(e.relatedTarget instanceof Element&&e.relatedTarget.closest('.example-panel')))clear(section.id,segment.binding!,'keyboard');}} onClick={()=>{if(window.matchMedia('(max-width: 1099px)').matches)activate(section.id,segment.binding!,'touch');}}><InlineText text={segment.text}/></button>:<InlineText key={i} text={segment.text}/>)}</p>;
  })}{section.table&&<div className="lecture-table"><table><thead><tr>{section.table.headers.map(h=><th key={h}><InlineText text={h}/></th>)}</tr></thead><tbody>{section.table.rows.map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}><InlineText text={cell}/></td>)}</tr>)}</tbody></table></div>}{section.points?.length&&<div className="concept-summary"><ul>{section.points.map(point=><li key={point}><InlineText text={point}/></li>)}</ul></div>}<details className="mobile-example" open={mobileOpen===section.id} onToggle={e=>{if(e.currentTarget.open)setMobileOpen(section.id);else setMobileOpen(prev=>prev===section.id?null:prev);}}><summary>查看本节示例代码 <ChevronDown size={15}/></summary>{mobileOpen===section.id&&<ExamplePanel sections={sections} sectionId={section.id} binding={selection?.sectionId===section.id?selection.binding:undefined} onSelectFile={id=>{setCurrent(id);setSelection(null);}}/>}</details></section>)}</div><aside className="desktop-code-pane" aria-label="当前示例代码"><ExamplePanel sections={sections} sectionId={selectedSection} binding={selection?.binding} onSelectFile={id=>{setCurrent(id);setSelection(null);}}/></aside></article>;
}
