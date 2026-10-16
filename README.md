# 引擎学堂 · C++ ENGINE LAB

中文 C++ × 游戏引擎学习站：32 课详细讲义、辅助图解、预置 VS Code 练习与参考答案、408 道面试问答、记忆卡片及按课计时。

网站在本机运行。课程源码、练习与 `learning-data/` 一起通过 GitHub 同步，不需要网站账号、云端数据库或 GitHub 令牌。

## 启动

在 VS Code 打开这个独立文件夹 `cpp-engine-academy`，需要 Node.js 22.13 或更新版本。

首次安装：

```powershell
npm.cmd ci
npm.cmd run dev
```

macOS 使用 `npm ci`、`npm run dev`。以后运行 VS Code 任务 **启动学习网站**，浏览器打开 **http://127.0.0.1:5173**。服务仅监听本机。

更新本版后，请关闭旧网页，在旧服务终端按 Ctrl+C，再重新运行任务并打开网站。前端刷新不会自动重启 Node 保存服务。

## 每次学习

1. 网站停止时，在 VS Code 拉取最新内容。
2. 启动网站，进入课程，先读详细讲义；图解与交互演示在讲义后按需展开。
3. 在 VS Code 展开 `exercises/lessonNN/`，直接编辑根部文件，无需下载、解压或复制。卡住时看提示，完成后对照 `reference/`。
4. 网页完成自查、记笔记，复习直接展示的面试问题、答案与关键点，按理解程度标记待复习或已掌握。
5. 确认进度已保存，关闭网页，Ctrl+C 停止服务，再检查变更、提交并推送。

## 练习目录

全部 32 课已预置：

```text
exercises/
├─ lesson01/
│  ├─ lesson1.cpp       直接编辑的工作文件
│  ├─ reference/        完整参考答案
│  └─ README.md         任务、运行命令、预期、自查
├─ lesson12/            main.cpp、Player.h/.cpp、Weapon.h/.cpp
├─ lesson14/            保留你已经填写的第14课源码
└─ lesson32/
```

第 1—13 课沿用你原有的源码、文件名与练习规则。第 14 课已把解压目录内的工作源码迁入统一目录，保留原下载说明为 `README.downloaded.txt`。工作文件不会被自动恢复成起始模板。

第 6 课原文件的四个只读函数存在声明/定义 const 引用不一致，原文件完整保留，修正版在 reference 中。第 7 课 reference 额外保护空容器平均值。其余历史参考沿用原代码。

第 15—32 课根部文件带 TODO。各课 README 提供 Windows/macOS 命令；多文件课只一起编译本课需要的 cpp，不能加入 reference 或其他课的 main。网页参考答案直接读取本课 reference 文件。

保存 cpp 就是保存练习；网页“留下你的解答”只是可选复盘留档。VS Code 打开项目根目录后，保持要运行的 `.cpp` 为当前编辑器，按 F5 使用 **C++: debug active file**；按 Cmd+Shift+B（Windows 为 Ctrl+Shift+B）只编译当前文件。第 12 课选择 **C++: debug lesson12** 或 **C++: build lesson12**；第 21 课选择对应的 **lesson21** 配置，它们会一起编译该课的多个源文件。`reference/` 内的单文件参考答案也可以用当前文件配置调试。

## 简化计时

- 第一次打开课程开始计时，时长归属最近打开的课。
- 切到 VS Code、隐藏标签、普通空闲和电脑休眠均计入。恢复仍打开的页面时，补算这次打开期间的间隔。
- 在网站内返回首页、复习或统计页仍继续。打开另一课，旧课结算，新课开始。
- 关闭标签、刷新或离开整个网站结束本次记录；刷新后重新进入课程开启新记录。关闭期间不会计入下次学习。
- 每 15 秒保存；页面隐藏时也尝试保存，但不会暂停。正常退出时尝试立即结算。异常退出只保留已保存的时长，不猜测退出时刻。
- 没有 30 分钟上限。多个标签页只有一个自动计时来源，新打开的课程接管；旧页面不再重复累计。
- 统计页以课程累计为主。改版前的自动与手动记录继续保留并计入总量，移除手动补记入口。

因此，长时间离开电脑前请关闭网页，否则这段时间也会归入该课程。计时是“页面打开时长”，不判断专注程度。

## 保存与兼容

正式记录在 `learning-data/`。进度、笔记、题目状态保持 v1 格式；新计时记录为 v2，旧 v1 时间记录兼容读取。数据经过校验和原子写入，累计计时请求可重试，不会重复叠加。

进度和笔记修改后约 650 毫秒保存。保存失败时浏览器保留草稿，支持立即重试与下载备份。并发编辑触发版本冲突，损坏 JSON 会报文件名，不自动覆盖。网站不自动重置学习进度。

## GitHub 同步

当前独立仓库关联： https://github.com/facezhu/cpp_learning.git 。Git 只管理这个文件夹，外层 ChatGPT 项目不纳入。

在 VS Code 源代码管理中拉取、提交、推送，或使用：

```powershell
git pull --ff-only
# 完成学习、关闭网页并停止服务后
git status
git add .
git commit -m "Study C++"
git push
```

Git 提交保存在本机，推送成功才完成云端同步。在另一台 PC/Mac 克隆后安装 Node 依赖并启动，即可读取学习记录。拉取、切换分支、手改 JSON 前先停止服务；避免两台电脑同时修改同一课，发生冲突时比较并合并。

## C++ 与 UE 工具链

第 1—26 课采用 C++17。VS Code 配置按操作系统选择工具：macOS 使用 Xcode 命令行工具中的 `/usr/bin/clang++` 和 C/C++ 扩展自带的 LLDB 调试适配器，Windows 使用 MSYS2 UCRT64 g++/GDB，Linux 使用 g++/GDB。macOS 生成无扩展名的可执行文件，Windows 生成 `.exe`，项目配置可一起通过 GitHub 同步。若 macOS 状态栏仍显示 Win32，运行“C/C++: 选择配置”并选 Mac。第 21 课另提供 CMake 构建方式。

第 27—32 课目标 UE 5.6 / EngineLab 模块，包含源码和编辑器配置说明。需要 UE 支持的构建工具链，不能用普通 g++ 编译。蓝图、输入资产、关卡和 `.uasset` 需按说明自行创建并保存。**本机未安装 UE 编辑器，UE 示例未进行编辑器编译运行验证。**

## 验证与预览

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run check:cpp
npm.cmd start
```

`check:cpp` 编译运行磁盘上第 1—26 课 reference，并检查边界、战斗退出、普通/虚函数分派和 override 编译错误。报告在忽略的 `.test-output/cpp/report.json`。可用 `CPP_COMPILER` 指定编译器。

`node_modules/`、`dist/`、`.runtime/`、测试产物、exe 和 macOS 练习可执行文件被忽略。正式学习数据和工作源码需要提交。测试使用临时数据；预览可设置 `LAB_DATA_DIR` 和 `PORT`，避免写入真实学习记录。
