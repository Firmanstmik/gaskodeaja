<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Repositories\FooterRepositoryInterface;
use App\Models\FooterSetup;

class EloquentFooterRepository implements FooterRepositoryInterface
{
    public function getFirst(): ?FooterSetup {
        return FooterSetup::first();
    }

    public function updateOrCreate(array $data): FooterSetup {
        return FooterSetup::updateOrCreate(['id' => 1], $data);
    }
}