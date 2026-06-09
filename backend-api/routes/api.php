<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;

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