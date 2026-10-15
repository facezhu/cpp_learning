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
  for(const file of lesson.files)await fs.writeFile(path.join(cwd,file.name),file.content);
  const sources=lesson.files.filter(f=>f.name.endsWith('.cpp')).map(f=>f.name);
  const executable=path.join(cwd,process.platform==='win32'?'reference.exe':'reference');
  const compile=run(compiler,['-std=c++17','-Wall','-Wextra','-pedantic','-Werror',...sources,'-o',executable],cwd);
  const result=run(executable,[],cwd,lesson.input??'');const normalized=result.stdout.replace(/\r/g,'');
  for(const expected of lesson.verify??[])if(!normalized.includes(expected))throw new Error(`${lesson.id}: 输出缺少${expected}\n${normalized}`);
  const cases={2:[['0\n','0h 0m 0s'],['60\n','0h 1m 0s'],['-1\n','Invalid']],3:[['-1\n','Invalid'],['11\n','Price: 20'],['12\n','Price: 40'],['59\n','Price: 40']],4:[['0\n','Invalid'],['1\n','Sum: 1'],['10000\n','Sum: 50005000']],6:[['0\n','Invalid'],['1 101\n','Invalid'],['1 0\n','Average: 0']]};
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
await fs.writeFile(path.join(output,'report.json'),JSON.stringify({testedAt:new Date().toISOString(),compiler,report,draw:'pass',unreal:'Not compiled; UE 5.6 editor/toolchain not available in this validation'},null,2));
console.log(`\n26 references passed, 13 input boundaries passed, bounded draw passed. UE examples not compiled.`);
