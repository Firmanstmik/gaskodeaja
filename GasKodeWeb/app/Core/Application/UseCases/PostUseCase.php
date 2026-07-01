<?php

namespace App\Core\Application\UseCases;

use Illuminate\Support\Str;
use App\Core\Domain\Entities\Post;
use App\Core\Domain\Repositories\PostRepositoryInterface;

class PostUseCase {
    public function __construct(private PostRepositoryInterface $repository) {}

    public function executeByPublish(): array {
        return $this->repository->findAllPublished();
    }

    public function executeBySlug(string $slug): ?Post {
        return $this->repository->findBySlug($slug);
    }

    public function executeCreate(array $data, int $currentUserId): Post {
        $post = new Post(
            null,
            $currentUserId, // Penulis otomatis dari auth
            $data['category_id'],
            $data['title'],
            $data['slug'] ?? Str::slug($data['title']),
            $data['excerpt'],
            $data['content'],
            $data['meta_title'] ?? $data['title'],
            $data['meta_description'] ?? $data['excerpt'],
            $data['status'] ?? 'draft'
        );
        return $this->repository->save($post);
    }

    public function executeUpdate(int $id, array $data): Post {
        $post = new Post(
            $id,
            $data['user_id'], // Tetap gunakan user_id pemilik asli
            $data['category_id'],
            $data['title'],
            $data['slug'] ?? Str::slug($data['title']),
            $data['excerpt'],
            $data['content'],
            $data['meta_title'],
            $data['meta_description'],
            $data['status']
        );
        return $this->repository->save($post);
    }

    public function executeDelete(int $id): bool {
        return $this->repository->delete($id);
    }

    public function executeGetPostByLimit(int $limit)
    {
        return $this->repository->getBySpecificLimit($limit);
    }
}