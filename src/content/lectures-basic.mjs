/** 详细讲义，以学习者已有练习与历史教学对话为主线。短代码注明上下文，完整程序见 reference。 */
const cpp = (...lines) => lines.join('\n');
const s = (title, paragraphs, code, extra = {}) => ({ title, paragraphs, ...(code ? { code, language: 'cpp' } : {}), ...extra });
export const basicLectures = {
  1: [
    s('从个人名片开始：程序究竟做了什么', [
      '你的第一份代码依次读取姓名、年龄、身高，再打印出来。先把它理解成一条数据流水线：键盘提供输入，变量暂存输入，表达式完成计算，输出流把结果写到终端。游戏角色创建界面也是同样的过程，只是键盘与控制台以后会被按钮、输入框和角色 UI 替换。',
      '这一课先不要同时追求复杂画面和复杂规则。目标是能指出每条语句在什么时候执行、读写哪个变量，并能在修改输入后预测输出。源文件、编译器和运行中的程序是三个不同东西：保存文件只保存了文本，编译成功才得到可执行文件。'
    ]),
    s('从源代码到执行：编辑器、编译器、终端各管什么', [
      'VS Code 帮你编辑文本、启动任务和显示错误；C/C++ 扩展提供补全与调试入口；真正检查 C++ 语法并生成机器代码的是编译器，例如 g++ 或 clang++。安装扩展不等于安装编译器，代码没有保存时，编译器读到的也可能还是旧文件。',
      '编译通常包含预处理、编译、链接等步骤。语法错误或找不到函数定义会阻止生成程序；只有运行程序，才会出现输入提示并等待键盘。程序运行后仍可能有逻辑错误，例如把年龄当成身高输出。'
    ], cpp('#include <iostream>', '#include <string>', 'int main()', '{', '    std::cout << "Hello, C++!\\n";', '    return 0;', '}')),
    s('逐项读懂最小程序，而不是背整段模板', [
      '#include <iostream> 让当前源文件能够使用标准输入输出设施的声明；#include <string> 提供 std::string。它们发生在预处理阶段，不是运行时先调用两个库函数。std:: 是名字所属的命名空间，std::cout 与你自己起的同名变量因此不会混为一谈。',
      'int main() 是普通控制台程序的入口函数：int 表示返回给运行环境的整数状态；main 是规定的入口名字；() 表示这里不接收参数；大括号界定函数体。return 0 表示成功结束。main 到达结尾也相当于返回 0，但初学时显式写出有助于观察流程。简单语句后的分号表示这条语句结束。'
    ]),
    s('变量为什么需要类型和初始值', [
      '变量是有名字的对象，类型规定了它能表达的值与允许的操作。姓名是文本，用 std::string；年龄通常是整数，用 int；以米表示的身高可能含小数，用 double。类型选择取决于数据含义，而不是看上去都是一串字符。',
      '你的原始练习中 age 和 height 在输入前没有显式初始化。成功输入会给它们赋值，但输入失败时不应继续把它们当作有效数据。新的示例先初始化，再检查输入是否成功。std::string 的默认构造会产生空字符串。'
    ], cpp('std::string name;', 'int age = 0;', 'double height = 0.0;', 'bool isAlive = true;')),
    s('cin 与 cout：方向表达数据流向', [
      'std::cin >> name 把输入流中的文本读取到 name；std::cout << name 把 name 的值写到输出流。连续使用运算符会从左到右组合，例如 cin >> name >> age >> height 按同样顺序读取三个值。空格或换行通常都可作为这些格式化输入之间的分隔。',
      'std::string 配合 >> 一次只读到空白前的一个单词，所以 Arthur Pendragon 不能用这条语句完整读进 name，后续年龄输入也会因此错位。读取整行会在字符串课程讲 getline。输出中的 "\\n" 是换行转义序列，不会显示为反斜杠加字母 n。'
    ], cpp('std::cout << "Enter name, age, height: ";', 'if (!(std::cin >> name >> age >> height))', '{', '    std::cout << "Invalid input\\n";', '    return 1;', '}')),
    s('表达式计算值，赋值才会修改保存的值', [
      'age + 2 的含义是取 age 当前的值参与加法，得到一个结果。它不会顺便把 age 增加 2。如果输入年龄 18，输出 age + 2 得到 20，此后再输出 age 仍然得到 18。',
      'age = age + 2 才会先计算右侧，再把结果存回左侧对象。等号在这里是赋值，不是数学证明里的恒等关系。以后攻击角色时 health - damage 与 health = health - damage 的差别也完全相同：前者只计算，后者改变角色状态。'
    ], cpp('int age = 18;', 'std::cout << age + 2 << "\\n"; // 20', 'std::cout << age << "\\n"; // 18', 'age = age + 2;', 'std::cout << age << "\\n"; // 20')),
    s('把你原来的名片练习逐句串起来', [
      '运行先进入 main，准备三个变量，输出提示，然后在 cin 处等待输入。输入 Arthur 18 1.75 后，三个变量分别持有文本 Arthur、整数 18、小数 1.75；后面的三次 cout 读取这些值而不改变它们。终端显示的标签来自双引号中的固定文本。',
      '检查代码时，把固定文本和变量分开看："Name: " 是每次相同的标签，name 是本次输入。把 name 写在双引号里会输出单词 name，而不是变量内容。字符串用双引号；单个字符可以用单引号，两者不是同一类型。'
    ], cpp('#include <iostream>', '#include <string>', 'int main()', '{', '    std::string name;', '    int age = 0;', '    double height = 0.0;', '    if (!(std::cin >> name >> age >> height)) return 1;', '    std::cout << "Name: " << name << "\\n";', '    std::cout << "Age: " << age << "\\n";', '    std::cout << "Height: " << height << "\\n";', '    return 0;', '}')),
    s('如何看第一条报错，如何区分三类问题', [
      '少写分号、把 std::string 拼错，通常在编译阶段报错。只声明一个普通函数却没有提供定义，可能在链接阶段提示 undefined reference。程序能运行却打印错误年龄，则是逻辑问题。先确定问题发生在哪一阶段，再选择检查方式。',
      '编译器经常在真正错误之后的位置才发现问题，所以从最靠前的诊断开始，并查看它前面一两行。修正首个原因后重新编译，后续诊断可能自然消失。不要看到多个错误就一次重写全部代码。'
    ]),
    s('连接到游戏，并完成本课自查', [
      '将 name、age、height 换成 characterName、level、health，就得到最小角色属性面板。底层数据不依赖控制台；将来角色类负责管理状态，UI 负责展示状态。现在先保持输入、存储、显示三件事清楚，后续才容易把它们拆开。',
      '在 exercises/lesson01 保留自己的名片代码。自行增加一行两年后的年龄，比较计算表达式与赋值，再故意输入非数字年龄观察失败路径。完整参考解答放在 reference 子目录。记忆重点：**编辑不等于编译，编译不等于运行；表达式不自动修改变量。**'
    ])
  ],
  2: [
    s('回顾名片：类型会改变运算规则', [
      '上一课用 int 表示年龄、double 表示身高。这不是显示格式上的区别：类型会改变参与运算时采用的规则。你这一课的总秒数转换器正好能观察整数除法，因为整小时和不足一小时的余数需要分开处理。',
      '需求是输入非负总秒数，输出完整小时、小时之后的完整分钟、最后剩余秒数。不要一上来寻找公式；先问每个数的单位是什么，能避免把总分钟误当成时钟中的分钟部分。'
    ]),
    s('整数除法为什么会截掉小数', [
      '当 / 两边都是整数时，C++ 执行整数除法，结果的小数部分向零截断。3661 / 3600 得到 1，因为这里只需要完整的小时数。5 / 2 得到 2，-5 / 2 得到 -2；不要泛化成总是向下取整。',
      '如果需要平均分或每秒移动距离，整数除法可能丢掉你需要的信息。必须在除法发生之前，使至少一个操作数成为浮点数。把已经得到的整数结果再转成 double，只会得到 2.0，无法还原 2.5。'
    ], cpp('std::cout << 5 / 2 << "\\n";', 'std::cout << 5.0 / 2 << "\\n";', 'std::cout << static_cast<double>(5) / 2 << "\\n";', 'std::cout << static_cast<double>(5 / 2) << "\\n";')),
    s('取余怎样留下没凑满一个单位的部分', [
      '对于本课的非负整数，a % b 表示 a 中去掉所有完整 b 后还剩多少。3661 % 3600 是 61，它不是还剩 61 小时，而是还剩 61 秒。/ 负责完整单位，% 负责同一原始单位中的剩余量。',
      '整数余数与除法满足 a == (a / b) * b + a % b，前提是该整数运算可表示且 b 不为 0。除数为 0 是错误，不会自动得到 0。浮点数不能直接使用整数 % 运算符。'
    ], cpp('int totalSeconds = 3661;', 'int hours = totalSeconds / 3600; // 1', 'int remainingSeconds = totalSeconds % 3600; // 61', 'int minutes = remainingSeconds / 60; // 1', 'int seconds = remainingSeconds % 60; // 1')),
    s('沿用你的中间变量，逐步建立单位转换', [
      '你的代码保留 remainingSeconds，非常适合追踪状态。第一步得到 1 小时和 61 秒，第二步才把这 61 秒拆成 1 分钟和 1 秒。直接写 totalSeconds / 60 会得到总分钟 61，而不是应显示的分钟部分 1。',
      '带单位的变量名很有价值。游戏里的 position、speed、time 都可能使用不同单位，如果把毫秒当成秒参与移动公式，即使语法正确，角色也可能移动快一千倍。类型检查不能替你验证全部业务单位。'
    ], undefined, {table:{headers:['阶段','使用的量','结果','单位'],rows:[['整小时','3661 / 3600','1','小时'],['去掉整小时','3661 % 3600','61','秒'],['剩余整分钟','61 / 60','1','分钟'],['最终剩余','61 % 60','1','秒']]}}),
    s('变量、常量与字面量分别是什么', [
      '3600 是直接写下的整数字面量。给它起名 secondsPerHour，可以把为什么除以这个数写进代码。const 表示对象初始化之后不能再通过正常赋值改变，编译器会阻止 secondsPerHour = 60 这样的误写。',
      'const int hours = totalSeconds / secondsPerHour 不要求输入在编译时确定；它只是说这次算出的 hours 不再修改。不要把 const 一概理解成必须在编译时知道。更严格的编译期常量表达式涉及 constexpr，后续再分辨。'
    ], cpp('const int secondsPerMinute = 60;', 'const int secondsPerHour = 60 * secondsPerMinute;', 'int totalSeconds = 3661;', 'const int hours = totalSeconds / secondsPerHour;', 'const int rest = totalSeconds % secondsPerHour;')),
    s('赋值与复合赋值：冷却时间怎样变化', [
      'totalSeconds = totalSeconds + 1 表示在旧值基础上得到新值并存回原变量；totalSeconds += 1 是常用简写。-=、*=、/= 也遵循类似思路。单独计算 totalSeconds - 1 不会让倒计时减少。',
      '++x 和 x++ 都把 x 增加 1，但表达式本身的值不同：前者产生更新后的值，后者产生更新前的值。初学时把它们单独写成语句最清楚，不要在复杂表达式中多次修改同一变量。'
    ], cpp('int cooldown = 5;', 'cooldown -= 1; // 4', 'int before = cooldown++; // before=4, cooldown=5', 'int after = ++cooldown; // after=6, cooldown=6')),
    s('运算优先级不能代替可读性', [
      '乘、除、取余通常先于加减，因此 1 + 2 * 3 是 7。想表达先加再乘，就写 (1 + 2) * 3。连续同级运算也要逐项理解：total % 3600 / 60 等价于 (total % 3600) / 60。',
      '你的 remainingSeconds 中间量能让调试器直接显示去掉小时后剩余多少，这往往比记忆优先级更有帮助。游戏伤害公式也推荐为基础伤害、倍率、护甲减免各取名字。'
    ], cpp('int totalSeconds = 3661;', 'int wrongMinutes = totalSeconds / 60; // 61：总分钟', 'int correctMinutes = (totalSeconds % 3600) / 60; // 1', 'double average = static_cast<double>(185) / 2; // 92.5')),
    s('数值范围与输入边界：语法正确还不够', [
      'int 的范围有限，不能假定可以存下任意长的比赛时间。更大范围的整数类型同样有边界。对于有符号整数，运算超出可表示范围不是可靠的回绕机制，不能用来实现业务规则。',
      '本课先限制非负且在 int 可表示范围内的输入。负秒数含义尚未定义，直接拒绝更清楚。输入失败也要单独判断，避免继续使用无效数据。原始练习的有效输入路径可以保留，reference 展示如何补充防护。'
    ]),
    s('用边界验证转换器，再迁移到游戏时间', [
      '至少手算 0、59、60、3599、3600、3661。检查三个不变量：分钟在 0–59，秒在 0–59，hours*3600 + minutes*60 + seconds 等于原输入。一次漂亮样例不能证明单位转换无误。',
      '在 exercises/lesson02 对照自己的 remainingSeconds 写法。可选挑战是比赛时钟补零，但先确认数值正确。记忆重点：**整数除法取完整份数，取余保留剩余；想保留小数，要在除法前转换。**'
    ])
  ],
  3: [
    s('从计算固定结果，走向根据状态选择动作', [
      '秒数转换无论输入什么，计算步骤基本一致。电影票价格却需要看年龄和会员状态：0–5 岁免费，6–17 岁半价，18–59 岁原价，60 岁及以上为原价三分之一；非免费票的会员再减 5 元。这些规则来自你自己的 lesson3.cpp。',
      '游戏里同样经常有条件：角色死亡不能攻击，法力不足不能施法，目标在范围内才能交互。条件语句把规则变成可执行分支，但写了 if 不代表边界与优惠顺序就正确。先画清楚规则表，再写语法。'
    ]),
    s('if 的条件是一个真假问题', [
      'if (age < 0) 先求括号中表达式的真假，为真才执行紧接着的大括号。比较运算符包括 <、<=、>、>=、==、!=；比较结果可以保存为 bool。bool 的 true 和 false 分别表达真与假。',
      '= 是赋值，== 才是相等判断。if (age = 18) 会先把 age 改成 18，再把非零整数转换成 true，因此逻辑完全不同；编译器警告能帮助发现这类问题。即使分支只有一行，保留大括号也方便后续修改。'
    ], cpp('int age = 17;', 'bool isTeen = age >= 6 && age <= 17;', 'if (isTeen)', '{', '    std::cout << "Half price\\n";', '}')),
    s('为什么必须先处理无效输入', [
      '年龄小于 0 不属于任何正常票价区间。先处理它，可以让后续分支专注有效年龄。你的代码已经先写 age < 0，这是正确的组织顺序；不要把所有 age < 6 都归为免费，否则负年龄也会被放行。',
      '输入非数字与输入负数字不是同一问题。前者是输入流没能得到整数，后者是得到了整数但业务不接受。reference 补足输入失败路径，原来的有效输入规则保持不变。'
    ], cpp('int age = 0;', 'bool isMember = false;', 'if (!(std::cin >> age >> isMember))', '{', '    std::cout << "Invalid input\\n";', '    return 1;', '}', 'if (age < 0)', '{', '    std::cout << "age is invalid\\n";', '    return 0;', '}')),
    s('else if 链为什么只会选中一条路径', [
      'if / else if / else 是互斥选择链，从上到下找到第一个成立条件后执行对应分支，并跳过后面的分支。你可以按完整区间逐个写，也可以利用前面分支已经排除的事实简化后面条件。',
      '多个独立 if 会各自判断。例如先用 if (age <= 17) 给半价，再用 if (age >= 6) 恢复原价，17 岁可能两段都执行。判断应该只选一个价格还是多项独立效果可叠加，决定要用哪种结构。'
    ], cpp('double price = 50.0;', 'if (age <= 5) price = 0.0;', 'else if (age <= 17) price /= 2.0;', 'else if (age <= 59) { /* 原价 */ }', 'else price /= 3.0;')),
    s('&&、||、!：组合条件也有执行顺序', [
      '&& 表示同时满足，|| 表示至少满足一个，! 表示取反。6 <= age <= 17 不是 C++ 的区间写法：它会先算 6 <= age 得到 bool，再拿 0 或 1 与 17 比较，几乎总是得到真。正确写法是 age >= 6 && age <= 17。',
      '&& 与 || 会短路。age >= 6 不成立时，&& 的右边无需再求值。后面学指针会利用 pointer != nullptr && pointer->isAlive()，先确认对象存在，再访问对象。这里先记住条件不一定两边都执行。'
    ], cpp('bool childOrSenior = age <= 5 || age >= 60;', 'bool paidMember = isMember && age >= 6;', 'bool cannotEnter = !(age >= 0);', '// 错误示意，勿作为区间判断：6 <= age <= 17')),
    s('会员折扣为什么是第二层判断', [
      '年龄决定基础票价，会员决定是否在非免费票上再减 5。这是两个维度。你的原代码在每个付费年龄分支里嵌套 if (isMember)，准确表达顺序：先半价或三分之一，再减 5。',
      '也可以先算年龄票价，再统一判断会员，但必须排除免费年龄。否则 0 元再减 5 会变成负价格。重构不是只减少重复行数，还必须保持原规则，尤其检查免费票、优惠叠加和最终价格。'
    ], cpp('double price = 50.0;', 'if (age <= 5) price = 0.0;', 'else if (age <= 17) price /= 2.0;', 'else if (age >= 60) price /= 3.0;', 'if (age >= 6 && isMember)', '{', '    price -= 5.0;', '}')),
    s('逐步追踪 17 岁会员，而不是只看最终数字', [
      'age=17、isMember=true：先排除负年龄和免费区间，进入 6–17 岁分支，50/2 得到 25；会员分支再执行 25-5，最终 20。输入 18 岁会员则不半价，得到 45。',
      '60 岁会员得到 50.0/3.0-5.0，约 11.6667；使用 double 会保留小数。如果 price 是 int，三分之一就会截断。真实售票系统还需规定货币舍入方式，本课先研究分支与浮点运算，不把默认小数显示当成财务规则。'
    ], undefined, {table:{headers:['年龄','非会员','会员','覆盖的边界'],rows:[['5','免费','免费','免费上界'],['6','25','20','半价下界'],['17','25','20','半价上界'],['18','50','45','原价下界'],['59','50','45','原价上界'],['60','约16.6667','约11.6667','老人票下界']]}}),
    s('把票价逻辑迁移成角色状态判断', [
      '角色血量可以按 health <= 0、health < 30、其他三个分支显示死亡、危险和正常。先判断死亡，否则 health=-5 也满足 health<30，会被误判为低血量。',
      '关键仍是区间是否重叠、顺序是否合理，以及一轮是否允许多条规则同时执行。死亡状态与中毒效果可能是独立标记，就不一定放进同一条互斥链。条件结构要表达规则，而不是反过来迁就已经写下的 if。'
    ], cpp('int health = 0;', 'if (health <= 0) std::cout << "Defeated\\n";', 'else if (health < 30) std::cout << "Low health\\n";', 'else std::cout << "Healthy\\n";')),
    s('练习验收：边界前后各试一次', [
      '打开 exercises/lesson03，先不改代码，预测 -1、0、5、6、17、18、59、60 的输出，再分别测试会员与非会员。能解释为什么恰好 17 岁仍走半价，比记住 if 的拼写更重要。',
      '完成后再尝试把重复会员判断提取到分支之后，验证每个原样例保持一致。记忆重点：**条件表达真假，分支组织规则；互斥用链，叠加用独立判断，边界决定对错。**'
    ])
  ],
  4: [
    s('从一次判断，到有规律地重复', [
      '上一课一次输入只决定一次票价。本课要计算 1 到 n 的和，打印偶数并统计数量。你的原始代码用 while 请求正整数、两个 for 分别求和与打印偶数，这正好展示重复次数未知和范围明确两种场景。',
      '不要把循环理解成复制很多行。循环保存一份操作，通过变化的状态决定下一轮是否继续。每个循环都要回答：从哪里开始，什么时候继续，怎样向结束推进。'
    ]),
    s('while 为什么先判断，再执行循环体', [
      'while (n <= 0) 的意思是：只要当前 n 仍然无效，就再次提示输入。输入初次就是 3 时，循环体一次都不执行；输入 -2、0、3 时，循环体执行两次，第三个值使条件变为假。',
      '如果忘记再次读取 n，条件依赖的数据不变，就会无限打印。输入 abc 后流进入失败状态，后续 >> 也不能正常读数；reference 先检查流状态并退出，不能只依赖 n<=0。'
    ], cpp('int n = 0;', 'if (!(std::cin >> n)) return 1;', 'while (n <= 0)', '{', '    std::cout << "Please enter a positive integer: ";', '    if (!(std::cin >> n)) return 1;', '}')),
    s('逐项拆开 for 的三个区域', [
      'for (int i=1; i<=n; ++i) 中，初始化 int i=1 只执行一次；i<=n 在每次进入循环体前判断；++i 在每次循环体正常结束后执行。然后再次判断，而不是重新把 i 设为 1。',
      '你原作使用 i++ 也正确，因为这里不使用表达式产生的旧值。循环变量 i 在这个 for 的作用域内，后面的另一个 for 可以定义自己的 i。把推进动作放在第三部分，可以使轮次更容易看清。'
    ], cpp('int sum = 0;', 'for (int i = 1; i <= n; ++i)', '{', '    sum += i;', '}')),
    s('累加器为何必须放在循环外', [
      'sum 要保存前几轮的成果，所以在循环之前设为 0。每轮 sum += i 使用上轮留下的 sum。如果在循环体开头写 int sum=0，就每轮创建并重置新 sum，无法积累。',
      'n=3：i=1 时 sum 从 0 到 1；i=2 时从 1 到 3；i=3 时从 3 到 6；随后 i=4，4<=3 为假，退出。最后判断虽发生四次，循环体只执行三次。'
    ], undefined, {table:{headers:['条件检查时i','i<=3','sum变化','下一步'],rows:[['1','真','0→1','i增为2'],['2','真','1→3','i增为3'],['3','真','3→6','i增为4'],['4','假','仍为6','退出']]}}),
    s('取余怎样判断偶数，计数器怎样配合', [
      'i % 2 == 0 表示 i 能被 2 整除。条件成立时，你的代码既输出 i，又把 count 增加 1。count 记录符合条件的元素个数，不是偶数本身的总和。',
      'n=5 时检查 1、2、3、4、5，但只有 2 和 4 进入 if，因此 count=2。把 count++ 放在 if 外会得到 5，这是重复结构正确、业务位置错误的典型例子。'
    ], cpp('int count = 0;', 'for (int i = 1; i <= n; ++i)', '{', '    if (i % 2 == 0)', '    {', '        std::cout << i << " ";', '        ++count;', '    }', '}')),
    s('差一错误：<= 与 < 到底怎么选', [
      '求 1 到 n 的和包括 n，所以 i 从 1 起并使用 i<=n。遍历含 count 个元素的容器，下标从 0 起，应使用 i<count，最后访问 count-1。两种写法都可能正确，要依据起点与终点。',
      '先问第一轮是多少、最后一轮应该是多少、一共多少轮，不要死记符号。n=1 是好样例：求和应执行一次，若写 i<n 则一次也不执行。'
    ], cpp('for (int value = 1; value <= 3; ++value)', '    std::cout << value << " "; // 1 2 3', 'for (int index = 0; index < 3; ++index)', '    std::cout << index << " "; // 0 1 2')),
    s('break 和 continue 改变哪一段流程', [
      'break 退出最近一层循环；continue 跳过本轮剩余语句。for 中 continue 后仍会执行第三部分再判断；while 中若把推进放在 continue 之后，它会被跳过，可能死循环。',
      '战斗中目标死亡后 break 可结束战斗；遍历物品时可 continue 跳过禁用物品。简单条件分支有时更容易读，不必为了使用新语法而使用。嵌套循环中的 break 不会自动退出外层。'
    ], cpp('for (int i = 1; i <= 5; ++i)', '{', '    if (i % 2 != 0) continue;', '    std::cout << i << " ";', '    if (i == 4) break;', '}')),
    s('战斗循环还要考虑双方都打不动', [
      'while (firstAlive && secondAlive) 只保证双方存活时继续，不保证生命值一定下降。如果双方伤害都是 0，条件永远不变。以后做战斗时，需要回合上限或无法推进判定保证结束。',
      '求和也要限制输入范围。int sum 存不下任意大的数学结果，循环过多也会耗时。reference 对输入提供约束；原作保留以记录当时实现，这些限制应作为后续改进理解。'
    ]),
    s('练习：先手算，再单步观察状态', [
      '在 exercises/lesson04 用调试器观察 n=5 的 i、sum、count。预期和 15，偶数 2 4，数量 2。再输入 1，应和为 1 且没有偶数；测试 0 后输入 3，观察 while 的重试。',
      '先确认三种状态在哪里初始化、在哪里修改，再增加需求。记忆重点：**循环不仅要能重复，还要会推进、能退出；累加器放在多轮共享的作用域里。**'
    ])
  ],
  5: [
    s('为什么把上一课拆成四个函数', [
      '你的 lesson5.cpp 把循环练习拆成 readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers。main 直接描述业务顺序：读数、计算总和、统计偶数、展示结果。函数把明确动作命名，不只是减少代码行数。',
      '如果所有细节都在 main，查找偶数统计问题时就得穿过输入与输出代码。拆分后可以独立检查 countEvenNumbers，同一个求和函数也能被别的流程调用。接口先说清输入和输出，内部再选择实现。'
    ]),
    s('声明写在 main 前，为什么却不先运行', [
      'int calculateSum(int n); 是函数声明：告诉编译器名字、参数与返回类型，没有函数体，不产生调用。程序仍从 main 开始执行。源文件书写顺序不等于运行顺序，这正是你之前特别问过的疑点。',
      'int calculateSum(int n) { ... } 是定义，提供调用时执行的函数体；calculateSum(3) 才是调用。提前声明后，main 可调用在文本后面定义的函数。把完整定义放在 main 前也可以，只是组织方式不同。'
    ], cpp('int calculateSum(int n); // 声明，不执行', 'int main()', '{', '    int sum = calculateSum(3); // 此处才调用', '    std::cout << sum << "\\n";', '}', 'int calculateSum(int n) // 定义', '{', '    int sum = 0;', '    for (int i = 1; i <= n; ++i) sum += i;', '    return sum;', '}')),
    s('逐项拆解函数签名和参数', [
      'int calculateSum(int n) 中第一个 int 是返回类型，calculateSum 是函数名，括号内 int n 是形参声明。调用 calculateSum(number) 时，number 是实参；它当前的值用于初始化本次调用自己的 n。',
      '按值参数 n 是独立局部对象，不是调用者变量的新名字。实参叫 number、形参叫 n 完全可以；匹配依靠位置与类型，不依靠名字相同。多个函数都可以有 n，因为它们属于不同局部作用域。'
    ], cpp('int addOne(int value)', '{', '    value += 1;', '    return value;', '}', '// main内：', '// int number = 3;', '// int result = addOne(number); // number仍为3，result为4')),
    s('return 不是打印，而是把值交回调用位置', [
      'calculateSum(3) 内部得到 6，return sum 结束本次调用，并使调用表达式的值为 6。于是 int sum=calculateSum(3) 用它初始化 main 自己的 sum。函数内外同名的两个 sum 不是同一对象。',
      'cout 负责显示，return 负责把数据交给调用者。计算函数可以完全不输出，调用者自行决定显示、保存还是继续计算。游戏伤害计算与 UI 显示也需要区分数据结果与展示副作用。'
    ], cpp('int calculateSum(int n)', '{', '    int sum = 0;', '    for (int i = 1; i <= n; ++i) sum += i;', '    return sum;', '}', '// int answer = calculateSum(3);', '// std::cout << answer << "\\n";')),
    s('void 为什么适合打印函数', [
      'printEvenNumbers 的职责是产生输出，没有数值需要交回，返回类型写 void；countEvenNumbers 返回个数，适合写 int。函数做了事不代表必须返回数据，输出内容也不等于返回值。',
      'void 函数可用 return; 提前结束，但不能 return 一个整数。返回 int 的普通函数在需要交回结果的正常路径上应返回值；main 结尾的特殊规则不能套给全部函数。print、calculate、read 这样的名字还能提示各自职责。'
    ], cpp('void printEvenNumbers(int n)', '{', '    if (n <= 0) return;', '    for (int i = 1; i <= n; ++i)', '    {', '        if (i % 2 == 0) std::cout << i << " ";', '    }', '    std::cout << "\\n";', '}')),
    s('完整追踪 main 与调用栈', [
      '执行 int n=readPositiveNumber() 时，main 在初始化表达式处等待；程序进入读取函数，得到有效正数并 return，才继续 calculateSum(n)。返回后又调用 countEvenNumbers，最后依次输出。',
      '调用栈可以理解成当前函数及其返回位置的记录。进入函数不代表 main 从头重来，return 也不代表整个程序结束。调试时 Step Into 进入函数，Step Over 执行调用并停在调用者下一步，能直观看见区别。'
    ], undefined, {table:{headers:['main位置','正在执行','返回结果'],rows:[['readPositiveNumber()','输入校验','n=5'],['calculateSum(n)','累加1…5','sum=15'],['countEvenNumbers(n)','检查每个数','evenCount=2'],['printEvenNumbers(n)','输出2 4','无数值，继续main']]}}),
    s('作用域和生命周期不是变量名还记得就能用', [
      '局部变量只在所属作用域内可见，离开作用域后通常也结束生命周期。函数调用结束后，其普通局部 sum 不存在，但返回的整数值已交给调用者，main 的 sum 可以继续保存它。',
      '不能返回局部变量的引用或地址来省去整数复制：调用结束后引用或指针指向已失效对象。下一课容器、后面的引用与指针会深入讨论。本课用普通值返回计算结果，足够清楚且安全。'
    ], cpp('int countEvenNumbers(int n)', '{', '    int count = 0;', '    for (int i = 1; i <= n; ++i)', '        if (i % 2 == 0) ++count;', '    return count;', '}')),
    s('声明、定义、调用三处怎样一起核对', [
      '声明 int calculateSum(int)，定义却写 void calculateSum(int)，会形成不兼容声明。声明存在而定义拼成另一个名字，最后可能在链接时找不到原函数定义。',
      '调用必须提供兼容的参数数量与类型。先列接口，再写最小实现，最后接入 main，比一次粘贴全部代码更易定位。下一课会在 const 引用是否一致上再次遇到这个原则。'
    ]),
    s('练习：把已有函数当作可验证的小工具', [
      '在 exercises/lesson05 保留四函数结构。calculateSum 测试 1→1、3→6、5→15；countEvenNumbers 测试 1→0、2→1、5→2。再解释 printEvenNumbers 为什么可以没有数值返回。',
      '游戏中可先写 calculateDamage 返回数值，再由调用者更新 health。记忆重点：**声明描述接口，定义提供实现，调用触发执行；返回值回到调用位置，打印只是输出副作用。**'
    ])
  ],
  6: [
    s('一个变量装不下整班成绩：为什么要用容器', [
      '上一课一个 n 足以表示输入上限，但本课人数在运行时才知道，还要保留每个学生分数用于打印、总分、平均、最高和最低。定义 score1、score2 无法应对任意人数，各种统计也会重复许多代码。',
      '你的 lesson6.cpp 使用 std::vector<int> scores：一组按顺序排列的 int 元素，由容器管理存储和大小。游戏背包物品、队伍生命值也有类似需求。本课先用整数，分清数据结构和统计过程。'
    ]),
    s('数组、string、vector 都是序列，用途却不同', [
      'int scores[3] 包含 3 个 int 的固定数组，数量是类型的一部分，不能 push_back。std::vector<int> 是标准库动态序列，元素类型在尖括号内，运行时可追加元素。std::string 专门管理文本，不等于任意类型的 vector。',
      '使用 vector 需包含 <vector>，string 需 <string>，不应依赖其他头文件碰巧间接包含它们。两者都可用 size 与下标，但多字节编码中的人类字符数不一定等于 string::size()。'
    ], cpp('#include <string>', '#include <vector>', 'int fixedScores[3] = {80, 90, 100};', 'std::vector<int> scores;', 'std::string playerName = "Arthur";')),
    s('push_back 为什么放在输入校验之后', [
      'scores 初始为空，size()==0。push_back(score) 在末尾构造新元素，使 size 增加 1。你的循环先确认分数在 0–100 再追加，因此容器里只保存接受的有效值。',
      '局部 score 每轮读取输入，push_back 保存一个独立 int 值。下一轮改变 score，不会改变上一轮已经放进容器的元素。这里复制的是数值，不是把所有元素都连接到同一个局部变量。'
    ], cpp('std::vector<int> scores;', 'scores.push_back(80); // size=1', 'scores.push_back(90); // size=2', 'scores.push_back(100); // [80,90,100]，size=3')),
    s('下标从 0 开始，size 不是最后一个下标', [
      '3 个元素下标为 0、1、2，最后下标是 size()-1；scores[3] 越界。operator[] 通常不检查边界，越界不是自动返回 0，而是未定义行为，可能崩溃也可能看似运行。',
      'scores.at(index) 会检查范围，越界时抛出异常，但仍应设计正确索引。本课先在 scores[0] 前确保非空，不把异常机制当正常统计流程。无需下标时范围 for 更直接。'
    ], cpp('std::vector<int> scores{80, 90, 100};', 'std::cout << scores[0] << "\\n";', 'for (int score : scores)', '{', '    std::cout << score << " ";', '}', '// scores[3]越界，不要执行。')),
    s('总分与平均：先得到数值，再选择除法规则', [
      'calculateTotalScore 从 0 累加每个元素。平均分的分子是总分，分母是元素数量。你已使用 static_cast<double>(sum) / scores.size()，让除法在浮点规则下发生，不会先截断。',
      '空集合平均值没有普通数值含义，不能除以 0。原练习通过 readStudentCount 保证正人数；但统计函数若被独立复用，还应明确空集合约定。不能把某个 main 的输入约束误当成函数自身永远成立的事实。'
    ], cpp('int total = 0;', 'for (int score : scores) total += score;', 'if (!scores.empty())', '{', '    double average = static_cast<double>(total) / scores.size();', '    std::cout << average << "\\n";', '}')),
    s('最高最低为什么从第一个有效元素出发', [
      '你的最高最低函数先取 scores[0]，再逐个比较，让目前已知的最佳值从真实元素开始。扫描 80、90、100 时最高变为 80、90、100，最低一直为 80。',
      '最高固定设 0 在非负分数中可能碰巧有效，对全负数却不对；最低固定设 0 对正分数也会错。使用真实首元素减少对取值范围的依赖，前提仍是容器非空。'
    ], cpp('int highest = scores[0]; // 前置条件：非空', 'int lowest = scores[0];', 'for (int score : scores)', '{', '    if (score > highest) highest = score;', '    if (score < lowest) lowest = score;', '}')),
    s('历史代码的真实问题：声明与定义不一致', [
      '原文件顶部声明 printStudentScores(const std::vector<int>&)，底部定义却是 printStudentScores(std::vector<int>&)；calculateTotalScore、findHighestScore、findLowestScore 也有类似差别。main 调用时只看到了顶部声明，因此链接时会寻找那个 const 引用版本。',
      '这不是编译器不理解你的意思，而是两个接口。保留原文件，在 reference 统一只读 const 引用。下一课将详细讲 & 和 const；这里先掌握改签名时声明与定义必须同步。形参名字可以不同，参数类型不能随意不同。'
    ], cpp('int calculateTotalScore(const std::vector<int>& scores);', 'int calculateTotalScore(const std::vector<int>& scores)', '{', '    int total = 0;', '    for (int score : scores) total += score;', '    return total;', '}')),
    s('size 与 capacity：有容量不代表有元素', [
      'size 是已存在元素数；capacity 是当前存储能容纳多少元素而不重新分配。reserve(10) 只预留容量，空容器仍没有第一个元素，不能 scores[0]；resize(10) 才改变大小并构造新增元素。',
      'push_back 超过容量时可能重新分配，旧元素迁移后，保存的指针、引用、迭代器可能失效。容量具体按几倍增长是实现策略，不是可写死的保证。后面结合指针与生命周期再深入。'
    ], cpp('std::vector<int> values;', 'values.reserve(10); // size仍为0', 'values.push_back(80); // size为1', 'values.resize(3); // int新增元素初始化为0', '// 元素为[80,0,0]，capacity可能大于3')),
    s('字符串：一个单词和一整行不同', [
      'cin >> name 遇空白停止；getline(cin,name) 读取整行并移除行结束分隔符。前面若用 >> 读数字，可能留下换行，直接 getline 就会读到空行。发生原因是输入流位置，不是字符串突然失效。',
      'getline(cin >> std::ws,name) 可先跳过前导空白，但也会跳过有意义的前导空格。若要精确保留空白，需按输入协议处理剩余换行。先理解原因，不要无解释地多写一次 getline。'
    ], cpp('std::string name;', 'std::getline(std::cin >> std::ws, name);', 'std::cout << "Name: " << name << "\\n";')),
    s('练习：核对真实文件，验证统计边界', [
      '在 exercises/lesson06 使用 3 个分数 80、90、100，预期总分 270、平均 90、最高 100、最低 80；单个分数 67 则四种统计应一致。用 0 人、-1 分、101 分观察输入校验。',
      '先阅读 reference 的签名修正，再自己修改练习，不覆盖历史记录。记忆重点：**vector 管理一组连续元素；访问前保证元素存在；统计函数的前置条件和声明一致性同样重要。**'
    ])
  ],
  7: [
    s('函数改了分数，为什么 main 中可能没变化', [
      '上一课统计函数只读成绩，本课 addBonus 要给原容器所有成绩加分。你的原数据为 65、78、92、100，加 10 后应为 75、88、100、100，而不是函数内变化、返回后又恢复。',
      '核心问题是函数操作一个独立副本，还是调用者持有的原对象。引用用于明确这种对象关系。先用一个 int 看明白，再推广到 vector，避免把引用仅仅背成一种性能优化。'
    ]),
    s('按值传递得到独立形参对象', [
      'void change(int value) 中 value 用实参当前值初始化，是本次调用自己的对象。value=0 不会改调用者的 health。对 int 这样的小值，复制通常简单高效，按值传递不是坏做法。',
      'vector 按值传递会创建独立容器，通常复制元素。只打印或统计时复制没有必要；若确实需要独立修改副本，按值可能正合适。应依据语义选择，而不是无条件避免所有复制。'
    ], cpp('void changeCopy(int value)', '{', '    value = 0;', '}', '// main内：', '// int health = 100;', '// changeCopy(health);', '// health仍为100')),
    s('引用是对象的别名，& 在声明中表示绑定', [
      'int& alias=health 定义引用并绑定已有的 health。通过 alias 读写，就是对同一 int 读写。这里 & 是类型声明的一部分，与下一课表达式 &health 取地址不同，要看出现的位置。',
      '引用必须初始化，普通引用没有未绑定后等待重新绑定的状态。alias=other 把 other 的值赋给 health，不会让 alias 转而引用 other。引用也不自动保证目标始终活着。'
    ], cpp('int health = 100;', 'int& alias = health;', 'alias -= 30; // health变为70', 'int other = 20;', 'alias = other; // health变为20，引用关系未改')),
    s('修改整个容器，需要形参也使用引用', [
      'void addBonus(std::vector<int>& scores,int bonus) 使 scores 绑定调用者容器。bonus 仍按值，因为函数只需要增量，不需要修改调用者存放的 bonus。',
      'const 与 & 都是接口的一部分。vector<int>& 表示可能修改原容器；vector<int> 表示独立副本；const vector<int>& 表示通过该接口只读。函数实现必须兑现接口含义。'
    ], cpp('void addBonus(std::vector<int>& scores, int bonus)', '{', '    for (int& score : scores)', '    {', '        score += bonus;', '        if (score > 100) score = 100;', '    }', '}')),
    s('为什么范围 for 内还要再写一个 &', [
      '参数的 & 保证操作原容器，但 for (int score:scores) 仍会把每个元素复制到局部 score。修改局部值不写回原容器，因此你的原作正确使用 for (int& score:scores)。',
      '两层引用解决两层问题：外层避免复制容器，内层让赋值落在元素本身。只读 int 可按值；较大元素常用 const auto&，auto 是根据元素推导静态类型，不是动态类型。'
    ], cpp('// 修改副本，原scores不变：', 'for (int score : scores) score += 10;', '// 修改原元素：', 'for (int& score : scores) score += 10;', '// 只读访问：', 'for (const int& score : scores) std::cout << score << " ";')),
    s('const 引用承诺什么，没有承诺什么', [
      'const std::vector<int>& 避免复制，并禁止通过此参数修改元素或调用修改容器的成员函数。printScores 与 calculateAverage 不应改变分数，你用这种接口非常合理。',
      'const 不保证对象在整个程序中从未被其他非 const 访问路径修改，也不是线程同步工具。它约束通过当前路径允许做什么。对象销毁后引用仍会悬空，const 不能修复生命周期。'
    ], cpp('void printScores(const std::vector<int>& scores)', '{', '    for (int score : scores) std::cout << score << " ";', '    std::cout << "\\n";', '    // scores.push_back(90); // 编译错误', '}')),
    s('追踪你的分数与平均值', [
      '初始 [65,78,92,100]，bonus=10。第 1 次 score 绑定 65，改为 75；第 2 次 78→88；第 3 次 92→102 后封顶 100；第 4 次 100→110 后封顶 100。',
      '函数返回时形参结束，main 的容器仍存在且已改变。calculateAverage 只读新数据，(75+88+100+100)/4=90.75。若结果不同，检查外层形参与内层循环变量是否都用正确引用。'
    ], undefined, {table:{headers:['元素','加分前','加10后','封顶后'],rows:[['0','65','75','75'],['1','78','88','88'],['2','92','102','100'],['3','100','110','100']]}}),
    s('第六课错误的真正含义：参数类型不同就是不同接口', [
      '第六课 const vector<int>& 声明与 vector<int>& 定义不是同一函数。这一课你已把 printScores 和 calculateAverage 统一为 const 引用，把 addBonus 统一为可修改引用，这是正确修复方向。',
      '形参名字可以不同，但类型必须对应。修改函数按声明、定义、调用三处核对，尤其别漏 const、& 或参数顺序。错误地定义另一个重载，不能满足原声明需要。'
    ], cpp('double calculateAverage(const std::vector<int>& scores);', 'double calculateAverage(const std::vector<int>& scores)', '{', '    if (scores.empty()) return 0.0; // 本例约定', '    int sum = 0;', '    for (int score : scores) sum += score;', '    return static_cast<double>(sum) / scores.size();', '}')),
    s('引用不会替你决定负加分与空集合规则', [
      '原作只限制最高 100，负 bonus 会降低分数甚至降到 0 以下。这是业务规则未限定，不是引用错误。reference 保持原先加分行为，仅补空集合平均值保护；若要拒绝负数，应自己明确规则并添加检查。',
      '空容器不进入范围 for，所以加分与打印自然可处理；平均却不能除以 0。不要把一个正常样例能运行，误当成工具函数已经处理所有边界。'
    ]),
    s('练习：用两个版本证明对象关系', [
      '在 exercises/lesson07 保留原作，再写按值版 addBonusCopy。用相同初始数据调用并打印函数内外结果，指出修改落在原对象还是副本，不要只用引用更快来解释。',
      '游戏场景中 heal(Player&) 修改原角色，printStatus(const Player&) 只读观察。记忆重点：**小值按值，只读大对象常用 const&；修改原对象用 &，还要检查遍历元素是否再次复制。**'
    ])
  ],
  8: [
    s('为什么有了引用，还要学习指针', [
      '引用适合表达这里一定有现存对象；游戏锁定目标可能不存在，选中角色也可能切换。指针可以保存地址、改指向另一个对象，并用 nullptr 表达没有目标。',
      '你的 lesson8.cpp 中 printHealth 使用可空只读指针，applyDamage 使用可空可修改指针，healPlayer 使用引用。三种接口表达不同前提，而不只是互相替换的拼写。'
    ]),
    s('对象、地址、指针变量是三件事', [
      'int playerHealth=100 创建 int 对象；&playerHealth 是取地址表达式；int* health=&playerHealth 创建保存地址的指针对象。指针保存的不是数值 100，而是定位对象的信息。',
      '图解中 0x1000 这样的地址只是示意。真实地址可能随运行变化，不能依赖固定值，也不能把任意整数当作有效地址读取。C++ 对可怎样使用指针有规则，获得一个看似地址的数字不等于获得合法对象。'
    ], cpp('int playerHealth = 100;', 'int* health = &playerHealth;', 'std::cout << playerHealth << "\\n"; // 100', 'std::cout << health << "\\n"; // 地址，不保证固定', 'std::cout << *health << "\\n"; // 100')),
    s('* 与 & 必须依据语法位置理解', [
      'int* health 中 * 表示指针类型；*health-=damage 中 * 是解引用，访问目标 int。&playerHealth 取地址，int& alias 声明引用。相同符号在不同位置承担不同含义。',
      '对 health 赋值改变地址，对 *health 赋值改变目标。health=nullptr 不会把 playerHealth 清零；*health=0 则在有效指针前提下改变它指向的 int。先画清对象与指针两个格子，再看赋值落在哪个格子。'
    ], cpp('int first = 100, second = 80;', 'int* selected = &first;', '*selected -= 30; // first=70', 'selected = &second;', '*selected -= 10; // second=70')),
    s('nullptr 为什么必须先判断再解引用', [
      'nullptr 表示没有指向对象，不是一个值为 0 的 int。因此不能对它解引用。你的 applyDamage 先判空再 return，printHealth 对空值输出 No player data，让无数据成为明确路径。',
      '非空也不保证有效：对象销毁后，悬空指针可能仍然非空。判空解决有没有目标的表示，生命周期规则解决目标是否还活着；两者都必须满足。'
    ], cpp('void printHealth(const int* health)', '{', '    if (health == nullptr)', '    {', '        std::cout << "No player data\\n";', '        return;', '    }', '    std::cout << "Health: " << *health << "\\n";', '}')),
    s('传指针为什么可以修改调用者的生命', [
      'applyDamage(int* health,int damage) 仍是按值传递，复制的是指针值。形参指针是独立对象，但它与调用者提供的地址指向同一 playerHealth，所以 *health 修改原整数。',
      '函数中 health=nullptr 只改形参，不会把调用者保存的指针清空。修改调用者的指针本身需要另一种接口，例如指针引用；本课先不增加这层复杂度。'
    ], cpp('void applyDamage(int* health, int damage)', '{', '    if (health == nullptr || damage <= 0) return;', '    *health -= damage;', '    if (*health < 0) *health = 0;', '}')),
    s('为什么 healPlayer 调用不加 &，applyDamage 要加', [
      'healPlayer(int& health,int amount) 接收引用，healPlayer(playerHealth,15) 直接绑定对象。applyDamage 接收指针，因此 applyDamage(&playerHealth,30) 显式提供地址。',
      '引用不能以 nullptr 表示没有目标；允许无目标时指针接口更清楚。这里两者都只是访问已有对象，不拥有也不负责销毁它。不要把引用一定更好或指针一定要 new 当作规则。'
    ], cpp('void healPlayer(int& health, int amount)', '{', '    if (amount <= 0) return;', '    health += amount;', '    if (health > 100) health = 100;', '}', '// main内：', '// applyDamage(&playerHealth,30);', '// healPlayer(playerHealth,15);')),
    s('const int* 与 int* const 分别限制什么', [
      'const int* p 不允许通过 *p 改整数，但 p 可改指向；int* const p 不允许 p 改指向，但可改目标整数；const int* const p 同时限制两者。',
      'printHealth 使用 const int*，承诺不经此参数改生命。它不保证目标全局绝对不变，也不表达所有权。说清是指针值不能改还是目标不能经此访问修改，比统称只读指针准确。'
    ], cpp('int a = 100, b = 80;', 'const int* readOnly = &a;', 'readOnly = &b; // 允许改指向', '// *readOnly = 0; // 不允许经此改目标', 'int* const fixedTarget = &a;', '*fixedTarget = 70; // 允许改值', '// fixedTarget = &b; // 不允许改指向')),
    s('逐次追踪你的伤害与治疗', [
      'playerHealth=100，首次打印 100；applyDamage(&playerHealth,30) 使原 int 成为 70；healPlayer 绑定它增加 15，成为 85；printHealth(nullptr) 只输出无数据，不改生命。',
      '伤害 200 应封底 0，治疗 200 应封顶 100。原文件未拒绝非正伤害与治疗，负伤害可能回血；这些是需要明确的业务边界，上面的分段示例展示防护写法。保留原作后自己补测，比静默覆盖更有学习价值。'
    ], undefined, {table:{headers:['调用','参数关系','调用后生命'],rows:[['初始','main的int对象','100'],['applyDamage(&playerHealth,30)','指针副本指向原int','70'],['healPlayer(playerHealth,15)','引用绑定原int','85'],['printHealth(nullptr)','无目标，不解引用','85']]}}),
    s('指针不等于所有权：现在不要急着 new', [
      '当前指针指向 main 中局部对象，没有动态分配，不能对它 delete。谁创建、谁保证活着、谁释放，是比地址访问更进一步的问题。',
      '不要返回局部 int 地址，也不要在 vector 扩容后用旧元素地址。生命周期与智能指针课会讨论资源管理。现在每次解引用前要确认目标存在且仍然活着，而不是只看地址是否非零。'
    ]),
    s('练习：解释代码中每个 & 和 *', [
      '在 exercises/lesson08 标注取地址、引用类型、指针类型、解引用。再用两个 int 和一个可改指向的指针，验证改指针与改目标不同。直接运行原例应依次看到 100、70、85 和无数据提示。',
      '记忆重点：**指针保存地址，解引用访问对象；nullptr 表示无对象，非空不保证生命周期；传指针仍可按值，只是能间接访问同一目标。**'
    ])
  ],
  9: [
    s('散落的 health 与函数，为什么越来越难维护', [
      '上一课生命值是独立 int，姓名是另一个 string，伤害、治疗、打印函数需要外部自行配对。角色变多时，可能把 Knight 的名字配上 Mage 的生命，或有人直接写 health=-500 绕过规则。',
      '你的 lesson9.cpp 引入 Player，把姓名和生命放进同一对象，允许的操作放进 public 成员函数。类不只是装变量，而是在建立状态边界：外部提出请求，内部决定如何保持有效状态。'
    ]),
    s('类是类型，对象是具体实例', [
      'class Player {...}; 定义一种类型，结尾有分号。Player player1;、Player player2; 创建两个对象，各有自己的 name、health。给 player1 扣血不会改变 player2。',
      '成员变量描述状态，成员函数描述能执行的操作。private 和 public 划定访问权限；class 默认 private，显式写出更易阅读。访问控制是编译器检查，不是数据加密，也不是操作系统账户权限。'
    ], cpp('class Player', '{', 'private:', '    std::string name = "Unknown";', '    int health = 100;', 'public:', '    void takeDamage(int damage);', '    bool isAlive() const;', '};')),
    s('private 为什么必须配合受控接口', [
      '若 health 是 public，外部可写负数，每个调用处都得记住修正。private 使外部不能直接 player.health=-10，而要调用 takeDamage 或 heal，集中维护范围。',
      '封装不等于机械地提供 get/set。若 setHealth 接受任意整数，规则仍可被绕过。你原来的 takeDamage 拒绝非正值并封底，heal 拒绝非正值并封顶，真正表达了角色领域约束。'
    ], cpp('void Player::takeDamage(int damage)', '{', '    if (damage <= 0) return;', '    health -= damage;', '    if (health < 0) health = 0;', '}')),
    s('Player:: 说明类外定义属于哪个类', [
      '类内声明 void takeDamage(int damage);，类外写 void Player::takeDamage(int damage){...}。:: 是作用域解析符，说明这是 Player 成员，不是同名自由函数。',
      '类外成员定义仍可访问 private，因为权限来自成员身份，而不是文字是否写在类的大括号里。普通 void takeDamage(int) 不会因名字相同就自动成为成员。声明和定义末尾的 const 也必须一致。'
    ], cpp('void Player::setName(const std::string& newName)', '{', '    name = newName;', '}', 'bool Player::isAlive() const', '{', '    return health > 0;', '}')),
    s('点号调用时，函数操作哪个对象', [
      'player1.takeDamage(30) 的点号选择 player1，函数内 health 就是它的成员。player2.takeDamage(120) 改 player2。成员函数带有当前对象的上下文，后面可以用 this 明确表示。',
      'this 是指向当前对象的指针，帮助解释同名成员与参数等情况。本课先用对象调用追踪状态，不必提前把所有代码写成 this->health。重要的是分清当前对象与普通形参。'
    ], cpp('Player player1;', 'Player player2;', 'player1.setName("Knight");', 'player2.setName("Mage");', 'player1.takeDamage(30); // 70', 'player2.takeDamage(120); // 0', 'player1.heal(10); // 80')),
    s('成员函数末尾的 const 为什么放在这里', [
      'void printStatus() const、bool isAlive() const 的末尾 const 约束当前 Player：不能通过普通成员访问修改它的状态。不是把返回值变成 const，也不是限制函数只执行一次。',
      '这些只读成员可在 const Player 上调用；takeDamage 不行。printStatus 可以输出，因为 const 约束当前对象，不禁止整个程序所有副作用。用接口区分观察与修改，让调用者在编译时就知道允许什么。'
    ], cpp('void Player::printStatus() const', '{', '    std::cout << "Name: " << name << "\\n";', '    std::cout << "Health: " << health << "\\n";', '}', '// const Player observer;', '// observer.printStatus(); // 允许', '// observer.takeDamage(10); // 不允许')),
    s('bool 返回值如何参与判断，boolalpha 又是什么', [
      'isAlive 返回 health>0，外部不需要知道内部成员怎样表示，if(player.isAlive()) 就能控制行动。封装也保护调用者：内部换一种存储方式，只要接口含义不变，外部代码不必都改。',
      'std::boolalpha 让 cout 显示 true/false 而不是常见的 1/0，它只是输出流格式设置，不改变数据、分支或角色生死。表示方式与程序状态必须分开理解。'
    ], cpp('std::cout << std::boolalpha;', 'std::cout << "Knight alive: " << player1.isAlive() << "\\n";', 'std::cout << "Mage alive: " << player2.isAlive() << "\\n";')),
    s('完整核算你的两名角色', [
      '两个 Player 默认 Unknown、100。设置名字后 Knight 受伤 30→70，治疗 10→80；Mage 受伤 120 后封底 0。两个对象的普通值成员互相独立。',
      '因此最终 Knight80、Mage0，存活 true、false。非正伤害和治疗在你的原函数直接 return。以后攻击逻辑要主动调用 isAlive，public 成员不会自动执行，定义规则与决定何时调用是两件事。'
    ], undefined, {table:{headers:['对象','初始','承伤后','治疗后','存活'],rows:[['Knight','100','70','80','true'],['Mage','100','0','0','false']]}}),
    s('常见误区：复制对象不等于引用同一角色', [
      'Player another=player1 通常复制普通值成员，得到另一个独立角色状态，不是别名。以后 attack(Player& target) 使用引用，是为了扣血发生在原目标，而不是副本。',
      '同样，private 本身不会验证数值，验证逻辑要由成员函数实现。类只提供组织工具，必须由程序员选择有效约束、拒绝路径和返回含义。不能因为改成 class 就认为业务自动正确。'
    ]),
    s('练习：通过公开行为证明封装有效', [
      '在 exercises/lesson09 测两个对象独立、伤害封底、治疗封顶、非正值无操作。故意尝试直接访问 health，看见编译器拒绝后撤销。再说出 isAlive 与直接判断成员的接口差别。',
      '记忆重点：**类定义类型，对象各有状态；private 保护表示，public 暴露规则；只读成员函数末尾写 const。**下一课把创建与有效初始化结合，解决创建后还要 setName 的问题。'
    ])
  ],
  10: [
    s('先创建再 setName，为什么容易漏步骤', [
      '第九课创建后再 setName，外部必须记得补全状态。若以后还要设置生命、职业和武器，漏一步的机会更多。构造函数把对象创建和初始状态建立放在一起。',
      '你的 lesson10.cpp 保留默认与带参数两种入口：Player player1 默认 Unknown、100；Player player2("Knight",80) 创建时确定数据。对象一旦开始使用，就应已满足类的基本约束。'
    ]),
    s('构造函数为什么同名却没有返回类型', [
      'Player()、Player(const std::string&,int) 必须与类同名，不能写 void Player()。它不是返回 Player 的普通函数，是对象初始化过程中的特殊成员。',
      '创建表达式触发构造，不是对象建好后再手动调用一次。Player player; 创建对象；Player player(); 在常见声明上下文中却是声明一个返回 Player 的函数。初学可用 Player player{}; 避免歧义。'
    ], cpp('class Player', '{', '    std::string name;', '    int health;', 'public:', '    Player();', '    Player(const std::string& playerName, int startingHealth);', '};')),
    s('冒号后的成员初始化列表不是普通赋值', [
      'Player::Player():name("Unknown"),health(100) 先初始化成员，再进入函数体。string 直接用指定文本构造；若函数体才 name="Unknown"，成员已经先默认构造，再赋值。',
      '内置 int 若没有其他初始化可能没有有效初值。初始化列表也能初始化 const、引用以及没有默认构造的成员对象，组合类会马上用到。不能把它仅当成函数体赋值的更短写法。'
    ], cpp('Player::Player()', '    : name("Unknown"), health(100)', '{', '}', 'Player::Player(const std::string& playerName, int startingHealth)', '    : name(playerName), health(startingHealth)', '{', '    if (health < 0) health = 0;', '    else if (health > 100) health = 100;', '}')),
    s('实参、形参、成员名怎样传递值', [
      'Player("Knight",80) 给 playerName、startingHealth 提供初值；初始化列表再把它们用于成员 name、health。名字可以不同，因为调用者提供数据，形参接收，成员长期保存。',
      'name(playerName) 左侧是成员，括号内是参数。构造结束形参不再作为本次调用参数存在，但 name 已是对象自己的 string，不依赖传入参数对象继续活着。引用参数不代表成员也必须是引用。'
    ], undefined, {table:{headers:['实参','形参','成员初始化','保存结果'],rows:[['"Knight"','playerName','name(playerName)','Knight'],['80','startingHealth','health(startingHealth)','80']]}}),
    s('初始化顺序取决于声明，不取决于列表顺序', [
      '成员按类内声明顺序初始化。这里 name 先于 health。即使列表写 health(100),name("Unknown")，顺序也不改变，可能产生警告；当成员相互依赖时尤其危险。',
      '列表顺序建议与声明一致。继承会增加先父类、后成员、最后函数体的顺序，不要依据视觉排列猜执行。初始化阶段的顺序是语言规则，不是编译器随意优化。'
    ], cpp('class Example', '{', '    int first;', '    int second;', 'public:', '    Example() : first(10), second(first + 1) {}', '}; // second得到11')),
    s('两个构造版本为什么叫重载', [
      '参数列表不同，编译器按创建表达式选择匹配版本。这叫重载：同名函数通过参数差异区分。Player() 与 Player("Knight",80) 不需要在运行时判断“传没传参数”。',
      '自行声明某些构造后，编译器不会无条件再补一个可用无参构造。要支持 Player p;，必须提供相应入口。不同入口都应建立同样有效的状态，而不是默认版本跳过重要规则。'
    ], cpp('Player defaultPlayer{};', 'Player knight("Knight", 80);', 'Player mage("Mage", 150);', '// Player missing("Knight"); // 无匹配单参数构造')),
    s('构造校验和后续操作校验要互相配合', [
      '你的 startingHealth 被限制到 0–100：-5→0，150→100；之后伤害封底、治疗封顶。这样从创建到操作都维护范围。只有构造检查，后续仍可能破坏状态；只有后续检查，初始对象可能已经无效。',
      '本课 Player 最大生命固定 100。以后 Warrior 为 120，不能把这里的上限机械复制到 Character，否则新职业刚创建就被错误修正。业务规则变化时应重新审视约束。'
    ]),
    s('按时间顺序核算你的三个 Player', [
      'player1 默认100，承伤30→70，再治疗10→80。player2 初始80，承伤120→0，因此 Knight has been defeated。player3 输入150，构造先限制100，再承伤40→60。',
      '如果从原始输入150直接减40，会误得110，遗漏构造校验。断点先放构造体再放伤害函数，观察真正成员值。输出要由完整时间线推导，不只挑最后一条运算。'
    ], undefined, {table:{headers:['创建','构造后HP','后续操作','最终'],rows:[['Player()','100','-30,+10','80'],['Player("Knight",80)','80','-120','0'],['Player("Mage",150)','100','-40','60']]}}),
    s('可选重构：委托构造减少重复', [
      'Player():Player("Unknown",100){} 表示同一类的无参构造委托带参构造建立状态。它不同于下一课初始化 Weapon 成员，也不同于以后调用父类构造。',
      '掌握普通列表后再考虑委托。不能一边委托另一个构造，一边在同一列表独立指定其他成员初始化。先有清晰规则，再减少重复，避免过早使用新语法使初始化路径更难追踪。'
    ], cpp('Player::Player() : Player("Unknown", 100)', '{', '}')),
    s('练习：创建后立即验证对象有效', [
      '在 exercises/lesson10 使用已有两种构造，测试初始生命 -1、0、100、101，确认姓名保存且后续受伤仍满足规则。不要把构造函数写成不明确的 setter 拼接。',
      '记忆重点：**构造建立初始状态，初始化早于函数体；成员顺序由声明决定，参数名与成员名只是不同接收点。**'
    ])
  ],
  11: [
    s('角色拥有武器，为什么再建一个类', [
      'Player 管理姓名与生命。武器也有姓名、伤害和显示规则，若直接把 weaponName、weaponDamage 全放 Player，角色会承担越来越多细节。你的 lesson11.cpp 提取 Weapon，让武器维护自己的数据。',
      '关系是 Player 拥有 Weapon，即 has-a，而不是 Player 是一种 Weapon。这叫组合。先根据语义选择关系，不要为了复用几行代码就继承。游戏对象的装备、背包、属性模块常使用类似思想。'
    ]),
    s('先让 Weapon 自己维护有效状态', [
      'Weapon 的 name 与 damage 为 private，构造接收 weaponName、weaponDamage，并把负伤害改成 0。getName、getDamage、printInfo 提供只读接口，Player 不需要知道内部表示。',
      '你的 Weapon 没有默认构造，每次创建必须给名字和伤害。这很合理，但 Player 中的 Weapon 成员也必须在初始化阶段得到依据，不能等进入函数体才补救。'
    ], cpp('class Weapon', '{', '    std::string name;', '    int damage;', 'public:', '    Weapon(const std::string& weaponName, int weaponDamage);', '    const std::string& getName() const;', '    int getDamage() const;', '    void printInfo() const;', '};')),
    s('const std::string& 返回谁的名字', [
      'getName 返回成员 name 的 const 引用，避免复制字符串，并禁止调用者经这个路径修改它。getDamage 返回 int，小值按值即可。末尾 const 又是另一层约束，表示查询不改当前 Weapon。',
      '返回引用的有效期依赖 Weapon 和其成员存在。不要保存临时 Weapon 的名字引用，等临时对象销毁后再使用。const 引用不是永远安全，只是明确只读访问与避免复制的选择。'
    ], cpp('const std::string& Weapon::getName() const', '{', '    return name;', '}', 'int Weapon::getDamage() const', '{', '    return damage;', '}')),
    s('Player 内的 Weapon weapon 是真实成员对象', [
      'Weapon weapon 作为成员声明，表示每个 Player 内有独立 Weapon 子对象，不是可为空的指针，不需要单独 new，也不自动共享外部武器。',
      '构造参数 const Weapon& startingweapon 避免参数复制，但 weapon(startingweapon) 会复制构造成员。参数通过引用接收，与成员按值拥有副本是两层关系。看到 & 就推断玩家共享武器，是常见误解。'
    ], cpp('class Player', '{', '    std::string name;', '    int health;', '    Weapon weapon;', 'public:', '    Player(const std::string& playername, const Weapon& startingweapon);', '    void attack(Player& target) const;', '};', 'Player::Player(const std::string& playername, const Weapon& startingweapon)', '    : name(playername), health(100), weapon(startingweapon)', '{', '}')),
    s('为什么 weapon 必须在初始化列表构造', [
      '进入 Player 函数体前，weapon 必须已构造。Weapon 没有无参构造，若只在函数体写 weapon=startingweapon，编译器会先尝试默认构造成员而失败，根本到不了赋值。',
      'weapon(startingweapon) 直接建立成员。顺序按 name、health、weapon 的声明排列；销毁 Player 时这些成员也自动销毁。组合把生命周期纳入所属对象，不需要手工逐个释放按值成员。'
    ]),
    s('attack(Player& target) const 为什么能伤害目标', [
      '末尾 const 约束攻击者这个 Player，不是另一个目标。当前实现只读取自己的武器与存活状态，再调用 target.takeDamage，因此可以 const。',
      'target 用可修改引用保证伤害落在原目标。以后攻击还要扣体力、弹药或设置冷却，就不能继续保持同样的 const 接口。判断依据是当前对象是否被修改，而不是动作名字看上去是否只读。'
    ], cpp('void Player::attack(Player& target) const', '{', '    if (!isAlive())', '    {', '        std::cout << name << " cannot attack.\\n";', '        return;', '    }', '    std::cout << name << " attacks with " << weapon.getName() << "!\\n";', '    target.takeDamage(weapon.getDamage());', '}')),
    s('一次攻击跨越两个对象的公开接口', [
      'knight.attack(mage) 进入 knight 的函数，isAlive 查询 knight，weapon.getDamage 读取内部 Iron Sword 得到30。target 绑定 mage，因此 target.takeDamage(30) 改 mage 的生命。',
      '整条调用链不直接访问 mage.health，也不读取 Weapon 的 private damage。每一层都通过接口完成职责，这是封装与组合共同作用，而不是简单把数据搬到多个类里。'
    ], undefined, {table:{headers:['步骤','对象','操作'],rows:[['1','knight','确认存活'],['2','knight.weapon','读取Iron Sword / 30'],['3','target引用mage','调用takeDamage(30)'],['4','mage','HP100→70']]}}),
    s('按你的原作三轮核算，死人不能再行动', [
      'Iron Sword伤害30，Magic Staff伤害45。第一轮 Knight55、Mage70；第二轮 Knight10、Mage40；第三轮 Knight先攻击让Mage10，Mage仍活着，反击使Knight0。',
      '再执行 knight.attack(mage) 应立即退出。若目标先被击败，也应避免它反击。第十二课用循环替代手写三轮时，会在双方行动之间检查存活；不能只看一轮开始时状态。'
    ], undefined, {table:{headers:['轮次结束','Knight HP','Mage HP'],rows:[['初始','100','100'],['第1轮','55','70'],['第2轮','10','40'],['第3轮','0','10']]}}),
    s('组合不是共享资源，也不是继承的替代口号', [
      '这里按值拥有一把武器，是最直接的组合。未来角色共享同一武器配置，可把只读配置和自身弹药状态拆开，再选择资源句柄或智能指针，而不是把所有成员改为裸指针。',
      '继承回答 is-a，组合回答 has-a；一个类型既能继承角色接口，也能组合装备。复制当前 Player 会复制普通值成员，这个简化模型不自动获得多人联网中的身份或资源共享含义。'
    ]),
    s('练习：同时检查状态线与对象所有权线', [
      '在 exercises/lesson11 测试负武器伤害被修正、死人不能攻击、目标血量不负。解释构造参数引用与 Player 内 Weapon 副本的区别，并手算三轮结果。',
      '记忆重点：**组合让对象拥有成员对象；成员先构造，再进函数体；const 限制当前对象，引用参数可以访问另一个可修改对象。**'
    ])
  ],
  12: [
    s('单文件能运行，为什么仍要拆分', [
      '第十一课 Weapon、Player、main 都在一个文件，找接口必须穿过大量实现。本课沿用同样数据和规则，分成 Weapon.h/Weapon.cpp、Player.h/Player.cpp、main.cpp，让职责与依赖更清楚。',
      '你历史项目就是这五个文件，没有 lesson12.cpp 正常。本课不是再复制一份单文件，而是理解多个翻译单元分别编译、最终链接为一个程序的过程。'
    ]),
    s('头文件说明能做什么，cpp 提供怎样做', [
      'Weapon.h 包含类定义与成员函数声明，让调用者知道类型和接口；Weapon.cpp 提供成员实现。头文件不会在运行时先执行，也不是要独立运行的程序。',
      '类定义与普通函数定义不同。类定义放头文件很常见；非 inline 普通函数的定义放入被多个 cpp 包含的头文件，可能造成重复定义。当前采用声明在头、实现放cpp的直观组织。'
    ], cpp('// Weapon.h', '#pragma once', '#include <string>', 'class Weapon', '{', '    std::string name;', '    int damage;', 'public:', '    Weapon(const std::string& weaponName, int weaponDamage);', '    int getDamage() const;', '};')),
    s('#include 不等于链接另一个源文件', [
      '#include "Weapon.h" 让当前源文件在预处理后能看到声明。Weapon.cpp、Player.cpp 各自编译成目标代码，再由链接器组合。只包含头文件却没编译对应cpp，调用仍会缺少定义。',
      '不要 include "Weapon.cpp" 来凑实现；若又把它列为输入会重复定义，也破坏独立编译。双引号常用于项目头，尖括号常用于标准库头，搜索路径由工具链配置，不是扩展名决定。'
    ], cpp('// Weapon.cpp', '#include "Weapon.h"', '#include <iostream>', 'Weapon::Weapon(const std::string& weaponName, int weaponDamage)', '    : name(weaponName), damage(weaponDamage)', '{', '    if (damage < 0) damage = 0;', '}', 'int Weapon::getDamage() const { return damage; }')),
    s('Player.h 为什么需要完整 Weapon 定义', [
      'Player 按值含有 Weapon weapon，编译器需要 Weapon 大小来确定 Player 布局，因此 Player.h 应包含 Weapon.h。只写 class Weapon; 前置声明，不够定义按值成员。',
      '某些只用指针或引用的声明位置可以前置声明，以减少依赖；但访问成员等操作又可能需要完整类型。先保持本课直接包含，不为减少 include 而引入不完整类型错误。'
    ], cpp('// Player.h', '#pragma once', '#include "Weapon.h"', '#include <string>', 'class Player', '{', '    std::string name;', '    int health;', '    Weapon weapon;', 'public:', '    Player(const std::string& playername, const Weapon& startingweapon);', '    void attack(Player& target) const;', '    bool isAlive() const;', '    void takeDamage(int damage);', '};')),
    s('#pragma once 解决什么，不能解决什么', [
      'main 可能直接包含 Weapon.h，又经 Player.h 间接包含它。常见工具链中 #pragma once 避免同一头文件在一个翻译单元里重复展开。标准可移植形式是 #ifndef/#define/#endif 包含保护。',
      '它不能让普通函数在整个项目只定义一份，也不能解决漏编译cpp。重复包含、重复定义、找不到定义属于不同层次，先判断报错阶段，再检查相应配置。'
    ]),
    s('main 只组织战斗顺序，不侵入类实现', [
      'main 创建 Iron Sword30、Magic Staff45，再创建 Knight、Mage。while 判断存活并组织先后手，伤害规则仍由类负责。相较手写三轮，循环让回合数由状态决定。',
      'Knight先攻击后，还要检查Mage是否存活再反击。while开头的检查不足以保护整轮，因为第一击可能已经改变状态。检查应贴合动作顺序，而不是只在方便的位置写一次。'
    ], cpp('while (knight.isAlive() && mage.isAlive())', '{', '    knight.attack(mage);', '    if (mage.isAlive())', '    {', '        mage.attack(knight);', '    }', '}')),
    s('一次编译本课所有实现文件', [
      '在 lesson12 目录执行 g++ -std=c++17 main.cpp Player.cpp Weapon.cpp -o lesson12.exe，把三个源文件一起编译链接。macOS输出名可改lesson12，再用 ./lesson12 运行。不要只编译main，也不要把reference的另一份main一起加入。',
      '头文件由cpp包含，通常不列为这个命令的独立输入。VS Code编译活动文件任务适合单源程序，不一定适合本课。用README的多文件命令，确认任务与结构匹配。后面的CMake课会管理这份源文件清单。'
    ], cpp('// 终端命令说明（不是C++可执行语句）：', '// g++ -std=c++17 -Wall -Wextra -pedantic main.cpp Player.cpp Weapon.cpp -o lesson12.exe', '// PowerShell运行： .\\lesson12.exe', '// macOS输出名改lesson12，运行： ./lesson12')),
    s('按错误类型定位，不要盲目改 include', [
      'unknown type/not declared 多与声明不可见有关；undefined reference 多与定义缺失或签名不一致有关；multiple definition 多与定义重复有关。三种诊断不是同一个问题的不同措辞。',
      '头文件声明 attack(Player&) const，cpp定义漏末尾const，也不是可以忽略的小差别。先核对声明与定义，再确认命令包含全部实现，最后检查工具链。不要看到链接报错就继续重复include。'
    ]),
    s('验证行为没变，再思考退出保证', [
      '原始战斗第三轮结束，Knight0、Mage10，输出 Mage wins!。这一结果应与第十一课手动三轮一致。拆分文件不应改变伤害规则，只改变工程组织。',
      '双方伤害都为0时，现有while不会结束。reference保留你的主线行为；作为加固练习，可加入最大回合与平局判断。结构正确不等于所有业务状态都有退出路径。'
    ]),
    s('练习：按依赖方向解释五个文件', [
      '在 exercises/lesson12 打开五文件，逐个解释包含理由：Player依赖Weapon完整定义，main只通过公开接口组织游戏，cpp首先包含自己的头以核对声明。',
      '记忆重点：**头文件传播接口，源文件提供实现，各cpp分别编译后链接；只编译当前文件不等于构建多文件项目。**保持原文件名，避免另造lesson12.cpp而绕开本课目标。'
    ])
  ],
  13: [
    s('先看重复：战士和法师有哪些共同状态', [
      '现在要描述Warrior与Mage。两者都有姓名、生命、受伤、存活与显示，但战士强力攻击，法师耗蓝施法。复制两份共同代码，修改受伤规则时就容易漏改一份。',
      '关系是战士是一种角色，法师也是角色，因此建立Character父类，子类public继承。Player拥有Weapon是组合；Warrior是Character是继承，两课解决不同关系，不应混淆。'
    ]),
    s('Character保存共同部分，不是全能父类', [
      '你的Character有private name、health，以及构造、查询、受伤、显示和存活接口。若把所有职业未来可能出现的技能都塞进父类，每个职业都会继承许多不合适的功能。先提取真正共同的职责。',
      '本课Character仍是可创建的普通类，没有virtual attack。继承允许使用父类部分与公开接口，但不会自动使所有同名行为按真实类型选择，下一课才引入动态派发。'
    ], cpp('class Character', '{', '    std::string name;', '    int health;', 'public:', '    Character(const std::string& characterName, int characterHealth);', '    const std::string& getName() const;', '    int getHealth() const;', '    void takeDamage(int damage);', '    bool isAlive() const;', '    void printStatus() const;', '};')),
    s('public继承表达可以作为Character使用', [
      'class Warrior : public Character 声明公开继承。Warrior含有Character基类部分，可以绑定到Character&。public继承后，父类公开接口仍可经Warrior调用。',
      '父类private成员不会变成子类可直接访问的变量。Warrior通过isAlive、getName使用共同状态。不要为了方便把所有数据改protected，否则子类会依赖父类内部表示，未来更难维护约束。'
    ], cpp('class Warrior : public Character', '{', 'public:', '    Warrior(const std::string& warriorName);', '    void powerAttack(Character& target) const;', '};')),
    s('为什么名字外传，生命固定120', [
      'Warrior warrior("Arthur")让调用者命名；Warrior内部Character(warriorName,120)规定这个职业初始生命120。这是当前游戏接口的设计选择，不是继承语法要求名字外传、生命写死。',
      '允许自定义生命时，可以让Warrior接收startingHealth再转交Character，但调用者要多承担一个选择。本课保留原模型：调用者选名字，职业决定初始生命；法师同理固定80生命、100魔法。'
    ], cpp('Warrior::Warrior(const std::string& warriorName)', '    : Character(warriorName, 120)', '{', '}', 'Mage::Mage(const std::string& mageName)', '    : Character(mageName, 80), mana(100)', '{', '}')),
    s('逐层追踪Arthur，解开两组名字', [
      'Warrior("Arthur")先让warriorName接收文本。初始化列表Character(warriorName,120)再调用父类构造，characterName接收该文本，characterHealth接收120。name(characterName)、health(characterHealth)最终初始化共同成员。',
      'warriorName与characterName不是必须同名的神秘变量，分别属于两次参数接收。父类不用知道调用者是战士还是法师，只根据接收参数建立自己的部分。参数名不同不改变数值传递。'
    ], cpp('Character::Character(const std::string& characterName, int characterHealth)', '    : name(characterName), health(characterHealth)', '{', '    if (health < 0) health = 0;', '}'), {table:{headers:['阶段','名字数据','生命数据'],rows:[['main创建','"Arthur"','未提供'],['Warrior形参','warriorName','职业规则120'],['父类调用','Character(warriorName,120)','120'],['Character形参','characterName','characterHealth'],['最终成员','name=Arthur','health=120']]}}),
    s('子类为什么不能直接name(n),health(120)', [
      'name与health属于Character，负责初始化它们的是Character构造。Warrior初始化列表可指定直接基类构造和自己的成员，不能越过基类构造逐个初始化父类数据。',
      '所以:name(n),health(120)不只是private权限问题。即使改变权限，也不能代替直接基类初始化。正确:Character(n,120)让父类负责自己的状态，这是初始化职责的边界。'
    ], cpp('// 故意错误，勿直接编译：', '// Warrior::Warrior(const std::string& n) : name(n), health(120) {}', '// 正确：', 'Warrior::Warrior(const std::string& n) : Character(n, 120)', '{', '}')),
    s('构造时间线：先父类，后子类成员', [
      '创建Mage先构造Character，让name、health有效；再初始化Mage自己的mana；最后执行Mage构造函数体。父类构造不能移到函数体里当普通操作补做。',
      '父类无无参构造，子类必须提供可用基类构造调用。完整Mage对象内部含基类部分和派生部分，不是两个彼此无关的角色。生命成员只在Character部分保存一份，不要在Mage再建一个同名health来冒充初始化。'
    ]),
    s('powerAttack接受Character&，为什么能攻击Mage', [
      'Mage公开继承Character，因此Mage对象可绑定Character&。目标只需takeDamage共同接口，战士不用知道对方有没有mana。引用保证扣原目标而非副本。',
      'powerAttack末尾const，因为不改战士自身；castSpell会改法师mana，没有const。依据始终是当前对象是否修改，不是攻击一词听起来是否代表写操作。'
    ], cpp('void Warrior::powerAttack(Character& target) const', '{', '    if (!isAlive()) return;', '    std::cout << getName() << " uses Power Attack!\\n";', '    target.takeDamage(35);', '}')),
    s('法师专有数据如何配合共同接口', [
      'castSpell先用继承的isAlive检查自己，再检查mana>=20。全部满足才扣20并伤害40。失败路径应保持状态，不应先扣蓝再发现无法行动。',
      'manaCost和spellDamage局部const表达固定技能规则。现在先明确顺序和对象边界；以后技能配置可以独立，不必急着把每个数字抽成复杂系统。getMana只属于Mage，也不必强迫战士拥有同名查询。'
    ], cpp('void Mage::castSpell(Character& target)', '{', '    const int manaCost = 20;', '    const int spellDamage = 40;', '    if (!isAlive()) return;', '    if (mana < manaCost) return;', '    mana -= manaCost;', '    target.takeDamage(spellDamage);', '}')),
    s('两轮后的准确值，不要混同完整战斗终局', [
      '你第十三课main固定两组攻击。初始Arthur120、Merlin80、mana100。第一组后Arthur80、Merlin45、mana80；第二组后Arthur40、Merlin10、mana60。',
      '没有第三次攻击，因此Merlin仍活着。第十四课battle会继续到Merlin0，不能把那个结果当本课输出。相同职业数值，控制顺序与循环条件不同，终局就不同。'
    ], undefined, {table:{headers:['阶段','Arthur HP','Merlin HP','Merlin mana'],rows:[['初始','120','80','100'],['第1组','80','45','80'],['第2组','40','10','60']]}}),
    s('遗留问题：控制器仍要认识职业', [
      '目标已能统一为Character&，攻击者却要分别调用powerAttack、castSpell。只拿到Character& attacker时，父类没有共同attack接口，控制器无从选择函数名。',
      '若按职业字符串写if/else，每增加Archer都要改控制器。下一课先统一attack，再解释为什么同名还不够，需要virtual按真实对象选择实现。继承解决共同类型，多态进一步解决共同调用。'
    ]),
    s('练习：讲清初始化和行为边界', [
      '打开exercises/lesson13，用调试器进入两个构造，写出名字和生命传递链，再确认两轮40、10、60。故意尝试子类直接初始化父类成员，观察错误后恢复。',
      '记忆重点：**继承表达is-a；初始化父类部分调用父类构造；形参名字只是接收点，公开接口决定外部能做什么。**'
    ])
  ],
};
