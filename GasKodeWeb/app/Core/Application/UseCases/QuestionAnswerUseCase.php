<?php
namespace App\Core\Application\UseCases;

use App\Core\Domain\Repositories\QuestionAnswerRepositoryInterface;

class QuestionAnswerUseCase {
    public function __construct(
        private QuestionAnswerRepositoryInterface $repository
    ) {}

    public function executeGetAll() {
        return $this->repository->getAll();
    }

    public function executeGetById(int $id) {
        return $this->repository->getById($id);
    }

    public function executeSave(array $data, ?int $id = null) {
        return $id ? $this->repository->update($id, $data) : $this->repository->create($data);
    }

    public function executeDelete(int $id) {
        return $this->repository->delete($id);
    }
}