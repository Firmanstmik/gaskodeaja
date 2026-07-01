"use client";
import { useEffect, useState } from "react";
import { ApiHeroRepository } from "@/core/infrastructure/repositories/ApiHeroRepository";
import { HeroUseCase } from "@/core/application/use-cases/HeroUseCase";
import { Hero } from "@/core/domain/entities/Hero";
import { HeroForm } from "@/components/admin/HeroForm";
import { HeroTable } from "@/components/admin/HeroTable"; // Import Tabel
import { Modal } from "@/components/ui/Modal";
import { Plus } from "lucide-react";

const repo = new ApiHeroRepository();
const useCase = new HeroUseCase(repo);

export default function HeroAdminPage() {
  const [heros, setHeros] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const loadData = async () => {
    try {
      const data = await useCase.fetchAllHeros();
      setHeros(data);
    } catch (err) {
      console.error("Gagal load data");
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (formData: FormData) => {
    setLoading(true);
    try {
      await useCase.saveHero(formData, selectedHero?.id);
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus hero ini? File foto juga akan terhapus.")) {
      await useCase.removeHero(id);
      loadData();
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hero Section</h1>
          </div>
          <button 
            onClick={() => { setSelectedHero(null); setIsModalOpen(true); }} 
            className="flex items-center gap-2 bg-[#A47148] text-white px-4 py-2 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95">
          
            <Plus size={20} /> Tambah Data
          </button>
        </div>

        <HeroTable 
          data={heros} 
          onEdit={(hero) => { setSelectedHero(hero); setIsModalOpen(true); }} 
          onDelete={handleDelete} 
        />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedHero ? "Edit Hero" : "Tambah Hero"}
      >
        <HeroForm onSubmit={handleSave} loading={loading} initialData={selectedHero} />
      </Modal>
    </div>
  );
}