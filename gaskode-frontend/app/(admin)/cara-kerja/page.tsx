'use client';
import { useEffect, useState, useMemo } from "react";
import { CaraKerja } from "@/core/domain/entities/CaraKerja";
import { ApiCaraKerjaRepository } from "@/core/infrastructure/repositories/ApiCaraKerjaRepository";
import { CaraKerjaUseCase } from "@/core/application/use-cases/CaraKerjaUseCase";
import { CaraKerjaTable } from "@/components/admin/CaraKerjaTable";
import { CaraKerjaForm } from "@/components/admin/CaraKerjaForm";
import { Modal } from "@/components/ui/Modal";
import { Workflow } from "lucide-react";

export default function CaraKerjaAdminPage() {
  const [data, setData] = useState<CaraKerja[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CaraKerja | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi Service dengan useMemo
  const service = useMemo(() => {
    const repo = new ApiCaraKerjaRepository();
    return new CaraKerjaUseCase(repo);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await service.getAll();
      setData(res || []);
    } catch (error) {
      console.error("Gagal load cara-kerja:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: CaraKerja) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: Omit<CaraKerja, "id">) => {
    setIsSubmitting(true);
    try {
      if (selectedItem) {
        await service.update(selectedItem.id, formData);
      } else {
        await service.add(formData);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (error) {
      alert("Terjadi kesalahan pada server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus langkah ini?")) {
      try {
        await service.delete(id);
        await loadData();
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Workflow className="text-[#A47148]" size={28} />
            Cara Kerja
          </h1>
          <p className="text-sm text-slate-500">Kelola langkah-langkah proses pengerjaan proyek.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
        >
          + Tambah Langkah
        </button>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#A47148] rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Memuat alur kerja...</p>
          </div>
        </div>
      ) : (
        <CaraKerjaTable 
          data={data} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* MODAL UNTUK FORM */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedItem ? "Edit Langkah" : "Tambah Langkah Baru"}
      >
        <CaraKerjaForm 
          initialData={selectedItem} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
}