<?php

namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\FooterUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FooterController extends Controller
{
    protected $footerUseCase;

    public function __construct(FooterUseCase $footerUseCase)
    {
        $this->footerUseCase = $footerUseCase;
    }

    public function index(): JsonResponse
    {
        $footer = $this->footerUseCase->getFooterData();
        
        return response()->json([
            'status' => 'success',
            'data' => $footer
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_logo_path' => 'nullable|string',
            'short_description' => 'required|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'social_links' => 'nullable|array',
            'copyright_text' => 'nullable|string',
        ]);

        $footer = $this->footerUseCase->saveFooterData($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Footer setup updated successfully',
            'data' => $footer
        ]);
    }
    public function update(Request $request, int $id): JsonResponse
{
    $validated = $request->validate([
        'brand_name' => 'required|string|max:255',
        'brand_logo_path' => 'nullable|string',
        'short_description' => 'required|string',
        'address' => 'nullable|string',
        'email' => 'nullable|email',
        'phone' => 'nullable|string',
        'social_links' => 'nullable|array',
        'copyright_text' => 'nullable|string',
    ]);

    try {
        $footer = $this->footerUseCase->updateFooterData($id, $validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Footer updated successfully',
            'data' => $footer
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to update footer: ' . $e->getMessage()
        ], 500);
    }
}
}