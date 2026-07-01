<?php
namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Users;

interface UserRepositoryInterface {
    public function getAll(): array;
    public function findById(int $id): ?Users;
    public function save(Users $user): Users;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}