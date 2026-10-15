#include <iostream>

int main() {
    int totalSeconds;
    std::cout << "Enter total seconds: ";
    std::cin >> totalSeconds;

    int hours = totalSeconds / 3600;
    int remainingSeconds = totalSeconds % 3600;
    int minutes = remainingSeconds / 60;
    int seconds = remainingSeconds % 60;

    std::cout << "hours: " << hours << std::endl;
    std::cout << "minutes: " << minutes << std::endl;
    std::cout << "seconds: " << seconds << std::endl;

    return 0;
}