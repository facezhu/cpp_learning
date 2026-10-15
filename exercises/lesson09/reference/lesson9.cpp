#include <iostream>
#include <string>

class Player
{
private:
    std::string name = "Unknown";
    int health = 100;
public:
    void setName(const std::string& newName);
    void takeDamage(int damage);
    void heal(int amount);
    void printStatus() const;
    bool isAlive() const;

};

void Player::setName(const std::string& newName)
{
    name = newName;
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
    Player player2;

    player1.setName("Knight");
    player2.setName("Mage");

    player1.takeDamage(30);
    player2.takeDamage(120);

    player1.heal(10);

    player1.printStatus();
    player2.printStatus();

    std::cout << std::boolalpha;
    std::cout << "Knight alive: " << player1.isAlive() << '\n';
    std::cout << "Mage alive: " << player2.isAlive() << '\n';
}
