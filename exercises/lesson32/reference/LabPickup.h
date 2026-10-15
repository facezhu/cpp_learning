#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "LabPickup.generated.h"
class USphereComponent;
class UStaticMeshComponent;
UCLASS()
class ENGINELAB_API ALabPickup : public AActor
{
    GENERATED_BODY()
public:
    ALabPickup();
    UPROPERTY(VisibleAnywhere) TObjectPtr<USphereComponent> Trigger;
    UPROPERTY(VisibleAnywhere) TObjectPtr<UStaticMeshComponent> Mesh;
protected:
    virtual void BeginPlay() override;
    UFUNCTION() void OnOverlap(UPrimitiveComponent* Overlapped, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 BodyIndex, bool bFromSweep, const FHitResult& Hit);
};
