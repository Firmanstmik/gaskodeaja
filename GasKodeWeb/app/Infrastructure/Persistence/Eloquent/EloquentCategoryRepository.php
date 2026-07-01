<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Category as CategoryEntity;
use App\Core\Domain\Repositories\CategoryRepositoryInterface;
use App\Models\Category as CategoryModel;

class EloquentCategoryRepository implements CategoryRepositoryInterface
{
    public function save(CategoryEntity $category): CategoryEntity
    {
        $model = CategoryModel::updateOrCreate(
            ['id' => $category->getId()],
            ['name' => $category->getName(), 'slug' => $category->getSlug()]
        );
        return new CategoryEntity($model->id, $model->name, $model->slug);
    }

    public function findAll(): array
    {
        return CategoryModel::all()->map(fn($m) => new CategoryEntity($m->id, $m->name, $m->slug))->toArray();
    }

    public function findById(int $id): ?CategoryEntity
    {
        $model = CategoryModel::find($id);
        return $model ? new CategoryEntity($model->id, $model->name, $model->slug) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) CategoryModel::destroy($id);
    }
}