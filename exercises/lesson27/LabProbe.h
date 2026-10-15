#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "LabProbe.generated.h"
UCLASS()
class ENGINELAB_API ALabProbe : public AActor
{
    GENERATED_BODY()
protected:
    virtual void BeginPlay() override;
};
