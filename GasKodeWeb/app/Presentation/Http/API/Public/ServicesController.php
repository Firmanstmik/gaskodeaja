<?php

namespace App\Presentation\Http\API\Public;

use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Application\UseCases\BrandingUseCase;
use App\Core\Application\UseCases\ServicePlanUseCase;
use App\Core\Application\UseCases\ServiceUseCase;
use App\Presentation\Http\Controllers\Controller;

class ServicesController extends Controller
{
    public function __construct(
        private HeroUseCase $heroUseCase,
        private BrandingUseCase $brandingUseCase,
        private ServiceUseCase $serviceUseCase,
        private ServicePlanUseCase $servicePlanUseCase,

    ) {}

    public function __invoke()
    {
        return response()->json([
            'hero' => $this->heroUseCase->executeGetHeroByIndex((int)2),
            'opening' => $this->brandingUseCase->executeGetBrandingByIndex((int)3),
            'services' => $this->serviceUseCase->executeGetAll(),
            'service-plans' => $this->servicePlanUseCase->executeGetAll(),
            'closing' => $this->brandingUseCase->executeGetClosingBrandingByIndex((int)2),
        ]);
    }
}
