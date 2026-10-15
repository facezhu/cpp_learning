# 第17课 容器、迭代器与角色队伍

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson17.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson17.exe
.\lesson17.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson17.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson17
./lesson17
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 创建包含Warrior与Mage的unique_ptr容器。
2. 通过基类虚接口遍历，避免按值切片。
3. 用erase返回值安全地移除Mage，验证剩余数量。

## 预期结果

```text
Warrior
Mage
Team size: 1
```

## 自查

- [ ] 创建包含Warrior与Mage的unique_ptr容器。
- [ ] 通过基类虚接口遍历，避免按值切片。
- [ ] 用erase返回值安全地移除Mage，验证剩余数量。

## 选做挑战

添加Archer，按谓词移除已死亡角色。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
