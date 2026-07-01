"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthUseCase } from "@/core/application/use-cases/AuthUseCase";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      // 1. Panggil API logout (opsional, agar token di blacklist di Laravel)
      await AuthUseCase.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 2. Apapun hasilnya (sukses/gagal API), hapus session lokal & arahkan ke login
      // SessionManager.clearSession() biasanya sudah dipanggil di dalam AuthUseCase.logout()
      router.push("/login");
      router.refresh(); // Memastikan middleware mendeteksi perubahan cookie
    }
  };
  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#fff3e0] px-4 py-3 flex justify-between items-center z-[60] shadow-sm">
        <Link href="/">
          <Image
            src="/logo-gaskodeaja.png"
            alt="Logo"
            width={60}
            height={32}
            priority
          />
        </Link>
        <button className="text-[#A47148]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CORE */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-[#fff3e0] z-50 shadow-xl transition-transform duration-300 ease-in-out
        w-[280px] md:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full p-6">
          {/* LOGO - Gunakan shrink-0 agar tidak tertekan saat scroll */}
          <div className="mb-10 hidden md:block shrink-0">
            <Link href="/" className="flex justify-center">
              <Image
                src="/logo-gaskodeaja.png"
                alt="Logo"
                width={120}
                height={60}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* NAVIGATION - Tambahkan overflow-y-auto di sini */}
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto pr-2 custom-sidebar-scroll">
            <p className="text-xs font-bold text-[#A47148]/50 uppercase tracking-widest px-3">
              Main Menu
            </p>

            {[
              { name: "Hero", path: "/hero" },
              { name: "Kategori", path: "/categories" },
              { name: "Services", path: "/services" },
              { name: "Service-plans", path: "/service-plans" },
              { name: "Portfolios", path: "/portfolios" },
              { name: "Users", path: "/users" },
              { name: "Posts", path: "/posts" },
              { name: "Testimonials", path: "/testimonials" },
              { name: "Leads", path: "/leads" },
              { name: "Visi Misi", path: "/visi-misi" },
              { name: "Cara Kerja", path: "/cara-kerja" },
              { name: "Branding", path: "/branding" },
              { name: "Q&A", path: "/qna" },
              { name: "Contact Me", path: "/contacts" },
              { name: "Contact Submission", path: "/contact-submission" },
              { name: "Footer", path: "/footer" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:bg-[#A47148] hover:text-white px-4 py-2 rounded-xl transition-all font-medium flex items-center shrink-0"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-[#A47148]/10 shrink-0">
            <button
              onClick={handleLogout}
              className="w-full bg-[#A47148] text-white py-2 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#8B5E3C] transition-all shadow-lg font-bold text-sm"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
