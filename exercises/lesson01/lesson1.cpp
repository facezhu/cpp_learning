#include <iostream>
#include <string>

int main()
{
    std::string name;
    int age;
    double height;

    std::cout << "Enter your name, age, and height (in meters): ";
    std::cin >> name >> age >> height;

    std::cout << "Name: " << name << "\n";
    std::cout << "Age: " << age << "\n";
    std::cout << "Height: " << height << "\n";

    return 0;
}