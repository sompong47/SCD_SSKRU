"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface StatsData {
  totalNews: number;
  totalCategories: number;
  latestYear: number;
  recentNews: NewsItem[];
}

interface NewsItem {
  id: number;
  title: string;
  year: number;
  category?: { name: string };
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData>({
    totalNews: 0,
    totalCategories: 0,
    latestYear: new Date().getFullYear() + 543,
    recentNews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
    ])
      .then(([newsRes, catRes]) => {
        const newsData: NewsItem[] = newsRes.data;
        const catData = catRes.data;

        const years = newsData.map((n) => n.year).filter(Boolean);
        const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();

        setStats({
          totalNews: newsData.length,
          totalCategories: catData.length,
          latestYear: maxYear,
          recentNews: newsData.slice(0, 5),
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "ข่าวสารทั้งหมด",
      value: stats.totalNews,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: "from-[#D4AF37] to-[#B8962E]",
      link: "/admin/news",
    },
    {
      label: "หมวดหมู่ทั้งหมด",
      value: stats.totalCategories,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-700",
      link: "/admin/categories",
    },
    {
      label: "ปีล่าสุดในระบบ",
      value: stats.latestYear,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-emerald-500 to-emerald-700",
      link: "/admin/news",
    },
    {
      label: "ผู้ดูแลระบบ",
      value: "Active",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-purple-500 to-purple-700",
      link: "/admin",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">แดชบอร์ด</h2>
          <p className="text-gray-500 text-sm mt-1">ภาพรวมระบบจัดการข้อมูล SCD SSKRU</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {new Date().toLocaleDateString("th-TH", { dateStyle: "full" })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {loading ? (
                  <span className="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent News Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-800">ข่าวสารล่าสุด</h3>
            <p className="text-xs text-gray-500 mt-0.5">5 รายการล่าสุดในระบบ</p>
          </div>
          <Link
            href="/admin/news"
            className="text-sm font-medium text-[#D4AF37] hover:text-[#B8962E] flex items-center gap-1 transition-colors"
          >
            ดูทั้งหมด
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-6 py-3 text-left font-semibold">#</th>
                <th className="px-6 py-3 text-left font-semibold">หัวข้อข่าว</th>
                <th className="px-6 py-3 text-left font-semibold">หมวดหมู่</th>
                <th className="px-6 py-3 text-left font-semibold">ปี</th>
                <th className="px-6 py-3 text-left font-semibold">วันที่สร้าง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : stats.recentNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>ยังไม่มีข่าวในระบบ</p>
                    </div>
                  </td>
                </tr>
              ) : (
                stats.recentNews.map((news, index) => (
                  <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">
                      {news.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#D4AF37]/10 text-[#B8962E] px-3 py-1 rounded-full text-xs font-medium">
                        {news.category?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{news.year}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(news.created_at).toLocaleDateString("th-TH")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          href="/admin/news"
          className="group flex items-center gap-5 p-6 bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-2xl text-white hover:shadow-xl hover:shadow-[#D4AF37]/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="p-4 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">เพิ่มข่าวสารใหม่</p>
            <p className="text-white/80 text-sm mt-0.5">จัดการข่าวสาร เพิ่ม แก้ไข ลบ</p>
          </div>
          <svg className="w-5 h-5 ml-auto opacity-70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          href="/admin/categories"
          className="group flex items-center gap-5 p-6 bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="p-4 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">เพิ่มหมวดหมู่ใหม่</p>
            <p className="text-white/60 text-sm mt-0.5">จัดการหมวดหมู่ข่าวสาร</p>
          </div>
          <svg className="w-5 h-5 ml-auto opacity-70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
