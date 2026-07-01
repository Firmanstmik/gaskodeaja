"use client";
import React, { useState, useEffect } from "react";
import { Qna } from "@/core/domain/entities/Qna";
import { Save, XCircle } from "lucide-react";

interface QnaFormProps {
  initialData?: Qna | null;
  onSubmit: (data: Omit<Qna, "id">) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const QnaForm = ({ initialData, onSubmit, onCancel, loading }: QnaFormProps) => {
  const [formData, setFormData] = useState<Omit<Qna, "id">>({
    question: "",
    answer: "",
  });

  // Sinkronisasi data jika dalam mode Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        question: initialData.question,
        answer: initialData.answer,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Input Pertanyaan */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Pertanyaan</label>
        <textarea
          required
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#A47148] focus:ring-2 focus:ring-[#A47148]/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
          placeholder="Contoh: Berapa biaya pembuatan landing page?"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        />
      </div>

      {/* Input Jawaban */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Jawaban</label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#A47148] focus:ring-2 focus:ring-[#A47148]/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
          placeholder="Tuliskan jawaban lengkap di sini..."
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all"
        >
          <XCircle size={18} />
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#A47148] hover:bg-[#8B5E3C] shadow-lg shadow-[#A47148]/20 disabled:opacity-50 transition-all"
        >
          <Save size={18} />
          {loading ? "Menyimpan..." : initialData ? "Update Q&A" : "Simpan Q&A"}
        </button>
      </div>
    </form>
  );
};