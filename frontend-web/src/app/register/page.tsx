"use client"; // ระบุว่าเป็น Client Component เพื่อให้ใช้ useState และ onClick ได้

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // เคลียร์ error เก่า

    try {
      // เรียก API สมัครสมาชิกไปที่ Laravel
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      alert('สมัครสมาชิกสำเร็จ! กำลังพากลับไปหน้าเข้าสู่ระบบ');
      router.push('/login'); // พากลับไปหน้า Login เมื่อสมัครเสร็จ

    } catch (err) {
      // ดักจับ Error เผื่ออีเมลซ้ำ หรือรหัสผ่านสั้นเกินไป
      setError('ไม่สามารถสมัครสมาชิกได้ (อีเมลอาจซ้ำ หรือรหัสผ่านน้อยกว่า 6 ตัว)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center justify-center">
        
        {/* กล่อง Register หลัก: คุมธีมล้อไปกับหน้า Login เดียวกันเป๊ะ */}
        <div className="w-full max-w-5xl bg-white rounded-xl drop-shadow-xl overflow-hidden border-[6px] border-white grid grid-cols-1 md:grid-cols-12">
          
          {/* ---------------- ฝั่งซ้าย (แบนเนอร์กิจกรรม - ธีมทอง/น้ำเงินเข้ม) ---------------- */}
          <div className="md:col-span-7 bg-[#1f2937] p-8 flex flex-col justify-between order-2 md:order-1 relative dark:bg-slate-900">
            {/* ลายเส้น Gradient ตกแต่งพื้นหลังให้ดูพรีเมียม */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" />
            
            <div className="text-center md:text-left relative z-10">
              <h2 className="text-[#D4AF37] text-sm md:text-base font-semibold mb-1 tracking-wide">
                มหาวิทยาลัยราชภัฏศรีสะเกษ
              </h2>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
                สร้างบัญชีผู้ใช้ใหม่ <br />
                <span className="text-[#D4AF37]">SDGs-SCD Rankings SSKRU</span>
              </h1>
            </div>

            {/* ใส่รูปภาพ Sisaket.jpg ให้เชื่อมโยงกับหน้าล็อกอิน */}
            <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden border-2 border-[#D4AF37]/30 shadow-md bg-gray-800">
              <Image
                src="/Sisaket.jpg"
                alt="SCD Sisaket Register Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
            
            <p className="text-gray-300 text-xs mt-6 text-center md:text-left leading-relaxed relative z-10">
              ร่วมเป็นส่วนหนึ่งในระบบการจัดเก็บข้อมูล เพื่อผลักดันและยกระดับศักยภาพการแข่งขันด้านความยั่งยืนของมหาวิทยาลัยสู่ระดับสากล
            </p>
          </div>

          {/* ---------------- ฝั่งขวา (ฟอร์ม Register) ---------------- */}
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col order-1 md:order-2 justify-center">
            
            {/* โลโก้มหาลัยบนหัวฟอร์ม */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden bg-white shadow-md border-2 border-[#D4AF37]">
                <Image
                  src="/logosisaket.jpg"
                  alt="SSKRU Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              สมัครสมาชิกใหม่
            </h2>
            
            {/* แสดงข้อความ Error ถ้ามี */}
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-5 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">ชื่อ - นามสกุล</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition text-sm"
                  placeholder="กรอกชื่อและนามสกุลของคุณ"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition text-sm"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">รหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition text-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* ปุ่มยืนยันสีเหลืองทองประจำมหาลัย */}
              <button 
                type="submit" 
                className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white py-3 rounded-full transition-colors font-semibold text-base shadow-md mt-6 tracking-wide"
              >
                ยืนยันการสมัครสมาชิก
              </button>
            </form>

            {/* ลิงก์ย้อนกลับหน้าล็อกอิน */}
            <div className="border-t border-gray-200 mt-6 pt-5 text-center">
              <p className="text-sm text-gray-600">
                มีบัญชีระบบจัดการอยู่แล้ว? {' '}
                <Link href="/login" className="text-[#D4AF37] hover:text-[#B8962E] font-semibold">
                  เข้าสู่ระบบที่นี่
                </Link>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}