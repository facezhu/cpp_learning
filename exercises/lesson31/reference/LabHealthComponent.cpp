#include "LabHealthComponent.h"
#include "GameFramework/Actor.h"
void ULabHealthComponent::BeginPlay()
{
    Super::BeginPlay();
    MaxHealth = FMath::Max(1.f, MaxHealth);
    Health = MaxHealth;
    GetOwner()->OnTakeAnyDamage.AddDynamic(this, &ULabHealthComponent::ReceiveDamage);
}
void ULabHealthComponent::ReceiveDamage(AActor* DamagedActor, float Damage, const UDamageType* Type, AController* Instigator, AActor* Causer)
{
    if (Damage <= 0.f || Health <= 0.f) return;
    Health = FMath::Clamp(Health - Damage, 0.f, MaxHealth);
    UE_LOG(LogTemp, Display, TEXT("%s health: %.0f"), *GetOwner()->GetName(), Health);
}
