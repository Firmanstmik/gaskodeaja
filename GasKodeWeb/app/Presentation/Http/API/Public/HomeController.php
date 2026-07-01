<?php

namespace App\Presentation\Http\API\Public;
use Illuminate\Http\Request;

use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Application\UseCases\BrandingUseCase;
use App\Core\Application\UseCases\PortfolioUseCase;
use App\Core\Application\UseCases\ServiceUseCase;
use App\Core\Application\UseCases\TestimonialUseCase;
use App\Presentation\Http\Controllers\Controller;
class HomeController extends Controller
{
    public function __construct(
        private HeroUseCase $heroUseCase,
        private BrandingUseCase $brandingUseCase,
        private PortfolioUseCase $portfolioUseCase,
        private ServiceUseCase $serviceUseCase,
        private TestimonialUseCase $testimonialUseCase

        ) {}

    public function __invoke()
    {
        return response()->json([
            'hero' => $this->heroUseCase->executeGetHeroByIndex((int)0),
            'opening' => $this->brandingUseCase->executeGetBrandingByIndex((int)0),
            'portfolio' => $this->portfolioUseCase->executeGetPortfolioByLimit((int)4),
            'services' => $this->serviceUseCase->executeGetServiceByLimit((int)4),
            'testimonial' => $this->testimonialUseCase->executeGetTestimonialByLimit((int)4),
            'closing' => $this->brandingUseCase->executeGetClosingBrandingByIndex((int)0),
        ]);
    }
}