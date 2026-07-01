"use client";
import { useEffect, useState } from "react";
import { ApiPostRepository } from "@/core/infrastructure/repositories/ApiPostRepository";
import { ApiCategoryRepository } from "@/core/infrastructure/repositories/ApiCategoryRepository";
import { PostUseCase } from "@/core/application/use-cases/PostUseCase";
import { CategoryUseCase } from "@/core/application/use-cases/CategoryUseCase";
import { Post } from "@/core/domain/entities/Post";
import { Category } from "@/core/domain/entities/Category";
import { PostTable } from "@/components/admin/PostTable";
import { PostForm } from "@/components/admin/PostForm";
import { Modal } from "@/components/ui/Modal";
import { Plus, Newspaper } from "lucide-react";

// Inisialisasi UseCases
const postUseCase = new PostUseCase(new ApiPostRepository());
const categoryUseCase = new CategoryUseCase(new ApiCategoryRepository());

export default function PostAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadInitialData = async () => {
    try {
      const [postData, categoryData] = await Promise.all([
        postUseCase.fetchAllPosts(),
        categoryUseCase.executeGetAll()
      ]);
      setPosts(postData);
      setCategories(categoryData);
    } catch (err) {
      console.error("Gagal memuat data artikel");
    }
  };

  useEffect(() => { loadInitialData(); }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title") as string,
      category_id: Number(formData.get("category_id")),
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      meta_title: formData.get("meta_title") as string,
      meta_description: formData.get("meta_description") as string,
      status: formData.get("status") as any,
    };

    try {
      await postUseCase.savePost(payload, selectedPost?.id);
      setIsModalOpen(false);
      loadInitialData();
    } catch (err) {
      alert("Gagal menyimpan artikel");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus artikel ini secara permanen?")) {
      try {
        await postUseCase.removePost(id);
        loadInitialData();
      } catch (err) {
        alert("Gagal menghapus artikel");
      }
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Newspaper className="text-[#A47148]" size={24} />
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blog Posts</h1>
            </div>
            <p className="text-slate-500 text-sm">Kelola konten edukasi dan berita terbaru</p>
          </div>
          <button
            onClick={() => { setSelectedPost(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#A47148] text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#8b5e3c] transition-all active:scale-95"
          >
            <Plus size={20} /> Tulis Artikel
          </button>
        </div>

        {/* Tabel Data */}
        <PostTable 
          data={posts} 
          categories={categories}
          onEdit={(post) => { setSelectedPost(post); setIsModalOpen(true); }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPost ? "Edit Artikel" : "Buat Artikel Baru"}
      >
        <PostForm
          onSubmit={handleSave}
          loading={loading}
          initialData={selectedPost}
          categories={categories}
        />
      </Modal>
    </div>
  );
}