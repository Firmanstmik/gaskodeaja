import { Branding } from "@/core/domain/entities/Branding";
import { Edit2, Trash2, ShieldCheck, ListChecks } from "lucide-react";

interface Props {
  data: Branding[];
  onEdit: (branding: Branding) => void;
  onDelete: (id: number) => void;
}

export function BrandingTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600">Pernyataan & Poin Jawaban</th>
            <th className="p-4 font-bold text-sm text-slate-600">Kategori</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-400 mt-1">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900 leading-tight">
                        {item.pernyataan}
                      </div>
                      <div className="space-y-1">
                        {item.jawaban?.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-500">
                            <ListChecks size={12} className="text-[#A47148]" />
                            <span className="line-clamp-1">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    {item.kategori}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => onEdit(item)} 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-8 text-center text-slate-400 italic">
                Belum ada data Branding.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}