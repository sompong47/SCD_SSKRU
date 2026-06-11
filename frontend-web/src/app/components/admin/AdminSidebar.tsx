"use client";

import Link from "next/link";
import Image from "next/image";

interface AdminSidebarProps {
  currentPath: string;
}

const menuItems = [
  {
    href: "/admin",
    label: "แดชบอร์ด",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/news",
    label: "จัดการข่าวสาร",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    href: "/admin/categories",
    label: "จัดการหมวดหมู่",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ currentPath }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-[#111827] text-white flex flex-col flex-shrink-0 h-full shadow-xl">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-10 h-10 relative rounded-full overflow-hidden bg-white flex-shrink-0 ring-2 ring-[#D4AF37]">
          <Image
            src="/logosisaket.jpg"
            alt="SSKRU Logo"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[#D4AF37] font-bold text-sm leading-tight">Admin Panel</p>
          <p className="text-gray-400 text-[10px]">SCD SSKRU Rankings</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3 px-3">
          เมนูหลัก
        </p>
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? currentPath === "/admin"
              : currentPath.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`transition-colors ${
                  isActive ? "text-white" : "text-gray-500 group-hover:text-[#D4AF37]"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Back to site */}
      <div className="px-4 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200 group"
        >
          <svg className="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          กลับสู่เว็บไซต์
        </Link>
      </div>
    </aside>
  );
}
