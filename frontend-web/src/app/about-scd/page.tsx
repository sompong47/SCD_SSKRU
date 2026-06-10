"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function AboutScd() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center text-[#d4b020] text-sm mb-12 flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          จำนวนผู้ชม : 421
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <h2 className="text-[#5cb0d6] text-lg font-medium mb-2">About SCD SSKRU</h2>
              <h1 className="text-2xl md:text-3xl font-medium text-[#5cb0d6]">
                Sustainable Community Development (SCD)
              </h1>
            </div>

            <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-6">
              <p className="indent-8">
                คือการจัดอันดับระดับโลกด้านการศึกษาระดับอุดมศึกษาที่ช่วยให้นักศึกษาและผู้ปกครองสามารถเลือกสถาบันอุดมศึกษาที่เหมาะสมและวิธีการฝึกอบรมเพื่อนำความรู้ไปใช้กับชุมชนการพัฒนาความยั่งยืน ซึ่งเป็นเครื่องมือสำหรับนักศึกษาที่ช่วยในการเลือกสถาบันอุดมศึกษาสำหรับโปรแกรมที่นำความรู้ไปใช้ในการพัฒนาชุมชนอย่างยั่งยืน ทั้งยังเป็นเครื่องมือประเมินการบริหารจัดการของมหาวิทยาลัยในการแข่งขันระดับประเทศ และนานาชาติ และวางเป้าหมายด้านการจัดการที่เหมาะสมโดยมีจุดมุ่งหมายเพื่อยกระดับการแข่งขันระดับนานาชาติของมหาวิทยาลัยในด้านการพัฒนาชุมชนอย่างยั่งยืน
              </p>
              
              <p className="indent-8">
                วัตถุประสงค์ของการจัดอันดับดังกล่าวเป็นการเปรียบเทียบของมหาวิทยาลัยชั้นนำทั่วโลก โดยมีเกณฑ์ของตัวชี้วัดทั้งหมด 11 ตัวชี้วัด ใน 7 ด้าน ได้แก่ นโยบายการพัฒนาชุมชนอย่างยั่งยืน หลักสูตรการเรียนการสอนเกี่ยวกับการพัฒนาชุมชนอย่างยั่งยืน การบริการวิชาการเพื่อการพัฒนาชุมชนอย่างยั่งยืน การทำนุบำรุงวัฒนธรรมชุมชนอย่างยั่งยืน การพัฒนาการวิจัยชุมชนอย่างยั่งยืน ศิษย์เก่าที่ทำงานเพื่อการพัฒนาชุมชนอย่างยั่งยืน และรางวัลในการพัฒนาชุมชนอย่างยั่งยืน ซึ่งขณะนี้มหาวิทยาลัยได้จัดตั้งคณะกรรมการดำเนินโครงการจัดอันดับมหาวิทยาลัยเพื่อการพัฒนาชุมชนท้องถิ่นอย่างยั่งยืน โดยคณะกรรมการจะเก็บรวบรวมข้อมูลเตรียมความพร้อมสู่การจัดอันดับดังกล่าว
              </p>
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


          <div className="lg:col-span-5 flex flex-col gap-8 mt-8 lg:mt-0">
            <div className="w-full aspect-[4/3] relative rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-50">
              <Image
                src="/activity.jpg"
                alt="SCD Activity Graph"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full aspect-[16/9] relative rounded-lg shadow-sm border-[6px] border-white drop-shadow-md overflow-hidden bg-gray-50">
              <Image
                src="/Sisaket.jpg"
                alt="SCD Activity Lightbulb and Tree"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}