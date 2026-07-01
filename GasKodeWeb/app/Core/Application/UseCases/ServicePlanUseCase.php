<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\ServicePlan;
use App\Core\Domain\Repositories\ServicePlanRepositoryInterface;

class ServicePlanUseCase {
    public function __construct(private ServicePlanRepositoryInterface $repository) {}

    public function executeGetAll(): array {
        return $this->repository->findAll();
    }
    public function executeById(int $id): ?ServicePlan {
        return $this->repository->findById($id);
    }
    public function executeByServiceId(int $serviceId): array
    {
        return $this->repository->findByServiceId($serviceId);
    }
    public function executeCreate(array $data): ServicePlan
    {
        $plan = new ServicePlan(
            null,
            $data['service_id'],
            $data['name'],
            (float) $data['price'],
            $data['features'], // Pastikan inputnya berupa array
            (float) $data['maintenance_cost'],
            $data['is_featured'] ?? false
        );
        return $this->repository->save($plan);
    }
    public function executeUpdate(int $id, array $data): ServicePlan {
        $plan = new ServicePlan(
            $id,
            $data['service_id'],
            $data['name'],
            (float) $data['price'],
            $data['features'],
            (float) $data['maintenance_cost'],
            $data['is_featured'] ?? false
        );
        return $this->repository->save($plan);
    }
    public function executeDelete(int $id): bool {
        return $this->repository->delete($id);
    }
}