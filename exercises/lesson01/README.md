# 第1课 认识 C++：让程序开口

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson1.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson1.exe
.\lesson1.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson1.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson1
./lesson1
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 输入姓名、年龄、身高，分别选择 string、int、double。
2. 输出三个字段，保留你原有的输入输出顺序。
3. 用另一个姓名与数值重新运行，解释 cin 与 cout 的区别。

## 预期结果

```text
Name: Arthur
Age: 18
Height: 1.75
```

## 自查

- [ ] 输入姓名、年龄、身高，分别选择 string、int、double。
- [ ] 输出三个字段，保留你原有的输入输出顺序。
- [ ] 用另一个姓名与数值重新运行，解释 cin 与 cout 的区别。

## 选做挑战

改成角色创建界面，增加等级与生命值；尝试读取包含空格的角色名。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
