#include <memory>
#include <vector>
struct Character { virtual ~Character()=default; virtual void act() const=0; };
// TODO: 两种职业实现act。
int main() { std::vector<std::unique_ptr<Character>> team; /* TODO: 添加并遍历。 */ }
