'use client';
import { useEffect, useState, useMemo } from "react";
import { VisiMisi } from "@/core/domain/entities/VisiMisi";
import { ApiVisiMisiRepository } from "@/core/infrastructure/repositories/ApiVisiMisiRepository";
import { VisiMisiUseCase } from "@/core/application/use-cases/VisiMisiUseCase";
import { VisiMisiTable } from "@/components/admin/VisiMisiTable";
import { VisiMisiForm } from "@/components/admin/VisiMisiForm";
import { Modal } from "@/components/ui/Modal";
import { Target } from "lucide-react";

export default function VisiMisiAdminPage() {
  const [data, setData] = useState<VisiMisi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VisiMisi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi Service
  const service = useMemo(() => {
    const repo = new ApiVisiMisiRepository();
    return new VisiMisiUseCase(repo);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await service.getAll();
      setData(res || []);
    } catch (error) {
      console.error("Gagal load visi-misi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: VisiMisi) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: Omit<VisiMisi, "id">) => {
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
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus data ini?")) {
      try {
        await service.delete(id);
        await loadData();
      } catch (error) {
        alert("Gagal menghapus.");
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
            <Target className="text-[#A47148]" size={28} />
            Visi & Misi
          </h1>
          <p className="text-sm text-slate-500">Atur tujuan strategis dan langkah operasional bisnis.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
        >
          + Tambah Data
        </button>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#A47148] rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Sinkronisasi data visi misi...</p>
          </div>
        </div>
      ) : (
        <VisiMisiTable 
          data={data} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedItem ? "Perbarui Visi/Misi" : "Tambah Visi/Misi"}
      >
        <VisiMisiForm 
          initialData={selectedItem} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
}