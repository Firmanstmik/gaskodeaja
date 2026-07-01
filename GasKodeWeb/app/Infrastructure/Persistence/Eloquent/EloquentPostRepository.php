<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Post as PostEntity;
use App\Core\Domain\Repositories\PostRepositoryInterface;
use App\Models\Post as PostModel;

class EloquentPostRepository implements PostRepositoryInterface
{
    public function save(PostEntity $p): PostEntity
    {
        $model = PostModel::updateOrCreate(
            ['id' => $p->getId()],
            [
                'user_id' => $p->getUserId(),
                'category_id' => $p->getCategoryId(),
                'title' => $p->getTitle(),
                'slug' => $p->getSlug(),
                'excerpt' => $p->getExcerpt(),
                'content' => $p->getContent(),
                'meta_title' => $p->getMetaTitle(),
                'meta_description' => $p->getMetaDescription(),
                'status' => $p->getStatus(),
            ]
        );
        return $this->mapToEntity($model);
    }

    public function findAllPublished(): array
    {
        return PostModel::orderBy('id', 'desc')
            ->latest()
            ->get()
            ->map(fn($m) => $this->mapToEntity($m))
            ->toArray();
    }

    public function findBySlug(string $slug): ?PostEntity
    {
        $m = PostModel::where('slug', $slug)->first();
        return $m ? $this->mapToEntity($m) : null;
    }

    public function findById(int $id): ?PostEntity
    {
        $m = PostModel::find($id);
        return $m ? $this->mapToEntity($m) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) PostModel::destroy($id);
    }

    private function mapToEntity(PostModel $m): PostEntity
    {
        return new PostEntity(
            $m->id, $m->user_id, $m->category_id, $m->title, $m->slug,
            $m->excerpt, $m->content, $m->meta_title, $m->meta_description, $m->status
        );
    }

    public function getBySpecificLimit(int $limit): array{
        return PostModel::orderBy('id', 'desc')
            ->where('status', 'published')
            ->latest()
            ->limit($limit)
            ->get()
            ->map(fn($m) => $this->mapToEntity($m))
            ->toArray();
    }
}