#include <iostream>

int readPositiveNumber();
int calculateSum(int n);
void printEvenNumbers(int n);
int countEvenNumbers(int n);

int main()
{
    int n = readPositiveNumber();
    int sum = calculateSum(n);
    int evenCount = countEvenNumbers(n);

    std::cout << "Sum: " << sum << '\n';

    printEvenNumbers(n);

    std::cout << "Even count: " << evenCount << '\n';

    return 0;
}

int readPositiveNumber()
{
    int n;
    std::cout << "Please enter a positive integer: ";
    std::cin >> n;
    while (n <= 0)
    {
        std::cout << "The number must be > 0, please enter again: " << std::endl;
        std::cin >> n;
    }
    return n;
}

int calculateSum(int n)
{
    int sum = 0;
    for (int i = 1; i <= n; i++)
    {
        sum += i;
    }
    return sum;
}

void printEvenNumbers(int n)
{
    std::cout << "Even numbers: ";
    for (int i = 1; i <= n; i++)
    {
        if (i % 2 == 0)
        {
            std::cout << i << " ";
        }
    }
    std::cout << '\n';
}

int countEvenNumbers(int n)
{
    int count = 0;
    for (int i = 1; i <= n; i++)
    {
        if (i % 2 == 0)
        {
            count++;
        }
    }
    return count;
}