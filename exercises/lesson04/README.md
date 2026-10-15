# 第4课 循环：重复，但有出口

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson4.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson4.exe
.\lesson4.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson4.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson4
./lesson4
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 沿用 while 重输正整数，理解循环何时结束。
2. 用 for 计算1到n的和。
3. 再遍历输出偶数与数量，测试1、3、6；输入0后再输入3检查重试。

## 预期结果

```text
The sum of 1 to 6 is: 21
The even numbers are: 2 4 6
The count of even numbers is: 3
```

## 自查

- [ ] 沿用 while 重输正整数，理解循环何时结束。
- [ ] 用 for 计算1到n的和。
- [ ] 再遍历输出偶数与数量，测试1、3、6；输入0后再输入3检查重试。

## 选做挑战

另外统计偶数的和，并写一个 while 版本对照。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
