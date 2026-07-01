<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Category;

interface CategoryRepositoryInterface
{
    public function save(Category $category): Category;
    public function findAll(): array;
    public function findById(int $id): ?Category;
    public function delete(int $id): bool;
}