<?php

namespace App\Presentation\Http\API;

use Illuminate\Http\Request;
use App\Core\Application\UseCases\TestimonialUseCase;
use App\Presentation\Http\Controllers\Controller;

class TestimonialController extends Controller
{
    // Menampilkan semua testimoni (Untuk Landing Page)
    public function index(TestimonialUseCase $useCase)
    {
        return response()->json($useCase->executeGetAll());
    }

    // Mengambil satu detail testimoni (Admin)
    public function show(int $id, TestimonialUseCase $useCase)
    {
        $result = $useCase->executeById($id);
        return $result ? response()->json($result) : response()->json(['message' => 'Testimonial not found'], 404);
    }

    // Menambah testimoni baru
    public function store(Request $request, TestimonialUseCase $useCase)
    {
        $data = $this->validateRequest($request);
        return response()->json($useCase->executeCreate($data), 201);
    }

    // Memperbarui testimoni
    public function update(Request $request, int $id, TestimonialUseCase $useCase)
    {
        $data = $this->validateRequest($request);
        return response()->json($useCase->executeUpdate($id, $data));
    }

    // Menghapus testimoni
    public function destroy(int $id, TestimonialUseCase $useCase)
    {
        $useCase->executeDelete($id);
        return response()->json(['message' => 'Testimonial deleted successfully']);
    }

    // Fungsi pembantu untuk validasi
    private function validateRequest(Request $request)
    {
        return $request->validate([
            'name'         => 'required|string|max:255',
            'position'     => 'required|string|max:255',
            'content'      => 'required|string',
            'rating'       => 'required|integer|min:1|max:5',
        ]);
    }
}