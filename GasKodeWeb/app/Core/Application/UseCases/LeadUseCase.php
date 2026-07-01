<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\Lead;
use App\Core\Domain\Repositories\LeadRepositoryInterface;

class LeadUseCase {
    public function __construct(private LeadRepositoryInterface $repository) {}

    public function executeGetAll(): array {
        return $this->repository->findAll();
    }
    public function executeById(int $id): ?Lead {
        return $this->repository->findById($id);
    }
    public function executeCreate(array $data): Lead {
        $lead = new Lead(
            null,
            $data['name'],
            $data['whatsapp_number'],
            $data['requirement'] ?? null,
            'new' // Default status
        );
        return $this->repository->save($lead);
    }

    public function executeUpdateByStatus(int $id, string $status): bool {
        $lead = $this->repository->findById($id);
        if (!$lead) return false;

        $updatedLead = new \App\Core\Domain\Entities\Lead(
            $lead->getId(),
            $lead->getName(),
            $lead->getWhatsappNumber(),
            $lead->getRequirement(),
            $status
        );
        
        $this->repository->save($updatedLead);
        return true;
    }
    public function executeUpdate(int $id, array $data): Lead {
        $lead = new Lead(
            $id,
            $data['name'],
            $data['whatsapp_number'],
            $data['requirement'],
            $data['status']
        );
        return $this->repository->save($lead);
    }
    public function executeDelete(int $id): bool {
        return $this->repository->delete($id);
    }
}