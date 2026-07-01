<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Hero;

interface HeroRepositoryInterface
{
    public function getActiveHero(): ?Hero;
    public function findAll(): array;
    public function findById(int $id): ?Hero;
    public function save(Hero $hero): Hero;
    public function delete(int $id): bool;
}