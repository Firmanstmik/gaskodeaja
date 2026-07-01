<?php

namespace App\Presentation\Http\API;

use Illuminate\Http\Request;
use App\Presentation\Http\Controllers\Controller;
use App\Core\Application\UseCases\ServiceUseCase;

class ServiceController extends Controller {
    public function index(ServiceUseCase $useCase) {
        return response()->json($useCase->executeGetAll());
    }

    public function store(Request $request, ServiceUseCase $useCase) {
        $request->validate(['title' => 'required', 'description' => 'required', 'icon' => 'required']);
        return response()->json($useCase->executeCreate($request->all()), 201);
    }

    public function show(int $id, ServiceUseCase $useCase) {
        $service = $useCase->executeById($id);
        return $service ? response()->json($service) : response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, int $id, ServiceUseCase $useCase) {
        $request->validate(['title' => 'required', 'description' => 'required', 'icon' => 'required']);
        return response()->json($useCase->executeUpdate($id, $request->all()));
    }

    public function destroy(int $id, ServiceUseCase $useCase) {
        $useCase->executeDelete($id);
        return response()->json(['message' => 'Service deleted successfully']);
    }
}