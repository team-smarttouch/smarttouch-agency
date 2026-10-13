<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Agency Web Routes (Bilingual EN / AR)
|--------------------------------------------------------------------------
*/
Route::get('/services', [PublicController::class, 'getServices']);
Route::get('/services/{slug}', [PublicController::class, 'getService']);
Route::get('/pages', [PublicController::class, 'getPages']);
Route::get('/pages/{slug}', [PublicController::class, 'getPage']);
Route::get('/posts', [PublicController::class, 'getPosts']);
Route::get('/posts/{slug}', [PublicController::class, 'getPost']);
Route::get('/portfolios', [PublicController::class, 'getPortfolios']);
Route::get('/portfolios/{slug}', [PublicController::class, 'getPortfolio']);
Route::get('/categories', [PublicController::class, 'getCategories']);
Route::post('/inquiries', [PublicController::class, 'submitInquiry']);
Route::get('/settings', [PublicController::class, 'getSettings']);
Route::get('/clients', [PublicController::class, 'getClients']);

// Auth
Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated Dashboard Routes (Sanctum + Role-Based Access Control)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Current user & logout
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Common Dashboard statistics
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);

    // Inquiries & Settings management (Admin role only)
    Route::middleware('role:admin')->group(function () {
        Route::get('/dashboard/inquiries', [InquiryController::class, 'index']);
        Route::get('/dashboard/inquiries/{id}', [InquiryController::class, 'show']);
        Route::patch('/dashboard/inquiries/{id}', [InquiryController::class, 'update']);
        Route::delete('/dashboard/inquiries/{id}', [InquiryController::class, 'destroy']);

        // General Agency Settings
        Route::get('/dashboard/settings', [DashboardController::class, 'getSettings']);
        Route::post('/dashboard/settings', [DashboardController::class, 'updateSettings']);

        // Client Brands Management
        Route::get('/dashboard/clients', [DashboardController::class, 'getClients']);
        Route::post('/dashboard/clients', [DashboardController::class, 'createClient']);
        Route::put('/dashboard/clients/{id}', [DashboardController::class, 'updateClient']);
        Route::delete('/dashboard/clients/{id}', [DashboardController::class, 'deleteClient']);

        // User management (Admin only)
        Route::get('/dashboard/users', [UserController::class, 'index']);
        Route::post('/dashboard/users', [UserController::class, 'store']);
        Route::put('/dashboard/users/{id}', [UserController::class, 'update']);
        Route::delete('/dashboard/users/{id}', [UserController::class, 'destroy']);
    });

    // Content management: Pages, Blog Posts, Services
    // Handled by Admin, Content creator, and SEO specialist (with role-level capability checks inside controllers)
    Route::middleware('role:admin,content,seo')->group(function () {
        // Dynamic Pages
        Route::get('/dashboard/pages', [PageController::class, 'index']);
        Route::get('/dashboard/pages/{id}', [PageController::class, 'show']);
        Route::post('/dashboard/pages', [PageController::class, 'store']);
        Route::put('/dashboard/pages/{id}', [PageController::class, 'update']);
        Route::delete('/dashboard/pages/{id}', [PageController::class, 'destroy']);

        // Blog Posts
        Route::get('/dashboard/posts', [PostController::class, 'index']);
        Route::get('/dashboard/posts/{id}', [PostController::class, 'show']);
        Route::post('/dashboard/posts', [PostController::class, 'store']);
        Route::put('/dashboard/posts/{id}', [PostController::class, 'update']);
        Route::delete('/dashboard/posts/{id}', [PostController::class, 'destroy']);

        // Services Catalog
        Route::get('/dashboard/services', [ServiceController::class, 'index']);
        Route::get('/dashboard/services/{id}', [ServiceController::class, 'show']);
        Route::post('/dashboard/services', [ServiceController::class, 'store']);
        Route::put('/dashboard/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/dashboard/services/{id}', [ServiceController::class, 'destroy']);

        // Portfolios & Case Studies
        Route::get('/dashboard/portfolios', [PortfolioController::class, 'index']);
        Route::get('/dashboard/portfolios/{id}', [PortfolioController::class, 'show']);
        Route::post('/dashboard/portfolios', [PortfolioController::class, 'store']);
        Route::put('/dashboard/portfolios/{id}', [PortfolioController::class, 'update']);
        Route::delete('/dashboard/portfolios/{id}', [PortfolioController::class, 'destroy']);

        // File Uploads (Banner, Portfolio media, WYSIWYG images)
        Route::post('/dashboard/upload', [UploadController::class, 'upload']);
    });
});
