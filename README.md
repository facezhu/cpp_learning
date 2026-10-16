# 引擎学堂 · C++ × 游戏引擎

32 课中文讲义、辅助图解、VS Code 练习与参考答案、408 道面试问答及按课计时。网站在本机运行，整个独立文件夹可以通过 GitHub 在 PC、Mac 间同步；不需要网站账号或云数据库。

## 安装与启动

在 VS Code 中打开 `cpp-engine-academy` 文件夹，安装 Node.js 22.13 或更新版本。

Windows PowerShell 首次运行：

```powershell
npm.cmd ci
npm.cmd run dev
```

macOS 终端使用 `npm ci`、`npm run dev`。浏览器打开 [本地学习网站](http://127.0.0.1:5173)。以后可直接运行 VS Code 任务 **启动学习网站**。服务仅监听本机 `127.0.0.1`。

更新网站后，关闭旧网页，在旧服务终端按 Ctrl+C，再重新启动。只刷新浏览器不会重启 Node 服务。

## 学习与练习

进入课程阅读讲义，图解按需展开；编码练习、参考答案和面试问答都在对应课程内。完成后自行标记课程完成，不设置答题或勾选门槛。

桌面可收起左侧导航。宽屏课程左侧阅读概念、右侧对照代码，滚动会切换对应示例；悬停或用 Tab 聚焦带虚线的重点文字，可定位并高亮代码行。多文件示例可切换文件。手机点击重点文字或“查看本节示例代码”，在本节下方展开。图解与演示放在讲义末尾的辅助入口。

```text
exercises/
├─ lesson01/ … lesson32/     每课已有工作文件，直接在 VS Code 编辑
│  └─ reference/             本课完整参考答案
learning-data/              正式学习进度与时长记录
src/                        网站界面与课程内容
server/                     仅供本机使用的保存服务
```

练习不用下载解压。网页起始模板用于从头尝试；已有工作文件不会被自动改回模板。第 1—14 课的个人代码保持原样，第 6 课原代码的四处声明/定义 const 引用不一致可对照 reference 修复，第 7 课 reference 补充空容器平均值保护。

基础及通用游戏练习使用 C++17。先进入某课目录，编译工作文件；要运行参考答案，进入该课 `reference/` 再编译。不要把工作文件、参考文件或其他课程的多个 `main` 一起链接。

Windows 单文件示例（MSYS2 UCRT64 的 g++，也可用已加入 PATH 的 g++）：

```powershell
cd exercises/lesson14
& C:/msys64/ucrt64/bin/g++.exe lesson14.cpp -std=c++17 -Wall -Wextra -g -o lesson14.exe
.\lesson14.exe
```

macOS 先准备 Xcode 命令行工具，使用 Apple Clang：

```sh
cd exercises/lesson14
clang++ lesson14.cpp -std=c++17 -Wall -Wextra -g -o lesson14
./lesson14
```

保留的 `.vscode/` 配置按系统选择编译/调试工具。打开要运行的 cpp，F5 选择 **C++: debug active file**；构建快捷键为 Windows Ctrl+Shift+B、Mac Cmd+Shift+B。第 12 课使用 **C++: build lesson12 / debug lesson12**，一同编译 `main.cpp Player.cpp Weapon.cpp`；第 21 课选择对应的 lesson21 配置，或在该课目录执行 `cmake -S . -B build`、`cmake --build build`。Windows 生成 exe，Mac 生成无扩展名程序。

打开课程就开始累计到该课；切到 VS Code、网站内其他页面、后台、空闲或休眠仍计入。打开另一课则切换归属，退出整个网页结束本次记录，没有 30 分钟上限。长时间离开前请关页。每 15 秒保存，正常退出尝试立即结算；异常退出只保留已保存部分。多标签页只允许一个计时来源。

## 保存与 GitHub 跨设备同步

`learning-data/` 是正式记录目录，保留旧版 JSON 并兼容读取；不要把它当缓存删除。页面显示保存状态。保存失败先保留页面并重试；有冲突或损坏文件时先检查记录，不覆盖有效数据。

当前仓库：[facezhu/cpp_learning](https://github.com/facezhu/cpp_learning)。Git 仅管理这个独立文件夹。学习前、网站停止时拉取：

```sh
git pull --ff-only
```

学习完成后，关闭网页、Ctrl+C 停止服务，再检查并提交：

```sh
git status
git add .
git commit -m "Study C++"
git push
```

推送成功才有 GitHub 备份。另一台 PC/Mac 克隆仓库、执行 `npm ci` 后即可启动；依赖和本机可执行文件不需要同步。避免两台设备同时修改同一记录；冲突时比较内容并合并，拉取、切换分支或手改 JSON 前先停止服务。

## UE 5.6 练习配置

第 27—32 课是 **UE 5.6 / EngineLab 模块**源码，不是可用 g++ 直接编译的独立程序。创建 Games → Blank → C++ 项目并命名 `EngineLab`，关闭编辑器后，把相应课 `.h/.cpp` 加入 `Source/EngineLab/`，保留项目模块文件。其他项目名需要对应修改 `ENGINELAB_API`。`*.generated.h` 保持该头文件最后一条 include。

Windows 使用 UE 5.6 对应的 MSVC/Windows SDK 和 Unreal Build Tool 构建 Development Editor Win64；VS Code 负责编辑。Mac 的 UE 项目需使用该引擎版本支持的 Xcode/SDK 与 Editor 目标，普通练习的 clang++ 命令不能代替 UE 工具链。反射结构变更后建议关闭编辑器完整构建，再重新打开验证。

| 课 | 必要编辑器配置与验证目标 |
|---|---|
| 27 | 把 LabProbe 放入关卡，Play 后 Output Log 出现 `EngineLab ready`。 |
| 28 | 创建 MovingMarker 蓝图子类，为 Mesh 选择 Cube，放入关卡；Speed=50 时约 2 秒沿世界 X 移动 100 厘米。 |
| 29 | 在 Actor 蓝图添加 LabHealthComponent，MaxHealth=120；Apply Damage=25 后日志生命为 95。 |
| 30 | 启用 Enhanced Input，模块依赖加入 `EnhancedInput`；创建 `IA_Move`（Axis2D）和 `IMC_Player`，D=+X，A=Negate X，W=Swizzle YXZ，S=Negate 后 Swizzle YXZ。BP_Explorer 配置动作/上下文、可见网格、Player0 自动控制及地面；Play 验证 WASD。 |
| 31 | 玩家蓝图添加 Health，胶囊允许 Query 与 Overlap；把 LabHazard 放到路径，进入范围验证 100→75 且危险物只结算一次。 |
| 32 | 沿用第 30 课输入；玩家添加 LabScore/Health，Goal=3，放置 3 个带网格拾取物及危险物；验证移动、伤害、逐次得分及一次 `Level complete`。 |

蓝图、输入资产、关卡及 `.uasset` 需要在引擎中实际创建并保存；源码不能替代这些资产。**本项目的 UE 示例尚未在 UE 5.6 编辑器或 Mac 引擎环境完成编译运行验证。**

## 验证网站与参考代码

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run check:cpp
```

macOS 使用 `npm`。`check:cpp` 在系统临时目录编译运行第 1—26 课参考、边界及第 14 课对照示例，报告打印到终端，结束自动清理；可用 `CPP_COMPILER` 指定兼容编译器。网站构建产物在 `dist/`，可重新生成，运行构建版用 `npm start`。

依赖 `node_modules/`、构建产物、缓存和练习可执行文件不纳入 Git；源码、必要配置、个人练习和 `learning-data/` 应提交。本 README 是项目统一使用说明。
