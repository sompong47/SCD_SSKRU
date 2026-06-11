"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

// 🟢 อัปเดตโครงสร้างข้อมูลให้รองรับรูปที่ 2
interface AboutData {
  title: string;
  description: string;
  image: string | null;
  image_secondary: string | null; // เพิ่มตัวแปรนี้เข้ามา
  view_count: number;
}

export default function AboutScd() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจากฐานข้อมูลตอนเปิดหน้าเว็บ
  useEffect(() => {
    axios.get('http://localhost:8000/api/about-scd')
      .then(res => {
        setAboutData(res.data);
      })
      .catch(err => {
        console.error('Error fetching about data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center text-[#d4b020] text-sm mb-12 flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          {/* 🟢 เปลี่ยนเลข 421 เป็นข้อมูลจริงจาก DB (ถ้ายังไม่มีให้เป็น 0) */}
          จำนวนผู้ชม : {aboutData?.view_count || 0}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ---------------- ฝั่งซ้าย: เนื้อหาข้อความ ---------------- */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <h2 className="text-[#5cb0d6] text-lg font-medium mb-2">About SCD SSKRU</h2>
              <h1 className="text-2xl md:text-3xl font-medium text-[#5cb0d6]">
                {aboutData?.title || 'Sustainable Community Development (SCD)'}
              </h1>
            </div>

            <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-6">
              {loading ? (
                <p className="animate-pulse text-gray-300">กำลังโหลดเนื้อหา...</p>
              ) : (
                aboutData?.description?.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;
                  return (
                    <p key={index} className="indent-8">
                      {paragraph}
                    </p>
                  );
                })
              )}
            </div>

            <div className="mt-4">
              <Link 
                href="/scd-indicators"
                className="inline-flex items-center gap-2 bg-[#5bc16c] hover:bg-[#4ba85a] text-white px-6 py-3 rounded-full font-medium transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                ตัวชี้วัดของ SCD
              </Link>
            </div>
          </div>

          {/* ---------------- ฝั่งขวา: จัดการโครงสร้างรูปภาพให้คลีน ไม่ซ้อนกันแล้ว ---------------- */}
          <div className="lg:col-span-5 flex flex-col gap-8 mt-8 lg:mt-0">
            
            {/* รูปภาพที่ 1 (บน) */}
            <div className="w-full aspect-[4/3] relative rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-50">
              <Image
                src={aboutData?.image ? `http://localhost:8000/storage/${aboutData.image}` : "/activity.jpg"}
                alt="SCD Activity Main"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* รูปภาพที่ 2 (ล่าง) */}
            <div className="w-full aspect-[16/9] relative rounded-lg shadow-sm border-[6px] border-white drop-shadow-md overflow-hidden bg-gray-50">
              <Image
                src={aboutData?.image_secondary ? `http://localhost:8000/storage/${aboutData.image_secondary}` : "/Sisaket.jpg"}
                alt="SCD Activity Secondary"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                unoptimized
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}