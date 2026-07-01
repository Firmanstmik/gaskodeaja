<?php

namespace App\Core\Domain\Entities;

use JsonSerializable; // 1. Wajib import ini

class Category implements JsonSerializable // 2. Implementasikan interface ini
{
    public function __construct(
        private ?int $id,
        private string $name,
        private string $slug
    ) {}

    // Getter tetap dipertahankan untuk logika di UseCase/Repository
    public function getId(): ?int { return $this->id; }
    public function getName(): string { return $this->name; }
    public function getSlug(): string { return $this->slug; }

    /**
     * 3. Fungsi ini yang membuat data muncul di JSON API
     */
    public function jsonSerialize(): mixed
    {
        return [
            'id'   => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
        ];
    }
}