"use client";

import { useState } from "react";
import axios from "axios";

interface CategoryItem {
  id: number;
  name: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingCategory?: CategoryItem | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSuccess,
  editingCategory,
}: CategoryModalProps) {
  const [name, setName] = useState(editingCategory?.name || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!editingCategory?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (isEditing) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${editingCategory?.id}`,
          { name },
          { headers }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          { name },
          { headers }
        );
      }
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่";
        setError(msg);
      } else {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {isEditing ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEditing
                ? `แก้ไขหมวดหมู่ ID: ${editingCategory?.id}`
                : "กรอกชื่อหมวดหมู่ใหม่"}
            </p>
          </div>
          <button
            id="category-modal-close"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              ชื่อหมวดหมู่ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="เช่น ข่าวกิจกรรม, ข่าวประชาสัมพันธ์"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              ยกเลิก
            </button>
            <button
              id="category-modal-submit"
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B8962E] rounded-full transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? "กำลังบันทึก..." : isEditing ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
