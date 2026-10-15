#include <string>
struct Save { std::string name; int health=100; };
bool writeSave(const Save& data);
bool loadSave(Save& current);
int main() { /* TODO: 保存Sir Arthur/75，再加载到新对象。 */ }
