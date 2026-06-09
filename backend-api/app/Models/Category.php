<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // สร้างความสัมพันธ์ 1 หมวดหมู่ มีได้หลายข่าว
    public function news()
    {
        return $this->hasMany(News::class);
    }
}