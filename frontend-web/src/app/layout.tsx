import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// อิมพอร์ต Navbar และ Footer เข้ามา
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {/* วาง Navbar ไว้ด้านบนสุด */}
        <Navbar />
        
        {/* children คือเนื้อหาของแต่ละหน้าที่จะมาแสดงต่อจาก Navbar */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* เพิ่มแท็ก Footer ไว้ด้านล่างสุดตรงนี้ครับ */}
        <Footer />
      </body>
    </html>
  );
}