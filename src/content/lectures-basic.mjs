// 先解释定义与语法，再给小例子；代码行由作者明确绑定。
export const basicLectures = {
  "1": [
    {
      "title": "回顾起点：程序处理输入、状态与输出",
      "paragraphs": [
        "这套课程从控制台程序逐步走向游戏引擎。程序是按规定顺序处理数据的一组指令，源代码是保存这些指令的文本；编译器把源文件转换并链接为可执行程序，运行时才执行输入、计算与输出。本课先用你写过的姓名、年龄、身高名片重新建立基础。",
        "学习顺序是先认识入口与语句，再认识变量，最后连接输入和输出。键盘提供数据，变量保存数据，终端显示结果。游戏角色创建面板也有相同的数据流程，将来只是由输入框、按钮和UI替代控制台。先能解释每一步，再扩展画面。"
      ],
      "id": "l1-overview",
      "exampleId": "l1-hello"
    },
    {
      "title": "逐项读懂最小程序，而不是背整段模板",
      "paragraphs": [
        "**入口函数main**是控制台程序开始执行的位置。int表示交给运行环境的整数状态，main是规定名字，()表示此处不接收参数，{}包住函数体。return 0结束这次main调用并表示成功；到达main结尾也有相同效果。简单语句通常以分号结束。",
        "#include <iostream>让源文件能使用标准输入输出声明，<string>提供文本类型。std::是命名空间限定，表示名字来自标准库；std::cout << \"Hello, C++!\\n\"把固定文本写到输出流，\\n表示换行。下一小节先运行这个最小程序，再把它放回编辑、编译和运行流程。"
      ],
      "id": "l1-entry-syntax",
      "exampleId": "l1-hello"
    },
    {
      "title": "变量：定义、类型与初始化",
      "paragraphs": [
        "变量是有名字的对象，类型规定了它能表达的值与允许的操作。姓名是文本，用 std::string；年龄通常是整数，用 int；以米表示的身高可能含小数，用 double。类型选择取决于数据含义，而不是看上去都是一串字符。",
        "你的原始练习中 age 和 height 在输入前没有显式初始化。成功输入会给它们赋值，但输入失败时不应继续把它们当作有效数据。新的示例先初始化，再检查输入是否成功。std::string 的默认构造会产生空字符串。"
      ],
      "code": "std::string name;\nint age = 0;\ndouble height = 0.0;\nbool isAlive = true;",
      "language": "cpp",
      "id": "l1-variables",
      "exampleId": "l1-variables",
      "codeName": "片段 · 变量为什么需要类型和初始值",
      "bindings": [
        {
          "paragraph": 0,
          "text": "姓名是文本，用 std::string",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "从源代码到执行：编辑器、编译器、终端各管什么",
      "paragraphs": [
        "右侧小程序运行时进入main，输出Hello, C++!并换行，然后return 0结束。这里没有用户输入，也没有其他自定义函数。VS Code负责编辑、启动任务、显示诊断；C/C++扩展提供补全与调试入口；g++或clang++实际完成编译。编辑器与编译器并不是同一工具。",
        "编译通常包含预处理、编译、链接等步骤。语法错误或找不到函数定义会阻止生成程序；只有运行程序，才会出现输入提示并等待键盘。程序运行后仍可能有逻辑错误，例如把年龄当成身高输出。"
      ],
      "code": "#include <iostream>\n#include <string>\nint main()\n{\n    std::cout << \"Hello, C++!\\n\";\n    return 0;\n}",
      "language": "cpp",
      "id": "l1-hello",
      "exampleId": "l1-hello",
      "codeName": "片段 · 从源代码到执行：编辑器、编译器、终端各管什么",
      "bindings": [
        {
          "paragraph": 0,
          "text": "输出Hello, C++!并换行",
          "lines": [
            5
          ]
        }
      ]
    },
    {
      "title": "cin 与 cout：方向表达数据流向",
      "paragraphs": [
        "std::cin >> name 把输入流中的文本读取到 name；std::cout << name 把 name 的值写到输出流。连续使用运算符会从左到右组合，例如 cin >> name >> age >> height 按同样顺序读取三个值。空格或换行通常都可作为这些格式化输入之间的分隔。",
        "std::string 配合 >> 一次只读到空白前的一个单词，所以 Arthur Pendragon 不能用这条语句完整读进 name，后续年龄输入也会因此错位。读取整行会在字符串课程讲 getline。输出中的 \"\\n\" 是换行转义序列，不会显示为反斜杠加字母 n。",
        "这段片段放在已声明name、age、height的main中，假定输入Arthur 18 1.75，最后显示同样的三个值。本课先处理有效输入，条件课再解释读取失败时怎样分流，避免尚未认识if就塞入复合检查。"
      ],
      "code": "std::cout << \"Enter name, age, height: \";\nstd::cin >> name >> age >> height;\nstd::cout << name << \" \" << age << \" \" << height << \"\\n\";",
      "language": "cpp",
      "id": "l1-streams",
      "exampleId": "l1-streams",
      "codeName": "片段 · cin 与 cout：方向表达数据流向",
      "bindings": [
        {
          "paragraph": 0,
          "text": "std::cin >> name",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "表达式计算值，赋值才会修改保存的值",
      "paragraphs": [
        "age + 2 的含义是取 age 当前的值参与加法，得到一个结果。它不会顺便把 age 增加 2。如果输入年龄 18，输出 age + 2 得到 20，此后再输出 age 仍然得到 18。",
        "age = age + 2 才会先计算右侧，再把结果存回左侧对象。等号在这里是赋值，不是数学证明里的恒等关系。以后攻击角色时 health - damage 与 health = health - damage 的差别也完全相同：前者只计算，后者改变角色状态。"
      ],
      "code": "int age = 18;\nstd::cout << age + 2 << \"\\n\"; // 20\nstd::cout << age << \"\\n\"; // 18\nage = age + 2;\nstd::cout << age << \"\\n\"; // 20",
      "language": "cpp",
      "id": "l1-assignment",
      "exampleId": "l1-assignment",
      "codeName": "片段 · 表达式计算值，赋值才会修改保存的值",
      "bindings": [
        {
          "paragraph": 0,
          "text": "得到一个结果",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "把你原来的名片练习逐句串起来",
      "paragraphs": [
        "运行先进入 main，准备三个变量，输出提示，然后在 cin 处等待输入。输入 Arthur 18 1.75 后，三个变量分别持有文本 Arthur、整数 18、小数 1.75；后面的三次 cout 读取这些值而不改变它们。终端显示的标签来自双引号中的固定文本。",
        "检查代码时，把固定文本和变量分开看：\"Name: \" 是每次相同的标签，name 是本次输入。把 name 写在双引号里会输出单词 name，而不是变量内容。字符串用双引号；单个字符可以用单引号，两者不是同一类型。"
      ],
      "code": "#include <iostream>\n#include <string>\nint main()\n{\n    std::string name;\n    int age = 0;\n    double height = 0.0;\n    std::cin >> name >> age >> height;\n    std::cout << \"Name: \" << name << \"\\n\";\n    std::cout << \"Age: \" << age << \"\\n\";\n    std::cout << \"Height: \" << height << \"\\n\";\n    return 0;\n}",
      "language": "cpp",
      "id": "l1-profile",
      "exampleId": "l1-profile",
      "codeName": "片段 · 把你原来的名片练习逐句串起来",
      "bindings": [
        {
          "paragraph": 1,
          "text": "\"Name: \" 是每次相同的标签",
          "lines": [
            9
          ]
        }
      ]
    },
    {
      "title": "如何看第一条报错，如何区分三类问题",
      "paragraphs": [
        "少写分号、把 std::string 拼错，通常在编译阶段报错。只声明一个普通函数却没有提供定义，可能在链接阶段提示 undefined reference。程序能运行却打印错误年龄，则是逻辑问题。先确定问题发生在哪一阶段，再选择检查方式。",
        "编译器经常在真正错误之后的位置才发现问题，所以从最靠前的诊断开始，并查看它前面一两行。修正首个原因后重新编译，后续诊断可能自然消失。不要看到多个错误就一次重写全部代码。"
      ],
      "id": "l1-diagnostics",
      "exampleId": "l1-profile"
    },
    {
      "title": "连接到游戏，并完成本课自查",
      "paragraphs": [
        "将 name、age、height 换成 characterName、level、health，就得到最小角色属性面板。底层数据不依赖控制台；将来角色类负责管理状态，UI 负责展示状态。现在先保持输入、存储、显示三件事清楚，后续才容易把它们拆开。",
        "在 exercises/lesson01 保留自己的名片代码。自行增加一行两年后的年龄，比较计算表达式与赋值，再故意输入非数字年龄观察失败路径。完整参考解答放在 reference 子目录。记忆重点：**编辑不等于编译，编译不等于运行；表达式不自动修改变量。**",
        "下一课用输入值计算结果，比较整数和浮点运算。"
      ],
      "id": "l1-practice",
      "exampleId": "l1-profile"
    }
  ],
  "2": [
    {
      "title": "回顾名片：类型会改变运算规则",
      "paragraphs": [
        "上一课用string保存姓名、int保存年龄、double保存身高。本课的运算符指定如何根据操作数计算结果；操作数类型会决定采用整数还是浮点等规则。除法运算符/求商，取余运算符%求整数除法剩余部分。",
        "沿用你的总秒数转换器，先学运算定义与语法，再按单位拆分小时、分钟和秒，最后检查边界。游戏冷却与比赛时钟也需要这种单位意识，不能把总分钟与时钟中的分钟部分混用。"
      ],
      "id": "l2-recap",
      "exampleId": "l2-remainder"
    },
    {
      "title": "整数除法：操作数类型决定计算规则",
      "paragraphs": [
        "当 / 两边都是整数时，C++ 执行整数除法，结果的小数部分向零截断。3661 / 3600 得到 1，因为这里只需要完整的小时数。5 / 2 得到 2，-5 / 2 得到 -2；不要泛化成总是向下取整。",
        "如果需要平均分或每秒移动距离，整数除法可能丢掉你需要的信息。必须在除法发生之前，使至少一个操作数成为浮点数。把已经得到的整数结果再转成 double，只会得到 2.0，无法还原 2.5。",
        "显式转换语法static_cast<double>(value)先用尖括号指定目标类型，再用括号指定被转换表达式；得到的double结果参与后续除法，不会永久改变原变量的类型。右侧第3行先转5再除，第4行先做5/2再转，结果分别2.5与2.0。"
      ],
      "code": "std::cout << 5 / 2 << \"\\n\";\nstd::cout << 5.0 / 2 << \"\\n\";\nstd::cout << static_cast<double>(5) / 2 << \"\\n\";\nstd::cout << static_cast<double>(5 / 2) << \"\\n\";",
      "language": "cpp",
      "id": "l2-integer-division",
      "exampleId": "l2-integer-division",
      "codeName": "片段 · 整数除法为什么会截掉小数",
      "bindings": [
        {
          "paragraph": 1,
          "text": "把已经得到的整数结果再转成 double",
          "lines": [
            4
          ]
        }
      ]
    },
    {
      "title": "取余怎样留下没凑满一个单位的部分",
      "paragraphs": [
        "对于本课的非负整数，a % b 表示 a 中去掉所有完整 b 后还剩多少。3661 % 3600 是 61，它不是还剩 61 小时，而是还剩 61 秒。/ 负责完整单位，% 负责同一原始单位中的剩余量。",
        "整数余数与除法满足 a == (a / b) * b + a % b，前提是该整数运算可表示且 b 不为 0。除数为 0 是错误，不会自动得到 0。浮点数不能直接使用整数 % 运算符。"
      ],
      "code": "int totalSeconds = 3661;\nint hours = totalSeconds / 3600; // 1\nint remainingSeconds = totalSeconds % 3600; // 61\nint minutes = remainingSeconds / 60; // 1\nint seconds = remainingSeconds % 60; // 1",
      "language": "cpp",
      "id": "l2-remainder",
      "exampleId": "l2-remainder",
      "codeName": "片段 · 取余怎样留下没凑满一个单位的部分",
      "bindings": [
        {
          "paragraph": 0,
          "text": "3661 % 3600 是 61",
          "lines": [
            3
          ]
        }
      ]
    },
    {
      "title": "沿用你的中间变量，逐步建立单位转换",
      "paragraphs": [
        "你的代码保留 remainingSeconds，非常适合追踪状态。第一步得到 1 小时和 61 秒，第二步才把这 61 秒拆成 1 分钟和 1 秒。直接写 totalSeconds / 60 会得到总分钟 61，而不是应显示的分钟部分 1。",
        "带单位的变量名很有价值。游戏里的 position、speed、time 都可能使用不同单位，如果把毫秒当成秒参与移动公式，即使语法正确，角色也可能移动快一千倍。类型检查不能替你验证全部业务单位。"
      ],
      "table": {
        "headers": [
          "阶段",
          "使用的量",
          "结果",
          "单位"
        ],
        "rows": [
          [
            "整小时",
            "3661 / 3600",
            "1",
            "小时"
          ],
          [
            "去掉整小时",
            "3661 % 3600",
            "61",
            "秒"
          ],
          [
            "剩余整分钟",
            "61 / 60",
            "1",
            "分钟"
          ],
          [
            "最终剩余",
            "61 % 60",
            "1",
            "秒"
          ]
        ]
      },
      "id": "l2-units",
      "exampleId": "l2-remainder"
    },
    {
      "title": "变量、常量与字面量分别是什么",
      "paragraphs": [
        "3600 是直接写下的整数字面量。给它起名 secondsPerHour，可以把为什么除以这个数写进代码。const 表示对象初始化之后不能再通过正常赋值改变，编译器会阻止 secondsPerHour = 60 这样的误写。",
        "const int hours = totalSeconds / secondsPerHour 不要求输入在编译时确定；它只是说这次算出的 hours 不再修改。不要把 const 一概理解成必须在编译时知道。更严格的编译期常量表达式涉及 constexpr，后续再分辨。"
      ],
      "code": "const int secondsPerMinute = 60;\nconst int secondsPerHour = 60 * secondsPerMinute;\nint totalSeconds = 3661;\nconst int hours = totalSeconds / secondsPerHour;\nconst int rest = totalSeconds % secondsPerHour;",
      "language": "cpp",
      "id": "l2-constants",
      "exampleId": "l2-constants",
      "codeName": "片段 · 变量、常量与字面量分别是什么",
      "bindings": [
        {
          "paragraph": 0,
          "text": "const 表示对象初始化之后不能再通过正常赋值改变",
          "lines": [
            1,
            2
          ]
        }
      ]
    },
    {
      "title": "赋值与复合赋值：冷却时间怎样变化",
      "paragraphs": [
        "totalSeconds = totalSeconds + 1 表示在旧值基础上得到新值并存回原变量；totalSeconds += 1 是常用简写。-=、*=、/= 也遵循类似思路。单独计算 totalSeconds - 1 不会让倒计时减少。",
        "++x 和 x++ 都把 x 增加 1，但表达式本身的值不同：前者产生更新后的值，后者产生更新前的值。初学时把它们单独写成语句最清楚，不要在复杂表达式中多次修改同一变量。"
      ],
      "code": "int cooldown = 5;\ncooldown -= 1; // 4\nint before = cooldown++; // before=4, cooldown=5\nint after = ++cooldown; // after=6, cooldown=6",
      "language": "cpp",
      "id": "l2-increments",
      "exampleId": "l2-increments",
      "codeName": "片段 · 赋值与复合赋值：冷却时间怎样变化",
      "bindings": [
        {
          "paragraph": 1,
          "text": "前者产生更新后的值，后者产生更新前的值",
          "lines": [
            3,
            4
          ]
        }
      ]
    },
    {
      "title": "运算优先级不能代替可读性",
      "paragraphs": [
        "乘、除、取余通常先于加减，因此 1 + 2 * 3 是 7。想表达先加再乘，就写 (1 + 2) * 3。连续同级运算也要逐项理解：total % 3600 / 60 等价于 (total % 3600) / 60。",
        "你的 remainingSeconds 中间量能让调试器直接显示去掉小时后剩余多少，这往往比记忆优先级更有帮助。游戏伤害公式也推荐为基础伤害、倍率、护甲减免各取名字。"
      ],
      "code": "int totalSeconds = 3661;\nint wrongMinutes = totalSeconds / 60; // 61：总分钟\nint correctMinutes = (totalSeconds % 3600) / 60; // 1\ndouble average = static_cast<double>(185) / 2; // 92.5",
      "language": "cpp",
      "id": "l2-precedence",
      "exampleId": "l2-precedence",
      "codeName": "片段 · 运算优先级不能代替可读性",
      "bindings": [
        {
          "paragraph": 0,
          "text": "(total % 3600) / 60",
          "lines": [
            3
          ]
        }
      ]
    },
    {
      "title": "数值范围与输入边界：语法正确还不够",
      "paragraphs": [
        "int 的范围有限，不能假定可以存下任意长的比赛时间。更大范围的整数类型同样有边界。对于有符号整数，运算超出可表示范围不是可靠的回绕机制，不能用来实现业务规则。",
        "本课先限制非负且在 int 可表示范围内的输入。负秒数含义尚未定义，直接拒绝更清楚。输入失败也要单独判断，避免继续使用无效数据。原始练习的有效输入路径可以保留，reference 展示如何补充防护。"
      ],
      "id": "l2-ranges",
      "exampleId": "l2-remainder"
    },
    {
      "title": "用边界验证转换器，再迁移到游戏时间",
      "paragraphs": [
        "至少手算 0、59、60、3599、3600、3661。检查三个不变量：分钟在 0–59，秒在 0–59，hours*3600 + minutes*60 + seconds 等于原输入。一次漂亮样例不能证明单位转换无误。",
        "在 exercises/lesson02 对照自己的 remainingSeconds 写法。可选挑战是比赛时钟补零，但先确认数值正确。记忆重点：**整数除法取完整份数，取余保留剩余；想保留小数，要在除法前转换。**",
        "下一课学习条件表达式，让程序按规则选择路径。"
      ],
      "id": "l2-practice",
      "exampleId": "l2-remainder"
    }
  ],
  "3": [
    {
      "title": "回顾运算：条件表达式与分支",
      "paragraphs": [
        "上一课的算术表达式产生数值；本课的条件表达式产生真假值，条件语句据此选择路径。if检查第一个条件，else if接后续条件，else处理其余情况。它们用于表达年龄区间、角色状态和技能施放前提。",
        "本课沿用原价50元的电影票规则：0–5岁免费，6–17岁半价，18–59岁原价，60岁及以上为原价三分之一；非免费票的会员再减5元。先学条件的组成，再计算样例，最后讨论优惠叠加和区间边界。"
      ],
      "id": "l3-recap",
      "exampleId": "l3-membership"
    },
    {
      "title": "if 的条件是一个真假问题",
      "paragraphs": [
        "if (age < 0) 先求括号中表达式的真假，为真才执行紧接着的大括号。比较运算符包括 <、<=、>、>=、==、!=；比较结果可以保存为 bool。bool 的 true 和 false 分别表达真与假。",
        "= 是赋值，== 才是相等判断。if (age = 18) 会先把 age 改成 18，再把非零整数转换成 true，因此逻辑完全不同；编译器警告能帮助发现这类问题。即使分支只有一行，保留大括号也方便后续修改。",
        "右侧先把age>=6且age<=17的比较结果保存到isTeen，再把这个bool放入if括号。这里新出现的&&表示两个条件都成立，下一节组合条件会继续拆解。age=17时成立，输出Half price；age=18时不执行这次输出。"
      ],
      "code": "int age = 17;\nbool isTeen = age >= 6 && age <= 17;\nif (isTeen)\n{\n    std::cout << \"Half price\\n\";\n}",
      "language": "cpp",
      "id": "l3-condition",
      "exampleId": "l3-condition",
      "codeName": "片段 · if 的条件是一个真假问题",
      "bindings": [
        {
          "paragraph": 0,
          "text": "比较结果可以保存为 bool",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "输入校验：先识别无效数据",
      "paragraphs": [
        "年龄小于 0 不属于任何正常票价区间。先处理它，可以让后续分支专注有效年龄。你的代码已经先写 age < 0，这是正确的组织顺序；不要把所有 age < 6 都归为免费，否则负年龄也会被放行。",
        "输入非数字与输入负数字不是同一问题。前者是输入流没能得到整数，后者是得到了整数但业务不接受。reference 补足输入失败路径，原来的有效输入规则保持不变。",
        "读取检查逐项理解：cin >> age >> isMember尝试输入，流可按成功状态转换成bool，!(...)取反。因此失败才进入if，return 1结束main；下面age<0则处理成功读到但业务无效的整数。"
      ],
      "code": "int age = 0;\nbool isMember = false;\nif (!(std::cin >> age >> isMember))\n{\n    std::cout << \"Invalid input\\n\";\n    return 1;\n}\nif (age < 0)\n{\n    std::cout << \"age is invalid\\n\";\n    return 0;\n}",
      "language": "cpp",
      "id": "l3-invalid-input",
      "exampleId": "l3-invalid-input",
      "codeName": "片段 · 为什么必须先处理无效输入",
      "bindings": [
        {
          "paragraph": 0,
          "text": "先处理它",
          "lines": [
            8,
            9,
            10,
            11
          ]
        }
      ]
    },
    {
      "title": "互斥选择：if、else if与else",
      "paragraphs": [
        "if / else if / else 是互斥选择链，从上到下找到第一个成立条件后执行对应分支，并跳过后面的分支。你可以按完整区间逐个写，也可以利用前面分支已经排除的事实简化后面条件。",
        "多个独立 if 会各自判断。例如先用 if (age <= 17) 给半价，再用 if (age >= 6) 恢复原价，17 岁可能两段都执行。判断应该只选一个价格还是多项独立效果可叠加，决定要用哪种结构。"
      ],
      "code": "double price = 50.0;\nif (age <= 5) price = 0.0;\nelse if (age <= 17) price /= 2.0;\nelse if (age <= 59) { /* 原价 */ }\nelse price /= 3.0;",
      "language": "cpp",
      "id": "l3-branch-chain",
      "exampleId": "l3-branch-chain",
      "codeName": "片段 · else if 链为什么只会选中一条路径",
      "bindings": [
        {
          "paragraph": 0,
          "text": "第一个成立条件",
          "lines": [
            2,
            3,
            4,
            5
          ]
        }
      ]
    },
    {
      "title": "&&、||、!：组合条件也有执行顺序",
      "paragraphs": [
        "&& 表示同时满足，|| 表示至少满足一个，! 表示取反。6 <= age <= 17 不是 C++ 的区间写法：它会先算 6 <= age 得到 bool，再拿 0 或 1 与 17 比较，几乎总是得到真。正确写法是 age >= 6 && age <= 17。",
        "&& 与 || 会短路。age >= 6 不成立时，&& 的右边无需再求值。后面学指针会利用 pointer != nullptr && pointer->isAlive()，先确认对象存在，再访问对象。这里先记住条件不一定两边都执行。"
      ],
      "code": "bool childOrSenior = age <= 5 || age >= 60;\nbool paidMember = isMember && age >= 6;\nbool cannotEnter = !(age >= 0);\n// 错误示意，勿作为区间判断：6 <= age <= 17",
      "language": "cpp",
      "id": "l3-logic",
      "exampleId": "l3-logic",
      "codeName": "片段 · &&、||、!：组合条件也有执行顺序",
      "bindings": [
        {
          "paragraph": 0,
          "text": "&& 表示同时满足",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "两层规则：年龄票价与会员优惠",
      "paragraphs": [
        "年龄决定基础票价，会员决定是否在非免费票上再减 5。这是两个维度。你的原代码在每个付费年龄分支里嵌套 if (isMember)，准确表达顺序：先半价或三分之一，再减 5。",
        "也可以先算年龄票价，再统一判断会员，但必须排除免费年龄。否则 0 元再减 5 会变成负价格。重构不是只减少重复行数，还必须保持原规则，尤其检查免费票、优惠叠加和最终价格。"
      ],
      "code": "double price = 50.0;\nif (age <= 5) price = 0.0;\nelse if (age <= 17) price /= 2.0;\nelse if (age >= 60) price /= 3.0;\nif (age >= 6 && isMember)\n{\n    price -= 5.0;\n}",
      "language": "cpp",
      "id": "l3-membership",
      "exampleId": "l3-membership",
      "codeName": "片段 · 会员折扣为什么是第二层判断",
      "bindings": [
        {
          "paragraph": 0,
          "text": "先半价或三分之一，再减 5",
          "lines": [
            3,
            4,
            5,
            7
          ]
        }
      ]
    },
    {
      "title": "逐步追踪 17 岁会员，而不是只看最终数字",
      "paragraphs": [
        "age=17、isMember=true：先排除负年龄和免费区间，进入 6–17 岁分支，50/2 得到 25；会员分支再执行 25-5，最终 20。输入 18 岁会员则不半价，得到 45。",
        "60 岁会员得到 50.0/3.0-5.0，约 11.6667；使用 double 会保留小数。如果 price 是 int，三分之一就会截断。真实售票系统还需规定货币舍入方式，本课先研究分支与浮点运算，不把默认小数显示当成财务规则。"
      ],
      "table": {
        "headers": [
          "年龄",
          "非会员",
          "会员",
          "覆盖的边界"
        ],
        "rows": [
          [
            "5",
            "免费",
            "免费",
            "免费上界"
          ],
          [
            "6",
            "25",
            "20",
            "半价下界"
          ],
          [
            "17",
            "25",
            "20",
            "半价上界"
          ],
          [
            "18",
            "50",
            "45",
            "原价下界"
          ],
          [
            "59",
            "50",
            "45",
            "原价上界"
          ],
          [
            "60",
            "约16.6667",
            "约11.6667",
            "老人票下界"
          ]
        ]
      },
      "id": "l3-trace",
      "exampleId": "l3-membership"
    },
    {
      "title": "把票价逻辑迁移成角色状态判断",
      "paragraphs": [
        "角色血量可以按 health <= 0、health < 30、其他三个分支显示死亡、危险和正常。先判断死亡，否则 health=-5 也满足 health<30，会被误判为低血量。",
        "关键仍是区间是否重叠、顺序是否合理，以及一轮是否允许多条规则同时执行。死亡状态与中毒效果可能是独立标记，就不一定放进同一条互斥链。条件结构要表达规则，而不是反过来迁就已经写下的 if。"
      ],
      "code": "int health = 0;\nif (health <= 0) std::cout << \"Defeated\\n\";\nelse if (health < 30) std::cout << \"Low health\\n\";\nelse std::cout << \"Healthy\\n\";",
      "language": "cpp",
      "id": "l3-health",
      "exampleId": "l3-health",
      "codeName": "片段 · 把票价逻辑迁移成角色状态判断",
      "bindings": [
        {
          "paragraph": 0,
          "text": "先判断死亡",
          "lines": [
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      "title": "练习验收：边界前后各试一次",
      "paragraphs": [
        "打开 exercises/lesson03，先不改代码，预测 -1、0、5、6、17、18、59、60 的输出，再分别测试会员与非会员。能解释为什么恰好 17 岁仍走半价，比记住 if 的拼写更重要。",
        "完成后再尝试把重复会员判断提取到分支之后，验证每个原样例保持一致。记忆重点：**条件表达真假，分支组织规则；互斥用链，叠加用独立判断，边界决定对错。**",
        "下一课将条件放入循环，观察重复如何推进和结束。"
      ],
      "id": "l3-practice",
      "exampleId": "l3-membership"
    }
  ],
  "4": [
    {
      "title": "从一次判断，到有规律地重复",
      "paragraphs": [
        "上一课一次选择一条分支。本课的循环是重复检查条件并执行循环体的控制结构；初始状态、继续条件和推进动作配合，才能让重复有明确出口。",
        "沿用你的while请求正整数、for计算1到n之和、另一个for打印偶数并计数。先解释各语法部分，再手算每轮状态，最后检查差一与死循环。游戏回合也使用相同结构，但还要确保业务状态会推进。"
      ],
      "id": "l4-recap",
      "exampleId": "l4-for"
    },
    {
      "title": "while循环：条件、循环体与推进",
      "paragraphs": [
        "while (n <= 0) 的意思是：只要当前 n 仍然无效，就再次提示输入。输入初次就是 3 时，循环体一次都不执行；输入 -2、0、3 时，循环体执行两次，第三个值使条件变为假。",
        "如果忘记再次读取 n，条件依赖的数据不变，就会无限打印。输入 abc 后流进入失败状态，后续 >> 也不能正常读数；reference 先检查流状态并退出，不能只依赖 n<=0。"
      ],
      "code": "int n = 0;\nif (!(std::cin >> n)) return 1;\nwhile (n <= 0)\n{\n    std::cout << \"Please enter a positive integer: \";\n    if (!(std::cin >> n)) return 1;\n}",
      "language": "cpp",
      "id": "l4-while",
      "exampleId": "l4-while",
      "codeName": "片段 · while 为什么先判断，再执行循环体",
      "bindings": [
        {
          "paragraph": 0,
          "text": "while (n <= 0)",
          "lines": [
            3,
            6
          ]
        }
      ]
    },
    {
      "title": "逐项拆开 for 的三个区域",
      "paragraphs": [
        "for (int i=1; i<=n; ++i) 中，初始化 int i=1 只执行一次；i<=n 在每次进入循环体前判断；++i 在每次循环体正常结束后执行。然后再次判断，而不是重新把 i 设为 1。",
        "你原作使用 i++ 也正确，因为这里不使用表达式产生的旧值。循环变量 i 在这个 for 的作用域内，后面的另一个 for 可以定义自己的 i。把推进动作放在第三部分，可以使轮次更容易看清。"
      ],
      "code": "int sum = 0;\nfor (int i = 1; i <= n; ++i)\n{\n    sum += i;\n}",
      "language": "cpp",
      "id": "l4-for",
      "exampleId": "l4-for",
      "codeName": "片段 · 逐项拆开 for 的三个区域",
      "bindings": [
        {
          "paragraph": 0,
          "text": "初始化 int i=1 只执行一次",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "累加状态：保存跨轮结果",
      "paragraphs": [
        "sum 要保存前几轮的成果，所以在循环之前设为 0。每轮 sum += i 使用上轮留下的 sum。如果在循环体开头写 int sum=0，就每轮创建并重置新 sum，无法积累。",
        "n=3：i=1 时 sum 从 0 到 1；i=2 时从 1 到 3；i=3 时从 3 到 6；随后 i=4，4<=3 为假，退出。最后判断虽发生四次，循环体只执行三次。"
      ],
      "table": {
        "headers": [
          "条件检查时i",
          "i<=3",
          "sum变化",
          "下一步"
        ],
        "rows": [
          [
            "1",
            "真",
            "0→1",
            "i增为2"
          ],
          [
            "2",
            "真",
            "1→3",
            "i增为3"
          ],
          [
            "3",
            "真",
            "3→6",
            "i增为4"
          ],
          [
            "4",
            "假",
            "仍为6",
            "退出"
          ]
        ]
      },
      "id": "l4-accumulator",
      "exampleId": "l4-for"
    },
    {
      "title": "取余怎样判断偶数，计数器怎样配合",
      "paragraphs": [
        "i % 2 == 0 表示 i 能被 2 整除。条件成立时，你的代码既输出 i，又把 count 增加 1。count 记录符合条件的元素个数，不是偶数本身的总和。",
        "n=5 时检查 1、2、3、4、5，但只有 2 和 4 进入 if，因此 count=2。把 count++ 放在 if 外会得到 5，这是重复结构正确、业务位置错误的典型例子。"
      ],
      "code": "int count = 0;\nfor (int i = 1; i <= n; ++i)\n{\n    if (i % 2 == 0)\n    {\n        std::cout << i << \" \";\n        ++count;\n    }\n}",
      "language": "cpp",
      "id": "l4-even-count",
      "exampleId": "l4-even-count",
      "codeName": "片段 · 取余怎样判断偶数，计数器怎样配合",
      "bindings": [
        {
          "paragraph": 0,
          "text": "count 记录符合条件的元素个数",
          "lines": [
            7
          ]
        }
      ]
    },
    {
      "title": "差一错误：<= 与 < 到底怎么选",
      "paragraphs": [
        "求 1 到 n 的和包括 n，所以 i 从 1 起并使用 i<=n。遍历含 count 个元素的容器，下标从 0 起，应使用 i<count，最后访问 count-1。两种写法都可能正确，要依据起点与终点。",
        "先问第一轮是多少、最后一轮应该是多少、一共多少轮，不要死记符号。n=1 是好样例：求和应执行一次，若写 i<n 则一次也不执行。"
      ],
      "code": "for (int value = 1; value <= 3; ++value)\n    std::cout << value << \" \"; // 1 2 3\nfor (int index = 0; index < 3; ++index)\n    std::cout << index << \" \"; // 0 1 2",
      "language": "cpp",
      "id": "l4-boundaries",
      "exampleId": "l4-boundaries",
      "codeName": "片段 · 差一错误：<= 与 < 到底怎么选",
      "bindings": [
        {
          "paragraph": 0,
          "text": "i<=n",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "break 和 continue 改变哪一段流程",
      "paragraphs": [
        "break 退出最近一层循环；continue 跳过本轮剩余语句。for 中 continue 后仍会执行第三部分再判断；while 中若把推进放在 continue 之后，它会被跳过，可能死循环。",
        "战斗中目标死亡后 break 可结束战斗；遍历物品时可 continue 跳过禁用物品。简单条件分支有时更容易读，不必为了使用新语法而使用。嵌套循环中的 break 不会自动退出外层。"
      ],
      "code": "for (int i = 1; i <= 5; ++i)\n{\n    if (i % 2 != 0) continue;\n    std::cout << i << \" \";\n    if (i == 4) break;\n}",
      "language": "cpp",
      "id": "l4-loop-control",
      "exampleId": "l4-loop-control",
      "codeName": "片段 · break 和 continue 改变哪一段流程",
      "bindings": [
        {
          "paragraph": 0,
          "text": "continue 跳过本轮剩余语句",
          "lines": [
            3
          ]
        }
      ]
    },
    {
      "title": "战斗循环还要考虑双方都打不动",
      "paragraphs": [
        "while (firstAlive && secondAlive) 只保证双方存活时继续，不保证生命值一定下降。如果双方伤害都是 0，条件永远不变。以后做战斗时，需要回合上限或无法推进判定保证结束。",
        "求和也要限制输入范围。int sum 存不下任意大的数学结果，循环过多也会耗时。reference 对输入提供约束；原作保留以记录当时实现，这些限制应作为后续改进理解。"
      ],
      "id": "l4-termination",
      "exampleId": "l4-for"
    },
    {
      "title": "练习：先手算，再单步观察状态",
      "paragraphs": [
        "在 exercises/lesson04 用调试器观察 n=5 的 i、sum、count。预期和 15，偶数 2 4，数量 2。再输入 1，应和为 1 且没有偶数；测试 0 后输入 3，观察 while 的重试。",
        "先确认三种状态在哪里初始化、在哪里修改，再增加需求。记忆重点：**循环不仅要能重复，还要会推进、能退出；累加器放在多轮共享的作用域里。**",
        "下一课把输入、求和、打印与计数命名为函数。"
      ],
      "id": "l4-practice",
      "exampleId": "l4-even-count"
    }
  ],
  "5": [
    {
      "title": "回顾循环：函数的定义与用途",
      "paragraphs": [
        "上一课把输入、求和与打印组织成循环。本课的函数是有名字和接口的一段可调用代码：形参接收输入，函数体完成任务，返回值把需要的数据交还调用者。它既能复用动作，也能划清职责。",
        "你已写过readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers。本课先认识参数和返回类型，再区分声明、定义、调用，最后按main的路线追踪执行。后面容器统计也沿用这种接口组织。"
      ],
      "id": "l5-recap",
      "exampleId": "l5-declaration-call"
    },
    {
      "title": "逐项拆解函数签名和参数",
      "paragraphs": [
        "int calculateSum(int n) 中第一个 int 是返回类型，calculateSum 是函数名，括号内 int n 是形参声明。调用 calculateSum(number) 时，number 是实参；它当前的值用于初始化本次调用自己的 n。",
        "按值参数 n 是独立局部对象，不是调用者变量的新名字。实参叫 number、形参叫 n 完全可以；匹配依靠位置与类型，不依靠名字相同。多个函数都可以有 n，因为它们属于不同局部作用域。",
        "先记函数组成：返回类型、函数名、圆括号参数列表、大括号函数体。下面addOne接收int value并返回int，return value结束本次调用。这个小片段看懂以后，再用前置声明把完整main与函数定义连接起来。"
      ],
      "code": "int addOne(int value)\n{\n    value += 1;\n    return value;\n}\n// main内：\n// int number = 3;\n// int result = addOne(number); // number仍为3，result为4",
      "language": "cpp",
      "id": "l5-parameters",
      "exampleId": "l5-parameters",
      "codeName": "片段 · 逐项拆解函数签名和参数",
      "bindings": [
        {
          "paragraph": 0,
          "text": "第一个 int 是返回类型",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "声明、定义、调用：三种位置的职责",
      "paragraphs": [
        "int calculateSum(int n); 是函数声明：告诉编译器名字、参数与返回类型，没有函数体，不产生调用。程序仍从 main 开始执行。源文件书写顺序不等于运行顺序，这正是你之前特别问过的疑点。",
        "int calculateSum(int n) { ... } 是定义，提供调用时执行的函数体；calculateSum(3) 才是调用。提前声明后，main 可调用在文本后面定义的函数。把完整定义放在 main 前也可以，只是组织方式不同。"
      ],
      "code": "int calculateSum(int n); // 声明，不执行\nint main()\n{\n    int sum = calculateSum(3); // 此处才调用\n    std::cout << sum << \"\\n\";\n}\nint calculateSum(int n) // 定义\n{\n    int sum = 0;\n    for (int i = 1; i <= n; ++i) sum += i;\n    return sum;\n}",
      "language": "cpp",
      "id": "l5-declaration-call",
      "exampleId": "l5-declaration-call",
      "codeName": "片段 · 声明写在 main 前，为什么却不先运行",
      "bindings": [
        {
          "paragraph": 0,
          "text": "int calculateSum(int n);",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "return 不是打印，而是把值交回调用位置",
      "paragraphs": [
        "calculateSum(3) 内部得到 6，return sum 结束本次调用，并使调用表达式的值为 6。于是 int sum=calculateSum(3) 用它初始化 main 自己的 sum。函数内外同名的两个 sum 不是同一对象。",
        "cout 负责显示，return 负责把数据交给调用者。计算函数可以完全不输出，调用者自行决定显示、保存还是继续计算。游戏伤害计算与 UI 显示也需要区分数据结果与展示副作用。"
      ],
      "code": "int calculateSum(int n)\n{\n    int sum = 0;\n    for (int i = 1; i <= n; ++i) sum += i;\n    return sum;\n}\n// int answer = calculateSum(3);\n// std::cout << answer << \"\\n\";",
      "language": "cpp",
      "id": "l5-return",
      "exampleId": "l5-return",
      "codeName": "片段 · return 不是打印，而是把值交回调用位置",
      "bindings": [
        {
          "paragraph": 0,
          "text": "return sum",
          "lines": [
            5
          ]
        }
      ]
    },
    {
      "title": "void返回类型：执行动作而不交回数值",
      "paragraphs": [
        "printEvenNumbers 的职责是产生输出，没有数值需要交回，返回类型写 void；countEvenNumbers 返回个数，适合写 int。函数做了事不代表必须返回数据，输出内容也不等于返回值。",
        "void 函数可用 return; 提前结束，但不能 return 一个整数。返回 int 的普通函数在需要交回结果的正常路径上应返回值；main 结尾的特殊规则不能套给全部函数。print、calculate、read 这样的名字还能提示各自职责。"
      ],
      "code": "void printEvenNumbers(int n)\n{\n    if (n <= 0) return;\n    for (int i = 1; i <= n; ++i)\n    {\n        if (i % 2 == 0) std::cout << i << \" \";\n    }\n    std::cout << \"\\n\";\n}",
      "language": "cpp",
      "id": "l5-void",
      "exampleId": "l5-void",
      "codeName": "片段 · void 为什么适合打印函数",
      "bindings": [
        {
          "paragraph": 0,
          "text": "返回类型写 void",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "完整追踪 main 与调用栈",
      "paragraphs": [
        "执行 int n=readPositiveNumber() 时，main 在初始化表达式处等待；程序进入读取函数，得到有效正数并 return，才继续 calculateSum(n)。返回后又调用 countEvenNumbers，最后依次输出。",
        "调用栈可以理解成当前函数及其返回位置的记录。进入函数不代表 main 从头重来，return 也不代表整个程序结束。调试时 Step Into 进入函数，Step Over 执行调用并停在调用者下一步，能直观看见区别。"
      ],
      "table": {
        "headers": [
          "main位置",
          "正在执行",
          "返回结果"
        ],
        "rows": [
          [
            "readPositiveNumber()",
            "输入校验",
            "n=5"
          ],
          [
            "calculateSum(n)",
            "累加1…5",
            "sum=15"
          ],
          [
            "countEvenNumbers(n)",
            "检查每个数",
            "evenCount=2"
          ],
          [
            "printEvenNumbers(n)",
            "输出2 4",
            "无数值，继续main"
          ]
        ]
      },
      "id": "l5-call-stack",
      "exampleId": "l5-declaration-call"
    },
    {
      "title": "作用域和生命周期不是变量名还记得就能用",
      "paragraphs": [
        "局部变量只在所属作用域内可见，离开作用域后通常也结束生命周期。函数调用结束后，其普通局部 sum 不存在，但返回的整数值已交给调用者，main 的 sum 可以继续保存它。",
        "不能返回局部变量的引用或地址来省去整数复制：调用结束后引用或指针指向已失效对象。下一课容器、后面的引用与指针会深入讨论。本课用普通值返回计算结果，足够清楚且安全。"
      ],
      "code": "int countEvenNumbers(int n)\n{\n    int count = 0;\n    for (int i = 1; i <= n; ++i)\n        if (i % 2 == 0) ++count;\n    return count;\n}",
      "language": "cpp",
      "id": "l5-scope",
      "exampleId": "l5-scope",
      "codeName": "片段 · 作用域和生命周期不是变量名还记得就能用",
      "bindings": [
        {
          "paragraph": 0,
          "text": "返回的整数值已交给调用者",
          "lines": [
            6
          ]
        }
      ]
    },
    {
      "title": "声明、定义、调用三处怎样一起核对",
      "paragraphs": [
        "声明 int calculateSum(int)，定义却写 void calculateSum(int)，会形成不兼容声明。声明存在而定义拼成另一个名字，最后可能在链接时找不到原函数定义。",
        "调用必须提供兼容的参数数量与类型。先列接口，再写最小实现，最后接入 main，比一次粘贴全部代码更易定位。下一课会在 const 引用是否一致上再次遇到这个原则。"
      ],
      "id": "l5-signatures",
      "exampleId": "l5-declaration-call"
    },
    {
      "title": "练习：把已有函数当作可验证的小工具",
      "paragraphs": [
        "在 exercises/lesson05 保留四函数结构。calculateSum 测试 1→1、3→6、5→15；countEvenNumbers 测试 1→0、2→1、5→2。再解释 printEvenNumbers 为什么可以没有数值返回。",
        "游戏中可先写 calculateDamage 返回数值，再由调用者更新 health。记忆重点：**声明描述接口，定义提供实现，调用触发执行；返回值回到调用位置，打印只是输出副作用。**",
        "下一课保存整组成绩，并把容器交给统计函数。"
      ],
      "id": "l5-practice",
      "exampleId": "l5-declaration-call"
    }
  ],
  "6": [
    {
      "title": "回顾函数：容器保存一组数据",
      "paragraphs": [
        "上一课用函数拆开读取、计算与输出。本课的容器是管理多个元素的对象；std::vector<int>表示元素为int、大小可在运行时改变的连续序列。它适合人数事先未知且需要保存全部成绩的情况。",
        "先认识数组、string和vector，再学创建、追加、下标与遍历。沿用你的成绩程序计算总分、平均、最高和最低，最后检查空集合、越界与签名一致性。游戏队伍与背包也需要类似的数据组织。"
      ],
      "id": "l6-recap",
      "exampleId": "l6-sequences"
    },
    {
      "title": "数组、string、vector 都是序列，用途却不同",
      "paragraphs": [
        "int scores[3] 包含 3 个 int 的固定数组，数量是类型的一部分，不能 push_back。std::vector<int> 是标准库动态序列，元素类型在尖括号内，运行时可追加元素。std::string 专门管理文本，不等于任意类型的 vector。",
        "使用 vector 需包含 <vector>，string 需 <string>，不应依赖其他头文件碰巧间接包含它们。两者都可用 size 与下标，但多字节编码中的人类字符数不一定等于 string::size()。"
      ],
      "code": "#include <string>\n#include <vector>\nint fixedScores[3] = {80, 90, 100};\nstd::vector<int> scores;\nstd::string playerName = \"Arthur\";",
      "language": "cpp",
      "id": "l6-sequences",
      "exampleId": "l6-sequences",
      "codeName": "片段 · 数组、string、vector 都是序列，用途却不同",
      "bindings": [
        {
          "paragraph": 0,
          "text": "int scores[3]",
          "lines": [
            3
          ]
        }
      ]
    },
    {
      "title": "追加元素：push_back与size",
      "paragraphs": [
        "scores 初始为空，size()==0。push_back(score) 在末尾构造新元素，使 size 增加 1。你的循环先确认分数在 0–100 再追加，因此容器里只保存接受的有效值。",
        "局部 score 每轮读取输入，push_back 保存一个独立 int 值。下一轮改变 score，不会改变上一轮已经放进容器的元素。这里复制的是数值，不是把所有元素都连接到同一个局部变量。"
      ],
      "code": "std::vector<int> scores;\nscores.push_back(80); // size=1\nscores.push_back(90); // size=2\nscores.push_back(100); // [80,90,100]，size=3",
      "language": "cpp",
      "id": "l6-append",
      "exampleId": "l6-append",
      "codeName": "片段 · push_back 为什么放在输入校验之后",
      "bindings": [
        {
          "paragraph": 0,
          "text": "push_back(score)",
          "lines": [
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      "title": "下标从 0 开始，size 不是最后一个下标",
      "paragraphs": [
        "3 个元素下标为 0、1、2，最后下标是 size()-1；scores[3] 越界。operator[] 通常不检查边界，越界不是自动返回 0，而是未定义行为，可能崩溃也可能看似运行。",
        "scores.at(index) 会检查范围，越界时抛出异常，但仍应设计正确索引。本课先在 scores[0] 前确保非空，不把异常机制当正常统计流程。无需下标时范围 for 更直接。"
      ],
      "code": "std::vector<int> scores{80, 90, 100};\nstd::cout << scores[0] << \"\\n\";\nfor (int score : scores)\n{\n    std::cout << score << \" \";\n}\n// scores[3]越界，不要执行。",
      "language": "cpp",
      "id": "l6-index-range",
      "exampleId": "l6-index-range",
      "codeName": "片段 · 下标从 0 开始，size 不是最后一个下标",
      "bindings": [
        {
          "paragraph": 0,
          "text": "scores[3] 越界",
          "lines": [
            7
          ]
        }
      ]
    },
    {
      "title": "总分与平均：先得到数值，再选择除法规则",
      "paragraphs": [
        "calculateTotalScore 从 0 累加每个元素。平均分的分子是总分，分母是元素数量。你已使用 static_cast<double>(sum) / scores.size()，让除法在浮点规则下发生，不会先截断。",
        "空集合平均值没有普通数值含义，不能除以 0。原练习通过 readStudentCount 保证正人数；但统计函数若被独立复用，还应明确空集合约定。不能把某个 main 的输入约束误当成函数自身永远成立的事实。"
      ],
      "code": "int total = 0;\nfor (int score : scores) total += score;\nif (!scores.empty())\n{\n    double average = static_cast<double>(total) / scores.size();\n    std::cout << average << \"\\n\";\n}",
      "language": "cpp",
      "id": "l6-average",
      "exampleId": "l6-average",
      "codeName": "片段 · 总分与平均：先得到数值，再选择除法规则",
      "bindings": [
        {
          "paragraph": 0,
          "text": "除法在浮点规则下发生",
          "lines": [
            5
          ]
        }
      ]
    },
    {
      "title": "极值扫描：从真实元素建立初值",
      "paragraphs": [
        "你的最高最低函数先取 scores[0]，再逐个比较，让目前已知的最佳值从真实元素开始。扫描 80、90、100 时最高变为 80、90、100，最低一直为 80。",
        "最高固定设 0 在非负分数中可能碰巧有效，对全负数却不对；最低固定设 0 对正分数也会错。使用真实首元素减少对取值范围的依赖，前提仍是容器非空。"
      ],
      "code": "int highest = scores[0]; // 前置条件：非空\nint lowest = scores[0];\nfor (int score : scores)\n{\n    if (score > highest) highest = score;\n    if (score < lowest) lowest = score;\n}",
      "language": "cpp",
      "id": "l6-extrema",
      "exampleId": "l6-extrema",
      "codeName": "片段 · 最高最低为什么从第一个有效元素出发",
      "bindings": [
        {
          "paragraph": 0,
          "text": "先取 scores[0]",
          "lines": [
            1,
            2
          ]
        }
      ]
    },
    {
      "title": "历史代码的真实问题：声明与定义不一致",
      "paragraphs": [
        "原文件顶部声明 printStudentScores(const std::vector<int>&)，底部定义却是 printStudentScores(std::vector<int>&)；calculateTotalScore、findHighestScore、findLowestScore 也有类似差别。main 调用时只看到了顶部声明，因此链接时会寻找那个 const 引用版本。",
        "这不是编译器不理解你的意思，而是两个接口。保留原文件，在 reference 统一只读 const 引用。下一课将详细讲 & 和 const；这里先掌握改签名时声明与定义必须同步。形参名字可以不同，参数类型不能随意不同。",
        "接口里的&表示引用原容器，前面的const表示通过它只读，而不是复制；本节先要求声明与定义完全一致。下一课专门比较副本、可写引用与只读引用，避免只把这一修正当成照抄编译器建议。"
      ],
      "code": "int calculateTotalScore(const std::vector<int>& scores);\nint calculateTotalScore(const std::vector<int>& scores)\n{\n    int total = 0;\n    for (int score : scores) total += score;\n    return total;\n}",
      "language": "cpp",
      "id": "l6-signature-fix",
      "exampleId": "l6-signature-fix",
      "codeName": "片段 · 历史代码的真实问题：声明与定义不一致",
      "bindings": [
        {
          "paragraph": 1,
          "text": "两个接口",
          "lines": [
            1,
            2
          ]
        }
      ]
    },
    {
      "title": "size 与 capacity：有容量不代表有元素",
      "paragraphs": [
        "size 是已存在元素数；capacity 是当前存储能容纳多少元素而不重新分配。reserve(10) 只预留容量，空容器仍没有第一个元素，不能 scores[0]；resize(10) 才改变大小并构造新增元素。",
        "push_back 超过容量时可能重新分配，旧元素迁移后，保存的指针、引用、迭代器可能失效。容量具体按几倍增长是实现策略，不是可写死的保证。后面结合指针与生命周期再深入。"
      ],
      "code": "std::vector<int> values;\nvalues.reserve(10); // size仍为0\nvalues.push_back(80); // size为1\nvalues.resize(3); // int新增元素初始化为0\n// 元素为[80,0,0]，capacity可能大于3",
      "language": "cpp",
      "id": "l6-capacity",
      "exampleId": "l6-capacity",
      "codeName": "片段 · size 与 capacity：有容量不代表有元素",
      "bindings": [
        {
          "paragraph": 0,
          "text": "reserve(10) 只预留容量",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "字符串：一个单词和一整行不同",
      "paragraphs": [
        "cin >> name 遇空白停止；getline(cin,name) 读取整行并移除行结束分隔符。前面若用 >> 读数字，可能留下换行，直接 getline 就会读到空行。发生原因是输入流位置，不是字符串突然失效。",
        "getline(cin >> std::ws,name) 可先跳过前导空白，但也会跳过有意义的前导空格。若要精确保留空白，需按输入协议处理剩余换行。先理解原因，不要无解释地多写一次 getline。"
      ],
      "code": "std::string name;\nstd::getline(std::cin >> std::ws, name);\nstd::cout << \"Name: \" << name << \"\\n\";",
      "language": "cpp",
      "id": "l6-getline",
      "exampleId": "l6-getline",
      "codeName": "片段 · 字符串：一个单词和一整行不同",
      "bindings": [
        {
          "paragraph": 1,
          "text": "getline(cin >> std::ws,name)",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "练习：核对真实文件，验证统计边界",
      "paragraphs": [
        "在 exercises/lesson06 使用 3 个分数 80、90、100，预期总分 270、平均 90、最高 100、最低 80；单个分数 67 则四种统计应一致。用 0 人、-1 分、101 分观察输入校验。",
        "先阅读 reference 的签名修正，再自己修改练习，不覆盖历史记录。记忆重点：**vector 管理一组连续元素；访问前保证元素存在；统计函数的前置条件和声明一致性同样重要。**",
        "下一课完整讲清修改原成绩与读取副本的区别，学习引用和const。"
      ],
      "id": "l6-practice",
      "exampleId": "l6-average"
    }
  ],
  "7": [
    {
      "title": "回顾容器：副本、引用和只读访问",
      "paragraphs": [
        "上一课把成绩保存在vector，再交给函数读取。本课比较三种访问关系：按值产生独立副本，引用绑定已有对象，const引用只读访问已有对象。先明确函数是否应修改调用者，再选择参数类型。",
        "继续使用65、78、92、100四个成绩。addBonus要改原容器，printScores和calculateAverage只观察。先定义语法，再分清容器形参与循环元素，最后验证加10分后75、88、100、100与平均90.75。"
      ],
      "id": "l7-recap",
      "exampleId": "l7-mutable-container"
    },
    {
      "title": "按值传递得到独立形参对象",
      "paragraphs": [
        "void change(int value) 中 value 用实参当前值初始化，是本次调用自己的对象。value=0 不会改调用者的 health。对 int 这样的小值，复制通常简单高效，按值传递不是坏做法。",
        "vector 按值传递会创建独立容器，通常复制元素。只打印或统计时复制没有必要；若确实需要独立修改副本，按值可能正合适。应依据语义选择，而不是无条件避免所有复制。"
      ],
      "code": "void changeCopy(int value)\n{\n    value = 0;\n}\n// main内：\n// int health = 100;\n// changeCopy(health);\n// health仍为100",
      "language": "cpp",
      "id": "l7-by-value",
      "exampleId": "l7-by-value",
      "codeName": "片段 · 按值传递得到独立形参对象",
      "bindings": [
        {
          "paragraph": 0,
          "text": "value=0",
          "lines": [
            3
          ]
        }
      ]
    },
    {
      "title": "引用是对象的别名，& 在声明中表示绑定",
      "paragraphs": [
        "int& alias=health 定义引用并绑定已有的 health。通过 alias 读写，就是对同一 int 读写。这里 & 是类型声明的一部分，与下一课表达式 &health 取地址不同，要看出现的位置。",
        "引用必须初始化，普通引用没有未绑定后等待重新绑定的状态。alias=other 把 other 的值赋给 health，不会让 alias 转而引用 other。引用也不自动保证目标始终活着。"
      ],
      "code": "int health = 100;\nint& alias = health;\nalias -= 30; // health变为70\nint other = 20;\nalias = other; // health变为20，引用关系未改",
      "language": "cpp",
      "id": "l7-reference",
      "exampleId": "l7-reference",
      "codeName": "片段 · 引用是对象的别名，& 在声明中表示绑定",
      "bindings": [
        {
          "paragraph": 0,
          "text": "int& alias=health",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "修改整个容器，需要形参也使用引用",
      "paragraphs": [
        "void addBonus(std::vector<int>& scores,int bonus) 使 scores 绑定调用者容器。bonus 仍按值，因为函数只需要增量，不需要修改调用者存放的 bonus。",
        "const 与 & 都是接口的一部分。vector<int>& 表示可能修改原容器；vector<int> 表示独立副本；const vector<int>& 表示通过该接口只读。函数实现必须兑现接口含义。",
        "下面的for(int& score:scores)让当前循环变量引用原元素，外层&绑定原容器，内层&绑定元素；已学int&别名规则在这里重复应用。下一节用两段对照分开验证这两层关系。"
      ],
      "code": "void addBonus(std::vector<int>& scores, int bonus)\n{\n    for (int& score : scores)\n    {\n        score += bonus;\n        if (score > 100) score = 100;\n    }\n}",
      "language": "cpp",
      "id": "l7-mutable-container",
      "exampleId": "l7-mutable-container",
      "codeName": "片段 · 修改整个容器，需要形参也使用引用",
      "bindings": [
        {
          "paragraph": 0,
          "text": "void addBonus(std::vector<int>& scores,int bonus)",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "元素引用：把循环内修改写回原容器",
      "paragraphs": [
        "参数的 & 保证操作原容器，但 for (int score:scores) 仍会把每个元素复制到局部 score。修改局部值不写回原容器，因此你的原作正确使用 for (int& score:scores)。",
        "两层引用解决两层问题：外层避免复制容器，内层让赋值落在元素本身。只读 int 可按值；较大元素常用 const auto&，auto 是根据元素推导静态类型，不是动态类型。"
      ],
      "code": "// 修改副本，原scores不变：\nfor (int score : scores) score += 10;\n// 修改原元素：\nfor (int& score : scores) score += 10;\n// 只读访问：\nfor (const int& score : scores) std::cout << score << \" \";",
      "language": "cpp",
      "id": "l7-element-reference",
      "exampleId": "l7-element-reference",
      "codeName": "片段 · 为什么范围 for 内还要再写一个 &",
      "bindings": [
        {
          "paragraph": 0,
          "text": "for (int& score:scores)",
          "lines": [
            4
          ]
        }
      ]
    },
    {
      "title": "const 引用承诺什么，没有承诺什么",
      "paragraphs": [
        "const std::vector<int>& 避免复制，并禁止通过此参数修改元素或调用修改容器的成员函数。printScores 与 calculateAverage 不应改变分数，你用这种接口非常合理。",
        "const 不保证对象在整个程序中从未被其他非 const 访问路径修改，也不是线程同步工具。它约束通过当前路径允许做什么。对象销毁后引用仍会悬空，const 不能修复生命周期。"
      ],
      "code": "void printScores(const std::vector<int>& scores)\n{\n    for (int score : scores) std::cout << score << \" \";\n    std::cout << \"\\n\";\n    // scores.push_back(90); // 编译错误\n}",
      "language": "cpp",
      "id": "l7-const-reference",
      "exampleId": "l7-const-reference",
      "codeName": "片段 · const 引用承诺什么，没有承诺什么",
      "bindings": [
        {
          "paragraph": 0,
          "text": "const std::vector<int>&",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "追踪你的分数与平均值",
      "paragraphs": [
        "初始 [65,78,92,100]，bonus=10。第 1 次 score 绑定 65，改为 75；第 2 次 78→88；第 3 次 92→102 后封顶 100；第 4 次 100→110 后封顶 100。",
        "函数返回时形参结束，main 的容器仍存在且已改变。calculateAverage 只读新数据，(75+88+100+100)/4=90.75。若结果不同，检查外层形参与内层循环变量是否都用正确引用。"
      ],
      "table": {
        "headers": [
          "元素",
          "加分前",
          "加10后",
          "封顶后"
        ],
        "rows": [
          [
            "0",
            "65",
            "75",
            "75"
          ],
          [
            "1",
            "78",
            "88",
            "88"
          ],
          [
            "2",
            "92",
            "102",
            "100"
          ],
          [
            "3",
            "100",
            "110",
            "100"
          ]
        ]
      },
      "id": "l7-trace",
      "exampleId": "l7-mutable-container"
    },
    {
      "title": "第六课错误的真正含义：参数类型不同就是不同接口",
      "paragraphs": [
        "第六课 const vector<int>& 声明与 vector<int>& 定义不是同一函数。这一课你已把 printScores 和 calculateAverage 统一为 const 引用，把 addBonus 统一为可修改引用，这是正确修复方向。",
        "形参名字可以不同，但类型必须对应。修改函数按声明、定义、调用三处核对，尤其别漏 const、& 或参数顺序。错误地定义另一个重载，不能满足原声明需要。"
      ],
      "code": "double calculateAverage(const std::vector<int>& scores);\ndouble calculateAverage(const std::vector<int>& scores)\n{\n    if (scores.empty()) return 0.0; // 本例约定\n    int sum = 0;\n    for (int score : scores) sum += score;\n    return static_cast<double>(sum) / scores.size();\n}",
      "language": "cpp",
      "id": "l7-signature",
      "exampleId": "l7-signature",
      "codeName": "片段 · 第六课错误的真正含义：参数类型不同就是不同接口",
      "bindings": [
        {
          "paragraph": 0,
          "text": "统一为 const 引用",
          "lines": [
            1,
            2
          ]
        }
      ]
    },
    {
      "title": "引用不会替你决定负加分与空集合规则",
      "paragraphs": [
        "原作只限制最高 100，负 bonus 会降低分数甚至降到 0 以下。这是业务规则未限定，不是引用错误。reference 保持原先加分行为，仅补空集合平均值保护；若要拒绝负数，应自己明确规则并添加检查。",
        "空容器不进入范围 for，所以加分与打印自然可处理；平均却不能除以 0。不要把一个正常样例能运行，误当成工具函数已经处理所有边界。"
      ],
      "id": "l7-boundaries",
      "exampleId": "l7-signature"
    },
    {
      "title": "练习：用两个版本证明对象关系",
      "paragraphs": [
        "在 exercises/lesson07 保留原作，再写按值版 addBonusCopy。用相同初始数据调用并打印函数内外结果，指出修改落在原对象还是副本，不要只用引用更快来解释。",
        "游戏场景中 heal(Player&) 修改原角色，printStatus(const Player&) 只读观察。记忆重点：**小值按值，只读大对象常用 const&；修改原对象用 &，还要检查遍历元素是否再次复制。**",
        "下一课学习指针，以地址表示可空、可切换的访问目标。"
      ],
      "id": "l7-practice",
      "exampleId": "l7-mutable-container"
    }
  ],
  "8": [
    {
      "title": "回顾引用：指针表示访问目标",
      "paragraphs": [
        "上一课的引用为已有对象提供别名。本课的指针是保存对象地址的类型，可以改指向，也可以用nullptr表示没有目标；指针本身与它访问的对象是两个不同对象。",
        "沿用你的生命值程序，printHealth只读可空目标，applyDamage修改可空目标，healPlayer通过引用修改必需存在的对象。先学声明、取地址与解引用，再追踪100→70→85，最后讨论const与生命周期。"
      ],
      "id": "l8-recap",
      "exampleId": "l8-pointer-object"
    },
    {
      "title": "对象、地址、指针变量是三件事",
      "paragraphs": [
        "int playerHealth=100 创建 int 对象；&playerHealth 是取地址表达式；int* health=&playerHealth 创建保存地址的指针对象。指针保存的不是数值 100，而是定位对象的信息。",
        "图解中 0x1000 这样的地址只是示意。真实地址可能随运行变化，不能依赖固定值，也不能把任意整数当作有效地址读取。C++ 对可怎样使用指针有规则，获得一个看似地址的数字不等于获得合法对象。",
        "先把符号读清再执行：声明int* health中的*构成指针类型；&playerHealth是取地址；表达式*health是解引用以读取目标int。最后输出100的是目标值，输出health本身显示的是地址表示。"
      ],
      "code": "int playerHealth = 100;\nint* health = &playerHealth;\nstd::cout << playerHealth << \"\\n\"; // 100\nstd::cout << health << \"\\n\"; // 地址，不保证固定\nstd::cout << *health << \"\\n\"; // 100",
      "language": "cpp",
      "id": "l8-pointer-object",
      "exampleId": "l8-pointer-object",
      "codeName": "片段 · 对象、地址、指针变量是三件事",
      "bindings": [
        {
          "paragraph": 0,
          "text": "int* health=&playerHealth",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "* 与 & 必须依据语法位置理解",
      "paragraphs": [
        "int* health 中 * 表示指针类型；*health-=damage 中 * 是解引用，访问目标 int。&playerHealth 取地址，int& alias 声明引用。相同符号在不同位置承担不同含义。",
        "对 health 赋值改变地址，对 *health 赋值改变目标。health=nullptr 不会把 playerHealth 清零；*health=0 则在有效指针前提下改变它指向的 int。先画清对象与指针两个格子，再看赋值落在哪个格子。"
      ],
      "code": "int first = 100, second = 80;\nint* selected = &first;\n*selected -= 30; // first=70\nselected = &second;\n*selected -= 10; // second=70",
      "language": "cpp",
      "id": "l8-dereference",
      "exampleId": "l8-dereference",
      "codeName": "片段 · * 与 & 必须依据语法位置理解",
      "bindings": [
        {
          "paragraph": 1,
          "text": "对 health 赋值改变地址，对 *health 赋值改变目标",
          "lines": [
            3,
            4,
            5
          ]
        }
      ]
    },
    {
      "title": "空指针：nullptr与解引用前提",
      "paragraphs": [
        "nullptr 表示没有指向对象，不是一个值为 0 的 int。因此不能对它解引用。你的 applyDamage 先判空再 return，printHealth 对空值输出 No player data，让无数据成为明确路径。",
        "非空也不保证有效：对象销毁后，悬空指针可能仍然非空。判空解决有没有目标的表示，生命周期规则解决目标是否还活着；两者都必须满足。",
        "const int*作为只读目标指针，禁止通过*health写入int，但不保证全局不变，也不禁止参数指针改指向。后面的两种const指针会继续比较。此处先关注nullptr分支不解引用、有效分支才读目标。"
      ],
      "code": "void printHealth(const int* health)\n{\n    if (health == nullptr)\n    {\n        std::cout << \"No player data\\n\";\n        return;\n    }\n    std::cout << \"Health: \" << *health << \"\\n\";\n}",
      "language": "cpp",
      "id": "l8-null",
      "exampleId": "l8-null",
      "codeName": "片段 · nullptr 为什么必须先判断再解引用",
      "bindings": [
        {
          "paragraph": 0,
          "text": "先判空再 return",
          "lines": [
            3,
            4,
            5,
            6
          ]
        }
      ]
    },
    {
      "title": "指针参数：复制地址、间接改原对象",
      "paragraphs": [
        "applyDamage(int* health,int damage) 仍是按值传递，复制的是指针值。形参指针是独立对象，但它与调用者提供的地址指向同一 playerHealth，所以 *health 修改原整数。",
        "函数中 health=nullptr 只改形参，不会把调用者保存的指针清空。修改调用者的指针本身需要另一种接口，例如指针引用；本课先不增加这层复杂度。"
      ],
      "code": "void applyDamage(int* health, int damage)\n{\n    if (health == nullptr || damage <= 0) return;\n    *health -= damage;\n    if (*health < 0) *health = 0;\n}",
      "language": "cpp",
      "id": "l8-pointer-parameter",
      "exampleId": "l8-pointer-parameter",
      "codeName": "片段 · 传指针为什么可以修改调用者的生命",
      "bindings": [
        {
          "paragraph": 0,
          "text": "*health 修改原整数",
          "lines": [
            4
          ]
        }
      ]
    },
    {
      "title": "调用对照：引用参数与指针参数",
      "paragraphs": [
        "healPlayer(int& health,int amount) 接收引用，healPlayer(playerHealth,15) 直接绑定对象。applyDamage 接收指针，因此 applyDamage(&playerHealth,30) 显式提供地址。",
        "引用不能以 nullptr 表示没有目标；允许无目标时指针接口更清楚。这里两者都只是访问已有对象，不拥有也不负责销毁它。不要把引用一定更好或指针一定要 new 当作规则。"
      ],
      "code": "void healPlayer(int& health, int amount)\n{\n    if (amount <= 0) return;\n    health += amount;\n    if (health > 100) health = 100;\n}\n// main内：\n// applyDamage(&playerHealth,30);\n// healPlayer(playerHealth,15);",
      "language": "cpp",
      "id": "l8-reference-call",
      "exampleId": "l8-reference-call",
      "codeName": "片段 · 为什么 healPlayer 调用不加 &，applyDamage 要加",
      "bindings": [
        {
          "paragraph": 0,
          "text": "healPlayer(int& health,int amount)",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "const int* 与 int* const 分别限制什么",
      "paragraphs": [
        "const int* p 不允许通过 *p 改整数，但 p 可改指向；int* const p 不允许 p 改指向，但可改目标整数；const int* const p 同时限制两者。",
        "printHealth 使用 const int*，承诺不经此参数改生命。它不保证目标全局绝对不变，也不表达所有权。说清是指针值不能改还是目标不能经此访问修改，比统称只读指针准确。"
      ],
      "code": "int a = 100, b = 80;\nconst int* readOnly = &a;\nreadOnly = &b; // 允许改指向\n// *readOnly = 0; // 不允许经此改目标\nint* const fixedTarget = &a;\n*fixedTarget = 70; // 允许改值\n// fixedTarget = &b; // 不允许改指向",
      "language": "cpp",
      "id": "l8-pointer-const",
      "exampleId": "l8-pointer-const",
      "codeName": "片段 · const int* 与 int* const 分别限制什么",
      "bindings": [
        {
          "paragraph": 0,
          "text": "int* const p 不允许 p 改指向",
          "lines": [
            5,
            7
          ]
        }
      ]
    },
    {
      "title": "逐次追踪你的伤害与治疗",
      "paragraphs": [
        "playerHealth=100，首次打印 100；applyDamage(&playerHealth,30) 使原 int 成为 70；healPlayer 绑定它增加 15，成为 85；printHealth(nullptr) 只输出无数据，不改生命。",
        "伤害 200 应封底 0，治疗 200 应封顶 100。原文件未拒绝非正伤害与治疗，负伤害可能回血；这些是需要明确的业务边界，上面的分段示例展示防护写法。保留原作后自己补测，比静默覆盖更有学习价值。"
      ],
      "table": {
        "headers": [
          "调用",
          "参数关系",
          "调用后生命"
        ],
        "rows": [
          [
            "初始",
            "main的int对象",
            "100"
          ],
          [
            "applyDamage(&playerHealth,30)",
            "指针副本指向原int",
            "70"
          ],
          [
            "healPlayer(playerHealth,15)",
            "引用绑定原int",
            "85"
          ],
          [
            "printHealth(nullptr)",
            "无目标，不解引用",
            "85"
          ]
        ]
      },
      "id": "l8-trace",
      "exampleId": "l8-pointer-parameter"
    },
    {
      "title": "指针不等于所有权：现在不要急着 new",
      "paragraphs": [
        "当前指针指向 main 中局部对象，没有动态分配，不能对它 delete。谁创建、谁保证活着、谁释放，是比地址访问更进一步的问题。",
        "不要返回局部 int 地址，也不要在 vector 扩容后用旧元素地址。生命周期与智能指针课会讨论资源管理。现在每次解引用前要确认目标存在且仍然活着，而不是只看地址是否非零。"
      ],
      "id": "l8-ownership",
      "exampleId": "l8-pointer-object"
    },
    {
      "title": "练习：解释代码中每个 & 和 *",
      "paragraphs": [
        "在 exercises/lesson08 标注取地址、引用类型、指针类型、解引用。再用两个 int 和一个可改指向的指针，验证改指针与改目标不同。直接运行原例应依次看到 100、70、85 和无数据提示。",
        "记忆重点：**指针保存地址，解引用访问对象；nullptr 表示无对象，非空不保证生命周期；传指针仍可按值，只是能间接访问同一目标。**",
        "下一课把姓名、生命与这些操作组织成Player类。"
      ],
      "id": "l8-practice",
      "exampleId": "l8-reference-call"
    }
  ],
  "9": [
    {
      "title": "回顾生命值函数：类组织状态与行为",
      "paragraphs": [
        "上一课通过指针或引用把独立生命值交给函数。本课的类是一种自定义类型，用成员变量保存状态、成员函数提供操作；对象是该类型的具体实例。类把相关数据与维护规则集中起来。",
        "你的Player保存name、health，提供改名、受伤、治疗、显示和存活查询。先讲class、成员与访问区，再创建Knight和Mage两个独立对象，最后看封装如何避免外部绕过生命范围规则。"
      ],
      "id": "l9-recap",
      "exampleId": "l9-class-object"
    },
    {
      "title": "类是类型，对象是具体实例",
      "paragraphs": [
        "class Player {...}; 定义一种类型，结尾有分号。Player player1;、Player player2; 创建两个对象，各有自己的 name、health。给 player1 扣血不会改变 player2。",
        "成员变量描述状态，成员函数描述能执行的操作。private 和 public 划定访问权限；class 默认 private，显式写出更易阅读。访问控制是编译器检查，不是数据加密，也不是操作系统账户权限。",
        "下面成员声明沿用函数语法：void takeDamage(int damage)提供修改操作，bool isAlive() const提供只读查询。末尾const约束当前Player不被此函数普通成员写操作改变，不是把返回bool变只读；后面再看完整只读实现。"
      ],
      "code": "class Player\n{\nprivate:\n    std::string name = \"Unknown\";\n    int health = 100;\npublic:\n    void takeDamage(int damage);\n    bool isAlive() const;\n};",
      "language": "cpp",
      "id": "l9-class-object",
      "exampleId": "l9-class-object",
      "codeName": "片段 · 类是类型，对象是具体实例",
      "bindings": [
        {
          "paragraph": 0,
          "text": "class Player {...}; 定义一种类型",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "封装：private保护数据，public提供规则",
      "paragraphs": [
        "若 health 是 public，外部可写负数，每个调用处都得记住修正。private 使外部不能直接 player.health=-10，而要调用 takeDamage 或 heal，集中维护范围。",
        "封装不等于机械地提供 get/set。若 setHealth 接受任意整数，规则仍可被绕过。你原来的 takeDamage 拒绝非正值并封底，heal 拒绝非正值并封顶，真正表达了角色领域约束。"
      ],
      "code": "void Player::takeDamage(int damage)\n{\n    if (damage <= 0) return;\n    health -= damage;\n    if (health < 0) health = 0;\n}",
      "language": "cpp",
      "id": "l9-encapsulation",
      "exampleId": "l9-encapsulation",
      "codeName": "片段 · private 为什么必须配合受控接口",
      "bindings": [
        {
          "paragraph": 1,
          "text": "takeDamage 拒绝非正值并封底",
          "lines": [
            3,
            4,
            5
          ]
        }
      ]
    },
    {
      "title": "Player:: 说明类外定义属于哪个类",
      "paragraphs": [
        "类内声明 void takeDamage(int damage);，类外写 void Player::takeDamage(int damage){...}。:: 是作用域解析符，说明这是 Player 成员，不是同名自由函数。",
        "类外成员定义仍可访问 private，因为权限来自成员身份，而不是文字是否写在类的大括号里。普通 void takeDamage(int) 不会因名字相同就自动成为成员。声明和定义末尾的 const 也必须一致。"
      ],
      "code": "void Player::setName(const std::string& newName)\n{\n    name = newName;\n}\nbool Player::isAlive() const\n{\n    return health > 0;\n}",
      "language": "cpp",
      "id": "l9-member-definition",
      "exampleId": "l9-member-definition",
      "codeName": "片段 · Player:: 说明类外定义属于哪个类",
      "bindings": [
        {
          "paragraph": 0,
          "text": ":: 是作用域解析符",
          "lines": [
            1,
            5
          ]
        }
      ]
    },
    {
      "title": "点号调用时，函数操作哪个对象",
      "paragraphs": [
        "player1.takeDamage(30) 的点号选择 player1，函数内 health 就是它的成员。player2.takeDamage(120) 改 player2。成员函数带有当前对象的上下文，后面可以用 this 明确表示。",
        "this 是指向当前对象的指针，帮助解释同名成员与参数等情况。本课先用对象调用追踪状态，不必提前把所有代码写成 this->health。重要的是分清当前对象与普通形参。"
      ],
      "code": "Player player1;\nPlayer player2;\nplayer1.setName(\"Knight\");\nplayer2.setName(\"Mage\");\nplayer1.takeDamage(30); // 70\nplayer2.takeDamage(120); // 0\nplayer1.heal(10); // 80",
      "language": "cpp",
      "id": "l9-object-call",
      "exampleId": "l9-object-call",
      "codeName": "片段 · 点号调用时，函数操作哪个对象",
      "bindings": [
        {
          "paragraph": 0,
          "text": "player2.takeDamage(120)",
          "lines": [
            6
          ]
        }
      ]
    },
    {
      "title": "只读成员函数：末尾const约束当前对象",
      "paragraphs": [
        "void printStatus() const、bool isAlive() const 的末尾 const 约束当前 Player：不能通过普通成员访问修改它的状态。不是把返回值变成 const，也不是限制函数只执行一次。",
        "这些只读成员可在 const Player 上调用；takeDamage 不行。printStatus 可以输出，因为 const 约束当前对象，不禁止整个程序所有副作用。用接口区分观察与修改，让调用者在编译时就知道允许什么。"
      ],
      "code": "void Player::printStatus() const\n{\n    std::cout << \"Name: \" << name << \"\\n\";\n    std::cout << \"Health: \" << health << \"\\n\";\n}\n// const Player observer;\n// observer.printStatus(); // 允许\n// observer.takeDamage(10); // 不允许",
      "language": "cpp",
      "id": "l9-const-member",
      "exampleId": "l9-const-member",
      "codeName": "片段 · 成员函数末尾的 const 为什么放在这里",
      "bindings": [
        {
          "paragraph": 0,
          "text": "末尾 const 约束当前 Player",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "bool 返回值如何参与判断，boolalpha 又是什么",
      "paragraphs": [
        "isAlive 返回 health>0，外部不需要知道内部成员怎样表示，if(player.isAlive()) 就能控制行动。封装也保护调用者：内部换一种存储方式，只要接口含义不变，外部代码不必都改。",
        "std::boolalpha 让 cout 显示 true/false 而不是常见的 1/0，它只是输出流格式设置，不改变数据、分支或角色生死。表示方式与程序状态必须分开理解。"
      ],
      "code": "std::cout << std::boolalpha;\nstd::cout << \"Knight alive: \" << player1.isAlive() << \"\\n\";\nstd::cout << \"Mage alive: \" << player2.isAlive() << \"\\n\";",
      "language": "cpp",
      "id": "l9-bool-result",
      "exampleId": "l9-bool-result",
      "codeName": "片段 · bool 返回值如何参与判断，boolalpha 又是什么",
      "bindings": [
        {
          "paragraph": 1,
          "text": "std::boolalpha",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "完整核算你的两名角色",
      "paragraphs": [
        "两个 Player 默认 Unknown、100。设置名字后 Knight 受伤 30→70，治疗 10→80；Mage 受伤 120 后封底 0。两个对象的普通值成员互相独立。",
        "因此最终 Knight80、Mage0，存活 true、false。非正伤害和治疗在你的原函数直接 return。以后攻击逻辑要主动调用 isAlive，public 成员不会自动执行，定义规则与决定何时调用是两件事。"
      ],
      "table": {
        "headers": [
          "对象",
          "初始",
          "承伤后",
          "治疗后",
          "存活"
        ],
        "rows": [
          [
            "Knight",
            "100",
            "70",
            "80",
            "true"
          ],
          [
            "Mage",
            "100",
            "0",
            "0",
            "false"
          ]
        ]
      },
      "id": "l9-trace",
      "exampleId": "l9-object-call"
    },
    {
      "title": "常见误区：复制对象不等于引用同一角色",
      "paragraphs": [
        "Player another=player1 通常复制普通值成员，得到另一个独立角色状态，不是别名。以后 attack(Player& target) 使用引用，是为了扣血发生在原目标，而不是副本。",
        "同样，private 本身不会验证数值，验证逻辑要由成员函数实现。类只提供组织工具，必须由程序员选择有效约束、拒绝路径和返回含义。不能因为改成 class 就认为业务自动正确。"
      ],
      "id": "l9-copy",
      "exampleId": "l9-object-call"
    },
    {
      "title": "练习：通过公开行为证明封装有效",
      "paragraphs": [
        "在 exercises/lesson09 测两个对象独立、伤害封底、治疗封顶、非正值无操作。故意尝试直接访问 health，看见编译器拒绝后撤销。再说出 isAlive 与直接判断成员的接口差别。",
        "记忆重点：**类定义类型，对象各有状态；private 保护表示，public 暴露规则；只读成员函数末尾写 const。**下一课把创建与有效初始化结合，解决创建后还要 setName 的问题。",
        "下一课用构造函数在创建时建立有效初始状态。"
      ],
      "id": "l9-practice",
      "exampleId": "l9-encapsulation"
    }
  ],
  "10": [
    {
      "title": "回顾对象：构造函数建立初始状态",
      "paragraphs": [
        "上一课定义Player，创建后再调用setName。本课的构造函数在对象初始化过程中执行，用来建立初始有效状态。它与类同名、没有返回类型，可按参数提供不同创建入口。",
        "继续使用Player：无参版本是Unknown和100生命，带参版本接收姓名与生命。先学声明与调用，再学初始化列表和顺序，最后核算Knight与输入150生命的Mage，确认校验发生在后续伤害之前。"
      ],
      "id": "l10-recap",
      "exampleId": "l10-constructor"
    },
    {
      "title": "构造语法：类名、参数与创建位置",
      "paragraphs": [
        "构造函数与类同名，没有返回类型：Player()与Player(const std::string&,int)分别提供无参数与两个参数的入口。不能写void Player()，因为构造不是返回某个值的普通函数，而是对象初始化过程中的特殊成员。右侧类声明的第6、7行就是这两个入口。",
        "创建表达式触发构造，不是对象建好后再手动调用一次。Player player; 创建对象；Player player(); 在常见声明上下文中却是声明一个返回 Player 的函数。初学可用 Player player{}; 避免歧义。"
      ],
      "code": "class Player\n{\n    std::string name;\n    int health;\npublic:\n    Player();\n    Player(const std::string& playerName, int startingHealth);\n};",
      "language": "cpp",
      "id": "l10-constructor",
      "exampleId": "l10-constructor",
      "codeName": "片段 · 构造函数为什么同名却没有返回类型",
      "bindings": [
        {
          "paragraph": 0,
          "text": "没有返回类型",
          "lines": [
            6,
            7
          ]
        }
      ]
    },
    {
      "title": "冒号后的成员初始化列表不是普通赋值",
      "paragraphs": [
        "Player::Player():name(\"Unknown\"),health(100) 先初始化成员，再进入函数体。string 直接用指定文本构造；若函数体才 name=\"Unknown\"，成员已经先默认构造，再赋值。",
        "内置 int 若没有其他初始化可能没有有效初值。初始化列表也能初始化 const、引用以及没有默认构造的成员对象，组合类会马上用到。不能把它仅当成函数体赋值的更短写法。"
      ],
      "code": "Player::Player()\n    : name(\"Unknown\"), health(100)\n{\n}\nPlayer::Player(const std::string& playerName, int startingHealth)\n    : name(playerName), health(startingHealth)\n{\n    if (health < 0) health = 0;\n    else if (health > 100) health = 100;\n}",
      "language": "cpp",
      "id": "l10-initializers",
      "exampleId": "l10-initializers",
      "codeName": "片段 · 冒号后的成员初始化列表不是普通赋值",
      "bindings": [
        {
          "paragraph": 0,
          "text": "先初始化成员，再进入函数体",
          "lines": [
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      "title": "实参、形参、成员名怎样传递值",
      "paragraphs": [
        "Player(\"Knight\",80) 给 playerName、startingHealth 提供初值；初始化列表再把它们用于成员 name、health。名字可以不同，因为调用者提供数据，形参接收，成员长期保存。",
        "name(playerName) 左侧是成员，括号内是参数。构造结束形参不再作为本次调用参数存在，但 name 已是对象自己的 string，不依赖传入参数对象继续活着。引用参数不代表成员也必须是引用。"
      ],
      "table": {
        "headers": [
          "实参",
          "形参",
          "成员初始化",
          "保存结果"
        ],
        "rows": [
          [
            "\"Knight\"",
            "playerName",
            "name(playerName)",
            "Knight"
          ],
          [
            "80",
            "startingHealth",
            "health(startingHealth)",
            "80"
          ]
        ]
      },
      "id": "l10-parameter-trace",
      "exampleId": "l10-initializers"
    },
    {
      "title": "初始化顺序取决于声明，不取决于列表顺序",
      "paragraphs": [
        "成员按类内声明顺序初始化。这里 name 先于 health。即使列表写 health(100),name(\"Unknown\")，顺序也不改变，可能产生警告；当成员相互依赖时尤其危险。",
        "列表顺序建议与声明一致。继承会增加先父类、后成员、最后函数体的顺序，不要依据视觉排列猜执行。初始化阶段的顺序是语言规则，不是编译器随意优化。"
      ],
      "code": "class Example\n{\n    int first;\n    int second;\npublic:\n    Example() : first(10), second(first + 1) {}\n}; // second得到11",
      "language": "cpp",
      "id": "l10-initialization-order",
      "exampleId": "l10-initialization-order",
      "codeName": "片段 · 初始化顺序取决于声明，不取决于列表顺序",
      "bindings": [
        {
          "paragraph": 0,
          "text": "成员按类内声明顺序初始化",
          "lines": [
            3,
            4,
            6
          ]
        }
      ]
    },
    {
      "title": "构造重载：按参数选择初始化入口",
      "paragraphs": [
        "参数列表不同，编译器按创建表达式选择匹配版本。这叫重载：同名函数通过参数差异区分。Player() 与 Player(\"Knight\",80) 不需要在运行时判断“传没传参数”。",
        "自行声明某些构造后，编译器不会无条件再补一个可用无参构造。要支持 Player p;，必须提供相应入口。不同入口都应建立同样有效的状态，而不是默认版本跳过重要规则。"
      ],
      "code": "Player defaultPlayer{};\nPlayer knight(\"Knight\", 80);\nPlayer mage(\"Mage\", 150);\n// Player missing(\"Knight\"); // 无匹配单参数构造",
      "language": "cpp",
      "id": "l10-overload",
      "exampleId": "l10-overload",
      "codeName": "片段 · 两个构造版本为什么叫重载",
      "bindings": [
        {
          "paragraph": 0,
          "text": "参数列表不同",
          "lines": [
            1,
            2,
            3
          ]
        }
      ]
    },
    {
      "title": "构造校验和后续操作校验要互相配合",
      "paragraphs": [
        "你的 startingHealth 被限制到 0–100：-5→0，150→100；之后伤害封底、治疗封顶。这样从创建到操作都维护范围。只有构造检查，后续仍可能破坏状态；只有后续检查，初始对象可能已经无效。",
        "本课 Player 最大生命固定 100。以后 Warrior 为 120，不能把这里的上限机械复制到 Character，否则新职业刚创建就被错误修正。业务规则变化时应重新审视约束。"
      ],
      "id": "l10-invariant",
      "exampleId": "l10-initializers"
    },
    {
      "title": "按时间顺序核算你的三个 Player",
      "paragraphs": [
        "player1 默认100，承伤30→70，再治疗10→80。player2 初始80，承伤120→0，因此 Knight has been defeated。player3 输入150，构造先限制100，再承伤40→60。",
        "如果从原始输入150直接减40，会误得110，遗漏构造校验。断点先放构造体再放伤害函数，观察真正成员值。输出要由完整时间线推导，不只挑最后一条运算。"
      ],
      "table": {
        "headers": [
          "创建",
          "构造后HP",
          "后续操作",
          "最终"
        ],
        "rows": [
          [
            "Player()",
            "100",
            "-30,+10",
            "80"
          ],
          [
            "Player(\"Knight\",80)",
            "80",
            "-120",
            "0"
          ],
          [
            "Player(\"Mage\",150)",
            "100",
            "-40",
            "60"
          ]
        ]
      },
      "id": "l10-trace",
      "exampleId": "l10-overload"
    },
    {
      "title": "可选重构：委托构造减少重复",
      "paragraphs": [
        "Player():Player(\"Unknown\",100){} 表示同一类的无参构造委托带参构造建立状态。它不同于下一课初始化 Weapon 成员，也不同于以后调用父类构造。",
        "掌握普通列表后再考虑委托。不能一边委托另一个构造，一边在同一列表独立指定其他成员初始化。先有清晰规则，再减少重复，避免过早使用新语法使初始化路径更难追踪。"
      ],
      "code": "Player::Player() : Player(\"Unknown\", 100)\n{\n}",
      "language": "cpp",
      "id": "l10-delegation",
      "exampleId": "l10-delegation",
      "codeName": "片段 · 可选重构：委托构造减少重复",
      "bindings": [
        {
          "paragraph": 0,
          "text": "同一类的无参构造委托带参构造",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "练习：创建后立即验证对象有效",
      "paragraphs": [
        "在 exercises/lesson10 使用已有两种构造，测试初始生命 -1、0、100、101，确认姓名保存且后续受伤仍满足规则。不要把构造函数写成不明确的 setter 拼接。",
        "记忆重点：**构造建立初始状态，初始化早于函数体；成员顺序由声明决定，参数名与成员名只是不同接收点。**",
        "下一课让Player拥有Weapon，学习成员对象的构造。"
      ],
      "id": "l10-practice",
      "exampleId": "l10-initializers"
    }
  ],
  "11": [
    {
      "title": "回顾Player：组合表达拥有关系",
      "paragraphs": [
        "上一课用构造函数建立Player状态。本课的组合让一个对象按值包含另一个对象，表达拥有关系。Player拥有Weapon，Weapon维护自己的名字与伤害；这不表示Player是一种Weapon。",
        "先认识Weapon接口，再看Player中的真实成员与构造方式。使用Iron Sword伤害30、Magic Staff伤害45以及两名100生命玩家，追踪跨对象调用；最后区分参数引用、成员副本与共享资源。"
      ],
      "id": "l11-recap",
      "exampleId": "l11-composition"
    },
    {
      "title": "先让 Weapon 自己维护有效状态",
      "paragraphs": [
        "Weapon 的 name 与 damage 为 private，构造接收 weaponName、weaponDamage，并把负伤害改成 0。getName、getDamage、printInfo 提供只读接口，Player 不需要知道内部表示。",
        "你的 Weapon 没有默认构造，每次创建必须给名字和伤害。这很合理，但 Player 中的 Weapon 成员也必须在初始化阶段得到依据，不能等进入函数体才补救。",
        "getName返回类型const std::string&表示只读引用内部名字；getDamage返回小整数值；函数末尾const限制当前Weapon。下一节给出返回引用的实现和有效期限制。这里先逐个认识接口，之后Player才通过这些接口读武器。"
      ],
      "code": "class Weapon\n{\n    std::string name;\n    int damage;\npublic:\n    Weapon(const std::string& weaponName, int weaponDamage);\n    const std::string& getName() const;\n    int getDamage() const;\n    void printInfo() const;\n};",
      "language": "cpp",
      "id": "l11-weapon",
      "exampleId": "l11-weapon",
      "codeName": "片段 · 先让 Weapon 自己维护有效状态",
      "bindings": [
        {
          "paragraph": 0,
          "text": "getName、getDamage、printInfo 提供只读接口",
          "lines": [
            7,
            8,
            9
          ]
        }
      ]
    },
    {
      "title": "const std::string& 返回谁的名字",
      "paragraphs": [
        "getName 返回成员 name 的 const 引用，避免复制字符串，并禁止调用者经这个路径修改它。getDamage 返回 int，小值按值即可。末尾 const 又是另一层约束，表示查询不改当前 Weapon。",
        "返回引用的有效期依赖 Weapon 和其成员存在。不要保存临时 Weapon 的名字引用，等临时对象销毁后再使用。const 引用不是永远安全，只是明确只读访问与避免复制的选择。"
      ],
      "code": "const std::string& Weapon::getName() const\n{\n    return name;\n}\nint Weapon::getDamage() const\n{\n    return damage;\n}",
      "language": "cpp",
      "id": "l11-accessors",
      "exampleId": "l11-accessors",
      "codeName": "片段 · const std::string& 返回谁的名字",
      "bindings": [
        {
          "paragraph": 0,
          "text": "getName 返回成员 name 的 const 引用",
          "lines": [
            1,
            3
          ]
        }
      ]
    },
    {
      "title": "Player 内的 Weapon weapon 是真实成员对象",
      "paragraphs": [
        "Weapon weapon 作为成员声明，表示每个 Player 内有独立 Weapon 子对象，不是可为空的指针，不需要单独 new，也不自动共享外部武器。",
        "构造参数 const Weapon& startingweapon 避免参数复制，但 weapon(startingweapon) 会复制构造成员。参数通过引用接收，与成员按值拥有副本是两层关系。看到 & 就推断玩家共享武器，是常见误解。"
      ],
      "code": "class Player\n{\n    std::string name;\n    int health;\n    Weapon weapon;\npublic:\n    Player(const std::string& playername, const Weapon& startingweapon);\n    void attack(Player& target) const;\n};\nPlayer::Player(const std::string& playername, const Weapon& startingweapon)\n    : name(playername), health(100), weapon(startingweapon)\n{\n}",
      "language": "cpp",
      "id": "l11-composition",
      "exampleId": "l11-composition",
      "codeName": "片段 · Player 内的 Weapon weapon 是真实成员对象",
      "bindings": [
        {
          "paragraph": 0,
          "text": "每个 Player 内有独立 Weapon 子对象",
          "lines": [
            5
          ]
        }
      ]
    },
    {
      "title": "成员构造：在函数体前建立Weapon",
      "paragraphs": [
        "进入 Player 函数体前，weapon 必须已构造。Weapon 没有无参构造，若只在函数体写 weapon=startingweapon，编译器会先尝试默认构造成员而失败，根本到不了赋值。",
        "weapon(startingweapon) 直接建立成员。顺序按 name、health、weapon 的声明排列；销毁 Player 时这些成员也自动销毁。组合把生命周期纳入所属对象，不需要手工逐个释放按值成员。"
      ],
      "id": "l11-member-construction",
      "exampleId": "l11-composition"
    },
    {
      "title": "const攻击者与可修改目标：两条独立约束",
      "paragraphs": [
        "末尾 const 约束攻击者这个 Player，不是另一个目标。当前实现只读取自己的武器与存活状态，再调用 target.takeDamage，因此可以 const。",
        "target 用可修改引用保证伤害落在原目标。以后攻击还要扣体力、弹药或设置冷却，就不能继续保持同样的 const 接口。判断依据是当前对象是否被修改，而不是动作名字看上去是否只读。"
      ],
      "code": "void Player::attack(Player& target) const\n{\n    if (!isAlive())\n    {\n        std::cout << name << \" cannot attack.\\n\";\n        return;\n    }\n    std::cout << name << \" attacks with \" << weapon.getName() << \"!\\n\";\n    target.takeDamage(weapon.getDamage());\n}",
      "language": "cpp",
      "id": "l11-const-attack",
      "exampleId": "l11-const-attack",
      "codeName": "片段 · attack(Player& target) const 为什么能伤害目标",
      "bindings": [
        {
          "paragraph": 1,
          "text": "target 用可修改引用保证伤害落在原目标",
          "lines": [
            1,
            9
          ]
        }
      ]
    },
    {
      "title": "一次攻击跨越两个对象的公开接口",
      "paragraphs": [
        "knight.attack(mage) 进入 knight 的函数，isAlive 查询 knight，weapon.getDamage 读取内部 Iron Sword 得到30。target 绑定 mage，因此 target.takeDamage(30) 改 mage 的生命。",
        "整条调用链不直接访问 mage.health，也不读取 Weapon 的 private damage。每一层都通过接口完成职责，这是封装与组合共同作用，而不是简单把数据搬到多个类里。"
      ],
      "table": {
        "headers": [
          "步骤",
          "对象",
          "操作"
        ],
        "rows": [
          [
            "1",
            "knight",
            "确认存活"
          ],
          [
            "2",
            "knight.weapon",
            "读取Iron Sword / 30"
          ],
          [
            "3",
            "target引用mage",
            "调用takeDamage(30)"
          ],
          [
            "4",
            "mage",
            "HP100→70"
          ]
        ]
      },
      "id": "l11-call-chain",
      "exampleId": "l11-const-attack",
      "bindings": [
        {
          "paragraph": 0,
          "text": "target.takeDamage(30)",
          "lines": [
            9
          ],
          "exampleId": "l11-const-attack"
        }
      ]
    },
    {
      "title": "按你的原作三轮核算，死人不能再行动",
      "paragraphs": [
        "Iron Sword伤害30，Magic Staff伤害45。第一轮 Knight55、Mage70；第二轮 Knight10、Mage40；第三轮 Knight先攻击让Mage10，Mage仍活着，反击使Knight0。",
        "再执行 knight.attack(mage) 应立即退出。若目标先被击败，也应避免它反击。第十二课用循环替代手写三轮时，会在双方行动之间检查存活；不能只看一轮开始时状态。"
      ],
      "table": {
        "headers": [
          "轮次结束",
          "Knight HP",
          "Mage HP"
        ],
        "rows": [
          [
            "初始",
            "100",
            "100"
          ],
          [
            "第1轮",
            "55",
            "70"
          ],
          [
            "第2轮",
            "10",
            "40"
          ],
          [
            "第3轮",
            "0",
            "10"
          ]
        ]
      },
      "id": "l11-trace",
      "exampleId": "l11-const-attack"
    },
    {
      "title": "组合不是共享资源，也不是继承的替代口号",
      "paragraphs": [
        "这里按值拥有一把武器，是最直接的组合。未来角色共享同一武器配置，可把只读配置和自身弹药状态拆开，再选择资源句柄或智能指针，而不是把所有成员改为裸指针。",
        "继承回答 is-a，组合回答 has-a；一个类型既能继承角色接口，也能组合装备。复制当前 Player 会复制普通值成员，这个简化模型不自动获得多人联网中的身份或资源共享含义。"
      ],
      "id": "l11-ownership",
      "exampleId": "l11-composition"
    },
    {
      "title": "练习：同时检查状态线与对象所有权线",
      "paragraphs": [
        "在 exercises/lesson11 测试负武器伤害被修正、死人不能攻击、目标血量不负。解释构造参数引用与 Player 内 Weapon 副本的区别，并手算三轮结果。",
        "记忆重点：**组合让对象拥有成员对象；成员先构造，再进函数体；const 限制当前对象，引用参数可以访问另一个可修改对象。**",
        "下一课拆分头文件与源文件，构建多文件战斗项目。"
      ],
      "id": "l11-practice",
      "exampleId": "l11-const-attack"
    }
  ],
  "12": [
    {
      "title": "回顾组合：多文件项目的组成",
      "paragraphs": [
        "上一课用两个类组合角色与武器。本课的多文件项目把接口放头文件，把实现放源文件，分别编译后链接成一个程序。文件不会按目录顺序依次运行，入口仍是main。",
        "你的项目有Weapon.h、Weapon.cpp、Player.h、Player.cpp、main.cpp五个文件，不需要lesson12.cpp。先学包含与包含保护，再看依赖方向和完整文件，最后构建并验证Mage获胜的原结果。"
      ],
      "id": "l12-recap",
      "exampleId": "l12-weapon-header"
    },
    {
      "title": "包含保护：防止同一翻译单元重复展开",
      "paragraphs": [
        "main 可能直接包含 Weapon.h，又经 Player.h 间接包含它。常见工具链中 #pragma once 避免同一头文件在一个翻译单元里重复展开。标准可移植形式是 #ifndef/#define/#endif 包含保护。",
        "它不能让普通函数在整个项目只定义一份，也不能解决漏编译cpp。重复包含、重复定义、找不到定义属于不同层次，先判断报错阶段，再检查相应配置。"
      ],
      "id": "l12-include-guard",
      "exampleId": "l12-weapon-header"
    },
    {
      "title": "头文件说明能做什么，cpp 提供怎样做",
      "paragraphs": [
        "Weapon.h 包含类定义与成员函数声明，让调用者知道类型和接口；Weapon.cpp 提供成员实现。头文件不会在运行时先执行，也不是要独立运行的程序。",
        "类定义与普通函数定义不同。类定义放头文件很常见；非 inline 普通函数的定义放入被多个 cpp 包含的头文件，可能造成重复定义。当前采用声明在头、实现放cpp的直观组织。"
      ],
      "code": "// Weapon.h\n#pragma once\n#include <string>\nclass Weapon\n{\n    std::string name;\n    int damage;\npublic:\n    Weapon(const std::string& weaponName, int weaponDamage);\n    int getDamage() const;\n};",
      "language": "cpp",
      "id": "l12-weapon-header",
      "exampleId": "l12-weapon-header",
      "codeName": "片段 · 头文件说明能做什么，cpp 提供怎样做",
      "bindings": [
        {
          "paragraph": 0,
          "text": "Weapon.h 包含类定义与成员函数声明",
          "lines": [
            4,
            9,
            10
          ]
        }
      ]
    },
    {
      "title": "#include 不等于链接另一个源文件",
      "paragraphs": [
        "#include \"Weapon.h\" 让当前源文件在预处理后能看到声明。Weapon.cpp、Player.cpp 各自编译成目标代码，再由链接器组合。只包含头文件却没编译对应cpp，调用仍会缺少定义。",
        "不要 include \"Weapon.cpp\" 来凑实现；若又把它列为输入会重复定义，也破坏独立编译。双引号常用于项目头，尖括号常用于标准库头，搜索路径由工具链配置，不是扩展名决定。"
      ],
      "code": "// Weapon.cpp\n#include \"Weapon.h\"\n#include <iostream>\nWeapon::Weapon(const std::string& weaponName, int weaponDamage)\n    : name(weaponName), damage(weaponDamage)\n{\n    if (damage < 0) damage = 0;\n}\nint Weapon::getDamage() const { return damage; }",
      "language": "cpp",
      "id": "l12-weapon-source",
      "exampleId": "l12-weapon-source",
      "codeName": "片段 · #include 不等于链接另一个源文件",
      "bindings": [
        {
          "paragraph": 0,
          "text": "#include \"Weapon.h\"",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "按值成员依赖：完整类型定义",
      "paragraphs": [
        "Player 按值含有 Weapon weapon，编译器需要 Weapon 大小来确定 Player 布局，因此 Player.h 应包含 Weapon.h。只写 class Weapon; 前置声明，不够定义按值成员。",
        "某些只用指针或引用的声明位置可以前置声明，以减少依赖；但访问成员等操作又可能需要完整类型。先保持本课直接包含，不为减少 include 而引入不完整类型错误。"
      ],
      "code": "// Player.h\n#pragma once\n#include \"Weapon.h\"\n#include <string>\nclass Player\n{\n    std::string name;\n    int health;\n    Weapon weapon;\npublic:\n    Player(const std::string& playername, const Weapon& startingweapon);\n    void attack(Player& target) const;\n    bool isAlive() const;\n    void takeDamage(int damage);\n};",
      "language": "cpp",
      "id": "l12-player-header",
      "exampleId": "l12-player-header",
      "codeName": "片段 · Player.h 为什么需要完整 Weapon 定义",
      "bindings": [
        {
          "paragraph": 0,
          "text": "Player 按值含有 Weapon weapon",
          "lines": [
            9
          ]
        }
      ]
    },
    {
      "title": "main 只组织战斗顺序，不侵入类实现",
      "paragraphs": [
        "main 创建 Iron Sword30、Magic Staff45，再创建 Knight、Mage。while 判断存活并组织先后手，伤害规则仍由类负责。相较手写三轮，循环让回合数由状态决定。",
        "Knight先攻击后，还要检查Mage是否存活再反击。while开头的检查不足以保护整轮，因为第一击可能已经改变状态。检查应贴合动作顺序，而不是只在方便的位置写一次。"
      ],
      "code": "while (knight.isAlive() && mage.isAlive())\n{\n    knight.attack(mage);\n    if (mage.isAlive())\n    {\n        mage.attack(knight);\n    }\n}",
      "language": "cpp",
      "id": "l12-battle",
      "exampleId": "l12-battle",
      "codeName": "片段 · main 只组织战斗顺序，不侵入类实现",
      "bindings": [
        {
          "paragraph": 1,
          "text": "检查Mage是否存活再反击",
          "lines": [
            4,
            6
          ]
        }
      ]
    },
    {
      "title": "一次编译本课所有实现文件",
      "paragraphs": [
        "在 lesson12 目录执行 g++ -std=c++17 main.cpp Player.cpp Weapon.cpp -o lesson12.exe，把三个源文件一起编译链接。macOS输出名可改lesson12，再用 ./lesson12 运行。不要只编译main，也不要把reference的另一份main一起加入。",
        "头文件由cpp包含，通常不列为这个命令的独立输入。VS Code编译活动文件任务适合单源程序，不一定适合本课。用README的多文件命令，确认任务与结构匹配。后面的CMake课会管理这份源文件清单。"
      ],
      "code": "// 终端命令说明（不是C++可执行语句）：\n// g++ -std=c++17 -Wall -Wextra -pedantic main.cpp Player.cpp Weapon.cpp -o lesson12.exe\n// PowerShell运行： .\\lesson12.exe\n// macOS输出名改lesson12，运行： ./lesson12",
      "language": "cpp",
      "id": "l12-build",
      "exampleId": "l12-build",
      "codeName": "片段 · 一次编译本课所有实现文件",
      "bindings": [
        {
          "paragraph": 0,
          "text": "g++ -std=c++17 main.cpp Player.cpp Weapon.cpp -o lesson12.exe",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "按错误类型定位，不要盲目改 include",
      "paragraphs": [
        "unknown type/not declared 多与声明不可见有关；undefined reference 多与定义缺失或签名不一致有关；multiple definition 多与定义重复有关。三种诊断不是同一个问题的不同措辞。",
        "头文件声明 attack(Player&) const，cpp定义漏末尾const，也不是可以忽略的小差别。先核对声明与定义，再确认命令包含全部实现，最后检查工具链。不要看到链接报错就继续重复include。"
      ],
      "id": "l12-diagnostics",
      "exampleId": "l12-weapon-source"
    },
    {
      "title": "验证行为没变，再思考退出保证",
      "paragraphs": [
        "原始战斗第三轮结束，Knight0、Mage10，输出 Mage wins!。这一结果应与第十一课手动三轮一致。拆分文件不应改变伤害规则，只改变工程组织。",
        "双方伤害都为0时，现有while不会结束。reference保留你的主线行为；作为加固练习，可加入最大回合与平局判断。结构正确不等于所有业务状态都有退出路径。"
      ],
      "id": "l12-trace",
      "exampleId": "l12-battle"
    },
    {
      "id": "l12-complete-project",
      "exampleId": "l12-complete-project",
      "title": "完整五文件示例：声明、实现与调用放在一起",
      "paragraphs": [
        "现在把已经解释的五个文件放回同一个项目。Weapon.h声明武器接口，Weapon.cpp给出成员定义；Player.h按值包含Weapon，Player.cpp通过接口读武器；main.cpp创建对象并调度战斗。右侧可以切换文件，避免把它们误认为五个顺次执行的程序。",
        "Player.h中的Weapon weapon是按值成员，因此头文件包含Weapon.h；Weapon.cpp首先包含自己的头，用于核对本文件实现与对外声明。main.cpp中的knight.attack(mage)只调用公开接口，Mage死亡后不会再反击。",
        "这份例子直接采用你已有五个源码文件。编译时选择本课目录的三个cpp，不编译reference中的另一份main，也不把头文件当成独立程序运行。文件拆分后，原有三轮结果仍是Knight0、Mage10。"
      ],
      "codeFiles": [
        {
          "name": "Weapon.h",
          "content": "#pragma once\n#include <string>\n\n\nclass Weapon\n{\nprivate:\n    std::string name;\n    int damage;\npublic:\n    Weapon(const std::string& weaponName, int weaponDamage);\n\n    const std::string& getName() const;\n    int getDamage() const;\n    void printInfo() const;\n};",
          "language": "cpp"
        },
        {
          "name": "Weapon.cpp",
          "content": "#include \"Weapon.h\"\n#include <iostream>\n\nWeapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)\n{\n    if (damage < 0)\n    {\n        damage = 0;\n    }\n}\n\nconst std::string& Weapon::getName() const\n{\n    return name;\n}\n\nint Weapon::getDamage() const\n{\n    return damage;\n}\n\nvoid Weapon::printInfo() const \n{\n    std::cout << name << \" (\" << damage << \" damage)\";\n}",
          "language": "cpp"
        },
        {
          "name": "Player.h",
          "content": "#pragma once\n#include \"Weapon.h\"\n#include <string>\n\n\nclass Player\n{\nprivate:\n    std::string name;\n    int health;\n    Weapon weapon;\npublic:\n    Player(const std::string& playername, const Weapon& startingweapon);\n\n    void attack(Player& target) const;\n    void takeDamage(int damage);\n    void printStatus() const;\n    bool isAlive() const;\n};",
          "language": "cpp"
        },
        {
          "name": "Player.cpp",
          "content": "#include \"Player.h\"\n#include <iostream>\n\n\nPlayer::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)\n{\n}\n\nvoid Player::attack(Player& target) const{\n    if (!isAlive()){\n        std::cout << name << \" cannot attack.\" << \"\\n\";\n        return;\n    }\n\n    std::cout << name << \" attacks with \" << weapon.getName() << \"!\\n\";\n\n    target.takeDamage(weapon.getDamage());\n}\n\nvoid Player::takeDamage(int damage){\n    if (damage <= 0 || !isAlive()){\n        return;\n    }\n\n    health -= damage;\n\n    if (health < 0){\n        health = 0;\n    }\n}\n\nvoid Player::printStatus() const{\n    std::cout << \"Player: \" << name << '\\n';\n    std::cout << \"Health: \" << health << '\\n';\n    std::cout << \"Weapon: \";\n    weapon.printInfo();\n\n    std::cout << \"\\n\\n\";\n}\n\nbool Player::isAlive() const{\n    return health > 0;\n}",
          "language": "cpp"
        },
        {
          "name": "main.cpp",
          "content": "#include \"Player.h\"\n#include \"Weapon.h\"\n#include <iostream>\n\nint main()\n{\n    Weapon sword(\"Iron Sword\", 30);\n    Weapon staff(\"Magic Staff\", 45);\n\n    Player knight(\"Knight\", sword);\n    Player mage(\"Mage\", staff);\n\n    while (knight.isAlive() && mage.isAlive())\n    {\n        knight.attack(mage);\n\n        if (mage.isAlive())\n        {\n            mage.attack(knight);\n        }\n    }\n\n    if (knight.isAlive())\n    {\n        std::cout << \"Knight wins!\\n\";\n    }\n    else\n    {\n        std::cout << \"Mage wins!\\n\";\n    }    \n    \n    knight.printStatus();\n    mage.printStatus();\n\n    return 0;\n}",
          "language": "cpp"
        }
      ],
      "codeName": "第12课完整项目",
      "bindings": [
        {
          "paragraph": 1,
          "text": "Weapon weapon是按值成员",
          "file": "Player.h",
          "lines": [
            11
          ]
        },
        {
          "paragraph": 1,
          "text": "头文件包含Weapon.h",
          "file": "Player.h",
          "lines": [
            2
          ]
        },
        {
          "paragraph": 1,
          "text": "Weapon.cpp首先包含自己的头",
          "file": "Weapon.cpp",
          "lines": [
            1
          ]
        },
        {
          "paragraph": 1,
          "text": "knight.attack(mage)",
          "file": "main.cpp",
          "lines": [
            15
          ]
        },
        {
          "paragraph": 1,
          "text": "Mage死亡后不会再反击",
          "file": "main.cpp",
          "lines": [
            17,
            19
          ]
        }
      ]
    },
    {
      "title": "练习：按依赖方向解释五个文件",
      "paragraphs": [
        "在 exercises/lesson12 打开五文件，逐个解释包含理由：Player依赖Weapon完整定义，main只通过公开接口组织游戏，cpp首先包含自己的头以核对声明。",
        "记忆重点：**头文件传播接口，源文件提供实现，各cpp分别编译后链接；只编译当前文件不等于构建多文件项目。**保持原文件名，避免另造lesson12.cpp而绕开本课目标。",
        "下一课让Warrior与Mage继承Character共同部分。"
      ],
      "id": "l12-practice",
      "exampleId": "l12-player-header"
    }
  ],
  "13": [
    {
      "title": "回顾组合：继承表达共同类型",
      "paragraphs": [
        "上一课用多文件项目组织Player与Weapon的拥有关系。本课的继承表达是一种：Warrior是一种Character，Mage也是。父类保存共同部分，子类增加或选择职业行为。",
        "沿用原Character、Warrior、Mage：战士120生命、伤害35；法师80生命、100魔法，每次耗20造成40伤害。先定义继承和构造语法，再追踪两轮，最后引出下一课的共同攻击接口。"
      ],
      "id": "l13-recap",
      "exampleId": "l13-character"
    },
    {
      "title": "Character保存共同部分，不是全能父类",
      "paragraphs": [
        "你的Character有private name、health，以及构造、查询、受伤、显示和存活接口。若把所有职业未来可能出现的技能都塞进父类，每个职业都会继承许多不合适的功能。先提取真正共同的职责。",
        "本课Character仍是可创建的普通类，没有virtual attack。继承允许使用父类部分与公开接口，但不会自动使所有同名行为按真实类型选择，下一课才引入动态派发。"
      ],
      "code": "class Character\n{\n    std::string name;\n    int health;\npublic:\n    Character(const std::string& characterName, int characterHealth);\n    const std::string& getName() const;\n    int getHealth() const;\n    void takeDamage(int damage);\n    bool isAlive() const;\n    void printStatus() const;\n};",
      "language": "cpp",
      "id": "l13-character",
      "exampleId": "l13-character",
      "codeName": "片段 · Character保存共同部分，不是全能父类",
      "bindings": [
        {
          "paragraph": 0,
          "text": "共同的职责",
          "lines": [
            3,
            4,
            6,
            7,
            8,
            9,
            10,
            11
          ]
        }
      ]
    },
    {
      "title": "public继承表达可以作为Character使用",
      "paragraphs": [
        "class Warrior : public Character 声明公开继承。Warrior含有Character基类部分，可以绑定到Character&。public继承后，父类公开接口仍可经Warrior调用。",
        "父类private成员不会变成子类可直接访问的变量。Warrior通过isAlive、getName使用共同状态。不要为了方便把所有数据改protected，否则子类会依赖父类内部表示，未来更难维护约束。",
        "继承列表public Character与类内部public:成员区是不同位置：前者规定父类关系可访问性，后者规定成员访问性。下一节: Character(...)指定父类初始化，与前面: weapon(...)初始化成员是两种职责，均在子类函数体前发生。"
      ],
      "code": "class Warrior : public Character\n{\npublic:\n    Warrior(const std::string& warriorName);\n    void powerAttack(Character& target) const;\n};",
      "language": "cpp",
      "id": "l13-public-inheritance",
      "exampleId": "l13-public-inheritance",
      "codeName": "片段 · public继承表达可以作为Character使用",
      "bindings": [
        {
          "paragraph": 0,
          "text": "class Warrior : public Character",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "职业构造：外部名字与职业初始生命",
      "paragraphs": [
        "Warrior warrior(\"Arthur\")让调用者命名；Warrior内部Character(warriorName,120)规定这个职业初始生命120。这是当前游戏接口的设计选择，不是继承语法要求名字外传、生命写死。",
        "允许自定义生命时，可以让Warrior接收startingHealth再转交Character，但调用者要多承担一个选择。本课保留原模型：调用者选名字，职业决定初始生命；法师同理固定80生命、100魔法。"
      ],
      "code": "Warrior::Warrior(const std::string& warriorName)\n    : Character(warriorName, 120)\n{\n}\nMage::Mage(const std::string& mageName)\n    : Character(mageName, 80), mana(100)\n{\n}",
      "language": "cpp",
      "id": "l13-derived-constructor",
      "exampleId": "l13-derived-constructor",
      "codeName": "片段 · 为什么名字外传，生命固定120",
      "bindings": [
        {
          "paragraph": 0,
          "text": "Character(warriorName,120)",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "逐层追踪Arthur，解开两组名字",
      "paragraphs": [
        "Warrior(\"Arthur\")先让warriorName接收文本。初始化列表Character(warriorName,120)再调用父类构造，characterName接收该文本，characterHealth接收120。name(characterName)、health(characterHealth)最终初始化共同成员。",
        "warriorName与characterName不是必须同名的神秘变量，分别属于两次参数接收。父类不用知道调用者是战士还是法师，只根据接收参数建立自己的部分。参数名不同不改变数值传递。"
      ],
      "code": "Character::Character(const std::string& characterName, int characterHealth)\n    : name(characterName), health(characterHealth)\n{\n    if (health < 0) health = 0;\n}",
      "language": "cpp",
      "table": {
        "headers": [
          "阶段",
          "名字数据",
          "生命数据"
        ],
        "rows": [
          [
            "main创建",
            "\"Arthur\"",
            "未提供"
          ],
          [
            "Warrior形参",
            "warriorName",
            "职业规则120"
          ],
          [
            "父类调用",
            "Character(warriorName,120)",
            "120"
          ],
          [
            "Character形参",
            "characterName",
            "characterHealth"
          ],
          [
            "最终成员",
            "name=Arthur",
            "health=120"
          ]
        ]
      },
      "id": "l13-constructor-chain",
      "exampleId": "l13-constructor-chain",
      "codeName": "片段 · 逐层追踪Arthur，解开两组名字",
      "bindings": [
        {
          "paragraph": 0,
          "text": "name(characterName)、health(characterHealth)",
          "lines": [
            2
          ]
        }
      ]
    },
    {
      "title": "父类初始化：职责边界与错误对照",
      "paragraphs": [
        "name与health属于Character，负责初始化它们的是Character构造。Warrior初始化列表可指定直接基类构造和自己的成员，不能越过基类构造逐个初始化父类数据。",
        "所以:name(n),health(120)不只是private权限问题。即使改变权限，也不能代替直接基类初始化。正确:Character(n,120)让父类负责自己的状态，这是初始化职责的边界。"
      ],
      "code": "// 故意错误，勿直接编译：\n// Warrior::Warrior(const std::string& n) : name(n), health(120) {}\n// 正确：\nWarrior::Warrior(const std::string& n) : Character(n, 120)\n{\n}",
      "language": "cpp",
      "id": "l13-base-init-error",
      "exampleId": "l13-base-init-error",
      "codeName": "片段 · 子类为什么不能直接name(n),health(120)",
      "bindings": [
        {
          "paragraph": 1,
          "text": "正确:Character(n,120)",
          "lines": [
            4
          ]
        }
      ]
    },
    {
      "title": "构造时间线：先父类，后子类成员",
      "paragraphs": [
        "创建Mage先构造Character，让name、health有效；再初始化Mage自己的mana；最后执行Mage构造函数体。父类构造不能移到函数体里当普通操作补做。",
        "父类无无参构造，子类必须提供可用基类构造调用。完整Mage对象内部含基类部分和派生部分，不是两个彼此无关的角色。生命成员只在Character部分保存一份，不要在Mage再建一个同名health来冒充初始化。"
      ],
      "id": "l13-construction-order",
      "exampleId": "l13-derived-constructor"
    },
    {
      "title": "父类引用参数：接收不同职业目标",
      "paragraphs": [
        "Mage公开继承Character，因此Mage对象可绑定Character&。目标只需takeDamage共同接口，战士不用知道对方有没有mana。引用保证扣原目标而非副本。",
        "powerAttack末尾const，因为不改战士自身；castSpell会改法师mana，没有const。依据始终是当前对象是否修改，不是攻击一词听起来是否代表写操作。"
      ],
      "code": "void Warrior::powerAttack(Character& target) const\n{\n    if (!isAlive()) return;\n    std::cout << getName() << \" uses Power Attack!\\n\";\n    target.takeDamage(35);\n}",
      "language": "cpp",
      "id": "l13-warrior-attack",
      "exampleId": "l13-warrior-attack",
      "codeName": "片段 · powerAttack接受Character&，为什么能攻击Mage",
      "bindings": [
        {
          "paragraph": 1,
          "text": "powerAttack末尾const",
          "lines": [
            1
          ]
        }
      ]
    },
    {
      "title": "法师专有数据如何配合共同接口",
      "paragraphs": [
        "castSpell先用继承的isAlive检查自己，再检查mana>=20。全部满足才扣20并伤害40。失败路径应保持状态，不应先扣蓝再发现无法行动。",
        "manaCost和spellDamage局部const表达固定技能规则。现在先明确顺序和对象边界；以后技能配置可以独立，不必急着把每个数字抽成复杂系统。getMana只属于Mage，也不必强迫战士拥有同名查询。"
      ],
      "code": "void Mage::castSpell(Character& target)\n{\n    const int manaCost = 20;\n    const int spellDamage = 40;\n    if (!isAlive()) return;\n    if (mana < manaCost) return;\n    mana -= manaCost;\n    target.takeDamage(spellDamage);\n}",
      "language": "cpp",
      "id": "l13-mage-spell",
      "exampleId": "l13-mage-spell",
      "codeName": "片段 · 法师专有数据如何配合共同接口",
      "bindings": [
        {
          "paragraph": 0,
          "text": "全部满足才扣20并伤害40",
          "lines": [
            5,
            6,
            7,
            8
          ]
        }
      ]
    },
    {
      "title": "两轮后的准确值，不要混同完整战斗终局",
      "paragraphs": [
        "你第十三课main固定两组攻击。初始Arthur120、Merlin80、mana100。第一组后Arthur80、Merlin45、mana80；第二组后Arthur40、Merlin10、mana60。",
        "没有第三次攻击，因此Merlin仍活着。第十四课battle会继续到Merlin0，不能把那个结果当本课输出。相同职业数值，控制顺序与循环条件不同，终局就不同。"
      ],
      "table": {
        "headers": [
          "阶段",
          "Arthur HP",
          "Merlin HP",
          "Merlin mana"
        ],
        "rows": [
          [
            "初始",
            "120",
            "80",
            "100"
          ],
          [
            "第1组",
            "80",
            "45",
            "80"
          ],
          [
            "第2组",
            "40",
            "10",
            "60"
          ]
        ]
      },
      "id": "l13-trace",
      "exampleId": "l13-mage-spell"
    },
    {
      "title": "遗留问题：控制器仍要认识职业",
      "paragraphs": [
        "目标已能统一为Character&，攻击者却要分别调用powerAttack、castSpell。只拿到Character& attacker时，父类没有共同attack接口，控制器无从选择函数名。",
        "若按职业字符串写if/else，每增加Archer都要改控制器。下一课先统一attack，再解释为什么同名还不够，需要virtual按真实对象选择实现。继承解决共同类型，多态进一步解决共同调用。"
      ],
      "id": "l13-next-interface",
      "exampleId": "l13-warrior-attack"
    },
    {
      "title": "练习：讲清初始化和行为边界",
      "paragraphs": [
        "打开exercises/lesson13，用调试器进入两个构造，写出名字和生命传递链，再确认两轮40、10、60。故意尝试子类直接初始化父类成员，观察错误后恢复。",
        "记忆重点：**继承表达is-a；初始化父类部分调用父类构造；形参名字只是接收点，公开接口决定外部能做什么。**",
        "下一课先定义virtual等语法，再让共同攻击接口选择具体职业实现。"
      ],
      "id": "l13-practice",
      "exampleId": "l13-constructor-chain"
    }
  ]
};
