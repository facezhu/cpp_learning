#include <optional>
struct Transform { double x=0; };
struct Health { int value=100; };
struct Entity { int id; Transform transform; std::optional<Health> health; };
void damage(Entity& entity,int amount) { /* TODO: 先判断组件是否存在。 */ }
int main() { /* TODO: 创建有生命值的玩家与无生命值的树。 */ }
