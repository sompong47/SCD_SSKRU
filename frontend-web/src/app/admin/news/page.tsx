"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import NewsModal from "../../components/admin/NewsModal";

interface Category {
  id: number;
  name: string;
}

interface NewsItem {
  id: number;
  title: string;
  detail: string;
  year: number;
  category_id: number;
  category?: Category;
  picture?: string;
  created_at: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [newsRes, catRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      ]);
      setNews(newsRes.data);
      setCategories(catRes.data);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteId(null);
      fetchData();
    } catch (_) {
      alert("เกิดข้อผิดพลาดในการลบ");
    } finally {
      setDeleting(false);
    }
  };

  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      !filterCategory || String(item.category_id) === filterCategory;
    return matchSearch && matchCategory;
  });

  const openAddModal = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingNews(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">จัดการข่าวสาร</h2>
          <p className="text-gray-500 text-sm mt-1">
            ทั้งหมด{" "}
            <span className="font-semibold text-[#D4AF37]">{news.length}</span>{" "}
            รายการ
          </p>
        </div>
        <button
          id="add-news-btn"
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-white px-5 py-2.5 rounded-full font-medium text-sm transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มข่าวใหม่
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="ค้นหาข่าวสาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition bg-white min-w-[180px]"
          >
            <option value="">ทุกหมวดหมู่</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                <th className="px-6 py-4 text-left font-semibold">รูป</th>
                <th className="px-6 py-4 text-left font-semibold">หัวข้อข่าว</th>
                <th className="px-6 py-4 text-left font-semibold">หมวดหมู่</th>
                <th className="px-6 py-4 text-left font-semibold">ปี</th>
                <th className="px-6 py-4 text-left font-semibold">วันที่สร้าง</th>
                <th className="px-6 py-4 text-center font-semibold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="font-medium">ไม่พบข่าวสาร</p>
                      <p className="text-xs">ลองเปลี่ยนคำค้นหา หรือเพิ่มข่าวใหม่</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-6 py-4">
                      {item.picture ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.picture}`}
                          alt={item.title}
                          className="w-14 h-10 object-cover rounded-lg border border-gray-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "";
                            (e.target as HTMLImageElement).className =
                              "w-14 h-10 bg-gray-100 rounded-lg border border-gray-100";
                          }}
                        />
                      ) : (
                        <div className="w-14 h-10 bg-gray-100 rounded-lg border border-gray-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 max-w-xs truncate">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{item.detail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#D4AF37]/10 text-[#B8962E] px-3 py-1 rounded-full text-xs font-medium">
                        {item.category?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{item.year}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(item.created_at).toLocaleDateString("th-TH")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {!loading && filteredNews.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
            แสดง {filteredNews.length} จาก {news.length} รายการ
          </div>
        )}
      </div>

      {/* News Modal */}
      {isModalOpen && (
        <NewsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNews(null);
          }}
          onSuccess={fetchData}
          categories={categories}
          editingNews={editingNews}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">ยืนยันการลบ</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              คุณแน่ใจหรือไม่ที่จะลบข่าวนี้? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                id="confirm-delete-news"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {deleting ? "กำลังลบ..." : "ลบข่าว"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
