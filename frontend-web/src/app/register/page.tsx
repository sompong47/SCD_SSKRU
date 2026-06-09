"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // เคลียร์ error เก่า

    try {
      // เรียก API สมัครสมาชิกไปที่ Laravel
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      alert('สมัครสมาชิกสำเร็จ! กำลังพากลับไปหน้าเข้าสู่ระบบ');
      router.push('/login'); // พากลับไปหน้า Login เมื่อสมัครเสร็จ

    } catch (err: any) {
      // ดักจับ Error เผื่ออีเมลซ้ำ หรือรหัสผ่านสั้นเกินไป
      setError('ไม่สามารถสมัครสมาชิกได้ (อีเมลอาจซ้ำ หรือรหัสผ่านน้อยกว่า 6 ตัว)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">สมัครสมาชิกใหม่</h2>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ - นามสกุล</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-medium mt-4"
          >
            ยืนยันการสมัครสมาชิก
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          มีบัญชีอยู่แล้ว? {' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}