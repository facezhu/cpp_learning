#include <iostream>
#include <string>
class Resource
{
    std::string name;
public:
    explicit Resource(const std::string& n) : name(n) { std::cout<<"Acquire "<<name<<"\n"; }
    ~Resource() { std::cout<<"Release "<<name<<"\n"; }
    Resource(const Resource&) = delete;
    Resource& operator=(const Resource&) = delete;
};
void loadScene()
{
    Resource texture("Texture");
    Resource sound("Sound");
    std::cout<<"Scene ready\n";
}
int main() { loadScene(); std::cout<<"Back to menu\n"; }
