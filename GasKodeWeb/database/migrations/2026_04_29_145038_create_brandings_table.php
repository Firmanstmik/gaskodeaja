<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('brandings', function (Blueprint $table) {
            $table->id();
            $table->enum('kategori',['opening','closing']);
            $table->string('pernyataan');
            $table->text('jawaban');
            $table->string('cta_text')->nullable();
            $table->string('cta_link')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('brandings');
    }
};
