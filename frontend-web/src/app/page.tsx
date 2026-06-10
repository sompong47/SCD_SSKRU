"use client";

export default function Home() {
  return (
    // ใส่ h-screen เพื่อให้ความสูงเต็มจอพอดี
    <div className="relative w-full h-screen">
      
      {/* รูปภาพพื้นหลัง (ดึงรูป sskru_bg.jpg จากโฟลเดอร์ public มาแสดง) */}
      <div 
        className="absolute inset-0 bg-gray-800 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/sskru_bg.jpg')" }} 
      >
        {/* ฟิลเตอร์สีดำบางๆ ทับรูปภาพ เพื่อให้ตัวหนังสือโดดเด่นและอ่านง่ายขึ้น */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* ข้อความตรงกลางจอ */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pt-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wide drop-shadow-lg">
          ภายในปี 2570
        </h1>
        
        {/* ไอคอนดอกไม้เล็กๆ คั่นกลาง ปรับเป็นสีทองให้เข้าธีม */}
        <div className="mb-8">
           <svg className="w-8 h-8 text-[#D4AF37] opacity-90" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zM15.89 18.52A7.957 7.957 0 0019 12c0-4.08-3.05-7.44-7-7.93v2c0 .55-.45 1-1 1H9v2h4c.55 0 1 .45 1 1v2h2v1.52z"/></svg>
        </div>

        <p className="text-xl md:text-3xl max-w-5xl leading-relaxed drop-shadow-md font-medium">
          เป็นมหาวิทยาลัยชั้นนำด้านอาหาร การท่องเที่ยว<br />
          และวิทยาการสุขภาพ ภายใต้ความเป็นมหาวิทยาลัยดิจิทัล<br />
          ด้วยการบูรณาการศาสตร์ เพื่อพัฒนาท้องถิ่นอย่างยั่งยืน
        </p>
      </div>

    </div>
  );
}