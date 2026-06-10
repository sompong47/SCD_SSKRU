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
    Schema::create('scd_years', function (Blueprint $table) {
        $table->id();
        $table->string('year'); // เช่น 2025, 2026
        $table->string('cover_image')->nullable(); // รูปหน้าปกของปีนั้นๆ
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scd_years');
    }
};
