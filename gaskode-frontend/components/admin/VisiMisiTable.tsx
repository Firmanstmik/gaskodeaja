import { VisiMisi } from "@/core/domain/entities/VisiMisi";
import { Edit2, Trash2, Target, Rocket } from "lucide-react";

export function VisiMisiTable({ data, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600 w-16 text-center">No</th>
            <th className="p-4 font-bold text-sm text-slate-600">Konten Visi & Misi</th>
            <th className="p-4 font-bold text-sm text-slate-600">Tipe</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.sort((a:any, b:any) => a.urutan - b.urutan).map((item: VisiMisi) => (
            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="p-4 text-center font-mono text-slate-400 text-xs">{item.urutan}</td>
              <td className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-1 ${item.tipe === 'visi' ? 'bg-blue-50 text-blue-400' : 'bg-purple-50 text-purple-400'}`}>
                    {item.tipe === 'visi' ? <Target size={18} /> : <Rocket size={18} />}
                  </div>
                  <ul className="list-disc ml-4 space-y-1">
                    {item.konten.map((txt, i) => (
                      <li key={i} className="text-sm text-slate-600 leading-relaxed">{txt}</li>
                    ))}
                  </ul>
                </div>
              </td>
              <td className="p-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${item.tipe === 'visi' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {item.tipe}
                </span>
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