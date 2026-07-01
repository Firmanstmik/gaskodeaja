<?php
namespace App\Core\Application\UseCases;

use App\Core\Domain\Entities\Users;
use App\Core\Domain\Repositories\UserRepositoryInterface;
use App\Core\Application\DTOs\UserRequestDTO;
use Illuminate\Support\Facades\Hash;

class UserUseCase {
    public function __construct(private UserRepositoryInterface $repository) {}

    public function executeCreate(UserRequestDTO $dto): Users {
        $user = new Users(
            null,
            $dto->name,
            $dto->email,
            Hash::make($dto->password)
        );
        return $this->repository->save($user);
    }

    public function executeGetAll(): array {
        return $this->repository->getAll();
    }

    public function executeFindById(int $id): ?Users {
        return $this->repository->findById($id);
    }

    public function executeUpdate(int $id, UserRequestDTO $dto): bool {
        // Cek apakah user ada
        $user = $this->repository->findById($id);
        if (!$user) return false;

        $data = [
            'name' => $dto->name,
            'email' => $dto->email,
        ];

        // Update password hanya jika diisi
        if ($dto->password) {
            $data['password'] = bcrypt($dto->password);
        }

        return $this->repository->update($id, $data);
    }

    public function executeDelete(int $id): bool {
        return $this->repository->delete($id);
    }
}