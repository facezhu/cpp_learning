#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>
struct Texture
{
    std::string path;
    explicit Texture(const std::string& p):path(p) { std::cout<<"Load "<<path<<"\n"; }
    ~Texture() { std::cout<<"Unload "<<path<<"\n"; }
};
class Cache
{
    std::unordered_map<std::string,std::weak_ptr<Texture>> index;
public:
    std::shared_ptr<Texture> get(const std::string& path)
    {
        if(auto existing=index[path].lock()) return existing;
        auto loaded=std::make_shared<Texture>(path);
        index[path]=loaded; return loaded;
    }
};
int main()
{
    Cache cache;
    auto a=cache.get("hero.png"); auto b=cache.get("hero.png");
    std::cout<<"Same resource: "<<(a==b)<<"\n";
    a.reset(); b.reset();
    auto c=cache.get("hero.png");
}
