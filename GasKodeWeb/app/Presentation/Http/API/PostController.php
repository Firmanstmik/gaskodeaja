<?php
namespace App\Presentation\Http\API;

use Illuminate\Http\Request;
use App\Core\Domain\Repositories\PostRepositoryInterface;
use App\Presentation\Http\Controllers\Controller;
use App\Core\Application\UseCases\PostUseCase;

class PostController extends Controller
{
    public function __construct(private PostRepositoryInterface $repository) {}

    public function index(PostUseCase $useCase)
    {
        return response()->json($useCase->executeByPublish());
    }

    public function store(Request $request, PostUseCase $useCase)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'status' => 'in:draft,published'
        ]);

        // Simulasi user_id = 1 jika belum ada auth. 
        // Idealnya: auth()->id()
        $userId = $request->user()?->id ?? 1; 

        return response()->json($useCase->executeCreate($data, $userId), 201);
    }

    public function show(string $slug, PostUseCase $useCase)
    {
        $post = $useCase->executeBySlug($slug);
        return $post ? response()->json($post) : response()->json(['message' => 'Artikel tidak ditemukan'], 404);
    }

    public function update(Request $request, int $id, PostUseCase $useCase)
    {
        // Untuk update, kita validasi dulu apakah datanya ada
        $data = $this->validateRequest($request);
        $data['user_id'] = $request->user()?->id ?? 1; 

        return response()->json($useCase->executeUpdate($id, $data));
    }

    public function destroy(int $id, PostUseCase $useCase)
    {
        $useCase->executeDelete($id);
        return response()->json(['message' => 'Post berhasil dihapus']);
    }

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'category_id'      => 'required|exists:categories,id',
            'title'            => 'required|string|max:255',
            'content'          => 'required|string',
            'excerpt'          => 'required|string',
            'slug'             => 'nullable|string|unique:posts,slug,' . $request->id,
            'meta_title'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'status'           => 'required|in:draft,published',
        ]);
    }
}