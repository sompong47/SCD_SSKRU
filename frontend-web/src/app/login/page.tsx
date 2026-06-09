"use client"; // ระบุว่าเป็น Client Component เพื่อให้ใช้ useState และ onClick ได้

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // เคลียร์ error เก่าก่อนยิง API

    try {
      // เรียก API ไปที่ Laravel ของเรา
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      // ถ้าสำเร็จ เก็บ Token ไว้ใน localStorage
      localStorage.setItem('token', response.data.access_token);
      
      alert('เข้าสู่ระบบสำเร็จ!');
      router.push('/'); // ย้ายกลับไปหน้าแรก

    } catch (err: any) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">เข้าสู่ระบบ</h2>
        
        {/* แสดงข้อความ Error ถ้ามี */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium mt-4"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}