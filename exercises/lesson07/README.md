# 第7课 引用、参数传递与 const

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson7.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson7.exe
.\lesson7.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson7.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson7
./lesson7
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留初始成绩65、78、92、100，输入bonus。
2. addBonus 用可修改引用改变原vector，超过100截到100。
3. 只读打印与平均使用const引用；对照参考增加空容器平均值保护。

## 预期结果

```text
Before: 65 78 92 100
After: 75 88 100 100
Average: 90.75
```

## 自查

- [ ] 保留初始成绩65、78、92、100，输入bonus。
- [ ] addBonus 用可修改引用改变原vector，超过100截到100。
- [ ] 只读打印与平均使用const引用；对照参考增加空容器平均值保护。

## 选做挑战

写一个按值版本，打印函数内外结果解释差异。

## 历史代码说明

原工作文件完整保留；reference为calculateAverage补充空容器保护，原main数值与加分行为保持一致。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
