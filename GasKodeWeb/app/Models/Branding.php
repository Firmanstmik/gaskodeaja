<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branding extends Model
{
    use HasFactory;

    protected $table = 'brandings';

    protected $fillable = [
        'kategori',
        'pernyataan',
        'jawaban',
        'cta_text',
        'cta_link',
    ];

    protected $casts = [
        'jawaban' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
