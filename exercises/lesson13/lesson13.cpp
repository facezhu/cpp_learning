#include <iostream>
#include <string>

class Character
{
private:
    std::string name;
    int health;
public:
    Character(const std::string& characterName, int characterHealth);
    
    const std::string& getName() const;
    int getHealth() const;
    void takeDamage(int damage);
    void printStatus() const;
    bool isAlive() const;

};

Character::Character(const std::string& characterName, int characterHealth): name(characterName), health(characterHealth)
{
    if (health < 0){
        health = 0;
    }
}

const std::string& Character::getName() const
{
    return name;
}

int Character::getHealth() const
{
    return health;
}

void Character::takeDamage(int damage)
{
    if (damage <= 0 || !isAlive())
    {
        return;
    }

    health -= damage;

    if (health < 0)
    {
        health = 0;
    }
}

void Character::printStatus() const
{
    std::cout << "Name: " << name << '\n';
    std::cout << "Health: " << health << '\n';
}

bool Character::isAlive() const
{
    return health > 0;
}

class Warrior : public Character
{
private:
    /* data */
public:
    Warrior(const std::string& warriorName);
    void powerAttack(Character& target) const;
};

Warrior::Warrior(const std::string& warriorName): Character(warriorName, 120)
{
}

void Warrior::powerAttack(Character& target) const
{
    if (!isAlive())
    {
        std::cout << getName() << " cannot attack.\n";
        return;
    }

    std::cout << getName() << " uses Power Attack!\n";
    target.takeDamage(35);
}

class Mage : public Character
{
private:
    int mana;
public:
    Mage(const std::string& mageName);

    void castSpell(Character& target);
    int getMana() const;
};

Mage::Mage(const std::string& mageName) : Character(mageName, 80), mana(100)
{
}

void Mage::castSpell(Character& target)
{
    const int manaCost = 20;
    const int spellDamage = 40;

    if (!isAlive())
    {
        std::cout << getName() << " cannot cast.\n";
        return;
    }

    if (mana < manaCost)
    {
        std::cout << getName() << " does not have enough mana.\n";
        return;
    }

    mana -= manaCost;

    std::cout << getName() << " casts a spell!\n";
    target.takeDamage(spellDamage);
}

int Mage::getMana() const
{
    return mana;
}

int main()
{
    Warrior warrior("Arthur");
    Mage mage("Merlin");

    warrior.printStatus();
    mage.printStatus();

    warrior.powerAttack(mage);
    mage.castSpell(warrior);

    warrior.powerAttack(mage);
    mage.castSpell(warrior);

    warrior.printStatus();
    mage.printStatus();

    std::cout << "Mage mana: "
              << mage.getMana() << '\n';

    return 0;
}



