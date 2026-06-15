"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id;

  const [years, setYears] = useState<any[]>([]);
  const [sdgs, setSdgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ข้อมูลฟอร์ม
  const [formData, setFormData] = useState({ scd_year_id: '', title: '', content: '', external_link: '' });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [existingCover, setExistingCover] = useState(''); // เก็บ URL ปกเดิม

  const coverInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/api/news/${newsId}`),
      axios.get('http://localhost:8000/api/scd/years'), 
      axios.get('http://localhost:8000/api/sdgs')
    ]).then(([resNews, resYears, resSdgs]) => {
      const n = resNews.data;
      setFormData({ 
        scd_year_id: n.scd_year_id || n.scdYear?.id || '', 
        title: n.title, 
        content: n.content,
        external_link: n.external_link || '' 
      });
      setExistingCover(n.cover_image);
      setSelectedSdgs(n.sdgs.map((s: any) => s.id));
      
      setYears(resYears.data);
      setSdgs(resSdgs.data);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [newsId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSdgs.length === 0) return alert('กรุณาเลือก SDG อย่างน้อย 1 ข้อ');
    
    setSaving(true);
    try {
      const data = new FormData();
      data.append('scd_year_id', formData.scd_year_id);
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('external_link', formData.external_link);
      
      if (coverImage) data.append('cover_image', coverImage);
      selectedSdgs.forEach(id => data.append('sdgs[]', id.toString()));
      attachments.forEach(file => data.append('attachments[]', file));

      // ใช้ API เส้นใหม่ที่เพิ่งสร้าง
      await axios.post(`http://localhost:8000/api/news/${newsId}/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('อัปเดตข้อมูลสำเร็จ!');
      router.push('/admin/news'); // กลับไปหน้าจัดการข่าว

    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setSaving(false);
    }
  };

  const handleSdgChange = (id: number) => {
    setSelectedSdgs(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  if (loading) return <div className="pt-20 text-center animate-pulse text-gray-500">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-bold text-gray-800">✏️ แก้ไขข่าวสาร/โครงการ</h1>
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 font-medium">✕ ยกเลิก</button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1">ปีที่เกี่ยวข้อง</label>
            <select required value={formData.scd_year_id} onChange={e => setFormData({...formData, scd_year_id: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 outline-none">
              <option value="">-- เลือกปี --</option>
              {years.map(y => <option key={y.id} value={y.id}>ปี {y.year}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">หัวข้อข่าว</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">รายละเอียดเนื้อหา</label>
          <textarea required rows={6} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none"></textarea>
        </div>

        {/* 🟢 ช่องใส่ลิงก์ที่เพิ่มมาใหม่ */}
        <div>
          <label className="block text-sm font-medium mb-1">🔗 ลิงก์อ้างอิง / วิดีโอ (ถ้ามี)</label>
          <input type="url" value={formData.external_link} onChange={e => setFormData({...formData, external_link: e.target.value})} placeholder="เช่น https://youtube.com/..." className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none" />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-bold mb-3 text-gray-700">📌 เป้าหมาย SDG</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sdgs.map(sdg => (
              <label key={sdg.id} className={`flex items-start gap-2 p-2 rounded cursor-pointer border ${selectedSdgs.includes(sdg.id) ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                <input type="checkbox" checked={selectedSdgs.includes(sdg.id)} onChange={() => handleSdgChange(sdg.id)} className="mt-1" />
                <span className="text-xs font-medium">SDG {sdg.sdg_number}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">🖼️ อัปเดตรูปปก (เลือกใหม่เพื่อเปลี่ยน)</label>
            {existingCover && <img src={`http://localhost:8000/storage/${existingCover}`} alt="old cover" className="h-20 w-auto mb-2 rounded shadow-sm object-cover" />}
            <input type="file" accept="image/*" ref={coverInputRef} onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)} className="w-full border text-sm rounded-lg px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">📸 เพิ่มรูปอัลบั้ม / ไฟล์แนบ (อัปโหลดเพิ่ม)</label>
            <input type="file" multiple accept=".pdf,image/*" ref={attachInputRef} onChange={e => setAttachments(Array.from(e.target.files || []))} className="w-full border text-sm rounded-lg px-2 py-1" />
            <p className="text-xs text-gray-400 mt-1">กด Ctrl ค้างเพื่อเลือกหลายรูปพร้อมกันเป็นอัลบั้ม</p>
          </div>
        </div>

        <button type="submit" disabled={saving} className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white py-3 rounded-lg font-bold text-lg shadow-md transition-colors">
          {saving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
        </button>
      </form>
    </div>
  );
}