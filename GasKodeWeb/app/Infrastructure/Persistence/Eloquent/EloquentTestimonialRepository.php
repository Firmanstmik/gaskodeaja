<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Testimonial as TestimonialEntity;
use App\Core\Domain\Repositories\TestimonialRepositoryInterface;
use App\Models\Testimonial as TestimonialModel;

class EloquentTestimonialRepository implements TestimonialRepositoryInterface
{
    public function save(TestimonialEntity $t): TestimonialEntity
    {
        $model = TestimonialModel::updateOrCreate(
            ['id' => $t->getId()],
            [
                'name' => $t->getName(),
                'position' => $t->getPosition(),
                'content' => $t->getContent(),
                'rating' => $t->getRating()
            ]
        );
        return $this->mapToEntity($model);
    }

    public function findAll(): array
    {
        return TestimonialModel::latest()->get()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findById(int $id): ?TestimonialEntity
    {
        $m = TestimonialModel::find($id);
        return $m ? $this->mapToEntity($m) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) TestimonialModel::destroy($id);
    }

    private function mapToEntity(TestimonialModel $m): TestimonialEntity
    {
        return new TestimonialEntity(
            $m->id, $m->name, $m->position, $m->content, $m->rating
        );
    }

    public function getBySpecificLimit(int $limit): array{
        return TestimonialModel::latest()->limit($limit)->get()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }
}