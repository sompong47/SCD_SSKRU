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
        Schema::table('users', function (Blueprint $table) {
            // เพิ่มสถานะ is_active ให้ค่าเริ่มต้นเป็น 1 (ใช้งานได้)
            $table->boolean('is_active')->default(1)->after('password');
            // ถ้าอยากให้มี role ก็เพิ่มได้ เช่น 'admin', 'user'
            $table->string('role')->default('user')->after('is_active'); 
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_active', 'role']);
        });
    }
};
