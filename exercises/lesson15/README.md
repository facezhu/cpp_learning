# 第15课 对象生命周期与 RAII

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson15.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson15.exe
.\lesson15.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson15.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson15
./lesson15
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 构造和析构分别打印获取与释放信息。
2. 创建Texture后创建Sound，验证先释放Sound。
3. 添加提前return，确认已构造对象仍然析构。

## 预期结果

```text
Acquire Texture
Acquire Sound
Scene ready
Release Sound
Release Texture
Back to menu
```

## 自查

- [ ] 构造和析构分别打印获取与释放信息。
- [ ] 创建Texture后创建Sound，验证先释放Sound。
- [ ] 添加提前return，确认已构造对象仍然析构。

## 选做挑战

用std::ofstream替换打印模拟，写入文件后不手动调用close。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
