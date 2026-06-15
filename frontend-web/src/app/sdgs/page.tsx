"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

// 🟢 แยก Component ย่อยออกมาเพื่อใช้งาน useSearchParams
function SdgGridContent() {
  const searchParams = useSearchParams();
  const yearFromUrl = searchParams.get('year') || ''; // อ่านค่า ?year=... จาก URL

  const [sdgs, setSdgs] = useState<any[]>([]);
  const [years, setYears] = useState<any[]>([]);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ตั้งค่าตัวกรองเริ่มต้นให้เท่ากับปีที่มาจาก URL
  const [filterYear, setFilterYear] = useState<string>(yearFromUrl);

  // 🟢 อัปเดตตัวกรองทันที ถ้าผู้ใช้คลิกเมนู Navbar ซ้ำขณะอยู่ในหน้านี้แล้ว
  useEffect(() => {
    setFilterYear(searchParams.get('year') || '');
  }, [searchParams]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8000/api/sdgs'),
      axios.get('http://localhost:8000/api/scd/years'),
      axios.get('http://localhost:8000/api/news')
    ])
    .then(([resSdgs, resYears, resNews]) => {
      setSdgs(resSdgs.data);
      const sortedYears = resYears.data.sort((a: any, b: any) => b.year - a.year);
      setYears(sortedYears);
      setNewsList(resNews.data);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  const getProjectCount = (sdgId: number) => {
    return newsList.filter(news => {
      const hasSdg = news.sdgs?.some((s: any) => s.id === sdgId);
      if (!hasSdg) return false;
      if (!filterYear) return true;
      const newsYearId = news.scd_year?.id || news.scdYear?.id || news.scd_year_id;
      return newsYearId?.toString() === filterYear;
    }).length;
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-800 mb-2">Sustainable Development Goals (SDGs)</h1>
          <h2 className="text-gray-500 text-lg">มหาวิทยาลัยราชภัฏศรีสะเกษ และการขับเคลื่อนเป้าหมายการพัฒนาที่ยั่งยืน</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <span className="text-gray-500 font-medium">SDG Info :</span>
          <div className="flex flex-wrap justify-center gap-2">
            {/* 🟢 ปุ่ม "ทั้งหมด" จะทำงานเมื่อ URL ไม่มีปี หรือผู้ใช้กดเคลียร์ */}
            <Link 
              href="/sdgs" 
              className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm ${!filterYear ? 'bg-[#5bc16c] text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
            >
              ทั้งหมด
            </Link>
            
            {/* 🟢 ปุ่มแยกตามปี ถ้าตรงกับ filterYear จะเปลี่ยนเป็นสีเขียวเข้ม */}
            {years.map(y => (
              <Link 
                key={y.id} 
                href={`/sdgs?year=${y.id}`} // เปลี่ยน URL เมื่อกดปุ่มปีบนหน้าเว็บ
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm ${filterYear === y.id.toString() ? 'bg-[#5bc16c] text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              >
                {y.year}
              </Link>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20 animate-pulse font-medium">กำลังโหลดข้อมูลการดำเนินงาน...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {sdgs.map(sdg => {
              const count = getProjectCount(sdg.id);
              
              return (
                <Link 
                  href={`/sdgs/${sdg.id}`} 
                  key={sdg.id}
                  className="group relative block w-full overflow-hidden transition-transform hover:scale-[1.02] hover:z-10 hover:shadow-xl rounded-sm"
                  style={{ backgroundColor: sdg.color_code }}
                >
                  <img 
                    src={`/sdg-icons/${sdg.sdg_number}.png`} 
                    alt={`SDG ${sdg.sdg_number}`} 
                    className="w-full h-auto object-cover relative z-0"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />

                  <div className="absolute top-2 right-3 md:top-3 md:right-4 text-right text-white z-10 drop-shadow-md">
                    <div className="text-xl md:text-2xl font-bold leading-none">{count}</div>
                    <div className="text-[10px] md:text-xs font-medium uppercase mt-0.5">Projects</div>
                  </div>
                  
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

// 🟢 Component หลักที่ Export ออกไป (ต้องครอบ Suspense เพื่อป้องกัน Error ของ useSearchParams ใน Next.js)
export default function SdgGridPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-gray-500">กำลังโหลด...</div>}>
      <SdgGridContent />
    </Suspense>
  );
}