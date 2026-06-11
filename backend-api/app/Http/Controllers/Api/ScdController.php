<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ScdYear;
use App\Models\ScdContent;
use Illuminate\Http\Request;

class ScdController extends Controller
{
    // 1. ดึงข้อมูลหน้ารวมปี (scd-indicators)
    public function getYears()
    {
        $years = ScdYear::orderBy('year', 'desc')->get();
        return response()->json($years);
    }

    // 2. ดึงข้อมูลหน้ารวม 7 หมวดหมู่แยกตามปี (scd-indicators/[year])
    public function getCategoriesByYear($year)
    {
        $scdYear = ScdYear::where('year', $year)->firstOrFail();

        $contents = ScdContent::with('category')
            ->where('scd_year_id', $scdYear->id)
            ->get();

        return response()->json($contents);
    }

    // 3. ดึงเนื้อหาแบบละเอียด (scd-indicators/[year]/[categoryId])
    public function getDetailContent($year, $categoryId)
    {
        $scdYear = ScdYear::where('year', $year)->firstOrFail();

        $content = ScdContent::with('category')
            ->where('scd_year_id', $scdYear->id)
            ->where('scd_category_id', $categoryId)
            ->firstOrFail();

        // สั่งเพิ่มยอดวิว +1
        $content->increment('view_count');

        return response()->json($content);
    }

    // 4. บันทึกปีข้อมูลใหม่ พร้อมรูปภาพปก (POST)
    public function storeYear(Request $request)
    {
        $request->validate([
            'year' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240' // แก้เป็น 10MB
        ]);

        $imagePath = null;

        if ($request->hasFile('cover_image')) {
            $imagePath = $request->file('cover_image')->store('scd_covers', 'public');
        }

        $newYear = ScdYear::create([
            'year' => $request->year,
            'cover_image' => $imagePath
        ]);

        return response()->json(['message' => 'เพิ่มข้อมูลสำเร็จ', 'data' => $newYear], 201);
    }

    // 5. ลบปีข้อมูล (DELETE)
    public function destroyYear($id)
    {
        $year = ScdYear::findOrFail($id);
        $year->delete();
        
        return response()->json(['message' => 'ลบข้อมูลสำเร็จ']);
    }

    // 6. ดึงข้อมูลหมวดหมู่ทั้งหมด
    public function getAllCategories()
    {
        return response()->json(\App\Models\ScdCategory::all());
    }

    // 7. ดึงข้อมูลเนื้อหาทั้งหมด
    public function getAllContents()
    {
        $contents = ScdContent::with(['category', 'scdYear'])->orderBy('id', 'desc')->get();
        return response()->json($contents);
    }

    // 8. บันทึกเนื้อหาใหม่ พร้อมอัปโหลดรูปภาพ (POST)
    public function storeContent(Request $request)
    {
        $request->validate([
            'scd_year_id' => 'required|exists:scd_years,id',
            'scd_category_id' => 'required|exists:scd_categories,id',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'content_title' => 'nullable|string',
            'detail' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240' // <--- แก้ตรงนี้เป็น 10MB แล้ว
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('scd_images', 'public');
        }

        $content = ScdContent::create([
            'scd_year_id' => $request->scd_year_id,
            'scd_category_id' => $request->scd_category_id,
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'content_title' => $request->content_title,
            'detail' => $request->detail,
            'image' => $imagePath,
            'view_count' => 0
        ]);

        return response()->json(['message' => 'เพิ่มเนื้อหาสำเร็จ', 'data' => $content], 201);
    }

    // 9. ลบเนื้อหา (DELETE)
    public function destroyContent($id)
    {
        $content = ScdContent::findOrFail($id);
        $content->delete();
        return response()->json(['message' => 'ลบเนื้อหาสำเร็จ']);
    }

    // 10. แก้ไขเนื้อหา
    public function updateContent(Request $request, $id)
    {
        $content = ScdContent::findOrFail($id);

        $request->validate([
            'scd_year_id' => 'required|exists:scd_years,id',
            'scd_category_id' => 'required|exists:scd_categories,id',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'content_title' => 'nullable|string',
            'detail' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240' // อันนี้ 10MB ถูกต้องแล้ว
        ]);

        $imagePath = $content->image; 

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('scd_images', 'public');
        }

        $content->update([
            'scd_year_id' => $request->scd_year_id,
            'scd_category_id' => $request->scd_category_id,
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'content_title' => $request->content_title,
            'detail' => $request->detail,
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'อัปเดตเนื้อหาสำเร็จ', 'data' => $content]);
    }
}