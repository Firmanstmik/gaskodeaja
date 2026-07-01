<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\Portfolio;
use App\Infrastructure\Persistence\Eloquent\EloquentPortfolioRepository;

class PortfolioUseCase
{
    public function __construct(
        private EloquentPortfolioRepository $repository
    ) {}
    public function executeGetPortfolioByLimit(int $limit)
    {
        return $this->repository->getBySpecificLimit($limit);
    }
    public function executeGetAll(): array {
        return $this->repository->findAll();
    }
    public function executeById(int $id): ?Portfolio {
        return $this->repository->findById($id);
    }
    public function executeByCategoryId(int $categoryId): array {
        return $this->repository->findByCategoryId($categoryId);
    }
    public function executeCreate(array $data): Portfolio {
        $portfolio = new Portfolio(
            null,
            $data['category_id'],
            $data['title'],
            $data['client_name'],
            $data['image_thumbnail'],
            $data['problems'],
            $data['solutions'],
            $data['results']
        );
        return $this->repository->save($portfolio);
    }
    public function executeUpdate(int $id, array $data): Portfolio {
        $portfolio = new Portfolio(
            $id,
            $data['category_id'],
            $data['title'],
            $data['client_name'],
            $data['image_thumbnail'],
            $data['problems'],
            $data['solutions'],
            $data['results']
        );
        return $this->repository->save($portfolio);
    }
    public function executeDelete(int $id): bool {
        return $this->repository->delete($id);
    }
}
