<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class Branding implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $kategori,
        private string $pernyataan,
        private array $jawaban,
        private ?string $ctaText = null,
        private ?string $ctaLink = null,
        private ?string $createdAt = null
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getKategori(): string { return $this->kategori; }
    public function getPernyataan(): string { return $this->pernyataan; }
    public function getJawaban(): array { return $this->jawaban; }
    public function getCtaText(): ?string { return $this->ctaText; }
    public function getCtaLink(): ?string { return $this->ctaLink; }
    public function getCreatedAt(): ?string { return $this->createdAt; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'kategori' => $this->kategori,
            'pernyataan' => $this->pernyataan,
            'jawaban' => $this->jawaban,
            'cta_text' => $this->ctaText,
            'cta_link' => $this->ctaLink,
            'created_at' => $this->createdAt,
        ];
    }
}