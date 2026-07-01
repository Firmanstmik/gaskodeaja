<?php
namespace App\Core\Domain\Repositories;

use App\Models\ContactMe;
use Illuminate\Support\Collection;

interface ContactMeRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?ContactMe;
    public function create(array $data): ContactMe;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}