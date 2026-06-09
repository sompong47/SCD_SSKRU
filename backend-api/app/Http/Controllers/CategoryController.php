<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // ดึงหมวดหมู่ทั้งหมด
    public function index()
    {
        return response()->json(Category::all());
    }

    // สร้างหมวดหมู่ใหม่
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string']);
        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    // ดึงข้อมูลหมวดหมู่เดียว
    public function show($id)
    {
        return response()->json(Category::findOrFail($id));
    }

    // อัปเดตหมวดหมู่
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }

    // ลบหมวดหมู่
    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['message' => 'ลบหมวดหมู่เรียบร้อยแล้ว']);
    }
}