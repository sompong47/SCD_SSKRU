<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    // ดึงข่าวทั้งหมด (พร้อมชื่อหมวดหมู่)
    public function index()
    {
        return response()->json(News::with('category')->latest()->get());
    }

    // สร้างข่าวใหม่
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string',
            'detail' => 'required|string',
            'year' => 'required|integer',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // ตรวจสอบไฟล์รูป
        ]);

        $data = $request->all();

        // ถ้ามีการแนบไฟล์รูปมา ให้เซฟลงโฟลเดอร์ public/news_pictures
        if ($request->hasFile('picture')) {
            $path = $request->file('picture')->store('news_pictures', 'public');
            $data['picture'] = $path;
        }

        $news = News::create($data);
        return response()->json($news, 201);
    }

    // ดึงข้อมูลข่าวเดียว (พร้อมชื่อหมวดหมู่)
    public function show($id)
    {
        return response()->json(News::with('category')->findOrFail($id));
    }

    // อัปเดตข่าว
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('picture')) {
            // ลบรูปเก่าออกก่อน (ถ้ามี)
            if ($news->picture) {
                Storage::disk('public')->delete($news->picture);
            }
            $path = $request->file('picture')->store('news_pictures', 'public');
            $data['picture'] = $path;
        }

        $news->update($data);
        return response()->json($news);
    }

    // ลบข่าว
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        // ลบรูปภาพออกจากระบบด้วย
        if ($news->picture) {
            Storage::disk('public')->delete($news->picture);
        }
        $news->delete();
        return response()->json(['message' => 'ลบข่าวเรียบร้อยแล้ว']);
    }
}