#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "InputActionValue.h"
#include "ExplorerCharacter.generated.h"
class UInputMappingContext;
class UInputAction;
class USpringArmComponent;
class UCameraComponent;
UCLASS()
class ENGINELAB_API AExplorerCharacter : public ACharacter
{
    GENERATED_BODY()
public:
    AExplorerCharacter();
    virtual void SetupPlayerInputComponent(UInputComponent* PlayerInputComponent) override;
    UPROPERTY(EditDefaultsOnly, Category="Input") TObjectPtr<UInputMappingContext> MappingContext;
    UPROPERTY(EditDefaultsOnly, Category="Input") TObjectPtr<UInputAction> MoveAction;
    UPROPERTY(VisibleAnywhere) TObjectPtr<USpringArmComponent> CameraBoom;
    UPROPERTY(VisibleAnywhere) TObjectPtr<UCameraComponent> Camera;
protected:
    virtual void BeginPlay() override;
    void Move(const FInputActionValue& Value);
};
