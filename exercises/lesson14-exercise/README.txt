第14课 虚函数与多态
同一个接口，不同的攻击方式

在VS Code中打开starter文件夹，按要求补全代码。

基础编译（PowerShell）：
g++ lesson14.cpp -std=c++17 -Wall -Wextra -pedantic -g -o lesson14.exe
.\lesson14.exe

如果g++不在PATH，先确认MSYS2安装路径；不要一次编译其他课程的cpp。


必做任务
1. Character添加纯虚attack和虚析构函数。
2. Warrior造成35伤害；Mage消耗20魔法造成40伤害。
3. battle只使用共同接口，败者不能反击，并设置回合上限。

预期结果
Arthur wins!
Arthur: 40
Merlin: 0
Mana: 60

选做
添加Archer，保持battle函数不变；再测试双方都无法造成伤害的情况。

先独立完成，再查看reference目录。将starter里的工作文件保存到仓库的exercises/lesson14/后，才能随Git提交。
