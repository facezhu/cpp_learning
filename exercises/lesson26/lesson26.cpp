#include <memory>
#include <string>
#include <unordered_map>
struct Texture { std::string path; };
class Cache
{
    std::unordered_map<std::string,std::weak_ptr<Texture>> index;
public:
    std::shared_ptr<Texture> get(const std::string& path);
};
int main() { /* TODO: 两次获取，同一对象；全部释放后再加载。 */ }
