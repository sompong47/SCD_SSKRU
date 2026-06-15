"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function SdgNewsPage() {
  const params = useParams();
  const sdgId = params.id; // ดึง ID จาก URL
  
  const [sdgDetail, setSdgDetail] = useState<any>(null);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sdgId) return;

    // ดึงข้อมูล SDG และข่าวที่เกี่ยวกับ SDG ข้อนี้
    Promise.all([
      axios.get('http://localhost:8000/api/sdgs'),
      axios.get(`http://localhost:8000/api/news?sdg_id=${sdgId}`) // 🟢 เรียก API ข่าวพร้อมส่ง ID ไปกรอง
    ])
    .then(([resSdgs, resNews]) => {
      const currentSdg = resSdgs.data.find((s: any) => s.id.toString() === sdgId);
      setSdgDetail(currentSdg);
      setNewsList(resNews.data);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));

  }, [sdgId]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500">กำลังโหลดข้อมูล...</div>;
  if (!sdgDetail) return <div className="min-h-screen pt-32 text-center text-red-500">ไม่พบข้อมูลเป้าหมาย SDG นี้</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      
      {/* 🟢 ส่วนหัว (Header) สีตาม SDG */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="rounded-2xl p-8 md:p-12 text-white shadow-lg flex flex-col md:flex-row items-center gap-8" style={{ backgroundColor: sdgDetail.color_code }}>
          <div className="w-24 h-24 shrink-0 bg-white/20 rounded-full flex items-center justify-center text-5xl font-bold border-4 border-white/40">
            {sdgDetail.sdg_number}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{sdgDetail.title}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/80 text-sm">
              <span className="bg-black/20 px-3 py-1 rounded-full">โครงการทั้งหมด: {newsList.length} โครงการ</span>
              <Link href="/sdgs" className="hover:text-white underline underline-offset-2 transition-colors">← กลับไปหน้าเป้าหมายทั้งหมด</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 ส่วนแสดงการ์ดข่าว */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {newsList.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg">ยังไม่มีโครงการหรือข่าวสารในเป้าหมายนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map(news => (
              <div key={news.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col">
                
                {/* รูปปกข่าว */}
                <div className="w-full aspect-[4/3] relative bg-gray-100">
                  {news.cover_image ? (
                    <Image src={`http://localhost:8000/storage/${news.cover_image}`} alt={news.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">ไม่มีรูปภาพ</div>
                  )}
                  {/* ป้ายแสดงดาว */}
                  {news.rating > 0 && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm text-xs font-bold text-yellow-500">
                      {"⭐".repeat(news.rating)}
                    </div>
                  )}
                </div>

                {/* เนื้อหาข่าว */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-[#5cb0d6] bg-blue-50 px-2 py-1 rounded">
                      ปี {news.scd_year?.year || news.scdYear?.year || news.year?.year || '-'}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      👁️ {news.view_count}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-3 leading-tight">{news.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">{news.content}</p>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-1">
                    {news.sdgs?.map((s: any) => (
                      <span key={s.id} className="text-[10px] text-white px-2 py-0.5 rounded" style={{ backgroundColor: s.color_code }}>
                        SDG {s.sdg_number}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}