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
    Schema::create('scd_categories', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // เช่น SCD 1 Policy SSKRU
        $table->string('description')->nullable(); // คำอธิบายสั้นๆ ใต้หัวข้อ
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scd_categories');
    }
};
