import { useCallback, useEffect, useRef, useState } from 'react';
import { api, ApiError, download } from './lib';
import type { LessonRecord, Session } from './types';
export { useStudyTimer } from './study-timer';
const editorClientId=crypto.randomUUID();

export function useLessonRecord(initial: LessonRecord, onSaved: (record: LessonRecord) => void) {
  const prefix = `engine-lab-draft:${location.host}:${initial.id}`;
  const key = `${prefix}:${editorClientId}`;
  const [otherDrafts,setOtherDrafts]=useState<{key:string;record:LessonRecord;savedAt:number}[]>([]);
  const [record, setRecord] = useState(initial);
  const [status, setStatus] = useState('已保存到文件');
  const [conflict, setConflict] = useState<LessonRecord | null>(null);
  const ref = useRef(initial); const gen = useRef(0); const saved = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const running = useRef<Promise<void> | null>(null);
  const blocked = useRef(false);
  const onSavedRef = useRef(onSaved); onSavedRef.current = onSaved;
  const persist = (value:LessonRecord) => localStorage.setItem(key,JSON.stringify({record:value,savedAt:Date.now()}));
  const flush = useCallback(async (): Promise<void> => {
    if (running.current) { await running.current; return; }
    if (blocked.current || gen.current === saved.current) return;
    const snapshot = ref.current; const generation = gen.current;
    setStatus('保存中…');
    running.current = (async () => {
      try {
        const result = await api<LessonRecord>(`lessons/${snapshot.id}`, 'PUT', snapshot);
        saved.current = generation; ref.current = gen.current === generation ? result : { ...ref.current, revision: result.revision, updatedAt: result.updatedAt };
        setRecord(ref.current); onSavedRef.current(result);
        if (gen.current === generation) { localStorage.removeItem(key); setStatus('已保存到文件'); }
        else { persist(ref.current); setStatus('有新改动待保存'); }
      } catch (e) {
        if (e instanceof ApiError && e.status === 409 && e.details?.current) { blocked.current = true; setConflict(e.details.current); }
        setStatus(e instanceof Error ? e.message : '保存失败，草稿已保留');
      } finally { running.current = null; }
    })();
    await running.current;
    if (!blocked.current && saved.current === generation && gen.current > generation) await flush();
  }, [key]);
  const change = useCallback((patch: Partial<LessonRecord>) => {
    ref.current = { ...ref.current, ...patch }; gen.current++;
    setRecord(ref.current); setStatus('等待保存…');
    try { persist(ref.current); } catch { setStatus('浏览器草稿空间不足，请立即保存到文件或下载草稿。'); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { void flush(); }, 650);
  }, [key, flush]);
  useEffect(() => {
    try {
      const candidates=[];
      for(let i=0;i<localStorage.length;i++){const candidateKey=localStorage.key(i)!;if(candidateKey!==key&&(candidateKey===prefix||candidateKey.startsWith(prefix+':'))){try{const value=JSON.parse(localStorage.getItem(candidateKey)!);const draft=value.record??value;if(draft.id===initial.id&&draft.schemaVersion===1)candidates.push({key:candidateKey,record:draft,savedAt:value.savedAt??0});}catch{/* The damaged browser entry does not affect disk. */}}}
      setOtherDrafts(candidates.sort((a,b)=>b.savedAt-a.savedAt));
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw); const draft = (parsed.record??parsed) as LessonRecord;
        if (draft.id === initial.id && draft.schemaVersion === 1) {
          ref.current = draft; setRecord(draft); gen.current++;
          if (draft.revision !== initial.revision) { blocked.current = true; setConflict(initial); setStatus('发现未保存草稿，请比较版本'); }
          else { setStatus('已恢复未保存草稿'); timer.current = setTimeout(() => { void flush(); }, 800); }
        }
      }
    } catch { setStatus('浏览器草稿无法读取，磁盘文件未受影响。'); }
    const hide = () => { if (document.hidden) void flush(); };
    const unload = (event: BeforeUnloadEvent) => { if (gen.current !== saved.current) { event.preventDefault(); } };
    document.addEventListener('visibilitychange', hide); window.addEventListener('beforeunload', unload);
    return () => { if (timer.current) clearTimeout(timer.current); void flush(); document.removeEventListener('visibilitychange', hide); window.removeEventListener('beforeunload', unload); };
  }, [key, flush]); // The parent remounts this editor for each lesson.
  const resolve = (useDraft: boolean) => {
    if (!conflict) return;
    blocked.current = false;
    if (useDraft) { ref.current = { ...ref.current, revision: conflict.revision }; gen.current++; setRecord(ref.current); setConflict(null); void flush(); }
    else { download(`${initial.id}-draft.json`, JSON.stringify(ref.current, null, 2)); ref.current = conflict; setRecord(conflict); saved.current = gen.current; localStorage.removeItem(key); onSavedRef.current(conflict); setConflict(null); setStatus('已采用文件版本，原草稿已下载'); }
  };
  const restoreOther = () => {
    const draft=otherDrafts[0]?.record;if(!draft)return;
    // Keep the source draft intact; each tab owns a different recovery key.
    ref.current={...draft};gen.current++;setRecord(ref.current);persist(ref.current);setOtherDrafts([]);
    if(draft.revision!==initial.revision){blocked.current=true;setConflict(initial);setStatus('恢复的草稿与文件版本不同，请比较');}
    else{setStatus('已恢复草稿，等待保存');void flush();}
  };
  return { record, change, status, conflict, resolve, flush, otherDrafts, restoreOther, exportOther:()=>download(`${initial.id}-all-drafts.json`,JSON.stringify(otherDrafts,null,2)), exportDraft: () => download(`${initial.id}-draft.json`, JSON.stringify(ref.current, null, 2)) };
}
