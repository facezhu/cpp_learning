export type LessonRecord = { schemaVersion: number; id: string; revision: number; completed: boolean; historical: boolean; checks: boolean[]; notes: string; code: string; answers: Record<string, { text: string; status: 'review' | 'mastered' }>; updatedAt: string | null };
export type Session = { schemaVersion: number; id: string; lessonId: string; revision: number; source: 'auto' | 'manual'; durationMs: number; days: Record<string, number>; note: string; createdAt: string; updatedAt: string; deleted: boolean; clientId?:string; startedAt?:number; endedAt?:number|null };
export type LectureSection={title:string;paragraphs:string[];code?:string;language?:'cpp'|'cmake';points?:string[];table?:{headers:string[];rows:string[][]}};
export type LabState = { token: string; profile: { schemaVersion: number; recoveryDismissed: boolean; restored: boolean }; lessons: Record<string, LessonRecord>; sessions: Session[] };
export type Lesson = {
  n: number; id: string; title: string; subtitle: string; stage: number; minutes: number; kind: string; scene: string; objectives: string[];
  sections: [string, string][]; code: string; files: { name: string; content: string }[]; starterFiles: { name: string; content: string }[];
  lecture:LectureSection[];
  tasks: string[]; checklist: string[]; challenge: string; expected: string; hints: string[];
  memory: { rule: string; example: string; trap: string };
  questions: { id: string; q: string; a: string; keyPoints:string[]; advanced?:boolean }[];
  frames: { title: string; nodes: { label: string; value: string }[]; explanation: string; lines: number[] }[];
  setup?: string; toolchain?: string; sources?: [string, string][];
};
