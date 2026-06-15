<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sdg extends Model
{
    protected $fillable = ['sdg_number', 'title', 'color_code', 'rating'];
    // 1 SDG มีได้หลายข่าว
    public function news()
    {
        return $this->belongsToMany(News::class, 'news_sdg');
    }
}
