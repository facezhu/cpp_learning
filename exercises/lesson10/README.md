# 第10课 构造函数与初始化列表

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson10.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson10.exe
.\lesson10.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson10.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson10
./lesson10
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留默认构造和带name/health的构造函数，用初始化列表建立成员。
2. 测试startingHealth为负数及150时的范围修正。
3. 按原main执行伤害与治疗；区分初始值和最终值。

## 预期结果

```text
默认玩家最终 Health: 80
Knight最终 Health: 0
Mage从150截到100，最终 Health: 60
Knight has been defeated.
```

## 自查

- [ ] 保留默认构造和带name/health的构造函数，用初始化列表建立成员。
- [ ] 测试startingHealth为负数及150时的范围修正。
- [ ] 按原main执行伤害与治疗；区分初始值和最终值。

## 选做挑战

增加const最大生命值成员，解释为何必须初始化而不能事后赋值。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
