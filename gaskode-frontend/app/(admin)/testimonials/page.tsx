"use client";
import { useEffect, useState } from "react";
import { ApiTestimonialRepository } from "@/core/infrastructure/repositories/ApiTestimonialRepository";
import { ApiPortfolioRepository } from "@/core/infrastructure/repositories/ApiPortfolioRepository";
import { TestimonialUseCase } from "@/core/application/use-cases/TestimonialUseCase";
import { PortfolioUseCase } from "@/core/application/use-cases/PortfolioUseCase";
import { Testimonial } from "@/core/domain/entities/Testimonial";
import { Portfolio } from "@/core/domain/entities/Portfolio";
import { TestimonialTable } from "@/components/admin/TestimonialTable";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { Modal } from "@/components/ui/Modal";
import { Plus, MessageSquareQuote } from "lucide-react";

// Inisialisasi Use Cases
const testimonialUseCase = new TestimonialUseCase(new ApiTestimonialRepository());
const portfolioUseCase = new PortfolioUseCase(new ApiPortfolioRepository());

export default function TestimonialAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);

  // Load data testimoni dan portofolio secara paralel
  const loadInitialData = async () => {
    try {
      const [testimonialData, portfolioData] = await Promise.all([
        testimonialUseCase.fetchAll(),
        portfolioUseCase.fetchAll(),
      ]);
      setTestimonials(testimonialData);
      setPortfolios(portfolioData);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      position: formData.get("position") as string,
      content: formData.get("content") as string,
      rating: Number(formData.get("rating")),
      portfolio_id: formData.get("portfolio_id") ? Number(formData.get("portfolio_id")) : null,
    };

    try {
      await testimonialUseCase.save(payload, selectedTestimonial?.id);
      setIsModalOpen(false);
      loadInitialData();
    } catch (err) {
      alert("Gagal menyimpan testimoni");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      try {
        await testimonialUseCase.remove(id);
        loadInitialData();
      } catch (err) {
        alert("Gagal menghapus testimoni");
      }
    }
  };

  const openEditModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquareQuote className="text-[#A47148]" size={28} />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Client Testimonials
              </h1>
            </div>
            <p className="text-slate-500 text-sm">
              Kelola ulasan dan feedback dari klien Anda
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#A47148] text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#8b5e3c] transition-all active:scale-95"
          >
            <Plus size={20} /> Tambah Testimoni
          </button>
        </div>

        {/* Content Section */}
        <div className="mt-4">
          <TestimonialTable
            data={testimonials}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTestimonial ? "Edit Testimoni" : "Tambah Testimoni Baru"}
      >
        <TestimonialForm
          onSubmit={handleSave}
          loading={loading}
          initialData={selectedTestimonial}
          portfolios={portfolios}
        />
      </Modal>
    </div>
  );
}