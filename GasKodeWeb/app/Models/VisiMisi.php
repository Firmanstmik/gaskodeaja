<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisiMisi extends Model
{
    use HasFactory;

    protected $table = 'visi_misis';

    protected $fillable = [
        'tipe',
        'konten',
        'urutan'
    ];
    protected $casts = [
    'konten' => 'json',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
}
