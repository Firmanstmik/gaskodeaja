<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\ServicePlan;

interface ServicePlanRepositoryInterface
{
    public function findAll(): array;
    public function findByServiceId(int $serviceId): array;
    public function save(ServicePlan $plan): ServicePlan;
    public function findById(int $id): ?ServicePlan;
    public function delete(int $id): bool;
}