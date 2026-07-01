<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Service as ServiceEntity;
use App\Core\Domain\Repositories\ServiceRepositoryInterface;
use App\Models\Services as ServiceModel;

class EloquentServiceRepository implements ServiceRepositoryInterface
{
    public function findAll(): array
    {
        return ServiceModel::all()->map(fn($m) => 
            new ServiceEntity($m->id, $m->title, $m->description, $m->icon)
        )->toArray();
    }

    public function save(ServiceEntity $service): ServiceEntity
    {
        $model = ServiceModel::updateOrCreate(
            ['id' => $service->getId()],
            [
                'title' => $service->getTitle(),
                'description' => $service->getDescription(),
                'icon' => $service->getIcon()
            ]
        );
        return new ServiceEntity($model->id, $model->title, $model->description, $model->icon);
    }

    public function findById(int $id): ?ServiceEntity
    {
        $m = ServiceModel::find($id);
        return $m ? new ServiceEntity($m->id, $m->title, $m->description, $m->icon) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) ServiceModel::destroy($id);
    }

    public function getBySpecificLimit(int $limit): array{
        return ServiceModel::limit($limit)->get()->map(fn($m) => 
            new ServiceEntity($m->id, $m->title, $m->description, $m->icon)
        )->toArray();
    }
}