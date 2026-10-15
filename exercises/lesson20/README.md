# 第20课 错误处理与调试

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson20.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson20.exe
.\lesson20.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson20.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson20
./lesson20
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 负伤害抛出invalid_argument，正常伤害将生命值限制在0以上。
2. 通过const std::exception&捕获并打印错误。
3. 在throw与return设置断点，分别触发两条路径。

## 预期结果

```text
Health: 70
Error: negative damage
```

## 自查

- [ ] 负伤害抛出invalid_argument，正常伤害将生命值限制在0以上。
- [ ] 通过const std::exception&捕获并打印错误。
- [ ] 在throw与return设置断点，分别触发两条路径。

## 选做挑战

把同样接口改为std::optional<int>返回，比较调用者处理方式。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
