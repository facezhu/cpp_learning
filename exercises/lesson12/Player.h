#pragma once
#include "Weapon.h"
#include <string>


class Player
{
private:
    std::string name;
    int health;
    Weapon weapon;
public:
    Player(const std::string& playername, const Weapon& startingweapon);

    void attack(Player& target) const;
    void takeDamage(int damage);
    void printStatus() const;
    bool isAlive() const;
};