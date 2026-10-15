#include <cmath>
#include <iostream>
struct Vec2
{
    double x=0,y=0;
    double length() const { return std::sqrt(x*x+y*y); }
    Vec2 normalized() const { double len=length(); return len>1e-9 ? Vec2{x/len,y/len} : Vec2{}; }
};
int main()
{
    Vec2 direction=Vec2{3,4}.normalized();
    std::cout<<"Direction: "<<direction.x<<", "<<direction.y<<"\n";
    Vec2 zero=Vec2{}.normalized();
    std::cout<<"Zero: "<<zero.x<<", "<<zero.y<<"\n";
}
