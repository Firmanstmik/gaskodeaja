<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Lead;

interface LeadRepositoryInterface
{
    public function findAll(): array;
    public function save(Lead $lead): Lead;
    public function findById(int $id): ?Lead;
    public function delete(int $id): bool;
}