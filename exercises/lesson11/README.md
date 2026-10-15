# 第11课 组合：让玩家拥有武器

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson11.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson11.exe
.\lesson11.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson11.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson11
./lesson11
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 保留Weapon和Player组合，Iron Sword伤害30、Magic Staff伤害45。
2. 按原main进行三轮相互攻击，追踪双方血量。
3. 通过weapon.getDamage()取伤害；死亡角色不能继续攻击。

## 预期结果

```text
三轮结束：Knight Health: 0；Mage Health: 10。
每轮依次为(55,70)、(10,40)、(0,10)，格式见原printStatus。
```

## 自查

- [ ] 保留Weapon和Player组合，Iron Sword伤害30、Magic Staff伤害45。
- [ ] 按原main进行三轮相互攻击，追踪双方血量。
- [ ] 通过weapon.getDamage()取伤害；死亡角色不能继续攻击。

## 选做挑战

增加换武器接口，解释更换成员武器是否会改变原始sword对象。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
