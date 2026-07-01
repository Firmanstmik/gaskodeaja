<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class ServicePlan implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private int $serviceId,
        private string $name,
        private float $price,
        private array $features, // Array dari kolom JSON
        private float $maintenanceCost,
        private bool $isFeatured
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getServiceId(): int { return $this->serviceId; }
    public function getName(): string { return $this->name; }
    public function getPrice(): float { return $this->price; }
    public function getFeatures(): array { return $this->features; }
    public function getMaintenanceCost(): float { return $this->maintenanceCost; }
    public function isFeatured(): bool { return $this->isFeatured; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'service_id' => $this->serviceId,
            'name' => $this->name,
            'price' => $this->price,
            'features' => $this->features,
            'maintenance_cost' => $this->maintenanceCost,
            'is_featured' => $this->isFeatured,
        ];
    }
}