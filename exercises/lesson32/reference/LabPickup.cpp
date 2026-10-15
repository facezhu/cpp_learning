#include "LabPickup.h"
#include "LabScoreComponent.h"
#include "Components/SphereComponent.h"
#include "Components/StaticMeshComponent.h"
ALabPickup::ALabPickup()
{
    Trigger = CreateDefaultSubobject<USphereComponent>(TEXT("Trigger"));
    SetRootComponent(Trigger);
    Trigger->InitSphereRadius(75.f);
    Trigger->SetCollisionProfileName(TEXT("OverlapAllDynamic"));
    Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
    Mesh->SetupAttachment(Trigger);
    Mesh->SetCollisionEnabled(ECollisionEnabled::NoCollision);
}
void ALabPickup::BeginPlay()
{
    Super::BeginPlay();
    Trigger->OnComponentBeginOverlap.AddDynamic(this, &ALabPickup::OnOverlap);
}
void ALabPickup::OnOverlap(UPrimitiveComponent* Overlapped, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 BodyIndex, bool bFromSweep, const FHitResult& Hit)
{
    if (!IsValid(OtherActor)) return;
    if (auto* Score = OtherActor->FindComponentByClass<ULabScoreComponent>())
    {
        SetActorEnableCollision(false);
        Score->AddPoint();
        Destroy();
    }
}
