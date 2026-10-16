#include <string>
#include <iostream>
class Resource
{
    std::string name;
public:
    explicit Resource(const std::string& n) : name(n) {
        std::cout << "Acquire " << name << std::endl;
    }
    ~Resource() {
        std::cout << "Release " << name << std::endl;
    }
};
    void localScene() {
        Resource texture("Texture");
        Resource sound("Sound");
        std::cout << "Scene Ready" << std::endl;
    }
int main() { 
    localScene();
    std::cout << "Back to menu" << std::endl;
    /* TODO: 内层作用域创建两个Resource，观察清理顺序。 */ }
