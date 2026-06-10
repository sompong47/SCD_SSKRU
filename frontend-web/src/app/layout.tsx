import type { Metadata } from "next";
import { Kanit } from "next/font/google"; // เปลี่ยนมา import Kanit
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// ตั้งค่าฟอนต์ Kanit รองรับภาษาไทยและกำหนดน้ำหนักตัวอักษร
const kanit = Kanit({ 
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"] 
});

export const metadata: Metadata = {
  title: "ระบบจัดการข่าวสารมหาวิทยาลัย",
  description: "โปรเจกต์แสดงผลและจัดการข่าวสาร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      {/* เรียกใช้ฟอนต์ Kanit ที่ body */}
      <body className={kanit.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}