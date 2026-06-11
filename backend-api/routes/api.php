<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\Api\ScdController;
// เส้นทางสำหรับระบบสมาชิก (Login, Register, Logout, Me)
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
});

// เส้นทางสำหรับจัดการ หมวดหมู่ และ ข่าวสาร (ดึงข้อมูล, เพิ่ม, ลบ, แก้ไข)
Route::apiResource('categories', CategoryController::class);
Route::apiResource('news', NewsController::class);

Route::get('/scd/years', [ScdController::class, 'getYears']);
Route::get('/scd/years/{year}', [ScdController::class, 'getCategoriesByYear']);
Route::get('/scd/years/{year}/category/{categoryId}', [ScdController::class, 'getDetailContent']);
// เส้นทางสำหรับ เพิ่ม และ ลบ ปีข้อมูล
Route::post('/scd/years', [ScdController::class, 'storeYear']);
Route::delete('/scd/years/{id}', [ScdController::class, 'destroyYear']);

// เส้นทางสำหรับจัดการ เนื้อหา (Contents) ในหน้า Admin
Route::get('/scd/categories', [ScdController::class, 'getAllCategories']);
Route::get('/scd/contents', [ScdController::class, 'getAllContents']);
Route::post('/scd/contents', [ScdController::class, 'storeContent']);
Route::delete('/scd/contents/{id}', [ScdController::class, 'destroyContent']);

Route::post('/scd/contents/{id}', [ScdController::class, 'updateContent']);

Route::get('/about-scd', [\App\Http\Controllers\Api\AboutScdController::class, 'index']);
Route::post('/about-scd', [\App\Http\Controllers\Api\AboutScdController::class, 'update']);