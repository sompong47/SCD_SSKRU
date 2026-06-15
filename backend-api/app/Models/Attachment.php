<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = ['news_id', 'file_name', 'file_path', 'file_type'];

    public function news()
    {
        return $this->belongsTo(News::class);
    }
}
