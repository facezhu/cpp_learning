#include <iostream>
#include <stdexcept>
int applyDamage(int health,int damage)
{
    if(damage<0) throw std::invalid_argument("negative damage");
    return damage>=health ? 0 : health-damage;
}
int main()
{
    std::cout<<"Health: "<<applyDamage(100,30)<<"\n";
    try { (void)applyDamage(100,-1); }
    catch(const std::exception& error) { std::cout<<"Error: "<<error.what()<<"\n"; }
}
