<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
    {
        Schema::create('sdgs', function (Blueprint $table) {
            $table->id();
            $table->integer('sdg_number')->unique(); // เลข 1-17
            $table->string('title'); // ชื่อเป้าหมาย เช่น ขจัดความยากจน
            $table->string('color_code')->nullable(); // สีประจำ SDG
            $table->integer('rating')->default(0); // เรตติ้งดาว (0-5) แอดมินเป็นคนใส่
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sdgs');
    }
};
