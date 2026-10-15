# 第16课 智能指针与所有权

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson16.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson16.exe
.\lesson16.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson16.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson16
./lesson16
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 使用make_unique创建角色，不直接写new/delete。
2. 用move转移拥有权，验证源unique_ptr为空。
3. 观察析构发生一次，不使用销毁后的观察指针。

## 预期结果

```text
Observe: Arthur
First empty: 1
Owner: Arthur
Destroy Arthur
```

## 自查

- [ ] 使用make_unique创建角色，不直接写new/delete。
- [ ] 用move转移拥有权，验证源unique_ptr为空。
- [ ] 观察析构发生一次，不使用销毁后的观察指针。

## 选做挑战

写shared_ptr和weak_ptr示例，用expired解释目标是否仍存在。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
