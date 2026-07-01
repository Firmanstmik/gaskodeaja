<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class Post implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private int $userId,
        private int $categoryId,
        private string $title,
        private string $slug,
        private string $excerpt,
        private string $content,
        private ?string $metaTitle,
        private ?string $metaDescription,
        private string $status // 'draft' atau 'published'
    ) {}

    // Getters
    public function getId(): ?int { return $this->id; }
    public function getUserId(): int { return $this->userId; }
    public function getCategoryId(): int { return $this->categoryId; }
    public function getTitle(): string { return $this->title; }
    public function getSlug(): string { return $this->slug; }
    public function getExcerpt(): string { return $this->excerpt; }
    public function getContent(): string { return $this->content; }
    public function getMetaTitle(): ?string { return $this->metaTitle; }
    public function getMetaDescription(): ?string { return $this->metaDescription; }
    public function getStatus(): string { return $this->status; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'user_id' => $this->userId,
            'category_id' => $this->categoryId,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'meta_title' => $this->metaTitle,
            'meta_description' => $this->metaDescription,
            'status' => $this->status,
        ];
    }
}