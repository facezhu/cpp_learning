export const elapsedSince=(startedAt,now)=>Math.max(0,Math.floor(now-startedAt));
const day=time=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Hong_Kong',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(time));
export function elapsedDays(startedAt,durationMs){
  const days={};const end=startedAt+durationMs;
  for(let cursor=startedAt;cursor<end;){const key=day(cursor);const midnight=new Date(`${key}T00:00:00+08:00`).getTime()+86400000;const next=Math.min(midnight,end);days[key]=(days[key]??0)+next-cursor;cursor=next;}
  return days;
}
