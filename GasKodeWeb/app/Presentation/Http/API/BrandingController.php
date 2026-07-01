<?php
namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\BrandingUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandingController extends Controller {
    public function __construct(private BrandingUseCase $useCase) {}

    public function index() {
        return response()->json($this->useCase->handleGetAll());
    }

    public function store(Request $request) {
        $v = $request->validate([
            'kategori' => 'required|in:opening,closing',
            'pernyataan' => 'required|string',
            'jawaban' => 'required|array',
            'cta_text' => 'nullable|string',
            'cta_link' => 'nullable|url',
        ]);
        return response()->json($this->useCase->handleSave($v), 201);
    }

    public function show($id) {
        $data = $this->useCase->handleGetById($id);
        return $data ? response()->json($data) : response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, $id) {
        $v = $request->validate([
            'kategori' => 'in:opening,closing',
            'pernyataan' => 'string',
            'jawaban' => 'array',
            'cta_text' => 'nullable|string',
            'cta_link' => 'nullable|url',
        ]);
        return response()->json($this->useCase->handleSave($v, $id));
    }

    public function destroy($id) {
        $this->useCase->handleDelete($id);
        return response()->json(null, 204);
    }
}