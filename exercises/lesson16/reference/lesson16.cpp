#include <iostream>
#include <memory>
#include <string>
#include <utility>
struct Character
{
    std::string name;
    explicit Character(const std::string& n) : name(n) {}
    ~Character() { std::cout<<"Destroy "<<name<<"\n"; }
};
int main()
{
    auto first = std::make_unique<Character>("Arthur");
    Character* observer = first.get();
    std::cout<<"Observe: "<<observer->name<<"\n";
    auto second = std::move(first);
    std::cout<<"First empty: "<<(first==nullptr)<<"\n";
    std::cout<<"Owner: "<<second->name<<"\n";
}
