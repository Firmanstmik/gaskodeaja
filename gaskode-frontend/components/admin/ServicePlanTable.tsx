import { ServicePlan } from "@/core/domain/entities/ServicePlan";
import { Service } from "@/core/domain/entities/Service";
import { Edit2, Trash2, Star } from "lucide-react";

interface Props {
  data: ServicePlan[];
  services: Service[];
  onEdit: (plan: ServicePlan) => void;
  onDelete: (id: number) => void;
}

export function ServicePlanTable({ data, services, onEdit, onDelete }: Props) {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getServiceName = (id: number) => {
    return services.find((s) => s.id === id)?.title || "Layanan Tidak Dikenal";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600">Paket & Layanan</th>
            <th className="p-4 font-bold text-sm text-slate-600">Harga</th>
            <th className="p-4 font-bold text-sm text-slate-600">Maintenance</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Fitur</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plan) => (
            <tr key={plan.id} className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-slate-900">{plan.name}</div>
                  {plan.is_featured && (
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                  )}
                </div>
                <div className="text-xs text-[#A47148] font-medium">{getServiceName(plan.service_id)}</div>
              </td>
              <td className="p-4 text-sm font-semibold text-slate-700">{formatIDR(plan.price)}</td>
              <td className="p-4 text-sm text-slate-500">{formatIDR(plan.maintenance_cost)}</td>
              <td className="p-4 text-center text-xs text-slate-400">{plan.features.length} Fitur</td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(plan)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => onDelete(plan.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl">
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