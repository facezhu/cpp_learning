# 第3课 条件判断：让程序做选择

已有工作源码按原样保留；下面任务沿用你的学习上下文。

## 使用方式

在VS Code展开本目录，直接编辑根部源码。reference/是参考答案，不需要复制或解压。

Windows PowerShell（先进入本目录）：

```powershell
g++ lesson3.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson3.exe
.\lesson3.exe
```

macOS终端（先安装Xcode命令行工具）：

```sh
clang++ lesson3.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson3
./lesson3
```

不要把reference/或其他课的cpp加入编译。要运行参考答案，先进入reference目录再执行同样命令。

## 必做任务

1. 沿用你的票价规则：原价50，0–5岁免费，6–17岁半价，60岁起三分之一。
2. 收费分支中会员再减5；免费票不再减。
3. 测试年龄 -1、0、5、6、17、18、59、60 和两种会员状态。

## 预期结果

```text
18岁非会员 → 50 yuan
6岁会员 → 20 yuan
60岁会员 → 约11.6667 yuan
0–5岁 → The ticket is free
负数 → age is invalid
```

## 自查

- [ ] 沿用你的票价规则：原价50，0–5岁免费，6–17岁半价，60岁起三分之一。
- [ ] 收费分支中会员再减5；免费票不再减。
- [ ] 测试年龄 -1、0、5、6、17、18、59、60 和两种会员状态。

## 选做挑战

新增 bool hasCoupon，普通票打八折；明确优惠是否可以叠加。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。
