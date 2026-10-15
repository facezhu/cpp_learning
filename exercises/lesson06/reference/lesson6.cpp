#include <iostream>
#include <vector>

int readStudentCount();
void printStudentScores(const std::vector<int>& scores);
int calculateTotalScore(const std::vector<int>& scores);
double calculateAverageScore(int sum, std::vector<int>& scores);
int findHighestScore(const std::vector<int>& scores);
int findLowestScore(const std::vector<int>& scores);

int main()
{
    int studentCount = readStudentCount();
    std::vector<int> scores;

    for (int i = 0; i < studentCount; i++)
    {
        int score;

        std::cout << "Please enter the score for student " << i + 1 << ": ";
        std::cin >> score;
        while (score < 0 || score > 100)
        {
            std::cout << "The score must be between 0 and 100, please enter again: " << std::endl;
            std::cin >> score;
        }

        scores.push_back(score);
    }   

    int sum = calculateTotalScore(scores);
    double average = calculateAverageScore(sum, scores);
    int highestScore = findHighestScore(scores);
    int lowestScore = findLowestScore(scores);
    
    printStudentScores(scores);

    std::cout << "Total score: " << sum << '\n';
    std::cout << "Average score: " << average << '\n';
    std::cout << "Highest score: " << highestScore << '\n';
    std::cout << "Lowest score: " << lowestScore << '\n';


    return 0;
}

int readStudentCount()
{
    int studentCount;
    std::cout << "Please enter the number of students: ";
    std::cin >> studentCount;
    while (studentCount <= 0)
    {
        std::cout << "The number of students must be > 0, please enter again: " << std::endl;
        std::cin >> studentCount;
    }
    return studentCount;
}

void printStudentScores(const std::vector<int>& scores)
{
    std::cout << "All the scores are: ";
    for (int score : scores)
    {
        std::cout << score << " ";
    }
    std::cout << '\n';
}

int calculateTotalScore(const std::vector<int>& scores)
{
    int total = 0;
    for (int score : scores)
    {
        total += score;
    }
    return total;
}

double calculateAverageScore(int sum, std::vector<int>& scores)
{
    double average = static_cast<double>(sum) / scores.size();
    return average;
}

int findHighestScore(const std::vector<int>& scores)
{
    int highest = scores[0];
    for (int score : scores)
    {
        if (score > highest)
        {
            highest = score;
        }
    }
    return highest;
}

int findLowestScore(const std::vector<int>& scores)
{
    int lowest = scores[0];
    for (int score : scores)
    {
        if (score < lowest)
        {
            lowest = score;
        }
    }
    return lowest;
}