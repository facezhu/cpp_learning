#include <algorithm>
#include <iostream>
#include <optional>
struct Transform { double x=0; };
struct Health { int value=100; };
struct Entity { int id; Transform transform; std::optional<Health> health; };
void damage(Entity& entity,int amount)
{
    if(entity.health && amount>0) entity.health->value=std::max(0,entity.health->value-amount);
}
int main()
{
    Entity player{1,{0},Health{100}};
    Entity tree{2,{5},std::nullopt};
    damage(player,30); damage(tree,30);
    std::cout<<"Player HP: "<<player.health->value<<"\n";
    std::cout<<"Tree has health: "<<tree.health.has_value()<<"\n";
}
