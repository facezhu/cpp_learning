import { useEffect, useRef, useState } from 'react';
import { api, ApiError, setToken } from './lib';
import { elapsedSince } from './timer-policy.mjs';
import type { Session } from './types';

const clientId=crypto.randomUUID();
const pendingPrefix=`engine-lab-timer:${location.host}:`;
type Reply={acquired:boolean;record:Session};
type Running={sessionId:string;lessonId:string;startedAt:number;savedMs:number;start:Promise<Reply>;ended:boolean};
export function useStudyTimer(lessonId:string|null,ready:boolean,onSession:(s:Session)=>void){
  const [status,setStatus]=useState('打开课程后开始计时');
  const [elapsed,setElapsed]=useState(0);const [pending,setPending]=useState(0);
  const [activeLesson,setActiveLesson]=useState<string|null>(null);
  const runtime=useRef<Running|null>(null);const routeLesson=useRef(lessonId);routeLesson.current=lessonId;
  const notify=useRef(onSession);notify.current=onSession;
  const channel=useRef<BroadcastChannel|null>(null);
  const persist=(key:string,value:string)=>{try{localStorage.setItem(key,value);}catch{/* API persistence remains available. */}};

  async function save(run:Running,ended=false,at=Date.now()){
    const value=elapsedSince(run.startedAt,at);
    const request={clientId,sessionId:run.sessionId,lessonId:run.lessonId,startedAt:run.startedAt,elapsedMs:value,ended};
    const key=pendingPrefix+run.sessionId;const raw=JSON.stringify(request);persist(key,raw);
    try{
      let start:Reply;
      try{start=await run.start;}catch{
        run.start=api<Reply>('timer/start','POST',{clientId,sessionId:run.sessionId,lessonId:run.lessonId,startedAt:run.startedAt});
        start=await run.start;
      }
      if(!start.acquired&&!ended){if(runtime.current===run){runtime.current=null;setStatus('另一标签页已接管计时');setActiveLesson(null);}try{localStorage.removeItem(key);}catch{}return;}
      const reply=await api<Reply>('timer/update','POST',request,ended);
      notify.current(reply.record);run.savedMs=Math.max(run.savedMs,reply.record.durationMs);
      try{if(localStorage.getItem(key)===raw)localStorage.removeItem(key);}catch{/* No draft access. */}
      if(runtime.current===run){
        setPending(Math.max(0,elapsedSince(run.startedAt,Date.now())-run.savedMs));
        if(!reply.acquired){runtime.current=null;setStatus('另一标签页已接管计时');setActiveLesson(null);}
        else setStatus('持续计时 · 切到 VS Code 也会记录');
      }
    }catch(error){
      if(error instanceof ApiError&&error.status===403){
        try{const state=await api<{token:string}>('state');setToken(state.token);}catch{/* Retry when the local service returns. */}
      }
      if(runtime.current===run)setStatus('计时待保存 · 页面保持打开，连接恢复后重试');
    }
  }
  function finish(at=Date.now()){
    const run=runtime.current;if(!run)return;
    run.ended=true;runtime.current=null;void save(run,true,Math.max(run.startedAt,at));
  }
  function begin(id:string){
    const now=Date.now();finish(now);
    const run:Running={sessionId:crypto.randomUUID(),lessonId:id,startedAt:now,savedMs:0,ended:false,start:null!};
    runtime.current=run;setActiveLesson(id);setElapsed(0);setPending(0);setStatus('正在开始本课计时…');
    const payload={clientId,sessionId:run.sessionId,lessonId:id,startedAt:now};
    run.start=api<Reply>('timer/start','POST',payload);
    run.start.then(reply=>{
      notify.current(reply.record);
      if(!reply.acquired){if(runtime.current===run){runtime.current=null;setActiveLesson(null);setStatus('另一标签页已接管计时');}return;}
      if(run.ended)return;
      const message={clientId,sessionId:run.sessionId,at:now};
      // Server ownership is authoritative; the message settles the old live tab.
      channel.current?.postMessage(message);persist('engine-lab-timer-owner:'+location.host,JSON.stringify(message));
      if(runtime.current===run)setStatus('持续计时 · 切到 VS Code 也会记录');
    }).catch(()=>{if(runtime.current===run)setStatus('计时服务未连接，正在重试');});
  }
  useEffect(()=>{
    if(!ready)return;
    const receive=(message:{clientId:string;at:number})=>{if(message.clientId!==clientId&&runtime.current&&message.at>=runtime.current.startedAt){finish(message.at);setActiveLesson(null);setStatus('另一标签页已接管计时');}};
    if(typeof BroadcastChannel!=='undefined'){channel.current=new BroadcastChannel('engine-lab-timer');channel.current.onmessage=e=>receive(e.data);}
    const storage=(e:StorageEvent)=>{if(e.key==='engine-lab-timer-owner:'+location.host&&e.newValue){try{receive(JSON.parse(e.newValue));}catch{/* Ignore damaged coordination message. */}}};
    const tick=setInterval(()=>{const run=runtime.current;if(run){const ms=elapsedSince(run.startedAt,Date.now());setElapsed(ms);setPending(Math.max(0,ms-run.savedMs));}},1000);
    const checkpoint=setInterval(()=>{const run=runtime.current;if(run)void save(run);},15000);
    const visible=()=>{const run=runtime.current;if(run)void save(run);};
    const exit=()=>finish();
    const restored=(e:PageTransitionEvent)=>{if(e.persisted&&routeLesson.current)begin(routeLesson.current);};
    window.addEventListener('storage',storage);document.addEventListener('visibilitychange',visible);
    window.addEventListener('pagehide',exit);window.addEventListener('pageshow',restored);
    // Only recover already-measured values, never the time while a page was closed.
    try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i)!;if(!key.startsWith(pendingPrefix))continue;const raw=localStorage.getItem(key)!;try{const request=JSON.parse(raw);void api<Reply>('timer/recover','POST',request,true).then(reply=>{notify.current(reply.record);if(localStorage.getItem(key)===raw)localStorage.removeItem(key);}).catch(()=>{});}catch{/* Preserve unparseable draft for manual recovery. */}}}catch{/* Browser storage unavailable. */}
    return()=>{finish();clearInterval(tick);clearInterval(checkpoint);window.removeEventListener('storage',storage);document.removeEventListener('visibilitychange',visible);window.removeEventListener('pagehide',exit);window.removeEventListener('pageshow',restored);channel.current?.close();channel.current=null;};
  },[ready]);
  useEffect(()=>{if(ready&&lessonId)begin(lessonId);},[ready,lessonId]);
  return {status,elapsed,pending,activeLesson};
}
