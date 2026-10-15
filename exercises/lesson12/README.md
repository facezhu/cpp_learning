# 第12课 多文件 C++ 项目

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ Player.cpp Weapon.cpp main.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson12.exe
.\lesson12.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ Player.cpp Weapon.cpp main.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson12
./lesson12
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留main.cpp、Player.h/.cpp、Weapon.h/.cpp五个原文件。
2. 只一起编译根目录的main.cpp、Player.cpp、Weapon.cpp。
3. 沿用while战斗与败者不反击的检查，说明头文件与实现分工。

## 预期结果

```text
Mage wins!
Knight最终Health: 0
Mage最终Health: 10
```

## 自查

- [ ] 保留main.cpp、Player.h/.cpp、Weapon.h/.cpp五个原文件。
- [ ] 只一起编译根目录的main.cpp、Player.cpp、Weapon.cpp。
- [ ] 沿用while战斗与败者不反击的检查，说明头文件与实现分工。

## 选做挑战

增加独立的Battle.h/.cpp，把战斗函数从main移出。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
