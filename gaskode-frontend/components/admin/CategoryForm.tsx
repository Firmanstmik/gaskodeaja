import { Category } from "@/core/domain/entities/Category";

interface CategoryFormProps {
  initialData?: Category | null;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CategoryForm({ initialData, onSubmit, onClose, isLoading }: CategoryFormProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Kategori" : "Tambah Kategori"}
        </h2>
        
        <form action={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">Nama Kategori</label>
            <input 
              name="name" 
              defaultValue={initialData?.name} 
              className="w-full border p-2 rounded mt-1" 
              placeholder="Masukkan nama kategori"
              required 
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-slate-400"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}