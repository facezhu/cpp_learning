#include <memory>
#include <iostream>
#include <utility>
#include <string>
struct Character { int health = 100; std::string name;
explicit Character(const std::string& n) : name(n){}
~Character() { std::cout << "Destroy " << name << std::endl;} 
};
int main()
{
    // TODO: make_unique创建角色；move到新拥有者；检查源为空。
    auto first = std::make_unique<Character>("Arthur");
    Character* obeserver = first.get();
    std::cout << "Obeserve: " << obeserver->name << std::endl;
    auto second = std::move(first);
    std::cout << "First empty: " << (first==nullptr) << std::endl;
    std::cout << "Owner: " << second->name << std::endl;
}
