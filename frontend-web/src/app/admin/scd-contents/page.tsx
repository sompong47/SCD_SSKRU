"use client";

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function ManageScdContents() {
  const [years, setYears] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🟢 เพิ่ม State สำหรับเช็คว่าตอนนี้กำลัง "เพิ่มใหม่" หรือ "แก้ไข"
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    scd_year_id: '',
    scd_category_id: '',
    title: '',
    subtitle: '',
    content_title: '',
    detail: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const [resYears, resCats, resContents] = await Promise.all([
        axios.get('http://localhost:8000/api/scd/years'),
        axios.get('http://localhost:8000/api/scd/categories'),
        axios.get('http://localhost:8000/api/scd/contents')
      ]);
      setYears(resYears.data);
      setCategories(resCats.data);
      setContents(resContents.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 ฟังก์ชันเมื่อกดปุ่ม "แก้ไข" ที่ตาราง
  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setFormData({
      scd_year_id: item.scd_year_id || '',
      scd_category_id: item.scd_category_id || '',
      title: item.title || '',
      subtitle: item.subtitle || '',
      content_title: item.content_title || '',
      detail: item.detail || '',
    });
    // เลื่อนหน้าจอขึ้นไปข้างบนสุดเพื่อให้เห็นฟอร์ม
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🟢 ฟังก์ชันยกเลิกการแก้ไข
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ scd_year_id: '', scd_category_id: '', title: '', subtitle: '', content_title: '', detail: '' });
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // เช็คว่าค่าไม่ว่างเปล่า ถึงจะส่งไป
        if (value !== null && value !== undefined) {
          data.append(key, value as string);
        }
      });
      if (image) data.append('image', image);

      // 🟢 เช็คว่าถ้ามี editingId ให้ทำงานโหมด "แก้ไข" ถ้าไม่มีให้ "เพิ่มใหม่"
      if (editingId) {
        await axios.post(`http://localhost:8000/api/scd/contents/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('อัปเดตข้อมูลสำเร็จ!');
      } else {
        await axios.post('http://localhost:8000/api/scd/contents', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('เพิ่มเนื้อหาสำเร็จ!');
      }

      cancelEdit(); // เคลียร์ฟอร์ม
      fetchData(); // โหลดตารางใหม่

    } catch (error: any) {
      console.error("Full Error:", error.response?.data);
      
      let errorMsg = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      
      // 🚨 เรดาร์จับ Error: ดึงข้อความแจ้งเตือนจาก Laravel มาโชว์ตรงๆ
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        errorMsg = "ข้อมูลไม่ถูกต้อง (422):\n" + Object.values(validationErrors).map((err: any) => err[0]).join('\n');
      } else if (error.response?.data?.message) {
        errorMsg = `ระบบหลังบ้านแจ้งเตือน (500):\n${error.response.data.message}`;
      }

      alert(errorMsg); // แสดง Alert บอกผู้ใช้
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบเนื้อหา "${title}"?`)) return;
    try {
      await axios.delete(`http://localhost:8000/api/scd/contents/${id}`);
      fetchData();
      if (editingId === id) cancelEdit(); // ถ้าลบตัวที่กำลังแก้อยู่ ให้เคลียร์ฟอร์มด้วย
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการลบ');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">จัดการเนื้อหาตัวชี้วัด (SCD Contents)</h1>

      {/* กล่องฟอร์ม */}
      <div className={`p-6 md:p-8 rounded-xl shadow-sm border mb-8 transition-colors duration-300 ${editingId ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'}`}>
        <h2 className={`text-lg font-bold mb-6 border-b pb-2 ${editingId ? 'text-amber-700 border-amber-200' : 'text-gray-700 border-gray-100'}`}>
          {editingId ? `✏️ แก้ไขเนื้อหา (ID: ${editingId})` : '📝 แบบฟอร์มเพิ่มเนื้อหาใหม่'}
        </h2>
        
        <form onSubmit={handleSubmitContent} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">เลือกปีข้อมูล *</label>
              <select name="scd_year_id" value={formData.scd_year_id} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] outline-none bg-white">
                <option value="">-- กรุณาเลือกปี --</option>
                {years.map(y => <option key={y.id} value={y.id}>ปี {y.year}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">เลือกหมวดหมู่ *</label>
              <select name="scd_category_id" value={formData.scd_category_id} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] outline-none bg-white">
                <option value="">-- กรุณาเลือกหมวดหมู่ --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">หัวข้อหลัก (Title) *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="เช่น SCD 1 Policy (นโยบาย)" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">หัวข้อรอง (Subtitle)</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="เช่น a. Number of policies..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">หัวข้อเนื้อหา (Content Title)</label>
              <input type="text" name="content_title" value={formData.content_title} onChange={handleInputChange} placeholder="เช่น นโยบายสภามหาวิทยาลัย..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">รายละเอียดเนื้อหา (Detail) *</label>
            <textarea name="detail" value={formData.detail} onChange={handleInputChange} required rows={5} placeholder="พิมพ์เนื้อหาที่นี่..." className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] outline-none resize-none"></textarea>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">รูปภาพประกอบ (เลือกใหม่เพื่อแทนที่รูปเดิม)</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-white cursor-pointer" />
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-4 gap-3">
            {/* 🟢 ปุ่มยกเลิก จะโผล่มาเฉพาะตอนแก้ไข */}
            {editingId && (
              <button type="button" onClick={cancelEdit} className="px-6 py-2.5 rounded-lg font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
                ยกเลิก
              </button>
            )}
            
            <button type="submit" disabled={loading} className={`px-8 py-2.5 rounded-lg font-medium text-white transition-colors ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#2f9e76] hover:bg-[#26805f]'}`}>
              {loading ? 'กำลังบันทึก...' : (editingId ? 'อัปเดตข้อมูล' : 'บันทึกเนื้อหา')}
            </button>
          </div>
        </form>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">ปี</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">หมวดหมู่</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">หัวข้อหลัก (Title)</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {contents.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">ยังไม่มีข้อมูล</td></tr>
            ) : (
              contents.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.scd_year?.year}</td>
                  <td className="px-6 py-4 text-sm text-[#4b9eb6]">{item.category?.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.title}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {/* 🟢 เพิ่มปุ่มแก้ไข */}
                    <button onClick={() => handleEditClick(item)} className="text-amber-500 hover:text-amber-600 text-sm font-medium transition-colors">แก้ไข</button>
                    <span className="text-gray-300">|</span>
                    <button onClick={() => handleDelete(item.id, item.title)} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">ลบ</button>
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