<?php

namespace App\Presentation\Http\API\Public;

use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Application\UseCases\BrandingUseCase;
use App\Core\Application\UseCases\PortfolioUseCase;
use App\Core\Application\UseCases\ServiceUseCase;
use App\Presentation\Http\Controllers\Controller;

class PortfolioController extends Controller
{
    public function __construct(
        private HeroUseCase $heroUseCase,
        private BrandingUseCase $brandingUseCase,
        private ServiceUseCase $serviceUseCase,
        private PortfolioUseCase $portfolioUseCase,
    ) {}

    public function __invoke()
    {
        return response()->json([
            'hero' => $this->heroUseCase->executeGetHeroByIndex((int)3),
            'opening' => $this->brandingUseCase->executeGetBrandingByIndex((int)4),
            'portfolio' => $this->portfolioUseCase->executeGetAll(),
            'services' => $this->serviceUseCase->executeGetAll(),
            'closing' => $this->brandingUseCase->executeGetClosingBrandingByIndex((int)3),
        ]);
    }
}
