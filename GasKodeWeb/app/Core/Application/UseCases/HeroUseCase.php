<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\Hero;
use App\Infrastructure\Persistence\Eloquent\EloquentHeroRepository;

class HeroUseCase
{
    public function __construct(
        private EloquentHeroRepository $repository
    ) {}
    public function executeGetHeroByIndex(int $index)
    {
        return $this->repository->getBySpecificIndex($index);
    }

    public function executeGetAll(): array
    {
        return $this->repository->findAll();
    }

    public function executeByActive(): ?Hero {
        return $this->repository->getActiveHero();
    }

    public function executeCreateOrUpdate(array $data, ?int $id = null): Hero {
        // Jika is_active true, matikan hero lain agar hanya satu yang aktif
        if (isset($data['is_active']) && $data['is_active'] == true) {
            \App\Models\Hero::where('id', '!=', $id)->update(['is_active' => false]);
        }

        $hero = new Hero(
            $id,
            $data['title'],
            $data['subtitle'],
            $data['image_path'],
            $data['cta_text'],
            $data['cta_link'],
            $data['is_active'] ?? true
        );
        return $this->repository->save($hero);
    }

    public function executeDelete(int $id): bool
    {
        $hero = $this->repository->findById($id);
        if (!$hero) {
            return false;
        }
        return $this->repository->delete($id);
    }

}
