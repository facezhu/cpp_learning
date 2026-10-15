#include <string>
#include <algorithm>
#include <iostream>

class Character
{
private:
    std::string name;
    int health;
public:
    Character(const std::string& n,int hp) : name(n),health(std::max(0,hp)) {}
    virtual ~Character() = default;
    const std::string& getName() const { return name; }
    bool isAlive() const { return health>0; }
    void takeDamage(int d) { if (d>0 && isAlive()) health=std::max(0,health-d); }
    void print() const { std::cout<<name<<": "<<health<<"\n"; }
    virtual void attack(Character& target) = 0;
    // TODO: 从lesson13迁移共有状态与接口。
};
class Warrior : public Character
{
public:
    explicit Warrior(const std::string& n) : Character(n,120) {}
    void attack(Character& target) override { if(isAlive()) target.takeDamage(35); }
};
class Mage : public Character
{
    int mana=100;
public:
    explicit Mage(const std::string& n) : Character(n,80) {}
    void attack(Character& target) override { if(isAlive() && mana>=20) { mana-=20; target.takeDamage(40); } }
    int getMana() const { return mana; }
};
void battle(Character& first,Character& second)
{
    int rounds=0;
    while(first.isAlive() && second.isAlive() && rounds++<100)
    {
        first.attack(second);
        if(second.isAlive()) second.attack(first);
    }
    if(first.isAlive() && !second.isAlive()) std::cout<<first.getName()<<" wins!\n";
    else if(second.isAlive() && !first.isAlive()) std::cout<<second.getName()<<" wins!\n";
    else std::cout<<"Draw (round limit)\n";
}
// TODO: Warrior和Mage重写attack；battle只使用Character公共接口。
int main() {
    Warrior warrior("Arthur"); Mage mage("Merlin");
    battle(warrior, mage);
    warrior.print(); mage.print();
    std::cout<<"Mana: "<<mage.getMana()<<"\n";
     /* TODO: Arthur vs Merlin。 */ }
