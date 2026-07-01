<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Portfolio as PortfolioEntity;
use App\Core\Domain\Repositories\PortfolioRepositoryInterface;
use App\Models\Portfolio as PortfolioModel;

class EloquentPortfolioRepository implements PortfolioRepositoryInterface
{
    public function save(PortfolioEntity $p): PortfolioEntity
    {
        $model = PortfolioModel::updateOrCreate(
            ['id' => $p->getId()],
            [
                'category_id' => $p->getCategoryId(),
                'title' => $p->getTitle(),
                'client_name' => $p->getClientName(),
                'image_thumbnail' => $p->getImageThumbnail(),
                'problems' => $p->getProblems(),
                'solutions' => $p->getSolutions(),
                'results' => $p->getResults(),
            ]
        );
        return $this->mapToEntity($model);
    }

    public function findAll(): array
    {
        return PortfolioModel::all()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findByCategoryId(int $categoryId): array
    {
        return PortfolioModel::where('category_id', $categoryId)
            ->get()->map(fn($m) => $this->mapToEntity($m))->toArray();
    }

    public function findById(int $id): ?PortfolioEntity
    {
        $m = PortfolioModel::find($id);
        return $m ? $this->mapToEntity($m) : null;
    }

    public function delete(int $id): bool
    {
        return (bool) PortfolioModel::destroy($id);
    }

    private function mapToEntity(PortfolioModel $m): PortfolioEntity
    {
        return new PortfolioEntity(
            $m->id,
            $m->category_id,
            $m->title,
            $m->client_name,
            $m->image_thumbnail,
            $m->problems,
            $m->solutions,
            $m->results
        );
    }


    public function getBySpecificLimit(int $limit): array
    {
        $portfolios = PortfolioModel::latest()->limit($limit)->get();
        return $portfolios->map(function ($m) {
        return new PortfolioEntity(
            $m->id,
            $m->category_id,
            $m->title,
            $m->client_name,
            $m->image_thumbnail,
            $m->problems ?? [],
            $m->solutions ?? [],
            $m->results ?? []
        );
    })->all();
    }
}
