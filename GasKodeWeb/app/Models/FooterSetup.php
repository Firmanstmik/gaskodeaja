<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetup extends Model
{
    protected $fillable = [
        'brand_name', 'brand_logo_path', 'short_description', 
        'address', 'email', 'phone', 'social_links', 'copyright_text'
    ];

    protected $casts = [
        'social_links' => 'array'
    ];
}
