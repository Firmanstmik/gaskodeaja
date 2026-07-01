<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\Service;
use App\Core\Domain\Repositories\ServiceRepositoryInterface;

class ServiceUseCase
{
    public function __construct(
        private ServiceRepositoryInterface $repository
    ) {}

    public function executeGetServiceByLimit(int $limit)
    {
        return $this->repository->getBySpecificLimit($limit);
    }
    public function executeGetAll(): array {
        return $this->repository->findAll();
    }
    public function executeById(int $id): ?Service {
        return $this->repository->findById($id);
    }
    public function executeCreate(array $data): Service
    {
        $service = new Service(null, $data['title'], $data['description'], $data['icon']);
        return $this->repository->save($service);
    }
    public function executeUpdate(int $id, array $data): Service {
        $service = new Service($id, $data['title'], $data['description'], $data['icon']);
        return $this->repository->save($service);
    }
    public function executeDelete(int $id): bool {
        return $this->repository->delete($id);
    }
}
