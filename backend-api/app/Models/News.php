<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    // 🟢 แก้ไข $fillable ให้ตรงกับชื่อคอลัมน์ในตารางใหม่
    protected $fillable = [
        'scd_year_id', 
        'title', 
        'content', 
        'cover_image', 
        'view_count',
        'rating',
    ];

    // 1 ข่าว ผูกได้หลาย SDG (ผ่านตาราง Pivot: news_sdg)
    public function sdgs()
    {
        return $this->belongsToMany(Sdg::class, 'news_sdg');
    }

    // 1 ข่าว มีไฟล์แนบ (PDF/Images) ได้หลายไฟล์
    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
    
    // ผูกกับตารางปี (ScdYear)
    public function scdYear()
    {
        return $this->belongsTo(ScdYear::class, 'scd_year_id');
    }
}