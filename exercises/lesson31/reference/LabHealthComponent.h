#pragma once
#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "LabHealthComponent.generated.h"
UCLASS(ClassGroup=(Lab), meta=(BlueprintSpawnableComponent))
class ENGINELAB_API ULabHealthComponent : public UActorComponent
{
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Health", meta=(ClampMin="1")) float MaxHealth = 100.f;
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Health") float Health = 100.f;
protected:
    virtual void BeginPlay() override;
    UFUNCTION() void ReceiveDamage(AActor* DamagedActor, float Damage, const class UDamageType* Type, class AController* Instigator, AActor* Causer);
};
