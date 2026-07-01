<?php

namespace App\Presentation\Http\API\Public;

use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Application\UseCases\BrandingUseCase;
use App\Core\Application\UseCases\VisiMisiUseCase;
use App\Core\Application\UseCases\CaraKerjaUseCase;
use App\Core\Application\UseCases\CategoryUseCase;
use App\Core\Application\UseCases\PortfolioUseCase;
use App\Core\Application\UseCases\TestimonialUseCase;
use App\Presentation\Http\Controllers\Controller;

class AboutController extends Controller
{
    public function __construct(
        private HeroUseCase $heroUseCase,
        private BrandingUseCase $brandingUseCase,
        private VisiMisiUseCase $visiMisiUseCase,
        private CaraKerjaUseCase $caraKerjaUseCase,
        private CategoryUseCase $categoryUseCase,
        private PortfolioUseCase $portfolioUseCase,
        private TestimonialUseCase $testimonialUseCase

    ) {}

    public function __invoke()
    {
        $testimonials = $this->testimonialUseCase->executeGetAll();
        // dd($testimonials);
        $averageRating = collect($testimonials)
            ->map(fn($item) => $item->getRating())
            ->filter()
            ->avg();

        return response()->json([
            'hero' => $this->heroUseCase->executeGetHeroByIndex((int)1),
            'opening' => $this->brandingUseCase->executeGetBrandingByIndex((int)1),
            'visi-misi' => $this->visiMisiUseCase->executeGetAll(),
            'value' => $this->brandingUseCase->executeGetBrandingByIndex((int)2),
            'cara-kerja' => $this->caraKerjaUseCase->executeGetAll(),
            'team' => $this->categoryUseCase->executeGetAll(),
            'portfolio' => [
                'total' => count($this->portfolioUseCase->executeGetAll()),
                'rating' => round($averageRating ?? 0, 1)
            ],
            'testimonial' => $this->testimonialUseCase->executeGetTestimonialByLimit((int)3),
            'closing' => $this->brandingUseCase->executeGetClosingBrandingByIndex((int)1),
        ]);
    }
}
