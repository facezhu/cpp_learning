#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MovingMarker.generated.h"
class UStaticMeshComponent;
UCLASS()
class ENGINELAB_API AMovingMarker : public AActor
{
    GENERATED_BODY()
public:
    AMovingMarker();
    virtual void Tick(float DeltaTime) override;
    UPROPERTY(VisibleAnywhere) TObjectPtr<UStaticMeshComponent> Mesh;
    UPROPERTY(EditAnywhere, Category="Movement") float Speed = 50.f;
};
