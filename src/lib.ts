export class ApiError extends Error { constructor(public status: number, message: string, public details?: { current?: import('./types').LessonRecord }) { super(message); } }
let token = '';
export function setToken(t: string) { token = t; }
export async function api<T>(path: string, method = 'GET', data?: unknown, keepalive = false): Promise<T> {
  const response = await fetch('/api/' + path, { method, cache: 'no-store', headers: data === undefined ? {} : { 'Content-Type': 'application/json', 'X-Lab-Token': token }, body: data === undefined ? undefined : JSON.stringify(data), keepalive });
  const json = await response.json();
  if (!response.ok) throw new ApiError(response.status, json.error ?? '请求失败', json.details);
  return json;
}
export const hkDate = (date = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
export function formatTime(ms: number) { const minutes = Math.floor(ms / 60000); return minutes >= 60 ? `${Math.floor(minutes / 60)}小时 ${minutes % 60}分` : minutes > 0 ? `${minutes} 分钟` : `${Math.floor(ms / 1000)} 秒`; }
export function download(name: string, content: BlobPart, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([content], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
