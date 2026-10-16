// 网页中的“从头练习”模板；绝不自动写入或覆盖用户的磁盘工作文件。
// 留出核心逻辑供学习者实现，驱动代码可编译运行，但尚不能满足预期结果。
const single = (n, content) => [{ name: `lesson${n}.cpp`, content }];

export const historicalTemplates = {
  1: single(1, `#include <iostream>
#include <string>

int main()
{
    std::string name;
    int age = 0;
    double height = 0.0;
    std::cout << "Enter your name, age, and height (in meters): ";
    // TODO 1: 用 cin 按顺序读取 name、age、height。
    // TODO 2: 分三行输出 Name、Age、Height 标签及变量值。
    // 验证：Arthur 18 1.75；再换一组输入。
    (void)age;
    (void)height;
    return 0;
}
`),
  2: single(2, `#include <iostream>

int main()
{
    int totalSeconds = 0;
    std::cout << "Enter total seconds: ";
    std::cin >> totalSeconds;
    int hours = 0;
    int remainingSeconds = 0;
    int minutes = 0;
    int seconds = 0;
    // TODO: 用 / 和 % 计算以上四个量，不改变 totalSeconds。
    // minutes 应是“去掉整小时后的分钟”，而不是总分钟数。
    std::cout << "hours: " << hours << '\\n';
    std::cout << "minutes: " << minutes << '\\n';
    std::cout << "seconds: " << seconds << '\\n';
    (void)remainingSeconds;
    return 0;
}
`),
  3: single(3, `#include <iostream>

int main()
{
    int age = 0;
    double price = 50.0;
    bool isMember = false;
    std::cout << "Enter your age: ";
    std::cin >> age;
    std::cout << "Are you a member? (1 for yes, 0 for no): ";
    std::cin >> isMember;
    // TODO: 完成互斥的年龄分支：
    // age < 0: age is invalid；0–5岁: The ticket is free。
    // 6–17岁半价，18–59岁原价，60岁起三分之一票价。
    // TODO: 只有收费票的会员才再减 5，不对免费票扣钱。
    // TODO: 在正确的分支输出 The ticket price is ... yuan。
    (void)price;
    return 0;
}
`),
  4: single(4, `#include <iostream>

int main()
{
    int n = 0;
    int sum = 0;
    int count = 0;
    std::cout << "Please enter a int number: ";
    std::cin >> n;
    // TODO 1: 用 while 要求 n > 0，非法时重新输入。
    // TODO 2: 用 for 累加 1 到 n（包含 n），写入 sum。
    std::cout << "The sum of 1 to " << n << " is: " << sum << '\\n';
    std::cout << "The even numbers are: ";
    // TODO 3: 遍历 1 到 n，输出偶数，并增加 count。
    std::cout << "\\nThe count of even numbers is: " << count << '\\n';
    return 0;
}
`),
  5: single(5, `#include <iostream>

int readPositiveNumber();
int calculateSum(int n);
void printEvenNumbers(int n);
int countEvenNumbers(int n);

int main()
{
    const int n = readPositiveNumber();
    std::cout << "Sum: " << calculateSum(n) << '\\n';
    printEvenNumbers(n);
    std::cout << "Even count: " << countEvenNumbers(n) << '\\n';
}

int readPositiveNumber()
{
    int n = 0;
    std::cout << "Please enter a positive integer: ";
    std::cin >> n;
    // TODO: 非正数重输；不要在每次重试时重新初始化累积状态。
    return n;
}
int calculateSum(int n)
{
    // TODO: 返回 1 到 n 的总和。
    (void)n;
    return 0; // 占位结果，完成后替换。
}
void printEvenNumbers(int n)
{
    std::cout << "Even numbers: ";
    // TODO: 输出 1 到 n 中的偶数。
    (void)n;
    std::cout << '\\n';
}
int countEvenNumbers(int n)
{
    // TODO: 返回偶数数量；与打印函数职责分开。
    (void)n;
    return 0;
}
`),
  6: single(6, `#include <iostream>
#include <vector>

int readStudentCount();
void printStudentScores(const std::vector<int>& scores);
int calculateTotalScore(const std::vector<int>& scores);
double calculateAverageScore(int sum, std::vector<int>& scores);
int findHighestScore(const std::vector<int>& scores);
int findLowestScore(const std::vector<int>& scores);

int main()
{
    const int studentCount = readStudentCount();
    std::vector<int> scores;
    for (int i = 0; i < studentCount; ++i)
    {
        int score = 0;
        std::cout << "Please enter the score for student " << i + 1 << ": ";
        std::cin >> score;
        // TODO: 成绩不在 0–100 时要求重新输入，然后再加入 vector。
        scores.push_back(score);
    }
    const int sum = calculateTotalScore(scores);
    printStudentScores(scores);
    std::cout << "Total score: " << sum << '\\n';
    std::cout << "Average score: " << calculateAverageScore(sum, scores) << '\\n';
    std::cout << "Highest score: " << findHighestScore(scores) << '\\n';
    std::cout << "Lowest score: " << findLowestScore(scores) << '\\n';
}
int readStudentCount()
{
    int count = 0;
    std::cout << "Please enter the number of students: ";
    std::cin >> count;
    // TODO: 非正数需要重输。
    return count;
}
void printStudentScores(const std::vector<int>& scores)
{
    // TODO: 遍历打印成绩。此处定义与上方声明的 const 引用必须一致。
    (void)scores;
}
int calculateTotalScore(const std::vector<int>& scores)
{
    // TODO: 累加全部成绩。
    (void)scores;
    return 0;
}
double calculateAverageScore(int sum, std::vector<int>& scores)
{
    // TODO: 先转换类型再除；对空容器约定返回 0。
    (void)sum; (void)scores;
    return 0.0;
}
int findHighestScore(const std::vector<int>& scores)
{
    // TODO: 非空时以首元素为初值，逐个比较；空容器返回 0。
    (void)scores;
    return 0;
}
int findLowestScore(const std::vector<int>& scores)
{
    // TODO: 逐个更新最小值；空容器返回 0。
    (void)scores;
    return 0;
}
`),
  7: single(7, `#include <iostream>
#include <vector>

void printScores(const std::vector<int>& scores);
void addBonus(std::vector<int>& scores, int bonus);
double calculateAverage(const std::vector<int>& scores);

int main()
{
    std::vector<int> scores = {65, 78, 92, 100};
    std::cout << "Before: "; printScores(scores);
    int bonus = 0;
    std::cout << "Enter bonus: "; std::cin >> bonus;
    addBonus(scores, bonus);
    std::cout << "After: "; printScores(scores);
    std::cout << "Average: " << calculateAverage(scores) << '\\n';
}
void printScores(const std::vector<int>& scores)
{
    // TODO: 用只读访问逐个打印，不复制整个容器。
    (void)scores;
    std::cout << '\\n';
}
void addBonus(std::vector<int>& scores, int bonus)
{
    // TODO: 通过 int& 修改原元素，加 bonus 后超过 100 则截到 100。
    (void)scores; (void)bonus;
}
double calculateAverage(const std::vector<int>& scores)
{
    // TODO: 空容器返回 0，否则累加并用浮点除法求平均。
    (void)scores;
    return 0.0;
}
`),
  8: single(8, `#include <iostream>

void applyDamage(int* health, int damage);
void healPlayer(int& health, int amount);
void printHealth(const int* health);

int main()
{
    int playerHealth = 100;
    printHealth(&playerHealth);
    applyDamage(&playerHealth, 30);
    printHealth(&playerHealth);
    healPlayer(playerHealth, 15);
    printHealth(&playerHealth);
    printHealth(nullptr);
}
void applyDamage(int* health, int damage)
{
    // TODO: 先处理 nullptr，再通过 *health 扣血，下限为 0。
    (void)health; (void)damage;
}
void healPlayer(int& health, int amount)
{
    // TODO: 修改原生命，治疗后最大 100；引用不需要 *。
    (void)health; (void)amount;
}
void printHealth(const int* health)
{
    // TODO: nullptr 输出 No player data；否则输出 Health: 值。
    (void)health;
}
`),
  9: single(9, `#include <iostream>
#include <string>

class Player
{
private:
    std::string name = "Unknown";
    int health = 100;
public:
    void setName(const std::string& newName);
    void takeDamage(int damage);
    void heal(int amount);
    void printStatus() const;
    bool isAlive() const;
};
void Player::setName(const std::string& newName)
{
    // TODO: 修改当前对象的名字。
    (void)newName;
}
void Player::takeDamage(int damage)
{
    // TODO: 非正伤害不生效，扣血后下限为 0。
    (void)damage;
}
void Player::heal(int amount)
{
    // TODO: 非正治疗不生效，治疗后上限为 100。
    (void)amount;
}
void Player::printStatus() const
{
    // TODO: 输出 Name 和 Health；查询不应修改对象。
}
bool Player::isAlive() const
{
    // TODO: 根据 health 返回存活状态。
    return false; // 占位值
}
int main()
{
    Player player1, player2;
    player1.setName("Knight"); player2.setName("Mage");
    player1.takeDamage(30); player2.takeDamage(120);
    player1.heal(10);
    player1.printStatus(); player2.printStatus();
    std::cout << std::boolalpha;
    std::cout << "Knight alive: " << player1.isAlive() << '\\n';
    std::cout << "Mage alive: " << player2.isAlive() << '\\n';
}
`),
  10: single(10, `#include <iostream>
#include <string>

class Player
{
private:
    std::string name;
    int health;
public:
    Player();
    Player(const std::string& playerName, int startingHealth);
    void takeDamage(int damage);
    void heal(int amount);
    void printStatus() const;
    bool isAlive() const;
};
Player::Player() : name("TODO"), health(0)
{
    // TODO: 在初始化列表设置 Unknown 与 100。
}
Player::Player(const std::string& playerName, int startingHealth)
    : name(playerName), health(startingHealth)
{
    // TODO: 将初始生命限制到 0–100；解释初始化与赋值的区别。
}
void Player::takeDamage(int damage)
{
    // TODO: 迁移第 9 课有效扣血逻辑。
    (void)damage;
}
void Player::heal(int amount)
{
    // TODO: 迁移治疗逻辑。
    (void)amount;
}
void Player::printStatus() const
{
    std::cout << "Name: " << name << "\\nHealth: " << health << '\\n';
}
bool Player::isAlive() const
{
    // TODO: 返回正确的存活状态。
    return false;
}
int main()
{
    Player player1;
    Player player2("Knight", 80);
    Player player3("Mage", 150);
    player1.takeDamage(30); player2.takeDamage(120); player3.takeDamage(40);
    player1.heal(10);
    player1.printStatus(); player2.printStatus(); player3.printStatus();
    if (player2.isAlive()) std::cout << "Knight is still alive.\\n";
    else std::cout << "Knight has been defeated.\\n";
}
`),
  11: single(11, `#include <iostream>
#include <string>

class Weapon
{
    std::string name;
    int damage;
public:
    Weapon(const std::string& weaponName, int weaponDamage)
        : name(weaponName), damage(weaponDamage)
    {
        // TODO: 负伤害初始化为 0。
    }
    const std::string& getName() const { return name; }
    int getDamage() const { return damage; }
    void printInfo() const
    {
        // TODO: 输出武器名和伤害。
    }
};
class Player
{
    std::string name;
    int health;
    Weapon weapon;
public:
    Player(const std::string& playerName, const Weapon& startingWeapon)
        : name(playerName), health(100), weapon(startingWeapon) {}
    void attack(Player& target) const
    {
        // TODO: 死亡角色不能攻击；用武器接口取得伤害并通知目标受伤。
        (void)target;
    }
    void takeDamage(int damage)
    {
        // TODO: 拒绝非正伤害和死亡后扣血，生命下限为 0。
        (void)damage;
    }
    bool isAlive() const { return health > 0; }
    void printStatus() const
    {
        std::cout << "Player: " << name << "\\nHealth: " << health << '\\n';
        std::cout << "Weapon: "; weapon.printInfo();
    }
};
int main()
{
    Weapon sword("Iron Sword", 30), staff("Magic Staff", 45);
    Player knight("Knight", sword), mage("Mage", staff);
    for (int round = 0; round < 3; ++round)
    {
        knight.attack(mage); mage.attack(knight);
        knight.printStatus(); mage.printStatus();
    }
    // 完成 TODO 后核对 Knight 0、Mage 10。
}
`),
  12: [
    { name: 'Weapon.h', content: `#pragma once
#include <string>
class Weapon
{
    std::string name;
    int damage;
public:
    Weapon(const std::string& weaponName, int weaponDamage);
    const std::string& getName() const;
    int getDamage() const;
    void printInfo() const;
};
` },
    { name: 'Weapon.cpp', content: `#include "Weapon.h"
#include <iostream>
Weapon::Weapon(const std::string& weaponName, int weaponDamage)
    : name(weaponName), damage(weaponDamage)
{
    // TODO: 保留第 11 课的伤害范围校验。
}
const std::string& Weapon::getName() const { return name; }
int Weapon::getDamage() const { return damage; }
void Weapon::printInfo() const
{
    // TODO: 把第 11 课 printInfo 的实现放在这里。
}
` },
    { name: 'Player.h', content: `#pragma once
#include "Weapon.h"
#include <string>
class Player
{
    std::string name;
    int health;
    Weapon weapon;
public:
    Player(const std::string& playername, const Weapon& startingweapon);
    void attack(Player& target) const;
    void takeDamage(int damage);
    void printStatus() const;
    bool isAlive() const;
};
` },
    { name: 'Player.cpp', content: `#include "Player.h"
#include <iostream>
Player::Player(const std::string& playername, const Weapon& startingweapon)
    : name(playername), health(100), weapon(startingweapon) {}
void Player::attack(Player& target) const
{
    // TODO: 迁移武器攻击，通过 target 的公共接口扣血。
    (void)target;
}
void Player::takeDamage(int damage)
{
    // TODO: 迁移有效扣血与下限处理。
    (void)damage;
}
bool Player::isAlive() const
{
    // TODO: 根据 health 返回正确结果。
    return false;
}
void Player::printStatus() const
{
    std::cout << "Player: " << name << "\\nHealth: " << health << '\\n';
    std::cout << "Weapon: "; weapon.printInfo();
}
` },
    { name: 'main.cpp', content: `#include "Player.h"
#include "Weapon.h"
#include <iostream>
int main()
{
    Weapon sword("Iron Sword", 30), staff("Magic Staff", 45);
    Player knight("Knight", sword), mage("Mage", staff);
    // TODO: while 中双方存活时进行战斗，先手攻击后重新检查后手存活。
    // TODO: 结束后输出获胜方，不能靠文件包含顺序解决缺失实现。
    knight.printStatus(); mage.printStatus();
    // 构建 main.cpp Player.cpp Weapon.cpp，不要 include .cpp。
}
` }
  ],
  13: single(13, `#include <iostream>
#include <string>

class Character
{
    std::string name;
    int health;
public:
    Character(const std::string& characterName, int characterHealth)
        : name(characterName), health(characterHealth)
    {
        // TODO: 初始生命不能为负。
    }
    const std::string& getName() const { return name; }
    int getHealth() const { return health; }
    bool isAlive() const { return health > 0; }
    void takeDamage(int damage)
    {
        // TODO: 非正伤害和死亡目标不再扣血，生命下限为 0。
        (void)damage;
    }
    void printStatus() const
    {
        std::cout << "Name: " << name << "\\nHealth: " << health << '\\n';
    }
};
class Warrior : public Character
{
public:
    explicit Warrior(const std::string& warriorName)
        : Character(warriorName, 120) {}
    void powerAttack(Character& target) const
    {
        // TODO: 检查自身存活，再造成 35 伤害。
        (void)target;
    }
};
class Mage : public Character
{
    int mana = 100;
public:
    explicit Mage(const std::string& mageName) : Character(mageName, 80) {}
    void castSpell(Character& target)
    {
        // TODO: 自身存活且蓝量至少20时，扣20蓝并造成40伤害。
        (void)target;
    }
    int getMana() const { return mana; }
};
int main()
{
    Warrior warrior("Arthur"); Mage mage("Merlin");
    warrior.powerAttack(mage); mage.castSpell(warrior);
    warrior.powerAttack(mage); mage.castSpell(warrior);
    warrior.printStatus(); mage.printStatus();
    std::cout << "Mage mana: " << mage.getMana() << '\\n';
    // 完成后应为 Arthur 40、Merlin 10、mana 60。
}
`),
  14: single(14, `#include <iostream>
#include <string>

class Character
{
    std::string name;
    int health;
public:
    Character(const std::string& n, int hp) : name(n), health(hp)
    {
        // TODO: 保护初始生命范围。
    }
    virtual ~Character() = default;
    const std::string& getName() const { return name; }
    int getHealth() const { return health; }
    bool isAlive() const { return health > 0; }
    void takeDamage(int damage)
    {
        // TODO: 迁移第 13 课扣血逻辑。
        (void)damage;
    }
    void print() const { std::cout << name << ": " << health << '\\n'; }
    virtual void attack(Character& target) = 0;
};
class Warrior : public Character
{
public:
    explicit Warrior(const std::string& n) : Character(n, 120) {}
    void attack(Character& target) override
    {
        // TODO: 死亡不能攻击；造成35伤害。不要保留原 powerAttack 的末尾const。
        (void)target;
    }
};
class Mage : public Character
{
    int mana = 100;
public:
    explicit Mage(const std::string& n) : Character(n, 80) {}
    void attack(Character& target) override
    {
        // TODO: 存活且mana至少20时，扣20蓝并造成40伤害。
        (void)target;
    }
    int getMana() const { return mana; }
};
void battle(Character& first, Character& second)
{
    // TODO: 双方存活且未满100回合时循环。
    // 每轮 first 先攻击，second 仍存活才反击；结束后判断获胜/平局。
    // 只能使用 Character 的公共接口，不检查具体职业。
    (void)first; (void)second;
}
int main()
{
    Warrior warrior("Arthur"); Mage mage("Merlin");
    battle(warrior, mage);
    warrior.print(); mage.print();
    std::cout << "Mana: " << mage.getMana() << '\\n';
    // 完成后应为 Arthur 40、Merlin 0、Mana 60，先手击杀后不再反击。
}
`)
};
