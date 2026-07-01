'use client';

import { useEffect, useState, useMemo } from "react";
import { User } from "@/core/domain/entities/User";
import { ApiUserRepository } from "@/core/infrastructure/repositories/ApiUserRepository";
import { UserUseCase } from "@/core/application/use-cases/UserUseCase";
import { UserTable } from "@/components/admin/UserTable";
import { UserForm } from "@/components/admin/UserForm";
import { Modal } from "@/components/ui/Modal";
import { Users } from "lucide-react";

export default function UserAdminPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi Service menggunakan pola yang sama dengan VisiMisi
  const service = useMemo(() => {
    return UserUseCase; // Karena UserUseCase sudah kita buat sebagai objek singleton/static
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await service.getUsers();
      setData(res || []);
    } catch (error) {
      console.error("Gagal load data user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: User) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (selectedItem) {
        await service.updateUser(selectedItem.id, formData);
      } else {
        await service.createUser(formData);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus user ini secara permanen?")) {
      try {
        await service.deleteUser(id);
        await loadData();
      } catch (error) {
        alert("Gagal menghapus user.");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-[#A47148]" size={28} />
            Manajemen User
          </h1>
          <p className="text-sm text-slate-500">Kelola akses dan informasi pengguna GaskodeAja.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
        >
          + Tambah User
        </button>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#A47148] rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Sinkronisasi data user...</p>
          </div>
        </div>
      ) : (
        <UserTable 
          data={data} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* Modal Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedItem ? "Perbarui Informasi User" : "Tambah User Baru"}
      >
        <UserForm 
          initialData={selectedItem} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
}