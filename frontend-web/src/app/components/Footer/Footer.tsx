import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ซ้าย: ข้อมูลติดต่อ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black text-[10px] font-bold">
                โลโก้
              </div>
              <div>
                <h2 className="font-bold text-white text-base">การพัฒนาที่ยั่งยืน</h2>
                <p className="text-[10px] text-[#e0a82e]">มหาวิทยาลัยราชภัฏศรีสะเกษ SDGs-SCD Rankings</p>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-4">มหาวิทยาลัยราชภัฏศรีสะเกษ</h3>
            <p className="mb-2">319 ตำบล หนองครก อำเภอเมืองศรีสะเกษ ศรีสะเกษ 33000</p>
            <p className="mb-2">โทรศัพท์ 045-282500 โทรสาร 045-282500</p>
            <p>อีเมล info@sskru.ac.th</p>
          </div>

          {/* ขวา: ลิงก์และ QR Code */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Link ที่เกี่ยวข้อง</h3>
            <ul className="space-y-2 mb-6">
              <li><Link href="#" className="hover:text-white transition-colors">• THE GLOBAL GOALS For Sustainable Development</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">• SCD RANKINGS</Link></li>
            </ul>
            
            <div className="flex items-center gap-2 text-[#e0a82e] mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              จำนวนผู้ชม : 420
            </div>

            {/* ช่องสำหรับใส่รูป QR Code */}
            <div className="w-24 h-24 bg-white p-1 rounded">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-black text-xs">
                QR Code
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* แถบล่างสุด Copyright */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>Copyright © 2024 Si Sa Ket Rajabhat University , All rights reserved.</p>
          <p className="mt-2 md:mt-0">Developed by <span className="text-[#e0a82e]">Digital Technology Center</span></p>
        </div>
      </div>
    </footer>
  );
}