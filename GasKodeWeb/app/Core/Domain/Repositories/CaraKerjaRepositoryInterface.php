<?php
namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\CaraKerja;

interface CaraKerjaRepositoryInterface {
    public function getAll(): array;
    public function getById(int $id): ?CaraKerja;
    public function create(array $data): CaraKerja;
    public function update(int $id, array $data): CaraKerja;
    public function delete(int $id): bool;
}