'use client';
import { useEffect, useState, useMemo } from "react";
import { Branding } from "@/core/domain/entities/Branding";
import { ApiBrandingRepository } from "@/core/infrastructure/repositories/ApiBrandingRepository";
import { BrandingUseCase } from "@/core/application/use-cases/BrandingUseCase";
import { BrandingTable } from "@/components/admin/BrandingTable";
import { BrandingForm } from "@/components/admin/BrandingForm";
import { Modal } from "@/components/ui/Modal";

export default function BrandingAdminPage() {
  const [brandings, setBrandings] = useState<Branding[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranding, setSelectedBranding] = useState<Branding | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi Service menggunakan UseCase
  const brandingService = useMemo(() => {
    const repo = new ApiBrandingRepository();
    return new BrandingUseCase(repo);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await brandingService.getAll();
      setBrandings(data || []);
    } catch (error) {
      console.error("Gagal memuat data branding:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedBranding(null);
    setIsModalOpen(true);
  };

  const handleEdit = (branding: Branding) => {
    setSelectedBranding(branding);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: Omit<Branding, "id">) => {
    setIsSubmitting(true);
    try {
      if (selectedBranding) {
        await brandingService.update(selectedBranding.id, formData);
      } else {
        await brandingService.add(formData);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus data branding ini?")) {
      try {
        await brandingService.delete(id);
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
          <h1 className="text-2xl font-bold text-slate-800">Branding Management</h1>
          <p className="text-sm text-slate-500">Kelola identitas dan poin branding landing page.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
        >
          + Tambah Branding
        </button>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#A47148] rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Memuat data branding...</p>
          </div>
        </div>
      ) : (
        <BrandingTable 
          data={brandings} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedBranding ? "Edit Branding" : "Tambah Branding Baru"}
      >
        <BrandingForm 
          initialData={selectedBranding} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
}