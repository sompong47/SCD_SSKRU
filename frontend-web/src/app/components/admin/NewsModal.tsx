"use client";

import { useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface NewsItem {
  id?: number;
  title: string;
  detail: string;
  year: number | string;
  category_id: number | string;
  picture?: File | null;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
  editingNews?: {
    id: number;
    title: string;
    detail: string;
    year: number;
    category_id: number;
    picture?: string;
  } | null;
}

export default function NewsModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
  editingNews,
}: NewsModalProps) {
  const [formData, setFormData] = useState<NewsItem>({
    title: editingNews?.title || "",
    detail: editingNews?.detail || "",
    year: editingNews?.year || new Date().getFullYear(),
    category_id: editingNews?.category_id || "",
    picture: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Sync when editingNews changes
  const currentTitle = editingNews?.title || "";
  const currentDetail = editingNews?.detail || "";
  const currentYear = editingNews?.year || new Date().getFullYear();
  const currentCatId = editingNews?.category_id || "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, picture: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("detail", formData.detail);
      payload.append("year", String(formData.year));
      payload.append("category_id", String(formData.category_id));
      if (formData.picture) {
        payload.append("picture", formData.picture);
      }

      if (editingNews?.id) {
        payload.append("_method", "PUT");
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/news/${editingNews.id}`,
          payload,
          { headers }
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news`, payload, { headers });
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

  const isEditing = !!editingNews?.id;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {isEditing ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEditing ? `แก้ไขข่าว ID: ${editingNews?.id}` : "กรอกข้อมูลข่าวสาร"}
            </p>
          </div>
          <button
            id="news-modal-close"
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

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              หัวข้อข่าว <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="กรอกหัวข้อข่าว"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition text-sm"
            />
          </div>

          {/* Category + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                หมวดหมู่ <span className="text-red-500">*</span>
              </label>
              {categories.length === 0 ? (
                <div className="w-full px-4 py-3 border border-red-200 bg-red-50 text-red-600 rounded-xl text-sm flex items-center justify-between">
                  <span>ไม่มีหมวดหมู่</span>
                  <a href="/admin/categories" className="underline font-medium hover:text-red-700">
                    เพิ่มหมวดหมู่
                  </a>
                </div>
              ) : (
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition text-sm bg-white"
                >
                  <option value="">-- เลือกหมวดหมู่ --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                ปี (ค.ศ.) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min={2000}
                max={2100}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition text-sm"
              />
            </div>
          </div>

          {/* Detail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              รายละเอียด <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              required
              rows={5}
              placeholder="กรอกรายละเอียดข่าว"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition text-sm resize-none"
            />
          </div>

          {/* Picture Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              รูปภาพประกอบ
            </label>
            {isEditing && editingNews?.picture && !previewUrl && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">รูปภาพปัจจุบัน:</p>
                <img
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${editingNews.picture}`}
                  alt="current"
                  className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            {previewUrl && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">ตัวอย่างรูปที่เลือก:</p>
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-32 h-20 object-cover rounded-lg border border-[#D4AF37]/50"
                />
              </div>
            )}
            <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                {formData.picture ? formData.picture.name : "คลิกเพื่อเลือกรูปภาพ (jpg, png, gif)"}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              ยกเลิก
            </button>
            <button
              id="news-modal-submit"
              type="submit"
              disabled={loading || categories.length === 0}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B8962E] rounded-full transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? "กำลังบันทึก..." : isEditing ? "บันทึกการแก้ไข" : "เพิ่มข่าว"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
