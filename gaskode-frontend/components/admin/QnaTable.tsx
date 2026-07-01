import { Qna } from "@/core/domain/entities/Qna";
import { Edit2, Trash2, HelpCircle, MessageCircle } from "lucide-react";

interface Props {
  data: Qna[];
  onEdit: (qna: Qna) => void; // Menambahkan onEdit agar konsisten dengan PostTable
  onDelete: (id: number) => void;
}

export function QnaTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-bold text-sm text-slate-600">
              Pertanyaan & Jawaban
            </th>
            <th className="p-4 font-bold text-sm text-slate-600">Kategori</th>
            <th className="p-4 font-bold text-sm text-center text-slate-600">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-400 mt-1">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">
                        {item.question}{" "}
                        {/* GANTI: dari item.pernyataan ke item.question */}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                        <MessageCircle size={12} />
                        <span className="line-clamp-2">
                          {item.answer}{" "}
                          {/* GANTI: dari item.jawaban[0] ke item.answer */}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
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
                Belum ada data Q&A.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
