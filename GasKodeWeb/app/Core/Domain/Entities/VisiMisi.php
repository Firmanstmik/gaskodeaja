<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class VisiMisi implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $tipe,
        private array $konten,
        private int $urutan = 0,
        private ?string $createdAt = null
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getTipe(): string { return $this->tipe; }
    public function getKonten(): array { return $this->konten; }
    public function getUrutan(): int { return $this->urutan; }
    public function getCreatedAt(): ?string { return $this->createdAt; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'tipe' => $this->tipe,
            'konten' => $this->konten,
            'urutan' => $this->urutan,
            'created_at' => $this->createdAt,
        ];
    }
}