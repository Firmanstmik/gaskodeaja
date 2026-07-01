<?php
namespace App\Core\Application\UseCases;

use App\Core\Domain\Repositories\VisiMisiRepositoryInterface;

class VisiMisiUseCase {
    public function __construct(
        private VisiMisiRepositoryInterface $repository
    ) {}

    public function executeGetAll() { 
        return $this->repository->getAll(); 
    }

    public function executeSave(array $data, ?int $id = null) {
        return $id ? $this->repository->update($id, $data) : $this->repository->create($data);
    }

    public function executeDelete(int $id) { 
        return $this->repository->delete($id); 
    }
}