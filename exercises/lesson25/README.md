# 第25课 实体与组件

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson25.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson25.exe
.\lesson25.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson25.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson25
./lesson25
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 创建带Health组件的玩家和不带Health的树。
2. 伤害函数只修改具有Health的对象，检查空组件。
3. 保留稳定ID，不把vector下标当永久身份。

## 预期结果

```text
Player HP: 70
Tree has health: 0
```

## 自查

- [ ] 创建带Health组件的玩家和不带Health的树。
- [ ] 伤害函数只修改具有Health的对象，检查空组件。
- [ ] 保留稳定ID，不把vector下标当永久身份。

## 选做挑战

增加Velocity组件，实现只更新同时拥有Transform和Velocity的实体。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
