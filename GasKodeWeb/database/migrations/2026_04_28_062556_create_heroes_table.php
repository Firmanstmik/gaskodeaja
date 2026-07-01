<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Contoh: Jasa Pembuatan Website Profesional di Lombok
            $table->string('subtitle'); // Contoh: Bangun kredibilitas bisnis Anda dengan website cepat dan SEO friendly.
            $table->string('image_path'); // URL atau path gambar hero
            $table->string('cta_text'); // Contoh: Konsultasi Sekarang
            $table->string('cta_link'); // Contoh: https://wa.me/628123...
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heroes');
    }
};
