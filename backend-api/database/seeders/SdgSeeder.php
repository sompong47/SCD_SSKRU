<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sdg;

class SdgSeeder extends Seeder
{
    public function run()
    {
        $sdgs = [
            ['sdg_number' => 1, 'title' => 'ขจัดความยากจน', 'color_code' => '#E5243B'],
            ['sdg_number' => 2, 'title' => 'ขจัดความหิวโหย', 'color_code' => '#DDA63A'],
            ['sdg_number' => 3, 'title' => 'การมีสุขภาพและความเป็นอยู่ที่ดี', 'color_code' => '#4C9F38'],
            ['sdg_number' => 4, 'title' => 'การศึกษาที่เท่าเทียม', 'color_code' => '#C5192D'],
            ['sdg_number' => 5, 'title' => 'ความเท่าเทียมทางเพศ', 'color_code' => '#FF3A21'],
            ['sdg_number' => 6, 'title' => 'การจัดการน้ำและสุขาภิบาล', 'color_code' => '#26BDE2'],
            ['sdg_number' => 7, 'title' => 'พลังงานสะอาดที่ทุกคนเข้าถึงได้', 'color_code' => '#FCC30B'],
            ['sdg_number' => 8, 'title' => 'การจ้างงานที่มีคุณค่าและการเติบโตทางเศรษฐกิจ', 'color_code' => '#A21942'],
            ['sdg_number' => 9, 'title' => 'อุตสาหกรรม นวัตกรรม โครงสร้างพื้นฐาน', 'color_code' => '#FD6925'],
            ['sdg_number' => 10, 'title' => 'ลดความเหลื่อมล้ำ', 'color_code' => '#DD1367'],
            ['sdg_number' => 11, 'title' => 'เมืองและถิ่นฐานมนุษย์อย่างยั่งยืน', 'color_code' => '#FD9D24'],
            ['sdg_number' => 12, 'title' => 'แผนการบริโภคและการผลิตที่ยั่งยืน', 'color_code' => '#BF8B2E'],
            ['sdg_number' => 13, 'title' => 'การรับมือการเปลี่ยนแปลงสภาพภูมิอากาศ', 'color_code' => '#3F7E44'],
            ['sdg_number' => 14, 'title' => 'การใช้ประโยชน์จากมหาสมุทรและทรัพยากรทางทะเล', 'color_code' => '#0A97D9'],
            ['sdg_number' => 15, 'title' => 'การใช้ประโยชน์จากระบบนิเวศทางบก', 'color_code' => '#56C02B'],
            ['sdg_number' => 16, 'title' => 'สังคมสงบสุข ยุติธรรม ไม่แบ่งแยก', 'color_code' => '#00689D'],
            ['sdg_number' => 17, 'title' => 'ความร่วมมือเพื่อการพัฒนาที่ยั่งยืน', 'color_code' => '#19486A'],
        ];

        foreach ($sdgs as $sdg) {
            Sdg::updateOrCreate(
                ['sdg_number' => $sdg['sdg_number']], // เช็คว่ามีเลขนี้อยู่แล้วหรือยัง ถ้ายังให้สร้างใหม่
                ['title' => $sdg['title'], 'color_code' => $sdg['color_code'], 'rating' => 0]
            );
        }
    }
}