<?php

namespace App\Presentation\Http\API\Public;

use App\Core\Application\UseCases\HeroUseCase;
use App\Core\Application\UseCases\BrandingUseCase;
use App\Core\Application\UseCases\ContactMeUseCase;
use App\Presentation\Http\Controllers\Controller;

class ContactController extends Controller
{
    public function __construct(
        private HeroUseCase $heroUseCase,
        private BrandingUseCase $brandingUseCase,
        private ContactMeUseCase $contactUseCase,
    ) {}

    public function __invoke()
    {
        return response()->json([
            'hero' => $this->heroUseCase->executeGetHeroByIndex((int)5),
            'opening' => $this->brandingUseCase->executeGetBrandingByIndex((int)5),
            'contacts' => $this->contactUseCase->getAllContacts(),
            'value' => $this->brandingUseCase->executeGetBrandingByIndex((int)6),
            'closing' => $this->brandingUseCase->executeGetClosingBrandingByIndex((int)5),
        ]);
    }
}
