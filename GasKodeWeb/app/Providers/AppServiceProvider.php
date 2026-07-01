<?php

namespace App\Providers;

use App\Core\Domain\Repositories\BrandingRepositoryInterface;
use App\Core\Domain\Repositories\CaraKerjaRepositoryInterface;
use App\Core\Domain\Repositories\CategoryRepositoryInterface;
use App\Core\Domain\Repositories\ContactMeRepositoryInterface;
use App\Core\Domain\Repositories\ContactSubmissionRepositoryInterface;
use App\Core\Domain\Repositories\FooterRepositoryInterface;
use App\Core\Domain\Repositories\LeadRepositoryInterface;
use App\Core\Domain\Repositories\PortfolioRepositoryInterface;
use App\Core\Domain\Repositories\PostRepositoryInterface;
use App\Core\Domain\Repositories\ServicePlanRepositoryInterface;
use App\Core\Domain\Repositories\ServiceRepositoryInterface;
use App\Core\Domain\Repositories\TestimonialRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentCategoryRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentLeadRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentPortfolioRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentPostRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentServicePlanRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentServiceRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentTestimonialRepository;
use Illuminate\Support\ServiceProvider;
use App\Core\Domain\Repositories\HeroRepositoryInterface;
use App\Core\Domain\Repositories\QuestionAnswerRepositoryInterface;
use App\Core\Domain\Repositories\UserRepositoryInterface;
use App\Core\Domain\Repositories\VisiMisiRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentHeroRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentBrandingRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentCaraKerjaRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentContactMeRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentContactSubmissionRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentFooterRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentQuestionAnswerRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentUserRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentVisiMisiRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(CategoryRepositoryInterface::class, EloquentCategoryRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, EloquentServiceRepository::class);
        $this->app->bind(ServicePlanRepositoryInterface::class, EloquentServicePlanRepository::class);
        $this->app->bind(PostRepositoryInterface::class, EloquentPostRepository::class);
        $this->app->bind(PortfolioRepositoryInterface::class, EloquentPortfolioRepository::class);
        $this->app->bind(LeadRepositoryInterface::class, EloquentLeadRepository::class);
        $this->app->bind(TestimonialRepositoryInterface::class, EloquentTestimonialRepository::class);
        $this->app->bind(HeroRepositoryInterface::class, EloquentHeroRepository::class);
        $this->app->bind(QuestionAnswerRepositoryInterface::class, EloquentQuestionAnswerRepository::class);
        $this->app->bind(BrandingRepositoryInterface::class, EloquentBrandingRepository::class);
        $this->app->bind(CaraKerjaRepositoryInterface::class, EloquentCaraKerjaRepository::class);
        $this->app->bind(VisiMisiRepositoryInterface::class, EloquentVisiMisiRepository::class);
        $this->app->bind(ContactMeRepositoryInterface::class, EloquentContactMeRepository::class);
        $this->app->bind(ContactSubmissionRepositoryInterface::class, EloquentContactSubmissionRepository::class);
        $this->app->bind(FooterRepositoryInterface::class, EloquentFooterRepository::class);
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
