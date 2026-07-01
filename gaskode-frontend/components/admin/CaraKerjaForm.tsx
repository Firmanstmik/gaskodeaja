"use client";
import React, { useState, useEffect } from "react";
import { CaraKerja } from "@/core/domain/entities/CaraKerja";
import { Save } from "lucide-react";

export const CaraKerjaForm = ({ initialData, onSubmit, onCancel, loading }: any) => {
  const [formData, setFormData] = useState({ list: "" });

  useEffect(() => {
    if (initialData) setFormData({ list: initialData.list });
  }, [initialData]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Langkah Cara Kerja</label>
        <textarea 
          className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#A47148]"
          placeholder="Contoh: Konsultasi kebutuhan bisnis"
          rows={3}
          value={formData.list}
          onChange={(e) => setFormData({ list: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-5 py-2 text-slate-500 font-bold">Batal</button>
        <button type="submit" disabled={loading} className="bg-[#A47148] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2">
          <Save size={18}/> {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};