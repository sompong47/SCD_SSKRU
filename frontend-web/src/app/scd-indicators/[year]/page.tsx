"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

// กำหนดหน้าตาข้อมูลที่จะได้รับจาก API
interface Category {
  id: number;
  name: string;
  description: string;
}

interface ScdContent {
  id: number;
  scd_year_id: number;
  scd_category_id: number;
  title: string;
  category: Category; // ข้อมูลหมวดหมู่ที่พ่วงมาด้วย
}

export default function ScdYearlyCategories() {
  const params = useParams();
  const year = params.year; // ดึงค่าปีจาก URL เช่น 2025

  const [contents, setContents] = useState<ScdContent[]>([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก API ตามปีที่เลือก
  useEffect(() => {
    if (!year) return;
    
    axios.get(`http://localhost:8000/api/scd/years/${year}`)
      .then((response) => {
        setContents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* หัวข้อหน้า */}
        <div className="text-center mb-12">
          <Link href="/scd-indicators" className="text-sm text-gray-400 hover:text-[#D4AF37] mb-4 inline-block transition-colors">
            ← ย้อนกลับไปหน้ารวมปี
          </Link>
          <h1 className="text-2xl md:text-3xl font-medium text-[#D4AF37] mb-2">
            Sustainable Community Development (SCD) {year}
          </h1>
          <p className="text-gray-500 mb-6">Si Sa Ket Rajabhat University and Sustainable Community Development</p>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-4"></div>
          <h2 className="text-lg text-gray-600">มหาวิทยาลัยพัฒนาชุมชนท้องถิ่นยั่งยืน</h2>
        </div>

        {/* ตรวจสอบสถานะการโหลด */}
        {loading ? (
          <div className="text-center py-20 text-[#D4AF37] animate-pulse">
            กำลังโหลดข้อมูลหมวดหมู่...
          </div>
        ) : contents.length === 0 ? (
          <div className="text-center py-20 text-gray-400 border rounded-lg">
            ยังไม่มีข้อมูลหมวดหมู่สำหรับปี {year}
          </div>
        ) : (
          /* Grid แสดงหมวดหมู่ (ดึงข้อมูลจริงจาก DB) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {contents.map((item) => (
              <Link 
                href={`/scd-indicators/${year}/${item.scd_category_id}`} 
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all overflow-hidden group"
              >
                {/* รูปภาพหมวดหมู่ (ตอนนี้ใช้สีเทาเป็น Placeholder) */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 transition-colors group-hover:bg-gray-50">
                  <svg className="w-12 h-12 text-gray-300 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 group-hover:text-[#D4AF37] transition-colors mb-2 text-sm">
                    {item.category?.name || 'ไม่มีชื่อหมวดหมู่'}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.category?.description || 'ไม่มีคำอธิบาย'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}