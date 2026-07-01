<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'category_id', 'title', 'client_name', 'image_thumbnail', 'problems', 'solutions', 'results'
    ];

    protected $casts = [
        'problems' => 'array',
        'solutions' => 'array',
        'results' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
