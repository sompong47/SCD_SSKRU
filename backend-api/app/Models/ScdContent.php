<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScdContent extends Model
{
    use HasFactory;

    protected $fillable = ['scd_year_id', 'scd_category_id', 'title', 'subtitle', 'content_title', 'detail', 'image', 'view_count'];

    public function category()
    {
        return $this->belongsTo(ScdCategory::class, 'scd_category_id');
    }

    public function scdYear()
    {
        return $this->belongsTo(ScdYear::class, 'scd_year_id');
    }
}