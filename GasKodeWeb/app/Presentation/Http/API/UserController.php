<?php
namespace App\Presentation\Http\API;

use App\Presentation\Http\Requests\UserStoreRequest;
use App\Core\Application\UseCases\UserUseCase;
use App\Core\Application\DTOs\UserRequestDTO;
use App\Presentation\Http\Controllers\Controller;
use App\Presentation\Http\Requests\UserUpdateRequest;
use Illuminate\Http\JsonResponse;

class UserController extends Controller {
    public function __construct(private UserUseCase $userUseCase) {}

    public function index(): JsonResponse {
        return response()->json([
            'status' => 'success',
            'data' => $this->userUseCase->executeGetAll()
        ]);
    }
    public function store(UserStoreRequest $request): JsonResponse {
        $dto = new UserRequestDTO(
            $request->name,
            $request->email,
            $request->password
        );

        $user = $this->userUseCase->executeCreate($dto);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 201);
    }

    public function show(int $id): JsonResponse {
        $user = $this->userUseCase->executeFindById($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json(['status' => 'success', 'data' => $user]);
    }

    public function update(UserUpdateRequest $request, int $id): JsonResponse {
        $dto = new UserRequestDTO($request->name, $request->email, $request->password);
        
        $updated = $this->userUseCase->executeUpdate($id, $dto);
        
        if (!$updated) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        return response()->json(['status' => 'success', 'message' => 'Profil berhasil diperbarui']);
    }

    public function destroy(int $id): JsonResponse {
        $deleted = $this->userUseCase->executeDelete($id);
        
        if (!$deleted) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['status' => 'success', 'message' => 'User deleted']);
    }
}