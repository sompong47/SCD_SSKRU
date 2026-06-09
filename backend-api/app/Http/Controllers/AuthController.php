<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    // ฟังก์ชันสำหรับสมัครสมาชิก
    public function register(Request $request)
    {
        // ตรวจสอบข้อมูลที่ส่งมา
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // สร้าง User ใหม่ลงฐานข้อมูล
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => 1, // ค่าเริ่มต้น 1 = Active
        ]);

        return response()->json([
            'message' => 'สมัครสมาชิกสำเร็จเรียบร้อย',
            'user' => $user
        ], 201);
    }

    // ฟังก์ชันสำหรับเข้าสู่ระบบ
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // ตรวจสอบอีเมลและรหัสผ่าน หากถูกต้องจะสร้าง Token
        if (! $token = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'], 401);
        }

        return $this->createNewToken($token);
    }

    // ฟังก์ชันสำหรับออกจากระบบ
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'ออกจากระบบเรียบร้อยแล้ว']);
    }

    // ฟังก์ชันดึงข้อมูลผู้ใช้ปัจจุบัน (ต้องใช้ Token)
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    // ฟังก์ชันจัดรูปแบบการส่ง Token กลับไปให้ Frontend
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }
}