#include "Player.h"
#include <iostream>


Player::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)
{
}

void Player::attack(Player& target) const{
    if (!isAlive()){
        std::cout << name << " cannot attack." << "\n";
        return;
    }

    std::cout << name << " attacks with " << weapon.getName() << "!\n";

    target.takeDamage(weapon.getDamage());
}

void Player::takeDamage(int damage){
    if (damage <= 0 || !isAlive()){
        return;
    }

    health -= damage;

    if (health < 0){
        health = 0;
    }
}

void Player::printStatus() const{
    std::cout << "Player: " << name << '\n';
    std::cout << "Health: " << health << '\n';
    std::cout << "Weapon: ";
    weapon.printInfo();

    std::cout << "\n\n";
}

bool Player::isAlive() const{
    return health > 0;
}