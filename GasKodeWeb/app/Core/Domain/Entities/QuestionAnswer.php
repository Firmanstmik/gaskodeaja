<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class QuestionAnswer implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $question,
        private string $answer,
        private ?string $createdAt = null,
        private ?string $updatedAt = null
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getQuestion(): string { return $this->question; }
    public function getAnswer(): string { return $this->answer; }
    public function getCreatedAt(): ?string { return $this->createdAt; }
    public function getUpdatedAt(): ?string { return $this->updatedAt; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'question' => $this->question,
            'answer' => $this->answer,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }
}