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
    Schema::table('news', function (Blueprint $table) {
        // เพิ่มช่องเก็บลิงก์ (เผื่อบางข่าวไม่มีลิงก์ เลยใส่ nullable ไว้)
        $table->text('external_link')->nullable()->after('content');
    });
}

    /**
     * Reverse the migrations.
     */
   public function down(): void
{
    Schema::table('news', function (Blueprint $table) {
        $table->dropColumn('external_link');
    });
}
};
