<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\VisiMisi as VisiMisiModel;
use App\Core\Domain\Entities\VisiMisi;
use App\Core\Domain\Repositories\VisiMisiRepositoryInterface;

class EloquentVisiMisiRepository implements VisiMisiRepositoryInterface {
    public function getAll(): array {
        return VisiMisiModel::orderBy('urutan', 'asc')->get()->toArray();
    }

    public function getById(int $id): ?VisiMisi {
        $m = VisiMisiModel::find($id);
        return $m ? new VisiMisi($m->id, $m->tipe, $m->konten, $m->urutan) : null;
    }

    public function create(array $data): VisiMisi {
        $m = VisiMisiModel::create($data);
        return new VisiMisi($m->id, $m->tipe, $m->konten, $m->urutan);
    }

    public function update(int $id, array $data): VisiMisi {
        $m = VisiMisiModel::findOrFail($id);
        $m->update($data);
        return new VisiMisi($m->id, $m->tipe, $m->konten, $m->urutan);
    }

    public function delete(int $id): bool {
        return VisiMisiModel::destroy($id) > 0;
    }
}