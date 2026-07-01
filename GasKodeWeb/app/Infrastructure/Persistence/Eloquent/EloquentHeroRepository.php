<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Hero as HeroEntity;
use App\Core\Domain\Repositories\HeroRepositoryInterface;
use App\Models\Hero as HeroModel;

class EloquentHeroRepository implements HeroRepositoryInterface
{
    public function getActiveHero(): ?HeroEntity
    {
        $model = HeroModel::where('is_active', true)->first();
        return $model ? $this->mapToEntity($model) : null;
    }

    public function findAll(): array
    {
        return HeroModel::latest()->get()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findById(int $id): ?HeroEntity
    {
        $model = HeroModel::find($id);
        return $model ? $this->mapToEntity($model) : null;
    }

    public function save(HeroEntity $h): HeroEntity
    {
        $model = HeroModel::updateOrCreate(
            ['id' => $h->getId()],
            [
                'title'      => $h->getTitle(),
                'subtitle'   => $h->getSubtitle(),
                'image_path' => $h->getImagePath(),
                'cta_text'   => $h->getCtaText(),
                'cta_link'   => $h->getCtaLink(),
                'is_active'  => $h->isActive(),
            ]
        );
        return $this->mapToEntity($model);
    }

    public function delete(int $id): bool
    {
        return (bool) HeroModel::destroy($id);
    }

    private function mapToEntity(HeroModel $m): HeroEntity
    {
        return new HeroEntity(
            $m->id,
            $m->title,
            $m->subtitle,
            $m->image_path,
            $m->cta_text,
            $m->cta_link,
            $m->is_active
        );
    }
    public function getBySpecificIndex(int $index): ?HeroEntity
    {
        $m = HeroModel::where('is_active', true)->get()[$index] ?? null;

        if (!$m) return null;

        return new HeroEntity(
            $m->id,
            $m->title,
            $m->subtitle,
            $m->image_path,
            $m->cta_text,
            $m->cta_link,
            (bool)$m->is_active
        );
    }
}
