// Safe to rerun: never replaces a learner's working source file.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { lessons } from '../src/content/curriculum.mjs';
const root=process.cwd();
const overrides={};
const legacy={
1:{tasks:['输入姓名、年龄、身高，分别选择 string、int、double。','输出三个字段，保留你原有的输入输出顺序。','用另一个姓名与数值重新运行，解释 cin 与 cout 的区别。'],input:'Arthur 18 1.75\n',expected:'Name: Arthur\nAge: 18\nHeight: 1.75',verify:['Name: Arthur','Age: 18','Height: 1.75']},
2:{tasks:['读取总秒数，沿用你的 hours、remainingSeconds、minutes、seconds。','用 / 与 % 分离时、分、秒。','验证 0、59、60、3600、3661；负数拒绝作为选做扩展。'],input:'3661\n',expected:'hours: 1\nminutes: 1\nseconds: 1',verify:['hours: 1','minutes: 1','seconds: 1']},
3:{tasks:['沿用你的票价规则：原价50，0–5岁免费，6–17岁半价，60岁起三分之一。','收费分支中会员再减5；免费票不再减。','测试年龄 -1、0、5、6、17、18、59、60 和两种会员状态。'],input:'60\n1\n',expected:'18岁非会员 → 50 yuan\n6岁会员 → 20 yuan\n60岁会员 → 约11.6667 yuan\n0–5岁 → The ticket is free\n负数 → age is invalid',verify:['11.6667']},
4:{tasks:['沿用 while 重输正整数，理解循环何时结束。','用 for 计算1到n的和。','再遍历输出偶数与数量，测试1、3、6；输入0后再输入3检查重试。'],input:'6\n',expected:'The sum of 1 to 6 is: 21\nThe even numbers are: 2 4 6\nThe count of even numbers is: 3',verify:['is: 21','2 4 6','is: 3']},
5:{tasks:['保留 readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers 的职责。','逐个对照声明、调用、定义；解释形参与返回值。','输入6得到总和21与3个偶数；测试输入0后再输入3。'],input:'6\n',expected:'Sum: 21\nEven numbers: 2 4 6\nEven count: 3',verify:['Sum: 21','Even numbers: 2 4 6','Even count: 3']},
6:{tasks:['保留你的成绩录入、逐个重输非法成绩和统计函数。','对照 reference 修复声明与定义的 const 引用不一致，理解为何产生链接错误。','输入3个成绩80、90、100，检查总分、平均、最高与最低。'],input:'3\n80\n90\n100\n',expected:'Total score: 270\nAverage score: 90\nHighest score: 100\nLowest score: 80\n原文件的4处只读函数定义与声明签名不一致，修正版见reference。',verify:['Total score: 270','Average score: 90','Highest score: 100','Lowest score: 80']},
7:{tasks:['保留初始成绩65、78、92、100，输入bonus。','addBonus 用可修改引用改变原vector，超过100截到100。','只读打印与平均使用const引用；对照参考增加空容器平均值保护。'],input:'10\n',expected:'Before: 65 78 92 100\nAfter: 75 88 100 100\nAverage: 90.75',verify:['75 88 100 100','Average: 90.75']},
8:{tasks:['保留 applyDamage(int*)、healPlayer(int&) 和 printHealth(const int*)。','依次打印100、伤害30后的70、治疗15后的85。','传入nullptr输出No player data；解释指针的*、&与引用的&。'],expected:'Health: 100\nHealth: 70\nHealth: 85\nNo player data',verify:['Health: 100','Health: 70','Health: 85','No player data']},
9:{tasks:['沿用两个Player和private name/health，提供setName与伤害、治疗、状态接口。','Knight受到30伤害后治疗10；Mage受到120伤害。','打印Knight alive: true和Mage alive: false，解释boolalpha。'],expected:'Name: Knight\nHealth: 80\nName: Mage\nHealth: 0\nKnight alive: true\nMage alive: false',verify:['Health: 80','Health: 0','Knight alive: true','Mage alive: false']},
10:{tasks:['保留默认构造和带name/health的构造函数，用初始化列表建立成员。','测试startingHealth为负数及150时的范围修正。','按原main执行伤害与治疗；区分初始值和最终值。'],expected:'默认玩家最终 Health: 80\nKnight最终 Health: 0\nMage从150截到100，最终 Health: 60\nKnight has been defeated.',verify:['Health: 80','Health: 0','Health: 60','Knight has been defeated.']},
11:{tasks:['保留Weapon和Player组合，Iron Sword伤害30、Magic Staff伤害45。','按原main进行三轮相互攻击，追踪双方血量。','通过weapon.getDamage()取伤害；死亡角色不能继续攻击。'],expected:'三轮结束：Knight Health: 0；Mage Health: 10。\n每轮依次为(55,70)、(10,40)、(0,10)，格式见原printStatus。',verify:['Health: 0','Health: 10']},
12:{tasks:['保留main.cpp、Player.h/.cpp、Weapon.h/.cpp五个原文件。','只一起编译根目录的main.cpp、Player.cpp、Weapon.cpp。','沿用while战斗与败者不反击的检查，说明头文件与实现分工。'],expected:'Mage wins!\nKnight最终Health: 0\nMage最终Health: 10',verify:['Mage wins!','Health: 0','Health: 10']},
13:{tasks:['保留Character、Warrior、Mage与powerAttack/castSpell接口。','完整追踪Warrior("Arthur")到Character(warriorName,120)再到name/health的初始化。','两轮后检查Arthur生命40、Merlin生命10、Mage mana为60。'],expected:'Name: Arthur\nHealth: 40\nName: Merlin\nHealth: 10\nMage mana: 60',verify:['Health: 40','Health: 10','Mage mana: 60']}
};
async function exists(file){try{await fs.access(file);return true;}catch{return false;}}
// Normalize the user's downloaded lesson14 without changing any source bytes.
const downloaded=path.join(root,'exercises','lesson14-exercise');
if(await exists(downloaded)){
  const target=path.join(root,'exercises','lesson14');await fs.mkdir(target,{recursive:true});
  for(const sub of ['starter','reference']){
    const from=path.join(downloaded,sub);if(!await exists(from))continue;
    const to=sub==='starter'?target:path.join(target,'reference');await fs.mkdir(to,{recursive:true});
    for(const name of await fs.readdir(from)){const source=path.resolve(from,name),dest=path.resolve(to,name);if(!source.startsWith(root+path.sep)||!dest.startsWith(root+path.sep))throw Error('Migration outside project');if(await exists(dest)){if(!(await fs.readFile(source)).equals(await fs.readFile(dest)))throw Error(`Conflict: ${dest}`);}else await fs.rename(source,dest);}
    if(!(await fs.readdir(from)).length)await fs.rmdir(from);
  }
  const oldReadme=path.join(downloaded,'README.txt');if(await exists(oldReadme))await fs.rename(oldReadme,path.join(target,'README.downloaded.txt'));
  if(!(await fs.readdir(downloaded)).length)await fs.rmdir(downloaded);
}
for(const lesson of lessons){
  const dir=path.join(root,'exercises',`lesson${String(lesson.n).padStart(2,'0')}`);const ref=path.join(dir,'reference');await fs.mkdir(ref,{recursive:true});
  let files=lesson.files;
  if(lesson.n<=13){
    const names=(await fs.readdir(dir)).filter(n=>/\.(cpp|h|hpp)$/.test(n)).sort();
    files=await Promise.all(names.map(async name=>({name,content:await fs.readFile(path.join(dir,name),'utf8')})));
    if(lesson.n===6)for(const f of files)f.content=f.content.replaceAll('void printStudentScores(std::vector<int>& scores)','void printStudentScores(const std::vector<int>& scores)').replaceAll('int calculateTotalScore(std::vector<int>& scores)','int calculateTotalScore(const std::vector<int>& scores)').replaceAll('int findHighestScore(std::vector<int>& scores)','int findHighestScore(const std::vector<int>& scores)').replaceAll('int findLowestScore(std::vector<int>& scores)','int findLowestScore(const std::vector<int>& scores)');
    if(lesson.n===7)for(const f of files)f.content=f.content.replace('    int sum = 0;','    if (scores.empty()) return 0.0; // Empty scores have no arithmetic mean; this exercise uses 0.\n    int sum = 0;');
    const data=legacy[lesson.n];
    const frames=[['建立状态',[['工作源码',names.join(' / ')],['初始条件','按原main初始化'],['观察目标',lesson.objectives[0]]],'先阅读自己的原始代码，区分声明与实际运行。',[]],['执行与追踪',[['本课任务',data.tasks[0]],['调用顺序','以main中的语句为准'],['数据变化','逐步运行并查看变量']],'图解为辅助教学；完整数值和调用步骤见前面的详细讲义。',[]],['核对结果',[['预期输出',data.verify.join('；')],['参考目录','reference/'],['自查',data.tasks[2]]],'将VS Code实际结果与预期对照，保留自己的代码风格。',[]]];
    overrides[lesson.n]={...data,files,starterFiles:files,code:files.find(f=>f.name==='main.cpp')?.content??files.find(f=>f.name.endsWith('.cpp')).content,frames};
  }
  for(const file of files)await fs.writeFile(path.join(ref,file.name),file.content);
  for(const file of lesson.starterFiles){const work=path.join(dir,file.name);if(!await exists(work))await fs.writeFile(work,file.content,{flag:'wx'});}
  const meta=legacy[lesson.n]??lesson;const cpp=files.filter(f=>f.name.endsWith('.cpp')).map(f=>f.name).join(' ');
  const normal=`在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。\n\nWindows PowerShell（先进入本目录）：\n\n\`\`\`powershell\ng++ ${cpp} -std=c++17 -Wall -Wextra -pedantic -g -o lesson${lesson.n}.exe\n.\\lesson${lesson.n}.exe\n\`\`\`\n\nmacOS终端（先安装Xcode命令行工具）：\n\n\`\`\`sh\nclang++ ${cpp} -std=c++17 -Wall -Wextra -pedantic -g -o lesson${lesson.n}\n./lesson${lesson.n}\n\`\`\`\n\n不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。`;
  const note=lesson.n===6?'\n## 历史代码说明\n\n原工作文件完整保留。其printStudentScores、calculateTotalScore、findHighestScore、findLowestScore四个函数的声明带const引用，定义却未带const；二者不是相同签名，会造成链接错误。reference仅修复这些定义。\n':lesson.n===7?'\n## 历史代码说明\n\n原工作文件完整保留；reference为calculateAverage补充空容器保护，原main数值与加分行为保持一致。\n':'';
  const text=`# 第${lesson.n}课 ${lesson.title}\n\n${lesson.n<=14?'已有工作源码按原样保留；下面任务沿用你的学习上下文。':'根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。'}\n\n## 使用方式\n\n${lesson.setup??normal}\n\n${lesson.n===21?'CMake方式：cmake -S . -B build，然后cmake --build build；输出位于build目录。\n\n':''}## 必做任务\n\n${meta.tasks.map((t,i)=>`${i+1}. ${t}`).join('\n')}\n\n## 预期结果\n\n\`\`\`text\n${meta.expected}\n\`\`\`\n\n## 自查\n\n${(legacy[lesson.n]?.tasks??lesson.checklist).map(t=>`- [ ] ${t}`).join('\n')}\n\n## 选做挑战\n\n${lesson.challenge}\n${note}\n## 保存与同步\n\n保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。\n${lesson.n>=27?'\nUE目标版本5.6，模块EngineLab；源码未在本机UE编辑器编译验证。蓝图、输入资产与关卡必须按说明自行建立，不能用g++构建。\n':''}`;
  await fs.writeFile(path.join(dir,'README.md'),text);
}
await fs.writeFile('src/content/historical-examples.mjs','// Generated from preserved learner sources by scripts/prepare-exercises.mjs.\nexport const historicalExamples='+JSON.stringify(overrides,null,2)+';\n');
console.log('Prepared 32 exercise folders and references; existing working source files preserved.');
