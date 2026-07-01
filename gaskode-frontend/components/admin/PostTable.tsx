import { Post } from "@/core/domain/entities/Post";
import { Category } from "@/core/domain/entities/Category";
import { Edit2, Trash2, ExternalLink, FileText } from "lucide-react";

interface Props {
  data: Post[];
  categories: Category[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export function PostTable({ data, categories, onEdit, onDelete }: Props) {
  // Helper untuk mendapatkan nama kategori berdasarkan ID
  const getCategoryName = (id: number) => {
    return categories.find((cat) => cat.id === id)?.name || "Uncategorized";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600">Artikel</th>
            <th className="p-4 font-bold text-sm text-slate-600">Kategori</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Status</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((post) => (
              <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 line-clamp-1">{post.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    {getCategoryName(post.category_id)}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm
                    ${post.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => onEdit(post)} 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(post.id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    <a 
                      href={`/blog/${post.slug}`} 
                      target="_blank" 
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-8 text-center text-slate-400 italic">Belum ada artikel.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}