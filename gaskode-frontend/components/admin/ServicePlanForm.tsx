import { useState } from "react";
import { ServicePlan } from "@/core/domain/entities/ServicePlan";
import { Service } from "@/core/domain/entities/Service";
import { Plus, Trash } from "lucide-react";

interface Props {
  initialData?: ServicePlan | null;
  services: Service[];
  onSubmit: (data: any) => void;
  loading: boolean;
}

export function ServicePlanForm({ initialData, services, onSubmit, loading }: Props) {
  const [features, setFeatures] = useState<string[]>(initialData?.features || [""]);
  const inputClass = "w-full border border-slate-200 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-[#A47148] outline-none transition-all";

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      service_id: Number(formData.get("service_id")),
      name: formData.get("name"),
      price: Number(formData.get("price")),
      maintenance_cost: Number(formData.get("maintenance_cost")),
      is_featured: formData.get("is_featured") === "true",
      features: features.filter(f => f.trim() !== ""), // Bersihkan string kosong
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Layanan Induk</label>
          <select name="service_id" defaultValue={initialData?.service_id} className={inputClass} required>
            <option value="">Pilih Layanan</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Nama Paket</label>
          <input name="name" defaultValue={initialData?.name} className={inputClass} placeholder="Contoh: Paket Pro" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Harga (IDR)</label>
          <input type="number" name="price" defaultValue={initialData?.price} className={inputClass} required />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Biaya Maintenance</label>
          <input type="number" name="maintenance_cost" defaultValue={initialData?.maintenance_cost} className={inputClass} />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-slate-700">Fitur Paket</label>
          <button type="button" onClick={() => setFeatures([...features, ""])} className="text-[#A47148] hover:bg-orange-50 p-1 rounded">
            <Plus size={18} />
          </button>
        </div>
        {features.map((feat, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input 
              value={feat} 
              onChange={(e) => {
                const newFeat = [...features];
                newFeat[idx] = e.target.value;
                setFeatures(newFeat);
              }}
              className={inputClass} 
              placeholder="Sebutkan fitur..."
            />
            {features.length > 1 && (
              <button type="button" onClick={() => setFeatures(features.filter((_, i) => i !== idx))} className="text-red-500">
                <Trash size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">Tampilkan sebagai Unggulan?</label>
        <select name="is_featured" defaultValue={String(initialData?.is_featured || false)} className={inputClass}>
          <option value="false">Tidak</option>
          <option value="true">Ya (Featured)</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#A47148] text-white p-4 rounded-xl font-bold shadow-lg transition-all active:scale-95">
        {loading ? "Menyimpan..." : "Simpan Paket"}
      </button>
    </form>
  );
}