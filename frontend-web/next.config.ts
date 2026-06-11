/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**', // อนุญาตให้ดึงรูปภาพทุกไฟล์ในโฟลเดอร์ storage ได้
      },
    ],
  },
};

export default nextConfig; // หรือ module.exports = nextConfig; (ถ้าเป็น .js)