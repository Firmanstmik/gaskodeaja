<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Service;

interface ServiceRepositoryInterface
{
    public function findAll(): array;
    public function save(Service $service): Service;
    public function findById(int $id): ?Service;
    public function delete(int $id): bool;
    public function getBySpecificLimit(int $limit): array;
}