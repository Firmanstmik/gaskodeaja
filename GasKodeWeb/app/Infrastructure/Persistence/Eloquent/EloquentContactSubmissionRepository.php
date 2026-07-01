<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Repositories\ContactSubmissionRepositoryInterface;
use App\Models\ContactSubmission;
use Illuminate\Support\Collection;

class EloquentContactSubmissionRepository implements ContactSubmissionRepositoryInterface
{
    public function getAll(): Collection {
        return ContactSubmission::orderBy('created_at', 'desc')->get();
    }

    public function create(array $data): ContactSubmission {
        return ContactSubmission::create($data);
    }

    public function updateStatus(int $id, string $status): bool {
        $submission = ContactSubmission::find($id);
        if (!$submission) return false;
        return $submission->update(['status' => $status]);
    }

    public function findById(int $id): ?ContactSubmission {
        return ContactSubmission::find($id);
    }

    public function delete(int $id): bool {
        return ContactSubmission::destroy($id) > 0;
    }
}