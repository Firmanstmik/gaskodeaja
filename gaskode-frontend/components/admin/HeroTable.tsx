"use client";
import { Hero } from "@/core/domain/entities/Hero";
import { Edit, Trash2, Globe, Layout } from "lucide-react";

interface HeroTableProps {
  data: Hero[];
  onEdit: (hero: Hero) => void;
  onDelete: (id: number) => void;
}

export const HeroTable = ({ data, onEdit, onDelete }: HeroTableProps) => {
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || "http://localhost:8006";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">Visual</th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">Informasi Hero</th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">CTA & Link</th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">Status</th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-10 text-center text-slate-400">Belum ada data hero.</td>
            </tr>
          ) : (
            data.map((hero) => (
              <tr key={hero.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="w-20 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                    <img 
                      src={`${IMG_URL}/${hero.image_path}`} 
                      className="w-full h-full object-cover"
                      alt="Thumbnail"
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/400x200?text=No+Image")}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-slate-800 line-clamp-1">{hero.title}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{hero.subtitle}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
                    <Layout size={14} /> {hero.cta_text}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                    {hero.cta_link}
                  </div>
                </td>
                <td className="p-4">
                  {hero.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Draft
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(hero)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Hero"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(hero.id!)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Hero"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};