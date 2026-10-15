# 第19课 文件读写与游戏存档

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson19.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson19.exe
.\lesson19.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson19.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson19
./lesson19
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 存档包含版本1、姓名和生命值，支持姓名中有空格。
2. 用临时对象加载，验证0..100范围后再更新。
3. 手动改坏文件，确认加载失败且原状态不变。

## 预期结果

```text
Sir Arthur: 75
生成save.txt；版本错误或health越界时loadSave返回false。
```

## 自查

- [ ] 存档包含版本1、姓名和生命值，支持姓名中有空格。
- [ ] 用临时对象加载，验证0..100范围后再更新。
- [ ] 手动改坏文件，确认加载失败且原状态不变。

## 选做挑战

写入临时文件后再替换正式文件，并考虑Windows的文件替换行为。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
