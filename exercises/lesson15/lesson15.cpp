#include <string>
#include <iostream>
class Resource
{
    std::string name;
public:
    explicit Resource(const std::string& n);
    ~Resource();
};
int main() { /* TODO: 内层作用域创建两个Resource，观察清理顺序。 */ }
