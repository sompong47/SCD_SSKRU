<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScdYear extends Model
{
    use HasFactory;

    protected $fillable = ['year', 'cover_image'];
}