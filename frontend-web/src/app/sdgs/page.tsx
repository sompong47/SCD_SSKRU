"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function SdgGoals() {
  const years = ['2026', '2025', '2024', '2023', '2022'];
  const [selectedYear, setSelectedYear] = useState('2026');

  const sdgList = [
    { id: 1, title: 'NO POVERTY', color: 'bg-[#E5243B]', stats: { fund: '580', projects: '31' } },
    { id: 2, title: 'ZERO HUNGER', color: 'bg-[#DDA63A]', stats: { shop: '16', projects: '28', base: '15' } },
    { id: 3, title: 'GOOD HEALTH AND WELL-BEING', color: 'bg-[#4C9F38]', stats: { projects: '25', policy: '1' } },
    { id: 4, title: 'QUALITY EDUCATION', color: 'bg-[#C5192D]', stats: { resources: '9', projects: '13' } },
    { id: 5, title: 'GENDER EQUALITY', color: 'bg-[#FF3A21]', stats: { projects: '11', policy: '4', center: '6' } },
    { id: 6, title: 'CLEAN WATER AND SANITATION', color: 'bg-[#26BDE2]', stats: { projects: '-' } },
    { id: 7, title: 'AFFORDABLE AND CLEAN ENERGY', color: 'bg-[#FCC30B]', stats: { policy: '4', projects: '27' } },
    { id: 8, title: 'DECENT WORK AND ECONOMIC GROWTH', color: 'bg-[#A21942]', stats: { projects: '-' } },
    { id: 9, title: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE', color: 'bg-[#FD6925]', stats: { projects: '-' } },
    { id: 10, title: 'REDUCED INEQUALITIES', color: 'bg-[#DD1367]', stats: { projects: '-' } },
    { id: 11, title: 'SUSTAINABLE CITIES AND COMMUNITIES', color: 'bg-[#FD9D24]', stats: { projects: '-' } },
    { id: 12, title: 'RESPONSIBLE CONSUMPTION AND PRODUCTION', color: 'bg-[#C1932E]', stats: { projects: '-' } },
    { id: 13, title: 'CLIMATE ACTION', color: 'bg-[#3F7E44]', stats: { projects: '-' } },
    { id: 14, title: 'LIFE BELOW WATER', color: 'bg-[#0A97D9]', stats: { projects: '-' } },
    { id: 15, title: 'LIFE ON LAND', color: 'bg-[#56C02B]', stats: { projects: '-' } },
    { id: 16, title: 'PEACE, JUSTICE AND STRONG INSTITUTIONS', color: 'bg-[#00689D]', stats: { projects: '-' } },
    { id: 17, title: 'PARTNERSHIPS FOR THE GOALS', color: 'bg-[#19486A]', stats: { mou: '25', projects: '23' } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="w-full h-64 md:h-80 relative rounded-xl overflow-hidden shadow-md border-[6px] border-white bg-gray-200">
          <Image 
            src="/sskru_bg.jpg"
            alt="SSKRU Campus" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-center md:text-left">
            <p className="text-[#D4AF37] text-xs md:text-sm font-semibold tracking-wide uppercase mb-1">
              Si Sa Ket Rajabhat University
            </p>
            <h1 className="text-xl md:text-3xl font-bold">
              Sustainable Development Goals (SDGs)
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center text-[#D4AF37] text-sm mb-6 flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          จำนวนผู้ชม : 421
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-3">
            Sustainable Development Goals (SDGs)
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            มหาวิทยาลัยราชภัฏศรีสะเกษกับการขับเคลื่อนเป้าหมายการพัฒนาที่ยั่งยืน เพื่อชุมชนท้องถิ่นและสากล
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 max-w-xl mx-auto">
          <span className="text-sm font-semibold text-gray-700 mr-2">SDG Info :</span>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedYear === year
                  ? 'bg-[#D4AF37] text-white shadow-sm font-bold scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sdgList.map((sdg) => (
            <div
              key={sdg.id}
              className={`${sdg.color} text-white p-5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[160px] relative overflow-hidden`}
            >
              <div className="absolute right-2 bottom-0 text-white/10 font-bold text-8xl pointer-events-none select-none font-mono">
                {sdg.id}
              </div>

              <div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl font-black border-r border-white/40 pr-2 leading-none">
                    {sdg.id}
                  </span>
                  <h3 className="text-xs font-bold leading-tight tracking-wide uppercase pt-0.5">
                    {sdg.title}
                  </h3>
                </div>
              </div>

              <div className="mt-6 border-t border-white/20 pt-3 relative z-10">
                {Object.keys(sdg.stats).length === 1 && sdg.stats.projects === '-' ? (
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>Projects</span>
                    <span className="text-lg font-bold">-</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-medium opacity-95">
                    {Object.entries(sdg.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-white/10 pb-0.5">
                        <span className="capitalize">{key}</span>
                        <span className="text-sm font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}