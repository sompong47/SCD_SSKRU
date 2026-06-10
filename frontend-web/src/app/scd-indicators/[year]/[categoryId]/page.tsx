"use client";

import { useParams } from 'next/navigation';

export default function ScdDetailContent() {
  const params = useParams();
  const year = params.year;
  const categoryId = params.categoryId;

  // ข้อมูลจำลอง (ของจริงจะดึงมาจาก API โดยส่ง year และ categoryId ไปหา)
  const content = {
    title: "SCD 1 Policy (นโยบาย)",
    subtitle: "a. Number of policies committed to community development",
    contentTitle: "นโยบายสภามหาวิทยาลัยราชภัฏศรีสะเกษ",
    detail: `ตามพระราชบัญญัติมหาวิทยาลัยราชภัฏ พ.ศ. 2547 มาตรา 7 ให้มหาวิทยาลัยเป็นสถาบันอุดมศึกษาเพื่อการพัฒนาท้องถิ่นที่เสริมสร้างพลังปัญญาของแผ่นดิน ฟื้นฟูพลังการเรียนรู้ เชิดชูภูมิปัญญาของท้องถิ่น สร้างสรรค์ศิลปวิทยา เพื่อความเจริญก้าวหน้าอย่างมั่นคงและยั่งยืนของปวงชน...`
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* หัวเรื่อง */}
        <div className="text-center mb-16">
          <div className="text-[#D4AF37] text-sm mb-4">จำนวนผู้ชม : 42</div>
          <h1 className="text-3xl md:text-5xl font-medium text-[#4b9eb6] mb-4">
            {content.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-[#4b9eb6]">
            {content.subtitle}
          </h2>
        </div>

        {/* แบ่งครึ่ง รูปภาพซ้าย เนื้อหาขวา */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* รูปภาพ */}
          <div className="rounded-lg overflow-hidden shadow-lg border-4 border-white">
            <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500">
              [รูปภาพประกอบการประชุม/นโยบาย]
            </div>
          </div>

          {/* เนื้อหา */}
          <div>
            {/* เส้นขีดแนวตั้งสีเทา เหมือนในรูปต้นฉบับ */}
            <div className="border-l-4 border-gray-300 pl-6 mb-6">
              <h3 className="text-2xl text-[#4b9eb6] font-medium">
                {content.contentTitle}
              </h3>
            </div>
            
            <p className="text-gray-600 leading-loose text-sm md:text-base indent-8 text-justify">
              {content.detail}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}