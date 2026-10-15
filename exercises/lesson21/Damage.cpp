#include "Damage.h"
#include <algorithm>
int applyDamage(int health,int damage) { return damage>0 ? std::max(0,health-damage) : health; }
