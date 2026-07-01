<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\CaraKerja as CaraKerjaModel;
use App\Core\Domain\Entities\CaraKerja;
use App\Core\Domain\Repositories\CaraKerjaRepositoryInterface;

class EloquentCaraKerjaRepository implements CaraKerjaRepositoryInterface {
    public function getAll(): array {
        return CaraKerjaModel::all()->toArray();
    }

    public function getById(int $id): ?CaraKerja {
        $m = CaraKerjaModel::find($id);
        return $m ? new CaraKerja($m->id, $m->list) : null;
    }

    public function create(array $data): CaraKerja {
        $m = CaraKerjaModel::create($data);
        return new CaraKerja($m->id, $m->list);
    }

    public function update(int $id, array $data): CaraKerja {
        $m = CaraKerjaModel::findOrFail($id);
        $m->update($data);
        return new CaraKerja($m->id, $m->list);
    }

    public function delete(int $id): bool {
        return CaraKerjaModel::destroy($id) > 0;
    }
}