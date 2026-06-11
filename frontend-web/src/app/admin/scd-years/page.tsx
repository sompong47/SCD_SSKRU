"use client";

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface ScdYear {
  id: number;
  year: string;
  cover_image: string | null;
  created_at: string;
}

export default function ManageScdYears() {
  const [years, setYears] = useState<ScdYear[]>([]);
  const [newYear, setNewYear] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // ใช้ useRef เพื่อเคลียร์ช่องเลือกไฟล์ภาพหลังจากกดบันทึกเสร็จ
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchYears = () => {
    axios.get('http://localhost:8000/api/scd/years')
      .then(res => setYears(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleAddYear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYear) return alert('กรุณากรอกปีข้อมูล!');

    setLoading(true);
    try {
      // ใช้ FormData ในการแพ็คข้อมูลตัวหนังสือและไฟล์ภาพรวมกัน
      const formData = new FormData();
      formData.append('year', newYear);
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }

      await axios.post('http://localhost:8000/api/scd/years', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // บอกเซิร์ฟเวอร์ว่ามีไฟล์แนบมาด้วย
        },
      });

      // เคลียร์ค่าฟอร์ม
      setNewYear('');
      setCoverImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      fetchYears(); // โหลดข้อมูลใหม่
      alert('เพิ่มปีข้อมูลพร้อมรูปหน้าปกสำเร็จ!');
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล หรือไฟล์รูปอาจจะใหญ่เกิน 2MB');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, yearLabel: string) => {
    if (!confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบปี ${yearLabel}?`)) return;

    try {
      await axios.delete(`http://localhost:8000/api/scd/years/${id}`);
      fetchYears();
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">จัดการปีข้อมูลตัวชี้วัด (SCD Years)</h1>

      {/* กล่องฟอร์มเพิ่มข้อมูล */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">เพิ่มปีข้อมูลใหม่</h2>
        <form onSubmit={handleAddYear} className="flex flex-col md:flex-row gap-4 items-start">
          
          <div className="flex-1 w-full">
            <label className="block text-sm text-gray-500 mb-1">ปีข้อมูล (เช่น 2026)</label>
            <input 
              type="number" 
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              required
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm text-gray-500 mb-1">รูปหน้าปก (ไม่บังคับ)</label>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-1.5 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-white hover:file:bg-[#b8962e] cursor-pointer"
            />
          </div>

          <div className="mt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto bg-[#2f9e76] hover:bg-[#26805f] text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              {loading ? 'กำลังบันทึก...' : '+ บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 w-24">รูปหน้าปก</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">ปีข้อมูล (Year)</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {years.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">ยังไม่มีข้อมูล</td>
              </tr>
            ) : (
              years.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    {item.cover_image ? (
                      <img 
                        src={`http://localhost:8000/storage/${item.cover_image}`} 
                        alt={`Cover ${item.year}`}
                        className="w-16 h-12 object-cover rounded shadow-sm border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 rounded border border-gray-200">
                        ไม่มีรูป
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-[#D4AF37] text-lg">{item.year}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(item.id, item.year)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      ลบข้อมูล
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}