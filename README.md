# 引擎学堂 · C++ ENGINE LAB

中文 C++ × 游戏引擎学习站。32节课程包含概念图、分步演示、VS Code练习包、参考解答、96道面试题、记忆卡片与个人学习档案。

网站在本机运行。正式学习数据直接写入本仓库的 `learning-data/`，与练习代码一起通过Git提交和推送，不需要网站账号、数据库或GitHub令牌。

## 第一次启动

需要 Node.js **22.13 或更新版本**（已在 Node 24 验证）。在 VS Code 中打开 **`cpp-engine-academy` 文件夹**，或双击外层的 `引擎学堂.code-workspace`，然后打开终端：

```powershell
npm.cmd ci
npm.cmd run dev
```

macOS终端使用 `npm ci`、`npm run dev`，不加 `.cmd`；网站启动任务已配置Windows与macOS各自的npm命令。C++编译调试配置仍沿用你当前Windows的MSYS2工具链。

浏览器打开 **http://127.0.0.1:5173**。以后直接选择 **终端 → 运行任务 → 启动学习网站**。服务保持运行，使用 `Ctrl+C` 停止。默认只接受本机访问。

首次进入可以选择恢复前13课历史完成状态，从第14课“虚函数与多态”继续；这不会创建历史学习时长。原来的练习按课整理在 `exercises/lesson01` 至 `exercises/lesson13`，文件内容保持不变。第12课的 `main.cpp`、Player和Weapon五个文件放在同一个 `exercises/lesson12` 目录。

如果5173端口占用，先确认是否已经启动；不要重复运行。可在当前终端设置 `$env:PORT='5180'` 再启动，数据仍使用同一个目录。不要同时启动多个服务操作同一份学习数据。

## 每次学习

1. 网站未运行时，先在 VS Code 拉取远程仓库最新内容。
2. 运行“启动学习网站”，阅读课程、操作概念图、回答面试题。
3. 下载练习包，把starter代码放进 `exercises/lessonNN/`，在VS Code编写、编译与调试。
4. 返回网页完成自查、记录笔记；补记实际编码时长，确认页面显示“已保存到文件”。
5. 关闭网页，在服务终端按 `Ctrl+C` 停止，再检查Git变更、提交并推送。

不要在网站运行时拉取、切换分支或直接编辑JSON。Git提交保存在本机，**推送成功才是云端同步完成**。

## 计时与保存

- 只有课程、练习、面试页面会自动计时；页面必须可见、有焦点，且最近5分钟有用户操作。
- 切到VS Code或其他窗口时暂停。实际编码时间通过“补记编程”记录，可修改与删除。
- 每15秒写入一次，隐藏页面时尝试立即写入；同一服务中的多个标签页共享计时租约。
- 休眠间隔不补算，浏览器或服务异常退出可能损失最后一个尚未确认的计时间隔；不会按离线时长补记。
- 每条时间记录带有香港日期分布，跨午夜自动拆分；累计时长由有效记录求和。
- 进度和笔记编辑约650毫秒后自动保存。保存失败保留浏览器草稿；“立即保存”可以重试，“下载草稿备份”可另存。
- 多标签页同时编辑同一课会触发版本冲突，显示两份记录，选择文件版本前会下载草稿备份。
- 不同页面的草稿独立保留。重新打开时发现旧会话草稿，会提供下载和恢复入口，不会自动替换正式文件。
- 损坏的JSON会报告具体文件，不自动覆盖。关闭服务后在VS Code修复，重新启动即可。

## GitHub与另一台电脑

当前文件夹就是独立Git仓库根目录，`.git`位于 `cpp-engine-academy/.git`，只管理这里的网站、练习和学习数据，不包含外层ChatGPT项目。关联远程前先检查 `git remote -v`，不要重复添加origin。在VS Code完成首次提交后，可使用“发布到GitHub”，或关联你自己的仓库：

```powershell
# 替换成实际地址；建议个人学习记录放私人仓库
git remote add origin https://github.com/你的用户名/你的仓库.git
git branch                     # 查看实际当前分支
git push -u origin 实际分支名
```

网站不替你提交或推送，不存储GitHub凭据。另一台电脑克隆仓库，在克隆得到的项目根目录（含package.json）运行 `npm.cmd ci`，再启动网站，就能读取已提交的记录。GitHub仓库的根目录直接是网站项目，不会多套一层ChatGPT项目目录。

同一课在两台电脑被独立修改时，Git可能要求手动合并；在VS Code对照保留双方内容，不强制覆盖。每次先拉取、结束后立即推送，可以减少冲突。

## 项目结构

```text
cpp-engine-academy/       独立项目目录
├─ .git/                  仅本项目的Git仓库信息
├─ package.json           安装、启动、构建和测试入口
├─ src/                   网站界面与32课内容
├─ server/                Node本地保存服务
├─ public/                静态资源
├─ tests/、scripts/       测试与检查工具
├─ .vscode/               C++调试与网站启动任务
├─ learning-data/         真实进度、笔记、面试回答与时长（要提交）
├─ exercises/             按课整理的练习（要提交）
│  ├─ lesson01/lesson1.cpp
│  ├─ ...
│  ├─ lesson11/lesson11.cpp
│  ├─ lesson12/            main.cpp、Player.h/.cpp、Weapon.h/.cpp
│  └─ lesson13/lesson13.cpp
└─ docs/                  验证记录与界面预览
```

`node_modules`、`dist`、`.runtime`、测试产物和 `.exe` 已忽略。学习数据格式为v1，便于查看与版本管理；统计页不会把网页自动记录和编程补记混为同一种来源。网站提供JSON导出备份，跨设备的标准恢复方式是Git拉取，不依赖浏览器。

## C++与UE工具链

第1—26课采用C++17；MSYS2 UCRT64 `g++`沿用当前配置。多文件课需要一起编译，下载包内含准确文件列表。第21课同时提供CMakeLists，若尚未安装CMake，可先按g++命令验证代码。

第27—32课以 **UE 5.6 / EngineLab模块** 为目标，包含头文件、实现和蓝图/输入/关卡配置步骤。Windows UE项目需要其支持的MSVC、SDK与Unreal Build Tool；不能使用g++直接构建。**本机未安装UE编辑器进行编译运行验证**。课程源码包不包含 `.uasset`、关卡或UE安装包，相关资产需按课内说明创建并保存；较大项目可评估Git LFS。

## 构建与检查

在 `cpp-engine-academy` 中运行：

```powershell
npm.cmd run build       # TypeScript与生产构建
npm.cmd start           # 使用生产构建预览
npm.cmd test            # 数据/接口/计时/Git同步测试，使用临时目录
npm.cmd run check:cpp   # 编译并运行1—26课参考解答和边界用例
```

测试需要允许本机HTTP访问和临时文件写入。C++检查默认使用当前Windows的 `C:/msys64/ucrt64/bin/g++.exe`；其他环境可通过 `CPP_COMPILER` 指定编译器。检查结果保存在忽略的 `.test-output/cpp/report.json`。

可通过 `LAB_DATA_DIR` 指定独立测试数据目录，通过 `PORT` 指定预览端口；日常学习保留默认值。网站和API应保持本机使用，不用于对外公开的多用户服务。

## 练习编译与调试

单文件课程仍可打开对应 `.cpp`，使用原来的「C++: debug active file」。第12课是多文件工程，请在「运行和调试」中选择 **C++: debug lesson12**，或者运行任务 **C++: build lesson12**；它会一起编译本课三个 `.cpp`。

整理文件时已逐一核对19个历史练习文件（包括两个已有exe）和24个学习档案文件的SHA256，内容完整保留。网站数据服务默认从本文件夹内的 `learning-data/` 读取，不再依赖外层目录。
