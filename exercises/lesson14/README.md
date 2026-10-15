# 第14课 虚函数与多态

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson14.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson14.exe
.\lesson14.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson14.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson14
./lesson14
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. Character添加纯虚attack和虚析构函数。
2. Warrior造成35伤害；Mage消耗20魔法造成40伤害。
3. battle只使用共同接口，败者不能反击，并设置回合上限。

## 预期结果

```text
Arthur wins!
Arthur: 40
Merlin: 0
Mana: 60
```

## 自查

- [ ] Character添加纯虚attack和虚析构函数。
- [ ] Warrior造成35伤害；Mage消耗20魔法造成40伤害。
- [ ] battle只使用共同接口，败者不能反击，并设置回合上限。

## 选做挑战

添加Archer，保持battle函数不变；再测试双方都无法造成伤害的情况。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
