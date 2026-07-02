<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Presentation\Http\API\CategoryController;
use App\Presentation\Http\API\ServiceController;
use App\Presentation\Http\API\ServicePlanController;
use App\Presentation\Http\API\PortfolioController;
use App\Presentation\Http\API\PostController;
use App\Presentation\Http\API\LeadController;
use App\Presentation\Http\API\TestimonialController;
use App\Presentation\Http\API\HeroController;
use App\Presentation\Http\API\QuestionAnswerController;
use App\Presentation\Http\API\BrandingController;
use App\Presentation\Http\API\CaraKerjaController;
use App\Presentation\Http\API\ContactMeController;
use App\Presentation\Http\API\ContactSubmissionController;
use App\Presentation\Http\API\FooterController;
use App\Presentation\Http\API\VisiMisiController;
use App\Presentation\Http\API\Public\AboutController;
use App\Presentation\Http\API\Public\BlogController;
use App\Presentation\Http\API\Public\HomeController;
use App\Presentation\Http\API\Public\ServicesController;
use App\Presentation\Http\API\Public\ContactController;
use App\Presentation\Http\API\Public\PortfolioController as PublicPortfolioController;
use App\Presentation\Http\API\UserController;
use App\Presentation\Http\API\AuthController;


Route::prefix('public')->group(function () {
    Route::get('/home', HomeController::class);
    Route::get('/about', AboutController::class);
    Route::get('/services', ServicesController::class);
    Route::get('/portfolios', PublicPortfolioController::class);
    Route::get('/blogs', BlogController::class);
    Route::get('/contacts', ContactController::class);

    // Public lead capture dari form kontak website (tanpa auth)
    Route::post('/contacts', [ContactSubmissionController::class, 'store']);

    // Footer bersifat konten publik (brand, alamat, sosial media)
    Route::get('/footer', [FooterController::class, 'index']);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::prefix('categories')->controller(CategoryController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('services')->controller(ServiceController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('service-plans')->controller(ServicePlanController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/service/{serviceId}', 'byService');
    });

    Route::prefix('portfolios')->controller(PortfolioController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/category/{categoryId}', 'byCategory');
    });

    Route::prefix('posts')->controller(PostController::class)->group(function () {
        Route::get('/', 'index'); // Get all published
        Route::get('/{slug}', 'show'); // Get detail by slug
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('leads')->controller(LeadController::class)->group(function () {
        Route::post('/', 'store');
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::patch('/{id}/status', 'updateStatus'); // Khusus update status
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('testimonials')->controller(TestimonialController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('hero')->controller(HeroController::class)->group(function () {
        Route::get('/all', 'list'); // get all
        Route::post('/', 'store'); // add
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy'); // hapus
    });

    Route::prefix('faqs')->controller(QuestionAnswerController::class)->group(function () {
        Route::get('/', 'index');          // Ambil semua data
        Route::post('/', 'store');         // Simpan data baru
        Route::get('/{id}', 'show');       // Ambil satu data detail
        Route::put('/{id}', 'update');     // Update data (seluruh/sebagian)
        Route::delete('/{id}', 'destroy');  // Hapus data
    });

    Route::prefix('brandings')->controller(BrandingController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('cara-kerja')->controller(CaraKerjaController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('visi-misi')->controller(VisiMisiController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('contact-mes')->controller(ContactMeController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('submissions')->controller(ContactSubmissionController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('footer')->controller(FooterController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

    Route::prefix('users')->controller(UserController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });
});
