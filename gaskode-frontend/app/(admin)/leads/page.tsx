"use client";
import { useEffect, useState } from "react";
import { ApiLeadRepository } from "@/core/infrastructure/repositories/ApiLeadRepository";
import { LeadUseCase } from "@/core/application/use-cases/LeadUseCase";
import { Lead } from "@/core/domain/entities/Lead";
import { LeadTable } from "@/components/admin/LeadTable";
import { LeadForm } from "@/components/admin/LeadForm";
import { Modal } from "@/components/ui/Modal";
import { Plus } from "lucide-react"; // Tambahkan icon untuk tombol

// Inisialisasi di luar komponen agar tidak dibuat ulang saat render
const repo = new ApiLeadRepository();
const useCase = new LeadUseCase(repo);

export default function LeadAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const data = await useCase.fetchAllLeads();
      setLeads(data);
    } catch (err) {
      console.error("Gagal load data leads");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  const formData = new FormData(e.currentTarget);

  const payload = {
    name: formData.get("name") as string,
    whatsapp_number: formData.get("whatsapp_number") as string,
    requirement: formData.get("requirement") as string,
    status: formData.get("status") as any,
  };

  try {
    // PERBAIKAN: Gunakan submitLead untuk keduanya (Create & Update)
    // payload akan dikirim lengkap, bukan cuma statusnya saja
    await useCase.submitLead(payload, selectedLead?.id);
    
    setIsModalOpen(false);
    loadData();
  } catch (err) {
    alert("Gagal memproses data lead");
  } finally {
    setLoading(false);
  }
};

  const handleUpdateStatus = async (id: number, status: any) => {
    try {
      await useCase.patchStatus(id, status);
      loadData();
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus data lead ini?")) {
      try {
        await useCase.removeLead(id);
        loadData();
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section dengan Tombol Tambah */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Incoming Leads
            </h1>
            <p className="text-slate-500 text-sm">
              Kelola pesan dan permintaan klien
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedLead(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#A47148] text-white px-4 py-2 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
          >
            <Plus size={20} /> Tambah Manual
          </button>
        </div>

        {/* Tabel Data */}
        <LeadTable
          data={leads}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          onEdit={(lead) => {
            setSelectedLead(lead);
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedLead ? "Edit Lead" : "Tambah Lead Manual"}
      >
        <LeadForm
          onSubmit={handleSave}
          loading={loading}
          initialData={selectedLead}
        />
      </Modal>
    </div>
  );
}
