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
}