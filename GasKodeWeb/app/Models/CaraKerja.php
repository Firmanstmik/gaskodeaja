<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CaraKerja extends Model
{
    use HasFactory;

    protected $table = 'cara_kerjas';

    protected $fillable = [
        'list',
    ];
}
