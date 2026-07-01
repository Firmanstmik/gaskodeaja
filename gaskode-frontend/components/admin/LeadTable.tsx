import { Lead, LeadStatus } from "@/core/domain/entities/Lead";
import { MessageCircle, Edit2, Trash2, CheckCircle } from "lucide-react";

interface Props {
  data: Lead[];
  onEdit: (lead: Lead) => void;
  onUpdateStatus: (id: number, status: LeadStatus) => void;
  onDelete: (id: number) => void;
}

export function LeadTable({ data, onEdit, onUpdateStatus, onDelete }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600">Customer</th>
            <th className="p-4 font-bold text-sm text-slate-600">Requirement</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Status</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="p-4">
                <div className="font-bold text-slate-900">{lead.name}</div>
                <div className="text-xs text-slate-500 font-mono">{lead.whatsapp_number}</div>
              </td>
              <td className="p-4 text-sm text-slate-600 max-w-xs truncate">{lead.requirement}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm
                  ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                    lead.status === 'contacted' ? 'bg-orange-100 text-orange-700' : 
                    lead.status === 'closed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {lead.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(lead)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Edit2 size={18}/></button>
                  <button onClick={() => onUpdateStatus(lead.id, 'closed')} className="p-2 text-green-600 hover:bg-green-50 rounded-xl"><CheckCircle size={18}/></button>
                  <button onClick={() => onDelete(lead.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl"><Trash2 size={18}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}