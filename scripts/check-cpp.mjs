import { lessons } from '../src/content/curriculum.mjs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'.test-output/cpp');
const compiler=process.env.CPP_COMPILER || (process.platform==='win32'?'C:/msys64/ucrt64/bin/g++.exe':'g++');
const env={...process.env,PATH:`${path.dirname(compiler)}${path.delimiter}${process.env.PATH??''}`};
await fs.mkdir(output,{recursive:true});
const report=[];
function run(command,args,cwd,input='') {
  const result=spawnSync(command,args,{cwd,input,encoding:'utf8',env,timeout:20000,windowsHide:true});
  if(result.error||result.status!==0)throw new Error(`${command} ${args.join(' ')}\n${result.error?.message??''}\n${result.stderr}\n${result.stdout}`);
  return result;
}
for(const lesson of lessons.filter(l=>l.n<=26)) {
  const cwd=path.join(output,lesson.id);await fs.mkdir(cwd,{recursive:true});
  for(const file of lesson.files)await fs.writeFile(path.join(cwd,file.name),await fs.readFile(path.join(root,'exercises',`lesson${String(lesson.n).padStart(2,'0')}`,'reference',file.name)));
  const sources=lesson.files.filter(f=>f.name.endsWith('.cpp')).map(f=>f.name);
  const executable=path.join(cwd,process.platform==='win32'?'reference.exe':'reference');
  const compile=run(compiler,['-std=c++17','-Wall','-Wextra','-pedantic','-Werror',...sources,'-o',executable],cwd);
  const result=run(executable,[],cwd,lesson.input??'');const normalized=result.stdout.replace(/\r/g,'');
  for(const expected of lesson.verify??[])if(!normalized.includes(expected))throw new Error(`${lesson.id}: 输出缺少${expected}\n${normalized}`);
  const cases={2:[['0\n','seconds: 0'],['60\n','minutes: 1']],3:[['-1\n0\n','age is invalid'],['5\n1\n','The ticket is free'],['6\n1\n','20 yuan'],['17\n0\n','25 yuan'],['18\n0\n','50 yuan'],['59\n1\n','45 yuan'],['60\n0\n','16.6667 yuan']],4:[['0\n3\n','is: 6'],['1\n','is: 1'],['10000\n','is: 50005000']],5:[['0\n3\n','Sum: 6']],6:[['0\n1\n0\n','Average score: 0'],['1\n101\n80\n','Average score: 80']],7:[['0\n','Average: 83.75'],['100\n','Average: 100']]};
  for(const [input,wanted] of cases[lesson.n]??[])if(!run(executable,[],cwd,input).stdout.includes(wanted))throw new Error(`${lesson.id} 边界失败: ${input}`);
  report.push({lesson:lesson.id,compile:'pass, no warnings',output:normalized.trim(),boundaryCases:(cases[lesson.n]??[]).length,stderr:compile.stderr});
  console.log(`PASS ${lesson.id} ${lesson.title}`);
}
// A no-damage character must not leave the battle loop running forever.
const battle=lessons[13].code;
const drawCode=battle.slice(0,battle.indexOf('int main()'))+'class Passive : public Character { public: Passive():Character("Passive",100){} void attack(Character&) override {} };\nint main() { Passive a,b; battle(a,b); }\n';
const drawDir=path.join(output,'draw');await fs.mkdir(drawDir,{recursive:true});await fs.writeFile(path.join(drawDir,'draw.cpp'),drawCode);
const drawExe=path.join(drawDir,process.platform==='win32'?'draw.exe':'draw');run(compiler,['-std=c++17','-Wall','-Wextra','-pedantic','-Werror','draw.cpp','-o',drawExe],drawDir);
if(!run(drawExe,[],drawDir).stdout.includes('Draw (round limit)'))throw new Error('Draw termination failed');
// Lesson14: make the before/after dispatch claim executable, and prove that
// override catches a signature mismatch rather than silently hiding a method.
const dispatchDir=path.join(output,'dispatch');await fs.mkdir(dispatchDir,{recursive:true});
const dispatch='#include <iostream>\nstruct Plain { void attack(){std::cout<<"base ";} }; struct PlainWarrior:Plain { void attack(){std::cout<<"warrior ";} };\nstruct Virtual { virtual ~Virtual()=default; virtual void attack(){std::cout<<"base ";} }; struct VirtualWarrior:Virtual { void attack() override{std::cout<<"warrior ";} };\nint main(){PlainWarrior a; Plain& x=a; x.attack(); VirtualWarrior b; Virtual& y=b; y.attack();}\n';
await fs.writeFile(path.join(dispatchDir,'dispatch.cpp'),dispatch);const dispatchExe=path.join(dispatchDir,process.platform==='win32'?'dispatch.exe':'dispatch');run(compiler,['-std=c++17','-Wall','-Wextra','-pedantic','-Werror','dispatch.cpp','-o',dispatchExe],dispatchDir);if(run(dispatchExe,[],dispatchDir).stdout!=='base warrior ')throw Error('Dispatch explanation mismatch');
await fs.writeFile(path.join(dispatchDir,'invalid.cpp'),'struct Base {virtual void attack(int&)=0;}; struct Derived:Base {void attack(int) override {}};\n');
const invalid=spawnSync(compiler,['-std=c++17','-c','invalid.cpp'],{cwd:dispatchDir,encoding:'utf8',env,windowsHide:true});if(invalid.status===0||invalid.error)throw Error('override mismatch did not produce expected compiler error');
// Compile the actual complete explanatory snippets as well as the disk reference.
const lecture=lessons[13].lecture;
for(const [label,code,wanted] of [
  ['static',lecture[3].code,'Warrior::attack\nCharacter::attack'],
  ['virtual',lecture[5].code,'Warrior::attack\nWarrior::attack'],
  ['destructor',lecture[18].code,'Warrior destroyed\nCharacter destroyed'],
  ['integrated',['#include <algorithm>','#include <iostream>','#include <string>',...([12,13,14,17,20].map(i=>lecture[i].code))].join('\n'),'Mage mana: 60']
]){
  const file=`lecture-${label}.cpp`;await fs.writeFile(path.join(dispatchDir,file),code);const executable=path.join(dispatchDir,`lecture-${label}${process.platform==='win32'?'.exe':''}`);
  run(compiler,['-std=c++17','-Wall','-Wextra','-pedantic','-Werror',file,'-o',executable],dispatchDir);
  if(!run(executable,[],dispatchDir).stdout.replace(/\r/g,'').includes(wanted))throw Error(`Lecture14 ${label} output mismatch`);
}
await fs.writeFile(path.join(output,'report.json'),JSON.stringify({testedAt:new Date().toISOString(),compiler,report,draw:'pass',dispatch:'pass',invalidOverride:'expected compiler rejection',lecture14:'4 actual lecture examples pass',unreal:'Not compiled; UE 5.6 editor/toolchain not available in this validation'},null,2));
console.log(`\n26 references passed, ${report.reduce((n,r)=>n+r.boundaryCases,0)} input boundaries passed, bounded draw and dispatch passed, invalid override rejected. UE examples not compiled.`);
