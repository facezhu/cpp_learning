# 第24课 游戏循环与 DeltaTime

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson24.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson24.exe
.\lesson24.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson24.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson24
./lesson24
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 速度6单位/秒，通过dt更新位置。
2. 模拟30和60帧各1秒，结果都约为6。
3. 解释为什么浮点结果应使用误差范围比较。

## 预期结果

```text
30 FPS: 6
60 FPS: 6
```

## 自查

- [ ] 速度6单位/秒，通过dt更新位置。
- [ ] 模拟30和60帧各1秒，结果都约为6。
- [ ] 解释为什么浮点结果应使用误差范围比较。

## 选做挑战

实现固定1/60秒更新的累积器，并限制每帧最大子步数。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
