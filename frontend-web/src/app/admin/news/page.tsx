"use client";

import Link from 'next/link'; // 🟢 เพิ่ม import Link
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function ManageNews() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [years, setYears] = useState<any[]>([]);
  const [sdgs, setSdgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🟢 เพิ่ม external_link ลงใน state formData
  const [formData, setFormData] = useState({ scd_year_id: '', title: '', content: '', external_link: '' });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

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
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSdgChange = (id: number) => {
    setSelectedSdgs(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้? (ไฟล์แนบและรูปภาพจะถูกลบไปด้วย)')) return;
    
    try {
      await axios.delete(`http://localhost:8000/api/news/${id}`);
      fetchData();
    } catch (error) {
      alert('ลบข้อมูลไม่สำเร็จ หรือเกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSdgs.length === 0) return alert('กรุณาเลือก SDG อย่างน้อย 1 ข้อครับ');
    
    setLoading(true);
    try {
      const data = new FormData();
      data.append('scd_year_id', formData.scd_year_id);
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('external_link', formData.external_link); // 🟢 ส่งลิงก์ไปด้วย
      
      if (coverImage) data.append('cover_image', coverImage);
      
      selectedSdgs.forEach(id => data.append('sdgs[]', id.toString()));
      attachments.forEach(file => data.append('attachments[]', file));

      await axios.post('http://localhost:8000/api/news', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('บันทึกข่าวสารและโครงการเรียบร้อยแล้ว!');
      fetchData(); 
      
      // 🟢 เคลียร์ฟอร์มให้ว่างเปล่า
      setFormData({ scd_year_id: '', title: '', content: '', external_link: '' });
      setSelectedSdgs([]);
      setAttachments([]);
      setCoverImage(null);
      if (coverInputRef.current) coverInputRef.current.value = '';
      if (attachInputRef.current) attachInputRef.current.value = '';

    } catch (error: any) {
      alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.message || 'ไม่สามารถบันทึกได้'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">จัดการข่าวสารและโครงการ (News & SDGs)</h1>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-bold mb-6 border-b pb-2 text-[#2f9e76]">📝 แบบฟอร์มเพิ่มข่าว/โครงการใหม่</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">ปีที่เกี่ยวข้อง *</label>
              <select required value={formData.scd_year_id} onChange={e => setFormData({...formData, scd_year_id: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#D4AF37]">
                <option value="">-- เลือกปี --</option>
                {years.map(y => <option key={y.id} value={y.id}>ปี {y.year}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">หัวข้อข่าว/โครงการ *</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="กรอกหัวข้อ..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">รายละเอียดเนื้อหาข่าว *</label>
            <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none" placeholder="พิมพ์เนื้อหาที่นี่..."></textarea>
          </div>

          {/* 🟢 เพิ่มช่องใส่ลิงก์ */}
          <div>
            <label className="block text-sm font-medium mb-1">🔗 ลิงก์อ้างอิง / วิดีโอ (ถ้ามี)</label>
            <input type="url" value={formData.external_link} onChange={e => setFormData({...formData, external_link: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="เช่น https://youtube.com/..." />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold mb-3 text-gray-700">📌 เลือกเป้าหมาย SDG ที่เกี่ยวข้อง (เลือกได้มากกว่า 1 ข้อ) *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sdgs.map(sdg => (
                <label key={sdg.id} className={`flex items-start gap-2 p-2 rounded cursor-pointer border transition-colors ${selectedSdgs.includes(sdg.id) ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:bg-gray-100'}`}>
                  <input type="checkbox" checked={selectedSdgs.includes(sdg.id)} onChange={() => handleSdgChange(sdg.id)} className="mt-1 w-4 h-4 text-[#2f9e76] rounded" />
                  <span className="text-xs font-medium leading-tight text-gray-700">SDG {sdg.sdg_number}: {sdg.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">🖼️ รูปภาพหน้าปก (Cover)</label>
              <input type="file" accept="image/*" ref={coverInputRef} onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">📎 ไฟล์แนบเพิ่มเติม (PDF/รูปภาพ เลือกพร้อมกันได้หลายไฟล์)</label>
              <input type="file" multiple accept=".pdf,image/*" ref={attachInputRef} onChange={e => setAttachments(Array.from(e.target.files || []))} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm" />
              <p className="text-xs text-gray-500 mt-1">กด Ctrl ค้างไว้เพื่อเลือกหลายไฟล์ (ไม่เกิน 2MB/ไฟล์)</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="bg-[#2f9e76] hover:bg-[#26805f] text-white px-8 py-3 rounded-lg font-medium shadow-md transition-colors">
              {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูลข่าว'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">รูปปก</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">หัวข้อข่าว</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ปีข้อมูล</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Tag SDGs</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">เรตติ้งปัจจุบัน</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ไฟล์แนบ</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {newsList.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">ยังไม่มีข้อมูลข่าวสาร</td></tr>
              ) : (
                newsList.map(news => (
                  <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {news.cover_image ? (
                        <img src={`http://localhost:8000/storage/${news.cover_image}`} alt="cover" className="w-16 h-16 object-cover rounded shadow-sm" />
                      ) : <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">ไม่มีรูป</div>}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 line-clamp-2">{news.title}</td>
                    
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ปี {news.scd_year?.year || news.scdYear?.year || news.year?.year || '-'}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {news.sdgs?.map((sdg: any) => (
                          <span key={sdg.id} className="text-[10px] text-white px-2 py-1 rounded" style={{ backgroundColor: sdg.color_code || '#666' }}>
                            SDG {sdg.sdg_number}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-yellow-500 font-medium">
                      {news.rating ? "⭐".repeat(news.rating) : <span className="text-gray-400 text-xs">ยังไม่ประเมิน</span>}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {news.attachments?.length || 0} ไฟล์
                    </td>

                    {/* 🟢 ปรับเปลี่ยนคอลัมน์ จัดการ ให้มีปุ่ม แก้ไข และ ลบ */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link 
                          href={`/admin/news/${news.id}/edit`} 
                          className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded transition-colors text-sm font-medium border border-transparent hover:border-blue-200"
                        >
                          แก้ไข
                        </Link>
                        <button 
                          onClick={() => handleDelete(news.id)} 
                          className="text-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm font-medium border border-transparent hover:border-red-200"
                        >
                          ลบ
                        </button>
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