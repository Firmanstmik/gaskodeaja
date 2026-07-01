<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class Testimonial implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $name,
        private string $position,
        private string $content,
        private int $rating,
    ) {}

    public function getId(): ?int { return $this->id; }
    public function getName(): string { return $this->name; }
    public function getPosition(): string { return $this->position; }
    public function getContent(): string { return $this->content; }
    public function getRating(): int { return $this->rating; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'position' => $this->position,
            'content' => $this->content,
            'rating' => $this->rating
        ];
    }
}