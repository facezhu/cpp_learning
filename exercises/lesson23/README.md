# 第23课 向量、坐标与移动

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson23.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson23.exe
.\lesson23.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson23.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson23
./lesson23
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 实现Vec2长度与归一化。
2. 零向量安全返回(0,0)，不产生NaN。
3. 验证(3,4)长度5，归一化为(0.6,0.8)。

## 预期结果

```text
Direction: 0.6, 0.8
Zero: 0, 0
```

## 自查

- [ ] 实现Vec2长度与归一化。
- [ ] 零向量安全返回(0,0)，不产生NaN。
- [ ] 验证(3,4)长度5，归一化为(0.6,0.8)。

## 选做挑战

实现点积，用它判断目标是否在角色前方。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
