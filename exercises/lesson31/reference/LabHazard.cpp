#include "LabHazard.h"
#include "Components/SphereComponent.h"
#include "GameFramework/Pawn.h"
#include "Kismet/GameplayStatics.h"
ALabHazard::ALabHazard()
{
    Trigger = CreateDefaultSubobject<USphereComponent>(TEXT("Trigger"));
    SetRootComponent(Trigger);
    Trigger->InitSphereRadius(100.f);
    Trigger->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
    Trigger->SetGenerateOverlapEvents(true);
}
void ALabHazard::BeginPlay()
{
    Super::BeginPlay();
    Trigger->OnComponentBeginOverlap.AddDynamic(this, &ALabHazard::OnOverlap);
}
void ALabHazard::OnOverlap(UPrimitiveComponent* Overlapped, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 BodyIndex, bool bFromSweep, const FHitResult& Hit)
{
    if (!IsValid(OtherActor) || OtherActor == this || !OtherActor->IsA<APawn>()) return;
    UGameplayStatics::ApplyDamage(OtherActor, FMath::Max(0.f, Damage), GetInstigatorController(), this, nullptr);
    UE_LOG(LogTemp, Display, TEXT("Hazard hit: %s"), *OtherActor->GetName());
    SetActorEnableCollision(false);
    Destroy();
}
