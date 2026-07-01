<?php
namespace App\Core\Application\UseCases;

use App\Core\Domain\Repositories\ContactSubmissionRepositoryInterface;
use Illuminate\Support\Collection;
use App\Models\ContactSubmission;

class ContactSubmissionUseCase
{
    protected $repository;

    public function __construct(ContactSubmissionRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllSubmissions(): Collection
    {
        return $this->repository->getAll();
    }

    public function getSubmissionById(int $id): ?ContactSubmission
    {
        return $this->repository->findById($id);
    }

    public function storeSubmission(array $data): ContactSubmission
    {
        // Logika Bisnis: Format nomor WA ke standar internasional 62
        if (isset($data['whatsapp_number']) && str_starts_with($data['whatsapp_number'], '0')) {
            $data['whatsapp_number'] = '62' . substr($data['whatsapp_number'], 1);
        }
        
        return $this->repository->create($data);
    }

    public function updateStatus(int $id, string $status): bool
    {
        // Logika Bisnis: Validasi status sebelum update
        $allowedStatus = ['pending', 'processed', 'archived'];
        if (!in_array($status, $allowedStatus)) {
            throw new \InvalidArgumentException("Status tidak valid.");
        }

        return $this->repository->updateStatus($id, $status);
    }

    public function deleteSubmission(int $id): bool
    {
        return $this->repository->delete($id);
    }
}