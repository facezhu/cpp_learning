#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "LabScoreComponent.generated.h"
UCLASS(ClassGroup=(Lab), meta=(BlueprintSpawnableComponent))
class ENGINELAB_API ULabScoreComponent : public UActorComponent
{
    GENERATED_BODY()
public:
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Score") int32 Score = 0;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Score", meta=(ClampMin="1")) int32 Goal = 3;
    UFUNCTION(BlueprintCallable) void AddPoint();
};
