"use client";

import { useEffect, useState } from "react";
import { Plus, Briefcase, LayoutGrid } from "lucide-react";

// Clean Architecture Imports
import { ApiPortfolioRepository } from "@/core/infrastructure/repositories/ApiPortfolioRepository";
import { PortfolioUseCase } from "@/core/application/use-cases/PortfolioUseCase";
import { Portfolio } from "@/core/domain/entities/Portfolio";

// UI Components
import { PortfolioTable } from "@/components/admin/PortfolioTable";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { Modal } from "@/components/ui/Modal";

// Inisialisasi UseCase (Dependency Injection Sederhana)
const repo = new ApiPortfolioRepository();
const portfolioUseCase = new PortfolioUseCase(repo);

export default function PortfolioAdminPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State untuk Kontrol Modal & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  // Ambil Data dari API
  const loadData = async () => {
    try {
      const data = await portfolioUseCase.fetchAll();
      setPortfolios(data);
    } catch (err) {
      console.error("Gagal memuat data portfolio");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handler Buka Modal Tambah
  const handleOpenAdd = () => {
    setSelectedPortfolio(null);
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit
  const handleOpenEdit = (item: Portfolio) => {
    setSelectedPortfolio(item);
    setIsModalOpen(true);
  };

  // Handler Hapus Data
  const handleDelete = async (id: number) => {
    if (confirm("Yakin hapus portfolio ini Om? File gambar di server juga akan dilenyapkan!")) {
      try {
        await portfolioUseCase.deletePortfolio(id);
        alert("Portfolio berhasil didelete!");
        loadData();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  // Handler Simpan (Create atau Update)
  const handleSave = async (formData: FormData) => {
    setLoading(true);
    try {
      await portfolioUseCase.savePortfolio(formData, selectedPortfolio?.id);
      alert("Data Portfolio Berhasil Disimpan.");
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-2">
          <div>
            
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Portfolio
            </h1>
          </div>

          <button 
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-[#A47148] hover:bg-[#8b5e3c] text-white px-4 py-2 rounded-2xl font-bold shadow-xl shadow-[#A47148]/20 transition-all active:scale-95"
          >
            <Plus size={20} />
            Tambah
          </button>
        </div>

        {/* --- TABEL DATA --- */}
        <PortfolioTable 
          data={portfolios} 
          onEdit={handleOpenEdit} 
          onDelete={handleDelete} 
        />

      </div>

      {/* --- MODAL FORM --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedPortfolio ? "Update Detail Karya" : "Gaskan Karya Baru"}
      >
        <div className="mt-2">
          <PortfolioForm 
            onSubmit={handleSave} 
            loading={loading} 
            initialData={selectedPortfolio} 
          />
        </div>
      </Modal>

    </div>
  );
}