#include "Weapon.h"
#include <iostream>

Weapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)
{
    if (damage < 0)
    {
        damage = 0;
    }
}

const std::string& Weapon::getName() const
{
    return name;
}

int Weapon::getDamage() const
{
    return damage;
}

void Weapon::printInfo() const 
{
    std::cout << name << " (" << damage << " damage)";
}