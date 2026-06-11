"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export default function AdminHeader() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (_) {}
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          ระบบจัดการข้อมูล{" "}
          <span className="text-[#D4AF37]">SCD SSKRU</span>
        </h1>
        <p className="text-xs text-gray-500">Admin Dashboard</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification bell (decorative) */}
        <button className="relative p-2 text-gray-500 hover:text-[#D4AF37] hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User Avatar + Dropdown */}
        <div className="relative">
          <button
            id="admin-user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user?.name || "Admin"}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
              </div>
              <div className="py-1">
                <button
                  id="admin-logout-btn"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  ออกจากระบบ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
