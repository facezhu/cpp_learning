# VS Code 编程练习

网站“编码练习”页可下载每课 ZIP，里面包含：

- `starter/`：要亲手补全的代码。
- `reference/`：参考解答，独立尝试后再查看。
- `README.txt`：运行步骤、UE资产配置（适用时）、任务与验收说明。

原有练习已经按课整理到 `lesson01/` 至 `lesson13/`。文件名与内容保持不变；第12课的 `main.cpp`、`Player.h/.cpp`、`Weapon.h/.cpp` 放在同一个 `lesson12/` 中。原先第11、13课的exe也一并保留，Git仍会忽略exe。

新练习把 `starter/` 内的文件复制到 `exercises/lesson14/` 等独立目录。每个可执行程序只编译本课需要的 `.cpp`，避免多个 `main` 冲突。多文件课程不要只编译当前编辑文件。

在项目根目录打开VS Code后，单文件课继续用「C++: debug active file」；第12课选择「C++: debug lesson12」或「C++: build lesson12」。

保存代码后，在 VS Code 源代码管理中检查新增文件，暂存、提交、推送。只有被 Git 跟踪并推送的文件才会出现在云端。网站里粘贴的代码作为学习留档，保存在 `learning-data/lessons/`，并不会自动变成这里的 `.cpp`。

网页失去焦点后停止自动计时，在网站“补记编程”填写实际编码分钟数。
