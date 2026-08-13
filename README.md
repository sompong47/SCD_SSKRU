# 🌍 SDGs & SCD Rankings Management System

ระบบสารสนเทศเพื่อการจัดการและแสดงผลข้อมูลการพัฒนาที่ยั่งยืน (Sustainable Development Goals: SDGs) สร้างขึ้นเพื่อจัดการข้อมูลข่าวสาร โครงการ และตัวชี้วัดต่างๆ พร้อมระบบประเมินผลและการจัดหมวดหมู่ที่ใช้งานง่าย

## ✨ Features (ความสามารถของระบบ)

### Frontend (User & Admin Interface)
- **Dynamic Filtering:** ระบบกรองข้อมูลข่าวสารและโครงการตามปีการศึกษา และเป้าหมาย SDG 17 ข้อแบบ Real-time
- **Optimistic UI Rating:** ระบบประเมินเรตติ้งดาวสำหรับแต่ละโครงการ ที่ตอบสนองต่อผู้ใช้งานทันทีก่อนบันทึกลงฐานข้อมูล
- **Content Management Dashboard:** หน้าแผงควบคุมสำหรับ Admin เพื่อเพิ่ม แก้ไข และลบข้อมูลข่าวสาร
- **Responsive Design:** แสดงผลได้อย่างสมบูรณ์แบบทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ

### Backend (API & Database)
- **RESTful API:** ออกแบบและพัฒนา API เพื่อเชื่อมต่อข้อมูลระหว่างหน้าบ้านและหลังบ้านอย่างเป็นระบบ
- **Advanced File Handling:** ระบบอัปโหลดและจัดการไฟล์ รองรับทั้งรูปภาพหน้าปก (Cover Image) และการแนบเอกสารหลายรายการพร้อมกัน (Multiple PDF/Image Attachments)
- **Relational Database:** โครงสร้างฐานข้อมูลเชิงสัมพันธ์แบบ One-to-Many และ Many-to-Many (เช่น 1 ข่าวสารเชื่อมโยงได้หลายเป้าหมาย SDG)
- **View Tracking:** ระบบติดตามและนับยอดผู้เข้าชมโครงการอัตโนมัติ

## 💻 Tech Stack (เทคโนโลยีที่ใช้)

**Frontend:**
- Framework: [Next.js](https://nextjs.org/) (React)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- HTTP Client: Axios

**Backend:**
- Framework: [Laravel](https://laravel.com/) (PHP)
- Database: MySQL
- File Storage: Laravel Local Storage (Symbolic Links)

---

## 🚀 Getting Started (วิธีการติดตั้งและรันโปรเจกต์)

### Prerequisites (สิ่งที่ต้องมีในเครื่อง)
- Node.js (v18+)
- PHP (v8.1+)
- Composer
- MySQL

### 1. การติดตั้ง Backend (Laravel)

```bash
# เข้าไปที่โฟลเดอร์ backend
cd backend-api

# ติดตั้ง dependencies
composer install

# คัดลอกไฟล์ตั้งค่าระบบและกำหนดค่า Database
cp .env.example .env

# สร้าง Application Key
php artisan key:generate

# สร้างตารางในฐานข้อมูล
php artisan migrate

# สร้างทางลัดสำหรับเปิดใช้งานรูปภาพและไฟล์แนบ (สำคัญ)
php artisan storage:link

# รันเซิร์ฟเวอร์ (ค่าเริ่มต้นจะรันที่ http://localhost:8000)
php artisan serve
2. การติดตั้ง Frontend (Next.js)
Bash
# เปิด Terminal ใหม่อีกหน้าต่าง แล้วเข้าไปที่โฟลเดอร์ frontend
cd frontend

# ติดตั้ง dependencies
npm install

# รันเซิร์ฟเวอร์สำหรับพัฒนา (ค่าเริ่มต้นจะรันที่ http://localhost:3000)
npm run dev
📂 โครงสร้างฐานข้อมูลเบื้องต้น (Database Highlight)
news: เก็บข้อมูลเนื้อหาข่าวสาร, รูปปก, ยอดวิว, ปีการศึกษา และเรตติ้งดาว

sdgs: เก็บข้อมูลเป้าหมายการพัฒนาที่ยั่งยืนทั้ง 17 ข้อ

news_sdg: ตาราง Pivot สำหรับเชื่อมความสัมพันธ์ Many-to-Many ระหว่างข่าวและ SDG

attachments: เก็บข้อมูลไฟล์แนบของแต่ละข่าว (One-to-Many)

👨‍💻 Author
Sompong Yaekham

GitHub: @sompong47

Role: Full-Stack Developer


**💡 ทริคเพิ่มเติมก่อนนำไปใช้:**
*   ตรงส่วน **`cd backend-api`** และ **`cd frontend`** คุณสามารถปรับชื่อโฟลเดอร์ให้ตรงกับชื่อโฟลเดอร์จริงในคอมพิวเตอร์ของคุณได้เลยนะครับ
*   เมื่อนำไปแปะใน GitHub แล้ว ตัวอักษรที่เป็น Code Block อย่างแบล็คทิค ( \`\`\` ) จะถูกแปลงเป็นกล่องโค้ดสวยๆ ให้อัตโนมัติครับ!
