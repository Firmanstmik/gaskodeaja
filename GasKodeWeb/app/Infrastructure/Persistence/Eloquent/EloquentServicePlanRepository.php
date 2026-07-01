<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\ServicePlan as ServicePlanEntity;
use App\Core\Domain\Repositories\ServicePlanRepositoryInterface;
use App\Models\ServicePlans as ServicePlanModel;

class EloquentServicePlanRepository implements ServicePlanRepositoryInterface
{
    public function save(ServicePlanEntity $p): ServicePlanEntity
    {
        $model = ServicePlanModel::updateOrCreate(
            ['id' => $p->getId()],
            [
                'service_id' => $p->getServiceId(),
                'name' => $p->getName(),
                'price' => $p->getPrice(),
                'features' => $p->getFeatures(),
                'maintenance_cost' => $p->getMaintenanceCost(),
                'is_featured' => $p->isFeatured(),
            ]
        );
        return $this->mapToEntity($model);
    }

    public function findAll(): array
    {
        return ServicePlanModel::all()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findByServiceId(int $serviceId): array
    {
        return ServicePlanModel::where('service_id', $serviceId)
            ->get()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findById(int $id): ?ServicePlanEntity
    {
        $m = ServicePlanModel::find($id);
        return $m ? $this->mapToEntity($m) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) ServicePlanModel::destroy($id);
    }

    private function mapToEntity(ServicePlanModel $m): ServicePlanEntity
    {
        return new ServicePlanEntity(
            $m->id, $m->service_id, $m->name, $m->price, 
            $m->features, $m->maintenance_cost, $m->is_featured
        );
    }
}