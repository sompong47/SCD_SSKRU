"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className={`absolute top-0 w-full z-50 transition-all duration-300 ${
      isHome ? 'bg-transparent text-white' : 'bg-white shadow-md text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* โลโก้และชื่อเว็บ */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo_sskru.jpg"
              alt="SSKRU Logo"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className={`font-bold text-lg leading-tight ${isHome ? 'text-white' : 'text-[#2f9e76]'}`}>
                การพัฒนาที่ยั่งยืน
              </h1>
              <p className={`text-xs ${isHome ? 'text-gray-200' : 'text-gray-500'}`}>
                มหาวิทยาลัยราชภัฏศรีสะเกษ SDGs-SCD Rankings
              </p>
            </div>
          </div>

          {/* เมนูหลัก */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium h-full">
            <Link href="/" className={`${
              isHome ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-500 hover:text-yellow-600'
            }`}>
              หน้าแรก
            </Link>
            
            {/* เมนู SDGs SSKRU + Dropdown */}
            <div className="relative group h-full flex items-center">
              <div className={`cursor-pointer flex items-center gap-1 ${
                isHome ? 'hover:text-gray-200' : 'hover:text-[#2f9e76]'
              }`}>
                SDGs SSKRU
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              
              {/* กล่อง Dropdown SDGs (ตอนนี้ใส่เป็น Placeholder ไว้ก่อน) */}
              <div className="absolute left-0 top-full w-48 bg-white shadow-lg border-t-2 border-[#2f9e76] hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="py-2 flex flex-col">
                  <Link href="#" className="px-5 py-3 text-sm text-[#cfa827] hover:bg-gray-50 border-b border-gray-100 transition-colors">
                    SDGs SSKRU | 2025
                  </Link>
                  <Link href="#" className="px-5 py-3 text-sm text-[#2f9e76] hover:bg-gray-50 transition-colors">
                    SDGs SSKRU | 2024
                  </Link>
                </div>
              </div>
            </div>
            
            {/* เมนู SCD SSKRU + Dropdown */}
            <div className="relative group h-full flex items-center">
              <div className={`cursor-pointer flex items-center gap-1 ${
                pathname.includes('scd') ? 'text-[#2f9e76]' : isHome ? 'hover:text-gray-200' : 'hover:text-[#2f9e76]'
              }`}>
                SCD SSKRU
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>

              {/* กล่อง Dropdown SCD */}
              <div className="absolute left-0 top-full w-56 bg-white shadow-lg border-t-2 border-[#2f9e76] hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="py-2 flex flex-col">
                  <Link href="/about-scd" className="px-5 py-3 text-sm text-[#cfa827] hover:bg-gray-50 border-b border-gray-100 transition-colors">
                    เกี่ยวกับ SCD SSKRU
                  </Link>
                  <Link href="/scd-indicators" className="px-5 py-3 text-sm text-[#2f9e76] hover:bg-gray-50 transition-colors">
                    ตัวชี้วัด : SCD SSKRU
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/team" className={`${
              isHome ? 'hover:text-gray-200' : 'hover:text-[#2f9e76]'
            }`}>
              คณะทำงาน
            </Link>

            <button className="bg-[#2f9e76] hover:bg-[#258260] text-white px-6 py-2.5 rounded-full transition-colors shadow-md">
              ปฏิทินการดำเนินงาน
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}