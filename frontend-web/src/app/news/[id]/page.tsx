"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id;

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!newsId) return;

    axios.get(`http://localhost:8000/api/news/${newsId}`)
      .then(res => setNews(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [newsId]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500 animate-pulse font-medium">กำลังโหลดเนื้อหา...</div>;
  if (!news) return <div className="min-h-screen pt-32 text-center text-red-500">ไม่พบข้อมูลโครงการนี้</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🟢 ปุ่มย้อนกลับ */}
        <button onClick={() => router.back()} className="mb-6 text-[#5cb0d6] hover:text-[#4a90e2] flex items-center gap-2 font-medium transition-colors">
          ← ย้อนกลับ
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* 🟢 รูปภาพหน้าปก (ถ้ามี) */}
          {news.cover_image && (
            <div className="w-full aspect-[16/9] relative bg-gray-100">
              <Image 
                src={`http://localhost:8000/storage/${news.cover_image}`} 
                alt={news.title} 
                fill 
                className="object-cover" 
                unoptimized 
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* 🟢 หัวข้อข่าว และ ข้อมูลสถิติ */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-2">
                <span className="bg-blue-50 text-[#5cb0d6] px-3 py-1 rounded-full text-xs font-bold">
                  ปี {news.scd_year?.year || news.scdYear?.year || news.year?.year || '-'}
                </span>
                {news.rating > 0 && (
                  <span className="bg-yellow-50 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    ⭐ {news.rating} / 5
                  </span>
                )}
              </div>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                👁️ ยอดเข้าชม: {news.view_count} ครั้ง
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              {news.title}
            </h1>

            {/* 🟢 เนื้อหาข่าว (รองรับการขึ้นบรรทัดใหม่) */}
            <div className="prose max-w-none text-gray-600 text-base md:text-lg leading-relaxed mb-10 space-y-4">
              {news.content.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="indent-8">{paragraph}</p>
              ))}
            </div>

            {/* 🟢 ป้ายกำกับ SDG */}
            <div className="mb-8 border-t border-gray-100 pt-8">
              <h3 className="text-sm font-bold text-gray-700 mb-4">เป้าหมาย SDG ที่เกี่ยวข้อง:</h3>
              <div className="flex flex-wrap gap-2">
                {news.sdgs?.map((sdg: any) => (
                  <div key={sdg.id} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm" style={{ backgroundColor: sdg.color_code }}>
                    <span className="text-xl font-bold">{sdg.sdg_number}</span>
                    <span className="line-clamp-1">{sdg.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟢 ไฟล์แนบ (ดาวน์โหลด) */}
            {news.attachments && news.attachments.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-4">📎 เอกสาร / ไฟล์แนบเพิ่มเติม</h3>
                <ul className="space-y-3">
                  {news.attachments.map((file: any) => (
                    <li key={file.id}>
                      <a 
                        href={`http://localhost:8000/storage/${file.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[#5cb0d6] hover:text-[#4a90e2] transition-colors bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span className="font-medium text-sm truncate">{file.file_name || 'ดาวน์โหลดไฟล์แนบ'}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}