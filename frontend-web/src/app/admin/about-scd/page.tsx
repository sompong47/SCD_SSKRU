"use client";

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function ManageAboutScd() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const file1Ref = useRef<HTMLInputElement>(null);
  const file2Ref = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ title: '', description: '' });
  const [currentImage1, setCurrentImage1] = useState<string | null>(null);
  const [currentImage2, setCurrentImage2] = useState<string | null>(null);
  const [newImage1, setNewImage1] = useState<File | null>(null);
  const [newImage2, setNewImage2] = useState<File | null>(null);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/about-scd')
      .then(res => {
        setFormData({ title: res.data.title || '', description: res.data.description || '' });
        setCurrentImage1(res.data.image);
        setCurrentImage2(res.data.image_secondary);
      })
      .catch(err => console.error(err))
      .finally(() => setFetching(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (newImage1) data.append('image', newImage1);
      if (newImage2) data.append('image_secondary', newImage2);

      await axios.post('http://localhost:8000/api/about-scd', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('อัปเดตข้อมูลสำเร็จ!');
      fetchData();
      setNewImage1(null); setNewImage2(null);
      if (file1Ref.current) file1Ref.current.value = '';
      if (file2Ref.current) file2Ref.current.value = '';
    } catch (error) {
      alert('เกิดข้อผิดพลาด');
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="p-8 text-center animate-pulse">กำลังโหลด...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">จัดการหน้าเกี่ยวกับโครงการ (About SCD)</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">หัวข้อหลัก</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">รายละเอียดเนื้อหา</label>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={8} className="w-full border rounded-lg px-4 py-2" required />
        </div>

        {/* รูปภาพที่ 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">รูปภาพที่ 1 (บน)</label>
            {currentImage1 && <img src={`http://localhost:8000/storage/${currentImage1}`} className="h-32 mb-2 rounded" />}
            <input type="file" ref={file1Ref} onChange={(e) => setNewImage1(e.target.files ? e.target.files[0] : null)} className="text-xs" />
          </div>

          {/* รูปภาพที่ 2 (เพิ่มใหม่) */}
          <div>
            <label className="block text-sm font-medium mb-2">รูปภาพที่ 2 (ล่าง)</label>
            {currentImage2 && <img src={`http://localhost:8000/storage/${currentImage2}`} className="h-32 mb-2 rounded" />}
            <input type="file" ref={file2Ref} onChange={(e) => setNewImage2(e.target.files ? e.target.files[0] : null)} className="text-xs" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#2f9e76] text-white py-3 rounded-lg">บันทึกข้อมูล</button>
      </form>
    </div>
  );
}