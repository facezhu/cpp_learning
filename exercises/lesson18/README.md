# 第18课 STL 算法与 lambda

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson18.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson18.exe
.\lesson18.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson18.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson18
./lesson18
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 使用erase-remove移除生命值<=0的角色数据。
2. 用lambda按生命值降序排序。
3. 验证空容器与全为0的容器。

## 预期结果

```text
80 30 10
Alive: 3
```

## 自查

- [ ] 使用erase-remove移除生命值<=0的角色数据。
- [ ] 用lambda按生命值降序排序。
- [ ] 验证空容器与全为0的容器。

## 选做挑战

把int改成含ID、名字和health的结构体，打印排序后ID。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
