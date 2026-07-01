<?php
namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\CaraKerjaUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CaraKerjaController extends Controller {
    public function __construct(private CaraKerjaUseCase $useCase) {}

    public function index() {
        return response()->json($this->useCase->executeGetAll());
    }

    public function store(Request $request) {
        $v = $request->validate(['list' => 'required|string']);
        return response()->json($this->useCase->executeSave($v), 201);
    }

    public function update(Request $request, $id) {
        $v = $request->validate(['list' => 'required|string']);
        return response()->json($this->useCase->executeSave($v, $id));
    }

    public function destroy($id) {
        $this->useCase->executeDelete($id);
        return response()->json(null, 204);
    }
}