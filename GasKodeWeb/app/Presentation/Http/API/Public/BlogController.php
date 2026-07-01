<?php

namespace App\Presentation\Http\API\Public;

use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Application\UseCases\BrandingUseCase;
use App\Core\Application\UseCases\CategoryUseCase;
use App\Core\Application\UseCases\ServiceUseCase;
use App\Core\Application\UseCases\PostUseCase;
use App\Presentation\Http\Controllers\Controller;

class BlogController extends Controller
{
    public function __construct(
        private HeroUseCase $heroUseCase,
        private BrandingUseCase $brandingUseCase,
        private ServiceUseCase $serviceUseCase,
        private CategoryUseCase $categoryUseCase,
        private PostUseCase $postUseCase
    ) {}

    public function __invoke()
    {
        return response()->json([
            'hero' => $this->heroUseCase->executeGetHeroByIndex((int)4),
            'posts' => $this->postUseCase->executeGetPostByLimit(3),
            'kategoris' => $this->categoryUseCase->executeGetAll(),
            'closing' => $this->brandingUseCase->executeGetClosingBrandingByIndex((int)4),
        ]);
    }
}
