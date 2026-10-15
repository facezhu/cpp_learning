#include "Player.h"
#include "Weapon.h"
#include <iostream>

int main()
{
    Weapon sword("Iron Sword", 30);
    Weapon staff("Magic Staff", 45);

    Player knight("Knight", sword);
    Player mage("Mage", staff);

    while (knight.isAlive() && mage.isAlive())
    {
        knight.attack(mage);

        if (mage.isAlive())
        {
            mage.attack(knight);
        }
    }

    if (knight.isAlive())
    {
        std::cout << "Knight wins!\n";
    }
    else
    {
        std::cout << "Mage wins!\n";
    }    
    
    knight.printStatus();
    mage.printStatus();

    return 0;
}