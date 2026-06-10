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
    Schema::create('scd_contents', function (Blueprint $table) {
        $table->id();
        // เชื่อม Foreign Key ไปยังตารางปี และตารางหมวดหมู่
        $table->foreignId('scd_year_id')->constrained('scd_years')->onDelete('cascade');
        $table->foreignId('scd_category_id')->constrained('scd_categories')->onDelete('cascade');
        $table->string('title'); // เช่น SCD 1 Policy (นโยบาย)
        $table->string('subtitle')->nullable(); // เช่น a. Number of policies...
        $table->string('content_title')->nullable(); // เช่น นโยบายสภามหาวิทยาลัยราชภัฏศรีสะเกษ
        $table->text('detail'); // เนื้อหาแบบยาว (Text)
        $table->string('image')->nullable(); // รูปภาพประกอบเนื้อหาด้านใน
        $table->integer('view_count')->default(0); // ตัวนับจำนวนผู้ชมจริง
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scd_contents');
    }
};
