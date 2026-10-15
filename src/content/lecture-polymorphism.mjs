// 第 14 课以用户历史第 13 课源码和后续虚函数讲义为起点；不改写练习工作文件。
export const polymorphismLecture = [
  {
    title: '从你已经写过的第 13 课出发',
    paragraphs: [
      '先把本课放回你自己的代码里。第 13 课的 Character 保存 name 和 health，提供 getName、getHealth、takeDamage、printStatus、isAlive。Warrior 公有继承 Character，初始生命为 120，powerAttack 造成 35 点伤害；Mage 初始生命为 80，mana 为 100，castSpell 每次消耗 20 点魔法并造成 40 点伤害。那些共有数据和封装规则都仍然正确，本课要解决的是“怎样统一调用不同职业的行为”。',
      '你原来的 main 直接写 warrior.powerAttack(mage)、mage.castSpell(warrior)，再重复一次。两轮后 Arthur 为 40 生命、Merlin 为 10 生命、魔法为 60。你亲自写出了每一个具体职业的调用，所以程序当然知道该调用谁；但自动战斗系统不能要求你提前手写所有职业配对。继承已经让它们都能作为 Character 被攻击，下一步要让它们也能通过 Character 接口主动攻击。',
      '打开 exercises/lesson13/lesson13.cpp 可以对照原文件。现在 lesson14.cpp 是你已经保存的缩略版本，使用 print() 输出“Arthur: 40”，而旧接口叫 printStatus() 并分行显示名字、生命；这是展示接口的差别，不是多态规则。讲解沿用你熟悉的长名称，参考答案区域仍展示仓库的实际文件。'
    ],
    code: `Warrior warrior("Arthur");
Mage mage("Merlin");

warrior.powerAttack(mage);  // 知道 warrior 是 Warrior
mage.castSpell(warrior);   // 知道 mage 是 Mage
warrior.powerAttack(mage);
mage.castSpell(warrior);`,
    language: 'cpp',
    points: ['本课保留原有角色、数值和受伤规则，改变的是攻击接口与调度方式。', '先理解你已完成的调用，再引入新的关键字。']
  },
  {
    title: '为什么只学继承，还写不出通用攻击调度？',
    paragraphs: [
      '设想你要写 performAttack(Character& attacker, Character& target)。attacker 可以借用 Warrior，也可以借用 Mage，因为它们都是 Character。但是编译器在这个函数体中只承诺 attacker 具备 Character 声明的接口；原来的 Character 没有 powerAttack，也没有 castSpell，因此直接写 attacker.powerAttack(target) 无法通过编译。编译器不会猜测你这次“应该”传入哪个职业。',
      '一种绕路是让调度器检查职业，再转换类型并调用对应函数。但每增加 Archer、Healer 或敌人种类，就要修改越来越多分支，甚至重复定义各职业的规则。我们希望调度器只表达“请攻击这个目标”，由对象自己的职业实现表达“怎样攻击”。这个需求先于 virtual 出现：关键字是为实现这种调用关系服务的，不是为了让类看起来更高级。'
    ],
    code: `// 概念错例：原版 Character 没有声明 powerAttack。
// 将下面一行放进函数体，编译器应报告 Character 无此成员。
void performAttack(Character& attacker, Character& target)
{
    // attacker.powerAttack(target); // 取消注释后故意编译失败
}
// 增加共同接口之后，函数体将只写 attacker.attack(target)。`,
    language: 'cpp',
    points: ['继承关系让类型可替换；共同接口决定调度器可以提出什么要求。', '没有声明的成员不能靠“真实对象可能有”来调用。']
  },
  {
    title: '先约定 attack 的含义，再考虑实现机制',
    paragraphs: [
      '先把接口写成 void attack(Character& target)。void 表示本次调用没有返回一个计算结果；它仍能通过调用 target.takeDamage 改变游戏状态。Character& target 是目标对象的引用，既能接收战士也能接收法师，并且扣血作用于原来的目标。若改成按值参数，就不再表示“修改这一个战斗中的目标”，还可能遇到抽象类型不能按值实例化或对象切片。',
      '共同名字并不要求共同内部算法。战士可以直接造成伤害，法师可以先检查蓝量再扣蓝；两者都必须遵守共同契约，例如死亡角色不能攻击、负伤害不应变成治疗。接口统一之后还需要一个机制：调度器看到 Character&，却要在运行时选择该对象的具体攻击实现。下面先故意不写 virtual，观察为什么单纯改成同名函数还不够。'
    ],
    code: `// 我们希望所有具体职业都能满足这份接口约定。
void attack(Character& target);
// 调度者只知道“攻击”，不必知道“重击”还是“施法”。
// 返回 void 不表示没有作用，它表示没有返回值。`,
    language: 'cpp',
    points: ['目标使用可写引用，避免复制目标。', '行为契约还包括死亡、蓝量不足等情况下应该发生什么。']
  },
  {
    title: '对照实验 A：没有 virtual 的完整小程序',
    paragraphs: [
      '下面是独立小程序，不依赖 lesson13.cpp。请放在临时 comparison-static.cpp 中单独编译，避免与本课 main 一起链接。为只观察调用选择，我们暂时去掉生命值和攻击目标参数，让两个类仅输出函数归属。它有意提供了一个可实例化的 Character 及普通 attack，不代表最终游戏模型必须允许创建普通角色。',
      '预计输出先是 Warrior::attack，后是 Character::attack。第一行直接通过 Warrior 对象调用，名称查找找到派生类的函数；第二行通过 Character& 调用，普通非虚成员依据静态接口选择 Character 版本。Warrior 中存在同名函数，并没有自动让第二次调用变成“寻找真实职业”。这个可运行差异就是下一步需要 virtual 的直接证据。'
    ],
    code: `#include <iostream>

class Character
{
public:
    void attack() { std::cout << "Character::attack\\n"; }
};

class Warrior : public Character
{
public:
    void attack() { std::cout << "Warrior::attack\\n"; }
};

void performAttack(Character& attacker)
{
    attacker.attack();
}

int main()
{
    Warrior warrior;
    warrior.attack();       // Warrior::attack
    performAttack(warrior); // Character::attack
}`,
    language: 'cpp',
    points: ['本例是完整可编译的非虚调用对照。', '同名不自动产生运行时多态。']
  },
  {
    title: '静态类型和动态类型：到底是谁“知道”职业？',
    paragraphs: [
      '在 Character& attacker = warrior 中，attacker 这个访问表达式的静态类型是 Character；所引用的完整对象实际是 Warrior，这个实际类型叫动态类型。引用没有把 warrior 复制成一个新 Character，对象的派生部分仍在；只是我们选择了一个只承诺 Character 接口的访问入口。就像同一对象可由不同权限和能力的接口被使用，接口较少不等于对象变成了另一份东西。',
      '可以分两步理解编译器与程序的责任：编译时根据静态类型做名称查找、访问检查和重载选择，确认“这个调用能不能写”；如果选中的调用是合适的虚调用，运行时再依据动态对象选择最终重写实现。不要概括成“有多态后所有东西都看真实类型”：子类专属 getMana 依然不能直接经 Character& 调用，默认实参等也有静态规则。'
    ],
    table: {
      headers: ['表达式/对象', '本例中的类型', '影响什么'],
      rows: [
        ['attacker 的静态类型', 'Character', '接口可见性、名称查找、重载等'],
        ['attacker 所指完整对象的动态类型', 'Warrior', '普通虚调用选择最终重写实现'],
        ['warrior 本身', 'Warrior 对象', '没有因绑定父类引用而被复制或切片']
      ]
    },
    points: ['接口类型和实际对象类型可以不同。', '先判断接口是否合法，再判断虚调用选择哪份实现。']
  },
  {
    title: '对照实验 B：加入 virtual 后发生什么',
    paragraphs: [
      '再把下面程序单独放进 comparison-virtual.cpp。相对实验 A，关键变化是基类把 attack 声明为 virtual，派生类用 override 标明重写意图；再补上适合多态基类的虚析构接口。相同的 performAttack 函数体不需要识别职业，但两行现在都输出 Warrior::attack。对象一直是同一个 Warrior，变化的是这个共同接口允许采用动态分派。',
      '此处 virtual 的意义是“本接口可由派生类重写，适当的调用按实际对象选择最终实现”。它不是“程序多执行一次函数”，也不是“所有函数推迟到运行时检查”。参数类型仍要在编译时检查，调用不存在的成员仍然错误。这两个小程序最好亲自编译对比一次，再回到复杂的战斗代码，避免同时被生命值计算和语法分散注意力。'
    ],
    code: `#include <iostream>

class Character
{
public:
    virtual ~Character() = default;
    virtual void attack() { std::cout << "Character::attack\\n"; }
};

class Warrior : public Character
{
public:
    void attack() override { std::cout << "Warrior::attack\\n"; }
};

void performAttack(Character& attacker)
{
    attacker.attack();
}

int main()
{
    Warrior warrior;
    warrior.attack();       // Warrior::attack
    performAttack(warrior); // Warrior::attack
}`,
    language: 'cpp',
    points: ['virtual 建立虚函数接口；override 检查重写关系。', '两例用不同文件单独编译，不要把两个 main 加进同一个程序。']
  },
  {
    title: '把 virtual 放回 Character& target 的战斗接口',
    paragraphs: [
      '现在恢复真正的攻击签名：virtual void attack(Character& target)。virtual 放在基类函数声明处，是让这个函数成为虚函数；void 是返回类型，不是攻击强度；attack 是共同名字；括号内的 Character& target 表示借用一个可受伤的角色。这些部分各自解决问题，不能把 virtual 当成让所有参数“自动变正确”的开关。',
      '本课的虚函数本身不写末尾 const，因为 Mage 攻击会扣自己的 mana，也就改变攻击者状态。目标参数也不能改为 const Character&，因为通过它要调用修改生命值的 takeDamage。攻击者是否修改自己、是否修改目标，是两条不同的 const 约束。先根据行为决定接口，再让各职业遵守同一接口，不能为每个职业随意改签名后还期望重写成立。'
    ],
    code: `// 先看一个允许默认行为的虚函数声明：
virtual void attack(Character& target);
// 本课最终会再加 = 0，表示这里要求具体职业提供实现。

// 后面的 const 约束当前攻击者；参数 const 约束目标：
// void attack(Character& target) const;       // 当前对象只读
// void attack(const Character& target);      // 目标只读
// 它们与本课共同接口不是同一个签名。`,
    language: 'cpp',
    points: ['当前对象的 const 与目标对象的 const 分开分析。', '法师扣蓝要求本课攻击接口允许修改攻击者。']
  },
  {
    title: '为什么父类引用和父类指针都能触发多态？',
    paragraphs: [
      '引用和指针都可以不复制对象地访问其基类接口。Character& c = warrior 建立一个必须初始化的借用；Character* p = &warrior 保存地址，可能为空，也可以改指向。普通虚调用分别写 c.attack(target) 和 p->attack(target)，在目标有效且重写关系正确时，都能执行 Warrior 的攻击实现。多态并不要求先用 new，局部 Warrior 对象一样可以被父类引用访问。',
      '但这只是借用，不是自动拥有。上例 p 指向局部对象，不能 delete p；局部 warrior 的寿命结束后，也不能继续保存并解引用 p 或 c。需要允许“当前没有攻击者”时可用可空指针并检查；本课 battle 要求两名实际存在的角色，所以引用接口更直接。对比中出现的 &warrior 是取地址，Character& 中的 & 则是在声明引用，不是同一种操作。'
    ],
    code: `Warrior warrior("Arthur");
Mage mage("Merlin");

Character& byReference = warrior;
Character* byPointer = &warrior;

// 两种写法仅展示调用语法；运行两句会攻击两次。
byReference.attack(mage);
if (byPointer != nullptr)
{
    byPointer->attack(mage);
}
// 不要 delete byPointer：它没有拥有这名局部 warrior。`,
    language: 'cpp',
    points: ['多态不要求动态分配。', '父类借用仍需遵守目标寿命与非空前提。']
  },
  {
    title: 'override 为什么存在：把意图交给编译器核对',
    paragraphs: [
      'override 写在派生类成员函数声明的参数列表之后，表示“我意图重写某个基类虚函数，请编译器验证”。若函数名、参数、被引用类型的 const、成员 const 或引用限定等不符合重写规则，编译会失败。返回类型也必须符合相同或合法协变等规则。它避免你以为已经替换攻击，实际只新增了一个隐藏同名函数的情况。',
      '特别注意：启用虚分派的基础是基类已经有 virtual 函数及合法重写关系；override 不会把任意签名强行改成正确接口。正确重写即使省略 override 也仍然是虚函数，但失去明确的意图检查。初学时应保留 override：出现错误就检查接口，而不是删除 override 让错误暂时消失。下面是有意不能编译的声明，只用于观察诊断，不要复制进最终练习。'
    ],
    code: `// 基类约定：virtual void attack(Character& target) = 0;

// 错例一：目标成了只读，签名不同。
// void attack(const Character& target) override;

// 错例二：当前对象多了 const，仍与基类不匹配。
// void attack(Character& target) const override;

// 正确：保持共同接口的参数及成员限定一致。
void attack(Character& target) override;`,
    language: 'cpp',
    points: ['override 的报错通常是有用的接口检查。', '少写 & 也不是正确重写；若 Character 抽象，按值还会引入另一类错误。']
  },
  {
    title: '从你的 const powerAttack 迁移时，具体改哪里？',
    paragraphs: [
      '你第 13 课的 Warrior::powerAttack(Character& target) const 本来没有问题：战士不扣自己的资源，只修改目标，所以可以是 const 成员函数。但现在 Warrior 与会扣蓝的 Mage 要满足同一个 attack 接口，基类声明没有末尾 const，Warrior 的重写也必须没有末尾 const。这里去掉 const 是为了遵守共同接口，不是说战士突然必须修改自己。',
      '需要同时修改类内声明和类外定义：powerAttack 改名为 attack，删除末尾 const，类内声明加 override；类外写 void Warrior::attack(Character& target)，不在类外定义处重复 override。若只改声明不改定义，会出现无匹配定义或其他编译/链接错误。Mage 的 castSpell 原本就不是 const，主要改名与声明重写即可。这是你旧代码中最容易漏掉的一处迁移差异。'
    ],
    code: `// 第 13 课：
// void powerAttack(Character& target) const;
// void Warrior::powerAttack(Character& target) const { ... }

// 第 14 课类内声明：
// void attack(Character& target) override;

// 第 14 课类外定义：
// void Warrior::attack(Character& target) { ... }
// override 在类内声明处写，不在类外定义处重复写。`,
    language: 'cpp',
    points: ['声明和定义一起改。', '共同非 const 接口可以由一个实际上不修改自己的函数实现。']
  },
  {
    title: '重写、重载、名称隐藏不要混成一个词',
    paragraphs: [
      '重写针对继承来的虚函数，提供匹配规则下的最终实现；重载是同名函数用不同参数供编译器选择；名称隐藏是派生作用域中的同名声明遮住基类名称，甚至不要求参数相同。例如基类有 attack(Character&)，派生类写 attack(int)，这不是把共同攻击升级成“可以接收整数目标”，而是引入另一接口并可能隐藏基类的同名函数。',
      '给错误签名加 override 可以尽早发现它不是重写。若确实要保留一组基类重载，可根据设计使用 using Character::attack 引入它们，但 using 不能修补错误的重写签名。另一个细节是 void f(int) 与 void f(const int) 的按值参数顶层 const 不区分重载；本课涉及的 Character& 与 const Character& 则确实不同。不要只凭函数名或“看到 const”机械判断。'
    ],
    table: {
      headers: ['关系', '关键条件', '本课中的意义'],
      rows: [
        ['重写 override', '基类虚函数，派生实现匹配重写规则', 'Warrior 与 Mage 实现同一 attack'],
        ['重载 overload', '同名但不同参数供编译期选择', '如 attack(Character&) 与 attack(int)'],
        ['隐藏 hiding', '派生类同名声明影响名称查找', '错误签名可能遮住基类名称，却没完成重写']
      ]
    },
    points: ['先检查名字查找到谁，再考虑重载选择与虚分派。', 'override 可以检查重写，不能代替参数设计。']
  },
  {
    title: '= 0 从哪里来：为什么让 Character 成为抽象类？',
    paragraphs: [
      '实验 B 的 Character 有一个默认输出，但最终游戏里“普通角色怎样攻击”没有合理通用答案。我们不希望程序悄悄执行空攻击，也不希望创建一个没有职业行为的 Character，因此把声明写为 virtual void attack(Character& target) = 0;。这里 = 0 是纯说明符，指定纯虚函数，不是赋值给函数，也不是说返回数值零；返回类型仍然是 void。',
      '更精确地说：若一个类存在最终重写者仍为纯虚函数的虚函数，该类就是抽象类，不能直接创建完整对象。派生类若没有补足实现，也继续抽象；若继承来的某个中间类已经提供非纯实现，它不必在每一层重新写一次才算具体类。这比“每个子类必须亲自写 attack”准确。抽象类仍然可以有数据、构造函数和已实现的方法，也可以作为指针/引用接口。',
      '纯虚函数在语言上还可以拥有单独的定义，用于特别的显式基类调用等场景，但它即使有定义仍然是纯虚，仍影响抽象性。本课不采用这种进阶写法：Character 只规定攻击契约，具体职业负责实现。因此参考中没有 Character::attack 函数体，并不是漏写了实现。'
    ],
    code: `// 在 Character 类内：
virtual void attack(Character& target) = 0;

// 错例（不要加入最终 main）：
// Character someone("Someone", 100); // 抽象类不能直接实例化

// 合法：只声明借用接口，不创建 Character 完整对象。
void performAttack(Character& attacker, Character& target);

// Warrior 若正确提供非纯 attack 实现，就可创建：
// Warrior warrior("Arthur");`,
    language: 'cpp',
    points: ['= 0 是纯虚声明，不是 return 0。', '能否实例化由最终重写者是否仍为纯虚决定。']
  },
  {
    title: 'Character 保留什么：共同状态与共同契约',
    paragraphs: [
      '把新概念放入完整的基类结构后，你会发现 getName、getHealth、takeDamage、printStatus、isAlive 都可以保持原来的职责。只有 attack 是职业差异点，需要虚接口；不必把所有成员函数都改为 virtual。takeDamage 仍统一维护“不接受非正伤害、死亡后不继续扣血、生命不小于零”，子类通过目标的这个公开方法造成伤害。',
      '下面把短方法放在类内，方便一眼看见责任；你也可以沿用第 13 课的类内声明、类外定义，两种排布不改变这里的多态语义。构造仍先初始化 name/health，再校验初值。父类私有成员依然不会向子类开放，Warrior 不直接写 target.health，Mage 也不复制一份自己的 health。虚析构这一行稍后单独拆解，现在先把它理解为为多态销毁提供合适接口。'
    ],
    code: `class Character
{
private:
    std::string name;
    int health;
public:
    Character(const std::string& characterName, int characterHealth)
        : name(characterName), health(characterHealth)
    {
        if (health < 0) health = 0;
    }
    virtual ~Character() = default;

    const std::string& getName() const { return name; }
    int getHealth() const { return health; }
    bool isAlive() const { return health > 0; }
    void takeDamage(int damage)
    {
        if (damage <= 0 || !isAlive()) return;
        health = damage >= health ? 0 : health - damage;
    }
    void printStatus() const
    {
        std::cout << "Name: " << name << '\\n';
        std::cout << "Health: " << health << '\\n';
    }
    virtual void attack(Character& target) = 0;
};`,
    language: 'cpp',
    points: ['片段需与 iostream、string 头文件及子类定义放入同一练习。', '虚接口用于变化点；普通受伤方法仍集中维护生命规则。']
  },
  {
    title: 'Warrior 实现：改接口，不把伤害规则搬给调度器',
    paragraphs: [
      'Warrior 的构造仍是 Warrior(name) → Character(name, 120)，父类负责名字和生命初始化。attack 的函数体先用 isAlive 检查攻击者，死亡则输出说明并 return；存活才打印重击并调用 target.takeDamage(35)。return 只结束这次攻击调用，返回 battle 的调用位置，不会直接退出整个程序。',
      '这里 target 的静态接口也是 Character，为什么 takeDamage 不需要 virtual？因为本课所有职业共享同一套受伤规则，调用基类这份实现即可。攻击方式有差异才选择虚接口；以后若确有“盾卫改变受伤算法”的需求，再根据契约决定是否扩展虚接口或组合防御能力。不要因为接触多态就把每个方法都改虚。'
    ],
    code: `class Warrior : public Character
{
public:
    explicit Warrior(const std::string& warriorName)
        : Character(warriorName, 120) {}

    void attack(Character& target) override
    {
        if (!isAlive())
        {
            std::cout << getName() << " cannot attack.\\n";
            return;
        }
        std::cout << getName() << " uses Power Attack!\\n";
        target.takeDamage(35);
    }
};`,
    language: 'cpp',
    points: ['35 点伤害属于职业实现，battle 不保存这条职业规则。', 'explicit 限制不期望的隐式构造，与虚分派无直接关系；不加它也不改变本课调用结果。']
  },
  {
    title: 'Mage 实现：统一接口可以有不同内部过程',
    paragraphs: [
      'Mage 仍由 Character(name, 80) 建立基类状态，mana 初始化为 100。每次 attack 依次检查自己是否存活、蓝量是否至少 20；通过后先扣 20，再让目标受到 40 点伤害。两次成功攻击后蓝量为 60；失败的攻击不应扣蓝或伤害目标。把这一顺序写出来，是为了让统一接口不仅能编译，而且具有清晰的行为契约。',
      '为什么不让 battle 先查询 mana 再决定是否攻击？因为 battle 只应调度，不应知道法师资源规则；否则新增怒气、弹药等职业资源时，调度器又会充满职业分支。当前示例约定蓝量不足就跳过，本课不自动增加回蓝、普通攻击或额外 fallback。若将来改变约定，应修改接口说明和该职业实现，而不是偷偷改预期结果。'
    ],
    code: `class Mage : public Character
{
private:
    int mana;
public:
    explicit Mage(const std::string& mageName)
        : Character(mageName, 80), mana(100) {}

    void attack(Character& target) override
    {
        const int manaCost = 20;
        const int spellDamage = 40;
        if (!isAlive())
        {
            std::cout << getName() << " cannot attack.\\n";
            return;
        }
        if (mana < manaCost)
        {
            std::cout << getName() << " does not have enough mana.\\n";
            return;
        }
        mana -= manaCost;
        std::cout << getName() << " casts a spell!\\n";
        target.takeDamage(spellDamage);
    }
    int getMana() const { return mana; }
};`,
    language: 'cpp',
    points: ['接口一致，不要求内部步骤一致。', '查询 getMana 仍是 Mage 专属接口，不自动成为 Character 的成员。']
  },
  {
    title: '真正的多态调用：逐层跟踪 performAttack',
    paragraphs: [
      '调用 performAttack(warrior, mage) 时，attacker 绑定 warrior 的基类接口，target 绑定 mage 的基类接口，没有复制两名角色。执行 attacker.attack(target) 时，静态接口确认 Character 有这个虚函数，动态分派找到 Warrior 的最终重写；进入 Warrior::attack 后，target 仍引用原来的 Merlin，所以 takeDamage 修改 Merlin 的生命。函数结束再回到 main 的下一条语句。',
      '交换实参调用 performAttack(mage, warrior)，函数体一字不变，attacker 的动态对象变成 Mage，因而先扣法师自己的蓝，再伤害 Arthur。多态的重点正是“同一调用位置因实际对象不同而执行不同实现”，而不是两个同名函数碰巧分别被直接调用。这个教学函数用于看清调用链；最终 battle 直接写 first.attack(second) 同样能产生多态，不需要为了多态必须多套一层函数。'
    ],
    code: `void performAttack(Character& attacker, Character& target)
{
    attacker.attack(target);
}

// 单独测试这两次调用时，使用刚创建的角色：
// performAttack(warrior, mage); // Warrior::attack → mage.takeDamage(35)
// performAttack(mage, warrior); // Mage::attack → warrior.takeDamage(40)
// 若随后还要验证完整战斗初值，请重新创建角色，避免先前伤害影响结果。`,
    language: 'cpp',
    points: ['引用形参是原对象的别名，不是新角色。', '单次调用测试与完整战斗测试应使用独立初始状态。']
  },
  {
    title: '先手算两轮：把虚调用与数值变化对应起来',
    paragraphs: [
      '先不写循环，复用第 13 课两轮的验算。初始 Arthur 120、Merlin 80、蓝量 100。第一轮 Arthur 攻击，Merlin 80−35=45；Merlin 仍存活，施法令蓝量 100−20=80，Arthur 120−40=80。第二轮 Arthur 再攻击，Merlin 45−35=10；Merlin 施法，蓝量 80−20=60，Arthur 80−40=40。与你原来第 13 课输出一致。',
      '这里不是虚函数“自动计算出伤害”，仍然是每个职业函数体中的普通语句完成计算。virtual 解决选哪份函数体，if 与赋值解决该函数体的业务效果。把这两层拆开后，调试就有方向：若进错职业实现，查接口和重写；若进对函数却生命值不对，查初值、重复调用、扣血顺序和 takeDamage。'
    ],
    table: {
      headers: ['时刻', 'Arthur HP', 'Merlin HP', 'Merlin mana', '实际进入的实现'],
      rows: [
        ['初始', '120', '80', '100', '尚未攻击'],
        ['第 1 轮 Arthur 行动后', '120', '45', '100', 'Warrior::attack'],
        ['第 1 轮 Merlin 行动后', '80', '45', '80', 'Mage::attack'],
        ['第 2 轮 Arthur 行动后', '80', '10', '80', 'Warrior::attack'],
        ['第 2 轮 Merlin 行动后', '40', '10', '60', 'Mage::attack']
      ]
    },
    points: ['两轮结果复现历史练习：40 / 10 / 60。', '选中实现与实现内的运算是两个独立检查点。']
  },
  {
    title: '第三轮结束：死者不反击，僵局也必须有出口',
    paragraphs: [
      '第三轮 Arthur 再造成 35 点伤害，Merlin 的 10 生命降到 0，而不是显示 −25，因为 takeDamage 负责下限。接下来必须重新判断 second.isAlive()，不能只因为回合开始时两人都活着就无条件反击。Merlin 已死，不再扣蓝、不再造成伤害，所以最终 Arthur 40、Merlin 0、蓝量仍为 60。Arthur 获胜不是只比较谁剩血多，而是判断一方存活且另一方死亡。',
      '通用战斗还要考虑将来双方都不造成伤害、蓝量耗尽或其他无进展组合。只写 while (双方存活) 可能无限运行，因此增加最多 100 回合，并把双方都活着到达上限报告为平局。下面用 rounds < maxRounds 再在循环体 ++rounds，计数意图比把 rounds++ 藏在条件里更清楚；你当前文件的后置自增缩略写法对这个 Arthur/Merlin 样例结果相同。'
    ],
    code: `void battle(Character& first, Character& second)
{
    const int maxRounds = 100;
    int rounds = 0;
    while (first.isAlive() && second.isAlive() && rounds < maxRounds)
    {
        ++rounds;
        first.attack(second);
        if (second.isAlive())
        {
            second.attack(first);
        }
    }
    if (first.isAlive() && !second.isAlive())
        std::cout << first.getName() << " wins!\\n";
    else if (second.isAlive() && !first.isAlive())
        std::cout << second.getName() << " wins!\\n";
    else
        std::cout << "Draw\\n";
}`,
    language: 'cpp',
    points: ['第三次战士攻击后不执行第三次施法，因此 mana 是 60 而不是 40。', '调度器只调用共同接口，不判断 Warrior、Mage 类型。']
  },
  {
    title: 'virtual ~Character() = default 每一部分为什么存在？',
    paragraphs: [
      '析构函数的名字是 ~ 加类名，所以 ~Character 表示 Character 析构函数，~ 在这里不是取反运算。它没有返回类型，括号为空；= default 表示明确请求编译器生成默认实现。默认析构并非“什么都不做”：它仍会按规则销毁成员和基类，例如 string 成员会清理自己持有的资源。virtual 放在析构声明上，使适当的多态删除能够沿真实派生类型正确销毁。',
      '本课后续可能出现 Character* p = new Warrior("Arthur"); delete p;。p 的静态指针类型是 Character*，实际分配的是 Warrior；在 C++17 这种普通删除场景中，若基类析构非虚，经基类指针删除派生对象是未定义行为，不能只说“可能少调用一个函数”。public virtual 析构让这种使用成为合理接口。下面是独立可运行的观察程序，正常输出先 Warrior 再 Character。',
      '这不意味着所有基类无条件需要 public virtual 析构。若设计上禁止经基类指针删除，可以采用 protected 非虚析构等契约；本课选择公开虚析构是为了支持后续多态拥有者。也不要对指向局部对象的基类指针 delete；虚析构不能修复错误所有权。此处 new/delete 仅解释规则，第 15、16 课会用 RAII 和智能指针管理正常资源。'
    ],
    code: `#include <iostream>
class Character
{
public:
    virtual ~Character() { std::cout << "Character destroyed\\n"; }
};
class Warrior : public Character
{
public:
    ~Warrior() override { std::cout << "Warrior destroyed\\n"; }
};
int main()
{
    Character* character = new Warrior;
    delete character; // Warrior 析构，然后 Character 析构
}
// 最终练习不需要额外手写这段分配，只保留适当的析构接口。`,
    language: 'cpp',
    points: ['= default 请求默认实现；= 0 指定纯虚，两者含义完全不同。', '纯虚析构是进阶特殊情况：即使声明 = 0，也仍需提供定义。']
  },
  {
    title: '实现示意与边界：虚表、切片、构造析构',
    paragraphs: [
      '常见实现会用虚函数表记录实现入口，对象中可能保存相关虚指针，虚调用据此间接选择函数。这适合作为辅助图，但 C++ 标准保证的是可观察调用行为，不强制表的具体布局、指针个数或对象增加几个字节。优化器能确定目标时也可能去虚化。现在先掌握接口与动态分派，调试时不要依赖“第一个字段必定是虚指针”这样的实现猜测。',
      '多态需要保留实际派生对象。把派生对象按值复制成一个可实例化的基类对象会发生切片，只留下基类部分；本课 Character 抽象，直接按值实例化则编译就不允许。未来要存放不同职业，应选择合适的基类指针拥有者或借用，而不是 vector<Character>。固定接口的引用并未切片，按值创建基类对象才是另一回事。',
      '还有两个先知道边界即可的进阶规则：在某类构造/析构期间，对正在建立/销毁对象的虚调用不会进入更派生、尚未建立或已被拆除的部分；不要靠基类构造调用纯虚 attack 完成职业初始化。虚函数默认参数则由静态调用接口提供，不随动态重写一起切换；因此本课 attack 不设计不同职业的不同默认参数。这些边界会在面试区继续展开，不妨先完成正常战斗流程。'
    ],
    points: ['虚表是常见实现模型，不能冒充标准布局保证。', '基类引用不切片；按值保存基类可能切片或因抽象性无法编译。', '构造析构期虚调用、默认实参有额外规则。']
  },
  {
    title: '把整合过程拆成可以自己完成的小步骤',
    paragraphs: [
      '先备份或提交你当前 lesson14.cpp，再在这份工作文件里逐步练习；网站不会替你覆盖已有代码。第一步对照 lesson13，保留共同状态与查询/受伤接口。第二步添加公开虚析构和纯虚 attack，只编译，观察未完成重写时为何 Warrior/Mage 仍可能抽象。第三步先改 Warrior 的声明与定义，再改 Mage，每完成一个小改动检查编译诊断，不要一口气粘贴最终答案。',
      '第四步用新建角色测试一次 performAttack，再重新创建初始角色执行 battle，避免测试先扣血改变终局。第五步加入先手击杀后不反击、100 回合上限及明确胜负/平局判断。第六步输出初始和最终状态，逐项核对 120/80/100 到 40/0/60。你当前 print() 与这里 printStatus() 的显示格式不同，可以保留原名称；若补回 getHealth，声明与定义一起补，并不要因此复制第二份 health。',
      '所有本课文件已在 exercises/lesson14 中，直接打开并编辑；完整仓库参考答案在 reference 子目录，也可在网页展开。编译时明确选择工作文件或 reference 中的一份，不把两个 main 同时链接。若想体验故意错误，把小对照例放入独立临时文件，正常练习里只保留正确声明。终端的真实编译与输出是最终验证，网页步骤和图解都只是教学辅助。'
    ],
    code: `// main 的整合结构（假设采用前面讲解的长接口名）：
int main()
{
    Warrior warrior("Arthur");
    Mage mage("Merlin");
    warrior.printStatus();
    mage.printStatus();

    battle(warrior, mage);

    warrior.printStatus();
    mage.printStatus();
    std::cout << "Mage mana: " << mage.getMana() << '\\n';
}
// 在你的缩略文件中，printStatus 调用可对应已有 print。`,
    language: 'cpp',
    points: ['每个阶段都编译，诊断也是理解接口的证据。', '不要覆盖自己的练习；参考解答用于核对。', '验收包括死亡不行动、蓝量不足不扣蓝、零/负伤害不改变生命及回合上限。']
  },
  {
    title: '记忆卡片：先说需求，再说关键字',
    paragraphs: [
      '现在用自己的话从头解释一次：战斗系统希望通过共同的 Character 接口调度任意职业；virtual 让共同攻击成为可动态分派的接口；派生类提供重写实现；override 检查实现确实满足重写关系；= 0 表达没有合理默认攻击，要求对象在成为具体可实例化类型之前补足实现；公开虚析构支持将来经基类接口正确销毁派生对象。每个语法点都有对应问题，而不是一串必须背下的装饰。',
      '最后回答两个预测：若删掉 override 但签名仍正确，动态分派通常仍成立，失去的是意图检查；若删掉基类 virtual，却保留派生 override，则编译器应拒绝未重写虚函数的声明。若把 Warrior attack 保留为末尾 const，而共同接口没有 const，同样不能正确重写。能解释这些“改一个词会怎样”，比只记住能运行的整段代码更能证明你理解了。',
      '完成本课不需要先背虚表内存布局，也不需要先使用 new。先在 VS Code 亲手完成两份对照程序、一次错误签名诊断和完整三轮战斗，再到面试区复习抽象类、切片和构造析构等边界。下一课继续解释对象寿命与清理责任，然后才使用智能指针管理不同职业；标准 C++ 的拥有关系与以后 UE 的对象回收规则也会分别讲解。'
    ],
    points: ['继承：Warrior/Mage 可以作为 Character 使用。', 'virtual + 正确重写：共同接口选择实际对象的实现；override：编译器核对重写意图。', '= 0：纯虚接口；= default：默认生成实现；最终结果：Arthur 40、Merlin 0、mana 60。']
  }
];
