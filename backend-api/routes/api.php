<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
// use App\Http\Controllers\NewsController; <-- 💥 ปิดของเก่าทิ้งเพื่อไม่ให้สับสน
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

// เส้นทางสำหรับจัดการ หมวดหมู่ (ส่วน News ของเก่าปิดไปก่อนเพราะเราใช้ระบบใหม่แล้ว)
Route::apiResource('categories', CategoryController::class);
// Route::apiResource('news', NewsController::class); <-- 💥 ปิดบรรทัดนี้ไปเลยครับ เพราะมันชนกับ API ใหม่

// เส้นทางสำหรับ SCD Years
Route::get('/scd/years', [ScdController::class, 'getYears']);
Route::get('/scd/years/{year}', [ScdController::class, 'getCategoriesByYear']);
Route::get('/scd/years/{year}/category/{categoryId}', [ScdController::class, 'getDetailContent']);
Route::post('/scd/years', [ScdController::class, 'storeYear']);
Route::delete('/scd/years/{id}', [ScdController::class, 'destroyYear']);

// เส้นทางสำหรับจัดการ เนื้อหา (Contents) ในหน้า Admin
Route::get('/scd/categories', [ScdController::class, 'getAllCategories']);
Route::get('/scd/contents', [ScdController::class, 'getAllContents']);
Route::post('/scd/contents', [ScdController::class, 'storeContent']);
Route::delete('/scd/contents/{id}', [ScdController::class, 'destroyContent']);
Route::post('/scd/contents/{id}', [ScdController::class, 'updateContent']);

// เส้นทางสำหรับ About SCD
Route::get('/about-scd', [\App\Http\Controllers\Api\AboutScdController::class, 'index']);
Route::post('/about-scd', [\App\Http\Controllers\Api\AboutScdController::class, 'update']);

// 🟢 API สำหรับจัดการ ข่าว & SDG (ระบบใหม่ล่าสุด)
Route::get('/news', [\App\Http\Controllers\Api\NewsController::class, 'index']);
Route::post('/news', [\App\Http\Controllers\Api\NewsController::class, 'store']);
Route::get('/news/{id}', [\App\Http\Controllers\Api\NewsController::class, 'show']);

// 🟢 API สำหรับดึงข้อมูล SDG 17 ข้อ
Route::get('/sdgs', function () {
    return response()->json(\App\Models\Sdg::orderBy('sdg_number')->get());
});
// ลบข่าว
Route::delete('/news/{id}', [\App\Http\Controllers\Api\NewsController::class, 'destroy']);

// อัปเดตดาว SDG
Route::post('/sdgs/{id}/rating', function(\Illuminate\Http\Request $request, $id) {
    $sdg = \App\Models\Sdg::findOrFail($id);
    $sdg->update(['rating' => $request->rating]);
    return response()->json(['message' => 'อัปเดตเรตติ้งสำเร็จ']);

// อัปเดตดาวให้ข่าว (ประเมินย้อนหลัง)
// อัปเดตดาวให้ข่าว (ประเมินย้อนหลัง)
Route::post('/news/{id}/rating', [\App\Http\Controllers\Api\NewsController::class, 'updateRating']);
});