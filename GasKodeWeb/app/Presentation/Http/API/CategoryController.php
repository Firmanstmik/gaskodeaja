<?php

namespace App\Presentation\Http\API;

use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Core\Application\UseCases\CategoryUseCase;

class CategoryController extends Controller
{
    public function index(CategoryUseCase $useCase)
    {
        return response()->json($useCase->executeGetAll());
    }

    public function store(Request $request, CategoryUseCase $useCase)
    {
        // dd($request->all());
        $request->validate(['name' => 'required|string']);
        $result = $useCase->executeCreate($request->name);
        return response()->json($result, 201);
    }
    public function show(int $id, CategoryUseCase $useCase) {
        $category = $useCase->executeById($id);
        return $category ? response()->json($category) : response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, int $id, CategoryUseCase $useCase)
    {
        $request->validate(['name' => 'required|string']);
        $result = $useCase->executeUpdate($id, $request->name);
        return response()->json($result);
    }

    public function destroy(int $id, CategoryUseCase $useCase)
    {
        $useCase->executeDelete($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}