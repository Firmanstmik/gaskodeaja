<?php
namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\VisiMisi;

interface VisiMisiRepositoryInterface {
    public function getAll(): array;
    public function getById(int $id): ?VisiMisi;
    public function create(array $data): VisiMisi;
    public function update(int $id, array $data): VisiMisi;
    public function delete(int $id): bool;
}