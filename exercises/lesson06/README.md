# 第6课 字符串、数组与 vector

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson6.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson6.exe
.\lesson6.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson6.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson6
./lesson6
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留你的成绩录入、逐个重输非法成绩和统计函数。
2. 对照 reference 修复声明与定义的 const 引用不一致，理解为何产生链接错误。
3. 输入3个成绩80、90、100，检查总分、平均、最高与最低。

## 预期结果

```text
Total score: 270
Average score: 90
Highest score: 100
Lowest score: 80
原文件的4处只读函数定义与声明签名不一致，修正版见reference。
```

## 自查

- [ ] 保留你的成绩录入、逐个重输非法成绩和统计函数。
- [ ] 对照 reference 修复声明与定义的 const 引用不一致，理解为何产生链接错误。
- [ ] 输入3个成绩80、90、100，检查总分、平均、最高与最低。

## 选做挑战

把分数替换成队员生命值，输出低于平均生命值的成员。

## 历史代码说明

原工作文件完整保留。其printStudentScores、calculateTotalScore、findHighestScore、findLowestScore四个函数的声明带const引用，定义却未带const；二者不是相同签名，会造成链接错误。reference仅修复这些定义。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
