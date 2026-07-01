"use client";
import { useEffect, useState } from "react";
import { Portfolio } from "@/core/domain/entities/Portfolio";
import { Plus, Trash } from "lucide-react";
import { ApiCategoryRepository } from "@/core/infrastructure/repositories/ApiCategoryRepository";
import { CategoryUseCase } from "@/core/application/use-cases/CategoryUseCase";
import { Category } from "@/core/domain/entities/Category";

export const PortfolioForm = ({ onSubmit, loading, initialData }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryRepo = new ApiCategoryRepository();
  const categoryUseCase = new CategoryUseCase(categoryRepo);

  useEffect(() => {
    // Ambil data kategori bersamaan dengan data service
    categoryUseCase.executeGetAll().then(setCategories);
  }, []);
  // State untuk field dinamis
  const [problems, setProblems] = useState<string[]>(
    initialData?.problems || [""],
  );
  const [solutions, setSolutions] = useState<string[]>(
    initialData?.solutions || [""],
  );
  const [results, setResults] = useState<string[]>(
    initialData?.results || [""],
  );

  const handleAddField = (setter: any, current: any) =>
    setter([...current, ""]);
  const handleRemoveField = (setter: any, current: any, index: number) => {
    setter(current.filter((_: any, i: number) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Append array manual agar terbaca Laravel
    problems.forEach((p) => formData.append("problems[]", p));
    solutions.forEach((s) => formData.append("solutions[]", s));
    results.forEach((r) => formData.append("results[]", r));

    onSubmit(formData);
  };

  const inputClass =
    "w-full p-3 border border-[#A47148] rounded-xl focus:ring-2 focus:ring-[#A47148]/50 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">
            Client Name
          </label>
          <input
            name="client_name"
            defaultValue={initialData?.client_name}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="text-sm font-bold text-slate-700">Category</label>
          <select
            name="category_id"
            defaultValue={initialData?.category_id}
            className={inputClass}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            
            {/* PERBAIKAN: Gunakan kurung kurawal agar JavaScript terbaca */}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">
          Project Title
        </label>
        <input
          name="title"
          defaultValue={initialData?.title}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="text-sm font-bold text-slate-700">
          Thumbnail {initialData && "(Kosongkan jika tetap)"}
        </label>
        <input
          type="file"
          name="image_thumbnail"
          className="w-full p-2 border border-dashed border-[#A47148] rounded-xl"
          required={!initialData}
        />
      </div>

      {/* DYNAMIC FIELDS SECTION */}
      {[
        { label: "Problems", state: problems, setter: setProblems },
        { label: "Solutions", state: solutions, setter: setSolutions },
        { label: "Results", state: results, setter: setResults },
      ].map((group) => (
        <div
          key={group.label}
          className="p-4 border border-[#A47148]/30 rounded-2xl bg-slate-50/50"
        >
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-black text-[#A47148] uppercase">
              {group.label}
            </label>
            <button
              type="button"
              onClick={() => handleAddField(group.setter, group.state)}
              className="text-[#A47148] hover:scale-110 transition-transform"
            >
              <Plus size={20} />
            </button>
          </div>
          {group.state.map((val, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                value={val}
                onChange={(e) => {
                  const newFields = [...group.state];
                  newFields[idx] = e.target.value;
                  group.setter(newFields);
                }}
                className={inputClass}
                placeholder={`Isi ${group.label.toLowerCase()}...`}
                required
              />
              {group.state.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveField(group.setter, group.state, idx)
                  }
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#A47148] hover:bg-[#8b5e3c] text-white p-4 rounded-xl font-bold shadow-lg transition-all"
      >
        {loading
          ? "Menyimpan Data..."
          : initialData
            ? "Update Portfolio"
            : "Simpan Portfolio Baru"}
      </button>
    </form>
  );
};
