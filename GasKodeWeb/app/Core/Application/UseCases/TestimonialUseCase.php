<?php

namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\Testimonial;
use App\Core\Domain\Repositories\TestimonialRepositoryInterface;

class TestimonialUseCase
{
    public function __construct(
        private TestimonialRepositoryInterface $repository
    ) {}

    public function executeGetAll(): array
    {
        return $this->repository->findAll();
    }

    public function executeById(int $id): ?Testimonial
    {
        return $this->repository->findById($id);
    }

    public function executeCreate(array $data): Testimonial
    {
        $testimonial = new Testimonial(
            null,
            $data['name'],
            $data['position'],
            $data['content'],
            $data['rating'] ?? 5
        );
        return $this->repository->save($testimonial);
    }

    public function executeUpdate(int $id, array $data): Testimonial
    {
        $testimonial = new Testimonial(
            $id,
            $data['name'],
            $data['position'],
            $data['content'],
            $data['rating']
        );
        return $this->repository->save($testimonial);
    }

    public function executeDelete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function executeGetTestimonialByLimit(int $limit)
    {
        return $this->repository->getBySpecificLimit($limit);
    }
}
