import { Service } from "@/core/domain/entities/Service";

interface ServiceFormProps {
  initialData?: Service | null;
  // Ubah tipe di sini agar menerima Event, bukan FormData secara langsung
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
  loading: boolean;
}

// Gunakan Named Export (tambahkan 'export' dan hapus 'default')
export function ServiceForm({ initialData, onSubmit, loading }: ServiceFormProps) {
  const inputClass = "w-full border border-slate-200 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-[#A47148] focus:border-transparent outline-none transition-all";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="text-sm font-bold text-slate-700 ml-1">Service Title</label>
        <input 
          name="title" 
          defaultValue={initialData?.title} 
          className={inputClass} 
          placeholder="e.g. Web Development"
          required 
        />
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
        <textarea 
          name="description" 
          defaultValue={initialData?.description} 
          className={inputClass} 
          rows={4} 
          placeholder="Describe what this service offers..."
          required 
        />
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700 ml-1">Icon Class</label>
        <input 
          name="icon" 
          defaultValue={initialData?.icon} 
          className={inputClass} 
          placeholder="e.g. fa-solid fa-code" 
          required 
        />
        <p className="text-[10px] text-slate-400 mt-1 ml-1">*Gunakan class FontAwesome atau Lucide icon name</p>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full md:w-auto bg-[#A47148] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#8a5e3c] disabled:bg-slate-300 transition-all active:scale-95"
        >
          {loading ? "Sedang Menyimpan..." : "Simpan Data"}
        </button>
      </div>
    </form>
  );
}