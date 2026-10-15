# 第2课 数据类型与运算符

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson2.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson2.exe
.\lesson2.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson2.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson2
./lesson2
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 读取总秒数，沿用你的 hours、remainingSeconds、minutes、seconds。
2. 用 / 与 % 分离时、分、秒。
3. 验证 0、59、60、3600、3661；负数拒绝作为选做扩展。

## 预期结果

```text
hours: 1
minutes: 1
seconds: 1
```

## 自查

- [ ] 读取总秒数，沿用你的 hours、remainingSeconds、minutes、seconds。
- [ ] 用 / 与 % 分离时、分、秒。
- [ ] 验证 0、59、60、3600、3661；负数拒绝作为选做扩展。

## 选做挑战

添加毫秒输入，并解释为什么游戏内位置更新通常不使用整数秒。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
