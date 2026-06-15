"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageSdgRating() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [years, setYears] = useState<any[]>([]);
  const [sdgs, setSdgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ตัวแปรสำหรับตัวกรอง (Filter)
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterSdg, setFilterSdg] = useState<string>('');

  const fetchData = async () => {
    try {
      const [resNews, resYears, resSdgs] = await Promise.all([
        axios.get('http://localhost:8000/api/news'),
        axios.get('http://localhost:8000/api/scd/years'),
        axios.get('http://localhost:8000/api/sdgs')
      ]);
      setNewsList(resNews.data);
      setYears(resYears.data);
      setSdgs(resSdgs.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ฟังก์ชันกดให้ดาว (บันทึกลงฐานข้อมูลทันทีแบบไม่ต้องกดปุ่ม Save)
  const handleRating = async (newsId: number, newRating: number) => {
    // อัปเดตหน้าจอทันทีให้ดูสมูท (Optimistic UI)
    setNewsList(prev => prev.map(news => news.id === newsId ? { ...news, rating: newRating } : news));

    try {
      await axios.post(`http://localhost:8000/api/news/${newsId}/rating`, { rating: newRating });
    } catch (error) {
      alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกเรตติ้งได้');
      fetchData(); // ดึงข้อมูลกลับมาใหม่ถ้าบันทึกไม่สำเร็จ
    }
  };

  // กรองข้อมูลข่าวสารตามตัวกรองที่เลือก
  const filteredNews = newsList.filter(news => {
    const yearId = news.scd_year?.id || news.scdYear?.id || news.scd_year_id;
    const matchYear = filterYear ? yearId?.toString() === filterYear : true;
    
    // เช็คว่าข่าวนี้มี SDG ตรงกับที่เลือกกรองไหม
    const matchSdg = filterSdg ? news.sdgs?.some((s: any) => s.id.toString() === filterSdg) : true;
    
    return matchYear && matchSdg;
  });

  if (loading) return <div className="p-8 text-center animate-pulse text-gray-500 font-medium">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">ประเมินเรตติ้งโครงการย้อนหลัง (SDG Rating)</h1>
      <p className="text-gray-500 mb-8">จัดการและประเมินดาวให้กับข่าวสารหรือโครงการต่างๆ โดยสามารถกรองตามปี หรือเป้าหมาย SDG ได้</p>

      {/* 🟢 ส่วนตัวกรองข้อมูล (Filters) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-1">📅 กรองตามปีข้อมูล</label>
          <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#D4AF37]">
            <option value="">-- แสดงทุกปี --</option>
            {years.map(y => <option key={y.id} value={y.id}>ปี {y.year}</option>)}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-1">📌 กรองตามเป้าหมาย SDG</label>
          <select value={filterSdg} onChange={e => setFilterSdg(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#D4AF37]">
            <option value="">-- แสดงทุกเป้าหมาย SDG --</option>
            {sdgs.map(sdg => <option key={sdg.id} value={sdg.id}>SDG {sdg.sdg_number}: {sdg.title}</option>)}
          </select>
        </div>
      </div>

      {/* 🟢 ตารางแสดงข้อมูลและให้เรตติ้ง */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-1/2">หัวข้อข่าว / โครงการ</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ปีข้อมูล</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">SDG ที่เกี่ยวข้อง</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center w-48">⭐ ประเมินเรตติ้ง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNews.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</td></tr>
              ) : (
                filteredNews.map(news => (
                  <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                    
                    <td className="px-6 py-4 font-medium text-gray-800">
                      <div className="line-clamp-2">{news.title}</div>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ปี {news.scd_year?.year || news.scdYear?.year || news.year?.year || '-'}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {news.sdgs?.map((sdg: any) => (
                          <span key={sdg.id} className="text-[10px] text-white px-2 py-1 rounded" style={{ backgroundColor: sdg.color_code || '#666' }} title={sdg.title}>
                            SDG {sdg.sdg_number}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* 🟢 ระบบคลิกให้ดาว (บันทึกอัตโนมัติ) */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1 bg-yellow-50 px-2 py-1.5 rounded-full border border-yellow-100">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star} 
                            onClick={() => handleRating(news.id, star)}
                            className={`w-6 h-6 focus:outline-none transition-transform hover:scale-125 ${star <= (news.rating || 0) ? 'text-yellow-500 drop-shadow-sm' : 'text-gray-300 hover:text-yellow-300'}`}
                            title={`ให้ ${star} ดาว`}
                          >
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                          </button>
                        ))}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}