"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function ScdIndicators() {
  const indicators = [
    { id: 1, year: '2025', title: 'SCD SSKRU 2025', date: '1 ธันวาคม 2025 : 11:14 น.', image: '/activity.jpg' },
    { id: 2, year: '2024', title: 'SCD SSKRU 2024', date: '26 กรกฎาคม 2024 : 13:51 น.', image: '/Sisaket.jpg' },
    { id: 3, year: '2023', title: 'SCD SSKRU 2023', date: '20 กรกฎาคม 2023 : 11:29 น.', image: '/sskru_bg.jpg' },
    { id: 4, year: '2022', title: 'SCD SSKRU 2022', date: '8 กรกฎาคม 2022 : 16:31 น.', image: '/69.jpg' },
    { id: 5, year: '2021', title: 'SCD SSKRU 2021', date: '2 มิถุนายน 2021 : 11:24 น.', image: '/scd21.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center text-[#d4b020] text-sm mb-6 flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          จำนวนผู้ชม : 420
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-medium text-[#5cb0d6] mb-4">
            Sustainable Community Development (SCD)
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Si Sa Ket Rajabhat University and Sustainable Community Development
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-400 w-16"></div>
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zM15.89 18.52A7.957 7.957 0 0019 12c0-4.08-3.05-7.44-7-7.93v2c0 .55-.45 1-1 1H9v2h4c.55 0 1 .45 1 1v2h2v1.52z"/>
            </svg>
            <div className="h-px bg-gray-400 w-16"></div>
          </div>

          <h2 className="text-xl md:text-2xl text-gray-500">
            มหาวิทยาลัยพัฒนาชุมชนท้องถิ่นยั่งยืน
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {indicators.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col md:flex-row bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-sm"
            >
              <div className="w-full md:w-[280px] h-48 md:h-[160px] relative flex-shrink-0 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover"
                  priority={item.id === 1}
                />
              </div>
              
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-xl font-medium text-[#4b9e9c] mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 mb-4">{item.date}</p>
                <Link 
                  href={`/scd-indicators/${item.year}`} 
                  className="text-sm font-bold text-[#20b2aa] hover:text-[#188c86] transition-colors inline-block"
                >
                  Read More »
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}