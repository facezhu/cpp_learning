# 第27课 UE 环境与第一个 C++ 项目

根目录为待完成练习，按TODO逐步实现，先独立尝试再看reference。

## 使用方式

目标：UE 5.6 桌面项目（Windows），项目名称固定 EngineLab。示例为学习源码，未在本机UE编辑器编译验证。

1. 安装UE 5.6及其对应MSVC/Windows SDK工具链，VS Code负责编辑，Unreal Build Tool负责构建；不要用g++直接编译UE源码。
2. 创建Games → Blank → C++项目，命名EngineLab。首次关闭编辑器后复制本包.h/.cpp到Source/EngineLab/，保留项目原有模块文件。
3. .generated.h必须是本头文件最后一条include。项目若使用其他名称，修改ENGINELAB_API为实际模块导出宏。
4. 生成/刷新VS Code工程文件，用Development Editor Win64目标构建，再打开编辑器。修改反射声明后建议关闭编辑器完整构建，避免旧反射状态。
5. 对照本课步骤创建蓝图和输入资产，这些二进制资产不能只靠本包C++文件替代。
6. 验收使用Play模式与Output Log，保存关卡和资产到同一Git仓库；大型资产需另行评估Git LFS。

本课操作：
1. 创建名为EngineLab的UE5.6 Blank C++项目，按环境指南配置MSVC与VS Code。
2. 加入LabProbe.h/.cpp，关闭编辑器完成Development Editor构建。
3. 把LabProbe放入关卡，Play后在Output Log查找EngineLab ready。

## 必做任务

1. 创建名为EngineLab的UE5.6 Blank C++项目，按环境指南配置MSVC与VS Code。
2. 加入LabProbe.h/.cpp，关闭编辑器完成Development Editor构建。
3. 把LabProbe放入关卡，Play后在Output Log查找EngineLab ready。

## 预期结果

```text
Play 后Output Log：EngineLab ready
没有放入实例或未运行Play时，不应期待BeginPlay输出。
```

## 自查

- [ ] 创建名为EngineLab的UE5.6 Blank C++项目，按环境指南配置MSVC与VS Code。
- [ ] 加入LabProbe.h/.cpp，关闭编辑器完成Development Editor构建。
- [ ] 把LabProbe放入关卡，Play后在Output Log查找EngineLab ready。

## 选做挑战

同时放入两个LabProbe，打印各自GetName，解释类与实例数量。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。

UE目标版本5.6，模块EngineLab；源码未在本机UE编辑器编译验证。蓝图、输入资产与关卡必须按说明自行建立，不能用g++构建。
