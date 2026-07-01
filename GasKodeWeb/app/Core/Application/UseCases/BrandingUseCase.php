<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Repositories\BrandingRepositoryInterface;

class BrandingUseCase
{
    public function __construct(
        private BrandingRepositoryInterface $repository
    ) {}

    public function handleGetAll()
    {
        return $this->repository->getAll();
    }

    public function handleGetById(int $id)
    {
        return $this->repository->getById($id);
    }

    public function handleSave(array $data, ?int $id = null)
    {
        return $id ? $this->repository->update($id, $data) : $this->repository->create($data);
    }

    public function handleDelete(int $id)
    {
        return $this->repository->delete($id);
    }

    public function executeGetBrandingByIndex(int $index)
    {
        return $this->repository->getBySpecificIndex($index);
    }
    public function executeGetClosingBrandingByIndex(int $index)
    {
        return $this->repository->getClosingBySpecificIndex($index);
    }
}
