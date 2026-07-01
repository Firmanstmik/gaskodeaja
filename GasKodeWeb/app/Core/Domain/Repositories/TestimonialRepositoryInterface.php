<?php

namespace App\Core\Domain\Repositories;

use App\Core\Domain\Entities\Testimonial;

interface TestimonialRepositoryInterface
{
    public function findAll(): array;
    public function save(Testimonial $testimonial): Testimonial;
    public function findById(int $id): ?Testimonial;
    public function delete(int $id): bool;
    public function getBySpecificLimit(int $limit): array;
}