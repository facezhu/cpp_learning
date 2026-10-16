import {useCallback, useEffect, useState} from 'react';
import {ArrowDownToLine, ArrowRight, BookOpen, Bookmark, Box, Braces, CheckCircle2, ChevronRight, Clock3, Code2, Command, ExternalLink, FolderGit2, GraduationCap, LayoutDashboard, Lightbulb, Menu, Moon, PanelLeftClose, PanelLeftOpen, Pause, Play, RefreshCw, RotateCcw, Search, ShieldCheck, Sparkles, Sun, TrendingUp, X} from 'lucide-react';
import { lessons as rawLessons, stages } from './content/curriculum.mjs';
import type { LabState, Lesson, LessonRecord, Session } from './types';
import { api, download, formatTime, hkDate, setToken } from './lib';
import { useStudyTimer } from './hooks';
import {CodeBlock} from './components/CodeBlock';
import {LessonPage} from './components/LessonPage';
import {QuestionBank} from './components/QuestionBank';
const lessons = rawLessons as unknown as Lesson[];
const icons = [Braces, Box, Code2, Command, GraduationCap];
const navigate = (route: string) => { location.hash = route; window.scrollTo({ top: 0, behavior: 'instant' }); };
const number = (n: number) => String(n).padStart(2, '0');
function getRoute() { return location.hash.replace(/^#\/?/, '') || 'dashboard'; }
function sumSessions(sessions: Session[], date?: string) { return sessions.filter(s => !s.deleted).reduce((sum, s) => sum + (date ? s.days[date] ?? 0 : s.durationMs), 0); }

export default function App() {
  const [route, setRoute] = useState(getRoute); const [data, setData] = useState<LabState | null>(null);
  const [error, setError] = useState(''); const [toast, setToast] = useState('');
  const [mobile, setMobile] = useState(false);
  const [collapsed,setCollapsed]=useState(()=>localStorage.getItem('engine-lab-nav-collapsed')==='true');
  useEffect(()=>{localStorage.setItem('engine-lab-nav-collapsed',String(collapsed));},[collapsed]);
  const [theme, setTheme] = useState(() => localStorage.getItem('engine-lab-theme') ?? 'dark');
  const [recovering, setRecovering] = useState(false);
  const current = lessons.find(l => route === `lesson/${l.id}`);
  const load = useCallback(async () => {
    try { const result = await api<LabState>('state'); setToken(result.token); setData(result); setError(''); }
    catch (e) { setError(e instanceof Error ? e.message : '无法连接本地服务'); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('engine-lab-theme', theme); }, [theme]);
  useEffect(() => { const handler = () => { setRoute(getRoute()); setMobile(false); }; window.addEventListener('hashchange', handler); return () => window.removeEventListener('hashchange', handler); }, []);
  useEffect(() => { window.scrollTo({top:0,behavior:'instant'}); }, [route]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 4500); return () => clearTimeout(t); }, [toast]);
  const updateSession = useCallback((session: Session) => setData(prev => prev ? { ...prev, sessions: [...prev.sessions.filter(s => s.id !== session.id), (prev.sessions.find(s=>s.id===session.id)?.revision??0)>session.revision?prev.sessions.find(s=>s.id===session.id)!:session] } : prev), []);
  const updateLesson = useCallback((record: LessonRecord) => setData(prev => prev ? { ...prev, lessons: { ...prev.lessons, [record.id]: record } } : prev), []);
  const timer = useStudyTimer(current?.id ?? null, !!data, updateSession);
  const completed = data ? Object.values(data.lessons).filter(r => r.completed).length : 0;
  const next = lessons.find(l => !data?.lessons[l.id]?.completed) ?? lessons[0];
  const headerLabel = current ? stages[current.stage].name : route.startsWith('courses') ? '全部课程' : ({ dashboard: '学习工作台', review: '面试题库', stats: '学习统计', guide: '本地与 GitHub' }[route] ?? '学习工作台');
  async function recover(restore: boolean) {
    setRecovering(true);
    try { await api('recover', 'POST', { restore }); await load(); if (restore) navigate('lesson/lesson-14'); }
    catch (e) { setToast((e as Error).message); } finally { setRecovering(false); }
  }
  const showError = (e: unknown) => setToast(e instanceof Error ? e.message : '操作失败，请重试');
  return <div className={`app-shell ${collapsed?'nav-collapsed':''}`}>
    {mobile && <div className="mobile-scrim" onClick={() => setMobile(false)} />}
    <aside id="site-navigation" aria-label="侧边导航" className={`sidebar ${mobile ? 'open' : ''}`}>
      <a className="brand" href="#dashboard" aria-label="学习工作台" title="学习工作台"><span className="brand-symbol"><Box size={24} strokeWidth={1.7}/></span><span>引擎学堂<small>C++ ENGINE LAB</small></span></a>
      <div className="workspace-label">你的学习空间 <span>PERSONAL</span></div>
      <nav className="main-nav" aria-label="主导航">
        {[['dashboard','学习工作台',LayoutDashboard],['courses','课程路线',BookOpen],['review','面试题库',Bookmark],['stats','学习统计',TrendingUp]].map(([id,label,Icon]) => {
          const I = Icon as typeof Box; return <a key={id as string} title={label as string} aria-label={label as string} href={`#${id}`} className={(route === id || id === 'courses' && (current || route.startsWith('courses'))) ? 'active' : ''}><I size={18}/><span>{label as string}</span>{id === 'courses' && <em>32</em>}</a>;
        })}
      </nav>
      <div className="sidebar-section"><span>学习路径</span><span className="tiny-mono">5 STAGES</span></div>
      <nav className="stage-nav" aria-label="课程阶段">{stages.map((s, i) => { const I = icons[i]; const count = lessons.filter(l => l.stage === i && data?.lessons[l.id]?.completed).length; const total = lessons.filter(l => l.stage === i).length; return <a href={`#courses?stage=${i}`} title={s.name} aria-label={s.name} key={s.id} className={current?.stage === i ? 'selected' : ''}><I size={16}/><div><span>{s.name}</span><small>{s.range} 课</small></div><span className="stage-count">{count}/{total}</span></a>; })}</nav>
      <div className="sidebar-bottom">
        <div className="sidebar-progress"><div><span>路线完成度</span><strong>{Math.round(completed/32*100)}%</strong></div><div className="progress-track"><i style={{ width: `${completed/32*100}%` }}/></div><small>{completed} / 32 节课程已完成</small></div>
        <a className={route === 'guide' ? 'guide-link active' : 'guide-link'} href="#guide" title="启动与同步" aria-label="启动与同步"><FolderGit2 size={17}/> 本地与 GitHub <ChevronRight size={14}/></a>
        <div className="profile"><span className="avatar">学</span><div><strong>独立开发者</strong><small><i/> 本地学习档案</small></div><ShieldCheck size={17}/></div>
      </div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumbs"><button className="icon-button nav-toggle" aria-label={collapsed?'展开导航栏':'收起导航栏'} title={collapsed?'展开导航栏':'收起导航栏'} aria-expanded={!collapsed} aria-controls="site-navigation" onClick={()=>setCollapsed(v=>!v)}>{collapsed?<PanelLeftOpen size={19}/>:<PanelLeftClose size={19}/>}</button><button className="icon-button mobile-only" aria-label="打开导航" onClick={() => setMobile(true)}><Menu size={20}/></button><span className="crumb-home">学习空间</span><ChevronRight size={14}/><strong>{headerLabel}</strong></div><div className="top-actions"><span className="local-badge"><i/> 本地文件保存</span><button className="icon-button" title="刷新磁盘数据" aria-label="刷新磁盘数据" onClick={() => { void load(); }}><RefreshCw size={17}/></button><button className="icon-button" title="切换主题" aria-label="切换深浅主题" onClick={() => setTheme(v => v === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}</button><a href="#guide" className="repo-button"><FolderGit2 size={16}/><span>我的仓库</span></a></div></header>
      {timer.activeLesson&&!current&&<div className="global-timer"><Clock3 size={15}/><span>正在记录：{lessons.find(l=>l.id===timer.activeLesson)?.title} · 本次 {formatTime(timer.elapsed)}</span><a href={`#lesson/${timer.activeLesson}`}>返回课程</a></div>}
      <main>
        {error ? <section className="error-state"><ShieldCheck size={40}/><h1>学习档案暂时无法读取</h1><p>{error}</p><p>请保持本地服务运行。如文件损坏，请在 VS Code 修复对应 JSON；网站不会覆盖原文件。</p><button className="button primary" onClick={() => void load()}>重新读取</button></section> : !data ? <div className="loading"><Box size={30}/><p>正在打开你的学习空间…</p></div> : <>
          {current ? <LessonPage key={current.id} lesson={current} initial={data.lessons[current.id]} onSaved={updateLesson} timer={timer} sessions={data.sessions} onError={showError} visual={<Concept lesson={current}/>}/> : route.startsWith('courses') ? <Courses route={route} data={data}/> : route === 'review' ? <QuestionBank/> : route === 'stats' ? <Stats data={data} timer={timer}/> : route === 'guide' ? <Guide data={data} onError={showError}/> : <Dashboard data={data} next={next} timer={timer}/>}
        </>}
      </main>
      <footer><span><Box size={13}/> C++ ENGINE LAB <i/> 一行代码，一个新世界。</span><span>本地优先 · 由你掌握学习数据</span></footer>
    </div>
    {toast && <div className="toast" role="status">{toast}<button className="icon-button" aria-label="关闭提示" onClick={() => setToast('')}><X size={16}/></button></div>}
    {data && !data.profile.recoveryDismissed && !error && <div className="recovery-banner"><span className="recovery-icon"><Sparkles size={22}/></span><div><strong>欢迎回来，从熟悉的地方继续。</strong><p>可以恢复前 13 课的历史完成状态，从第 14 课「多态」继续。历史时长保持未记录。</p></div><button className="button primary small" disabled={recovering} onClick={() => void recover(true)}>恢复到第 14 课 <ArrowRight size={15}/></button><button className="text-button" disabled={recovering} onClick={() => void recover(false)}>从头开始</button></div>}
  </div>;
}

function WorldScene() {
  return <svg className="world-scene" viewBox="0 0 520 300" role="img" aria-label="由代码构建的游戏世界：网格地面、角色方块和组件坐标">
    <defs><pattern id="grid" width="42" height="24" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .46 -1 .46 250 40)"><path d="M42 0H0V24" fill="none" stroke="currentColor" strokeWidth=".6" opacity=".18"/></pattern><linearGradient id="worldFade" x2="0" y2="1"><stop stopColor="#c4f582" stopOpacity=".16"/><stop offset="1" stopColor="#c4f582" stopOpacity="0"/></linearGradient></defs>
    <rect width="520" height="300" fill="url(#grid)"/>
    <path d="m90 187 170-82 170 82-170 82Z" fill="url(#worldFade)" stroke="#c4f582" strokeOpacity=".14"/>
    <g stroke="#c4f582" strokeWidth="1.2"><path d="m205 135 55-27 55 27-55 27Z" fill="#c2f27d"/><path d="m205 135 55 27v62l-55-28Z" fill="#7a9b55"/><path d="m260 162 55-27v61l-55 28Z" fill="#a1cc68"/></g>
    <path d="M260 224V72m0 152 105 50m-105-50-100 48" fill="none" stroke="#baf17d" strokeOpacity=".6" strokeDasharray="4 5"/>
    <circle cx="260" cy="224" r="4" fill="#daf9b0"/>
    <g fontFamily="monospace" fontSize="11" fill="#b7c5ad"><text x="269" y="77">Z</text><text x="367" y="280">X</text><text x="144" y="278">Y</text></g>
    <g transform="translate(326 67)"><rect width="154" height="47" rx="9" fill="#1a241d" stroke="#96ba72" strokeOpacity=".4"/><text x="13" y="20" fill="#b7c5ad" fontSize="10" fontFamily="monospace">COMPONENT</text><text x="13" y="36" fill="#e1efdb" fontSize="12">Transform · (0, 0, 0)</text><path d="M0 30-42 28" fill="none" stroke="#a6cc7d" strokeDasharray="3 4"/></g>
    <g transform="translate(20 102)"><rect width="148" height="57" rx="9" fill="#1a241d" stroke="#96ba72" strokeOpacity=".4"/><text x="12" y="20" fill="#b7c5ad" fontSize="10" fontFamily="monospace">PLAYER</text><text x="12" y="38" fill="#c4f582" fontSize="13" fontFamily="monospace">health = 100;</text><path d="M148 30h37l20 20" fill="none" stroke="#a6cc7d" strokeDasharray="3 4"/></g>
    <circle cx="389" cy="190" r="5" fill="#c3f37d" opacity=".55"/><path d="m112 217 15-7 15 7-15 8Z" fill="#93ac77"/>
  </svg>;
}

function Dashboard({ data, next, timer }: { data: LabState; next: Lesson; timer:ReturnType<typeof useStudyTimer> }) {
  const done = Object.values(data.lessons).filter(l => l.completed).length;
  const activeDays = new Set(data.sessions.filter(s => !s.deleted && s.durationMs > 0).flatMap(s => Object.keys(s.days))).size;
  const today = sumSessions(data.sessions, hkDate());
  return <div className="page dashboard">
    <div className="page-heading"><div><span className="eyebrow">BUILD YOUR NEXT LEVEL</span><h1>每一次理解，都让世界更进一步<span className="heading-dot">.</span></h1><p>从第一行 C++，到亲手创造一个游戏世界。</p></div><span className="date-label">{new Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Hong_Kong',month:'long',day:'numeric',weekday:'long'}).format(new Date())}</span></div>
    <section className="hero"><div className="hero-content"><span className="hero-tag"><i/> C++ × GAME ENGINE</span><h2>把代码，<br/>变成你的<span>游戏世界。</span></h2><p>理解语言的底层逻辑，也看见它在引擎中的样子。<br/>32 节课程，一条从基础到 Unreal 的实践路线。</p><div className="hero-actions"><button className="button primary" onClick={() => navigate(`lesson/${next.id}`)}>继续学习 <ArrowRight size={17}/></button><a className="hero-secondary" href="#courses">探索课程路线 <ChevronRight size={16}/></a></div><div className="hero-foot"><span><CheckCircle2 size={14}/> 可视化概念</span><span><Code2 size={14}/> VS Code 实战</span><span><Bookmark size={14}/> 面试问答</span></div></div><div className="hero-world"><span className="scene-label">YOUR WORLD, COMPILED.</span><WorldScene/><div className="world-caption"><span className="code-comment">// 从理解一个对象开始</span><code>Player you("Creator", 100);</code></div></div></section>
    <div className="stat-grid"><StatCard icon={BookOpen} label="已完成课程" value={String(done)} unit="/ 32" foot={done ? `已走过 ${Math.round(done/32*100)}% 的学习路线` : '从第一课开启你的旅程'}/><StatCard icon={Clock3} label="累计学习时长" value={String(Math.floor((sumSessions(data.sessions)+(timer.activeLesson?timer.pending:0))/60000))} unit="分钟" foot={data.profile.restored ? '历史课程时长未记录' : '打开课程至退出网站 · 含 VS Code 编程'}/><StatCard icon={Code2} label="已有时长的课程" value={String(new Set(data.sessions.filter(s=>!s.deleted&&s.durationMs>0).map(s=>s.lessonId)).size)} unit="/ 32" foot="每节课程独立累计"/><StatCard icon={Bookmark} label="面试题库" value={String(lessons.reduce((sum,l)=>sum+l.questions.length,0))} unit="道" foot="按课程查阅问题与答案"/></div>
    <div className="dashboard-body"><div className="dashboard-main"><div className="section-heading"><h2>接着上次的地方</h2><a href="#courses">查看全部课程 <ArrowRight size={15}/></a></div><ContinueCard lesson={next} record={data.lessons[next.id]}/><div className="section-heading path-heading"><h2>你的成长路线 <span>THE ROADMAP</span></h2><span className="muted">循序渐进，也可以自由探索</span></div><div className="roadmap">{stages.map((s,i)=>{ const I=icons[i]; const group=lessons.filter(l=>l.stage===i);const count=group.filter(l=>data.lessons[l.id].completed).length;return <a className={`roadmap-row ${next.stage===i?'current':''}`} href={`#courses?stage=${i}`} key={s.id}><span className="roadmap-icon"><I size={19}/></span><div><div className="roadmap-title"><strong>{s.name}</strong>{next.stage===i && <span className="pill">正在探索</span>}</div><p>{s.description}</p></div><div className="roadmap-end"><span>{count} / {group.length} 课</span><div className="progress-track"><i style={{width:`${count/group.length*100}%`}}/></div></div><ChevronRight size={17}/></a>})}</div></div>
    <aside className="dashboard-aside"><section className="tip-card"><span className="overline"><Lightbulb size={15}/> 学习方法</span><h3>不是读懂就够了，<br/>试着亲手写出来。</h3><p>理解概念 → 对照示例 → 补全 TODO → 核对运行结果。</p><div className="tip-code"><span>理解</span><ChevronRight size={14}/><span>实践</span><ChevronRight size={14}/><span>记忆</span></div></section><section className="file-card"><div className="card-icon"><FolderGit2 size={21}/></div><h3>你的学习，归你所有。</h3><p>课程进度和时长保存在仓库文件。结束学习后，记得提交并推送。</p><a href="#guide">查看同步指南 <ArrowRight size={14}/></a></section></aside></div>
  </div>;
}
function StatCard({icon:Icon,label,value,unit,foot}: {icon:typeof Box;label:string;value:string;unit:string;foot:string}) { return <section className="stat-card"><div><span>{label}</span><Icon size={17}/></div><strong>{value}<small>{unit}</small></strong><p>{foot}</p></section>; }
function ContinueCard({lesson:l,record}:{lesson:Lesson;record:LessonRecord}) { return <a className="continue-card" href={`#lesson/${l.id}`}><div className="lesson-thumb"><span>{number(l.n)}</span><Braces size={36}/><span className="thumb-cross">+</span></div><div className="continue-info"><span className="eyebrow">STAGE {number(l.stage+1)} <i/> LESSON {number(l.n)}</span><h3>{l.title}</h3><p>{l.subtitle}</p><div className="course-meta"><span><BookOpen size={13}/> 详细讲义</span><span><Code2 size={13}/> 编程练习</span><span>{record.completed ? '已完成，可复习' : '开始或继续学习'}</span></div></div><span className="round-arrow"><ArrowRight size={20}/></span></a>; }

function Courses({route,data}:{route:string;data:LabState}) {
  const fromRoute = new URLSearchParams(route.split('?')[1]).get('stage');
  const [stage,setStage] = useState(fromRoute === null ? -1 : Number(fromRoute)); const [search,setSearch] = useState('');
  useEffect(()=>setStage(fromRoute===null?-1:Number(fromRoute)),[fromRoute]);
  const filtered = lessons.filter(l => (stage===-1 || l.stage===stage) && `${l.title} ${l.subtitle} ${l.n} ${l.objectives.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">YOUR LEARNING PATH</span><h1>从语言基础，到引擎世界<span className="heading-dot">.</span></h1><p>32 节完整课程。理解一个概念，然后用代码把它实现。</p></div><span className="outlined-badge">C++17 → UE 5.6</span></div><div className="course-toolbar"><div className="filter-tabs"><button className={stage===-1?'active':''} onClick={()=>setStage(-1)}>全部课程</button>{stages.map(s=><button key={s.id} className={stage===s.id?'active':''} onClick={()=>setStage(s.id)}>{s.name}</button>)}</div><label className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索概念或课程…" aria-label="搜索课程"/></label></div>
    {!filtered.length && <div className="empty-state"><Search size={32}/><h3>没有找到这门课</h3><p>试试「指针」「角色」或「14」。</p></div>}
    {stages.map(s=>{const group=filtered.filter(l=>l.stage===s.id); if(!group.length)return null;const I=icons[s.id]; return <section className="course-group" key={s.id}><div className="group-heading"><span className="group-icon"><I size={20}/></span><div><span className="eyebrow">STAGE {number(s.id+1)}</span><h2>{s.name}</h2></div><p>{s.description}</p></div><div className="course-grid">{group.map(l=><a key={l.id} className={`course-card ${data.lessons[l.id].completed?'done':''}`} href={`#lesson/${l.id}`}><div className="course-card-top"><span className="tiny-mono">LESSON {number(l.n)}</span>{data.lessons[l.id].completed?<span className="completion"><CheckCircle2 size={14}/>{data.lessons[l.id].historical?'历史完成':'已完成'}</span>:<span className="course-level">{s.id===4?'引擎实战':s.id>1?'进阶':'基础'}</span>}</div><h3>{l.title}</h3><p>{l.subtitle}</p><div className="card-objectives">{l.objectives.slice(0,2).map(o=><span key={o}>{o}</span>)}</div><div className="course-card-bottom"><span><Clock3 size={13}/> {l.lecture.length} 节讲解 · {l.questions.length} 道面试题</span><ArrowRight size={17}/></div></a>)}</div></section>})}
  </div>;
}

function ConceptSketch({lesson:l,step}:{lesson:Lesson;step:number}) {
  const marker=`sketch-arrow-${l.n}`;
  const defs=<defs><marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m0 0 10 5-10 5Z" fill="currentColor"/></marker></defs>;
  if(l.kind==='dispatch')return <svg className="concept-sketch dispatch-sketch" viewBox="0 0 300 134" role="img" aria-label="多态分派：Character共同接口分别连接到Warrior和Mage实现">{defs}<rect x="67" y="6" width="166" height="37" rx="6"/><text x="150" y="29" textAnchor="middle">Character::attack</text><path d="M150 43v19H74v23m76-23h76v23" markerEnd={`url(#${marker})`}/><rect x="7" y="86" width="134" height="38" rx="6" className={step===1?'selected':''}/><rect x="159" y="86" width="134" height="38" rx="6" className={step===2?'selected':''}/><text x="74" y="109" textAnchor="middle">Warrior · 35伤害</text><text x="226" y="109" textAnchor="middle">Mage · 40伤害</text></svg>;
  if(l.kind==='memory'){
    const left=l.n===7?'引用形参 &scores':l.n===8?(step===2?'参数 = nullptr':'target = 示意0x100'):l.n===16?(step===0?'first · 拥有者':step===1?'second · 拥有者':'second · 已析构'):'weak_ptr · 缓存';
    const right=l.n===7?(step===0?'[65,78,92,100]':'[75,88,100,100]'):l.n===8?`health = ${step===0?100:85}`:l.n===16?(step===2?'Arthur · 已销毁':'Arthur · 存活'):'Texture · hero.png';
    const disconnected=l.n===8&&step===2||l.n===16&&step===2;
    return <svg className="concept-sketch memory-sketch" viewBox="0 0 300 110" role="img" aria-label={`${left} ${disconnected?'不再指向有效目标':'指向'} ${right}，内存地址仅为示意`}>{defs}<rect x="4" y="18" width="132" height="53" rx="6"/><rect x="169" y="18" width="127" height="53" rx="6" className={!disconnected?'selected':''}/><text x="70" y="49" textAnchor="middle">{left}</text><text x="232" y="49" textAnchor="middle">{right}</text>{!disconnected?<path d="M137 44h30" markerEnd={`url(#${marker})`} strokeDasharray={l.n===26?'4 3':undefined}/>:<text x="152" y="49" textAnchor="middle">×</text>}<text x="150" y="97" textAnchor="middle" className="sketch-note">{l.n===26?'虚线表示弱观察，不增加强引用计数':l.n===16?'拥有权与观察指针是不同的关系':l.n===8?'地址是教学示意，不是本次真实内存地址':'别名指向同一容器，不复制整个vector'}</text></svg>;
  }
  if(l.kind==='object'){
    const config:Record<number,string[]>={9:['Player','private · health','public · takeDamage'],11:['Player 拥有 Weapon','name / health','Weapon · 公开接口'],25:['Entity #1','Transform','Health（可选）'],29:['Actor / Owner','HealthComponent','其他组件'],32:['ExplorerCharacter','HealthComponent','ScoreComponent']};
    const [owner,a,b]=config[l.n]??['对象','成员数据','成员行为'];
    return <svg className="concept-sketch object-sketch" viewBox="0 0 300 126" role="img" aria-label={`${owner}的对象结构：${a}和${b}在对象边界内`}><rect x="5" y="5" width="290" height="113" rx="9"/><text x="20" y="30">{owner}</text><path d="M5 43h290"/><rect x="18" y="58" width="122" height="43" rx="5" className="selected"/><rect x="153" y="58" width="129" height="43" rx="5"/><text x="79" y="84" textAnchor="middle">{a}</text><text x="217" y="84" textAnchor="middle">{b}</text></svg>;
  }
  if(l.n===13)return <svg className="concept-sketch timeline-sketch" viewBox="0 0 300 108" role="img" aria-label="Warrior对象内部包含Character父类部分，先构造父类，再构造子类">{defs}<rect x="4" y="10" width="130" height="58" rx="6" className={step===1?'selected':''}/><rect x="166" y="10" width="130" height="58" rx="6" className={step===2?'selected':''}/><text x="69" y="34" textAnchor="middle">先：Character</text><text x="69" y="54" textAnchor="middle">name / health</text><path d="M136 39h27" markerEnd={`url(#${marker})`}/><text x="231" y="34" textAnchor="middle">再：Warrior</text><text x="231" y="54" textAnchor="middle">子类构造完成</text><text x="150" y="96" textAnchor="middle" className="sketch-note">谁声明成员，谁负责直接初始化</text></svg>;
  return null;
}

function Concept({lesson:l}:{lesson:Lesson}) {
  const [step,setStep]=useState(0);const [playing,setPlaying]=useState(false);
  useEffect(()=>{ if(!playing)return; const id=setInterval(()=>setStep(s=>{if(s>=l.frames.length-1){setPlaying(false);return s;}return s+1;}),2000);return()=>clearInterval(id); },[playing,l.frames.length]);
  const frame=l.frames[step];
  return <section className="concept-section"><div className="section-heading"><h2><Box size={20}/> 看见概念如何发生</h2><span className="outlined-badge">教学模拟 · 可单步观察</span></div><div className="concept-grid"><div className={`concept-visual visual-${l.kind}`}><div className="visual-top"><span className="tiny-mono">CONCEPT EXPLORER / {number(l.n)}</span><span className="visual-step">{step+1} / {l.frames.length}</span></div><h3>{frame.title}</h3>
    <ConceptSketch lesson={l} step={step}/>{l.kind==='vector' && <svg className="vector-art" viewBox="0 0 260 130" role="img" aria-label="二维向量示意：x分量3，y分量4，长度5"><path d="M30 110H245M30 110V10" stroke="currentColor" opacity=".3"/><path d="M30 110 180 30" stroke="currentColor" strokeWidth="3"/><path d="M30 110H180V30" stroke="currentColor" strokeDasharray="4 5" opacity=".4"/><circle cx="180" cy="30" r="5" fill="currentColor"/><text x="110" y="128">x = 3</text><text x="185" y="80">y = 4</text><text x="80" y="55">长度 = 5</text></svg>}
    <div className="visual-nodes">{frame.nodes.map((node,i)=><div className="visual-node-wrap" key={`${step}-${i}`}><div className={`visual-node node-${i}`}><span className="node-index">{number(i+1)}</span><small>{node.label}</small><strong>{node.value}</strong></div>{i<frame.nodes.length-1&&<ArrowRight className="node-arrow" size={18} aria-hidden="true"/>}</div>)}</div>
    <p className="visual-explanation" aria-live="polite"><Lightbulb size={16}/>{frame.explanation}</p><div className="step-selector" aria-label="演示步骤">{l.frames.map((f,i)=><button key={i} aria-label={`${i+1}. ${f.title}`} aria-pressed={step===i} className={step===i?'active':''} onClick={()=>{setStep(i);setPlaying(false);}}>{i+1}<span>{f.title}</span></button>)}</div><div className="visual-controls"><button className="button primary small" onClick={()=>{if(step===l.frames.length-1)setStep(0);setPlaying(p=>!p);}}>{playing?<Pause size={14}/>:<Play size={14}/>} {playing?'暂停':'开始'}</button><button className="button secondary small" disabled={step===l.frames.length-1} onClick={()=>{setPlaying(false);setStep(s=>Math.min(l.frames.length-1,s+1));}}>单步 <ChevronRight size={14}/></button><button className="icon-button" aria-label="重置演示" title="重置演示" onClick={()=>{setPlaying(false);setStep(0);}}><RotateCcw size={16}/></button></div></div><CodeBlock code={l.code} name={l.n===21?'CMakeLists.txt':l.files.find(f=>f.content===l.code)?.name??l.files.find(f=>f.name.endsWith('.cpp'))?.name} lines={frame.lines} language={l.n===21?'cmake':'cpp'} maxHeight/></div><p className="caption">图中的结构与地址是简化教学模型。演示不会执行或编译 C++；请在 VS Code 验证实际行为。</p></section>;
}

function Stats({data,timer}:{data:LabState;timer:ReturnType<typeof useStudyTimer>}) {
  const total=sumSessions(data.sessions)+(timer.activeLesson?timer.pending:0);
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">TIME BY LESSON</span><h1>每一课的学习积累<span className="heading-dot">.</span></h1><p>打开课程开始，离开整个网站结束。切到 VS Code、空闲和休眠均计入；切课后归属新课程。</p></div></div><div className="simple-time-summary"><section className="panel"><Clock3 size={22}/><p>累计学习时长</p><strong>{formatTime(total)}</strong><small>包含改版前已经保存的历史记录</small></section><section className="panel"><BookOpen size={22}/><p>当前计时课程</p><strong>{lessons.find(l=>l.id===timer.activeLesson)?.title??'尚未开始'}</strong><small>{timer.status} · 本次 {formatTime(timer.elapsed)}</small></section></div><section className="panel course-times"><div className="section-heading"><h2>各课程学习时长</h2><span className="muted">每 15 秒保存 · 无 30 分钟上限</span></div><div className="course-time-grid">{lessons.map(l=><a key={l.id} href={`#lesson/${l.id}`}><span>{number(l.n)} · {l.title}{timer.activeLesson===l.id?' · 正在计时':''}</span><strong>{formatTime(sumSessions(data.sessions.filter(s=>s.lessonId===l.id))+(timer.activeLesson===l.id?timer.pending:0))}</strong></a>)}</div></section><p className="caption">正常离开时尝试立即结算。异常退出只保留已保存时间，下次打开不会补算关闭期间的间隔。网站仍需手动 Git 推送。</p></div>;
}

function Guide({data,onError}:{data:LabState;onError:(e:unknown)=>void}) {
  return <div className="page guide-page"><div className="page-heading"><div><span className="eyebrow">LOCAL FIRST. ALWAYS YOURS.</span><h1>你的代码，你的学习档案<span className="heading-dot">.</span></h1><p>GitHub 保存完整仓库。本地文件是正式记录，浏览器只为未保存草稿兜底。</p></div><button className="button secondary" onClick={async()=>{try{const exported=await api('export');download(`engine-lab-${hkDate()}.json`,JSON.stringify(exported,null,2));}catch(e){onError(e);}}}><ArrowDownToLine size={16}/> 导出学习档案</button></div><div className="guide-steps">{[['01','拉取最新内容','打开 VS Code 项目，先使用源代码管理的“拉取”。确认当前改动已妥善保存，再开始同步。'],['02','启动本地网站','在VS Code打开cpp-engine-academy，首次执行npm install。以后通过“终端 → 运行任务 → 启动学习网站”运行，浏览器打开http://127.0.0.1:5173。'],['03','学习、编码、保存','网页记录课程进度与时长，练习代码放在仓库内。练习已预置在exercises/lessonNN/；打开课程后持续计时，切到VS Code、空闲和休眠均计入，切课自动更换归属。'],['04','停止、提交并推送','确认页面显示已保存，关闭网页并在终端Ctrl+C停止网站。检查Git变更，提交课程数据与代码，再点击推送。']].map(([n,title,text])=><section className="guide-step" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></section>)}</div><div className="guide-grid"><section className="panel"><h2><FolderGit2 size={20}/> 仓库中的文件</h2><pre className="folder-tree">{`cpp-engine-academy/       # 唯一的Git仓库根目录\n├─ .git/                  # 仅此项目的Git信息\n├─ package.json           # npm启动入口\n├─ src/、server/           # 网站源码与保存服务\n├─ .vscode/               # 网站和C++调试任务\n├─ exercises/             # 历史和新练习\n│  ├─ lesson01/lesson1.cpp\n│  └─ lesson12/            # main、Player、Weapon\n└─ learning-data/         # 要提交的进度与学习时长`}</pre><p>Git只管理cpp-engine-academy内部文件，外层ChatGPT项目不纳入仓库。网站不替你执行Git操作。</p></section><section className="panel"><h2><ShieldCheck size={20}/> 同步时的几个约定</h2><ul><li>本地已保存与GitHub已同步是两回事；推送成功才完成云端备份。</li><li>拉取、切分支和手改JSON前先停止网站，避免运行中的旧状态覆盖新文件。</li><li>两台电脑不要同时修改同一课；出现冲突时在VS Code比较双方内容，不要强制覆盖。</li><li>发现损坏JSON时网站会报告文件名，修复后刷新，原文件不会被自动重置。</li><li>新电脑需要Node.js 22.13或更新版本；C++和UE工具链分别配置。</li></ul></section></div><section className="panel"><h2>首次连接 GitHub</h2><p>在VS Code中检查变更并完成首次提交，然后使用“发布到GitHub”，或为已有仓库设置origin。建议个人学习档案使用私人仓库。这里不保存GitHub密码或令牌。</p><pre className="plain-code">{'# 在仓库根目录，替换为你自己的实际仓库地址\ngit remote add origin https://github.com/你的用户名/你的仓库.git\n# 首次提交完成后，推送当前分支（分支名先用 git branch 检查）\ngit push -u origin 当前分支名'}</pre><a className="inline-link" target="_blank" rel="noreferrer" href="https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository">GitHub 官方推送说明 <ExternalLink size={14}/></a></section><section className="panel"><h2>当前档案概况</h2><p>{Object.values(data.lessons).filter(r=>r.completed).length} 课完成 · {data.sessions.filter(s=>!s.deleted&&s.durationMs>0).length} 条有效时间记录 · 数据格式 v1</p><p>UE 课程目标版本为5.6，示例未在本机UE编辑器编译。练习目录包含源码与资产配置说明，不包含UE安装包、蓝图或关卡资产。</p></section></div>;
}
