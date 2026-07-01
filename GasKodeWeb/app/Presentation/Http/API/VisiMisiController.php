<?php
namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\VisiMisiUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VisiMisiController extends Controller {
    public function __construct(private VisiMisiUseCase $useCase) {}

    public function index() {
        return response()->json($this->useCase->executeGetAll());
    }

    public function store(Request $request) {
        // dd($request->all());
        $v = $request->validate([
            'tipe' => 'in:visi,misi',
            'konten' => 'required|array',
            'urutan' => 'nullable|integer'
        ]);
        return response()->json($this->useCase->executeSave($v), 201);
    }

    public function update(Request $request, $id) {
        $v = $request->validate([
            'tipe' => 'in:visi,misi',
            'konten' => 'array',
            'urutan' => 'integer'
        ]);
        return response()->json($this->useCase->executeSave($v, $id));
    }

    public function destroy($id) {
        $this->useCase->executeDelete($id);
        return response()->json(null, 204);
    }
}