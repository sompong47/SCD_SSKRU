"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

// สร้าง Interface เพื่อบอกว่าข้อมูลปีที่ดึงมามีหน้าตาแบบไหน
interface ScdYear {
  id: number;
  year: string;
  cover_image: string | null;
  created_at: string;
}

export default function ScdIndicators() {
  const [years, setYears] = useState<ScdYear[]>([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก API เมื่อเปิดหน้านี้
  useEffect(() => {
    axios.get('http://localhost:8000/api/scd/years')
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center text-[#D4AF37] text-sm mb-6 flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
          จำนวนผู้ชม : 420
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-medium text-[#D4AF37] mb-4">
            Sustainable Community Development (SCD)
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Si Sa Ket Rajabhat University and Sustainable Community Development
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-400 w-16"></div>
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zM15.89 18.52A7.957 7.957 0 0019 12c0-4.08-3.05-7.44-7-7.93v2c0 .55-.45 1-1 1H9v2h4c.55 0 1 .45 1 1v2h2v1.52z"/></svg>
            <div className="h-px bg-gray-400 w-16"></div>
          </div>

          <h2 className="text-xl md:text-2xl text-gray-500">
            มหาวิทยาลัยพัฒนาชุมชนท้องถิ่นยั่งยืน
          </h2>
        </div>

        {/* ตรวจสอบว่ากำลังโหลดข้อมูลอยู่หรือไม่ */}
        {loading ? (
          <div className="text-center py-20 text-[#D4AF37] animate-pulse">
            กำลังโหลดข้อมูล...
          </div>
        ) : years.length === 0 ? (
          <div className="text-center py-20 text-gray-400 border rounded-lg">
            ยังไม่มีข้อมูลตัวชี้วัดในระบบ
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* นำข้อมูล years จาก Database มา Loop แสดงผล */}
            {years.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col md:flex-row bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full md:w-[280px] h-48 md:h-[160px] flex-shrink-0">
                  {item.cover_image ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${item.cover_image}`} 
                      alt={`SCD SSKRU ${item.year}`} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      รูปภาพปี {item.year}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-medium text-[#D4AF37] mb-2">
                    SCD SSKRU {item.year}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    ข้อมูลประจำปี {item.year}
                  </p>
                  <Link 
                    href={`/scd-indicators/${item.year}`} 
                    className="text-sm font-bold text-[#D4AF37] hover:text-[#B8962E] transition-colors"
                  >
                    Read More »
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}