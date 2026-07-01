import { Post, PostStatus } from "@/core/domain/entities/Post";
import { Category } from "@/core/domain/entities/Category";

interface Props {
  initialData?: Post | null;
  categories: Category[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export function PostForm({ initialData, categories, onSubmit, loading }: Props) {
  const inputClass = "w-full border border-slate-200 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-[#A47148] outline-none transition-all";

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto px-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Judul Artikel</label>
          <input name="title" defaultValue={initialData?.title} className={inputClass} required />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Kategori</label>
          <select name="category_id" defaultValue={initialData?.category_id} className={inputClass} required>
            <option value="">Pilih Kategori</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">Ringkasan (Excerpt)</label>
        <textarea name="excerpt" defaultValue={initialData?.excerpt} className={inputClass} rows={2} required />
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">Konten (HTML)</label>
        <textarea name="content" defaultValue={initialData?.content} className={`${inputClass} font-mono text-sm`} rows={6} required />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl">
        <div>
          <label className="text-sm font-bold text-slate-700">Meta Title (SEO)</label>
          <input name="meta_title" defaultValue={initialData?.meta_title} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Meta Description</label>
          <input name="meta_description" defaultValue={initialData?.meta_description} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">Status</label>
        <select name="status" defaultValue={initialData?.status || "draft"} className={inputClass}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#A47148] text-white p-4 rounded-xl font-bold shadow-lg transition-all active:scale-95">
        {loading ? "Menyimpan..." : "Simpan Artikel"}
      </button>
    </form>
  );
}