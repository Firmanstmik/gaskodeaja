<?php
namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\ContactSubmissionUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactSubmissionController extends Controller
{
    protected $contactSubmissionUseCase;

    public function __construct(ContactSubmissionUseCase $contactSubmissionUseCase)
    {
        $this->contactSubmissionUseCase = $contactSubmissionUseCase;
    }

    public function index()
    {
        $submissions = $this->contactSubmissionUseCase->getAllSubmissions();
        return response()->json([
            'status' => 'success',
            'data' => $submissions
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|min:10|max:15',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $result = $this->contactSubmissionUseCase->storeSubmission($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Pesan Anda berhasil dikirim ke Gaskode!',
            'data' => $result
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processed,archived'
        ]);

        try {
            $this->contactSubmissionUseCase->updateStatus($id, $request->status);
            return response()->json(['message' => 'Status pesan berhasil diperbarui']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Menghapus pesan
     */
    public function destroy($id)
    {
        $this->contactSubmissionUseCase->deleteSubmission($id);
        return response()->json(['message' => 'Data submission berhasil dihapus']);
    }
}