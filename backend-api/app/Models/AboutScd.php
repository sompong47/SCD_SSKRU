<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutScd extends Model
{
    protected $fillable = ['title', 'description', 'image', 'image_secondary', 'view_count'];
    
}
