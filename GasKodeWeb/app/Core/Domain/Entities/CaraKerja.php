<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class CaraKerja implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $list,
        private ?string $createdAt = null
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getList(): string { return $this->list; }
    public function getCreatedAt(): ?string { return $this->createdAt; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'list' => $this->list,
            'created_at' => $this->createdAt,
        ];
    }
}