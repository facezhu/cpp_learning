#include "LabScoreComponent.h"
void ULabScoreComponent::AddPoint()
{
    if (Score >= Goal) return;
    ++Score;
    UE_LOG(LogTemp, Display, TEXT("Score: %d / %d"), Score, Goal);
    if (Score >= Goal) UE_LOG(LogTemp, Display, TEXT("Level complete!"));
}
