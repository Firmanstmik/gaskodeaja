<?php
namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\QuestionAnswer;

interface QuestionAnswerRepositoryInterface {
    public function getAll(): array;
    public function getById(int $id): ?QuestionAnswer;
    public function create(array $data): QuestionAnswer;
    public function update(int $id, array $data): QuestionAnswer;
    public function delete(int $id): bool;
}