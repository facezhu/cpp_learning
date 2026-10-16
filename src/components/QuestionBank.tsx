import {useState} from 'react';
import {lessons as rawLessons} from '../content/curriculum.mjs';
import type {Lesson} from '../types';
import {RichText} from './Text';
const lessons=rawLessons as unknown as Lesson[];

export function QuestionList({lesson,showCourse=false}:{lesson:Lesson;showCourse?:boolean}){
  return <>{lesson.questions.map((question,index)=><article className="question-card" key={question.id}><div className="question-label"><span>Q{String(index+1).padStart(2,'0')}</span>{showCourse&&<a href={`#lesson/${lesson.id}`}>{String(lesson.n).padStart(2,'0')} · {lesson.title}</a>}{question.advanced&&<span className="pill">进阶</span>}</div><h3>{question.q}</h3><RichText text={question.a}/></article>)}</>;
}
export function QuestionBank(){
  const [selected,setSelected]=useState('all');
  const group=lessons.filter(lesson=>selected==='all'||lesson.id===selected);
  return <div className="page question-bank"><div className="page-heading"><div><span className="eyebrow">C++ INTERVIEW</span><h1>面试问题与参考答案<span className="heading-dot">.</span></h1><p>{lessons.reduce((sum,l)=>sum+l.questions.length,0)} 道问答，按课程查阅。</p></div></div><div className="review-toolbar"><label>选择课程<select value={selected} onChange={e=>setSelected(e.target.value)}><option value="all">全部课程</option>{lessons.map(l=><option value={l.id} key={l.id}>{String(l.n).padStart(2,'0')} · {l.title}</option>)}</select></label><span>{group.reduce((sum,l)=>sum+l.questions.length,0)} 道</span></div>{group.map(lesson=><QuestionList key={lesson.id} lesson={lesson} showCourse/>)}</div>;
}
