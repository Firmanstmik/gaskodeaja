<?php

namespace App\Presentation\Http\API;

use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Domain\Repositories\HeroRepositoryInterface;

class HeroController extends Controller
{
    public function __construct(private HeroRepositoryInterface $repository) {}

    public function index(HeroUseCase $useCase)
    {
        $hero = $useCase->executeByActive();
        return $hero ? response()->json($hero) : response()->json(['message' => 'No active hero'], 404);
    }

    public function list(HeroUseCase $useCase)
    {
        return response()->json($useCase->executeGetAll());
    }

    public function store(Request $request, HeroUseCase $useCase)
    {
        $data = $request->validate([
            'title'      => 'required|string',
            'subtitle'   => 'required|string',
            'image_file' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // Minimal 2MB
            'cta_text'   => 'required|string',
            'cta_link'   => 'required|string',
            'is_active'  => 'boolean'
        ]);

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/hero'), $fileName);
            $data['image_path'] = 'uploads/hero/' . $fileName;
        }

        return response()->json($useCase->executeCreateOrUpdate($data, $request->id));
    }

    public function update(Request $request, int $id, HeroUseCase $useCase)
    {
        $data = $request->validate([
            'title'      => 'required|string',
            'subtitle'   => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Nullable jika foto tidak diganti
            'cta_text'   => 'required|string',
            'cta_link'   => 'required|string',
            'is_active'  => 'boolean'
        ]);

        // Jika ada upload foto baru
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/hero'), $fileName);
            $data['image_path'] = 'uploads/hero/' . $fileName;
        } else {
            // Jika tidak upload, ambil path lama dari database agar tidak hilang
            $existing = $this->repository->findById($id);
            $data['image_path'] = $existing ? $existing->getImagePath() : '';
        }
        return response()->json($useCase->executeCreateOrUpdate($data, $id));
    }

    public function destroy(int $id)
    {
        $hero = $this->repository->findById($id);

        if ($hero) {
            $imagePath = $hero->getImagePath();
            if (!empty($imagePath) && file_exists(public_path($imagePath))) {
                unlink(public_path($imagePath));
            }
            $this->repository->delete($id);
            return response()->json(['message' => 'Hero and image deleted successfully']);
        }
        return response()->json(['message' => 'Hero not found'], 404);
    }
    
}