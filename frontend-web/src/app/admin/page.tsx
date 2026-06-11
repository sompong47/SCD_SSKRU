export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">ภาพรวมระบบ (Dashboard)</h1>
      
      {/* การ์ดสรุปข้อมูลเบื้องต้น */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#2f9e76]">
          <h3 className="text-gray-500 text-sm font-medium mb-1">จำนวนปีข้อมูลทั้งหมด</h3>
          <p className="text-3xl font-bold text-gray-800">2 <span className="text-sm font-normal text-gray-500">ปี</span></p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#D4AF37]">
          <h3 className="text-gray-500 text-sm font-medium mb-1">หมวดหมู่ตัวชี้วัด</h3>
          <p className="text-3xl font-bold text-gray-800">7 <span className="text-sm font-normal text-gray-500">ด้าน</span></p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#4b9eb6]">
          <h3 className="text-gray-500 text-sm font-medium mb-1">ยอดผู้เข้าชมรวม</h3>
          <p className="text-3xl font-bold text-gray-800">570 <span className="text-sm font-normal text-gray-500">ครั้ง</span></p>
        </div>
      </div>
    </div>
  );
}