<?php
namespace App\Core\Domain\Repositories;

use App\Models\ContactSubmission;
use Illuminate\Support\Collection;

interface ContactSubmissionRepositoryInterface
{
    public function getAll(): Collection;
    public function create(array $data): ContactSubmission;
    public function updateStatus(int $id, string $status): bool;
    public function findById(int $id): ?ContactSubmission;
    public function delete(int $id): bool;
}