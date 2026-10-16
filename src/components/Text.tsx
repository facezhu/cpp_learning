import {CodeBlock} from './CodeBlock';
export function InlineText({text}:{text:string}){
  return <>{text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part,i)=>part.startsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:part.startsWith('`')?<code key={i}>{part.slice(1,-1)}</code>:part)}</>;
}
export function RichText({text}:{text:string}){
  return <>{text.split(/(```[\s\S]*?```)/g).filter(Boolean).map((part,i)=>{
    if(part.startsWith('```')){const start=part.indexOf('\n');return <CodeBlock key={i} code={part.slice(start+1,-3).trimEnd()} language={part.slice(3,start).trim()==='cmake'?'cmake':'cpp'} name="分析示例"/>;}
    return part.trim().split(/\n\s*\n/).filter(Boolean).map((p,j)=><p className="rich-paragraph" key={`${i}-${j}`}><InlineText text={p}/></p>);
  })}</>;
}
