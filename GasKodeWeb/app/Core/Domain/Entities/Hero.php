<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class Hero implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $title,
        private string $subtitle,
        private string $imagePath,
        private string $ctaText,
        private string $ctaLink,
        private bool $isActive
    ) {}

    public function getId(): ?int { return $this->id; }
    public function getTitle(): string { return $this->title; }
    public function getSubtitle(): string { return $this->subtitle; }
    public function getImagePath(): string { return $this->imagePath; }
    public function getCtaText(): string { return $this->ctaText; }
    public function getCtaLink(): string { return $this->ctaLink; }
    public function isActive(): bool { return $this->isActive; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'image_path' => $this->imagePath,
            'cta_text' => $this->ctaText,
            'cta_link' => $this->ctaLink,
            'is_active' => $this->isActive,
        ];
    }
}