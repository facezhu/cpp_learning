import {useEffect,useRef,useState} from 'react';
import {Check,Copy} from 'lucide-react';
import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import cmake from 'highlight.js/lib/languages/cmake';
hljs.registerLanguage('cpp',cpp);hljs.registerLanguage('cmake',cmake);

export function CodeBlock({code,lines=[],language='cpp',name='示例代码',maxHeight=false}:{code:string;lines?:number[];language?:string;name?:string;maxHeight?:boolean}){
  const [copied,setCopied]=useState(false);const pre=useRef<HTMLPreElement>(null);
  const lineKey=lines.join(',');
  useEffect(()=>{
    const container=pre.current;if(!container)return;
    const target=container.querySelector<HTMLElement>('.highlighted');
    if(target){const offset=target.getBoundingClientRect().top-container.getBoundingClientRect().top+container.scrollTop;container.scrollTop=Math.max(0,offset-70);}
    else container.scrollTop=0;
  },[code,lineKey]);
  const html=hljs.highlight(code,{language}).value.split('\n');
  return <div className={`code-block ${maxHeight?'compact':''}`}><div className="code-bar"><span><span className="code-dots" aria-hidden="true"><i/><i/><i/></span>{name}</span><button className="icon-button" aria-label={`复制代码：${name}`} onClick={async()=>{try{await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1500);}catch{setCopied(false);}}}>{copied?<Check size={15}/>:<Copy size={15}/>}</button></div><pre ref={pre} tabIndex={0} aria-label={name}><code>{html.map((line,i)=><span data-line={i+1} className={`code-line ${lines.includes(i+1)?'highlighted':''}`} key={i}><span className="line-number" aria-hidden="true">{i+1}</span><span dangerouslySetInnerHTML={{__html:line||' '}}/></span>)}</code></pre></div>;
}
