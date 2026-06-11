<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ScdYear;
use App\Models\ScdCategory;
use App\Models\ScdContent;

class ScdSeeder extends Seeder
{
    public function run(): void
    {
        // 1. จำลองข้อมูลปี
        $year2025 = ScdYear::create(['year' => '2025']);
        $year2024 = ScdYear::create(['year' => '2024']);

        // 2. จำลองข้อมูลหมวดหมู่ทั้ง 7 ด้าน
        $categories = [
            'SCD 1 Policy SSKRU',
            'SCD 2 Teaching and Learning',
            'SCD 3 Academic Services',
            'SCD 4 Community Cultural',
            'SCD 5 Research on Community',
            'SCD 6 Alumni Working',
            'SCD 7 Awards in Sustainable'
        ];

        $createdCategories = [];
        foreach ($categories as $catName) {
            $createdCategories[] = ScdCategory::create([
                'name' => $catName,
                'description' => 'รายละเอียดหมวดหมู่ ' . $catName
            ]);
        }

        // 3. จำลองเนื้อหาลงใน ปี 2025 สำหรับหมวดหมู่แรก (Policy)
        ScdContent::create([
            'scd_year_id' => $year2025->id,
            'scd_category_id' => $createdCategories[0]->id, // เชื่อมกับ SCD 1
            'title' => 'SCD 1 Policy (นโยบาย)',
            'subtitle' => 'a. Number of policies committed to community development',
            'content_title' => 'นโยบายสภามหาวิทยาลัยราชภัฏศรีสะเกษ',
            'detail' => 'ตามพระราชบัญญัติมหาวิทยาลัยราชภัฏ พ.ศ. 2547 มาตรา 7 ให้มหาวิทยาลัยเป็นสถาบันอุดมศึกษาเพื่อการพัฒนาท้องถิ่นที่เสริมสร้างพลังปัญญาของแผ่นดิน ฟื้นฟูพลังการเรียนรู้ เชิดชูภูมิปัญญาของท้องถิ่น สร้างสรรค์ศิลปวิทยา เพื่อความเจริญก้าวหน้าอย่างมั่นคงและยั่งยืนของปวงชน...',
            'view_count' => 420
        ]);
        
        // 4. จำลองเนื้อหาลงใน ปี 2024 (เพื่อทดสอบว่ามันแยกปีได้จริง)
        ScdContent::create([
            'scd_year_id' => $year2024->id,
            'scd_category_id' => $createdCategories[0]->id,
            'title' => 'SCD 1 Policy (นโยบาย) ปี 2024',
            'subtitle' => 'ผลการดำเนินงานด้านนโยบายปีเก่า',
            'content_title' => 'นโยบายสภามหาวิทยาลัย ปี 2567',
            'detail' => 'นี่คือข้อมูลจำลองของปีที่แล้ว เพื่อทดสอบว่าระบบสามารถแยกแยะข้อมูลตามปีได้อย่างถูกต้อง...',
            'view_count' => 150
        ]);
    }
}