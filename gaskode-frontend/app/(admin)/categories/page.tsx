// src/app/categories/page.tsx
"use client";
import { useEffect, useState } from "react";
import { ApiCategoryRepository } from "@/core/infrastructure/repositories/ApiCategoryRepository";
import { CategoryUseCase } from "@/core/application/use-cases/CategoryUseCase";
import { Category } from "@/core/domain/entities/Category";
import CategoryTable from "@/components/admin/CategoryTable";
import CategoryForm from "@/components/admin/CategoryForm";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  // Inisialisasi Service (Clean Architecture)
  const repo = new ApiCategoryRepository();
  const useCase = new CategoryUseCase(repo);

  const loadData = async () => {
    const res = await useCase.executeGetAll();
    setCategories(res);
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const name = formData.get("name") as string;

    try {
      if (selectedCategory) {
        // Mode Update
        await repo.update(selectedCategory.id, { name });
      } else {
        // Mode Create
        await useCase.executeCreate(name);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert("Gagal memproses data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus?")) {
      await useCase.executeDelete(id);
      loadData();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category</h1>
        <button 
          onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-[#A47148] text-white px-4 py-2 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95">
          + Tambah
        </button>
      </div>

      <CategoryTable 
        data={categories} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      {isModalOpen && (
        <CategoryForm 
          initialData={selectedCategory}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
          isLoading={loading}
        />
      )}
    </div>
  );
}