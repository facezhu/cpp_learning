#include <iostream>
#include <string>

class Player
{
private:
    std::string name;
    int health;
public:
    Player();
    Player(const std::string& playerName, int startingHealth);
    void takeDamage(int damage);
    void heal(int amount);
    void printStatus() const;
    bool isAlive() const;

};

Player::Player(): name("Unknown"), health(100)
{

} 

Player::Player(const std::string& playerName, int startingHealth): name(playerName), health(startingHealth)
{
    if (health < 0)
    {
        health = 0;
    }
    else if (health > 100)
    {
        health = 100;
    }
}



void Player::takeDamage(int damage)
{
    if (damage <= 0)
    {
        return;
    }

    health -= damage;

    if (health < 0)
    {
        health = 0;
    }
}

void Player::heal(int amount)
{
    if (amount <= 0)
    {
        return;
    }

    health += amount;

    if (health > 100)
    {
        health = 100;
    }
}

void Player::printStatus() const
{
    std::cout << "Name: " << name << "\n";
    std::cout << "Health: " << health << "\n";   
}

bool Player::isAlive() const
{
    return health > 0;
}

int main(){
    Player player1;
    Player player2("Knight", 80);
    Player player3("Mage", 150);

    player1.takeDamage(30);
    player2.takeDamage(120);
    player3.takeDamage(40);

    player1.heal(10);

    player1.printStatus();
    player2.printStatus();
    player3.printStatus();

    if (player2.isAlive())
    {
        std::cout << "Knight is still alive.\n";
    }
    else
    {
        std::cout << "Knight has been defeated.\n";
    }
}
