<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Portfolio;

interface PortfolioRepositoryInterface
{
    public function findAll(): array;
    public function findByCategoryId(int $categoryId): array;
    public function save(Portfolio $portfolio): Portfolio;
    public function findById(int $id): ?Portfolio;
    public function delete(int $id): bool;
    public function getBySpecificLimit(int $limit): array;
}