import { Service } from "@/core/domain/entities/Service";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
  data: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

export function ServiceTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="p-4 font-bold text-slate-700 text-sm">Icon</th>
            <th className="p-4 font-bold text-slate-700 text-sm">Title</th>
            <th className="p-4 font-bold text-slate-700 text-sm">Description</th>
            <th className="p-4 font-bold text-slate-700 text-sm text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-8 text-center text-slate-400 italic">Data kosong</td>
            </tr>
          ) : (
            data.map((service) => (
              <tr key={service.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                <td className="p-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-xl text-slate-600">
                    {/* Render icon (asumsi string class font-awesome atau sejenisnya) */}
                    <i className={service.icon || "fa fa-cog"}></i>
                  </div>
                </td>
                <td className="p-4 font-semibold text-slate-800">{service.title}</td>
                <td className="p-4 text-slate-500 text-sm max-w-xs truncate">
                  {service.description}
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => onEdit(service)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
}