<?php
namespace App\Core\Application\UseCases;

use App\Core\Domain\Repositories\ContactMeRepositoryInterface;
use Illuminate\Support\Collection;
use App\Models\ContactMe;

class ContactMeUseCase
{
    protected $repository;

    public function __construct(ContactMeRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllContacts(): Collection
    {
        return $this->repository->getAll();
    }

    public function getContactById(int $id): ?ContactMe
    {
        return $this->repository->findById($id);
    }

    public function createContact(array $data): ContactMe
    {
        // Contoh Logika Bisnis: Pastikan label selalu Uppercase
        $data['label'] = strtoupper($data['label']);
        return $this->repository->create($data);
    }

    public function updateContact(int $id, array $data): bool
    {
        if (isset($data['label'])) {
            $data['label'] = strtoupper($data['label']);
        }
        return $this->repository->update($id, $data);
    }

    public function deleteContact(int $id): bool
    {
        return $this->repository->delete($id);
    }
}