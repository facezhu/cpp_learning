#include <iostream>

int main() {
    int age;
    double price = 50;
    bool isMember;
    std::cout << "Enter your age: " << std::endl;
    std::cin >> age;
    std::cout << "Are you a member? (1 for yes, 0 for no): " << std::endl;
    std::cin >> isMember;

    if (age < 0 ){
        std::cout << "age is invalid" << std::endl;
    }
    else if (age >= 0 && age <= 5){
        std::cout << "The ticket is free" << std::endl;
    }
    else if (age >= 6 && age <= 17){
        price = price / 2;
        if (isMember){
            price -= 5;
        }
        std::cout << "The ticket price is " << price << " yuan" << std::endl; 
    }
    else if (age >= 18 && age <= 59){
        if (isMember){
            price -= 5;
        }
        std::cout << "The ticket price is " << price << " yuan" << std::endl; 
    }
    else if (age >= 60){
        price = price / 3;
        if (isMember){
            price -= 5;
        }
        std::cout << "The ticket price is " << price << " yuan" << std::endl; 
    }

    return 0;
} 