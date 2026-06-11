"use client"; // ระบุว่าเป็น Client Component เพื่อให้ใช้ useState และ onClick ได้

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // เคลียร์ error เก่าก่อนยิง API

    try {
      // เรียก API ไปที่ Laravel ของเรา
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      // ถ้าสำเร็จ เก็บ Token ไว้ใน localStorage
      localStorage.setItem('token', response.data.access_token);
      
      alert('เข้าสู่ระบบสำเร็จ!');
      router.push('/'); // ย้ายกลับไปหน้าแรก

    } catch (err) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center justify-center">
        
        {/* กล่อง Login หลัก: แบ่ง 2 ฝั่งบนจอใหญ่ พร้อมกรอบและเงาสไตล์มหาลัย */}
        <div className="w-full max-w-5xl bg-white rounded-xl drop-shadow-xl overflow-hidden border-[6px] border-white grid grid-cols-1 md:grid-cols-12">
          
          {/* ---------------- ฝั่งซ้าย (แบนเนอร์กิจกรรม - ปรับเป็นธีมทอง/น้ำเงินเข้ม) ---------------- */}
          <div className="md:col-span-7 bg-[#1f2937] p-8 flex flex-col justify-between order-2 md:order-1 relative dark:bg-slate-900">
            {/* ลายเส้น Gradient ตกแต่งพื้นหลังให้ดูพรีเมียม */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" />
            
            <div className="text-center md:text-left relative z-10">
              <h2 className="text-[#D4AF37] text-sm md:text-base font-semibold mb-1 tracking-wide">
                มหาวิทยาลัยราชภัฏศรีสะเกษ
              </h2>
              <h1 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
                เข้าสู่ระบบ <br />
                <span className="text-[#D4AF37]">SDGs-SCD Rankings SSKRU</span>
              </h1>
            </div>

            {/* ใส่รูปภาพ Sisaket.jpg แทนที่ภาพกิจกรรมเดิม */}
            <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden border-2 border-[#D4AF37]/30 shadow-md bg-gray-800">
              <Image
                src="/wellcome.jpg"
                alt="SCD Sisaket Activity"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
            
            <p className="text-gray-300 text-xs mt-6 text-center md:text-left leading-relaxed relative z-10">
              เครื่องมือประเมินและบริหารจัดการมหาวิทยาลัยในการแข่งขันระดับประเทศ และนานาชาติ เพื่อยกระดับความยั่งยืนของชุมชนท้องถิ่นอย่างเป็นรูปธรรม
            </p>
          </div>

          {/* ---------------- ฝั่งขวา (ฟอร์ม Login) ---------------- */}
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col order-1 md:order-2 justify-center">
            
            {/* โลโก้ msn มหาลัยบนหัวฟอร์ม (แสดงเด่นชัดขึ้น) */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 relative rounded-full overflow-hidden bg-white shadow-md border-2 border-[#D4AF37]">
                <Image
                  src="/logosisaket.jpg"
                  alt="SSKRU Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              เข้าสู่ระบบสมาชิก
            </h2>
            
            {/* แสดงข้อความ Error ถ้ามี */}
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-6 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition text-sm"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                  <Link href="#" className="text-xs text-[#D4AF37] hover:text-[#B8962E] font-medium">
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition text-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* ปุ่มกดเข้าสู่ระบบ สีทองประจำมหาลัย */}
              <button 
                type="submit" 
                className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white py-3 rounded-full transition-colors font-semibold text-base shadow-md mt-8 tracking-wide"
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="border-t border-gray-200 mt-8 pt-6 text-center">
              <p className="text-sm text-gray-600">
                ยังไม่มีบัญชีผู้ใช้สำหรับระบบจัดการ? {' '}
                <Link href="/register" className="text-[#D4AF37] hover:text-[#B8962E] font-semibold">
                  ลงทะเบียน
                </Link>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}