<?php
namespace App\Core\Domain\Repositories;

use App\Models\FooterSetup;

interface FooterRepositoryInterface
{
    public function getFirst(): ?FooterSetup;
    public function updateOrCreate(array $data): FooterSetup;
}