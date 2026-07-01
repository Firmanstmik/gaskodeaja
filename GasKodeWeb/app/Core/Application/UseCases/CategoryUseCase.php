<?php

namespace App\Core\Application\UseCases;
use App\Core\Domain\Repositories\CategoryRepositoryInterface;
use App\Core\Domain\Entities\Category;
use Illuminate\Support\Str;

class CategoryUseCase
{
    public function __construct(
        private CategoryRepositoryInterface $repository
    ) {}
    
    public function executeGetAll(): array
    {
        return $this->repository->findAll();
    }

    public function executeById(int $id): ?Category 
    {
        return $this->repository->findById($id);
    }

    public function executeCreate(string $name): Category
    {
        $category = new Category(
            id: null,
            name: $name,
            slug: Str::slug($name)
        );

        return $this->repository->save($category);
    }

    public function executeUpdate(int $id, string $name): Category
    {
        $category = new Category($id, $name, \Illuminate\Support\Str::slug($name));
        return $this->repository->save($category);
    }

    public function executeDelete(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
