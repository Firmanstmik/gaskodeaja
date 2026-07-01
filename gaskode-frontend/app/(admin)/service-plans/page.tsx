"use client";
import { useEffect, useState } from "react";
import { ApiServicePlanRepository } from "@/core/infrastructure/repositories/ApiServicePlanRepository";
import { ApiServiceRepository } from "@/core/infrastructure/repositories/ApiServiceRepository"; // Asumsi repo service sudah ada
import { ServicePlanUseCase } from "@/core/application/use-cases/ServicePlanUseCase";
import { ServicePlan } from "@/core/domain/entities/ServicePlan";
import { Service } from "@/core/domain/entities/Service";
import { ServicePlanTable } from "@/components/admin/ServicePlanTable";
import { ServicePlanForm } from "@/components/admin/ServicePlanForm";
import { Modal } from "@/components/ui/Modal";
import { Plus, LayoutGrid } from "lucide-react";

const planUseCase = new ServicePlanUseCase(new ApiServicePlanRepository());
// Repo service untuk mengambil list layanan induk
const serviceRepo = new ApiServiceRepository(); 

export default function ServicePlanAdminPage() {
  const [plans, setPlans] = useState<ServicePlan[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

  const loadData = async () => {
    try {
      const [planData, serviceData] = await Promise.all([
        planUseCase.fetchAll(),
        serviceRepo.getAll() // Pastikan method ini ada di ApiServiceRepository
      ]);
      setPlans(planData);
      setServices(serviceData);
    } catch (err) {
      console.error("Gagal load data");
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (data: any) => {
    setLoading(true);
    try {
      await planUseCase.savePlan(data, selectedPlan?.id);
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert("Gagal menyimpan paket");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus paket layanan ini?")) {
      await planUseCase.deletePlan(id);
      loadData();
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid className="text-[#A47148]" size={24} />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Service Plans</h1>
            </div>
            <p className="text-slate-500 text-sm">Kelola daftar harga dan fitur setiap layanan</p>
          </div>
          <button
            onClick={() => { setSelectedPlan(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#A47148] text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
          >
            <Plus size={20} /> Buat Paket Baru
          </button>
        </div>

        <ServicePlanTable 
          data={plans} 
          services={services}
          onEdit={(plan) => { setSelectedPlan(plan); setIsModalOpen(true); }}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPlan ? "Edit Paket Layanan" : "Buat Paket Layanan Baru"}
      >
        <ServicePlanForm
          onSubmit={handleSave}
          loading={loading}
          initialData={selectedPlan}
          services={services}
        />
      </Modal>
    </div>
  );
}