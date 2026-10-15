import type { Lesson } from './types';
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
export async function downloadExercise(lesson: Lesson) {
  const {default:JSZip}=await import('jszip');
  const zip = new JSZip();
  for (const file of lesson.starterFiles) zip.file(`starter/${file.name}`, file.content);
  for (const file of lesson.files) zip.file(`reference/${file.name}`, file.content);
  const cpp = lesson.files.filter(f => f.name.endsWith('.cpp')).map(f => f.name).join(' ');
  const instructions = lesson.setup ?? `在VS Code中打开starter文件夹，按要求补全代码。\n\n基础编译（PowerShell）：\ng++ ${cpp} -std=c++17 -Wall -Wextra -pedantic -g -o lesson${lesson.n}.exe\n.\\lesson${lesson.n}.exe\n\n如果g++不在PATH，先确认MSYS2安装路径；不要一次编译其他课程的cpp。\n${lesson.n === 21 ? '\nCMake方式：cmake -S . -B build -G "MinGW Makefiles"\ncmake --build build\n.\\build\\battle.exe\n' : ''}`;
  zip.file('README.txt', `第${lesson.n}课 ${lesson.title}\n${lesson.subtitle}\n\n${instructions}\n\n必做任务\n${lesson.tasks.map((t,i)=>`${i+1}. ${t}`).join('\n')}\n\n预期结果\n${lesson.expected}\n\n选做\n${lesson.challenge}\n\n先独立完成，再查看reference目录。将starter里的工作文件保存到仓库的exercises/lesson${String(lesson.n).padStart(2,'0')}/后，才能随Git提交。\n`);
  download(`lesson${lesson.n}-exercise.zip`, await zip.generateAsync({ type: 'uint8array' }) as BlobPart, 'application/zip');
}
