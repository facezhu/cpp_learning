#include <fstream>
#include <iomanip>
#include <iostream>
#include <string>
struct Save { std::string name; int health=100; };
bool writeSave(const Save& s)
{
    std::ofstream out("save.txt");
    out<<1<<" "<<std::quoted(s.name)<<" "<<s.health<<"\n";
    out.flush();
    return static_cast<bool>(out);
}
bool loadSave(Save& current)
{
    std::ifstream in("save.txt");
    int version=0; Save temporary;
    if (!(in>>version>>std::quoted(temporary.name)>>temporary.health)) return false;
    if (version!=1 || temporary.health<0 || temporary.health>100) return false;
    current=temporary; return true;
}
int main()
{
    if(!writeSave({"Sir Arthur",75})) return 1;
    Save restored;
    if(!loadSave(restored)) return 2;
    std::cout<<restored.name<<": "<<restored.health<<"\n";
}
