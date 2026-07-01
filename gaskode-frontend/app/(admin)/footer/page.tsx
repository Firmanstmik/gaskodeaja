'use client';
import FooterManager from "@/components/admin/FooterManager";
import { LayoutPanelTop, ShieldCheck } from "lucide-react";

export default function FooterSettingsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto py-10 px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2 uppercase tracking-widest">
              <ShieldCheck size={16} /> Admin Configuration
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
              Footer Settings
            </h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Dekorasi Background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -z-10" />

          {/* Komponen Utama */}
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <FooterManager />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm italic">
            <LayoutPanelTop size={14} />
            Perubahan pada halaman ini akan berdampak langsung pada tampilan publik.
          </div>
          <div className="text-slate-600 text-xs font-mono">
            Last Updated: {new Date().toLocaleDateString('id-ID')}
          </div>
        </div>

      </div>
    </main>
  );
}