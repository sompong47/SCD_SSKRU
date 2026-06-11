<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutScd;
use Illuminate\Http\Request;

class AboutScdController extends Controller
{
    // ดึงข้อมูล
    public function index()
    {
        $about = AboutScd::firstOrCreate(
            ['id' => 1], 
            ['title' => 'Sustainable Community Development (SCD)', 'description' => 'รายละเอียด...']
        );

        // 🟢 สั่งบวกยอดวิวเพิ่มขึ้น 1 ทุกครั้งที่มีคนเรียกดูข้อมูลนี้
        $about->increment('view_count');

        return response()->json($about);
    }

    // อัปเดตข้อมูล
    public function update(Request $request)
    {
        $about = AboutScd::find(1);

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'image_secondary' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240' // เพิ่ม Validation
        ]);

        $imagePath = $about->image;
        $imageSecondaryPath = $about->image_secondary; // จำรูปที่ 2 เดิมไว้

        // จัดการรูปที่ 1
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('about_images', 'public');
        }

        // จัดการรูปที่ 2 (เพิ่มเข้ามาใหม่)
        if ($request->hasFile('image_secondary')) {
            $imageSecondaryPath = $request->file('image_secondary')->store('about_images', 'public');
        }

        $about->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'image_secondary' => $imageSecondaryPath, // บันทึกลง DB
        ]);

        return response()->json(['message' => 'อัปเดตข้อมูลสำเร็จ', 'data' => $about]);
    }
}