<?php

namespace App\Core\Domain\Entities;
use JsonSerializable;
class Service implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $title, // Tambahkan title agar deskripsi ada pasangannya
        private string $description,
        private string $icon
    ) {}

    public function getId(): ?int { return $this->id; }
    public function getTitle(): string { return $this->title; }
    public function getDescription(): string { return $this->description; }
    public function getIcon(): string { return $this->icon; }

    public function jsonSerialize(): mixed
    {
        return [
            'id'   => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'icon' => $this->icon,
        ];
    }
}