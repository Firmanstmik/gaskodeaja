"use client";
import { Hero } from "@/core/domain/entities/Hero";

interface HeroFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
  initialData?: Hero | null; // Untuk mode Edit
}

export const HeroForm = ({ onSubmit, loading, initialData }: HeroFormProps) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }} className="space-y-5">
      
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Judul Utama</label>
        <input 
          name="title" 
          defaultValue={initialData?.title} 
          placeholder="Contoh: Jasa Website Lombok" 
          className="w-full p-3 border border-[#A47148] rounded-xl focus:ring-2 focus:ring-[#A47148]/50 outline-none transition-all" 
          required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Subjudul</label>
        <textarea 
          name="subtitle" 
          defaultValue={initialData?.subtitle} 
          placeholder="Penjelasan singkat..." 
          className="w-full p-3 border border-[#A47148] rounded-xl focus:ring-2 focus:ring-[#A47148]/50 outline-none transition-all h-24" 
          required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Foto Hero {initialData && "(Kosongkan jika tidak ganti)"}</label>
        <input 
          type="file" 
          name="image_file" 
          className="w-full p-2 border border-dashed border-[#A47148] rounded-xl file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#A47148] file:text-white hover:file:bg-[#8b5e3c]" 
          required={!initialData} 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Teks Tombol (CTA)</label>
          <input 
            name="cta_text" 
            defaultValue={initialData?.cta_text} 
            placeholder="Konsultasi Sekarang" 
            className="w-full p-3 border border-[#A47148] rounded-xl focus:ring-2 focus:ring-[#A47148]/50 outline-none transition-all" 
            required 
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Link Tombol (WA/URL)</label>
          <input 
            name="cta_link" 
            defaultValue={initialData?.cta_link} 
            placeholder="https://wa.me/..." 
            className="w-full p-3 border border-[#A47148] rounded-xl focus:ring-2 focus:ring-[#A47148]/50 outline-none transition-all" 
            required 
          />
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button 
          type="submit" 
          disabled={loading} 
          className="flex-1 bg-[#A47148] hover:bg-[#8b5e3c] text-white p-3 rounded-xl font-bold transition-all shadow-lg shadow-[#A47148]/20 disabled:bg-slate-300 disabled:shadow-none"
        >
          {loading ? "Menyimpan..." : initialData ? "Update Hero" : "Gaskan Hero Baru"}
        </button>
      </div>
    </form>
  );
};