// 正文中的代码块是递进讲解片段；完整可编译文件以本课 reference 为准。
const section = (title, paragraphs, code, extra = {}) => ({ title, paragraphs, ...(code ? { code, language: 'cpp' } : {}), ...extra });
const cpp = String.raw;

const draftLectures = {
  15: [
    section('从战斗结束追问：角色不再使用时，资源由谁收拾？', [
      '前一课的 Character 可以通过统一接口执行攻击，但“行为正确”还不足以管理一个游戏。切换关卡时，纹理、声音、文件和角色对象都需要在合适的时刻释放。如果每个离开函数的出口都手写清理，正常路径写了，失败或提前返回的路径却很容易漏掉。',
      '先区分**作用域**和**生命周期**：作用域回答某个名字在哪里能被使用，生命周期回答对象什么时候真正存在。普通局部对象通常在执行到定义时构造，离开其所在块时析构；动态对象可能在创建它的函数返回后仍然存在，不能仅凭名字消失判断对象已经销毁。'
    ]),
    section('先看旧问题：清理语句放在函数末尾为什么不可靠', [
      '假设 acquireTexture 获取了一份需要释放的纹理。下面的写法把释放责任交给每个出口：一旦验证失败提前 return，末尾的 releaseTexture 就不会执行。把释放语句复制到每个 return 前面能暂时补救，却会让后续新增分支再次出现遗漏。',
      '这段伪接口用于暴露问题，不是本课需要实现的纹理 API。真正要解决的是：让清理跟着对象的生命周期自动发生，而不是让调用者记住所有出口。'
    ], cpp`void loadScene() {
    acquireTexture();       // 示意：获得需要释放的资源
    if (!sceneIsValid()) return; // 问题：跳过下面的清理
    releaseTexture();
}`),
    section('析构函数为什么叫这个名字：对象结束时执行的收尾动作', [
      '构造函数与类同名，用来建立对象初始状态；析构函数在类名前加 ~，没有返回类型、没有普通参数。~Resource() 不表示按位取反，它在这里是析构函数的声明语法。对于已经成功构造的普通局部对象，正常离开作用域时会自动调用它。',
      '先不加载真实图片，用 Acquire/Release 日志代替资源操作，这样能直接观察顺序。日志是教学模型；真实封装的构造阶段应当取得有效资源，析构阶段调用对应的释放 API。'
    ], cpp`class Resource {
    std::string name;
public:
    explicit Resource(const std::string& n) : name(n) {
        std::cout << "Acquire " << name << "\n";
    }
    ~Resource() {
        std::cout << "Release " << name << "\n";
    }
};`),
    section('RAII：把资源的责任交给一个对象', [
      '**RAII** 的关键不是缩写，而是资源获得后立即由对象负责，资源释放由该对象的析构保证。使用者只安排对象应当活多久，不再把清理散落到业务分支。std::ofstream 管理文件句柄、下一课的 unique_ptr 管理动态对象，都遵循这种思路。',
      'Resource texture("Texture") 创建的是一个具体对象。进入函数不等于已经创建所有局部对象；程序执行到这条定义，才开始构造 texture。构造成功后，它就承担那份资源的释放责任。explicit 防止单个字符串参数被不经意地隐式转换为 Resource。'
    ], cpp`void loadScene() {
    Resource texture("Texture");
    Resource sound("Sound");
    std::cout << "Scene ready\n";
}`),
    section('一步一步追踪：为什么先释放 Sound，再释放 Texture', [
      '调用 loadScene 后先构造 texture，输出 Acquire Texture；再构造 sound，输出 Acquire Sound；随后执行普通输出。到右花括号时，这两个对象都结束生命周期，同一作用域内按成功构造的相反顺序析构，因此先 Release Sound，再 Release Texture。',
      '这种逆序非常有用：后创建的对象可能依赖先创建的对象，先销毁后创建者可以避免依赖已经消失。函数返回到 main 后才输出 Back to menu，所以 Release 不应出现在菜单日志之后。'
    ], undefined, { table: { headers: ['执行位置', '仍存活的对象', '新增输出'], rows: [['texture 定义后', 'Texture', 'Acquire Texture'], ['sound 定义后', 'Texture、Sound', 'Acquire Sound'], ['函数结尾', '逐个销毁', 'Release Sound → Release Texture'], ['回到 main', '无局部资源', 'Back to menu']] } }),
    section('提前返回不用手动补清理', [
      '把成功构造后的对象放进局部作用域，即使执行 return，离开该作用域时仍会析构。下面失败分支只需要表达“不能继续加载”，不再负责重复释放纹理。',
      '若构造函数本身抛异常，该对象尚未完整构造，所以不会调用它自己的析构函数；但已经构造完成的成员和先前局部对象会被清理。异常会在第 20 课展开，这里先记住“成功构造”是讨论自动析构的重要前提。'
    ], cpp`void loadScene(bool valid) {
    Resource texture("Texture");
    if (!valid) return; // 离开作用域，仍会 Release Texture
    Resource sound("Sound");
    std::cout << "Scene ready\n";
}`),
    section('为什么禁止复制：一个资源不能随便出现两个释放者', [
      '如果 Resource 真正管理一个图形句柄，而默认复制只是复制句柄数值，两个对象会认为自己都拥有同一资源，最终可能释放两次。当前日志模型没有真实句柄，但先把“不可复制”的接口约束建立起来，避免把教学模型误当成安全的通用资源类。',
      'Resource(const Resource&) 是复制构造，operator= 是复制赋值。= delete 表示明确禁止调用，不是删除一个对象。这里不实现移动；下一课交给 unique_ptr 演示所有权转移。'
    ], cpp`Resource(const Resource&) = delete;
Resource& operator=(const Resource&) = delete;

// Resource b = a; // 编译错误：不能复制拥有者`),
    section('对象里还有对象时，析构顺序怎样理解', [
      '若 Scene 包含 Texture 和 Sound 成员，先执行 Scene 的析构函数体，再按成员声明的相反顺序销毁成员，最后销毁基类部分。成员的构造顺序看类内声明顺序，不看初始化列表书写顺序；不要靠调整初始化列表制造另一个顺序。',
      'RAII 也不等于“只能放栈上”。资源对象可以是另一个对象的成员，或通过智能指针动态创建；只要拥有者最终正确结束生命周期，它的析构就能承担清理。单独写 new 而没有可靠拥有者，不会自动变得安全。'
    ]),
    section('哪些情况不能期待普通作用域清理', [
      '正常返回与正常处理的异常路径可以利用析构；强制结束进程、断电、std::abort 等情况不能要求程序照常执行每个析构。因此析构适合资源释放，不应被当作唯一的数据持久化方案。游戏重要存档应及时写入，而不是只等退出游戏。',
      '析构通常应保持不抛异常，尤其栈展开时再次抛出可能导致终止。也不要对普通局部对象手动调用析构后继续正常使用；它到作用域末尾还会再次被销毁。初学阶段通过控制作用域管理生命周期即可。'
    ]),
    section('练习连接：把“看日志”升级成“预测生命周期”', [
      '先运行原始参考解答，确认六行输出顺序；再只改一个位置：在 texture 后提前 return。运行前写下会不会出现 Acquire Sound、会不会出现 Release Texture，运行后逐行对照。接着增加嵌套花括号，观察内部对象先结束。',
      '本课验收不是会背“资源获取即初始化”，而是能回答**谁拥有资源、何时取得、哪些出口会释放、是否允许复制**。这四个问题也会贯穿智能指针、队伍容器和资源缓存。'
    ])
  ],
  16: [
    section('RAII 已经会清理，为什么还需要智能指针', [
      '上一课的局部 Resource 随作用域自动销毁，但游戏角色可能需要由场景保存，创建函数返回后还要继续存在。此时动态分配能让生命周期脱离创建函数，代价是必须明确最后由谁释放。裸指针只表示地址，本身不告诉读代码的人谁负责 delete。',
      '本课先选最清楚的规则：**一个角色只有一个拥有者**。拥有者销毁时角色一起销毁；若需要交给另一个系统，显式转移拥有权。std::unique_ptr 正是表达这条规则的标准库类型。'
    ]),
    section('旧写法的问题：有地址不代表有清理责任', [
      '下面代码能够创建角色，但执行到 return 时没有任何对象自动负责 delete。如果在多个地方补 delete，又可能出现重复销毁。更危险的是某个 observer 仍持有旧地址，误以为地址非空就代表角色存活。',
      '不要以“程序很短，退出会回收进程内存”为理由忽略问题：实际游戏会反复切关和创建对象，未释放资源会在同一进程中累积。我们要在对象不再需要时释放，而不是等整个进程退出。'
    ], cpp`Character* player = new Character("Arthur");
// ...某个分支提前返回，忘记 delete player
// 裸指针变量离开作用域，不会自动 delete 它指向的对象`),
    section('逐项读懂 make_unique 和 auto', [
      'std::make_unique<Character>("Arthur") 创建 Character，并返回拥有它的 std::unique_ptr<Character>。尖括号中的 Character 指定要创建的类型，圆括号中的字符串转交给 Character 构造函数。std::make_unique 需要 <memory>；不必先写 new 再另外找地方包装。',
      'auto first 让编译器根据右边推导 first 的类型，它不是动态类型，也不是“不知道类型”。这里推导结果固定为 unique_ptr<Character>。first->name 通过包装对象访问被拥有的 Character，等价地可以理解为 (*first).name。'
    ], cpp`#include <memory>
auto first = std::make_unique<Character>("Arthur");
std::cout << first->name << "\n";`),
    section('unique 的约束：不允许随便复制拥有者', [
      '若允许 auto second = first，两者是否都负责销毁同一对象就变得含糊。因此 unique_ptr 的复制被禁止。编译报错是在阻止所有权歧义，并不表示它不能放进容器或不能作为函数返回值；它可以被移动。',
      '这里要分清“复制一个角色”和“复制一个指向角色的拥有者”。真的要创建另一个同内容角色，可以显式构造新角色；不能通过复制 unique_ptr 偷偷共享同一个对象。'
    ], cpp`auto first = std::make_unique<Character>("Arthur");
// auto second = first; // 错误：unique_ptr 不可复制
auto another = std::make_unique<Character>(first->name);
// another 拥有另一个 Character，不是与 first 共享同一个`),
    section('std::move 为什么需要写：允许转交，不是自己搬东西', [
      'std::move(first) 将表达式转换成可以选择移动操作的形式，它本身没有执行资源搬运。赋值或构造 second 时，unique_ptr 的移动构造接管原来的地址，并把 first 置空。<utility> 提供 std::move。',
      '注意这个空状态是 unique_ptr 移动后的具体保证，不能扩展成“所有类型 move 后都会清零”。std::string 等类型有各自的移动后约定。移动前后，Character 对象本身没有重新构造，拥有者更换了，角色地址仍是同一个。'
    ], cpp`auto second = std::move(first);
std::cout << (first == nullptr) << "\n"; // 1
std::cout << second->name << "\n";      // Arthur
// first->name; // 错误：first 已经为空，不能解引用`),
    section('观察者：我需要访问，不代表我负责销毁', [
      'first.get() 返回被拥有对象的原始指针，只借用访问能力，不创建新的拥有者。参考解答先让 observer 指向 Arthur，然后转交 first 给 second：由于角色仍由 second 拥有，observer 仍可指向同一个存活对象。',
      '但 observer 不会阻止 second 销毁角色，也不会在角色销毁后自动变为空。不能对 observer 写 delete；也不能再用同一地址构造另一个 unique_ptr，这两种写法都会破坏唯一所有权。'
    ], cpp`Character* observer = first.get();
std::cout << "Observe: " << observer->name << "\n";
auto second = std::move(first);
// observer 此时仍指向存活的 Arthur
// second.reset(); 之后 observer 就不能再解引用`),
    section('沿完整示例追踪：为什么只析构一次', [
      '参考解答先创建 Arthur，借用 observer 输出 Observe: Arthur；移动后输出 First empty: 1 和 Owner: Arthur。main 结束时，second 先销毁其拥有的 Character，输出 Destroy Arthur；first 已空，不会再次销毁角色。observer 是普通指针变量，销毁它不会销毁目标。',
      'reset() 表示让拥有者放弃当前对象并按规则销毁它，release() 则只交出原始地址、不销毁对象，两者完全不同。初学练习不需要 release；一旦使用它，必须另外安排拥有者，否则容易重新引入泄漏。'
    ], undefined, { table: { headers: ['时刻', 'first', 'second', 'Character'], rows: [['创建后', '拥有 Arthur', '尚不存在', '存活'], ['move 后', '空', '拥有 Arthur', '同一对象仍存活'], ['main 结束', '空对象销毁', '释放角色', '析构一次']] } }),
    section('多态销毁和第 14 课有什么联系', [
      '若 unique_ptr<Character> 实际拥有 Warrior，默认删除器最终通过 Character* 销毁对象，所以 Character 应具有虚析构函数。智能指针不会把错误的基类销毁接口自动修好。下一课的队伍容器正是这个组合：基类虚接口负责行为，unique_ptr 负责所有权。',
      '函数参数也应表达意图：Character& 表示操作现有角色、不接管它；unique_ptr<Character> 按值参数表示接收拥有权。不要仅为了访问名字就把拥有者 move 给函数，那会额外改变生命周期。'
    ], cpp`void show(const Character& character); // 借用，只读
void adopt(std::unique_ptr<Character> character); // 接收所有权

// show(*second);
// adopt(std::move(second)); // 调用后 second 为空`),
    section('何时才用 shared_ptr：确实存在多个共同拥有者', [
      'std::shared_ptr 让多个拥有者共同延长对象生命周期，最后一个强拥有者消失才销毁对象。它需要管理控制块和计数，不该被当作“比 unique_ptr 更高级”的默认选项。只有真实共享生命周期时，才选择共享所有权。',
      '如果两个对象相互保存 shared_ptr，会形成强引用环，双方计数都无法降到零；weak_ptr 可以观察共享对象却不增加强计数，使用前通过 lock() 尝试取得一个临时 shared_ptr。第 26 课会在缓存中实际运用，而不是只记三个类型名字。'
    ]),
    section('练习连接：用动作解释所有权，而不只判断是否编译', [
      '先按参考解答创建、观察、移动，再预测析构日志。额外尝试被禁止的复制，读懂编译器指出的 deleted copy constructor，随后删去错误行，让项目恢复可构建。',
      '最后在纸上标出每个变量是“拥有者”还是“观察者”，并说明 reset 前后谁还可以访问 Arthur。通过验收的标准是角色只销毁一次、移动后的 first 不被解引用、观察指针不负责 delete。'
    ])
  ],
  17: [
    section('从两个角色到一支队伍：容器应该保存什么', [
      '第 14 课让 Warrior 与 Mage 共享 Character 接口，第 16 课解决单个动态角色的拥有者。现在需要一支可增删的队伍：既保存不同职业，又在移除成员时正确销毁角色。把“多态”和“所有权”同时带进 vector，才是本课的目标。',
      '本课使用 role() 返回职业名称，把输出限制为 Warrior、Mage，便于集中观察容器行为。这里不是给战斗增加另一套伤害规则；完整战斗会在第 22 课组合。'
    ]),
    section('为什么 vector<Character> 不适合直接保存不同职业', [
      'vector<T> 的每个元素都是 T 类型对象。将派生对象按值放进普通基类容器，只保留基类部分，称为**对象切片**；如果基类含纯虚函数，甚至根本不能创建这种元素。保留多态需要通过引用或指针访问真实派生对象。',
      'vector 不能直接以引用作为元素类型，因此这里选择 vector<unique_ptr<Character>>：容器元素是大小一致的拥有者包装，包装指向的实际角色可以是不同派生类。基类的虚析构保证移除时正确清理派生对象。'
    ], cpp`struct Character {
    virtual ~Character() = default;
    virtual std::string role() const = 0;
};

struct Warrior : Character {
    std::string role() const override { return "Warrior"; }
};`),
    section('从内向外读懂嵌套尖括号', [
      '先读 unique_ptr<Character>：一个拥有 Character 接口对象的独占拥有者。再读 vector<...>：许多个这种拥有者组成的动态数组。变量 team 拥有各个 unique_ptr，各个 unique_ptr 又拥有实际角色，形成清晰的责任链。',
      'team.push_back(make_unique<Warrior>()) 中，make_unique 创建的临时拥有者会被移动进容器；派生指针可转换为兼容的基类拥有者。不是把 Warrior 对象按值压缩成 Character，派生对象仍完整存在。'
    ], cpp`std::vector<std::unique_ptr<Character>> team;
team.push_back(std::make_unique<Warrior>());
team.push_back(std::make_unique<Mage>());`),
    section('为什么范围 for 要写 const auto&', [
      '若写 for (auto member : team)，每一轮都想复制一个 unique_ptr，而它禁止复制。const auto& 绑定容器中的现有元素，不复制也不转走所有权；member->role() 通过指针调用虚函数，选中实际职业实现。',
      '这里的 const 修饰的是 unique_ptr 包装，意味着本次访问不能 reset 或替换该拥有者；它并不自动使所指向的 Character 变成 const。role() 本身声明为 const，所以也可以通过 const Character 接口只读调用。'
    ], cpp`for (const auto& member : team) {
    std::cout << member->role() << "\n";
}
// 输出顺序：Warrior，然后 Mage`),
    section('迭代器为什么存在：给算法一个可移动的位置', [
      'team.begin() 返回第一个元素的位置，team.end() 返回最后元素之后的位置。end 是边界标记，不是最后一个角色，不能解引用。空队伍 begin()==end()，循环自然不执行，不必额外制造一个“空角色”。',
      '*it 得到容器元素，也就是 unique_ptr<Character>&；(*it)->role() 再通过拥有者访问角色。两个层次分别是“迭代器找到包装”和“包装找到角色”。auto 只省略冗长类型名，不会省略这两层关系。'
    ], cpp`auto it = team.begin();
if (it != team.end()) {
    std::cout << (*it)->role() << "\n";
}`),
    section('边遍历边删除，为什么 ++it 可能越过边界', [
      'vector::erase 会移除元素并使删除位置及其之后的迭代器失效，后面的元素向前补位。若先 erase(it) 再无条件 ++it，就是继续使用失效位置，也可能跳过补到当前位置的成员。',
      'erase 返回删除位置之后的有效迭代器；如果刚删最后一个，返回 end。删除分支接住返回值，不再额外自增；不删除分支才 ++it。这个规则比记忆一段循环模板更重要。'
    ], cpp`for (auto it = team.begin(); it != team.end();) {
    if ((*it)->role() == "Mage")
        it = team.erase(it);
    else
        ++it;
}`),
    section('逐轮追踪：删除 Mage 时实际发生了什么', [
      '第一次 it 指向 Warrior，不满足条件，移动到 Mage。第二次条件为真，erase 移除保存 Mage 的 unique_ptr，因唯一拥有者销毁而释放 Mage 对象，返回新的 end。循环检查 it==end 后停止，team.size() 为 1。',
      '如果连续两个成员都要删除，接住返回值后仍检查当前位置，所以不会漏掉第二个。如果队伍为空，条件第一步就失败；如果全部删除，最后也能安全走到 end。这些边界比只测两个固定角色更能证明循环正确。'
    ]),
    section('vector 扩容时，角色也会跟着搬家吗', [
      '扩容会把 vector 内的 unique_ptr 包装移动到新的存储区域，所以指向这些包装的迭代器、引用和指针可能失效。但各个 Character 是另外分配的对象，仅移动 unique_ptr 通常不会搬动它所拥有的 Character。',
      '因此 Character* observer 与指向 team[0] 这个包装的指针不是同一种借用。即使扩容不改变 Character 地址，移除对应拥有者仍会销毁 Character；保存角色地址之前必须能证明它会活到使用结束。'
    ], cpp`Character* observer = team.front().get();
// team 扩容移动的是 unique_ptr 包装，存活角色的地址不因此改变。
// 但若擦除 observer 对应的成员，observer 就会悬空。`),
    section('接口设计：不要为了显示队伍就交出所有权', [
      '打印队伍可以接收 const vector<unique_ptr<Character>>&，既不复制容器也不转走角色。操作单个角色时直接传 Character&，让函数依赖它真正需要的能力。把完整队伍传给每个函数会让依赖越来越多。',
      '角色身份还应与下标分开。删掉第一个成员后，原第二个会成为下标 0；若任务系统把下标当永久角色 ID，任务可能绑定错人。第 25 课会把稳定 ID 和组件数据拆开。'
    ]),
    section('练习连接：删除规则必须经得住排列变化', [
      '完成基础两人队伍后，再加入两个连续 Mage，并测试 Mage 在开头、中间、末尾和空队伍。每次先写预期职业列表，再运行验证；最终基础参考输出必须保持 Warrior、Mage、Team size: 1。',
      '能够解释“为什么不复制、为什么不切片、为什么接住 erase 返回值”才算理解本课。不要为了让循环编译而把 unique_ptr 改成裸指针，那会把已解决的所有权问题重新带回来。'
    ])
  ],
  18: [
    section('队伍规则多了以后，为什么不继续手写所有循环', [
      '上一课会安全遍历和删除角色。现在 UI 要移除生命值为零的条目，再按血量从高到低显示。手写循环当然可以，但“筛选”和“排序”已有标准算法，把变化规则交给一个小函数，主逻辑会更清楚。',
      '本课把角色简化为整数生命值 {30,0,80,10,0}，专心观察算法如何修改区间。结果应是 80、30、10，存活数量 3；不要把排序后的下标当永久角色身份。'
    ]),
    section('算法为什么同时需要 begin 和 end', [
      'std::sort 和 std::remove_if 不直接拥有 vector，它们接收迭代器表示要处理的范围。标准库常用半开区间 **[begin,end)**：包含起点，不包含尾后位置。这样空范围可以用 begin==end 表示，范围长度也能自然组合。',
      'sort 需要随机访问迭代器，所以 vector 合适；不能看到任何容器都有 begin/end 就以为都能调用 sort。算法对迭代器能力有要求，list 使用它自己的 sort 成员函数。'
    ], cpp`std::vector<int> health{30, 0, 80, 10, 0};
std::sort(health.begin(), health.end()); // 默认升序
// 结果：0, 0, 10, 30, 80`),
    section('先从普通函数理解“传入规则”', [
      '比较器不是返回大小差值，而是回答一个布尔问题：“a 应当排在 b 前面吗？”按血量降序时，a>b 才应返回 true。算法负责比较和移动，调用者只提供业务规则。',
      '不要写 a>=b。a 与自身相等时比较器必须返回 false；否则不满足算法所需的严格弱序，程序行为不再有保证。稳定排序也不是给错误比较器补救：它解决的是等价元素的原始相对顺序。'
    ], cpp`bool higherFirst(int a, int b) {
    return a > b;
}
std::sort(health.begin(), health.end(), higherFirst);`),
    section('lambda 从哪里来：只用一次的规则就写在使用处', [
      '若 higherFirst 只给这一次 sort 用，给它另起全局函数名会增加跳转。lambda 允许在调用位置直接创建可调用对象。[](int a,int b){ return a>b; } 可以按“捕获列表、参数列表、函数体”三部分阅读；它不是字符串，也不是排序专用语法。',
      '空的 [] 表示不捕获外部局部变量；a、b 是算法每次提供的两个元素。return 的 bool 结果让编译器推导返回类型。这个比较函数会被调用多次，不应在里面顺手扣血或改变参与比较的数据。'
    ], cpp`std::sort(health.begin(), health.end(),
          [](int a, int b) { return a > b; });`),
    section('捕获为什么需要明确：外部阈值怎样进函数体', [
      'lambda 内部想使用外部 limit，需要捕获。[limit] 保存创建 lambda 那一刻的值副本；[&limit] 借用原变量，调用时看到它当时的值。按值捕获和按引用捕获不是性能按钮，而是生命周期与语义选择。',
      '引用捕获不会延长 limit 的生命周期。若把 lambda 存起来，在 limit 已经销毁后再调用，就会借用失效对象。此处阈值只用于本次算法，优先显式按值捕获，避免不必要的外部依赖。'
    ], cpp`int limit = 0;
auto dead = [limit](int hp) { return hp <= limit; };
// dead(0) 为 true，dead(30) 为 false`),
    section('remove_if 为什么名字叫移除，却不改变 size', [
      'remove_if 根据谓词把要保留的元素向前移动，并返回新的逻辑终点。它只有迭代器，没有容器接口，所以不会调用 vector::erase，也不会缩短 vector 的 size。返回位置之后仍是有效但值不应依赖的尾部元素。',
      '以 {30,0,80,10,0} 为例，前面三个逻辑有效值成为 30、80、10，但 size 此时仍是 5。不能把尾部说成固定的两个 0，也不能继续把整个旧范围显示为有效队伍。'
    ], cpp`auto newEnd = std::remove_if(
    health.begin(), health.end(),
    [](int hp) { return hp <= 0; });
// [health.begin(), newEnd) 才是保留区间
// health.size() 此时仍为 5`),
    section('erase-remove 配合，才完成容器删除', [
      'health.erase(newEnd,health.end()) 删除逻辑终点之后的整个尾部区间，vector 的 size 才变为 3。这就是 C++17 常见的 erase-remove 写法。代码可以合并为一条表达式，但学习时先拆成两步更容易验证每一步的职责。',
      '筛选完成后再排序，结果为 80、30、10。对空范围调用这两个算法是正常情况；全为零时 remove_if 返回 begin，erase 删除全部元素，最终 size 为 0。'
    ], cpp`health.erase(newEnd, health.end());
std::sort(health.begin(), health.end(),
          [](int a, int b) { return a > b; });
for (int hp : health) std::cout << hp << " ";
std::cout << "\nAlive: " << health.size() << "\n";`),
    section('三个易错点：边界、谓词和身份', [
      '谓词返回 true 的元素会被移除，因此“死亡条件”写 hp<=0；误写 hp>0 会留下死亡数据。排序比较器则表示“排在前面”，两个 bool 回答的含义不同，不能因为都是 lambda 就混用。',
      '算法执行后，旧的元素位置可能不再对应原角色。游戏里通常让角色有稳定 ID，显示顺序用另一个列表或视图表达。若同血量时希望保持原顺序，可以进阶了解 stable_sort；它不会解决角色 ID 设计问题。'
    ]),
    section('进阶追问：复杂度与有状态比较器', [
      'sort 的比较次数为 O(N log N) 量级，remove_if 和后续 erase 是线性处理。不要在每次比较中加载文件、查网络或改变全局状态，因为比较器可能执行很多次，且调用次序不能作为业务流程依赖。',
      '比较浮点数时还要考虑 NaN 等值是否破坏预期排序关系。本课只用 int，先把规则和区间理解准确。性能优化之前应先确认算法语义正确，而不是把所有循环都换成 lambda。'
    ]),
    section('练习连接：先预测中间状态，再看最终输出', [
      '在 remove_if 前、remove_if 后、erase 后各打断点，观察 size 和 newEnd。随后测试空 vector、全部死亡、全部存活、相同血量和负血量。负数应与零一样被过滤。',
      '最后把阈值改为 10 并使用 [limit] 捕获，预测哪些值被保留。参考解答仍保持原规则，输出 80 30 10 与 Alive: 3；扩展实验应另做笔记，便于区分本题验收。'
    ])
  ],
  19: [
    section('内存里的角色，为什么重开程序就丢失', [
      '前面的 Character 和容器保存在进程内存中。进程结束后，变量名与地址都不能作为下一次运行的存档。想恢复 Sir Arthur 的生命值，需要把有意义的字段转换成明确格式写到文件，再在下次读取并重建数据。',
      '这里先保存 name 和 health 两项，增加版本号 1。暂不做完整存档系统：没有加密、压缩、多槽位或原子替换。先掌握**格式明确、失败可判断、验证后才更新**三条底线。'
    ]),
    section('不能直接把对象内存块倒进文件', [
      'std::string 对象内部可能保存指针、容量等实现细节，它的内存布局不是姓名文本本身。含虚函数的角色还有实现相关信息。直接写 sizeof(Character) 字节会把进程专属的数据写出去，下一次读回无法恢复正确的对象关系。',
      '序列化要保存逻辑值，例如版本、姓名、生命值，而不是对象地址。角色之间的关系通常用稳定 ID 保存，再在加载时重新连接；保存裸指针数字并不能让目标在下次运行中复活。'
    ], cpp`struct Save {
    std::string name;
    int health = 100;
};
// 保存的是 name 的字符和 health 的数值，不能直接写 Save 的内存块。`),
    section('ofstream 与 ifstream：文件也是受 RAII 管理的资源', [
      'std::ofstream 用于输出，std::ifstream 用于输入，都由 <fstream> 提供。构造时尝试打开文件，离开作用域自动关闭。路径 "save.txt" 相对于程序当前工作目录，而不是固定相对于 .cpp 文件，所以在不同终端目录运行可能产生不同文件。',
      '默认 ofstream 打开同名文件会截断原内容，适合本课整体重写一个小存档，却不能据此宣称抗断电。生产保存常用临时文件、检查写入结果后再替换正式文件，具体还要考虑平台文件系统语义。'
    ], cpp`std::ofstream out("save.txt");
out << 1 << " " << std::quoted(s.name) << " " << s.health << "\n";
out.flush();
return static_cast<bool>(out);`),
    section('逐项解释写入格式：为什么姓名要 quoted', [
      '最终文本类似 1 "Sir Arthur" 75。第一个数字是版本，第二项是带引号的姓名，第三项是生命值。普通 >> string 遇到空格就停止，无法完整读取 Sir Arthur；std::quoted 用引号边界和转义规则让带空格的字符串仍是一个字段，需要包含 <iomanip>。',
      'flush() 把缓冲数据送向底层流，然后通过流的 bool 状态判断是否出现失败。仅“文件存在”不能证明写入成功；磁盘满或权限问题也可能造成输出失败。这里检查到的是流层结果，不能把它等同于硬件级持久化保证。'
    ]),
    section('读入时先用临时对象，避免半份数据污染当前状态', [
      '设 current 是玩家正在使用的存档。若直接读 current.name，再读 health 时失败，current 可能已经部分改变。先读入 temporary，任何失败都 return false，current 完全不动，只有所有检查成功才整体赋值。',
      '表达式 !(in >> version >> quoted(...) >> health) 检查整条提取链的结果；某一项无法读取，流进入失败状态。这里的 ! 作用于流的状态判断，不是判断 health 是否为零，health=0 本身是合法存档。'
    ], cpp`int version = 0;
Save temporary;
if (!(in >> version >> std::quoted(temporary.name) >> temporary.health))
    return false;
if (version != 1 || temporary.health < 0 || temporary.health > 100)
    return false;
current = temporary;
return true;`),
    section('版本号解决什么问题：格式变化必须可识别', [
      '假如下次新增 mana，如果仍把旧文件按新字段强读，失败原因会很含糊，甚至把不同字段当成合法数据。版本号让加载器明确选择：支持并解析、迁移旧版本，或者拒绝未知版本。本课只支持版本 1，所以 version!=1 时直接失败。',
      '版本号不是随便写一个数字就自动兼容；真正兼容仍要实现旧格式到新数据结构的转换。也不要仅修改写入版本号而不修改读取规则，两个方向必须一致。'
    ]),
    section('沿参考程序追踪：为什么恢复后是 75 而不是默认 100', [
      'main 先把 {"Sir Arthur",75} 传给 writeSave。写入成功后，Save restored 初始 health 为 100；loadSave 将文件字段读入 temporary 并验证，最后 current=temporary，所以 restored.health 才从 100 更新为 75。输出为 Sir Arthur: 75。',
      '若文件不存在、数字字段损坏、版本变为 2 或生命值超出 0..100，loadSave 返回 false，restored 仍保持调用之前的状态。参考 main 会在加载失败时返回 2，而不是继续把默认数据伪装成恢复成功。'
    ], cpp`if (!writeSave({"Sir Arthur", 75})) return 1;
Save restored;
if (!loadSave(restored)) return 2;
std::cout << restored.name << ": " << restored.health << "\n";`),
    section('错误对照：测试坏文件不能每次先把它覆盖掉', [
      '参考 main 每次都会先写入正确文件。如果你手动破坏 save.txt 后仍原样运行，writeSave 会先覆盖坏内容，当然观察不到加载失败。测试坏文件时，应暂时只调用 loadSave，或单独写一个加载测试入口。',
      '当前格式是简化模型：std::quoted 的提取允许某些未加引号的输入，本例也没有强制拒绝尾部额外内容。因此不要把它描述为严格通用格式解析器。选做可增加“读取后跳过空白并要求到达文件末尾”的检查。'
    ], cpp`Save current{"Keep Me", 60};
const bool ok = loadSave(current); // 测试前手动准备坏文件
std::cout << ok << ": " << current.name << ", " << current.health << "\n";
// 加载失败时应保留 Keep Me, 60`),
    section('资源释放与数据完整性是两个不同层次', [
      '文件流析构保证关闭资源，不保证文件内容在所有故障下完整。写一半进程崩溃可能留下半份文件；“使用 RAII”与“可靠存档格式”不能互相替代。先把错误返回值传回调用者，再根据产品要求设计备份和替换流程。',
      '读取外部数据也不能只靠 assert；发布构建可能关闭断言。生命值范围和版本检查必须是实际执行的 if 分支。下一课将进一步区分返回值、异常和调试断言各自处理什么问题。'
    ]),
    section('练习连接：成功和失败都必须有证据', [
      '成功用例检查含空格姓名、health=0、health=100；失败用例检查缺失文件、损坏数字、版本错误、health=-1 和 101。每个失败用例都同时检查返回 false 与 current 未改变。',
      '把运行目录、存档文本和输出记在练习 README 的笔记里。清理时只删除练习生成的 save.txt，不要把网站 learning-data 中的正式记录当作本课测试文件。'
    ])
  ],
  20: [
    section('出错不等于崩溃：先定义什么是合法伤害', [
      '第 19 课用 bool 表达加载失败。现在处理战斗函数：health=100、damage=30 应得到 70；伤害超过当前生命值应得到 0；负伤害不是“回血”，而是调用约定不允许的参数。先写清规则，再决定用什么方式报告失败。',
      '本课用异常演示负伤害的错误通路，不表示所有输入错误都应该抛异常。游戏 UI 中用户输错文本通常可以用返回值或结果类型提示；函数的错误处理方式应让调用者能明确区分成功与失败。'
    ]),
    section('旧写法的问题：把失败偷偷变成一个正常数值', [
      '如果负伤害直接返回 0，调用者无法区分“角色被打到零血”与“参数无效”。若用 -1 表示错误，又必须确保每个调用者都记得检查。bool、optional、结果结构和异常都可以表达失败，关键是接口契约明确，而不是把错误混进正常结果。',
      '当前 applyDamage 约定 health 是非负有效值，负 damage 抛异常。不要只检查 damage 就声称函数验证了所有可能输入；若未来允许从文件任意读取 health，应在数据入口另加验证。'
    ], cpp`int applyDamage(int health, int damage) {
    if (damage < 0) throw std::invalid_argument("negative damage");
    return damage >= health ? 0 : health - damage;
}`),
    section('throw 从哪里来：中断当前正常返回路径', [
      'std::invalid_argument 表示不合法参数，由 <stdexcept> 提供。throw 后面的表达式创建异常对象，控制流离开当前正常执行路径，寻找匹配的 catch。它不是打印日志；如果没有被合适的处理器接住，程序可能终止。',
      '上例负伤害进入 throw 后，下面的 return 不再执行。正常 damage=30 不会抛出，直接计算 100-30=70；damage>=health 时返回 0，也避免把血量算成负数。'
    ]),
    section('try 与 catch：错误交给哪一层处理', [
      'try 包住可能抛异常的一段操作，catch 声明自己处理哪类异常。std::invalid_argument 继承自 std::exception，所以 catch(const std::exception& error) 能接住它；按 const 引用接收避免复制和按值切片。',
      'error.what() 返回错误说明文本。catch 不是让失败调用变成成功返回值：applyDamage(100,-1) 没有产生一个正常 int，执行将从匹配 catch 内继续。若需要重试，应由处理层明确安排。'
    ], cpp`try {
    (void)applyDamage(100, -1);
} catch (const std::exception& error) {
    std::cout << "Error: " << error.what() << "\n";
}`),
    section('(void) 是什么意思：忽略结果但保留调用', [
      '(void)applyDamage(...) 表示明确忽略这个函数的返回值，函数仍会被执行，异常仍会抛出。它不是把函数“转换成不出错的版本”，也不是删除这条语句。此处只想验证失败路径，所以不需要保存返回结果。',
      '在正常路径中仍应使用有意义的结果，例如 health=applyDamage(health,damage)。如果只是调用而不接返回值，原 health 不会被改变，因为参数是按值传入，函数返回新生命值而不修改调用者变量。'
    ], cpp`int health = 100;
applyDamage(health, 30);          // 结果被丢弃，health 仍是 100
health = applyDamage(health, 30); // 保存结果后才是 70`),
    section('异常经过局部对象时，RAII 怎样帮助清理', [
      '从 throw 位置走向匹配处理器的过程中，会销毁沿途已成功构造、需要离开作用域的自动对象，这称为栈展开。所以用 RAII 管理资源，比在正常末尾写一次 release 更可靠。',
      '异常不会自动回滚你已经修改的所有业务变量，也不会替裸指针负责 delete。若某操作要求失败后状态不变，可以借鉴上一课的“临时对象验证成功后再提交”。析构函数也应避免在栈展开中再次抛异常。'
    ], cpp`try {
    Resource texture("Texture"); // 第15课的 RAII 类型
    applyDamage(100, -1);
    // 不会走到这里
} catch (const std::exception&) {
    // 进入这里前，texture 已按作用域规则清理
}`),
    section('assert 为什么不能检查玩家输入', [
      'assert 用来检查开发者认为始终成立的内部假设，例如“进入更新函数时对象已经初始化”。定义 NDEBUG 的构建可能移除断言，所以不能把输入解析、存档版本和伤害范围检查仅写在 assert 里。',
      '断言表达式里也不要放必须发生的副作用。assert(saveGame()) 在断言关闭时可能连存档都不执行。实际操作先单独执行并处理失败，断言只观察状态。'
    ], cpp`// 正确：输入验证始终执行
if (damage < 0) { /* 报告失败或抛异常 */ }
// 断言适合内部约束，不能取代上面的检查
// assert(damage >= 0);`),
    section('VS Code 调试顺序：先定位第一次错误', [
      '用调试构建运行，在 applyDamage 入口、throw 所在行和 return 所在行设断点。正常调用时观察 health=100、damage=30；单步经过判断后进入 return。负数调用则进入 throw，然后到 catch，观察 error.what()。',
      'Step Over 执行当前调用，Step Into 进入函数，调用栈显示是谁传入了这个 damage。不要只看最后错误输出；若血量错误，应先找第一次不符合规则的写入，再从调用栈追查参数来源。可添加变量监视，避免每一步都靠 cout。'
    ]),
    section('边界与整数计算：检查表达式顺序也有意义', [
      '本课在 health 非负、damage 非负的前提下，先比较 damage>=health，再执行差值；过量伤害直接返回 0。这比先执行任意范围整数减法、再随便补一个 max 更容易证明安全。若引入负 health，前提就被破坏，需扩展接口校验。',
      '不要写 catch(...) 后什么也不做，这会把错误藏起来。最少也应明确恢复策略或向上报告。若把异常转换成错误提示，提示要说明哪个动作失败，不能继续显示“攻击成功”。'
    ]),
    section('练习连接：分别验收正常、过量与非法输入', [
      '依次测试 (100,30)→70、(100,0)→100、(100,100)→0、(100,150)→0、(100,-1)→异常。记录最后一个用例没有正常返回 int，而是进入 catch；参考输出保持 Health: 70 和 Error: negative damage。',
      '再通过断点验证你对流程的解释。会使用 throw 只是语法层；能够选择合适的错误接口、保持失败状态明确、用调试器找到首次错误，才是本课要建立的能力。'
    ])
  ],
  21: [
    section('文件变多后，为什么一条 g++ 命令不够方便', [
      '第 12 课已经拆分头文件和实现文件。现在项目继续增长，每次手写所有 .cpp、包含路径和编译选项，容易漏掉文件或让不同机器使用不同标准。CMake 用一个文本配置描述“有哪些目标、目标需要什么”，再生成适合本机的构建系统。',
      '**CMake 不是编译器**。配置阶段读取 CMakeLists.txt、检查工具链并生成构建规则；构建阶段由构建工具调用 g++、Clang 或 MSVC，之后执行链接。读日志时先区分自己在哪个阶段失败。'
    ]),
    section('先建立最小文件依赖：声明、实现与入口', [
      'Damage.h 声明 applyDamage，让 main.cpp 能知道函数签名；Damage.cpp 提供唯一的函数定义。把函数声明写进头文件不等于已经把实现参与链接，所以构建目标必须列出 Damage.cpp。',
      '#pragma once 防止同一头文件在一个翻译单元重复包含，它不负责把 .cpp 编译进去。这里继续使用非正伤害不改变血量的规则，与第 20 课的异常接口不同；项目接口变化时必须看本课实际定义。'
    ], cpp`// Damage.h
#pragma once
int applyDamage(int health, int damage);

// main.cpp
#include "Damage.h"
#include <iostream>
int main() {
    std::cout << "Health: " << applyDamage(100, 35) << "\n";
}`),
    section('逐项解释 CMakeLists：声明项目和可执行目标', [
      'cmake_minimum_required 指定本配置所需最低 CMake 版本；project 命名项目并说明使用 CXX，也就是 C++。add_executable(battle main.cpp Damage.cpp) 创建名为 battle 的可执行目标，后面是它要编译的源文件，不是运行参数。',
      '头文件可以列入项目方便 IDE 展示，但真正产生目标代码的是相关 .cpp。这里不要把 reference 与自己练习目录中相同函数的两份实现同时加入目标，否则会在链接时出现重复定义。'
    ], `cmake_minimum_required(VERSION 3.20)
project(EngineLab LANGUAGES CXX)
add_executable(battle main.cpp Damage.cpp)`, { language: 'cmake' }),
    section('为什么配置写到 target 上，而不是修改一堆全局变量', [
      'target_compile_features(battle PRIVATE cxx_std_17) 表示 battle 自己需要 C++17 特性。PRIVATE 指该需求用于当前目标，不作为供其他依赖者继承的接口要求；PUBLIC 和 INTERFACE 会在以后构建库时更有意义。',
      '警告选项也属于目标。MSVC 的 /W4 与 GCC/Clang 的 -Wall -Wextra -pedantic 不是通用同一套参数，所以通过 if(MSVC) 分支区分。警告是帮助发现问题，不应为了隐藏问题一开始就全部关闭。'
    ], `target_compile_features(battle PRIVATE cxx_std_17)
if(MSVC)
  target_compile_options(battle PRIVATE /W4)
else()
  target_compile_options(battle PRIVATE -Wall -Wextra -pedantic)
endif()`, { language: 'cmake' }),
    section('配置与构建为什么是两条命令', [
      'cmake -S . -B build 中，-S 指源码目录，-B 指构建目录；第一次配置会把生成器、编译器路径等信息放进构建缓存。cmake --build build 再调用该目录对应的构建工具。修改普通 .cpp 后通常只需构建，不必删除全部缓存重来。',
      '以下命令是终端命令，不是写进 CMakeLists 的内容。Windows 沿用 MSYS2/MinGW 时可以显式选 MinGW Makefiles，并保证 g++ 与 make 来自同一套环境；macOS 通常直接使用本机默认生成器和 Clang。'
    ], `# Windows / MinGW：在本课目录执行
cmake -S . -B build -G "MinGW Makefiles"
cmake --build build
# macOS：通常不指定 MinGW 生成器
cmake -S . -B build
cmake --build build`, { language: 'cmake' }),
    section('构建目录隔离：为什么不把所有产物放源码旁边', [
      'build 保存对象文件、生成器文件、缓存和可执行程序。这些产物与平台和工具链有关，放独立目录可以随时重建，不会与代码、存档和学习记录混在一起。Git 应忽略 build，但要提交 CMakeLists 和源码。',
      '切换 MinGW、MSVC、Clang 或生成器时，用新的构建目录更可靠；不能直接让旧缓存里固定的编译器路径被另一套工具接管。也不要删除 exercises 根目录来“清理构建”，只处理确认属于本课的产物目录。'
    ]),
    section('逐步追踪一次完整构建', [
      '编译 main.cpp 时，编译器看到头文件声明，生成对 applyDamage 的调用；编译 Damage.cpp 时生成其定义；链接阶段把两者组成 battle。运行后计算 damage=35>0，返回 max(0,100-35)=65，输出 Health: 65。',
      '若报找不到 Damage.h，先查包含路径和文件名；若报 undefined reference 或 unresolved external symbol，先查实现是否参与链接及签名是否一致。两类错误所在阶段不同，不应都通过重复 include .cpp 来解决。'
    ], cpp`#include "Damage.h"
#include <algorithm>
int applyDamage(int health, int damage) {
    return damage > 0 ? std::max(0, health - damage) : health;
}`),
    section('找得到程序但运行不了：可执行路径与构建配置', [
      'MinGW 单配置构建的例子通常运行 .\\build\\battle.exe；macOS 通常运行 ./build/battle。Visual Studio 等多配置生成器可能把产物放进 Debug 或 Release 子目录，构建时用 --config Debug 指定配置。',
      '因此“构建成功但找不到 battle”不一定是编译失败，要看实际生成器与输出位置。不要在浏览器代码块中复制 Windows 路径到 macOS 后期待原样执行；课程 README 会区分两种系统命令。'
    ]),
    section('直接 g++ 验证仍然有价值', [
      '尚未安装 CMake 时，可以先用 g++ -std=c++17 main.cpp Damage.cpp -o battle 验证 C++ 源码。这能把“代码本身有误”与“构建工具配置有误”分开，但它不能代替完成本课的 CMake 配置任务。',
      'UE 后面有自己的 Unreal Build Tool 和模块规则，不应把普通课程的 CMakeLists 直接套进 UE 工程。通用知识是目标、依赖、编译与链接，不同生态负责生成规则的工具可能不同。'
    ]),
    section('练习连接：一次小改动验证依赖关系', [
      '先完成最小构建并运行出 65；再只修改 Damage.cpp 中计算规则，重新 build，观察增量构建。临时从 add_executable 去掉 Damage.cpp，阅读链接错误后恢复，理解“声明存在但定义未链接”的差别。',
      '验收时提交 CMakeLists、头文件和源文件，保留 build 在忽略规则内。不要提交本机绝对编译器路径，否则换到另一台 PC 或 Mac 就失去可移植性。'
    ])
  ],
  22: [
    section('把语言知识接成闭环：一个能结束的战斗程序', [
      '前面分别学过继承、多态、RAII、智能指针和容器。本课把它们接起来：创建 Arthur 与 Merlin，交给统一 battle 调度，输出胜者和剩余生命值，最后自动释放角色。目标不是堆功能，而是每个模块职责清楚，任何合法对战都不会无限循环。',
      '固定本课规则：Warrior 120 生命、每击 35；Mage 80 生命、100 魔法，每击消耗 20 造成 40。死亡者不能行动，先手击杀后后手不能反击；最多执行 100 轮，没有产生唯一胜者就输出平局。'
    ]),
    section('先设计 Character：把所有职业都必须遵守的规则集中', [
      'Character 保存 private 的 name 和 health，对外提供 getName、isAlive、takeDamage、print。伤害下限等规则只写一处，避免 Warrior 扣血方式和 Mage 扣血方式逐渐不一致。构造时用 max(0,hp) 保证初始血量非负。',
      'attack 留作纯虚函数，因为不同职业攻击不同；析构设为 virtual，因为角色最终通过 unique_ptr<Character> 销毁。battle 不需要知道私有 health 的布局，只使用公开接口。'
    ], cpp`bool isAlive() const { return health > 0; }
void takeDamage(int damage) {
    if (damage > 0 && isAlive())
        health = std::max(0, health - damage);
}
virtual void attack(Character& target) = 0;
virtual ~Character() = default;`),
    section('派生类只负责自己的变化：伤害与魔法消耗', [
      'Warrior 的构造函数把生命值 120 固定交给 Character；攻击先检查自己活着，再要求 target 接收 35 伤害。Mage 除了生命值还管理 mana，只有活着且 mana>=20 才消耗 20 并造成 40 伤害。',
      '这样 battle 不需要写 if(职业==法师) 才扣魔法。添加 Archer 时新增派生实现即可；不要把所有职业专用字段都塞回 Character，基类只承载共同契约。'
    ], cpp`void Mage::attack(Character& target) {
    if (isAlive() && mana >= 20) {
        mana -= 20;
        target.takeDamage(40);
    }
}`),
    section('调度函数为什么传引用，而不是接管 unique_ptr', [
      'battle(Character& first,Character& second) 只借用两个现有角色来战斗，不负责创建或销毁它们。容器管理生命周期，battle 管理行动顺序，这两种责任分开后，测试时也能给 battle 传局部角色而不必总是动态分配。',
      '如果参数按 Character 值传递，会遇到抽象类型或切片问题；若强行把 unique_ptr 按值传入，则会转移拥有权，战斗结束可能把角色直接销毁，违背队伍还需要显示战报的需求。'
    ]),
    section('先手攻击后为什么还要再次判断后手存活', [
      'while 开头确认双方存活，只证明这一轮开始时都活着。first.attack(second) 可能把 second 打到 0；必须再次检查 second.isAlive() 才能反击，否则会出现“死亡角色本轮仍打了一拳”的规则错误。',
      '职业内部也有存活检查，是让 attack 接口单独调用时仍遵守规则；调度中的检查则避免不必要调用、明确回合流程。两处检查表达不同层次的约束，不应因为重复出现条件就随便删去。'
    ], cpp`int rounds = 0;
while (first.isAlive() && second.isAlive() && rounds++ < 100) {
    first.attack(second);
    if (second.isAlive()) second.attack(first);
}`),
    section('逐轮算数：为什么最后 Arthur 是 40 血', [
      '第一轮 Arthur 将 Merlin 从 80 打到 45，Merlin 花 20 魔法把 Arthur 从 120 打到 80。第二轮 Merlin 从 45 到 10，Arthur 从 80 到 40，Merlin 魔法剩 60。第三轮 Arthur 再打 35，Merlin 被限制到 0，不能反击，所以 Arthur 保持 40。',
      '若输出 Arthur=0 或 Merlin 仍反击，优先检查回合顺序与中途存活判断，不要先随意修改职业伤害来迎合参考结果。数值追踪能把规则错误定位到具体一轮。'
    ], undefined, { table: { headers: ['时刻', 'Arthur HP', 'Merlin HP', 'Merlin Mana'], rows: [['初始', '120', '80', '100'], ['第1轮结束', '80', '45', '80'], ['第2轮结束', '40', '10', '60'], ['第3轮先手攻击后', '40', '0', '60']] } }),
    section('100 轮上限解决什么：无进展状态也必须可结束', [
      '如果未来增加不造成伤害的训练假人，或者双方技能都被护盾抵消，仅判断双方存活会永远循环。回合上限保证调度一定结束。参考使用 rounds++<100，先比较旧值再递增，循环体最多执行 100 次；最后一次失败检查可能使计数变为 101，不要直接把它当实际执行轮数显示。',
      '若需要准确显示已执行轮数，更清楚的写法是在循环体开始 ++rounds，并在条件写 rounds<100。本课参考没有输出轮数，所以保留现有实现，但必须理解后置递增的语义。'
    ]),
    section('胜负判断为什么不能只看 first 是否存活', [
      '到上限时双方可能都还活着，不能因为 first.isAlive() 就判先手胜利。必须检查“一方活着且另一方死亡”，其余情况输出 Draw (round limit)。本教学版本将双方初始都已死亡等无唯一胜者情况也归为该提示，若做产品需要设计更准确的结束原因类型。',
      '胜负状态、结束原因与战报 UI 是不同信息。未来可让 battle 返回一个 BattleResult，而不是直接打印；但不应在尚未验证基本规则前引入复杂框架。'
    ], cpp`if (first.isAlive() && !second.isAlive())
    std::cout << first.getName() << " wins!\n";
else if (second.isAlive() && !first.isAlive())
    std::cout << second.getName() << " wins!\n";
else
    std::cout << "Draw (round limit)\n";`),
    section('队伍拥有，调度借用，输出后自动清理', [
      'team 中每个 unique_ptr 拥有一个角色，*team[0] 得到角色引用后传给 battle。循环打印通过基类接口访问各角色，main 结束时容器销毁其拥有者，角色通过虚析构正确销毁。没有裸 new/delete，也没有根据职业字符串分支。',
      '调用前应确保队伍有两个非空成员。本课 main 明确添加两人后立即使用，满足这个前提；如果改成玩家动态组队，就需要检查 size 与空指针，不能把固定示例的前提直接搬到任意输入。'
    ], cpp`std::vector<std::unique_ptr<Character>> team;
team.push_back(std::make_unique<Warrior>("Arthur"));
team.push_back(std::make_unique<Mage>("Merlin"));
battle(*team[0], *team[1]);
for (const auto& member : team) member->print();`),
    section('练习连接：正常输出只是第一项验收', [
      '先得到 Arthur wins!、Arthur: 40、Merlin: 0；再验证目标初始已死亡、负伤害、Mage 魔法不足以及双方零伤害。构造零伤害的测试职业应使用共同接口，避免修改 battle 来特判测试名称。',
      '最后尝试增加 Archer，仅修改职业定义和创建队伍的位置。如果为了新职业必须改 battle 的 if/else，说明多态接口还没真正承担起变化。保持扩展实验与原始参考分开，基础结果才能持续回归验证。'
    ])
  ],
  23: [
    section('角色有了行为，怎样描述它在世界的哪个位置', [
      '前面战斗只需要名字和血量，角色不必真正站在地图上。进入引擎前先解决空间问题：玩家在 (2,1)，目标在 (5,5)，该朝哪里移动？单独一个距离无法表达方向，需要把两个坐标组织成向量数据。',
      '本课用二维 double 坐标，不绑定某个引擎。**位置**表示相对原点的点，**位移**表示从一点到另一点的变化；它们可以用同样的数据结构存储，但含义不同。位置相减得到位移，位置加位移得到新位置。'
    ]),
    section('为什么不能把目标坐标直接当作移动方向', [
      '目标 (5,5) 表示它相对原点的位置；玩家在 (2,1) 时，向目标的位移应该是 (5-2,5-1)=(3,4)。如果直接把 (5,5) 当方向，相当于忘记了玩家的当前位置，只有起点恰好是原点时才可能凑巧正确。',
      '变量名尽量标明语义：position、target、offset、direction，不要全部叫 vector。数学运算正确不代表业务含义正确，尤其后面还要加入世界坐标、本地坐标与单位。'
    ], cpp`Vec2 position{2, 1};
Vec2 target{5, 5};
Vec2 offset{target.x - position.x, target.y - position.y};
// offset 是 (3,4)，不是 (5,5)`),
    section('Vec2 为什么用 struct：把相关数据与操作放在一起', [
      'struct Vec2 中 x、y 默认可公开访问，适合这种简单数学值类型。double x=0,y=0 提供零初始化，Vec2{} 因而表示零向量。length() const 表示计算长度不修改当前向量。',
      '这里没有要求继承，也没有动态分配。向量是一个小值，按值返回清晰且便于组合；不需要为了“面向对象”把每个坐标都放进 unique_ptr。'
    ], cpp`struct Vec2 {
    double x = 0, y = 0;
    double length() const {
        return std::sqrt(x * x + y * y);
    }
};`),
    section('长度从哪里来：先用 (3,4) 做可验证的算数', [
      '二维直角坐标中，向量长度为 sqrt(x*x+y*y)。对 (3,4)，3²+4²=25，开方得到 5。std::sqrt 来自 <cmath>；注意 x*x 是乘法，C++ 中 ^ 是按位异或，不能写 x^2 表示平方。',
      '长度只有大小，没有方向。两个不同方向的向量可能长度相同，例如 (3,4) 和 (-3,4) 都长 5，所以不能拿“距离相同”推导“运动方向相同”。'
    ], cpp`Vec2 offset{3, 4};
double distance = offset.length(); // 5
// std::sqrt(3*3 + 4*4) = std::sqrt(25)`),
    section('归一化为什么要除以长度', [
      '若直接每次加上 (3,4)，每次就走 5 个单位；目标越远，位移越大，移动可能越快。想把方向与速度分开，需要让方向向量长度变为 1：每个分量同除以原长度，得到 (0.6,0.8)。',
      'normalized() 返回新向量，不修改原对象。它保留方向但丢弃原长度；如果还需要距离，先保存 length。不是所有向量都应归一化，例如速度向量的长度本来就表示每秒速度，随便归一化会把速度信息抹掉。'
    ], cpp`Vec2 normalized() const {
    double len = length();
    return len > 1e-9 ? Vec2{x / len, y / len} : Vec2{};
}`),
    section('为什么零向量需要单独分支', [
      '(0,0) 没有确定方向，长度为 0，不能直接除以长度。代码用 len>1e-9 作为接近零的判定，太小就返回零向量。这是本练习选择的业务策略：没有足够位移时不移动，而不是凭空选一个方向。',
      '1e-9 是 10 的负 9 次方，不是语言内置的万能误差。合适阈值与坐标单位和数值范围有关。若角色正好站在目标点，返回零方向比产生 NaN 后污染整个 Transform 更容易控制。'
    ]),
    section('方向如何重新变成移动：把长度信息显式放回来', [
      '方向 (0.6,0.8) 只说明朝向。若想移动距离 2，就乘 2，位移成为 (1.2,1.6)，再加到位置。下一课再把距离写成“速度×时间”，得到与帧率更独立的运动。',
      '不能把归一化后的 direction 直接赋给 position；那会把角色传送到单位圆附近，而不是在当前位置前进。运算两侧的意义要跟着变量名一起检查。'
    ], cpp`Vec2 direction = Vec2{3, 4}.normalized();
const double distance = 2.0;
position.x += direction.x * distance;
position.y += direction.y * distance;`),
    section('坐标空间与单位：同样的三个数字不一定能直接相加', [
      '二维示例可以约定 x 向右、y 向上，但屏幕 UI 常采用向下的 y；UE 默认世界中 X 常用于前方、Y 用于右方、Z 用于上方，距离通常按厘米。导入资源、相机空间和世界空间还可能采用不同约定。',
      '本地坐标以对象自身为参考，世界坐标以场景为参考。旋转后的角色“向前”不一定等于世界 +X。学习 UE 时必须看接口名，例如 AddActorWorldOffset 与本地方向接口，不能只看 FVector 的分量类型。'
    ]),
    section('易错对照：整数除法、浮点相等和极端数值', [
      '若用 int 保存分量，3/5 会得到整数 0，归一化结果就错误。本例用 double，保证除法按浮点执行。比较计算结果也应使用合理误差，通常不要求每次 length()==1.0 精确成立。',
      'sqrt(x*x+y*y) 是清晰的基础写法，极大分量可能在平方时溢出；通用数学库可用 hypot 等更稳健实现。本课程坐标范围很小，先理解规则，不把简化实现宣称为覆盖所有数值范围的引擎数学库。'
    ]),
    section('练习连接：既测常见方向，也测没有方向', [
      '验证 (3,4) 长度 5、归一化 (0.6,0.8)；验证 (0,0) 返回 (0,0)，不产生 NaN；再测 (-3,4)、(0,-2)。每次先预测符号和长度，再运行。',
      '参考输出固定为 Direction: 0.6, 0.8 和 Zero: 0, 0。完成后写一句解释：单位方向决定朝哪走，速度和经过时间决定走多远。这句话会直接连接下一课的 DeltaTime。'
    ])
  ],
  24: [
    section('同一按键，为什么高帧率电脑会跑得更快', [
      '上一课知道方向与距离是两件事。若每次更新 position+=1，30 FPS 一秒更新 30 次就走 30，60 FPS 一秒更新 60 次就走 60。程序实际上定义的是“每帧移动 1”，而玩家期待的是“每秒移动固定距离”。',
      '**DeltaTime** 表示这一次更新对应的时间间隔，通常以秒为单位。用速度乘时间得到本次位移，才能把移动规则从帧数转换为真实时间。它是物理量和接口契约，不是看见移动代码就机械添加的装饰参数。'
    ]),
    section('先认识简化游戏循环：输入、更新、渲染', [
      '输入采集按键等意图，更新根据输入与经过时间修改世界状态，渲染把当前状态显示出来。分开这三件事后，读取按键不必直接操纵每个像素，渲染也不应偷偷改变战斗结果。',
      '真实引擎会有额外阶段、并行线程和多个更新频率，这个三步模型只帮助建立职责。下方是流程伪代码，不是要让当前控制台程序无限占满 CPU。'
    ], cpp`while (running) {
    readInput();
    update(deltaTime);
    render();
}`),
    section('公式从单位推出来，而不是死记 position += speed * dt', [
      'speed=6 表示每秒走 6 个距离单位，dt=1/30 秒，单次位移为 6×1/30=0.2。30 次累计 6。60 FPS 时 dt=1/60，单次位移 0.1，60 次仍累计 6。',
      '单位检查是非常有效的调试手段：距离/秒×秒=距离。如果接口给出毫秒，先除以 1000 转成秒；如果把 16 毫秒直接当 16 秒，移动会放大 1000 倍。'
    ], cpp`const double speed = 6.0; // 单位 / 秒
double position = 0.0;
position += speed * deltaTime; // deltaTime 的单位必须是秒`),
    section('为什么必须写 1.0/30，而不是 1/30', [
      '1 和 30 都是整数，1/30 在 C++ 中先做整数除法，结果为 0；即使再赋给 double，也只能得到 0.0。让至少一个操作数是浮点数，例如 1.0/30，才能得到约 0.033333 秒。',
      '本课 simulate(frames,dt) 不读取真实系统时钟，而是按传入的固定 dt 重复更新，用于比较帧率结果。这是教学模拟；它没有创建窗口、处理真实输入，也没有实现生产游戏循环的计时器。'
    ], cpp`double simulate(int frames, double dt) {
    const double speed = 6.0;
    double position = 0.0;
    for (int i = 0; i < frames; ++i)
        position += speed * dt;
    return position;
}`),
    section('逐次跟踪：一秒不是由“某一种帧数”定义的', [
      'simulate(30,1.0/30) 累计时间为 1 秒，simulate(60,1.0/60) 也累计 1 秒。真正保持一致的是总时间而不是循环次数。若用 60 次但 dt 仍为 1/30，那就是模拟了 2 秒，移动 12 完全正确，不应为了输出相同再除以 2。',
      '浮点运算存在舍入，内部最终值可能非常接近 6 而不是精确等于 6。默认输出格式可能显示 6，验证时应用误差范围，不要只看显示的小数位推断底层精确值。'
    ], cpp`std::cout << "30 FPS: " << simulate(30, 1.0 / 30) << "\n";
std::cout << "60 FPS: " << simulate(60, 1.0 / 60) << "\n";
// 两者都应约为 6`),
    section('为什么乘 dt 还不能解决所有碰撞问题', [
      '若卡顿使 dt 一次达到 1 秒，角色可能一步跨过狭窄墙体；仅在新位置检查是否重叠可能漏掉途中碰撞。速度虽然按秒正确，离散检测的步长却太大。这就是“运动公式正确”和“碰撞求解可靠”的区别。',
      '截断 dt 能限制单次位移，但等于丢弃部分实际时间；把大间隔拆成多次小更新可保留更多时间。真实系统还需碰撞扫掠、物理子步或固定时间步，不能把任意 clamp 当作万能答案。'
    ]),
    section('进阶：固定时间步为什么要有累积器', [
      '渲染帧率变化时，可以把经过时间累积起来，每够 fixedDt 就推进一次固定更新，剩余不足一小步的时间留到下一帧。这样物理更新步长更一致，便于稳定求解；显示仍可以采用不同帧率。',
      '下面仅展示核心思路。生产代码要限制每帧追赶次数，避免更新越慢、欠下的步越多形成“死亡螺旋”；若为了限制而丢弃积压时间，需要明确接受的时间语义。固定步长也不会自动保证跨平台完全确定性。'
    ], cpp`accumulator += frameDelta;
while (accumulator >= fixedDt) {
    update(fixedDt);
    accumulator -= fixedDt;
}`),
    section('帧率独立也有前提：输入和数值积分', [
      '本课速度恒定，累计 speed×dt 很直观。如果速度本身受加速度改变，不同积分方法和步长可能得到不同误差；“加了 dt”不等于所有状态完全与帧率无关。理解模型假设比背口诀更重要。',
      '输入若表示一次事件，例如按下时跳跃，不应该每帧乘 dt 才触发；若表示持续方向，交给移动系统处理时也应按接口语义决定是否乘 dt。第 30 课 AddMovementInput 会由 CharacterMovement 负责更新，不在输入强度上重复乘时间。'
    ]),
    section('易错对照：时间不是累计时间与间隔随便选一个', [
      'update 需要的是本次间隔 dt，不是“从游戏启动到现在一共过去几秒”。若第一帧乘 1、第二帧乘 2、第三帧乘 3，位移会越来越大，角色像在不断加速。用变量名 frameDeltaSeconds 明确含义，比单字母 t 更不易误用。',
      '计时应使用适合测间隔的时钟，例如标准 C++ 中的 steady_clock，避免系统墙上时间被调整影响间隔。当前练习故意传入模拟 dt，所以没有把测时误差和平台窗口代码混在一起。'
    ]),
    section('练习连接：改变帧率，保持总时间相同', [
      '运行 30 与 60 FPS 的一秒模拟，结果都约 6；再加 120 FPS 和两秒用例，应分别约为 6 与 12。临时改成每帧固定加 1，观察错误，再恢复正确实现。',
      '最后写出大 dt 的局限与一种改进方案，说明它是否会丢弃时间。基础验收要求能从单位推导位移，进阶验收才是固定更新、追赶限制和插值，不必把示意累积器直接扩成完整引擎。'
    ])
  ],
  25: [
    section('树、玩家、子弹：为什么不能都塞进 Character 继承树', [
      '多态适合共享行为接口，但游戏对象的能力组合不一定构成整齐的“是一种”关系。玩家有位置和生命值，装饰树有位置却未必能受伤，伤害区域有位置和伤害却未必能移动。若把全部能力都放进一个巨型基类，大量对象会背负无用字段与条件分支。',
      '实体与组件把问题拆开：实体表达身份，组件表达某一种数据或能力，系统操作满足条件的实体。本课是最小组合模型，不是高性能 ECS 框架；先理解设计动机，再谈内存布局和批量调度。'
    ]),
    section('先把数据拆出来：Transform 和 Health 各管一件事', [
      'Transform 在这里只保存一维位置 x，Health 保存生命值。两个结构没有继承关系，也不负责找世界中的其他对象。Entity 再组合这些数据，像把不同能力装到同一个身份上。',
      '组件化不是“必须把每个字段拆成一个类”。拆分边界来自哪些数据一起变化、哪些对象需要它们、谁负责更新。把 x 和 y 拆成彼此不知道的服务反而可能增加复杂度。'
    ], cpp`struct Transform { double x = 0; };
struct Health { int value = 100; };`),
    section('没有生命值怎么表示：为什么不约定 health=-1', [
      '用 -1 表示“此对象没有生命组件”会把数据值和结构状态混在一起。std::optional<Health> 明确表示有一份 Health 或没有 Health，由 <optional> 提供。std::nullopt 是“没有值”的标记，不是一个生命值为零的组件。',
      '生命值 0 表示有生命组件但已经死亡；没有 Health 则表示本对象不参与该规则。区分这两种状态，伤害系统才能正确跳过装饰树，而不是把它当成已死亡角色。'
    ], cpp`struct Entity {
    int id;
    Transform transform;
    std::optional<Health> health;
};`),
    section('逐项拆开初始化：同样的实体，不同的组件组合', [
      'Entity player{1,{0},Health{100}} 按成员声明顺序初始化：id=1、transform.x=0、health 有值且 value=100。Entity tree{2,{5},std::nullopt} 则有位置但没有 Health。花括号不是调用某个隐藏引擎注册器，而是普通 C++ 聚合初始化。',
      '当前 id 是手动指定的整数，没有自动唯一性保证。示例只创建两个不同 ID；真正实体管理器需要生成、复用和验证规则，尤其删除后重新分配时不能让旧引用误指向新实体。'
    ], cpp`Entity player{1, {0}, Health{100}};
Entity tree{2, {5}, std::nullopt};`),
    section('伤害系统为什么先检查组件存在', [
      'optional 在条件中可判断是否含值，entity.health && amount>0 利用短路规则，只有组件存在且伤害为正才扣血。health->value 访问 optional 中的 Health；对没有值的 optional 直接用 -> 不合法，不能以“默认可能会给我一个对象”来猜测。',
      '这个函数不问“是不是 Player 类型”，只问“是否具有 Health 数据”。以后给树加 Health，它无需改变系统就能受伤，这就是能力组合带来的扩展方式。'
    ], cpp`void damage(Entity& entity, int amount) {
    if (entity.health && amount > 0)
        entity.health->value = std::max(0, entity.health->value - amount);
}`),
    section('逐次追踪：玩家变 70，树为什么没有变成 70', [
      'damage(player,30) 检查有 Health，计算 max(0,100-30)=70。damage(tree,30) 在第一个条件就失败，不会访问空组件，也不会创建组件。输出 Tree has health: 0 中的 0 是 bool 的默认显示，表示没有组件，不是树的生命值。',
      '若写 entity.health=Health{100} 则是主动给实体安装生命组件，与尝试伤害是不同操作。系统应只做它承诺的事，不能在“查询有没有”时悄悄改变对象能力。'
    ], cpp`damage(player, 30);
damage(tree, 30);
std::cout << "Player HP: " << player.health->value << "\n";
std::cout << "Tree has health: " << tree.health.has_value() << "\n";`),
    section('稳定 ID 为什么不能等于容器下标', [
      '假设实体存在 vector 中，下标 0 的对象删除后，原下标 1 可能前移；任务或攻击目标若保存下标，就可能指向另一个实体。稳定 ID 表示身份，下标只是当前存放位置，查找规则可以变化。',
      '进阶 ECS 常用索引加代际值，识别被删除后重用的槽位。当前小练习不实现这一机制，但至少不把 for 循环变量当永久身份，也不声称普通 int 自动消除了悬空引用。'
    ]),
    section('组件化与继承可以共存，不需要推翻前面的课程', [
      '继承描述共同接口或“是一种”，组合表达“拥有什么”。UE 中 Actor 可以继承 AActor，同时拥有多个 ActorComponent；不是学了组件就必须删除所有基类。选择应服务于变化方式，而不是为了追逐某个名词。',
      '本课 Entity 把组件内联保存，不同于按组件类型分组、批量处理的 ECS 存储。不能仅因代码里有 Entity 和 Component 两个名字就声称已经得到缓存友好、多线程安全的完整 ECS。'
    ]),
    section('新增能力时，先寻找最小数据与使用者', [
      '选做增加 Velocity{double x}，移动系统更新同时具有 Transform 和 Velocity 的对象。先定义单位，例如位置用米、速度用米/秒，再使用上一课的 dt。没有速度组件的树保持静止，不要靠名字里是否含 Tree 判断。',
      '系统在执行期间增删组件会引入遍历与引用失效问题，复杂框架通常有延迟修改等策略。当前例子不在遍历时重排实体，先把存在检查、单一职责和数据规则做准确。'
    ], cpp`// 选做方向：把速度视为可选能力
struct Velocity { double x = 0; };
// update 中：transform.x += velocity.x * deltaTime;
// 实际加入 Entity 前先确定哪些实体需要它。`),
    section('练习连接：不依赖类型名的受伤规则', [
      '验证玩家 100→70、树仍无 Health；再给树显式添加 Health{50}，同一个 damage 函数应可把它改为 20。测试零伤害、负伤害和过量伤害，确认不会创建组件或产生负血量。',
      '完成后用一句话解释“零血”和“没有 Health”的区别，再说明为何 ID 不应取容器下标。未来引擎编辑器的 Add Component 正是在更复杂的运行环境中表达类似组合关系。'
    ])
  ],
  26: [
    section('十个角色使用同一张图，为什么不应该加载十次', [
      '第 16 课已经能为对象安排拥有者。资源系统还有另一层需求：多个角色同时使用 hero.png 时，希望共享同一纹理；所有角色都不再使用时，希望能释放；下次再请求时可以重新加载。',
      '缓存负责按资源标识查找现有对象，调用者决定资源是否还在使用。这里让调用者拿 shared_ptr，缓存只记 weak_ptr，因此缓存不独自把所有历史资源永久留在内存中。'
    ]),
    section('先看错误选择：缓存持有 shared_ptr 会发生什么', [
      '如果 unordered_map<string,shared_ptr<Texture>> 永远保存每个加载结果，即使场景把自己的引用全部清掉，缓存仍是强拥有者，纹理不会释放。这不是 shared_ptr 失效，而是你明确让缓存继续拥有资源。',
      '某些引擎确实需要强缓存或按预算保留最近资源，那是另外一种策略。本课选择弱缓存：只有真实使用者的强引用延长生命周期，缓存索引可以保留已过期的条目。'
    ], cpp`std::unordered_map<std::string, std::weak_ptr<Texture>> index;
// 键是资源路径，值是观察共享对象的弱引用。`),
    section('为什么需要 weak_ptr，而不是保存原始 Texture*', [
      '原始指针在对象销毁后仍可能保留非空地址，不能仅通过 if(pointer) 确定资源存活。weak_ptr 与共享控制块关联，能通过 lock() 原子地尝试取得一个临时强拥有者；对象已不存在时返回空 shared_ptr。',
      'weak_ptr 不增加强引用计数，不会独自延长 Texture 生命周期。锁定成功后得到的 shared_ptr 则会在当前使用期间保证对象存在，避免“先判断存活，随后对象刚好被释放”的空隙。这里的 lock 不是给缓存 map 自动加线程锁。'
    ], cpp`if (auto existing = index[path].lock()) {
    return existing;
}
// existing 有值：复用；无值：需要创建资源。`),
    section('逐项拆开 get：查找、锁定、创建、登记', [
      'get(path) 返回 shared_ptr<Texture>，调用者因此成为共享拥有者。index[path] 在键不存在时会插入一个空 weak_ptr，所以首次 lock 失败；make_shared 创建新对象，index[path]=loaded 记录弱引用，再把强拥有者返回。',
      'std::make_shared 把构造和共享拥有权建立在一个表达式中。Texture 构造里打印 Load，仅用于证明是否创建；实际图片解码、显存上传和失败报告尚未实现，不要把日志模型当成真正纹理加载器。'
    ], cpp`std::shared_ptr<Texture> get(const std::string& path) {
    if (auto existing = index[path].lock()) return existing;
    auto loaded = std::make_shared<Texture>(path);
    index[path] = loaded;
    return loaded;
}`),
    section('为什么第二次请求没有第二行 Load', [
      'a=cache.get("hero.png") 第一次锁定失败，创建 Texture，输出一次 Load。b 请求同一个键时，a 仍持有强引用，lock 成功，返回同一对象，a==b 因此为 true，显示 Same resource: 1。',
      '这里共享的是对象，不是“恰好两张图片内容一样”。如果路径字符串不同，例如 hero.png 与 ./hero.png，当前 map 会视为不同键，可能重复加载。正式系统需要统一路径或使用规范资源 ID。'
    ], cpp`auto a = cache.get("hero.png");
auto b = cache.get("hero.png");
std::cout << "Same resource: " << (a == b) << "\n";`),
    section('reset 两次以后，为什么马上 Unload', [
      'a.reset() 放弃 a 的强拥有权，但 b 仍在，Texture 不销毁；b.reset() 后最后一个强拥有者消失，执行 Texture 析构并输出 Unload。index 的 weak_ptr 还存在，但不会阻止析构。',
      '再次请求同一路径时，旧弱引用 lock 失败，于是创建新的 Texture，再次输出 Load。c 在 main 结束时销毁最后的强引用，所以最终还有一行 Unload。这五行日志可以完整说明共享与弱观察的职责。'
    ], cpp`a.reset();
b.reset(); // 最后一个强引用释放，输出 Unload hero.png
auto c = cache.get("hero.png"); // 重新输出 Load hero.png`),
    section('缓存对象先销毁，资源是否必须一起销毁', [
      '不一定。当前缓存不拥有 Texture，某个调用者手里的 shared_ptr 可以比 Cache 活得更久。反过来，Cache 活着也不代表所有索引资源活着。这正说明“索引容器生命周期”与“实际资源生命周期”被解耦了。',
      '但如果 Texture 的析构需要某个 GPU 设备仍存在，光用 shared_ptr 并不能自动建立正确的设备销毁顺序。真实引擎需要更明确的资源依赖和线程约束，不能把引用计数当成全部架构。'
    ]),
    section('进阶边界：过期条目、并发和循环引用', [
      '弱缓存仍会积累路径键与过期 weak_ptr，可以周期性清理 expired 条目；这不会重新加载纹理。多个线程同时读写 unordered_map 则需要同步，否则既可能数据竞争，也可能同一路径同时加载两份。shared_ptr 的控制块能力不等于整个 Cache 线程安全。',
      '资源之间若相互保存 shared_ptr 也可能形成环，需要选择弱引用或由更高层统一拥有。当前 Texture 只保存字符串，没有环；不应因为示例运行释放成功就认为所有资源图都会自动释放。'
    ]),
    section('与 UE 的边界：不是给所有对象换成 std::shared_ptr', [
      '这里管理普通标准 C++ Texture。UE 的 UObject、Actor、Component 有引擎创建与垃圾回收体系，不应对它们直接 make_shared 或 delete。之后用 UPROPERTY 和 TObjectPtr 表达引擎可追踪引用，用引擎接口创建和结束对象。',
      'UE 还存在管理普通 C++ 对象的 TSharedPtr/TUniquePtr，与 UObject GC 不是同一套所有权。先识别对象属于哪套生命周期，再选指针类型，不能只按名字里是否有“智能”决定。'
    ]),
    section('练习连接：用日志证明缓存策略', [
      '检查同路径同时使用只加载一次；只 reset a 不卸载；最后强引用释放后卸载；重新 get 再加载。再增加 other.png，确认不同键各自管理，并尝试让资源拥有者比缓存先或后销毁。',
      '参考解答不读取真实图片，所以无需在文件夹里放 hero.png，也不要把“日志 Load”当作文件存在验证。基础验收是所有权和复用行为；真正图像加载属于后续引擎实践。'
    ])
  ],
  27: [
    section('从 main 到引擎：不是换一种语法，而是接入已有运行框架', [
      '前 26 课由自己写 main、创建对象、调用循环。UE 已经提供窗口、世界、输入、对象系统和主循环，你写的代码被挂到框架的生命周期入口。本课的目标很小：创建一个 Actor 类，放入关卡，在 Play 时输出 EngineLab ready。',
      '课程目标固定为 **UE 5.6、EngineLab 模块**。网页与标准 C++ 练习可在 PC/Mac 使用；UE 示例现有步骤以 Windows 受支持的 MSVC/Windows SDK 为目标，不沿用 MinGW。macOS 的 UE 工程要配置对应 Xcode/Clang 工具链。本环境没有实际 UE 编辑器构建结果，不把源码审查当成运行验证。'
    ]),
    section('为什么不能拿 g++ 直接编译这两个 UE 文件', [
      'LabProbe 依赖引擎头文件、模块导出、反射生成代码和链接库，不是独立控制台程序。Unreal Build Tool 读取项目与模块规则，Unreal Header Tool 处理反射声明，再由平台编译器编译链接。VS Code 是编辑与调试入口，不会凭空替代这些工具。',
      '先安装 UE 5.6 及其要求的工具链，创建 Games → Blank → C++ 项目并命名 EngineLab。保留生成的 .uproject、Source/EngineLab/EngineLab.Build.cs 等文件，只把练习 .h/.cpp 加入模块目录；不要用练习文件覆盖整个工程。'
    ]),
    section('逐项读类声明：AActor、导出宏和 UCLASS 各做什么', [
      'AActor 是能放进世界的对象基类，ALabProbe 使用 UE 的 A 前缀并公开继承它。ENGINELAB_API 是模块导出宏，来自 EngineLab 模块构建配置，不是自己新发明的 C++ 关键字；若工程名不同，要改成实际模块宏。',
      'UCLASS() 标记该类参与引擎反射处理，GENERATED_BODY() 在类体中接入工具生成的声明。普通 C++ 编译器并不单独理解这一整套反射意图，因此宏、生成头文件和构建流程必须配合。'
    ], cpp`#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "LabProbe.generated.h"

UCLASS()
class ENGINELAB_API ALabProbe : public AActor {
    GENERATED_BODY()
protected:
    virtual void BeginPlay() override;
};`),
    section('generated.h 为什么不能手写一个空文件来消除红线', [
      'LabProbe.generated.h 由 Unreal Header Tool 按头文件中的反射声明生成，包含本类所需的胶水代码；它不是另一个需要从练习目录复制的源文件。按 UE 头文件规则，它必须放在该头文件最后一条 include。',
      'IDE 第一次尚未构建时可能显示找不到生成头，先检查类名、文件名、宏和工程生成步骤，再进行完整构建。创建一个同名空文件只会遮住症状，让后续生成或编译更混乱。修改反射声明后若状态异常，关闭编辑器完成完整构建，再重新打开。'
    ]),
    section('BeginPlay 从哪里被调用：引擎选择时机，你提供实现', [
      'BeginPlay 是 Actor 的虚生命周期函数，开始参与游戏时由引擎调用。override 与第 14 课同理：要求签名确实重写基类接口。你不需要在自己的 main 中手动调用，也不能在任意构造位置调用来“提前开始游戏”。',
      'ALabProbe::BeginPlay 的作用域限定说明这是类外定义。Super 是 UE 为父类提供的别名，Super::BeginPlay() 让基类完成其流程；然后再执行本类日志。忽略父类调用可能破坏已有行为。'
    ], cpp`#include "LabProbe.h"
void ALabProbe::BeginPlay() {
    Super::BeginPlay();
    UE_LOG(LogTemp, Display, TEXT("EngineLab ready"));
}`),
    section('日志为什么不用 cout：UE_LOG 与 TEXT 逐项拆开', [
      'UE_LOG 使用引擎日志体系：LogTemp 是示例日志类别，Display 是显示级别，TEXT("...") 生成引擎字符类型适配的字符串字面量。结果看 Output Log，而不是期待 VS Code 的普通终端自动收到 cout。',
      '如果要打印当前实例名字，GetName() 返回 FString，格式化 %s 时 *GetName() 提供其字符数据。这与 Character 的 std::string 不同，不能机械把 c_str() 或标准库字符串接口套过来。'
    ], cpp`UE_LOG(LogTemp, Display, TEXT("EngineLab ready"));
// 选做：区分类与关卡中的多个实例
UE_LOG(LogTemp, Display, TEXT("Ready: %s"), *GetName());`),
    section('类写好了为什么没有日志：类型不等于关卡实例', [
      '构建出 ALabProbe 只是定义了一种可用类型。必须在编辑器找到类、拖入当前关卡并运行 Play，才会有实例参与世界生命周期。放两个实例会各执行自己的 BeginPlay；只打开源码或停留编辑模式，不会满足本题的运行条件。',
      '最小验收步骤是：关闭编辑器构建 Development Editor Win64 目标，打开工程与目标关卡，放入 LabProbe，保存关卡，打开 Output Log，点击 Play 搜索固定文本。先证明这条链路通，再讨论贴图与蓝图。'
    ], undefined, { table: { headers: ['步骤', '已经得到什么', '还缺什么'], rows: [['写出类', '源码定义', '构建与实例'], ['构建成功', '模块中的类型', '关卡实例和 Play'], ['放入关卡', '编辑器中的实例', '开始游戏'], ['Play', '生命周期执行', '检查日志结果']] } }),
    section('UObject 生命周期与普通 new/delete 的边界', [
      'Actor 属于 UObject 体系，由引擎创建、注册和管理。放置或 SpawnActor 创建世界实例，Destroy 表达结束游戏中的 Actor；不要 std::make_unique<ALabProbe>() 或 delete 某个世界 Actor 来绕过引擎。',
      '引擎 GC 的引用可达性与 Actor 的游戏生命周期是两个层次。Destroy 不是立即执行标准 delete 的同义词，持有强引用也不保证一个已被销毁的 Actor 还能正常参与游戏。后续使用对象前会结合 IsValid 检查。'
    ], cpp`// 说明接口差异，当前必做仍使用编辑器放置实例：
// GetWorld()->SpawnActor<ALabProbe>(); // 交给世界创建 Actor
// Probe->Destroy();                  // 请求结束 Actor
// delete Probe;                      // 错误：绕过引擎管理`),
    section('报错时按构建链路排查，不混用两套工具配置', [
      '如果 include 无法找到引擎头，检查 VS Code 工程文件与引擎路径；UHT 报反射错误，查看 generated include 位置和声明格式；C++ 编译报 override 不匹配，再核对签名；构建成功但无输出，则检查实例、关卡、Play 和日志过滤。',
      '不要把旧课程的 g++ tasks.json 当成 UE 编译配置，也不要把 CMake 工程覆盖进 UE 模块。涉及编辑器二进制资产时要保存关卡与蓝图，提交源码不能替代提交实际场景配置；大资产的仓库策略另行决定。'
    ]),
    section('练习连接：先完成可重复的最小验证', [
      '运行本课参考源码得到 EngineLab ready，再放第二个 LabProbe 并加实例名日志，解释为什么同一类会有两次调用。停止 Play 后修改日志、完整构建、再次运行，确认看到的是新版本代码。',
      '本课没有提供已经打包运行的 UE 游戏，也没有在当前机器执行编辑器验收。请把本机 UE 版本、构建目标和 Output Log 结果记到练习笔记，明确哪些已实际完成。'
    ])
  ],
  28: [
    section('BeginPlay 只执行一次，怎样让标记物持续移动', [
      '上一课验证了 Actor 在游戏开始时能执行逻辑。若在 BeginPlay 里移动一次，只会得到一次位置变化；持续移动需要每次更新都推进状态。UE 的 Tick 提供一个常见入口，并把这次经过的 DeltaTime 传给你。',
      '本课创建 MovingMarker：一个包含 StaticMesh 组件的 Actor，沿世界 X 轴以 50 厘米/秒移动。它不是玩家角色，不处理输入，也没有承诺扫掠碰撞；目标是把第 24 课的时间与第 25 课的组件落到引擎中。'
    ]),
    section('构造函数、BeginPlay、Tick 不是可以互相替代的三个名字', [
      '构造函数设置类实例的默认结构，例如创建默认组件和允许 Tick；它也可能为类默认对象或编辑器场景执行，不应当在里面启动玩家战斗。BeginPlay 适合开始游戏后的初始化。Tick 则是运行期间按更新频率调用的逻辑。',
      '并非所有 Actor 都需要 Tick。事件能解决的工作不应每帧轮询；本课持续匀速移动恰好适合展示 Tick。先把 bCanEverTick 打开，否则仅声明重写函数不代表引擎一定调度它。'
    ], cpp`AMovingMarker::AMovingMarker() {
    PrimaryActorTick.bCanEverTick = true;
    Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
    SetRootComponent(Mesh);
}`),
    section('CreateDefaultSubobject 与 RootComponent 为什么成对出现', [
      'CreateDefaultSubobject 在构造函数中创建这个类固定拥有的默认组件，TEXT("Mesh") 是组件名称。UStaticMeshComponent 能承载静态网格和变换；SetRootComponent 把它设为根场景组件，使 Actor 的空间位置有明确根节点。',
      '默认组件不是随便 new 的普通对象；引擎需要把它纳入对象和组件体系。运行时动态添加组件还有注册等流程，不应把默认子对象创建代码随意挪到 Tick 中，否则每帧创建会完全改变行为。'
    ]),
    section('TObjectPtr 和 UPROPERTY 在这里表达什么', [
      'Mesh 是一个引擎对象引用。UPROPERTY(VisibleAnywhere) 让反射系统看见该成员，并让属性在细节面板可查看；TObjectPtr<UStaticMeshComponent> 配合受反射追踪的属性表示引擎对象引用。它不是 std::unique_ptr，也不要求你在析构中 delete Mesh。',
      'VisibleAnywhere 不表示对象自动可见于画面。组件尚未指定 Static Mesh 资产时可能什么也不渲染；“属性面板可见”与“场景中能看见几何体”是不同含义。'
    ], cpp`UPROPERTY(VisibleAnywhere)
TObjectPtr<UStaticMeshComponent> Mesh;

UPROPERTY(EditAnywhere, Category="Movement")
float Speed = 50.f;`),
    section('逐项读 Tick：父类流程、时间参数和世界位移', [
      'Tick(float DeltaTime) 的签名来自 AActor，override 让编译器核对。先调用 Super::Tick(DeltaTime)，再计算 Speed*DeltaTime。Speed 的单位是厘米/秒，DeltaTime 单位是秒，所以 FVector 的 X 分量得到厘米位移。',
      'AddActorWorldOffset 使用世界坐标方向。FVector(x,0,0) 不受 Actor 朝向改变而变成别的方向，沿世界 +X 或 -X 由 Speed 符号决定。本例每帧自己施加位置变化，因此需要乘 dt。'
    ], cpp`void AMovingMarker::Tick(float DeltaTime) {
    Super::Tick(DeltaTime);
    AddActorWorldOffset(FVector(Speed * DeltaTime, 0.f, 0.f));
}`),
    section('50.f 的 f 与数值跟踪：两秒为什么走 100 厘米', [
      '50.f 是 float 字面量，和本课 Speed 的类型一致。若某帧 DeltaTime 约 0.02 秒，本帧 X 位移约 1 厘米；累计约两秒，总位移约 100 厘米。换成 60 FPS 后每帧位移更小，但相同总时间应得到接近的结果。',
      '编辑器暂停、时间膨胀等因素会影响游戏时间，因此不要拿手表测量与世界更新绝对等同。测试时固定场景条件，比较的是相同游戏时间和相同 Speed 下的运动趋势，不要求浮点末位完全一致。'
    ], cpp`// 用一帧数值验算，实际 Tick 由引擎提供 DeltaTime：
float Speed = 50.f;
float DeltaTime = 0.02f;
float distanceThisFrame = Speed * DeltaTime; // 1 厘米`),
    section('蓝图配置：C++ 创建组件，资产决定画出什么', [
      '构建后创建 AMovingMarker 的蓝图子类，选择 Mesh，为 Static Mesh 指定 Engine BasicShapes/Cube 或项目内立方体资产。确认组件 Mobility 适合运行时移动，蓝图放入关卡，Speed=50，保存蓝图与关卡后 Play。',
      '如果 Actor 在移动却看不见，检查网格资产、缩放、位置和相机视野；如果看得见却不动，检查 Tick 是否启用、是否 Play、Speed 是否被蓝图默认值覆盖为 0。蓝图中保存过的属性值可能覆盖新的 C++ 默认值。'
    ]),
    section('世界坐标和本地方向：旋转之后该如何判断', [
      '把蓝图旋转 90 度后，当前代码仍沿世界 X 移动。如果需求是“沿物体自身前方”，应从朝向获取方向再乘距离，而不是继续把世界 X 当作前。先明确需求再选择接口，不能看到 FVector 就以为其分量自动跟随角色。',
      '选做可使用 GetActorForwardVector()*Speed*DeltaTime 获得本身朝前的世界位移向量。本课原始验收保持世界 X，避免把两种运动语义混成一个输出。'
    ], cpp`// 选做：沿自身朝向移动，与原始世界X版本分开测试
const FVector Offset = GetActorForwardVector() * Speed * DeltaTime;
AddActorWorldOffset(Offset);`),
    section('Destroy 和析构不是同一瞬间，Tick 也不是无限承诺', [
      'Actor 请求 Destroy 后会退出相应游戏流程，底层 UObject 内存由引擎生命周期和 GC 继续处理，不能据此立即解引用旧引用或自己 delete。世界结束时还会经历 EndPlay 等过程，BeginPlay/Tick 只是入门观察点。',
      '当前 AddActorWorldOffset 调用没有开启 sweep，因此不保证遇墙停下；若需要阻挡，应设计碰撞组件、移动接口及扫掠行为。不要因有网格组件就宣称已经获得完整物理移动系统。'
    ]),
    section('练习连接：让位置、时间和资产三个层次都可核对', [
      '记录 Play 开始位置，约两秒后检查世界 X 增量约 100；改 Speed=0 应静止，改为 -50 应反向。旋转实例后观察原版仍沿世界 X，说明你确实理解 WorldOffset。',
      '本课源码面向 UE 5.6，当前未在 UE 编辑器编译或 Play 验证。必做结束时应由你在本机完成构建、蓝图网格指定、关卡保存和运动观察，而不是仅打开代码文件。'
    ])
  ],
  29: [
    section('C++ 有一个字段，为什么蓝图细节面板看不到', [
      '普通 C++ 成员只需编译器理解，但编辑器想列出属性、保存资产默认值、让蓝图读取和绑定事件，就需要额外的反射信息。UE 用 UCLASS、UPROPERTY、UFUNCTION 等声明配合工具生成这些信息，不是把所有 C++ 成员自动公开。',
      '本课把生命值放进 ULabHealthComponent，可挂到不同 Actor 蓝图。MaxHealth 是可配置上限，Health 是运行状态。开始游戏后初始化，再响应引擎通用伤害事件，验证 120 受到 25 伤害变为 95。'
    ]),
    section('为什么生命值适合组件，而不是复制到每个角色', [
      '玩家、敌人和可破坏物都可能有血量，但未必来自同一角色基类。组件让它们复用同一套初始化、扣血和日志规则。UActorComponent 不带自己的空间变换，适合纯逻辑能力；需要相对位置的组件则会用 SceneComponent 等类型。',
      'UCLASS(ClassGroup=(Lab),meta=(BlueprintSpawnableComponent)) 把它归入编辑器分组，并允许作为蓝图组件添加。类名 ULabHealthComponent 遵循 UObject 派生类型的 U 前缀；它不是可直接放进关卡的 Actor。'
    ], cpp`UCLASS(ClassGroup=(Lab), meta=(BlueprintSpawnableComponent))
class ENGINELAB_API ULabHealthComponent : public UActorComponent {
    GENERATED_BODY()
public:
    // 后续定义配置属性和运行状态
};`),
    section('逐项解释属性：编辑、蓝图访问和运行时约束不是一回事', [
      'EditAnywhere 允许在相关编辑器位置修改属性，BlueprintReadWrite 允许蓝图读写；VisibleAnywhere 只提供编辑器查看，BlueprintReadOnly 限制蓝图直接写入。Category 负责组织界面分组，不会改变伤害计算。',
      'ClampMin 元数据用于编辑器输入提示和限制，不能替代运行时验证。蓝图、代码或外部数据仍可能制造不符合期望的值，因此 BeginPlay 再执行 MaxHealth=Max(1,MaxHealth)。Health 只读暴露，鼓励通过统一伤害流程修改。'
    ], cpp`UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Health", meta=(ClampMin="1"))
float MaxHealth = 100.f;
UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Health")
float Health = 100.f;`),
    section('为什么在 BeginPlay 初始化，而不是只写默认值 100', [
      'C++ 默认值是起点，蓝图可以把 MaxHealth 改为 120。若 Health 永远保留声明时的 100，就会出现上限 120、初始只有 100 的错配。BeginPlay 在运行时读取实际 MaxHealth，验证下限后把 Health 设置成上限。',
      'Super::BeginPlay() 完成父类流程，GetOwner() 取得组件所属 Actor。这个组件没有自己“收到 ApplyDamage”的独立世界入口，而是订阅拥有者的伤害事件。'
    ], cpp`void ULabHealthComponent::BeginPlay() {
    Super::BeginPlay();
    MaxHealth = FMath::Max(1.f, MaxHealth);
    Health = MaxHealth;
    GetOwner()->OnTakeAnyDamage.AddDynamic(this, &ULabHealthComponent::ReceiveDamage);
}`),
    section('委托与 UFUNCTION：为什么函数签名这么长', [
      'OnTakeAnyDamage 是拥有者 Actor 的动态多播委托，伤害流程发生时通知已绑定的接收者。AddDynamic(this,&...ReceiveDamage) 指定由当前组件实例执行哪个成员函数；动态绑定需要反射信息，所以接收函数用 UFUNCTION 声明。',
      '参数依次提供受伤 Actor、伤害数值、伤害类型、发起控制器和伤害来源。即使当前只用 Damage，也必须保持委托要求的完整签名，不能随便删掉“不用的参数”。const UDamageType* 说明不通过此参数修改类型对象。'
    ], cpp`UFUNCTION()
void ReceiveDamage(AActor* DamagedActor, float Damage,
    const class UDamageType* Type,
    class AController* Instigator, AActor* Causer);`),
    section('先检查再写入：负伤害不会自动当作治疗', [
      'ReceiveDamage 遇到 Damage<=0 或 Health<=0 直接返回，正伤害才更新。FMath::Clamp(Health-Damage,0,MaxHealth) 把结果限制到范围内，超量伤害不会出现负数。若以后需要治疗，应增加明确治疗接口，不要偷偷让负伤害穿过本规则。',
      '这是基础教学组件，不含护甲、减伤、无敌帧、死亡广播或联网权威处理。Health 变 0 也不会自动销毁 Actor，因为当前代码没有写 Destroy。功能结论必须对应实际执行的代码。'
    ], cpp`if (Damage <= 0.f || Health <= 0.f) return;
Health = FMath::Clamp(Health - Damage, 0.f, MaxHealth);
UE_LOG(LogTemp, Display, TEXT("%s health: %.0f"), *GetOwner()->GetName(), Health);`),
    section('一次伤害怎样走完整条链路', [
      '蓝图或 C++ 对某 Actor 调用 Apply Damage；Actor 的伤害处理产生 OnTakeAnyDamage 通知；之前绑定的组件 ReceiveDamage 被调用；组件再修改自己的 Health。ApplyDamage 本身不知道你有一个名为 Health 的字段，也不会自动替所有 Actor 扣血。',
      '如果目标没有挂该组件，或者组件没有进入 BeginPlay 完成绑定，就没有这里的状态更新。排查时按调用、目标、委托绑定、处理函数、最终字段逐级看，而不是只调整伤害数值。'
    ]),
    section('蓝图操作：明确目标 Actor，而不是对组件随便连线', [
      '编译后在 Actor 或玩家蓝图 Add Component 添加 LabHealth，MaxHealth 设 120。Play 后通过实例调试查看 Health=120。用蓝图事件调用 Apply Damage，Damaged Actor 必须指向拥有该组件的 Actor，Base Damage=25，然后查看 Output Log 中 health: 95。',
      '测试时可用一次自定义事件或按键触发，不要把 Apply Damage 放到每帧 Tick，除非本来就想每帧造成伤害。编辑器里的类默认值与 Play 中实例状态也要区分，停止 Play 后运行血量不会回写成蓝图默认值。'
    ]),
    section('反射不是标准智能指针，也不是所有属性都能公开写', [
      'UPROPERTY 让引擎知道字段及其对象引用关系，但它不是 C++ 的访问控制关键字。public/protected/private 仍约束 C++ 接口；BlueprintReadOnly 等控制蓝图访问，两个层面不能互相替代。',
      '本课字段为 float，不涉及引用计数；以后 UPROPERTY TObjectPtr 的引用追踪由 UE GC 处理，不要因为见过 shared_ptr 就给 UObject 再加一套标准所有权。对运行状态过度开放写权限也会绕过统一规则，应谨慎设计。'
    ]),
    section('练习连接：同时验证配置与事件流程', [
      '验证 MaxHealth=120、初始 Health=120，25 伤害变 95；过量伤害变 0；非正伤害不改变；没有组件的 Actor 不会凭空出现自定义血量。把断点放在 ReceiveDamage，核对收到的参数。',
      '反射头声明修改后建议关闭编辑器完整构建，再检查蓝图资产；不要只依赖旧热重载状态。本课面向 UE 5.6，当前环境未完成引擎构建和蓝图事件验收，需在本机记录结果。'
    ])
  ],
  30: [
    section('会移动的 Actor 与玩家角色有什么区别', [
      '第 28 课每帧直接位移的标记物不关心谁控制它。玩家角色需要 PlayerController、Pawn 和输入映射协作：Controller 表达控制，Pawn 是可被控制的世界对象，Character 是带胶囊与 CharacterMovement 等常用移动能力的 Pawn。',
      '本课 AExplorerCharacter 继承 ACharacter，使用 Enhanced Input 把 WASD 转为二维移动意图，固定俯视相机。不要先复制一套 Tick 位移；先接通“控制器→输入动作→移动组件”的路径。'
    ]),
    section('动作与按键为什么分开：Move 不是 W 的别名', [
      'Input Action 描述玩家意图，例如移动；Mapping Context 把硬件输入映射到动作。这样键盘 WASD 和手柄摇杆可以表达同一个 Move，而业务代码只处理二维方向，不在每一处直接查询 W 键。',
      '创建 IA_Move，Value Type 设 Axis2D；创建 IMC_Player，包含四个按键映射。数字按键默认提供 X 轴正值，所以 D 可直接 +X，A 加 Negate 变 -X；W 通过 Swizzle YXZ 转到 +Y，S 先 Negate 再 Swizzle 得 -Y。这里说的是输入向量坐标，稍后再映射到世界方向。'
    ], undefined, { table: { headers: ['按键', '修饰', '动作向量'], rows: [['D', '无', '(+1,0)'], ['A', 'Negate', '(-1,0)'], ['W', 'Swizzle YXZ', '(0,+1)'], ['S', 'Negate → Swizzle YXZ', '(0,-1)']] } }),
    section('先让模块认识 Enhanced Input，再写绑定代码', [
      '确认 Enhanced Input 插件启用，在 EngineLab.Build.cs 现有依赖中加入 "EnhancedInput"，保留原 Core、CoreUObject、Engine、InputCore 等依赖。Build.cs 是 C# 模块规则，不是普通 C++ 文件，也不是本课的 CMakeLists。',
      'ExplorerCharacter.h 使用 InputActionValue.h，声明 UInputMappingContext 和 UInputAction 引用；EditDefaultsOnly 意味着在蓝图类默认值中指定资产。仅声明两个属性不会自动创建 IA_Move 或 IMC_Player，编辑器资产必须真实存在并赋给它们。'
    ], cpp`UPROPERTY(EditDefaultsOnly, Category="Input")
TObjectPtr<UInputMappingContext> MappingContext;
UPROPERTY(EditDefaultsOnly, Category="Input")
TObjectPtr<UInputAction> MoveAction;`),
    section('为什么添加相机臂与相机：结构决定观察方式', [
      'ACharacter 已有胶囊根组件。构造函数创建 SpringArm 并挂到 RootComponent，相机再挂到 CameraBoom；相机臂长度 450，俯角 -45 度。SetupAttachment 建立父子关系，相对变换会跟随父组件。',
      '这套示例相机固定方向，不含鼠标旋转和控制器朝向跟随。角色需要给可见 Mesh 指定合适资产；胶囊能移动不代表已经有可见人物模型，也不代表已经配置动画。'
    ], cpp`CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
CameraBoom->SetupAttachment(RootComponent);
CameraBoom->TargetArmLength = 450.f;
CameraBoom->SetRelativeRotation(FRotator(-45.f, 0.f, 0.f));
Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
Camera->SetupAttachment(CameraBoom);`),
    section('BeginPlay 的层层检查：输入映射属于哪个玩家', [
      '先把 GetController() 尝试 Cast 为 APlayerController，取得 LocalPlayer，再获取其 UEnhancedInputLocalPlayerSubsystem，最后把 MappingContext 加入。Cast 失败或资产没赋值就不继续，避免解引用无效对象。',
      'LocalPlayer 的输入子系统管理本地输入映射，优先级 0 是本示例设置，不是全项目唯一固定值。示例适合本地单人已控制角色；联网、延迟占有或更换控制器时需要额外处理 Possess/初始化时序，不能只靠一次 BeginPlay 覆盖所有情况。'
    ], cpp`if (APlayerController* PC = Cast<APlayerController>(GetController()))
    if (ULocalPlayer* LP = PC->GetLocalPlayer())
        if (auto* Subsystem = LP->GetSubsystem<UEnhancedInputLocalPlayerSubsystem>())
            if (MappingContext) Subsystem->AddMappingContext(MappingContext, 0);`),
    section('SetupPlayerInputComponent 绑定的是什么', [
      '引擎为受控制 Pawn 准备输入组件时调用 SetupPlayerInputComponent。先执行 Super，再把组件 Cast 为 UEnhancedInputComponent，通过 BindAction 将 MoveAction 的 Triggered 事件绑定到当前对象的 Move 成员函数。',
      '&AExplorerCharacter::Move 是成员函数地址，不是在绑定时立即执行 Move。Triggered 适合持续移动输入，Started、Completed 等事件有其他语义；不要把按下一次跳跃与持续移动完全照抄为同一种事件。'
    ], cpp`void AExplorerCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent) {
    Super::SetupPlayerInputComponent(PlayerInputComponent);
    if (auto* Input = Cast<UEnhancedInputComponent>(PlayerInputComponent))
        if (MoveAction)
            Input->BindAction(MoveAction, ETriggerEvent::Triggered,
                              this, &AExplorerCharacter::Move);
}`),
    section('Axis.Y 为什么对应世界 Forward：输入空间与世界空间要转换', [
      'Value.Get<FVector2D>() 读取动作的二维值，前提是 IA_Move 的类型设为 Axis2D。本示例把 Axis.Y 映射到 FVector::ForwardVector，也就是世界 +X；Axis.X 映射到 RightVector，也就是世界 +Y。因此 W 前进世界 +X，D 右移世界 +Y。',
      'AddMovementInput 提交方向与强度，由 CharacterMovement 按自己的时间与碰撞规则推进。这里**不要再给 Axis 乘 DeltaTime**，否则输入强度随帧间隔缩小，属于重复应用时间。它与上一课直接 AddActorWorldOffset 的语义不同。'
    ], cpp`void AExplorerCharacter::Move(const FInputActionValue& Value) {
    const FVector2D Axis = Value.Get<FVector2D>();
    AddMovementInput(FVector::ForwardVector, Axis.Y);
    AddMovementInput(FVector::RightVector, Axis.X);
}`),
    section('代码齐全仍不响应：必须有真正被控制的角色实例', [
      '创建 BP_Explorer，给 MappingContext 与 MoveAction 指定实际资产，放到有地面和碰撞的关卡，把该实例 Auto Possess Player 设为 Player 0；也可以用 GameMode 的 Default Pawn 类配置出生，但本课先选一种方式，避免同时生成两个可控制角色。',
      'Play 后确认视角来自角色相机，键鼠焦点进入游戏视口，WASD 响应。CharacterMovement 的 MaxWalkSpeed 可设 400。没有控制器、输入上下文未加、资产空引用或映射修饰错误，都会导致“代码没有报错但不动”。'
    ]),
    section('逐层排查，不把所有问题归为 DeltaTime', [
      '先在 Move 断点观察是否被调用；不调用就查控制、插件、模块、上下文和绑定。被调用但 Axis 错，查 IA_Move 类型与修饰。Axis 正确仍不动，查移动模式、胶囊碰撞、地面以及是否被阻挡。',
      '本示例沿世界轴移动，不根据相机旋转换方向，也不包含鼠标控制。若扩展相机相对移动，先从控制旋转取得前右方向，再映射 Axis；不能只改 W 的符号就得到完整第三人称控制。'
    ]),
    section('练习连接：验证四个方向与配置持久化', [
      '逐个测试 D→世界+Y、A→世界-Y、W→世界+X、S→世界-X，再测试斜向和释放按键。释放后停止输入不代表所有移动模式都瞬间静止，制动和惯性还受移动组件配置影响。',
      '保存输入资产、蓝图和关卡，重新打开工程再 Play，确认配置仍有效。本课源码目标 UE 5.6，当前未实际构建；README 步骤和资产配置是练习的一部分，不能仅靠复制 .h/.cpp 完成验收。'
    ])
  ],
  31: [
    section('碰到陷阱就扣血：需要把碰撞感知接到伤害规则', [
      '第 29 课生命组件已经能处理伤害事件，第 30 课玩家能移动。现在放一个球形触发区域，玩家进入就受到 25 伤害，触发器随后消失。这个流程由不同职责合作：碰撞负责发现相遇，陷阱负责发送伤害，生命组件负责真正扣血。',
      '不要把所有逻辑塞到玩家每帧查附近对象。事件可以把发生的相交直接通知陷阱。本课只做本地一次性伤害，不包含连续毒雾、联网同步或完整战斗命中系统。'
    ]),
    section('Overlap 与 Block 为什么不能混为“碰撞”', [
      'Block 表达阻挡，常与移动扫掠和 Hit 相关；Overlap 表达可以相交但需要感知进入/离开。陷阱希望玩家能进入区域，所以使用 Overlap。能否产生重叠事件取决于双方的碰撞启用、通道响应和 GenerateOverlapEvents 等配置，不是一个 AddDynamic 就能强制产生。',
      'Query 碰撞用于查询和事件感知，Physics 还涉及物理模拟。当前球形触发器不需要模拟物理。若墙体挡住玩家，那可能是 Block 正常工作，不代表重叠事件接错。'
    ]),
    section('构造触发器：球体范围和碰撞预设分别负责什么', [
      'CreateDefaultSubobject 创建 USphereComponent，设为根，半径 100 表示触发区域大小。OverlapAllDynamic 是预设名称，给动态对象重叠响应；SetGenerateOverlapEvents(true) 允许本组件生成重叠事件。',
      '这并不自动保证玩家胶囊响应正确，另一方也需要相应查询与重叠设置。球体组件主要是检测形状，不会自动带一个可见陷阱模型；编辑器中显示范围和 Play 中渲染网格也要区分。'
    ], cpp`Trigger = CreateDefaultSubobject<USphereComponent>(TEXT("Trigger"));
SetRootComponent(Trigger);
Trigger->InitSphereRadius(100.f);
Trigger->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
Trigger->SetGenerateOverlapEvents(true);`),
    section('为什么 OnOverlap 参数必须一个不少', [
      'OnComponentBeginOverlap 动态委托要求固定签名：重叠组件、另一 Actor、另一组件、BodyIndex、是否来自扫掠、命中信息。当前只用 OtherActor，也必须保留其余参数与 const 引用形式，UFUNCTION 让动态绑定可找到接收函数。',
      'BeginPlay 中执行 AddDynamic，把当前陷阱实例和成员函数关联起来。不是在头文件声明 OnOverlap 就自动注册，也不要每帧重复 AddDynamic 导致重复处理。'
    ], cpp`UFUNCTION()
void OnOverlap(UPrimitiveComponent* Overlapped, AActor* OtherActor,
    UPrimitiveComponent* OtherComp, int32 BodyIndex,
    bool bFromSweep, const FHitResult& Hit);

// BeginPlay 中：
Trigger->OnComponentBeginOverlap.AddDynamic(this, &ALabHazard::OnOverlap);`),
    section('先过滤目标：非空与 IsValid 有什么区别', [
      'UE 对象可能进入待销毁状态，单独指针不等于 nullptr 不足以表达仍可正常使用。IsValid(OtherActor) 配合引擎对象生命周期检查；OtherActor==this 防止自己；IsA<APawn>() 限定本题只伤害 Pawn。',
      'IsA 检查继承兼容类型，不是比较类名字符串。若以后希望可破坏箱子也受伤，就应调整目标契约，而不是要求所有箱子都继承 Pawn。过滤规则应来自玩法需求，不是为了让本次截图好看。'
    ], cpp`if (!IsValid(OtherActor) || OtherActor == this || !OtherActor->IsA<APawn>())
    return;`),
    section('ApplyDamage 为什么不会自动发现 Health 并修改它', [
      'UGameplayStatics::ApplyDamage 启动通用伤害流程，传入目标、非负伤害、发起控制器、来源 Actor 与伤害类型。GetInstigatorController() 表示伤害发起者对应控制器，本例放置陷阱可能没有；this 表示伤害来源是当前陷阱。',
      '目标的第 29 课组件通过 OnTakeAnyDamage 收到通知，才执行 Health 更新。没有组件时仍可能经过 Actor 伤害流程，却不会凭空出现你定义的生命字段。这条链路是观察“事件已发出但血没变”时最关键的区别。'
    ], cpp`UGameplayStatics::ApplyDamage(
    OtherActor, FMath::Max(0.f, Damage),
    GetInstigatorController(), this, nullptr);
UE_LOG(LogTemp, Display, TEXT("Hazard hit: %s"), *OtherActor->GetName());`),
    section('一次性触发：销毁请求前先关闭碰撞的原因', [
      '同一个角色可能有多个可重叠组件，事件也可能在很短时间内多次到达。当前处理在施加伤害后立刻 SetActorEnableCollision(false)，再 Destroy，避免继续产生通常的后续重叠。Destroy 是引擎的结束请求，不应假定这行后底层内存立即不存在。',
      '该简单顺序用于本课原型。更强的防重入方案是在施加伤害前设置已消费标记并关闭碰撞，因为伤害回调可能触发其他逻辑；联网场景还需要服务端权威去重。本参考未实现这些扩展，不能声称覆盖所有重入和网络情况。'
    ], cpp`SetActorEnableCollision(false);
Destroy();
// 不要写 delete this，也不要在后续继续依赖已结束的 Actor。`),
    section('从 100 到 75 的调用与数值追踪', [
      '玩家进入球体，OnOverlap 判断为 Pawn；Damage=25 被限制为非负后传给 ApplyDamage；拥有者伤害事件调用 Health 组件，Health 从 100 减到 75；陷阱输出 Hazard hit 并关闭碰撞、请求销毁。日志的实际先后与同步回调位置有关，不应强行把所有回调输出顺序写成另一条流程。',
      '若把 Health 的 MaxHealth 设为 120，初始就应为 120，进入一次得到 95，而不是仍期待 75。验收期望要与蓝图实际配置一致；参考基本场景使用默认 100。'
    ]),
    section('编辑器检查单：先让两方都具备正确条件', [
      '把 LabHealth 组件挂到 BP_Explorer，确认 Play 时初始化。放置 LabHazard 到玩家路径，检查半径能被玩家胶囊穿入；胶囊启用 Query 碰撞与 Generate Overlap Events，通道响应允许重叠。先从触发范围外进入，便于明确观察 BeginOverlap。',
      '无日志时先检查事件绑定与碰撞配置；有 Hazard hit 无扣血时查目标组件与伤害处理；多次扣血时查是否放了多个陷阱或注册多次。把问题分层，避免反复调整半径却不检查真正目标。'
    ]),
    section('练习连接：同时测试合格和不合格目标', [
      '基础验证玩家 100→75、同一陷阱不再重复造成伤害；移去 Health 组件再试，说明为何只看到事件而没有自定义血量；让非 Pawn 穿入，确认被过滤。再测试 Damage=0 与过量伤害的边界。',
      '保存蓝图与关卡，记录 UE 5.6 构建与 Play 结果。当前环境没有执行引擎运行验证；演示图仅表达事件关系，真实碰撞与日志以本机 Play 为准。'
    ])
  ],
  32: [
    section('把功能连成可玩的最小闭环，而不是继续堆类', [
      '最后一课把移动、生命、陷阱与收集结合：开始 Play，角色能移动；碰陷阱受到伤害；收集三个物品，日志显示 Level complete!。先验证这个闭环，再增加美术和界面，避免所有子系统看似齐全却没有一条能完成的玩家路径。',
      '本课实际完成判定是日志，不含失败界面、重新开始、存档和联网。标题中的生存由已有生命与伤害原型支持，Health=0 目前不会自动阻止移动或结束关卡；这些都是明确的选做扩展。'
    ]),
    section('先画职责关系：角色移动，组件记分，物品通知', [
      'ExplorerCharacter 沿用第 30 课输入与相机；LabHealth 沿用伤害规则；LabScore 保存分数与目标；LabPickup 负责检测合格 Actor 并通知其分数组件。Pickup 不需要知道角色类名，也不应该自己保存全局玩家分数。',
      '角色通过 Add Component 获得能力，触发物通过 FindComponentByClass 查询能力。这样以后别的 Pawn 有 Score 组件，也能复用收集逻辑；没有 Score 的对象经过则不会消费物品。'
    ]),
    section('分数组件的字段：配置目标与运行状态分开', [
      'Score 初始 0、BlueprintReadOnly；Goal 默认 3、允许编辑。UFUNCTION(BlueprintCallable) 让蓝图可以调用 AddPoint，而不是让任意地方直接修改 Score 绕过完成检查。int32 是 UE 常用固定宽度整数别名，不是新的计分算法。',
      'Goal 的 ClampMin 元数据帮助编辑器配置，但本参考没有在运行时重新钳制 Goal，蓝图必须把它设置为至少 1。若扩展为外部配置，增加实际校验；不要把元数据当成所有写入路径都不可绕过的约束。'
    ], cpp`UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Score")
int32 Score = 0;
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Score", meta=(ClampMin="1"))
int32 Goal = 3;
UFUNCTION(BlueprintCallable)
void AddPoint();`),
    section('完成条件为什么在一个入口统一检查', [
      'AddPoint 先判断 Score>=Goal，已经完成就直接 return；否则 ++Score 并打印，再判断是否刚达到目标。这样默认 Goal=3 时只在第三次有效增加后输出一次完成。第四次调用被开头拦住，不再重复完成日志。',
      '若动态修改 Goal，行为要重新定义，例如把目标从 3 调到 2 是否马上完成；当前代码只在 AddPoint 调用中判断，不实现通用状态机。原型规则简单明确，比悄悄假设所有情况都会自动处理更可靠。'
    ], cpp`void ULabScoreComponent::AddPoint() {
    if (Score >= Goal) return;
    ++Score;
    UE_LOG(LogTemp, Display, TEXT("Score: %d / %d"), Score, Goal);
    if (Score >= Goal) UE_LOG(LogTemp, Display, TEXT("Level complete!"));
}`),
    section('Pickup 的检测形状与可见网格为什么分成两个组件', [
      'Sphere Trigger 管重叠检测，StaticMesh 管视觉显示；Mesh 挂到 Trigger 并禁用自身碰撞，避免同一个收集物多个碰撞形状产生不必要事件。根组件半径 75，实际网格缩放可以独立调整。',
      '代码创建 Mesh 并不替你选模型。蓝图 BP_Pickup 中必须指定球或立方体等 Static Mesh，设置尺寸，才会在 Play 时看见物品；Trigger 仍可比显示模型略大，提供更易触发的收集范围。'
    ], cpp`Trigger = CreateDefaultSubobject<USphereComponent>(TEXT("Trigger"));
SetRootComponent(Trigger);
Trigger->InitSphereRadius(75.f);
Trigger->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
Mesh->SetupAttachment(Trigger);
Mesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);`),
    section('查询能力，而不是比较玩家名字', [
      'OnOverlap 先验证 OtherActor，再用 FindComponentByClass<ULabScoreComponent>() 尝试找分数组件。if(auto* Score=...) 的变量在这个条件及分支范围内可用，找到才消费物品。Score 是指针变量名，指向分数组件，不是分数整数本身。',
      '不要依赖 GetName()=="BP_Explorer_C_0"，实例名会随关卡与运行变化；也不必硬转成 AExplorerCharacter。当前契约明确是“有分数组件的 Actor 能收集”，若要只允许玩家，应另外加入明确玩家判定。'
    ], cpp`if (!IsValid(OtherActor)) return;
if (auto* Score = OtherActor->FindComponentByClass<ULabScoreComponent>()) {
    SetActorEnableCollision(false);
    Score->AddPoint();
    Destroy();
}`),
    section('一次性消费的顺序：先关闭，再通知，再销毁', [
      'Pickup 在通知分数组件前先关闭碰撞，避免通知过程中引发的其他流程再次把同一个物品当作可收集。AddPoint 修改玩家组件，Destroy 请求结束当前物品；三个独立实例各最多贡献一次分数。',
      '若碰到没有 Score 组件的对象，分支不执行，物品保留，之后合格角色仍可收集。已达目标时 AddPoint 不再加分，但 Pickup 仍会被消费，这是当前代码实际行为；若想达标后保留物品，需要改变消费契约。'
    ]),
    section('按三个物品追踪状态，而不是只看最后一行完成', [
      '开始 Score=0，第一次有效重叠变 1，输出 Score: 1 / 3；第二次变 2；第三次变 3，输出 Score: 3 / 3 和 Level complete!。每个物品实例在自己的事件后关闭碰撞并结束。',
      '陷阱走另一条伤害链，默认一次 100→75，不改变分数。若两个系统互相修改对方状态，后续排查会很困难；保持伤害与收集职责独立，再由更高层游戏规则决定成功或失败。'
    ], undefined, { table: { headers: ['事件', 'Health', 'Score', '结果'], rows: [['开始', '100', '0', '等待输入'], ['进入陷阱', '75', '0', '陷阱结束'], ['收集1', '75', '1', '物品1结束'], ['收集2', '75', '2', '物品2结束'], ['收集3', '75', '3', '完成日志一次']] } }),
    section('搭建关卡的顺序：先角色，再组件，再可触发对象', [
      '在 EngineLab UE 5.6 工程中放入本课源码，确认 EnhancedInput 模块依赖和插件。沿用 IA_Move、IMC_Player，在 BP_Explorer 指定两个资产、Player 0 控制与可见网格；添加 LabScore 和 LabHealth，Goal=3。',
      '建立有阻挡地面的关卡，放三个 BP_Pickup 和一个 LabHazard，调好范围与位置。拾取物 Mesh 禁用碰撞、Trigger 与玩家胶囊允许查询重叠；先 Play 验证移动，再验伤害，最后验计分，避免一次引入所有问题。'
    ]),
    section('选做扩展：成功、失败和重开需要统一状态', [
      '若想做完整生存规则，可以增加 Playing/Won/Lost 状态：Score 达标切 Won，Health 归零切 Lost，状态结束后屏蔽输入或重新开始。结束判断应有一个统一负责者，避免生命组件和物品同时直接切关造成冲突。',
      'UI 订阅状态变化显示文本，存档保存逻辑数据而不是 UObject 地址。联网需要服务端验证伤害与拾取，当前本地回调不具备防作弊保证。扩展从明确规则开始，不把日志原型描述成已经包含这些系统。'
    ]),
    section('练习连接：重新打开工程后还能完成才算闭环', [
      '完整走一遍移动→受伤→收集三次，确认分数逐次增加且完成日志只出现一次；再用无 Score 的 Actor 进入、重复触碰同一物品、放第四个物品，解释每个结果。检查 Health=0 后现有角色仍可移动，记录为选做范围。',
      '保存关卡、蓝图与输入资产后关闭并重开工程，再验一次。当前课程提供 UE 5.6 学习源码与配置步骤，尚未在本环境实际编译或 Play；练习笔记应列明你的实际验证版本与结果，不以教学模拟替代引擎运行。'
    ])
  ]
};

// 每个语义标识和教学顺序均为作者指定；与展示位置、搜索词或代码关键词无关。
const outlines = {
  15: [['overview','回顾与定义：生命周期和 RAII'],['manual-cleanup','设计对照：手工清理的遗漏'],['destructor','析构函数的定义与语法'],['scope','用局部对象表达资源的使用范围'],['trace','数据追踪：构造与逆序销毁'],['early-return','小实验：提前返回时释放资源'],['noncopyable','所有权约束：禁止复制资源包装'],['member-order','组合对象与成员的销毁顺序'],['limits','异常与进程退出的边界'],['practice','练习与下一课：从资源对象到智能指针']],
  16: [['overview','回顾与定义：智能指针和所有权'],['raw-pointer','设计对照：裸指针与释放责任'],['create','独占拥有者的类型、创建与访问'],['copy','复制对象与复制拥有者的区别'],['move','移动构造与所有权转移'],['observer','观察指针与完整转移顺序'],['trace','数据追踪：一次创建，一次销毁'],['borrow','函数接口：借用与接收所有权'],['shared','进阶：共享拥有者与弱观察者'],['practice','练习与下一课：把拥有者放进队伍']],
  17: [['overview','回顾与定义：队伍容器和多态元素'],['interface','准备队伍共用的角色接口'],['team','从内向外阅读容器类型并添加成员'],['range-for','范围遍历：绑定现有拥有者'],['iterator','迭代器、解引用与尾后边界'],['erase','删除循环与返回的有效位置'],['trace','数据追踪：移除 Mage 的每一步'],['invalidation','设计边界：包装移动与角色存活'],['interfaces','接口设计、对象切片与稳定身份'],['practice','练习与下一课：由遍历走向算法']],
  18: [['overview','回顾与定义：算法、比较器和 lambda'],['range','用半开区间表示算法处理范围'],['comparator','先用普通函数定义排序规则'],['lambda','lambda 的捕获、参数和函数体'],['capture','小实验：按值与按引用捕获'],['remove','筛选阶段：新的逻辑终点'],['erase-remove','删除尾部，再按血量排序'],['mistakes','设计对照：规则方向、相等与身份'],['complexity','进阶：复杂度与比较器约束'],['practice','练习与下一课：验证结果并持久化']],
  19: [['overview','回顾与定义：序列化与存档格式'],['save-data','先定义要保存的逻辑数据'],['streams','文件流的类型、打开与写入'],['format','字段顺序、版本和带空格的姓名'],['load','读入临时对象，验证后更新'],['version','设计原因：格式版本与兼容处理'],['trace','数据追踪：默认 100 恢复为 75'],['bad-file','错误对照：坏文件测试与状态不变'],['integrity','资源关闭与数据完整性的边界'],['practice','练习与下一课：明确报告失败']],
  20: [['overview','回顾与定义：失败结果、异常和调试'],['apply','定义伤害函数的正常与失败契约'],['throw','throw、异常对象与正常返回路径'],['catch','try/catch 的语法与处理范围'],['return-value','小实验：返回值与原变量的变化'],['unwind','异常传播时的资源清理'],['assert','设计对照：断言与实际输入验证'],['debug','调试步骤：断点、变量与调用栈'],['boundaries','边界验证与整数计算顺序'],['practice','练习与下一课：验证并组织构建']],
  21: [['overview','回顾与定义：构建目标与 CMake'],['files','完整小项目：头文件、实现、入口和构建规则'],['target','CMake 的项目声明与可执行目标'],['features','目标语言标准和警告选项'],['commands','配置与构建两个阶段的命令'],['build-dir','设计原因：分离源码与构建目录'],['trace','数据追踪：编译、链接与 65 血量'],['paths','可执行路径和构建配置'],['direct-build','错误定位：直接编译与构建工具'],['practice','练习与下一课：组合成战斗项目']],
  22: [['overview','回顾与定义：回合制战斗的模块与规则'],['character','共同状态、虚接口和伤害约束'],['mage','职业实现：攻击与魔法消耗'],['borrow','接口设计：战斗只借用角色'],['turns','回合语法与行动顺序'],['trace','数据追踪：三轮后的 40 与 0'],['round-limit','设计原因：无进展时也需要结束'],['winner','胜负判断与平局分支'],['ownership','队伍拥有角色，调度借用角色'],['practice','练习与下一课：从战斗数据走向空间']],
  23: [['overview','回顾与定义：位置、位移和方向'],['offset','小例子：两个位置相减得到位移'],['vector-type','向量结构、分量和长度函数'],['length','数据追踪：(3,4) 的长度为 5'],['normalize','单位方向与归一化语法'],['zero','零长度分支与阈值策略'],['movement','把方向乘距离，更新当前位置'],['spaces','设计约定：坐标空间与单位'],['numeric','错误对照：整数除法和数值误差'],['practice','练习与下一课：把距离写成速度乘时间']],
  24: [['overview','回顾与定义：游戏循环和时间间隔'],['loop','输入、更新、渲染的职责'],['units','从速度与时间的单位得到位移'],['simulate','小例子：模拟固定间隔的多帧更新'],['trace','数据追踪：30 帧与 60 帧的一秒'],['large-step','设计边界：大时间步与碰撞'],['fixed-step','进阶：固定步长和累积器'],['integration','输入语义与积分方法的边界'],['time-errors','错误对照：累计时间和帧间隔'],['practice','练习与下一课：给实体组合运动能力']],
  25: [['overview','回顾与定义：实体、组件与系统'],['components','先定义位置与生命两份组件数据'],['entity','可选组件与实体结构的语法'],['create','小例子：玩家和树的组件组合'],['damage','伤害系统：先判断能力，再修改数据'],['trace','数据追踪：玩家 70，树没有生命组件'],['identity','设计原因：稳定 ID 与容器下标'],['inheritance','组合、继承和 ECS 的适用范围'],['velocity','选做：增加速度组件与更新系统'],['practice','练习与下一课：从能力组合到资源复用']],
  26: [['overview','回顾与定义：资源缓存、强引用与弱引用'],['index','缓存索引的键和值'],['lock','lock 语法与临时强拥有者'],['lookup','完整查找流程：复用、创建和登记'],['reuse','数据追踪：同一资源只加载一次'],['release','数据追踪：最后拥有者离开后卸载'],['cache-life','设计边界：索引与资源的不同生命周期'],['limits','进阶：过期条目、线程与循环引用'],['ue-boundary','向 UE 过渡：普通对象与 UObject 生命周期'],['practice','练习与下一课：用日志验证后进入引擎']],
  27: [['overview','回顾与定义：UE 世界、Actor 和生命周期入口'],['toolchain','工具链、模块与 UE 构建阶段'],['actor-type','Actor 类声明和反射语法组成'],['generated','生成头文件的用途与位置规则'],['begin-play','小例子：实现游戏开始时的回调'],['logging','引擎日志、字符字面量与实例名'],['instance','操作追踪：类、关卡实例与 Play'],['object-life','设计边界：UObject 管理与 Actor 结束'],['debug','错误定位：构建阶段与运行条件'],['practice','练习与下一课：让 Actor 持续更新']],
  28: [['overview','回顾与定义：Actor 更新与默认组件'],['constructor','设置默认结构与启用 Tick'],['components','默认子对象和根组件的用途'],['properties','引擎对象引用与可配置属性'],['tick','Tick 的签名、父类调用与世界位移'],['trace','数据追踪：一帧 1 厘米，两秒约 100 厘米'],['assets','编辑器操作：网格资产与蓝图默认值'],['local-world','设计对照：世界方向与物体前方'],['limits','Actor 结束与移动碰撞的边界'],['practice','练习与下一课：把运行数据提供给蓝图']],
  29: [['overview','回顾与定义：反射、属性和逻辑组件'],['component-type','可添加到蓝图的生命组件类型'],['properties','属性修饰项与运行状态'],['begin-play','初始化实际配置并订阅伤害'],['delegate','委托、接收函数与动态绑定语法'],['damage','处理伤害：验证、限制与日志'],['flow','调用追踪：伤害事件到生命值'],['blueprint','编辑器操作：配置与触发伤害'],['boundaries','设计边界：访问控制与对象引用'],['practice','练习与下一课：连接输入和角色移动']],
  30: [['overview','回顾与定义：Controller、Pawn 和 Character'],['actions','输入动作、映射上下文和轴修饰'],['dependencies','模块依赖与输入资产属性'],['camera','相机臂、相机与组件层级'],['context','本地玩家、类型检查与映射注册'],['binding','绑定动作事件到成员函数'],['move','数据追踪：动作轴到世界移动输入'],['possession','编辑器操作：占有角色与指定资产'],['debug','设计边界与分层排查'],['practice','练习与下一课：移动后感知碰撞']],
  31: [['overview','回顾与定义：碰撞感知、事件与伤害'],['responses','Overlap、Block 与碰撞条件'],['trigger','球形触发组件和碰撞配置'],['delegate','重叠委托的签名与动态绑定'],['filter','目标过滤与对象有效性'],['damage','发送通用伤害并交给生命组件'],['consume','一次性触发与结束 Actor'],['trace','调用追踪：100 生命变为 75'],['collision-setup','编辑器操作：验证双方碰撞条件'],['practice','练习与下一课：组合收集和生存场景']],
  32: [['overview','回顾与定义：综合场景的最小闭环'],['roles','角色、生命、分数和物品各自负责什么'],['score-type','分数组件的状态、配置和调用接口'],['score','加分与一次性完成判定'],['pickup-components','检测范围和可见网格的组件结构'],['collect','查询分数组件并消费收集物'],['consume','设计原因：关闭碰撞、通知和销毁的顺序'],['trace','数据追踪：三次收集与一次完成'],['scene','编辑器操作：按依赖顺序搭建关卡'],['extensions','选做：完成、失败与重新开始'],['practice','复习与后续：保存资产并重复验收']]
};

const introductions = {
  15: ['上一课用 Character 的虚接口统一 Warrior 和 Mage 的攻击。本课补上资源使用结束后的收尾过程。', '**对象生命周期**是对象从完成初始化到销毁的存活期间；**作用域**是名字可以使用的范围，两者不是同一个概念。**RAII**把资源的获取和释放绑定到管理对象的生命周期，用于自动清理文件、纹理或其他资源。', '语法先分三部分：构造函数建立有效状态，析构函数用 ~类名() 表示结束时的清理，局部作用域决定普通局部对象何时结束。先阅读下面的 Resource 小类，再观察两个对象的日志；真实资源 API 会在后面的设计对照里讨论。'],
  16: ['上一课通过构造和析构绑定资源的获取与释放。本课用标准库类型管理动态创建的角色。', '**智能指针**是保存对象地址并执行特定生命周期规则的类。**所有权**表示谁负责最终销毁对象。std::unique_ptr<T> 表达独占所有权：同一时刻只有一个这样的拥有者，拥有者销毁时释放其对象。', '本课依次认识类型 unique_ptr<Character>、创建函数 make_unique、访问运算符 ->、所有权转移 std::move，以及不拥有对象的观察指针。它们各有不同职责，先从创建一个 Arthur 的最小例子开始。'],
  17: ['上一课创建并转移了一个角色的 unique_ptr。本课把多个拥有者组织成一支队伍。', '**容器**保存一组元素；std::vector<T> 是元素类型为 T 的动态数组。这里的元素类型是 unique_ptr<Character>，所以 vector 拥有指针包装，各包装拥有具体角色，角色行为由 Character 的虚接口提供。', '先准备角色接口，再把嵌套类型从内到外拆开，添加 Warrior 和 Mage，最后学习遍历、位置边界和删除。迭代器表示容器里的位置，不是永久角色 ID。'],
  18: ['上一课用循环遍历和删除队伍成员。本课用标准算法表达排序和筛选规则。', '**算法**接收一段元素范围并执行通用操作；**比较器**回答谁应该排在前面；**谓词**回答某个元素是否满足条件。**lambda**是可以在使用处定义的匿名可调用对象，可充当比较器或谓词。', '本课以生命值 {30,0,80,10,0} 为数据，先解释范围和普通函数，再拆解 lambda 的 [捕获](参数){函数体}，最后筛去非正生命值并降序排列。期望保留 80、30、10，共 3 项。'],
  19: ['上一课对内存中的生命值完成筛选和排序。本课把有意义的数据保存到文件，并在之后读取。', '**持久化**让数据在进程结束后仍保留；**序列化**把逻辑字段转换成约定格式；**反序列化**解析格式并重建数据。存档应保存姓名和血量，不保存一次运行里的对象地址。', '本课格式为版本号、带引号的姓名、生命值。先定义 Save 数据，再解释字段边界和文件流，随后读入临时对象，验证通过后才更新当前角色。成功、失败和原状态是否改变都必须可判断。'],
  20: ['上一课用返回 bool 明确表达存档加载是否成功。本课进一步区分失败接口、异常传播和调试工具。', '**异常**是让错误从当前函数转交给处理层的一种机制：throw 发出异常，try 指定处理范围，catch 接收匹配的异常。它不会自动把失败变成正常返回值，也不会替你回滚所有变量。', '本课伤害契约是：非负伤害正常返回剩余血量，超量伤害返回 0，负伤害抛 std::invalid_argument。先拆开 throw 的含义，再写函数与处理器；最后使用断点验证两条执行路径。'],
  21: ['前面已经拆分过头文件和实现文件，并会用编译器运行练习。本课把项目的构建规则保存成可以重复使用的文本。', '**构建目标**是要生成的程序或库；**CMake**读取目标与依赖配置，生成本机的构建规则；实际编译仍由 g++、Clang 或 MSVC 完成。配置阶段和构建阶段不同，不能把 CMake 当编译器。', '语法先看 project 命名项目、add_executable 列出目标源文件、target_compile_features 指定语言要求。随后看头文件、实现与 main 如何组合成 battle，再执行配置和构建命令。'],
  22: ['上一课把多个源文件组织成可重复构建的目标。本课把继承、多态、智能指针和容器组合成一个回合制战斗。', '**回合调度**决定行动顺序；**职业实现**决定具体攻击；**角色接口**统一生命规则；**拥有者**负责创建和销毁。battle 只借用角色，不决定它们的分配方式。', '本课规则固定：Warrior 120 生命、每击 35；Mage 80 生命、100 魔法，每击花 20 造成 40。死亡者不行动，先手击杀后后手不反击，最多 100 轮。先读共同接口，再跟踪三轮的具体数值。'],
  23: ['上一课战斗中的名字、血量和魔法都是数值状态。本课增加描述地图位置和移动方向的数学数据。', '**位置**表示相对原点的点；**位移向量**表示从起点到终点的变化；**长度**表示变化的大小；**单位方向**是长度为 1 的方向向量。位置相减得到位移，位置加位移得到新位置。', '先用 struct Vec2 把两个 double 分量 x、y 放在一起，定义只读 length()，再计算 (3,4) 的长度、归一化和零长度分支。所有例子使用普通二维直角坐标，先不绑定引擎坐标约定。'],
  24: ['上一课把方向与移动距离分开。本课继续把距离写成速度乘经过时间。', '**游戏循环**持续采集输入、更新状态并渲染；**DeltaTime**是本次更新对应的时间间隔，通常以秒为单位；**速度**是每秒移动的距离。速度乘间隔得到本次位移。', '核心语句 position += speed * deltaTime 中，+= 把本次位移加到旧位置，speed 的单位为距离/秒，deltaTime 的单位为秒。本课先用固定参数模拟一秒，不创建真实游戏窗口，再讨论帧率与大步长的边界。'],
  25: ['上一课按时间更新位置。本课把位置、生命等数据组织为可以自由组合的能力。', '**实体**表示一个对象的身份；**组件**保存某种能力的数据；**系统**按照组件数据执行规则。例如玩家有 Transform 和 Health，装饰树只有 Transform，伤害系统只处理有 Health 的对象。', '本课用 struct 表达小数据，用 std::optional<Health> 表达组件有或没有，用 Entity 组合 ID、位置与可选生命。它是理解组件设计的最小模型，不是完整高性能 ECS 框架。'],
  26: ['上一课用组合表达对象具备哪些能力。本课集中管理多个对象共同使用的资源。', '**资源缓存**按路径等标识查找已加载对象；shared_ptr 是共同延长资源生命周期的强拥有者；weak_ptr 是不延长资源生命周期的弱观察者。lock() 尝试从弱引用取得临时强拥有者，失败时得到空指针。', '本课缓存用 unordered_map<路径,weak_ptr<Texture>> 保存索引，get 返回 shared_ptr 给调用者。先阅读索引类型与 lock，再跟踪首次加载、再次复用、最后释放和重新加载。Texture 只有日志，不进行真实图像解码。'],
  27: ['上一课管理普通 C++ 资源。本课进入 UE，先接通一个最小的引擎运行入口。', '**World**组织运行中的场景；**Actor**是可放进世界的对象；**生命周期回调**是在引擎规定时机执行的虚函数。UE 已提供入口与主循环，你实现 BeginPlay，让一个 Actor 在开始游戏时写日志。', '先认识工具链，再解释 UCLASS、GENERATED_BODY、生成头文件和 AActor 类声明，最后实现并运行回调。目标固定 UE 5.6、EngineLab 模块；以下为学习源码，当前环境没有实际 UE 构建或 Play 验证。Windows 使用对应 MSVC/SDK，macOS 工程需配置匹配的 Xcode/Clang，MinGW 控制台任务不能代替 UE 构建。'],
  28: ['上一课让 Actor 在 BeginPlay 写出一次日志。本课让 Actor 在运行期间持续更新位置。', '**Tick**是引擎按更新频率调用的虚函数，参数 DeltaTime 表示本次间隔；**默认组件**是类构造时建立的固定组成；**根场景组件**承载 Actor 的空间变换。MovingMarker 由网格组件显示形状，由 Tick 沿世界 X 移动。', '先定义默认子对象、根组件和受反射追踪的成员，再写构造函数与 Tick。Speed 默认 50 厘米/秒，因此世界位移为 FVector(Speed*DeltaTime,0,0)。本课不处理玩家输入，也不保证移动遇墙停止。'],
  29: ['上一课用 Actor 的组件和 Tick 更新位置。本课让编辑器与蓝图认识自定义数据，并把伤害事件接到生命值。', '**反射**提供运行时与编辑器可查询的类型、属性和函数信息；**逻辑组件**保存可复用能力但不自带空间变换；**委托**允许事件通知已绑定的接收函数。LabHealthComponent 用这三者维护血量。', '先解释 UCLASS 的组件声明、UPROPERTY 的可编辑性和蓝图访问项，再解释 UFUNCTION 接收函数与 AddDynamic 绑定，最后跟踪 120 生命受到 25 伤害变为 95。编辑器元数据不能替代运行时验证。'],
  30: ['上一课让逻辑组件响应伤害。本课把键盘输入连接到一个可控制的移动角色。', '**PlayerController**负责控制；**Pawn**是可被控制的世界对象；**Character**是具有胶囊与 CharacterMovement 等常用能力的 Pawn。**Input Action**表达移动意图，**Mapping Context**把具体按键映射到意图。', '本课 AExplorerCharacter 继承 ACharacter。先定义二维动作和轴映射，再注册本地玩家的上下文，绑定 Move 函数，最后把二维值交给 AddMovementInput。相机固定俯视，移动沿世界轴，不含鼠标转向。'],
  31: ['上一课玩家能在关卡中移动。本课让进入陷阱区域的动作触发一次伤害。', '**碰撞响应**定义对象相遇时阻挡或重叠；**Overlap 事件**通知进入相交区域；**通用伤害流程**把伤害请求交给目标处理。陷阱感知相遇并发送伤害，生命组件才真正修改 Health。', '先区分 Overlap 与 Block，再定义球形触发组件和委托参数，随后过滤目标、调用 ApplyDamage、关闭碰撞并结束陷阱。默认 100 生命受到 25 伤害变为 75；本课仅本地一次性原型，不含联网命中系统。'],
  32: ['上一课已经连通移动、陷阱和生命变化。本课增加收集与计分，把功能串成可重复完成的场景。', '**最小可玩闭环**是一条有开始、操作与结果的完整路径。本课路径是 Play 后移动、受伤、收集三个物品，最后出现 Level complete! 日志。角色负责移动，组件维护生命和分数，物品只通知合格对象。', '先定义 Score、Goal 与 AddPoint，再定义 Pickup 的检测与显示组件，最后按三次收集跟踪状态并搭建关卡。当前完成判定只写日志；血量归零不会自动停止移动，失败界面、重开、存档与联网属于后续扩展。']
};

const orders = {
  15: ['overview','destructor','scope','trace','early-return','noncopyable','manual-cleanup','member-order','limits','practice'],
  16: ['overview','create','move','observer','trace','copy','borrow','raw-pointer','shared','practice'],
  19: ['overview','save-data','format','streams','load','trace','version','bad-file','integrity','practice'],
  20: ['overview','throw','apply','catch','return-value','unwind','assert','debug','boundaries','practice'],
  21: ['overview','target','features','files','commands','trace','build-dir','paths','direct-build','practice'],
  23: ['overview','vector-type','offset','length','normalize','zero','movement','spaces','numeric','practice'],
  28: ['overview','components','properties','constructor','tick','trace','assets','local-world','limits','practice'],
  29: ['overview','component-type','properties','delegate','begin-play','damage','flow','blueprint','boundaries','practice']
};

// 绑定文字是正文中的完整句子，行号由作者对照当前例子逐行指定。
const links = {
  15: {
    'manual-cleanup': [['提前 return 会跳过函数末尾的 releaseTexture，手工清理因此需要照顾每个出口。',[2,3,4]]],
    destructor: [['~Resource() 是析构函数的声明，函数体在这里输出 Release 日志。',[7,8,9]]],
    scope: [['第 2 行先构造 Texture，第 3 行再构造 Sound，离开这个作用域时按相反顺序销毁。',[2,3,5]]],
    'early-return': [['执行第 3 行的 return 时 texture 已成功构造，所以仍会析构；sound 尚未构造。',[2,3,4]]],
    noncopyable: [['两项 = delete 分别禁止复制构造和复制赋值，避免两个包装误认同一份资源归自己释放。',[1,2]]]
  },
  16: {
    'raw-pointer': [['new 创建角色，但 player 这个裸指针变量离开作用域不会自动执行 delete。',[1,2,3]]],
    create: [['make_unique<Character> 创建角色并建立唯一拥有者，first->name 访问被拥有的对象。',[2,3]]],
    copy: [['复制 first 的拥有者被禁止；另一次 make_unique 创建的是独立的新角色。',[2,3]]],
    move: [['std::move 允许移动构造把拥有权交给 second，完成后 first 为空而角色仍存活。',[1,2,3]]],
    observer: [['observer 只借用角色地址；随后拥有者转为 second，并不复制或搬动 Character 对象。',[2,3,4]]],
    borrow: [['Character 的 const 引用只借用对象，unique_ptr 按值参数则要求调用者交出拥有权。',[1,2]]]
  },
  17: {
    interface: [['role() 是返回职业文本的只读虚接口，Warrior 的 override 提供具体返回值。',[3,5,6]]],
    team: [['team 的元素是 unique_ptr<Character>，两次 push_back 分别加入 Warrior 和 Mage 的拥有者。',[1,2,3]]],
    'range-for': [['const auto& 绑定现有 unique_ptr，member->role() 再调用实际角色的虚函数。',[1,2]]],
    iterator: [['it 只有在不等于 end() 时才可解引用，(*it)->role() 分别经过位置和角色两层访问。',[1,2,3]]],
    erase: [['删除分支接住 erase 返回的位置，不删除的分支才执行 ++it。',[2,3,4,5]]],
    invalidation: [['observer 指向单独分配的角色，不是 vector 内的 unique_ptr 包装；拥有者删除后它仍会失效。',[1,2,3]]]
  },
  18: {
    range: [['sort 处理 begin() 到 end() 之前的半开区间，默认把生命值按升序排列。',[1,2]]],
    comparator: [['higherFirst 用 a > b 回答 a 应否排在 b 前面，sort 把这个函数作为比较规则。',[1,2,4]]],
    lambda: [['[](int a, int b) { return a > b; } 由空捕获列表、两个参数和比较函数体组成。',[2]]],
    capture: [['[limit] 按值保存阈值，hp <= limit 返回 true 表示该生命值满足死亡条件。',[1,2]]],
    remove: [['remove_if 返回新的逻辑终点 newEnd，谓词为 true 的项不再属于保留区间，但 size 尚未改变。',[1,2,3,4,5]]],
    'erase-remove': [['erase 删除 newEnd 之后的尾部，sort 再降序排列，最终输出三个存活值。',[1,2,3,4,5]]]
  },
  19: {
    'save-data': [['Save 只把姓名与生命值定义为逻辑字段，默认 health 为 100，不把进程地址当作存档。',[1,2,3]]],
    streams: [['ofstream 打开 save.txt，quoted 保留含空格的姓名边界，flush 后再检查流状态。',[1,2,3,4]]],
    load: [['先把字段读入 temporary，检查版本和范围，最后 current = temporary 才更新正式状态。',[2,3,4,5,6,7]]],
    trace: [['restored 起初使用默认值 100，loadSave 成功后才输出 Sir Arthur 的 75 生命值。',[1,2,3,4]]],
    'bad-file': [['坏文件用例只调用 loadSave，失败后 current 应保留 Keep Me 和 60，而不是部分更新。',[1,2,3,4]]]
  },
  20: {
    apply: [['负伤害执行 throw，合法伤害则由 return 返回新生命值，超量伤害返回 0。',[2,3]]],
    catch: [['try 中的负伤害调用跳转到 catch，error.what() 提供异常说明而不是一个正常伤害结果。',[1,2,3,4]]],
    'return-value': [['按值参数不会改写原 health；只有把返回值赋回变量，health 才从 100 变为 70。',[1,2,3]]],
    unwind: [['异常离开 try 作用域时清理已构造的 texture，再进入 catch。',[2,3,5,6]]],
    assert: [['if 的验证在运行时实际执行，注释中的 assert 不能替代对外部输入的检查。',[1,2,3,4]]]
  },
  21: {
    files: [
      ['头文件只声明 applyDamage，参数和返回类型组成调用者使用的接口。',[1,2],'Damage.h'],
      ['实现文件包含同一个头文件，再给出 applyDamage 的唯一函数定义。',[1,2,3,4],'Damage.cpp'],
      ['main 调用 applyDamage(100, 35)，正常结果为 65。',[3],'main.cpp'],
      ['battle 目标同时列出 main.cpp 和 Damage.cpp，才会把调用与实现一起编译链接。',[3],'CMakeLists.txt']
    ],
    target: [['add_executable 的第一个参数是目标名 battle，后面的两个参数是要参与构建的源文件。',[3]]],
    features: [['PRIVATE cxx_std_17 要求当前 battle 目标使用 C++17；后面的分支按编译器选择警告参数。',[1,2,3,4,5,6]]],
    commands: [['-S 选择源码目录、-B 选择 build 目录，--build 才执行已配置的构建。',[2,3,5,6]]],
    trace: [['applyDamage 的实现对正伤害计算 100 - 35，再把结果限制到不低于 0。',[3,4]]]
  },
  22: {
    character: [['takeDamage 把有效伤害集中到共同接口，纯虚 attack 交给职业实现，虚析构支持基类销毁。',[2,3,4,6,7]]],
    mage: [['法师活着且魔法至少 20 时先扣 20 魔法，再让目标承受 40 伤害。',[2,3,4]]],
    turns: [['先手攻击之后重新判断 second.isAlive()，只有仍活着的后手才能反击。',[2,3,4]]],
    winner: [['只有一方存活且另一方死亡才判胜，其余情况进入平局分支。',[1,3,5,6]]],
    ownership: [['队伍的 unique_ptr 拥有角色，*team[0] 和 *team[1] 把角色引用借给 battle。',[1,2,3,4]]]
  },
  23: {
    offset: [['目标减当前位置得到 (5-2, 5-1)，所以 offset 是 (3,4)。',[1,2,3]]],
    'vector-type': [['length() 的 const 表示不修改向量，sqrt(x*x+y*y) 计算两个分量构成的长度。',[2,3,4]]],
    length: [['offset 的两个分量为 3 和 4，length() 返回 sqrt(25)，也就是 5。',[1,2]]],
    normalize: [['长度大于阈值才逐分量除以 len，否则返回零向量，避免除零。',[2,3]]],
    movement: [['单位方向乘距离 2 得到位移，再分别加到当前位置的 x 和 y。',[1,2,3,4]]]
  },
  24: {
    loop: [['简化循环先读取输入，再以本次 deltaTime 更新，最后渲染状态。',[2,3,4]]],
    units: [['speed 的每秒单位乘 deltaTime 的秒，得到本次要加到 position 的距离。',[1,2,3]]],
    simulate: [['simulate 重复 frames 次相同更新，每次把 speed * dt 加到位置，最后返回累计距离。',[1,4,5,6]]],
    trace: [['1.0 / 30 与 1.0 / 60 保证浮点除法，两次调用都模拟一秒，位置都约为 6。',[1,2]]],
    'fixed-step': [['累积时间够一个 fixedDt 就执行一次固定更新，并从 accumulator 中减去这一小步。',[1,2,3,4]]]
  },
  25: {
    components: [['Transform 保存位置数据，Health 保存生命数据，二者可以按能力组合而不互相继承。',[1,2]]],
    entity: [['Entity 组合稳定身份、位置与 optional<Health>，最后一项可以有值或没有值。',[2,3,4]]],
    create: [['player 的 Health{100} 表示有生命组件，tree 的 nullopt 表示没有该组件而不是零血。',[1,2]]],
    damage: [['短路条件先确认 health 存在且伤害为正，之后才解引用并更新生命。',[2,3]]],
    trace: [['相同 damage 调用把玩家改为 70，却跳过没有生命组件的树，has_value() 因而输出 0。',[1,2,3,4]]],
    velocity: [['Velocity 只保存速度，选做更新应使用 transform.x += velocity.x * deltaTime。',[2,3]]]
  },
  26: {
    index: [['unordered_map 用路径字符串作键、weak_ptr<Texture> 作值，缓存本身不成为强拥有者。',[1]]],
    lock: [['lock() 成功得到 existing 这个 shared_ptr，返回它即可在调用者使用期间保持纹理存活。',[1,2]]],
    lookup: [['锁定失败时 make_shared 创建纹理，索引登记弱引用，返回强引用给使用者。',[2,3,4,5]]],
    reuse: [['a 尚未释放时第二次 get 同路径会复用同一对象，所以 a == b 输出 1。',[1,2,3]]],
    release: [['a 和 b 都 reset 后最后强引用消失，再次 get 会创建另一份纹理。',[1,2,3]]]
  },
  27: {
    'actor-type': [
      ['UCLASS 和 GENERATED_BODY 接入引擎反射，ALabProbe 则以普通 C++ 公开继承 AActor。',[6,7,8]],
      ['BeginPlay 的 override 要求签名与基类虚接口匹配，真正函数体在实现文件中提供。',[9,10]]
    ],
    'begin-play': [['Super::BeginPlay() 先执行父类流程，再输出本 Actor 的 EngineLab ready。',[2,3,4]]],
    logging: [['UE_LOG 使用日志类别、级别和 TEXT 字符字面量；%s 的例子额外打印本实例 GetName()。',[1,3]]],
    'object-life': [['注释分别列出由世界 SpawnActor、请求 Destroy 和不可使用的手工 delete，表达三种不同责任。',[2,3,4]]]
  },
  28: {
    constructor: [['构造函数启用 Tick，创建默认网格组件并把它设置为根组件。',[2,3,4]]],
    properties: [['VisibleAnywhere 暴露 Mesh 供查看，EditAnywhere 允许配置 Speed，二者不等于自动指定网格资产。',[1,2,4,5]]],
    tick: [['每次 Tick 先调用父类，再用 Speed * DeltaTime 生成世界 X 方向的本次位移。',[1,2,3]]],
    trace: [['50 厘米每秒乘 0.02 秒得到这一帧 1 厘米的位移。',[2,3,4]]],
    'local-world': [['选做用 GetActorForwardVector() 获取自身朝前的世界方向，再乘速度和时间生成位移。',[2,3]]]
  },
  29: {
    'component-type': [['BlueprintSpawnableComponent 允许蓝图添加本组件，继承 UActorComponent 提供无空间变换的逻辑能力。',[1,2,3]]],
    properties: [['MaxHealth 可编辑且蓝图可写，Health 作为运行状态只读暴露；元数据不是运行时校验。',[1,2,3,4]]],
    'begin-play': [['BeginPlay 先验证上限、令 Health 等于实际 MaxHealth，再把接收函数绑定到拥有者的伤害委托。',[3,4,5]]],
    delegate: [['UFUNCTION 为接收函数提供反射信息，参数列表必须与伤害委托的完整签名对应。',[1,2,3,4]]],
    damage: [['非正伤害或已零血直接返回；合法伤害经 Clamp 限制后写入 Health。',[1,2]]]
  },
  30: {
    dependencies: [['两个 EditDefaultsOnly 属性分别引用输入映射上下文和动作资产，需要在蓝图默认值中赋值。',[1,2,3,4]]],
    camera: [['CameraBoom 挂到根组件，Camera 再挂到相机臂，长度与俯角决定固定观察结构。',[1,2,3,4,5,6]]],
    context: [['逐层取得玩家控制器、本地玩家和输入子系统后，才添加非空 MappingContext。',[1,2,3,4]]],
    binding: [['BindAction 绑定 Triggered 事件到当前实例的 Move 成员函数，并非此时立刻调用 Move。',[3,4,5,6]]],
    move: [['Axis.Y 提供世界前方强度，Axis.X 提供世界右方强度；AddMovementInput 的强度不再乘 DeltaTime。',[2,3,4]]]
  },
  31: {
    trigger: [['半径 100 定义球形范围，碰撞预设和 GenerateOverlapEvents 分别设置响应与事件生成。',[1,2,3,4,5]]],
    delegate: [['UFUNCTION 声明完整重叠签名，BeginPlay 中的 AddDynamic 把当前实例与 OnOverlap 绑定。',[1,2,3,4,7]]],
    filter: [['无效对象、自身或非 Pawn 会立即返回，不进入后续伤害流程。',[1,2]]],
    damage: [['ApplyDamage 接收目标、非负伤害、发起控制器和来源 Actor，实际 Health 更新仍由目标处理。',[1,2,3]]],
    consume: [['关闭碰撞后请求 Destroy，不能把它替换成标准 C++ 的 delete this。',[1,2,3]]]
  },
  32: {
    'score-type': [
      ['Score 初始为 0 且蓝图只读，Goal 初始为 3 并可在编辑器配置。',[1,2,3,4]],
      ['BlueprintCallable 把统一的 AddPoint 入口提供给蓝图，调用者不必直接改 Score。',[5,6]]
    ],
    score: [['达到 Goal 后立即返回，否则只加一次分，并在刚达到目标时输出完成。',[2,3,4,5]]],
    'pickup-components': [['Trigger 承担检测，Mesh 只负责显示并关闭自己的碰撞，避免重复检测来源。',[1,2,3,4,5,6,7]]],
    collect: [['只有找到 LabScoreComponent 才关闭碰撞、通知加分并销毁当前物品。',[2,3,4,5]]]
  }
};

const preferredExamples = {15:'destructor',16:'create',17:'team',18:'lambda',19:'load',20:'apply',21:'files',22:'turns',23:'vector-type',24:'simulate',25:'entity',26:'lookup',27:'actor-type',28:'tick',29:'damage',30:'move',31:'damage',32:'collect'};
const references = {
  15: {trace:'scope','member-order':'destructor',limits:'early-return',practice:'scope'},
  16: {trace:'observer',shared:'create',practice:'move'},
  17: {trace:'erase',interfaces:'team',practice:'erase'},
  18: {mistakes:'erase-remove',complexity:'comparator',practice:'erase-remove'},
  19: {format:'streams',version:'load',integrity:'streams',practice:'bad-file'},
  20: {throw:'apply',debug:'catch',boundaries:'apply',practice:'catch'},
  21: {'build-dir':'commands',paths:'commands','direct-build':'files',practice:'files'},
  22: {borrow:'ownership',trace:'turns','round-limit':'turns',practice:'ownership'},
  23: {zero:'normalize',spaces:'movement',numeric:'normalize',practice:'normalize'},
  24: {'large-step':'simulate',integration:'units','time-errors':'trace',practice:'trace'},
  25: {identity:'create',inheritance:'entity',practice:'damage'},
  26: {'cache-life':'release',limits:'lookup','ue-boundary':'index',practice:'reuse'},
  27: {toolchain:'actor-type',generated:'actor-type',instance:'begin-play',debug:'begin-play',practice:'begin-play'},
  28: {components:'constructor',assets:'properties',limits:'tick',practice:'tick'},
  29: {flow:'begin-play',blueprint:'damage',boundaries:'properties',practice:'damage'},
  30: {actions:'move',possession:'dependencies',debug:'binding',practice:'move'},
  31: {responses:'trigger',trace:'damage','collision-setup':'trigger',practice:'delegate'},
  32: {roles:'collect',consume:'collect',trace:'score',scene:'pickup-components',extensions:'score',practice:'collect'}
};

const replacements = {
  15: {
    destructor: {
      paragraphs: [
        '构造函数与类同名，用来建立对象初始状态；析构函数在类名前加 ~，没有返回类型、没有普通参数。~Resource() 在这里声明析构函数；已经成功构造的普通局部对象正常离开作用域时，会自动执行它。',
        '构造参数 const std::string& n 只读借用名字，: name(n) 在函数体之前初始化成员。explicit 用来禁止把单个字符串参数不经意地隐式转换成 Resource。下面构造打印 Acquire，析构打印 Release，使生命周期可观察；日志模型没有真的加载图片，真实封装还要在这两个位置调用对应资源 API。'
      ]
    }
  },
  16: {
    observer: {
      paragraphs: [
        '观察指针是只访问对象、不承担释放责任的普通指针。get() 从 unique_ptr 取得角色地址，不复制角色，不转移拥有权，也不延长生命周期。下面重新列出一个独立小例子的完整顺序：先创建 first，再观察，最后转移给 second，不要接在上一段已经移动后的 first 上重复执行。',
        '转移前后的 Character 地址相同，所以 observer 仍可访问这个活着的 Arthur；但是 second.reset() 或 second 析构后，observer 不会自动变空，已经不能解引用。不要对 observer 执行 delete，也不要再用它构造第二个 unique_ptr。'
      ],
      code: cpp`auto first = std::make_unique<Character>("Arthur");
Character* observer = first.get();
std::cout << "Observe: " << observer->name << "\n";
auto second = std::move(first);
// observer 此时仍指向存活的 Arthur
// second.reset(); 之后 observer 就不能再解引用`
    }
  },
  17: {
    interface: {
      paragraphs: [
        '先约定队伍元素共享的 Character 接口：virtual std::string role() const=0 声明只读职业查询，=0 表明基类不提供具体职业；virtual 析构支持通过基类接口销毁真实角色。Warrior 继承此接口，用 override 返回自己的职业文本。Mage 用相同签名返回 Mage，完整代码放在参考文件中。',
        '这些语法来自第 14 课，本课只增加容器中的拥有关系。先保持角色接口很小，接着阅读 vector<unique_ptr<Character>>，再观察它如何保存不同实际类型；对象切片的设计对照放到遍历和删除实验之后。'
      ]
    },
    interfaces: {
      paragraphs: [
        '回头比较按值存储：vector<Character> 的每个元素必须是 Character 本身，含纯虚函数的 Character 不能实例化；对可实例化的基类，按值复制派生对象也只保留基类部分，称为对象切片。vector<unique_ptr<Character>> 保存拥有者，派生对象仍完整存在，因此能保留多态。',
        '打印队伍接收 const vector<unique_ptr<Character>>&，只读借用容器；操作单个成员接收 Character&，不转移拥有权。角色还需要独立稳定身份：删除前面的成员会改变下标，不能把当前位置当作任务系统永久角色 ID。第 25 课会继续区分身份与存放位置。'
      ]
    }
  },
  19: {
    streams: {
      paragraphs: [
        'std::ofstream 是 <fstream> 中的输出文件流类型，std::ifstream 是输入文件流类型；构造时尝试打开文件，离开作用域自动关闭。路径 "save.txt" 相对于程序当前工作目录，默认 ofstream 打开同名文件会截断原内容。上一小节已约定版本、quoted 姓名和生命值的字段顺序，现在按这个顺序写出。',
        'flush() 把流缓冲送向底层，static_cast<bool>(out) 再把流状态显式转换成 bool；static_cast<目标类型>(表达式) 是这里的转换语法。打开或写入失败会让检查结果为 false。它检查的是流层状态，不是断电后必然完整的保证；不能仅凭文件存在就报告成功。'
      ]
    }
  },
  20: {
    apply: {
      paragraphs: [
        'applyDamage 接收两个按值 int 参数并返回新生命值。本例的前提是 health 非负；damage<0 不属于合法调用，使用刚定义的 throw 报告参数错误；damage>=health 直接返回 0，其余情况返回差值。函数不会直接改变调用者变量。',
        'std::invalid_argument 是 <stdexcept> 中表示无效参数的异常类，圆括号内字符串给出错误说明。if、throw 和 return 对应清楚的两条路径：非法调用没有正常 int 返回，合法调用产生一个新值。把失败偷偷编码成 0 的问题，在下面错误接口对照中再总结。'
      ]
    },
    catch: {
      code: cpp`try {
    applyDamage(100, -1);
} catch (const std::exception& error) {
    std::cout << "Error: " << error.what() << "\n";
}`
    }
  },
  21: {
    files: {
      paragraphs: [
        '下面是一组互相配合的完整文件。Damage.h 声明接口；Damage.cpp 包含这个头文件并提供函数定义；main.cpp 使用接口；CMakeLists.txt 把两个 .cpp 列到同一个 battle 目标。先分别看文件名，区分“供编译器读取的 C++”与“供 CMake 读取的构建规则”。',
        '头文件中的声明足以让 main 编译调用，却不会自动把实现参加链接，所以不能漏掉 Damage.cpp。#pragma once 只防止头文件在一个翻译单元重复包含。练习目录和 reference 是两套可独立构建的代码，不要把两份实现同时加入目标。'
      ],
      codeFiles: [
        {name:'CMakeLists.txt',language:'cmake',content:'cmake_minimum_required(VERSION 3.20)\nproject(EngineLab LANGUAGES CXX)\nadd_executable(battle main.cpp Damage.cpp)\ntarget_compile_features(battle PRIVATE cxx_std_17)\nif(MSVC)\n  target_compile_options(battle PRIVATE /W4)\nelse()\n  target_compile_options(battle PRIVATE -Wall -Wextra -pedantic)\nendif()'},
        {name:'Damage.h',language:'cpp',content:'#pragma once\nint applyDamage(int health, int damage);'},
        {name:'Damage.cpp',language:'cpp',content:cpp`#include "Damage.h"
#include <algorithm>
int applyDamage(int health, int damage) {
    return damage > 0 ? std::max(0, health - damage) : health;
}`},
        {name:'main.cpp',language:'cpp',content:cpp`#include "Damage.h"
#include <iostream>
int main() { std::cout << "Health: " << applyDamage(100, 35) << "\n"; }`}
      ]
    }
  },
  23: {
    'vector-type': {
      paragraphs: [
        'struct Vec2 把 x、y 两个 double 分量组成一个小值类型，成员默认公开；x=0,y=0 提供默认值。length() const 声明一个不修改当前向量的成员函数，返回 double 长度。这里不需要继承、动态分配或智能指针。',
        'std::sqrt 是 <cmath> 中的平方根函数，sqrt(x*x+y*y) 按直角坐标长度公式计算；C++ 的平方写 x*x，^ 是按位异或而不是乘方。先看结构与公式，接下来用 (3,4) 逐项代入得到 5。'
      ]
    },
    normalize: {
      paragraphs: [
        '**归一化**把非零向量变成同方向、长度为 1 的向量，计算方法是每个分量除以原长度。对 (3,4)，len=5，得到 (0.6,0.8)。normalized() 返回新 Vec2，不修改原向量，因此需要原距离时仍可保留它。',
        'return 中使用“条件 ? 条件为真时的值 : 条件为假时的值”。len>1e-9 时构造 Vec2{x/len,y/len}，否则返回默认零向量 Vec2{}。1e-9 表示 10 的负 9 次方，是本例处理接近零长度的阈值，避免除零；阈值应随坐标单位和范围选择。',
        '归一化保留方向却丢弃原长度，不是每个向量都应该归一化。例如速度向量的长度表示速度大小，随便归一化会改变实际速度。先把方向和大小分开，再在移动例子中把距离乘回来。'
      ]
    }
  },
  26: {
    index: {
      paragraphs: [
        'std::unordered_map<Key,Value> 是按键查找值的无序映射，由 <unordered_map> 提供。本例 Key 为 std::string 路径，Value 为 std::weak_ptr<Texture> 弱引用；同一字符串键对应一个索引项，不依赖插入顺序来表示资源身份。',
        'index[path] 取得路径对应的弱引用；路径还没有登记时会插入一个默认的空 weak_ptr。缓存因此只保存查找入口，不成为纹理的强拥有者。下一步用 lock() 查询对象是否仍由调用者拥有，再决定复用还是创建。'
      ]
    },
    'cache-life': {
      paragraphs: [
        '缓存只持弱引用，销毁 Cache 不必销毁调用者仍在使用的纹理；反过来，Cache 仍活着也不代表所有索引资源存活。索引容器生命周期与资源生命周期已经分开。',
        '如果把索引值改成 shared_ptr，缓存就会一直延长纹理存活，直到删除条目或销毁缓存。强缓存可以是一种有意策略，但与本课“最后使用者离开就释放”的规则不同。资源析构若依赖 GPU 设备仍存在，还要另行安排设备与资源的销毁顺序，shared_ptr 不会自动建立这层架构。'
      ]
    }
  },
  27: {
    'begin-play': {
      paragraphs: [
        'BeginPlay 是 Actor 的虚生命周期函数，开始参与游戏时由引擎调用；override 核对签名，ALabProbe::BeginPlay 表示类外定义。Super 是 UE 提供的父类别名，Super::BeginPlay() 先完成父类流程，再执行当前类的行为。无需另写 main 手动调用它，也不要在构造函数里假装开始游戏。',
        '下方 UE_LOG 是引擎日志宏，LogTemp 是示例日志类别，Display 是级别，TEXT("EngineLab ready") 是适配引擎字符类型的文本字面量。此处先输出一条固定消息，下一小节再扩展为带实例名的格式化日志。'
      ]
    }
  },
  28: {
    components: {
      paragraphs: [
        'UStaticMeshComponent 是显示静态网格的场景组件，具有空间变换。CreateDefaultSubobject<T>(名称) 在类构造函数中建立固定的默认子对象，模板参数 T 指定组件类型，TEXT("Mesh") 给它稳定组件名。SetRootComponent(Mesh) 再把该场景组件设为 Actor 根，Actor 位置便有承载者。',
        '这些组件参与 UE 对象体系，不使用普通 new/delete。先了解这两个调用的作用，再看下面属性与构造例子。运行时动态加组件另有注册流程；不要把创建默认子对象的语句挪进 Tick 反复执行。'
      ]
    }
  },
  30: {
    camera: {
      paragraphs: [
        'SpringArm 是把相机放在相对距离的相机臂组件，Camera 负责观察画面。ACharacter 已有胶囊根；构造中让 CameraBoom 挂到根，再让 Camera 挂到 CameraBoom。SetupAttachment 建立父子关系，子组件的相对变换跟随父组件。',
        'TargetArmLength=450.f 指相机臂长度；FRotator 的参数顺序是俯仰 Pitch、偏航 Yaw、翻滚 Roll，所以 (-45,0,0) 设置俯视角。当前相机方向固定，不含鼠标旋转；网格与动画资产仍需在蓝图中指定，胶囊能移动不等于已经有可见人物。'
      ]
    }
  },
  31: {
    trigger: {
      paragraphs: [
        'USphereComponent 是球形碰撞查询组件，适合表示一个不要求可见网格的触发范围。CreateDefaultSubobject 创建它，SetRootComponent 使其承载 Actor 空间位置，InitSphereRadius(100.f) 给出半径。SetCollisionProfileName 选择响应预设，SetGenerateOverlapEvents 允许本组件产生重叠事件。',
        'OverlapAllDynamic 预设面向动态对象的重叠响应，但还需要对方组件有合适的 Query 与重叠设置。球形检测范围不等于一颗自动可见的球；编辑器显示检测轮廓与游戏中渲染模型是两种事情。下面再绑定事件函数，连接感知与行为。'
      ]
    }
  }
};

const nextLessons = {
  15:'下一课用 unique_ptr 把这套生命周期责任应用到动态角色。',
  16:'下一课把多个独占拥有者放进 vector，建立可以增删的队伍。',
  17:'下一课把筛选和排序交给标准算法，并用 lambda 表达变化规则。',
  18:'下一课把内存里的逻辑数据写成明确的存档格式。',
  19:'下一课比较返回值、异常和断言，学习在调试器中定位失败。',
  20:'下一课把多个源文件的编译与链接规则写成 CMake 目标。',
  21:'下一课组合共同接口、拥有者和调度，完成一个可结束的回合战斗。',
  22:'下一课加入位置和向量，开始描述角色在地图中的空间状态。',
  23:'下一课使用速度和经过时间决定每一帧的移动距离。',
  24:'下一课把位置、生命与速度整理成可组合的组件数据。',
  25:'下一课研究多个对象共享同一资源时的缓存与释放。',
  26:'下一课进入 UE 的对象、模块与生命周期回调，区分引擎管理与标准所有权。',
  27:'下一课创建网格组件，在 Tick 中按时间推进位置。',
  28:'下一课把生命值组件接到反射、蓝图属性和伤害事件。',
  29:'下一课连接输入动作、可控制角色与移动组件。',
  30:'下一课通过重叠事件发现玩家进入陷阱，并发送一次伤害。',
  31:'下一课把收集、分数、移动与伤害接成同一个可重复运行的场景。',
  32:'后续可先选择一种扩展：用统一状态管理完成和失败，或把本课逻辑数据接入存档；先补全规则与验收，再增加表现。'
};

export const advancedLectures = Object.fromEntries(Object.entries(draftLectures).map(([number, sections]) => {
  const n=Number(number);
  const byKey=new Map(outlines[n].map(([key,title],index)=> {
    const original=sections[index];
    const revision=replacements[n]?.[key]??{};
    const entry={...original,...revision,title,id:`l${n}-${key}`};
    if(revision.codeFiles){delete entry.code;delete entry.language;}
    entry.paragraphs=key==='overview'?[...introductions[n]]:[...entry.paragraphs];
    if(key==='practice')entry.paragraphs.push(nextLessons[n]);
    const ownsCode=Boolean(entry.code||entry.codeFiles?.length);
    entry.exampleId=ownsCode?entry.id:`l${n}-${references[n]?.[key]??preferredExamples[n]}`;
    if(entry.code)entry.codeName=n>=27?`${entry.id}.cpp`:`lesson${n}.cpp`;
    entry.bindings=(links[n]?.[key]??[]).map(([text,lines,file])=>{
      const paragraph=entry.paragraphs.length;entry.paragraphs.push(text);
      return {paragraph,text,lines,...(file?{file}:{}),exampleId:entry.exampleId};
    });
    return [key,entry];
  }));
  return [n,(orders[n]??outlines[n].map(([key])=>key)).map(key=>byKey.get(key))];
}));
