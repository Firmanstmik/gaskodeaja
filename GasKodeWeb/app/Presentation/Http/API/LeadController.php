<?php
namespace App\Presentation\Http\API;

use Illuminate\Http\Request;
use App\Core\Domain\Repositories\LeadRepositoryInterface;
use App\Presentation\Http\Controllers\Controller;
use App\Core\Application\UseCases\LeadUseCase;

class LeadController extends Controller
{
    public function __construct(private LeadRepositoryInterface $repository) {}

    // Admin melihat semua leads
    public function index(LeadUseCase $useCase)
    {
        return response()->json($useCase->executeGetAll());
    }

    // Pengunjung submit form (Public)
    public function store(Request $request, LeadUseCase $useCase) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'requirement' => 'nullable|string'
        ]);
        return response()->json($useCase->executeCreate($data), 201);
    }
    // Detail Lead
    public function show(int $id, LeadUseCase $useCase)
    {
        $lead = $useCase->executeById($id);
        return $lead ? response()->json($lead) : response()->json(['message' => 'Lead tidak ditemukan'], 404);
    }

    // Update Full Data Lead
    public function update(Request $request, int $id, LeadUseCase $useCase)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'requirement'     => 'nullable|string',
            'status'          => 'required|in:new,contacted,closed,lost',
        ]);

        return response()->json($useCase->executeUpdate($id, $data));
    }

    // Update Hanya Status (Quick Action di Tabel)
    public function updateStatus(Request $request, int $id, LeadUseCase $useCase)
    {
        $request->validate(['status' => 'required|in:new,contacted,closed,lost']);
        
        $success = $useCase->executeUpdateByStatus($id, $request->status);
        return $success 
            ? response()->json(['message' => 'Status lead berhasil diperbarui'])
            : response()->json(['message' => 'Lead gagal ditemukan'], 404);
    }

    // Hapus Lead
    public function destroy(int $id, LeadUseCase $useCase)
    {
        $useCase->executeDelete($id);
        return response()->json(['message' => 'Lead berhasil dihapus']);
    }
}