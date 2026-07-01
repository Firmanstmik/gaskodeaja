<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Core\Domain\Entities\Users;
use App\Core\Domain\Repositories\UserRepositoryInterface;
use App\Models\User; // Model Eloquent standar

class EloquentUserRepository implements UserRepositoryInterface {
    public function getAll(): array {
        return User::all()->toArray();
    }

    public function findById(int $id): ?Users {
        $model = User::find($id);
        return $model ? new Users($model->id, $model->name, $model->email) : null;
    }

    public function save(Users $user): Users {
        $model = User::create([
            'name' => $user->name,
            'email' => $user->email,
            'password' => $user->password,
        ]);
        $user->id = $model->id;
        return $user;
    }

    public function update(int $id, array $data): bool {
        return User::where('id', $id)->update($data);
    }

    public function delete(int $id): bool {
        return User::destroy($id) > 0;
    }
}