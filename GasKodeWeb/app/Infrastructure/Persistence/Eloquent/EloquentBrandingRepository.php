<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\Branding as BrandingModel;
use App\Core\Domain\Entities\Branding;
use App\Core\Domain\Repositories\BrandingRepositoryInterface;

class EloquentBrandingRepository implements BrandingRepositoryInterface {
    public function getAll(): array {
        return BrandingModel::all()->toArray();
    }

    public function getById(int $id): ?Branding {
        $m = BrandingModel::find($id);
        return $m ? new Branding($m->id, $m->kategori, $m->pernyataan, $m->jawaban, $m->cta_text, $m->cta_link) : null;
    }

    public function create(array $data): Branding {
        $m = BrandingModel::create($data);
        return new Branding($m->id, $m->kategori, $m->pernyataan, $m->jawaban, $m->cta_text, $m->cta_link);
    }

    public function update(int $id, array $data): Branding {
        $m = BrandingModel::findOrFail($id);
        $m->update($data);
        return new Branding($m->id, $m->kategori, $m->pernyataan, $m->jawaban, $m->cta_text, $m->cta_link);
    }

    public function delete(int $id): bool {
        return BrandingModel::destroy($id) > 0;
    }
    public function getBySpecificIndex(int $index): ?Branding
    {
        $m = BrandingModel::where('kategori', 'opening')->get()[$index] ?? null;

        if (!$m) return null;

        return new Branding(
            $m->id,
            $m->kategori,
            $m->pernyataan,
            $m->jawaban,
            $m->cta_text,
            $m->cta_link
        );
    }
    public function getClosingBySpecificIndex(int $index): ?Branding
    {
        $m = BrandingModel::where('kategori', 'closing')->get()[$index] ?? null;

        if (!$m) return null;

        return new Branding(
            $m->id,
            $m->kategori,
            $m->pernyataan,
            $m->jawaban,
            $m->cta_text,
            $m->cta_link
        );
    }
}