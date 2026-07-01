// src/components/CategoryTable.tsx
import { Category } from "@/core/domain/entities/Category";
import { Edit, Trash2 } from "lucide-react";

interface TableProps {
  data: Category[];
  onEdit: (item: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryTable({ data, onEdit, onDelete }: TableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">
              ID
            </th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">
              Nama
            </th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider">
              Slug
            </th>
            <th className="p-4 text-sm font-bold text-slate-600 tracking-wider text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((cat) => (
            <tr key={cat.id} className="p-10 text-slate-400">
              <td className="p-3 text-sm">{cat.id}</td>
              <td className="p-3 text-sm font-medium">{cat.name}</td>
              <td className="p-3 text-sm text-slate-800">{cat.slug}</td>
              <td className="p-3 text-sm">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(cat)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Hero"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(cat.id!)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Hero"
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
}
