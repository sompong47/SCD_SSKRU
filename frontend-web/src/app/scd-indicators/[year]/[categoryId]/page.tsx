"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

// กำหนด Interface ข้อมูลเนื้อหา
interface ScdDetail {
  id: number;
  title: string;
  subtitle: string;
  content_title: string;
  detail: string;
  image: string | null;
  view_count: number;
}

export default function ScdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { year, categoryId } = params;

  const [data, setData] = useState<ScdDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!year || !categoryId) return;

    // เรียก API ดึงข้อมูลละเอียด (ซึ่งฝั่ง Laravel จะบวกยอดวิวให้เราอัตโนมัติด้วย)
    axios.get(`http://localhost:8000/api/scd/years/${year}/category/${categoryId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching detail:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year, categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-[#D4AF37] animate-bounce font-medium text-lg">กำลังเปิดหน้าเนื้อหา...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <div className="text-gray-400">ไม่พบข้อมูลที่ต้องการ</div>
        <button onClick={() => router.back()} className="text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all">ย้อนกลับ</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ส่วนหัวหน้า: ชื่อเรื่องและยอดวิวคนดูจริง */}
        <div className="text-center mb-16">
          <div className="text-[#D4AF37] text-sm mb-6 flex justify-center items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
            จำนวนผู้ชม : {data.view_count} {/* ดึงยอดวิวจาก DB มาแสดง */}
          </div>
          <h1 className="text-3xl md:text-5xl font-medium text-[#4b9eb6] mb-4">
            {data.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-[#4b9eb6] opacity-80">
            {data.subtitle}
          </h2>
        </div>

        {/* เลย์เอาต์ 2 ฝั่ง: รูปซ้าย เนื้อหาขวา */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* ฝั่งรูปภาพประกอบ */}
          <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform">
            {data.image ? (
              <img 
                src={`http://localhost:8000/storage/${data.image}`} 
                alt={data.title} 
                className="w-full h-auto object-cover" 
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400 italic">
                [ ยังไม่มีรูปภาพประกอบเนื้อหา ]
              </div>
            )}
          </div>

          {/* ฝั่งเนื้อหาตัวอักษร */}
          <div className="flex flex-col">
            {/* หัวข้อเนื้อหาที่มีเส้นขีดข้างๆ สีเทา (ตามเรฟต้นฉบับ) */}
            <div className="border-l-8 border-gray-200 pl-6 mb-8">
              <h3 className="text-2xl text-[#4b9eb6] font-semibold leading-tight">
                {data.content_title}
              </h3>
            </div>
            
            {/* เนื้อหาแบบละเอียด (ตัวหนังสือคุมโทน Kanit อ่านง่าย) */}
            <p className="text-gray-600 leading-relaxed text-base md:text-lg indent-12 text-justify whitespace-pre-line">
              {data.detail}
            </p>

            <button 
              onClick={() => router.back()}
              className="mt-12 flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors font-medium self-start"
            >
              ← ย้อนกลับไปหน้าก่อนหน้า
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}