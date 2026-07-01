<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Repositories\FooterRepositoryInterface;
use App\Models\FooterSetup;

class FooterUseCase
{
    protected $repository;

    public function __construct(FooterRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getFooterData(): ?FooterSetup
    {
        return $this->repository->getFirst();
    }

    public function saveFooterData(array $data): FooterSetup
    {
        // Logika Bisnis: Pastikan copyright selalu mengandung tahun saat ini
        $year = date('Y');
        if (isset($data['copyright_text']) && !str_contains($data['copyright_text'], $year)) {
            $data['copyright_text'] .= " " . $year;
        }

        return $this->repository->updateOrCreate($data);
    }
    
    public function updateFooterData(int $id, array $data)
    {
        $footer = FooterSetup::findOrFail($id);
        $footer->update($data);
        return $footer;
    }
}
