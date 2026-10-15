# 第26课 资源缓存与生命周期

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson26.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson26.exe
.\lesson26.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson26.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson26
./lesson26
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 缓存使用weak_ptr索引，get先lock再决定是否加载。
2. 两个调用方获取同一路径，验证指向同一对象。
3. 释放全部强引用，再获取时出现新的Load。

## 预期结果

```text
Load hero.png
Same resource: 1
Unload hero.png
Load hero.png
Unload hero.png
```

## 自查

- [ ] 缓存使用weak_ptr索引，get先lock再决定是否加载。
- [ ] 两个调用方获取同一路径，验证指向同一对象。
- [ ] 释放全部强引用，再获取时出现新的Load。

## 选做挑战

增加不存在资源的错误结果；说明线程并发调用时需要哪些保护。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
