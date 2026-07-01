<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Repositories\ContactMeRepositoryInterface;
use App\Models\ContactMe;
use Illuminate\Support\Collection;

class EloquentContactMeRepository implements ContactMeRepositoryInterface
{
    public function getAll(): Collection {
        return ContactMe::all();
    }

    public function findById(int $id): ?ContactMe {
        return ContactMe::find($id);
    }

    public function create(array $data): ContactMe {
        return ContactMe::create($data);
    }

    public function update(int $id, array $data): bool {
        $contact = ContactMe::find($id);
        return $contact ? $contact->update($data) : false;
    }

    public function delete(int $id): bool {
        $contact = ContactMe::find($id);
        return $contact ? $contact->delete() : false;
    }
}