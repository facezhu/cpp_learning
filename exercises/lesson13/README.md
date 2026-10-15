# 第13课 继承：战士是一种角色

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson13.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson13.exe
.\lesson13.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson13.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson13
./lesson13
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留Character、Warrior、Mage与powerAttack/castSpell接口。
2. 完整追踪Warrior("Arthur")到Character(warriorName,120)再到name/health的初始化。
3. 两轮后检查Arthur生命40、Merlin生命10、Mage mana为60。

## 预期结果

```text
Name: Arthur
Health: 40
Name: Merlin
Health: 10
Mage mana: 60
```

## 自查

- [ ] 保留Character、Warrior、Mage与powerAttack/castSpell接口。
- [ ] 完整追踪Warrior("Arthur")到Character(warriorName,120)再到name/health的初始化。
- [ ] 两轮后检查Arthur生命40、Merlin生命10、Mage mana为60。

## 选做挑战

让Warrior构造函数接受可选初始生命值，解释数据如何传到父类。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
