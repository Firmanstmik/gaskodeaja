import { Testimonial } from "@/core/domain/entities/Testimonial";
import { Portfolio } from "@/core/domain/entities/Portfolio";

interface Props {
  initialData?: Testimonial | null;
  portfolios: Portfolio[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export function TestimonialForm({ initialData, portfolios, onSubmit, loading }: Props) {
  const inputClass = "w-full border border-slate-200 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-[#A47148] outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Nama</label>
          <input name="name" defaultValue={initialData?.name} className={inputClass} required />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Jabatan/Posisi</label>
          <input name="position" defaultValue={initialData?.position} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">Isi Testimoni</label>
        <textarea name="content" defaultValue={initialData?.content} className={inputClass} rows={3} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Rating (1-5)</label>
          <select name="rating" defaultValue={initialData?.rating || 5} className={inputClass}>
            {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Bintang</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Terkait Proyek (Opsional)</label>
          <select name="portfolio_id" defaultValue={initialData?.portfolio_id || ""} className={inputClass}>
            <option value="">Tidak ada</option>
            {portfolios.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#A47148] text-white p-4 rounded-xl font-bold">
        {loading ? "Menyimpan..." : "Simpan Testimoni"}
      </button>
    </form>
  );
}