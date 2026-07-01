<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Lead as LeadEntity;
use App\Core\Domain\Repositories\LeadRepositoryInterface;
use App\Models\Lead as LeadModel;

class EloquentLeadRepository implements LeadRepositoryInterface
{
    public function save(LeadEntity $l): LeadEntity
    {
        $model = LeadModel::updateOrCreate(
            ['id' => $l->getId()],
            [
                'name' => $l->getName(),
                'whatsapp_number' => $l->getWhatsappNumber(),
                'requirement' => $l->getRequirement(),
                'status' => $l->getStatus(),
            ]
        );
        return $this->mapToEntity($model);
    }

    public function findAll(): array
    {
        return LeadModel::latest()->get()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findById(int $id): ?LeadEntity
    {
        $m = LeadModel::find($id);
        return $m ? $this->mapToEntity($m) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) LeadModel::destroy($id);
    }

    private function mapToEntity(LeadModel $m): LeadEntity
    {
        return new LeadEntity($m->id, $m->name, $m->whatsapp_number, $m->requirement, $m->status);
    }
}