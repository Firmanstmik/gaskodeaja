<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'title', 'slug', 'excerpt', 
        'content', 'meta_title', 'meta_description', 'status'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($post) {
            $post->slug = $post->slug ?? Str::slug($post->title);
        });
    }
}
