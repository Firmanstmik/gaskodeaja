"use client";
import { Portfolio } from "@/core/domain/entities/Portfolio";
import { Edit, Trash2, ExternalLink, Briefcase } from "lucide-react";

interface PortfolioTableProps {
  data: Portfolio[];
  onEdit: (item: Portfolio) => void;
  onDelete: (id: number) => void;
}

export const PortfolioTable = ({ data, onEdit, onDelete }: PortfolioTableProps) => {
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || "http://localhost:8006";

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 text-xs font-black text-slate-400 uppercase">Preview</th>
            <th className="p-4 text-xs font-black text-slate-400 uppercase">Project & Client</th>
            <th className="p-4 text-xs font-black text-slate-400 uppercase">Scope</th>
            <th className="p-4 text-xs font-black text-slate-400 uppercase text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
              <td className="p-4">
                <div className="w-20 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img 
                    src={`${IMG_URL}/${item.image_thumbnail}`} 
                    className="w-full h-full object-cover" 
                    alt="thumb" 
                  />
                </div>
              </td>
              <td className="p-4">
                <div className="font-bold text-slate-800">{item.title}</div>
                <div className="flex items-center gap-1 text-xs text-[#A47148] font-medium">
                  <Briefcase size={12} /> {item.client_name}
                </div>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-lg border border-blue-100">
                    {item.problems?.length || 0} Problems
                  </span>
                  <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-lg border border-green-100">
                    {item.solutions?.length || 0} Solutions
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-1">
                  <button 
                    onClick={() => onEdit(item)}
                    className="p-2 text-[#A47148] hover:bg-[#A47148]/10 rounded-xl transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id!)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};