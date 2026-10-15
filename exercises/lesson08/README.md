# 第8课 指针与内存地址

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson8.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson8.exe
.\lesson8.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson8.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson8
./lesson8
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留 applyDamage(int*)、healPlayer(int&) 和 printHealth(const int*)。
2. 依次打印100、伤害30后的70、治疗15后的85。
3. 传入nullptr输出No player data；解释指针的*、&与引用的&。

## 预期结果

```text
Health: 100
Health: 70
Health: 85
No player data
```

## 自查

- [ ] 保留 applyDamage(int*)、healPlayer(int&) 和 printHealth(const int*)。
- [ ] 依次打印100、伤害30后的70、治疗15后的85。
- [ ] 传入nullptr输出No player data；解释指针的*、&与引用的&。

## 选做挑战

写一个引用版本，比较调用方式与可空性。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
