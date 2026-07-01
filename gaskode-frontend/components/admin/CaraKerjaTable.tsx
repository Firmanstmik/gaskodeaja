import { CaraKerja } from "@/core/domain/entities/CaraKerja";
import { Edit2, Trash2, ChevronRight } from "lucide-react";

export function CaraKerjaTable({ data, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600 w-20 text-center">Step</th>
            <th className="p-4 font-bold text-sm text-slate-600">Proses Cara Kerja</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: CaraKerja, index: number) => (
            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="p-4 text-center">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-[#A47148] flex items-center justify-center font-bold text-xs mx-auto">
                  {index + 1}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-slate-300" />
                  <span className="text-slate-700 font-medium">{item.list}</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={18} /></button>
                  <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}