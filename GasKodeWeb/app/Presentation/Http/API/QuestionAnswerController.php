<?php
namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\QuestionAnswerUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QuestionAnswerController extends Controller {
    public function __construct(private QuestionAnswerUseCase $useCase) {}

    public function index() {
        return response()->json($this->useCase->executeGetAll());
    }

    public function show($id) {
        $data = $this->useCase->executeGetById($id);
        return $data ? response()->json($data) : response()->json(['message' => 'Not Found'], 404);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);
        return response()->json($this->useCase->executeSave($validated), 201);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'question' => 'string',
            'answer' => 'string',
        ]);
        return response()->json($this->useCase->executeSave($validated, $id));
    }

    public function destroy($id) {
        $this->useCase->executeDelete($id);
        return response()->json(['message' => 'Lead berhasil dihapus']);
    }
}