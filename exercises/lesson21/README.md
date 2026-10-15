# 第21课 CMake 与构建目标

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ Damage.cpp main.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson21.exe
.\lesson21.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ Damage.cpp main.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson21
./lesson21
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

CMake方式：cmake -S . -B build，然后cmake --build build；输出位于build目录。

## 必做任务

1. 为main.cpp和Damage.cpp定义battle目标。
2. 设置C++17，在独立build目录配置构建。
3. 运行battle，检查Health:65；确认build目录不提交。

## 预期结果

```text
Health: 65
配置：cmake -S . -B build -G "MinGW Makefiles"
构建：cmake --build build
运行：.\build\battle.exe
```

## 自查

- [ ] 为main.cpp和Damage.cpp定义battle目标。
- [ ] 设置C++17，在独立build目录配置构建。
- [ ] 运行battle，检查Health:65；确认build目录不提交。

## 选做挑战

把Damage改成静态库目标，再通过target_link_libraries连接。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
