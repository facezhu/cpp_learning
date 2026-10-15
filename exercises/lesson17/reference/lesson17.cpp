#include <iostream>
#include <memory>
#include <string>
#include <vector>
struct Character { virtual ~Character()=default; virtual std::string role() const=0; };
struct Warrior : Character { std::string role() const override { return "Warrior"; } };
struct Mage : Character { std::string role() const override { return "Mage"; } };
int main()
{
    std::vector<std::unique_ptr<Character>> team;
    team.push_back(std::make_unique<Warrior>());
    team.push_back(std::make_unique<Mage>());
    for (const auto& member : team) std::cout<<member->role()<<"\n";
    for (auto it=team.begin(); it!=team.end();)
    {
        if ((*it)->role()=="Mage") it=team.erase(it);
        else ++it;
    }
    std::cout<<"Team size: "<<team.size()<<"\n";
}
