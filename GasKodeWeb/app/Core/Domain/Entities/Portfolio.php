<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class Portfolio implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private int $categoryId,
        private string $title,
        private string $clientName,
        private string $imageThumbnail,
        private array $problems,
        private array $solutions,
        private array $results
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getCategoryId(): int { return $this->categoryId; }
    public function getTitle(): string { return $this->title; }
    public function getClientName(): string { return $this->clientName; }
    public function getImageThumbnail(): string { return $this->imageThumbnail; }
    public function getProblems(): array { return $this->problems; }
    public function getSolutions(): array { return $this->solutions; }
    public function getResults(): array { return $this->results; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'category_id' => $this->categoryId,
            'title' => $this->title,
            'client_name' => $this->clientName,
            'image_thumbnail' => $this->imageThumbnail,
            'problems' => $this->problems,
            'solutions' => $this->solutions,
            'results' => $this->results,
        ];
    }
}