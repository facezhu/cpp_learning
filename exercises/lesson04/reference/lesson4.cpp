#include <iostream>

int main() {
    int n;
    int sum = 0;
    int count = 0;
    std::cout << "Please enter a int number: ";
    std::cin >> n;
    while (n <= 0)
    {
        std::cout << "The number must be > 0, please enter again: " << std::endl;
        std::cin >> n;
    }

    for (int i = 1; i <= n; i++)
    {
        sum += i;
    }
    std::cout << "The sum of 1 to " << n << " is: " << sum << std::endl;

    std::cout << "The even numbers are: ";
    for (int i = 1; i <= n; i++)
    {
        if (i % 2 == 0)
        {
            std::cout << i << " ";
            count++;
        }
    }
    std::cout << std::endl;

    std::cout << "The count of even numbers is: " << count << std::endl;

    return 0;
}