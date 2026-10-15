#include "MovingMarker.h"
#include "Components/StaticMeshComponent.h"
AMovingMarker::AMovingMarker()
{
    PrimaryActorTick.bCanEverTick = true;
    Mesh = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("Mesh"));
    SetRootComponent(Mesh);
}
void AMovingMarker::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
    AddActorWorldOffset(FVector(Speed * DeltaTime, 0.f, 0.f));
}
