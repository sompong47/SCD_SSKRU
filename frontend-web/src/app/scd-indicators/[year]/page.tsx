"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ScdYearlyCategories() {
  const params = useParams();
  const year = params.year; // ดึงปีมาจาก URL เช่น 2025

  // ข้อมูลจำลอง 7 หมวดหมู่ (รอเชื่อม API ภายหลัง)
  const categories = [
    { id: 1, name: "SCD 1 Policy SSKRU", desc: "นโยบายสภามหาวิทยาลัย...", img: "" },
    { id: 2, name: "SCD 2 Teaching and Learning", desc: "การเรียนการสอน...", img: "" },
    { id: 3, name: "SCD 3 Academic Services", desc: "การบริการวิชาการ...", img: "" },
    { id: 4, name: "SCD 4 Community Cultural", desc: "การทำนุบำรุงศิลปะ...", img: "" },
    { id: 5, name: "SCD 5 Research on Community", desc: "การวิจัยเพื่อชุมชน...", img: "" },
    { id: 6, name: "SCD 6 Alumni Working", desc: "ศิษย์เก่าที่ทำงาน...", img: "" },
    { id: 7, name: "SCD 7 Awards in Sustainable", desc: "รางวัลด้านการพัฒนา...", img: "" },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* หัวข้อ */}
        <div className="text-center mb-12">
          <div className="text-[#D4AF37] text-sm mb-4">จำนวนผู้ชม : 68</div>
          <h1 className="text-2xl md:text-3xl font-medium text-[#2f9e76] mb-2">
            Sustainable Community Development (SCD) {year}
          </h1>
          <p className="text-gray-500 mb-6">Si Sa Ket Rajabhat University and Sustainable Community Development</p>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <h2 className="text-lg text-gray-600">มหาวิทยาลัยพัฒนาชุมชนท้องถิ่นยั่งยืน</h2>
        </div>

        {/* Grid แสดง 7 หมวดหมู่ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              href={`/scd-indicators/${year}/${cat.id}`} 
              key={cat.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              {/* รูปภาพหมวดหมู่ */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                [รูปภาพ {cat.name}]
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#2f9e76] group-hover:text-[#D4AF37] transition-colors mb-1 text-sm">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}