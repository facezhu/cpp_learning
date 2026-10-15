#include <iostream>
#include <vector>

void printScores(
    const std::vector<int>& scores
);

void addBonus(
    std::vector<int>& scores,
    int bonus
);

double calculateAverage(
const std::vector<int>& scores
);


int main(){
    std::vector<int> scores = {65, 78, 92, 100};
    std::cout << "Before: ";
    printScores(scores);

    int bonus;
    std::cout << "Enter bonus: ";
    std::cin >> bonus;
    addBonus(scores, bonus);
    
    std::cout << "After: ";
    printScores(scores);

    double average = calculateAverage(scores);
    std::cout << "Average: " << average << std::endl;

    return 0;
}

void printScores(
    const std::vector<int>& scores
){
    for (const int& score : scores) {
        std::cout << score << " ";
    }
    std::cout << std::endl;
}

void addBonus(
    std::vector<int>& scores,
    int bonus
){
    for (int& score : scores) {
        score += bonus;

        if (score > 100)
        {
            score = 100;
        }
    }
}

double calculateAverage(
    const std::vector<int>& scores
){
    if (scores.empty()) return 0.0; // Empty scores have no arithmetic mean; this exercise uses 0.
    int sum = 0;
    for (const int& score : scores) {
        sum += score;
    }
    return static_cast<double>(sum) / scores.size();
}