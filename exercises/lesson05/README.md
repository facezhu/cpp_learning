# 第5课 函数与作用域

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson5.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson5.exe
.\lesson5.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson5.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson5
./lesson5
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留 readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers 的职责。
2. 逐个对照声明、调用、定义；解释形参与返回值。
3. 输入6得到总和21与3个偶数；测试输入0后再输入3。

## 预期结果

```text
Sum: 21
Even numbers: 2 4 6
Even count: 3
```

## 自查

- [ ] 保留 readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers 的职责。
- [ ] 逐个对照声明、调用、定义；解释形参与返回值。
- [ ] 输入6得到总和21与3个偶数；测试输入0后再输入3。

## 选做挑战

增加 readPositiveNumber 和 printResult，解释 main 的执行次序。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
