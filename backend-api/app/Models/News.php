<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 
        'title', 
        'detail', 
        'picture', 
        'year'
    ];

    // สร้างความสัมพันธ์ ข่าว 1 ข่าว อยู่ใน 1 หมวดหมู่
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}