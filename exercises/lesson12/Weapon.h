#pragma once
#include <string>


class Weapon
{
private:
    std::string name;
    int damage;
public:
    Weapon(const std::string& weaponName, int weaponDamage);

    const std::string& getName() const;
    int getDamage() const;
    void printInfo() const;
};