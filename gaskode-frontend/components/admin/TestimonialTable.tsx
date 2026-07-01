import { Testimonial } from "@/core/domain/entities/Testimonial";
import { Edit2, Trash2, Star, Quote } from "lucide-react";

interface Props {
  data: Testimonial[];
  onEdit: (item: Testimonial) => void;
  onDelete: (id: number) => void;
}

export function TestimonialTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm">
            <th className="p-4 font-bold">Pemberi Ulasan</th>
            <th className="p-4 font-bold">Konten</th>
            <th className="p-4 font-bold text-center">Rating</th>
            <th className="p-4 font-bold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4">
                <div className="font-bold text-slate-900">{item.name}</div>
                <div className="text-xs text-slate-500">{item.position}</div>
              </td>
              <td className="p-4">
                <div className="text-sm text-slate-600 italic line-clamp-2">"{item.content}"</div>
              </td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                  ))}
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={18}/></button>
                  <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}