"use client";
import { useEffect, useState } from "react";
import { ApiServiceRepository } from "@/core/infrastructure/repositories/ApiServiceRepository";
import { ServiceUseCase } from "@/core/application/use-cases/ServiceUseCase";
import { Service } from "@/core/domain/entities/Service";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { ServiceTable } from "@/components/admin/ServiceTable";
import { Modal } from "@/components/ui/Modal";
import { Plus } from "lucide-react";

// Inisialisasi Clean Arch
const repo = new ApiServiceRepository();
const useCase = new ServiceUseCase(repo);

export default function ServiceAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const loadData = async () => {
    try {
      const data = await useCase.getAllServices();
      setServices(data);
    } catch (err) {
      console.error("Gagal load data services");
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Sangat penting: mencegah halaman reload
  setLoading(true);

  // Ambil FormData dari target form
  const formData = new FormData(e.currentTarget);
  
  try {
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
    };

    if (selectedService) {
      await useCase.updateService(selectedService.id, payload);
    } else {
      await useCase.createService(payload);
    }
    
    setIsModalOpen(false);
    loadData();
  } catch (err: any) {
    alert(err.message || "Gagal menyimpan service");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus service ini?")) {
      try {
        await useCase.deleteService(id);
        loadData();
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Services</h1>
          </div>
          <button 
            onClick={() => { setSelectedService(null); setIsModalOpen(true); }} 
            className="flex items-center gap-2 bg-[#A47148] text-white px-4 py-2 rounded-2xl font-bold shadow-lg transition-all active:scale-95">
            <Plus size={20} /> Tambah Service
          </button>
        </div>

        <ServiceTable 
          data={services} 
          onEdit={(service) => { setSelectedService(service); setIsModalOpen(true); }} 
          onDelete={handleDelete} 
        />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedService ? "Edit Service" : "Tambah Service"}
      >
        <ServiceForm 
          onSubmit={handleSave} 
          loading={loading} 
          initialData={selectedService} 
        />
      </Modal>
    </div>
  );
}