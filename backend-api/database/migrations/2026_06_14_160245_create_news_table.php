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
        Schema::dropIfExists('news');
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scd_year_id')->nullable()->constrained('scd_years')->onDelete('set null'); // ผูกกับตารางปีที่คุณมีอยู่แล้ว
            $table->string('title');
            $table->text('content')->nullable();
            $table->string('cover_image')->nullable();
            $table->integer('view_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
