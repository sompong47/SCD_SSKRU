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
        Schema::table('news', function (Blueprint $table) {
            // 🟢 เช็คก่อนว่ามีคอลัมน์ rating หรือยัง ถ้ายังไม่มีถึงจะสร้าง
            if (!Schema::hasColumn('news', 'rating')) {
                $table->integer('rating')->default(0)->after('view_count');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
   public function down(): void
   {
       Schema::table('news', function (Blueprint $table) {
           $table->dropColumn('rating'); // 🟢 ลบเวลาสั่ง rollback
       });
   }
};
