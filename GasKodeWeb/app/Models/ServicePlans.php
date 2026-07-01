<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePlans extends Model
{
    protected $fillable = [
        'service_id', 'name', 'price', 'features', 'maintenance_cost', 'is_featured'
    ];

    protected $casts = [
        'features' => 'array', // Sangat penting untuk kolom JSON
        'price' => 'float',
        'maintenance_cost' => 'float',
        'is_featured' => 'boolean',
    ];
}
