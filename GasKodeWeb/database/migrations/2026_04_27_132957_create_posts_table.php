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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Penulis
            $table->foreignId('category_id')->constrained();
            $table->string('title'); // Harga Jasa Website di Lombok 2026
            $table->string('slug')->unique();
            $table->text('excerpt'); // Ringkasan untuk daftar blog
            $table->longText('content'); // Isi artikel (HTML/Markdown)
            $table->string('meta_title')->nullable(); // SEO Title
            $table->string('meta_description')->nullable(); // SEO Desc
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
