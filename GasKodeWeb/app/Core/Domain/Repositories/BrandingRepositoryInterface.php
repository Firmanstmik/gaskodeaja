<?php
namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Branding;

interface BrandingRepositoryInterface {
    public function getAll(): array;
    public function getById(int $id): ?Branding;
    public function create(array $data): Branding;
    public function update(int $id, array $data): Branding;
    public function delete(int $id): bool;
    public function getBySpecificIndex(int $index): ?Branding;
    public function getClosingBySpecificIndex(int $index): ?Branding;
}