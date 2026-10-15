# 第32课 综合场景：收集与生存

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
1. 从第30课角色和输入资产继续；把本课源码加入EngineLab，Build.cs包含EnhancedInput。
2. BP_Explorer添加LabScore和LabHealth，Goal设3；确保Player0控制。
3. 创建BP_Pickup，给Mesh指定球或立方体，缩小到适当尺寸；在带地面的关卡放3个实例和1个LabHazard。
4. 完整Play：移动、受伤、收集3次；检查Score逐次增加且只出现一次Level complete。保存关卡与蓝图。

## 必做任务

1. 从第30课角色和输入资产继续；把本课源码加入EngineLab，Build.cs包含EnhancedInput。
2. BP_Explorer添加LabScore和LabHealth，Goal设3；确保Player0控制。
3. 创建BP_Pickup，给Mesh指定球或立方体，缩小到适当尺寸；在带地面的关卡放3个实例和1个LabHazard。
4. 完整Play：移动、受伤、收集3次；检查Score逐次增加且只出现一次Level complete。保存关卡与蓝图。

## 预期结果

```text
Score: 1 / 3
Score: 2 / 3
Score: 3 / 3
Level complete!
每个收集物只计分一次。
```

## 自查

- [ ] 从第30课角色和输入资产继续；把本课源码加入EngineLab，Build.cs包含EnhancedInput。
- [ ] BP_Explorer添加LabScore和LabHealth，Goal设3；确保Player0控制。
- [ ] 创建BP_Pickup，给Mesh指定球或立方体，缩小到适当尺寸；在带地面的关卡放3个实例和1个LabHazard。
- [ ] 完整Play：移动、受伤、收集3次；检查Score逐次增加且只出现一次Level complete。保存关卡与蓝图。

## 选做挑战

用UMG显示生命与分数；死亡后禁用输入并提供重新开始，完成后保存最高分。

## 保存与同步

保存根部工作文件，在网页完成自查和笔记。关闭网页、停止服务后，手动提交并推送此仓库。切到VS Code仍归属最近打开的课程计时。

UE目标版本5.6，模块EngineLab；源码未在本机UE编辑器编译验证。蓝图、输入资产与关卡必须按说明自行建立，不能用g++构建。
