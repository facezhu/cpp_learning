# 第22课 综合项目：回合制战斗

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson22.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson22.exe
.\lesson22.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson22.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson22
./lesson22
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 组合多态角色、unique_ptr与vector。
2. 战斗通过共同接口运行，死亡后不反击。
3. 加入100轮限制，额外验证无法造成伤害时平局。

## 预期结果

```text
Arthur wins!
Arthur: 40
Merlin: 0
```

## 自查

- [ ] 组合多态角色、unique_ptr与vector。
- [ ] 战斗通过共同接口运行，死亡后不反击。
- [ ] 加入100轮限制，额外验证无法造成伤害时平局。

## 选做挑战

拆分多文件并用CMake构建，增加战斗记录与可重放事件。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
