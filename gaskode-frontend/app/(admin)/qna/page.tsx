'use client';
import { useEffect, useState, useMemo } from "react";
import { Qna } from "@/core/domain/entities/Qna";
import { ApiQnaRepository } from "@/core/infrastructure/repositories/ApiQnaRepository";
import { QnaUseCase } from "@/core/application/use-cases/QnaUseCase";
import { QnaTable } from "@/components/admin/QnaTable";
import { Modal } from "@/components/ui/Modal";
import { QnaForm } from "@/components/admin/QnaForm";

export default function QnaAdminPage() {
  // State untuk data dan loading
  const [qnas, setQnas] = useState<Qna[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal dan Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQna, setSelectedQna] = useState<Qna | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi Use Case (Menggunakan useMemo agar instance tidak dibuat ulang saat render)
  const qnaService = useMemo(() => {
    const qnaRepo = new ApiQnaRepository();
    return new QnaUseCase(qnaRepo);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await qnaService.getAllQna();
      setQnas(data || []);
    } catch (error) {
      console.error("Gagal memuat data Q&A:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handler untuk membuka modal tambah
  const handleAdd = () => {
    setSelectedQna(null);
    setIsModalOpen(true);
  };

  // Handler untuk membuka modal edit
  const handleEdit = (qna: Qna) => {
    setSelectedQna(qna);
    setIsModalOpen(true);
  };

  // Handler untuk proses Simpan (Create/Update)
  const handleSubmit = async (formData: Omit<Qna, "id">) => {
    setIsSubmitting(true);
    try {
      if (selectedQna) {
        await qnaService.updateQna(selectedQna.id, formData);
        console.log("Update data ID:", selectedQna.id);
      } else {
        await qnaService.addQna(formData);
      }
      setIsModalOpen(false);
      await loadData(); // Refresh table
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await qnaService.deleteQna(id);
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
          <h1 className="text-2xl font-bold text-slate-800">Q&A Management</h1>
          <p className="text-sm text-slate-500">Kelola pertanyaan dan jawaban untuk landing page.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
        >
          + Tambah Q&A
        </button>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#A47148] rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Menarik data dari API Laravel...</p>
          </div>
        </div>
      ) : (
        <QnaTable 
          data={qnas} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* MODAL FORM CRUD */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedQna ? "Edit Q&A" : "Tambah Q&A Baru"}
      >
        <QnaForm 
          initialData={selectedQna} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
}