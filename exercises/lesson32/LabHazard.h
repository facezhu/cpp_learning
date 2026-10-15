#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "LabHazard.generated.h"
class USphereComponent;
UCLASS()
class ENGINELAB_API ALabHazard : public AActor
{
    GENERATED_BODY()
public:
    ALabHazard();
    UPROPERTY(VisibleAnywhere) TObjectPtr<USphereComponent> Trigger;
    UPROPERTY(EditAnywhere, Category="Damage") float Damage = 25.f;
protected:
    virtual void BeginPlay() override;
    UFUNCTION() void OnOverlap(UPrimitiveComponent* Overlapped, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 BodyIndex, bool bFromSweep, const FHitResult& Hit);
};
