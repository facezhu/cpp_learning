#include <iostream>
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
    std::cout << name << " (" << damage << " damage)" << "\n";
}

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

Player::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)
{
}

void Player::attack(Player& target) const{
    if (!isAlive()){
        std::cout << name << " cannot attack." << "\n";
        return;
    }

    std::cout << name << " attack with " << weapon.getName() << "!\n";

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

int main(){
    Weapon sword("Iron Sword", 30);
    Weapon staff("Magic Staff", 45);

    Player knight("Knight", sword);
    Player mage("Mage", staff);

    knight.attack(mage);
    mage.attack(knight);

    knight.printStatus();
    mage.printStatus();

    knight.attack(mage);
    mage.attack(knight);

    knight.printStatus();
    mage.printStatus();

    knight.attack(mage);
    mage.attack(knight);

    knight.printStatus();
    mage.printStatus();
}

