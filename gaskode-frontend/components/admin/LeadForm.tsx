import { Lead } from "@/core/domain/entities/Lead";

interface LeadFormProps {
  initialData?: Lead | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export function LeadForm({ initialData, onSubmit, loading }: LeadFormProps) {
  const inputClass = "w-full border border-slate-200 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-[#A47148] focus:border-transparent outline-none transition-all";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700 ml-1">Nama Klien</label>
          <input 
            name="name" 
            defaultValue={initialData?.name} 
            className={inputClass} 
            placeholder="Contoh: Budi Setiawan"
            required 
          />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700 ml-1">Nomor WhatsApp</label>
          <input 
            name="whatsapp_number" 
            defaultValue={initialData?.whatsapp_number} 
            className={inputClass} 
            placeholder="Contoh: 081234567890"
            required 
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700 ml-1">Kebutuhan / Requirement</label>
        <textarea 
          name="requirement" 
          defaultValue={initialData?.requirement} 
          className={inputClass} 
          rows={4} 
          placeholder="Jelaskan kebutuhan klien..."
          required 
        />
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700 ml-1">Status</label>
        <select 
          name="status" 
          defaultValue={initialData?.status} 
          className={inputClass}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
          <option value="lose">Lose</option>
        </select>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full md:w-auto bg-[#A47148] text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#8a5e3c] disabled:bg-slate-300 transition-all active:scale-95"
        >
          {loading ? "Sedang Menyimpan..." : initialData ? "Update Lead" : "Simpan Lead"}
        </button>
      </div>
    </form>
  );
}