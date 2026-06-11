"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // State สำหรับเช็คสถานะการเข้าสู่ระบบ
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ตรวจสอบ Token ทันทีที่โหลดหน้านี้
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      // ถ้าไม่มี Token ให้เตะกลับไปหน้า Login
      router.push('/login');
    } else {
      // ถ้ามี Token ถือว่าผ่าน
      setIsAuthenticated(true);
      setIsChecking(false);
    }
  }, [router]);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?')) {
      localStorage.removeItem('token'); // ลบ Token ทิ้ง
      router.push('/login'); // เด้งกลับหน้า Login
    }
  };

  const isActive = (path: string) => pathname === path;

  // ระหว่างกำลังเช็คสิทธิ์ ให้ขึ้นหน้าโหลดไปก่อน
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...</p>
      </div>
    );
  }

  // ถ้าเช็คผ่านแล้ว ถึงจะแสดง Layout ของ Admin
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* 🟢 แถบเมนูด้านข้าง (Sidebar) */}
      <aside className="w-64 bg-white shadow-lg flex flex-col hidden md:flex">
        {/* หัว Sidebar */}
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <h1 className="text-2xl font-bold text-[#2f9e76]">
            SSKRU <span className="text-[#D4AF37]">Admin</span>
          </h1>
        </div>

        {/* รายการเมนู */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin') ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            หน้าแรก (Dashboard)
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">จัดการตัวชี้วัด SCD</p>
          </div>
          
          <Link 
            href="/admin/scd-years" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/scd-years') ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            จัดการปีข้อมูล (Years)
          </Link>

          <Link 
            href="/admin/scd-contents" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/scd-contents') ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            จัดการเนื้อหา (Contents)
          </Link>

          {/* 🟢 เพิ่มเมนูหน้า About SCD เข้ามาใหม่ตรงนี้ครับ */}
          <Link 
            href="/admin/about-scd" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/about-scd') ? 'bg-[#D4AF37] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            เกี่ยวกับโครงการ (About SCD)
          </Link>

        </nav>

        {/* ปุ่มออกจากระบบ */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* 🟢 พื้นที่แสดงเนื้อหาหลัก (Content Area) */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar เล็กๆ ด้านบนของ Admin */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-medium text-gray-800">ระบบจัดการเนื้อหา (CMS)</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-600">ผู้ดูแลระบบ</span>
          </div>
        </header>

        {/* พื้นที่ของ Page ย่อยที่จะมาเสียบตรงนี้ */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}