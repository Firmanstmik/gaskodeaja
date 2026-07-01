<?php

namespace App\Presentation\Http\API;

use Illuminate\Http\Request;
use App\Presentation\Http\Controllers\Controller;
use App\Core\Application\UseCases\PortfolioUseCase;
use App\Core\Domain\Repositories\PortfolioRepositoryInterface;

class PortfolioController extends Controller
{
    private PortfolioRepositoryInterface $repository;

    public function __construct(PortfolioRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function index(PortfolioUseCase $useCase)
    {
        return response()->json($useCase->executeGetAll());
    }

    public function show(int $id, PortfolioUseCase $useCase)
    {
        $portfolio = $useCase->executeById($id);
        return $portfolio ? response()->json($portfolio) : response()->json(['message' => 'Portfolio not found'], 404);
    }
    
    public function byCategory(int $categoryId, PortfolioUseCase $useCase)
    {
        return response()->json($useCase->executeByCategoryId($categoryId));
    }

    public function store(Request $request, PortfolioUseCase $useCase)
    {
        $data = $this->validateRequest($request);

        if ($request->hasFile('image_thumbnail')) {
            $file = $request->file('image_thumbnail');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/portfolios'), $fileName);
            $data['image_thumbnail'] = 'uploads/portfolios/' . $fileName;
        }

        return response()->json($useCase->executeCreate($data), 201);
    }

    public function update(Request $request, int $id, PortfolioUseCase $useCase)
    {
        $data = $request->validate([
            'category_id'     => 'required|exists:categories,id',
            'title'           => 'required|string|max:255',
            'client_name'     => 'required|string|max:255',
            'image_thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'problems'        => 'required|array',
            'solutions'       => 'required|array',
            'results'         => 'required|array',
        ]);

        $existing = $this->repository->findById($id);

        if ($request->hasFile('image_thumbnail')) {
            if ($existing && $existing->getImageThumbnail() && file_exists(public_path($existing->getImageThumbnail()))) {
                unlink(public_path($existing->getImageThumbnail()));
            }

            $file = $request->file('image_thumbnail');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/portfolios'), $fileName);
            $data['image_thumbnail'] = 'uploads/portfolios/' . $fileName;
        } else {
            $data['image_thumbnail'] = $existing ? $existing->getImageThumbnail() : null;
        }

        return response()->json($useCase->executeUpdate($id, $data));
    }

    public function destroy(int $id, PortfolioUseCase $useCase)
    {
        $existing = $this->repository->findById($id);

        if ($existing) {
            if ($existing->getImageThumbnail() && file_exists(public_path($existing->getImageThumbnail()))) {
                unlink(public_path($existing->getImageThumbnail()));
            }

            $useCase->executeDelete($id);
            return response()->json(['message' => 'Portfolio and thumbnail deleted successfully']);
        }

        return response()->json(['message' => 'Portfolio not found'], 404);
    }

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'category_id'     => 'required|exists:categories,id',
            'title'           => 'required|string|max:255',
            'client_name'     => 'required|string|max:255',
            'image_thumbnail' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // Validasi file image
            'problems'        => 'required|array',
            'solutions'       => 'required|array',
            'results'         => 'required|array',
        ]);
    }
}
