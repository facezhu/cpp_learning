// 先定义语法，再做独立实验，最后整合角色；所有关联为人工标注。
export const polymorphismLecture = [
  {
    "title": "回顾继承：共同类型与统一行为",
    "paragraphs": [
      "上一课的继承让Warrior和Mage都能作为Character使用，共同部分保存name、health与受伤查询接口。本课的运行时多态是通过同一个基类引用或指针，调用对象实际类型的对应实现。它用于让战斗控制器只认识共同攻击接口，而不需要逐个判断职业。",
      "你原来的 main 直接写 warrior.powerAttack(mage)、mage.castSpell(warrior)，再重复一次。两轮后 Arthur 为 40 生命、Merlin 为 10 生命、魔法为 60。你亲自写出了每一个具体职业的调用，所以程序当然知道该调用谁；但自动战斗系统不能要求你提前手写所有职业配对。继承已经让它们都能作为 Character 被攻击，下一步要让它们也能通过 Character 接口主动攻击。",
      "打开 exercises/lesson13/lesson13.cpp 可以对照原文件。现在 lesson14.cpp 是你已经保存的缩略版本，使用 print() 输出“Arthur: 40”，而旧接口叫 printStatus() 并分行显示名字、生命；这是展示接口的差别，不是多态规则。讲解沿用你熟悉的长名称，参考答案区域仍展示仓库的实际文件。",
      "保留原有规则：Warrior初始120生命、每次伤害35；Mage初始80生命和100魔法，每次耗20造成40伤害。先定义共同接口，再观察普通成员与虚成员的调用差别，之后学习重写检查、抽象类和析构语法，最后整合完整战斗。"
    ],
    "code": "Warrior warrior(\"Arthur\");\nMage mage(\"Merlin\");\n\nwarrior.powerAttack(mage);  // 知道 warrior 是 Warrior\nmage.castSpell(warrior);   // 知道 mage 是 Mage\nwarrior.powerAttack(mage);\nmage.castSpell(warrior);",
    "language": "cpp",
    "points": [
      "本课保留原有角色、数值和受伤规则，改变的是攻击接口与调度方式。",
      "先理解你已完成的调用，再引入新的关键字。"
    ],
    "bindings": [{"paragraph": 1, "text": "warrior.powerAttack(mage)、mage.castSpell(warrior)", "lines": [4,5,6,7]}],
    "id": "l14-recap",
    "exampleId": "l14-recap",
    "codeName": "片段 · 从你已经写过的第 13 课出发"
  },
  {
    "title": "共同接口：调度者能够提出的请求",
    "paragraphs": [
      "共同接口是基类公开声明的一组可调用操作。performAttack(Character& attacker, Character& target)只承诺拿到两个Character接口，编译时因此只能访问Character中声明的成员。原父类没有powerAttack或castSpell，不能因为真实对象可能是某个职业就直接调用这些成员。",
      "下面先看原接口的使用限制：注释中的attacker.powerAttack(target)若取消注释，应报告Character没有该成员。认识这个限制后，再把需求写成统一attack。设计上统一接口让控制器表达请攻击，具体职业表达怎样攻击；以后增加Archer时也无需复制调度分支。"
    ],
    "code": "// 概念错例：原版 Character 没有声明 powerAttack。\n// 将下面一行放进函数体，编译器应报告 Character 无此成员。\nvoid performAttack(Character& attacker, Character& target)\n{\n    // attacker.powerAttack(target); // 取消注释后故意编译失败\n}\n// 增加共同接口之后，函数体将只写 attacker.attack(target)。",
    "language": "cpp",
    "points": [
      "继承关系让类型可替换；共同接口决定调度器可以提出什么要求。",
      "没有声明的成员不能靠“真实对象可能有”来调用。"
    ],
    "id": "l14-shared-interface",
    "exampleId": "l14-shared-interface",
    "codeName": "片段 · 为什么只学继承，还写不出通用攻击调度？",
    "bindings": [
      {
        "paragraph": 1,
        "text": "attacker.powerAttack(target)",
        "lines": [
          5
        ]
      }
    ]
  },
  {
    "title": "攻击声明的组成：返回类型、函数名与目标参数",
    "paragraphs": [
      "共同攻击声明先由三个已学部分组成：void是不返回数值的返回类型，attack是名字，Character& target是一个可修改的角色引用。调用仍能通过target.takeDamage改变状态；void不表示没有作用。目标用引用保留原对象，不把它复制成另一个角色。",
      "先把共同名字与参数约定写清楚，再选择调用机制。战士直接伤害、法师先耗蓝都能满足这个约定。设计原因是把调度与职业算法分开；错误对照则是随意改变参数或复制目标，这会改变接口甚至产生切片。接下来先学习静态类型，再运行无virtual的小程序。"
    ],
    "code": "// 我们希望所有具体职业都能满足这份接口约定。\nvoid attack(Character& target);\n// 调度者只知道“攻击”，不必知道“重击”还是“施法”。\n// 返回 void 不表示没有作用，它表示没有返回值。",
    "language": "cpp",
    "points": [
      "目标使用可写引用，避免复制目标。",
      "行为契约还包括死亡、蓝量不足等情况下应该发生什么。"
    ],
    "id": "l14-contract",
    "exampleId": "l14-contract",
    "codeName": "片段 · 先约定 attack 的含义，再考虑实现机制",
    "bindings": [
      {
        "paragraph": 0,
        "text": "Character& target是一个可修改的角色引用",
        "lines": [
          2
        ]
      }
    ]
  },
  {
    "title": "静态类型与动态类型：接口表达式和完整对象",
    "paragraphs": [
      "静态类型是编译时确定的表达式类型，用于名称查找、权限和重载检查；动态类型是当前完整对象的实际类型。Character& attacker=warrior让attacker表达式按Character接口使用同一个Warrior对象，不会复制或丢弃派生部分。下面非虚实验通过一个Character&形参观察这种区别。",
      "先以静态类型检查调用是否合法。普通非虚成员依据编译时接口选择；后面介绍的虚调用才会再依据动态对象选择最终重写。即使存在多态，Character&也不能直接使用只在Mage声明的getMana。先分清访问入口与完整对象，再看两份对照程序的输出。"
    ],
    "table": {
      "headers": [
        "表达式/对象",
        "本例中的类型",
        "影响什么"
      ],
      "rows": [
        [
          "attacker 的静态类型",
          "Character",
          "接口可见性、名称查找、重载等"
        ],
        [
          "attacker 所指完整对象的动态类型",
          "Warrior",
          "普通虚调用选择最终重写实现"
        ],
        [
          "warrior 本身",
          "Warrior 对象",
          "没有因绑定父类引用而被复制或切片"
        ]
      ]
    },
    "points": [
      "接口类型和实际对象类型可以不同。",
      "先判断接口是否合法，再判断虚调用选择哪份实现。"
    ],
    "id": "l14-static-dynamic-types",
    "exampleId": "l14-static-demo",
    "bindings": [
      {
        "paragraph": 0,
        "text": "通过一个Character&形参",
        "lines": [
          15
        ],
        "exampleId": "l14-static-demo"
      }
    ]
  },
  {
    "title": "小实验一：普通非虚成员的调用输出",
    "paragraphs": [
      "这个独立可编译程序只使用已学的类、公开继承、引用参数与普通函数。Character::attack和Warrior::attack各输出自己的名字，暂不添加生命和目标参数，以便只观察调用选择。两个类都允许创建实例，不代表最终角色模型必须如此。",
      "预计输出先Warrior::attack，再Character::attack。直接warrior.attack()根据Warrior接口找到派生类函数；performAttack(warrior)把同一对象交给Character&形参，内部普通非虚调用选择Character版本。运行后再解释设计局限：只改成相同函数名，还不足以实现按职业调度。"
    ],
    "code": "#include <iostream>\n\nclass Character\n{\npublic:\n    void attack() { std::cout << \"Character::attack\\n\"; }\n};\n\nclass Warrior : public Character\n{\npublic:\n    void attack() { std::cout << \"Warrior::attack\\n\"; }\n};\n\nvoid performAttack(Character& attacker)\n{\n    attacker.attack();\n}\n\nint main()\n{\n    Warrior warrior;\n    warrior.attack();       // Warrior::attack\n    performAttack(warrior); // Character::attack\n}",
    "language": "cpp",
    "points": [
      "本例是完整可编译的非虚调用对照。",
      "同名不自动产生运行时多态。"
    ],
    "id": "l14-static-demo",
    "exampleId": "l14-static-demo",
    "codeName": "片段 · 对照实验 A：没有 virtual 的完整小程序",
    "bindings": [
      {
        "paragraph": 1,
        "text": "直接warrior.attack()",
        "lines": [
          23
        ]
      },
      {
        "paragraph": 1,
        "text": "内部普通非虚调用选择Character版本",
        "lines": [
          6,
          15,
          17,
          24
        ]
      }
    ]
  },
  {
    "id": "l14-virtual-definition",
    "exampleId": "l14-virtual-definition",
    "title": "虚函数定义：virtual声明可重写的动态调用接口",
    "paragraphs": [
      "虚函数是基类用virtual声明、允许派生类提供重写实现的非静态成员函数。通过合适的基类引用或指针调用时，会根据实际对象的动态类型选择最终重写。virtual放在返回类型前，其他函数语法仍然有效，参数检查也仍发生在编译时。",
      "先只看声明virtual void attack(Character& target)：virtual规定虚接口，void仍是不返回数值，attack仍是名字，target仍是原目标引用。本节不加入纯虚或析构语法。下一步先认识override作为重写检查，再运行第二个小程序。",
      "设计上用虚函数表达同一请求的不同职业实现；它不让所有成员自动动态选择，也不会自动校验法力或计算伤害。调用机制与函数体里的普通if、赋值分别承担职责。"
    ],
    "code": "// Character类内部的声明片段：\nvirtual void attack(Character& target);",
    "language": "cpp",
    "codeName": "virtual函数声明",
    "bindings": [
      {
        "paragraph": 1,
        "text": "virtual void attack(Character& target)",
        "lines": [
          2
        ]
      }
    ]
  },
  {
    "title": "重写检查：override的定义与放置位置",
    "paragraphs": [
      "重写是派生类为继承来的虚函数提供匹配实现。override是写在派生类成员声明参数列表后面的说明符，表示请编译器检查这确实是一次重写；若参数或成员const等不匹配就拒绝。它不负责启用任意签名的动态派发，基础仍是基类virtual与合法重写关系。",
      "先看正确声明void attack(Character& target) override，再观察下面两条已注释的错法：参数加const会禁止修改目标，末尾加const会改变当前对象的限定，二者都不匹配本课基类接口。正确重写省略override仍是虚函数，但会失去意图检查；遇到诊断应修签名，而不是删检查掩盖问题。"
    ],
    "code": "// 基类约定：virtual void attack(Character& target);\n\n// 错例一：目标成了只读，签名不同。\n// void attack(const Character& target) override;\n\n// 错例二：当前对象多了 const，仍与基类不匹配。\n// void attack(Character& target) const override;\n\n// 正确：保持共同接口的参数及成员限定一致。\nvoid attack(Character& target) override;",
    "language": "cpp",
    "points": [
      "override 的报错通常是有用的接口检查。",
      "少写 & 也不是正确重写；若 Character 抽象，按值还会引入另一类错误。"
    ],
    "id": "l14-override",
    "exampleId": "l14-override",
    "codeName": "片段 · override 为什么存在：把意图交给编译器核对",
    "bindings": [
      {
        "paragraph": 1,
        "text": "void attack(Character& target) override",
        "lines": [
          10
        ]
      },
      {
        "paragraph": 1,
        "text": "参数加const会禁止修改目标",
        "lines": [
          4
        ]
      },
      {
        "paragraph": 1,
        "text": "末尾加const会改变当前对象的限定",
        "lines": [
          7
        ]
      }
    ]
  },
  {
    "title": "小实验二：virtual与override改变调用选择",
    "paragraphs": [
      "现在运行第二个独立程序。基类virtual void attack()先声明可重写接口，派生类void attack() override明确匹配。除此之外仍是上一实验的引用与调用，没有提前加入析构、动态分配或抽象类。",
      "预计两行都输出Warrior::attack。performAttack函数体仍写attacker.attack()，改变的是接口允许动态选择，而非warrior被复制成了新对象。请把两个小程序各存独立文件运行，不把两个main一起链接。这个例子只在局部对象上借用接口，没有通过基类指针执行delete。",
      "对照看第6行与第12行分别建立虚接口和重写，第17行是同一个基类调用位置。设计原因是让控制器不识别职业；边界是静态可见接口仍受检查，不能经Character&任意访问Warrior专有成员。"
    ],
    "code": "#include <iostream>\n\nclass Character\n{\npublic:\n    virtual void attack() { std::cout << \"Character::attack\\n\"; }\n};\n\nclass Warrior : public Character\n{\npublic:\n    void attack() override { std::cout << \"Warrior::attack\\n\"; }\n};\n\nvoid performAttack(Character& attacker)\n{\n    attacker.attack();\n}\n\nint main()\n{\n    Warrior warrior;\n    warrior.attack();       // Warrior::attack\n    performAttack(warrior); // Warrior::attack\n}",
    "language": "cpp",
    "points": [
      "virtual 建立虚函数接口；override 检查重写关系。",
      "两例用不同文件单独编译，不要把两个 main 加进同一个程序。"
    ],
    "id": "l14-virtual-demo",
    "exampleId": "l14-virtual-demo",
    "codeName": "片段 · 对照实验 B：加入 virtual 后发生什么",
    "bindings": [
      {
        "paragraph": 2,
        "text": "第6行与第12行分别建立虚接口和重写",
        "lines": [
          6,
          12
        ]
      },
      {
        "paragraph": 1,
        "text": "performAttack函数体仍写attacker.attack()",
        "lines": [
          17
        ]
      },
      {
        "paragraph": 1,
        "text": "预计两行都输出Warrior::attack",
        "lines": [
          23,
          24
        ]
      }
    ]
  },
  {
    "title": "恢复目标参数：const约束与共同契约",
    "paragraphs": [
      "现在恢复真正的攻击签名：virtual void attack(Character& target)。virtual 放在基类函数声明处，是让这个函数成为虚函数；void 是返回类型，不是攻击强度；attack 是共同名字；括号内的 Character& target 表示借用一个可受伤的角色。这些部分各自解决问题，不能把 virtual 当成让所有参数“自动变正确”的开关。",
      "本课的虚函数本身不写末尾 const，因为 Mage 攻击会扣自己的 mana，也就改变攻击者状态。目标参数也不能改为 const Character&，因为通过它要调用修改生命值的 takeDamage。攻击者是否修改自己、是否修改目标，是两条不同的 const 约束。先根据行为决定接口，再让各职业遵守同一接口，不能为每个职业随意改签名后还期望重写成立。"
    ],
    "code": "// 先看一个允许默认行为的虚函数声明：\nvirtual void attack(Character& target);\n\n// 后面的 const 约束当前攻击者；参数 const 约束目标：\n// void attack(Character& target) const;       // 当前对象只读\n// void attack(const Character& target);      // 目标只读\n// 它们与本课共同接口不是同一个签名。",
    "language": "cpp",
    "points": [
      "当前对象的 const 与目标对象的 const 分开分析。",
      "法师扣蓝要求本课攻击接口允许修改攻击者。"
    ],
    "id": "l14-virtual-signature",
    "exampleId": "l14-virtual-signature",
    "codeName": "片段 · 把 virtual 放回 Character& target 的战斗接口",
    "bindings": [
      {
        "paragraph": 0,
        "text": "virtual void attack(Character& target)",
        "lines": [
          2
        ]
      },
      {
        "paragraph": 1,
        "text": "Mage 攻击会扣自己的 mana",
        "lines": [
          5
        ]
      }
    ]
  },
  {
    "title": "关系对照：重写、重载与名称隐藏",
    "paragraphs": [
      "重写针对继承来的虚函数，提供匹配规则下的最终实现；重载是同名函数用不同参数供编译器选择；名称隐藏是派生作用域中的同名声明遮住基类名称，甚至不要求参数相同。例如基类有 attack(Character&)，派生类写 attack(int)，这不是把共同攻击升级成“可以接收整数目标”，而是引入另一接口并可能隐藏基类的同名函数。",
      "给错误签名加 override 可以尽早发现它不是重写。若确实要保留一组基类重载，可根据设计使用 using Character::attack 引入它们，但 using 不能修补错误的重写签名。另一个细节是 void f(int) 与 void f(const int) 的按值参数顶层 const 不区分重载；本课涉及的 Character& 与 const Character& 则确实不同。不要只凭函数名或“看到 const”机械判断。"
    ],
    "table": {
      "headers": [
        "关系",
        "关键条件",
        "本课中的意义"
      ],
      "rows": [
        [
          "重写 override",
          "基类虚函数，派生实现匹配重写规则",
          "Warrior 与 Mage 实现同一 attack"
        ],
        [
          "重载 overload",
          "同名但不同参数供编译期选择",
          "如 attack(Character&) 与 attack(int)"
        ],
        [
          "隐藏 hiding",
          "派生类同名声明影响名称查找",
          "错误签名可能遮住基类名称，却没完成重写"
        ]
      ]
    },
    "points": [
      "先检查名字查找到谁，再考虑重载选择与虚分派。",
      "override 可以检查重写，不能代替参数设计。"
    ],
    "id": "l14-overload-hiding",
    "exampleId": "l14-override",
    "bindings": [
      {
        "paragraph": 0,
        "text": "提供匹配规则下的最终实现",
        "lines": [
          10
        ],
        "exampleId": "l14-override"
      }
    ]
  },
  {
    "title": "迁移原方法：名称、const与声明定义一致性",
    "paragraphs": [
      "你第 13 课的 Warrior::powerAttack(Character& target) const 本来没有问题：战士不扣自己的资源，只修改目标，所以可以是 const 成员函数。但现在 Warrior 与会扣蓝的 Mage 要满足同一个 attack 接口，基类声明没有末尾 const，Warrior 的重写也必须没有末尾 const。这里去掉 const 是为了遵守共同接口，不是说战士突然必须修改自己。",
      "需要同时修改类内声明和类外定义：powerAttack 改名为 attack，删除末尾 const，类内声明加 override；类外写 void Warrior::attack(Character& target)，不在类外定义处重复 override。若只改声明不改定义，会出现无匹配定义或其他编译/链接错误。Mage 的 castSpell 原本就不是 const，主要改名与声明重写即可。这是你旧代码中最容易漏掉的一处迁移差异。"
    ],
    "code": "// 第 13 课：\n// void powerAttack(Character& target) const;\n// void Warrior::powerAttack(Character& target) const { ... }\n\n// 第 14 课类内声明：\n// void attack(Character& target) override;\n\n// 第 14 课类外定义：\n// void Warrior::attack(Character& target) { ... }\n// override 在类内声明处写，不在类外定义处重复写。",
    "language": "cpp",
    "points": [
      "声明和定义一起改。",
      "共同非 const 接口可以由一个实际上不修改自己的函数实现。"
    ],
    "id": "l14-migration",
    "exampleId": "l14-migration",
    "codeName": "片段 · 从你的 const powerAttack 迁移时，具体改哪里？",
    "bindings": [
      {
        "paragraph": 1,
        "text": "类外写 void Warrior::attack(Character& target)",
        "lines": [
          9
        ]
      }
    ]
  },
  {
    "title": "访问方式：基类引用与基类指针",
    "paragraphs": [
      "本节复用前课的引用与指针定义：Character&建立必须绑定的访问入口，Character*保存可为空的地址；->是经有效指针访问成员，等价于先解引用再用点号。下面片段用于已经定义好具体角色的main中，不另建一个全新Character对象。",
      "引用和指针都可以不复制对象地访问其基类接口。Character& c = warrior 建立一个必须初始化的借用；Character* p = &warrior 保存地址，可能为空，也可以改指向。普通虚调用分别写 c.attack(target) 和 p->attack(target)，在目标有效且重写关系正确时，都能执行 Warrior 的攻击实现。多态并不要求先用 new，局部 Warrior 对象一样可以被父类引用访问。",
      "但这只是借用，不是自动拥有。上例 p 指向局部对象，不能 delete p；局部 warrior 的寿命结束后，也不能继续保存并解引用 p 或 c。需要允许“当前没有攻击者”时可用可空指针并检查；本课 battle 要求两名实际存在的角色，所以引用接口更直接。对比中出现的 &warrior 是取地址，Character& 中的 & 则是在声明引用，不是同一种操作。"
    ],
    "code": "Warrior warrior(\"Arthur\");\nMage mage(\"Merlin\");\n\nCharacter& byReference = warrior;\nCharacter* byPointer = &warrior;\n\n// 两种写法仅展示调用语法；运行两句会攻击两次。\nbyReference.attack(mage);\nif (byPointer != nullptr)\n{\n    byPointer->attack(mage);\n}\n// 不要 delete byPointer：它没有拥有这名局部 warrior。",
    "language": "cpp",
    "points": [
      "多态不要求动态分配。",
      "父类借用仍需遵守目标寿命与非空前提。"
    ],
    "id": "l14-reference-pointer",
    "exampleId": "l14-reference-pointer",
    "codeName": "片段 · 为什么父类引用和父类指针都能触发多态？",
    "bindings": [
      {
        "paragraph": 1,
        "text": "c.attack(target) 和 p->attack(target)",
        "lines": [
          8,
          11
        ]
      }
    ]
  },
  {
    "title": "纯虚函数与抽象类：定义、用途与语法",
    "paragraphs": [
      "纯虚函数是在虚函数声明后使用= 0纯说明符的成员函数。它表达本层没有一个可直接采用的最终实现；仍存在最终纯虚函数的类是抽象类，不能直接创建完整对象，但可作为引用或指针接口。语法virtual void attack(Character& target) = 0中，= 0既不是赋值，也不是返回数值零。",
      "更精确地说：若一个类存在最终重写者仍为纯虚函数的虚函数，该类就是抽象类，不能直接创建完整对象。派生类若没有补足实现，也继续抽象；若继承来的某个中间类已经提供非纯实现，它不必在每一层重新写一次才算具体类。这比“每个子类必须亲自写 attack”准确。抽象类仍然可以有数据、构造函数和已实现的方法，也可以作为指针/引用接口。",
      "纯虚函数在语言上还可以拥有单独的定义，用于特别的显式基类调用等场景，但它即使有定义仍然是纯虚，仍影响抽象性。本课不采用这种进阶写法：Character 只规定攻击契约，具体职业负责实现。因此参考中没有 Character::attack 函数体，并不是漏写了实现。",
      "对照右侧：第2行声明抽象攻击，第5行是禁止实例化的注释错例，第8行只接收引用，不创建抽象对象，所以合法。设计原因是Character没有合理的通用职业攻击；与其默默做空操作，不如让未完成的职业在编译时无法实例化。"
    ],
    "code": "// 在 Character 类内：\nvirtual void attack(Character& target) = 0;\n\n// 错例（不要加入最终 main）：\n// Character someone(\"Someone\", 100); // 抽象类不能直接实例化\n\n// 合法：只声明借用接口，不创建 Character 完整对象。\nvoid performAttack(Character& attacker, Character& target);\n\n// Warrior 若正确提供非纯 attack 实现，就可创建：\n// Warrior warrior(\"Arthur\");",
    "language": "cpp",
    "points": [
      "= 0 是纯虚声明，不是 return 0。",
      "能否实例化由最终重写者是否仍为纯虚决定。"
    ],
    "id": "l14-abstract",
    "exampleId": "l14-abstract",
    "codeName": "片段 · = 0 从哪里来：为什么让 Character 成为抽象类？",
    "bindings": [
      {
        "paragraph": 0,
        "text": "virtual void attack(Character& target) = 0",
        "lines": [
          2
        ]
      },
      {
        "paragraph": 3,
        "text": "第5行是禁止实例化的注释错例",
        "lines": [
          5
        ]
      },
      {
        "paragraph": 3,
        "text": "第8行只接收引用",
        "lines": [
          8
        ]
      }
    ]
  },
  {
    "title": "析构函数：~、virtual与= default各自的含义",
    "paragraphs": [
      "析构函数在对象销毁时执行，名字是~加类名，没有返回类型也没有参数；~Character()就是Character的析构函数。= default明确请求编译器生成默认行为，仍会按规则销毁成员与基类，并非什么都不做。给析构加virtual，表示适当的多态删除按完整派生对象执行销毁链。",
      "先读动态分配语法：new Warrior创建动态存储期对象并返回指针，delete character销毁对应对象并释放存储。右侧独立实验用Character*持有Warrior，delete后应先输出Warrior destroyed，再输出Character destroyed。这只是观察规则，正常练习先继续用局部对象。",
      "这不意味着所有基类无条件需要 public virtual 析构。若设计上禁止经基类指针删除，可以采用 protected 非虚析构等契约；本课选择公开虚析构是为了支持后续多态拥有者。也不要对指向局部对象的基类指针 delete；虚析构不能修复错误所有权。此处 new/delete 仅解释规则，第 15、16 课会用 RAII 和智能指针管理正常资源。",
      "在C++17普通删除场景中，若基类析构非虚却经基类指针删除派生对象，行为未定义，不能只说少调用一行日志。下面析构手写打印体用于观察；最终Character将用已解释的virtual ~Character() = default请求默认清理。该默认形式不打印，但仍会正确销毁对象成员。"
    ],
    "code": "#include <iostream>\nclass Character\n{\npublic:\n    virtual ~Character() { std::cout << \"Character destroyed\\n\"; }\n};\nclass Warrior : public Character\n{\npublic:\n    ~Warrior() override { std::cout << \"Warrior destroyed\\n\"; }\n};\nint main()\n{\n    Character* character = new Warrior;\n    delete character; // Warrior 析构，然后 Character 析构\n}\n// 最终练习不需要额外手写这段分配，只保留适当的析构接口。",
    "language": "cpp",
    "points": [
      "= default 请求默认实现；= 0 指定纯虚，两者含义完全不同。",
      "纯虚析构是进阶特殊情况：即使声明 = 0，也仍需提供定义。"
    ],
    "id": "l14-destruction-demo",
    "exampleId": "l14-destruction-demo",
    "codeName": "片段 · virtual ~Character() = default 每一部分为什么存在？",
    "bindings": [
      {
        "paragraph": 0,
        "text": "给析构加virtual",
        "lines": [
          5
        ]
      },
      {
        "paragraph": 1,
        "text": "new Warrior创建动态存储期对象并返回指针",
        "lines": [
          14
        ]
      },
      {
        "paragraph": 1,
        "text": "delete character销毁对应对象并释放存储",
        "lines": [
          15
        ]
      },
      {
        "paragraph": 1,
        "text": "先输出Warrior destroyed，再输出Character destroyed",
        "lines": [
          10,
          5
        ]
      }
    ]
  },
  {
    "title": "整合基类：共同状态、抽象接口与虚析构",
    "paragraphs": [
      "把新概念放入完整的基类结构后，你会发现 getName、getHealth、takeDamage、printStatus、isAlive 都可以保持原来的职责。只有 attack 是职业差异点，需要虚接口；不必把所有成员函数都改为 virtual。takeDamage 仍统一维护“不接受非正伤害、死亡后不继续扣血、生命不小于零”，子类通过目标的这个公开方法造成伤害。",
      "前面已分别认识了virtual攻击、= 0纯说明符、~析构名与= default默认实现，现在才把它们放进同一个Character。共同查询和受伤方法仍是普通成员，不必全部变virtual。构造先初始化name、health，负初值修正为0，允许Warrior有120生命；封装仍由private保护。"
    ],
    "code": "class Character\n{\nprivate:\n    std::string name;\n    int health;\npublic:\n    Character(const std::string& characterName, int characterHealth)\n        : name(characterName), health(characterHealth)\n    {\n        if (health < 0) health = 0;\n    }\n    virtual ~Character() = default;\n\n    const std::string& getName() const { return name; }\n    int getHealth() const { return health; }\n    bool isAlive() const { return health > 0; }\n    void takeDamage(int damage)\n    {\n        if (damage <= 0 || !isAlive()) return;\n        health = damage >= health ? 0 : health - damage;\n    }\n    void printStatus() const\n    {\n        std::cout << \"Name: \" << name << '\\n';\n        std::cout << \"Health: \" << health << '\\n';\n    }\n    virtual void attack(Character& target) = 0;\n};",
    "language": "cpp",
    "points": [
      "片段需与 iostream、string 头文件及子类定义放入同一练习。",
      "虚接口用于变化点；普通受伤方法仍集中维护生命规则。"
    ],
    "id": "l14-character",
    "exampleId": "l14-character",
    "codeName": "片段 · Character 保留什么：共同状态与共同契约",
    "bindings": [
      {
        "paragraph": 1,
        "text": "virtual攻击、= 0纯说明符",
        "lines": [
          27
        ]
      },
      {
        "paragraph": 1,
        "text": "~析构名与= default默认实现",
        "lines": [
          12
        ]
      },
      {
        "paragraph": 0,
        "text": "takeDamage 仍统一维护",
        "lines": [
          17,
          19,
          20
        ]
      }
    ]
  },
  {
    "title": "Warrior实现：共同接口与35点伤害",
    "paragraphs": [
      "Warrior 的构造仍是 Warrior(name) → Character(name, 120)，父类负责名字和生命初始化。attack 的函数体先用 isAlive 检查攻击者，死亡则输出说明并 return；存活才打印重击并调用 target.takeDamage(35)。return 只结束这次攻击调用，返回 battle 的调用位置，不会直接退出整个程序。",
      "这里 target 的静态接口也是 Character，为什么 takeDamage 不需要 virtual？因为本课所有职业共享同一套受伤规则，调用基类这份实现即可。攻击方式有差异才选择虚接口；以后若确有“盾卫改变受伤算法”的需求，再根据契约决定是否扩展虚接口或组合防御能力。不要因为接触多态就把每个方法都改虚。"
    ],
    "code": "class Warrior : public Character\n{\npublic:\n    Warrior(const std::string& warriorName)\n        : Character(warriorName, 120) {}\n\n    void attack(Character& target) override\n    {\n        if (!isAlive())\n        {\n            std::cout << getName() << \" cannot attack.\\n\";\n            return;\n        }\n        std::cout << getName() << \" uses Power Attack!\\n\";\n        target.takeDamage(35);\n    }\n};",
    "language": "cpp",
    "points": [
      "35 点伤害属于职业实现，battle 不保存这条职业规则。",
      "explicit 限制不期望的隐式构造，与虚分派无直接关系；不加它也不改变本课调用结果。"
    ],
    "id": "l14-warrior",
    "exampleId": "l14-warrior",
    "codeName": "片段 · Warrior 实现：改接口，不把伤害规则搬给调度器",
    "bindings": [
      {
        "paragraph": 0,
        "text": "Character(name, 120)",
        "lines": [
          5
        ]
      },
      {
        "paragraph": 0,
        "text": "target.takeDamage(35)",
        "lines": [
          15
        ]
      }
    ]
  },
  {
    "title": "Mage实现：共同接口与法力消耗",
    "paragraphs": [
      "Mage 仍由 Character(name, 80) 建立基类状态，mana 初始化为 100。每次 attack 依次检查自己是否存活、蓝量是否至少 20；通过后先扣 20，再让目标受到 40 点伤害。两次成功攻击后蓝量为 60；失败的攻击不应扣蓝或伤害目标。把这一顺序写出来，是为了让统一接口不仅能编译，而且具有清晰的行为契约。",
      "为什么不让 battle 先查询 mana 再决定是否攻击？因为 battle 只应调度，不应知道法师资源规则；否则新增怒气、弹药等职业资源时，调度器又会充满职业分支。当前示例约定蓝量不足就跳过，本课不自动增加回蓝、普通攻击或额外 fallback。若将来改变约定，应修改接口说明和该职业实现，而不是偷偷改预期结果。"
    ],
    "code": "class Mage : public Character\n{\nprivate:\n    int mana;\npublic:\n    Mage(const std::string& mageName)\n        : Character(mageName, 80), mana(100) {}\n\n    void attack(Character& target) override\n    {\n        const int manaCost = 20;\n        const int spellDamage = 40;\n        if (!isAlive())\n        {\n            std::cout << getName() << \" cannot attack.\\n\";\n            return;\n        }\n        if (mana < manaCost)\n        {\n            std::cout << getName() << \" does not have enough mana.\\n\";\n            return;\n        }\n        mana -= manaCost;\n        std::cout << getName() << \" casts a spell!\\n\";\n        target.takeDamage(spellDamage);\n    }\n    int getMana() const { return mana; }\n};",
    "language": "cpp",
    "points": [
      "接口一致，不要求内部步骤一致。",
      "查询 getMana 仍是 Mage 专属接口，不自动成为 Character 的成员。"
    ],
    "id": "l14-mage",
    "exampleId": "l14-mage",
    "codeName": "片段 · Mage 实现：统一接口可以有不同内部过程",
    "bindings": [
      {
        "paragraph": 0,
        "text": "mana 初始化为 100",
        "lines": [
          7
        ]
      },
      {
        "paragraph": 0,
        "text": "先扣 20，再让目标受到 40 点伤害",
        "lines": [
          23,
          25
        ]
      },
      {
        "paragraph": 0,
        "text": "蓝量是否至少 20",
        "lines": [
          18,
          19,
          20,
          21
        ]
      }
    ]
  },
  {
    "title": "调用追踪：同一位置执行不同职业实现",
    "paragraphs": [
      "调用 performAttack(warrior, mage) 时，attacker 绑定 warrior 的基类接口，target 绑定 mage 的基类接口，没有复制两名角色。执行 attacker.attack(target) 时，静态接口确认 Character 有这个虚函数，动态分派找到 Warrior 的最终重写；进入 Warrior::attack 后，target 仍引用原来的 Merlin，所以 takeDamage 修改 Merlin 的生命。函数结束再回到 main 的下一条语句。",
      "交换实参调用 performAttack(mage, warrior)，函数体一字不变，attacker 的动态对象变成 Mage，因而先扣法师自己的蓝，再伤害 Arthur。多态的重点正是“同一调用位置因实际对象不同而执行不同实现”，而不是两个同名函数碰巧分别被直接调用。这个教学函数用于看清调用链；最终 battle 直接写 first.attack(second) 同样能产生多态，不需要为了多态必须多套一层函数。"
    ],
    "code": "void performAttack(Character& attacker, Character& target)\n{\n    attacker.attack(target);\n}\n\n// 单独测试这两次调用时，使用刚创建的角色：\n// performAttack(warrior, mage); // Warrior::attack → mage.takeDamage(35)\n// performAttack(mage, warrior); // Mage::attack → warrior.takeDamage(40)\n// 若随后还要验证完整战斗初值，请重新创建角色，避免先前伤害影响结果。",
    "language": "cpp",
    "points": [
      "引用形参是原对象的别名，不是新角色。",
      "单次调用测试与完整战斗测试应使用独立初始状态。"
    ],
    "id": "l14-dispatch",
    "exampleId": "l14-dispatch",
    "codeName": "片段 · 真正的多态调用：逐层跟踪 performAttack",
    "bindings": [
      {
        "paragraph": 0,
        "text": "执行 attacker.attack(target)",
        "lines": [
          3
        ]
      },
      {
        "paragraph": 1,
        "text": "交换实参调用 performAttack(mage, warrior)",
        "lines": [
          8
        ]
      }
    ]
  },
  {
    "title": "数值追踪：前两轮与原程序一致",
    "paragraphs": [
      "先不写循环，复用第 13 课两轮的验算。初始 Arthur 120、Merlin 80、蓝量 100。第一轮 Arthur 攻击，Merlin 80−35=45；Merlin 仍存活，施法令蓝量 100−20=80，Arthur 120−40=80。第二轮 Arthur 再攻击，Merlin 45−35=10；Merlin 施法，蓝量 80−20=60，Arthur 80−40=40。与你原来第 13 课输出一致。",
      "这里不是虚函数“自动计算出伤害”，仍然是每个职业函数体中的普通语句完成计算。virtual 解决选哪份函数体，if 与赋值解决该函数体的业务效果。把这两层拆开后，调试就有方向：若进错职业实现，查接口和重写；若进对函数却生命值不对，查初值、重复调用、扣血顺序和 takeDamage。"
    ],
    "table": {
      "headers": [
        "时刻",
        "Arthur HP",
        "Merlin HP",
        "Merlin mana",
        "实际进入的实现"
      ],
      "rows": [
        [
          "初始",
          "120",
          "80",
          "100",
          "尚未攻击"
        ],
        [
          "第 1 轮 Arthur 行动后",
          "120",
          "45",
          "100",
          "Warrior::attack"
        ],
        [
          "第 1 轮 Merlin 行动后",
          "80",
          "45",
          "80",
          "Mage::attack"
        ],
        [
          "第 2 轮 Arthur 行动后",
          "80",
          "10",
          "80",
          "Warrior::attack"
        ],
        [
          "第 2 轮 Merlin 行动后",
          "40",
          "10",
          "60",
          "Mage::attack"
        ]
      ]
    },
    "points": [
      "两轮结果复现历史练习：40 / 10 / 60。",
      "选中实现与实现内的运算是两个独立检查点。"
    ],
    "id": "l14-two-rounds",
    "exampleId": "l14-dispatch",
    "bindings": [
      {
        "paragraph": 1,
        "text": "virtual 解决选哪份函数体",
        "lines": [
          3
        ],
        "exampleId": "l14-dispatch"
      }
    ]
  },
  {
    "title": "战斗循环：第三轮终局、反击检查与回合上限",
    "paragraphs": [
      "第三轮 Arthur 再造成 35 点伤害，Merlin 的 10 生命降到 0，而不是显示 −25，因为 takeDamage 负责下限。接下来必须重新判断 second.isAlive()，不能只因为回合开始时两人都活着就无条件反击。Merlin 已死，不再扣蓝、不再造成伤害，所以最终 Arthur 40、Merlin 0、蓝量仍为 60。Arthur 获胜不是只比较谁剩血多，而是判断一方存活且另一方死亡。",
      "通用战斗还要考虑将来双方都不造成伤害、蓝量耗尽或其他无进展组合。只写 while (双方存活) 可能无限运行，因此增加最多 100 回合，并把双方都活着到达上限报告为平局。下面用 rounds < maxRounds 再在循环体 ++rounds，计数意图比把 rounds++ 藏在条件里更清楚；你当前文件的后置自增缩略写法对这个 Arthur/Merlin 样例结果相同。"
    ],
    "code": "void battle(Character& first, Character& second)\n{\n    const int maxRounds = 100;\n    int rounds = 0;\n    while (first.isAlive() && second.isAlive() && rounds < maxRounds)\n    {\n        ++rounds;\n        first.attack(second);\n        if (second.isAlive())\n        {\n            second.attack(first);\n        }\n    }\n    if (first.isAlive() && !second.isAlive())\n        std::cout << first.getName() << \" wins!\\n\";\n    else if (second.isAlive() && !first.isAlive())\n        std::cout << second.getName() << \" wins!\\n\";\n    else\n        std::cout << \"Draw\\n\";\n}",
    "language": "cpp",
    "points": [
      "第三次战士攻击后不执行第三次施法，因此 mana 是 60 而不是 40。",
      "调度器只调用共同接口，不判断 Warrior、Mage 类型。"
    ],
    "id": "l14-battle",
    "exampleId": "l14-battle",
    "codeName": "片段 · 第三轮结束：死者不反击，僵局也必须有出口",
    "bindings": [
      {
        "paragraph": 0,
        "text": "重新判断 second.isAlive()",
        "lines": [
          9
        ]
      },
      {
        "paragraph": 1,
        "text": "最多 100 回合",
        "lines": [
          3,
          5,
          7
        ]
      },
      {
        "paragraph": 0,
        "text": "一方存活且另一方死亡",
        "lines": [
          14,
          16
        ]
      }
    ]
  },
  {
    "title": "完整调用流程：创建、战斗与最终状态",
    "paragraphs": [
      "现在所有类与战斗函数都已逐项解释，main只需创建初值、调用battle、读取终态。下面仍采用长接口名printStatus；你工作文件中的print也可保留，只要调用与定义一致。整合时只放一份main，前面两个对照实验独立编译。",
      "先备份或提交你当前 lesson14.cpp，再在这份工作文件里逐步练习；网站不会替你覆盖已有代码。第一步对照 lesson13，保留共同状态与查询/受伤接口。第二步添加公开虚析构和纯虚 attack，只编译，观察未完成重写时为何 Warrior/Mage 仍可能抽象。第三步先改 Warrior 的声明与定义，再改 Mage，每完成一个小改动检查编译诊断，不要一口气粘贴最终答案。",
      "第四步用新建角色测试一次 performAttack，再重新创建初始角色执行 battle，避免测试先扣血改变终局。第五步加入先手击杀后不反击、100 回合上限及明确胜负/平局判断。第六步输出初始和最终状态，逐项核对 120/80/100 到 40/0/60。你当前 print() 与这里 printStatus() 的显示格式不同，可以保留原名称；若补回 getHealth，声明与定义一起补，并不要因此复制第二份 health。",
      "所有本课文件已在 exercises/lesson14 中，直接打开并编辑；完整仓库参考答案在 reference 子目录，也可在网页展开。编译时明确选择工作文件或 reference 中的一份，不把两个 main 同时链接。若想体验故意错误，把小对照例放入独立临时文件，正常练习里只保留正确声明。终端的真实编译与输出是最终验证，网页步骤和图解都只是教学辅助。"
    ],
    "code": "// main 的整合结构（假设采用前面讲解的长接口名）：\nint main()\n{\n    Warrior warrior(\"Arthur\");\n    Mage mage(\"Merlin\");\n    warrior.printStatus();\n    mage.printStatus();\n\n    battle(warrior, mage);\n\n    warrior.printStatus();\n    mage.printStatus();\n    std::cout << \"Mage mana: \" << mage.getMana() << '\\n';\n}\n// 在你的缩略文件中，printStatus 调用可对应已有 print。",
    "language": "cpp",
    "points": [
      "每个阶段都编译，诊断也是理解接口的证据。",
      "不要覆盖自己的练习；参考解答用于核对。",
      "验收包括死亡不行动、蓝量不足不扣蓝、零/负伤害不改变生命及回合上限。"
    ],
    "id": "l14-main",
    "exampleId": "l14-main",
    "codeName": "片段 · 把整合过程拆成可以自己完成的小步骤",
    "bindings": [
      {
        "paragraph": 0,
        "text": "创建初值",
        "lines": [
          4,
          5
        ]
      },
      {
        "paragraph": 0,
        "text": "调用battle",
        "lines": [
          9
        ]
      },
      {
        "paragraph": 0,
        "text": "读取终态",
        "lines": [
          11,
          12,
          13
        ]
      }
    ]
  },
  {
    "title": "实现原理与语言边界：虚表、切片与构造析构",
    "paragraphs": [
      "常见实现会用虚函数表记录实现入口，对象中可能保存相关虚指针，虚调用据此间接选择函数。这适合作为辅助图，但 C++ 标准保证的是可观察调用行为，不强制表的具体布局、指针个数或对象增加几个字节。优化器能确定目标时也可能去虚化。现在先掌握接口与动态分派，调试时不要依赖“第一个字段必定是虚指针”这样的实现猜测。",
      "多态需要保留实际派生对象。把派生对象按值复制成一个可实例化的基类对象会发生切片，只留下基类部分；本课 Character 抽象，直接按值实例化则编译就不允许。未来要存放不同职业，应选择合适的基类指针拥有者或借用，而不是 vector<Character>。固定接口的引用并未切片，按值创建基类对象才是另一回事。",
      "还有两个先知道边界即可的进阶规则：在某类构造/析构期间，对正在建立/销毁对象的虚调用不会进入更派生、尚未建立或已被拆除的部分；不要靠基类构造调用纯虚 attack 完成职业初始化。虚函数默认参数则由静态调用接口提供，不随动态重写一起切换；因此本课 attack 不设计不同职业的不同默认参数。这些边界会在面试区继续展开，不妨先完成正常战斗流程。"
    ],
    "points": [
      "虚表是常见实现模型，不能冒充标准布局保证。",
      "基类引用不切片；按值保存基类可能切片或因抽象性无法编译。",
      "构造析构期虚调用、默认实参有额外规则。"
    ],
    "id": "l14-implementation-boundaries",
    "exampleId": "l14-virtual-demo"
  },
  {
    "title": "自查与衔接：从多态调用走向生命周期",
    "paragraphs": [
      "现在用自己的话从头解释一次：战斗系统希望通过共同的 Character 接口调度任意职业；virtual 让共同攻击成为可动态分派的接口；派生类提供重写实现；override 检查实现确实满足重写关系；= 0 表达没有合理默认攻击，要求对象在成为具体可实例化类型之前补足实现；公开虚析构支持将来经基类接口正确销毁派生对象。每个语法点都有对应问题，而不是一串必须背下的装饰。",
      "最后回答两个预测：若删掉 override 但签名仍正确，动态分派通常仍成立，失去的是意图检查；若删掉基类 virtual，却保留派生 override，则编译器应拒绝未重写虚函数的声明。若把 Warrior attack 保留为末尾 const，而共同接口没有 const，同样不能正确重写。能解释这些“改一个词会怎样”，比只记住能运行的整段代码更能证明你理解了。",
      "完成本课不需要先背虚表内存布局，也不需要先使用 new。先在 VS Code 亲手完成两份对照程序、一次错误签名诊断和完整三轮战斗，再到面试区复习抽象类、切片和构造析构等边界。下一课继续解释对象寿命与清理责任，然后才使用智能指针管理不同职业；标准 C++ 的拥有关系与以后 UE 的对象回收规则也会分别讲解。"
    ],
    "points": [
      "继承：Warrior/Mage 可以作为 Character 使用。",
      "virtual + 正确重写：共同接口选择实际对象的实现；override：编译器核对重写意图。",
      "= 0：纯虚接口；= default：默认生成实现；最终结果：Arthur 40、Merlin 0、mana 60。"
    ],
    "id": "l14-memory",
    "exampleId": "l14-character",
    "bindings": [
      {
        "paragraph": 0,
        "text": "公开虚析构支持将来经基类接口正确销毁派生对象",
        "lines": [
          12
        ],
        "exampleId": "l14-character"
      }
    ]
  }
];
