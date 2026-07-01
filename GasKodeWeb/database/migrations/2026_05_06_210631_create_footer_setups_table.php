<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_setups', function (Blueprint $table) {
            $table->id();
            $table->string('brand_name')->default('Gaskode');
            $table->string('brand_logo_path')->nullable();
            $table->text('short_description');
            $table->string('address')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->json('social_links')->nullable();
            $table->string('copyright_text')->default('© 2026 Gaskode. All rights reserved.');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_setups');
    }
};