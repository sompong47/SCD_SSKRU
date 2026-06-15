<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    // 1. ดึงข้อมูลข่าวทั้งหมด (รองรับการกรองตาม SDG)
    public function index(Request $request)
    {
        $query = News::with(['scdYear', 'sdgs', 'attachments'])->orderBy('id', 'desc');

        // 🟢 ถ้ามีการส่ง sdg_id มา ให้กรองเอาเฉพาะข่าวที่มี SDG ข้อนั้น
        if ($request->has('sdg_id')) {
            $query->whereHas('sdgs', function($q) use ($request) {
                $q->where('sdgs.id', $request->sdg_id);
            });
        }

        return response()->json($query->get());
    }

    // 2. บันทึกข่าวใหม่
    public function store(Request $request)
    {
        // ตรวจสอบข้อมูลที่ส่งมา
        $request->validate([
            'scd_year_id' => 'required|exists:scd_years,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // รูปปก ไม่เกิน 2MB
            'sdgs' => 'required|array', // ต้องส่ง SDG มาเป็น Array เช่น [1, 3, 5]
            'sdgs.*' => 'exists:sdgs,id', // เช็คว่าเลข SDG ที่ส่งมามีในระบบจริง
            'attachments' => 'nullable|array', // ไฟล์แนบส่งมาเป็น Array (อัปได้หลายไฟล์)
            'attachments.*' => 'file|mimes:pdf,jpeg,png,jpg,webp|max:2048', // บังคับไฟล์แนบไม่เกิน 2MB
            'rating' => 'nullable|integer|min:0|max:5' // 🟢 เพิ่มการรับค่าและตรวจจับเรตติ้งดาว
        ]);

        // จัดการรูปปกข่าว
        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('news_covers', 'public');
        }

        // สร้างข่าวลงฐานข้อมูล
        $news = News::create([
            'scd_year_id' => $request->scd_year_id,
            'title' => $request->title,
            'content' => $request->content,
            'cover_image' => $coverPath,
            'view_count' => 0,
            'rating' => $request->rating ?? 0 // 🟢 บันทึกค่าดาวลงฐานข้อมูล (ถ้าไม่ส่งมาให้เป็น 0)
        ]);

        // 🟢 ผูก SDG เข้ากับข่าว (ทีเด็ดอยู่ตรงนี้ ใช้คำสั่ง sync() จัดการให้เลย)
        if ($request->has('sdgs')) {
            $news->sdgs()->sync($request->sdgs); 
        }

        // 🟢 จัดการไฟล์แนบ (ลูปเก็บทีละไฟล์ลงฐานข้อมูล)
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('news_attachments', 'public');
                $extension = $file->getClientOriginalExtension();
                
                Attachment::create([
                    'news_id' => $news->id,
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'file_type' => $extension // เก็บไว้เช็คว่าเป็น pdf หรือรูปภาพตอนแสดงผล
                ]);
            }
        }

        return response()->json([
            'message' => 'บันทึกข่าวเรียบร้อยแล้ว', 
            'data' => $news->load(['sdgs', 'attachments']) // ดึงข้อมูลที่เพิ่งผูกเสร็จกลับไปให้หน้าบ้านดู
        ], 201);
    }

    // 3. ดูรายละเอียดข่าว 1 ข่าว (อัปเดตยอดวิว)
    public function show($id)
    {
        $news = News::with(['scdYear', 'sdgs', 'attachments'])->findOrFail($id);
        $news->increment('view_count'); // คนกดเข้ามาดู ยอดวิวเด้ง +1
        return response()->json($news);
    }

    // 4. ลบข่าวสารและไฟล์แนบ
    public function destroy($id)
    {
        $news = News::with('attachments')->findOrFail($id);

        // ลบรูปหน้าปกออกจากเครื่อง
        if ($news->cover_image) {
            Storage::disk('public')->delete($news->cover_image);
        }

        // ลบไฟล์แนบ (PDF/รูป) ออกจากเครื่อง
        foreach ($news->attachments as $attachment) {
            Storage::disk('public')->delete($attachment->file_path);
        }

        $news->delete(); // ลบข้อมูลออกจากฐานข้อมูล (ตารางอื่นๆ จะโดนลบตามอัตโนมัติจาก onDelete cascade)

        return response()->json(['message' => 'ลบข้อมูลสำเร็จ']);
    }
   // 5. อัปเดตเรตติ้งดาวของข่าว (ประเมินย้อนหลัง)
    public function updateRating(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:0|max:5'
        ]);

        $news = News::findOrFail($id);
        $news->update(['rating' => $request->rating]);

        return response()->json(['message' => 'อัปเดตเรตติ้งสำเร็จ', 'data' => $news]);
    }

    // 🟢 ฟังก์ชันแก้ไข/อัปเดตข่าว
 public function update(Request $request, $id)
 {
     $news = News::findOrFail($id);

     // อัปเดตข้อมูลตัวหนังสือ
     $news->update([
         'scd_year_id' => $request->scd_year_id ?? $news->scd_year_id,
         'title' => $request->title ?? $news->title,
         'content' => $request->content ?? $news->content,
         'external_link' => $request->external_link ?? $news->external_link,
     ]);

     // ถ้ามีการอัปโหลดรูปปกใหม่ ให้ทับของเดิม
     if ($request->hasFile('cover_image')) {
         $news->update(['cover_image' => $request->file('cover_image')->store('news', 'public')]);
     }

     // ถ้ามีการเลือก SDG ใหม่ ให้ซิงค์ข้อมูลใหม่ทับของเดิม
     if ($request->has('sdgs')) {
         $news->sdgs()->sync($request->sdgs);
     }

     // ถ้ามีการอัปโหลดอัลบั้ม/ไฟล์แนบ เพิ่มเติม
     if ($request->hasFile('attachments')) {
         foreach ($request->file('attachments') as $file) {
             $news->attachments()->create([
                 'file_path' => $file->store('attachments', 'public'),
                 'file_name' => $file->getClientOriginalName(),
                 'file_type' => $file->getClientMimeType()
             ]);
         }
     }

     return response()->json(['message' => 'อัปเดตข้อมูลสำเร็จ', 'data' => $news]);
 }
}