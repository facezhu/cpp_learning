# 第9课 类与对象：封装一个玩家

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson9.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson9.exe
.\lesson9.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson9.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson9
./lesson9
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 沿用两个Player和private name/health，提供setName与伤害、治疗、状态接口。
2. Knight受到30伤害后治疗10；Mage受到120伤害。
3. 打印Knight alive: true和Mage alive: false，解释boolalpha。

## 预期结果

```text
Name: Knight
Health: 80
Name: Mage
Health: 0
Knight alive: true
Mage alive: false
```

## 自查

- [ ] 沿用两个Player和private name/health，提供setName与伤害、治疗、状态接口。
- [ ] Knight受到30伤害后治疗10；Mage受到120伤害。
- [ ] 打印Knight alive: true和Mage alive: false，解释boolalpha。

## 选做挑战

增加最大生命值，让不同角色拥有不同的上限。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
