<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Post;

interface PostRepositoryInterface
{
    public function findAllPublished(): array;
    public function findBySlug(string $slug): ?Post;
    public function save(Post $post): Post;
    public function findById(int $id): ?Post;
    public function delete(int $id): bool;
    public function getBySpecificLimit(int $limit): array;
}