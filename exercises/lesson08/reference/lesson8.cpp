#include <iostream>

void applyDamage(int* health, int damage);
void healPlayer(int& health, int amount);
void printHealth(const int* health);

int main()
{
    int playerHealth = 100;

    printHealth(&playerHealth);

    applyDamage(&playerHealth, 30);
    printHealth(&playerHealth);

    healPlayer(playerHealth, 15);
    printHealth(&playerHealth);

    printHealth(nullptr);
    
    return 0;
}

void applyDamage(int* health, int damage)
{
    if (health == nullptr)
    {
        return;
    }

    *health -= damage;

    if (*health < 0)
    {
        *health = 0;
    }
}

void healPlayer(int& health, int amount)
{
    health += amount;
    
    if (health > 100)
    {
        health = 100;
    }
}

void printHealth(const int* health){
    if (health == nullptr){
        std::cout << "No player data" << std::endl;
        return;
    }

    std::cout << "Health: " << *health << std::endl;
}