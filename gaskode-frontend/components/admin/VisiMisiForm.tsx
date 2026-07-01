"use client";
import React, { useState, useEffect } from "react";
import { VisiMisi } from "@/core/domain/entities/VisiMisi";
import { Plus, Trash2, Save, XCircle } from "lucide-react";

export const VisiMisiForm = ({ initialData, onSubmit, onCancel, loading }: any) => {
  const [formData, setFormData] = useState({
    tipe: "visi",
    konten: [""] as string[],
    urutan: 1
  });

  useEffect(() => {
    if (initialData) setFormData({ ...initialData });
  }, [initialData]);

  const handleKontenChange = (index: number, value: string) => {
    const newKonten = [...formData.konten];
    newKonten[index] = value;
    setFormData({ ...formData, konten: newKonten });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Tipe</label>
          <select 
            className="w-full p-3 border border-slate-200 rounded-xl bg-white outline-none focus:border-[#A47148]"
            value={formData.tipe}
            onChange={(e) => setFormData({...formData, tipe: e.target.value as any})}
          >
            <option value="visi">Visi</option>
            <option value="misi">Misi</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Urutan</label>
          <input 
            type="number"
            className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#A47148]"
            value={formData.urutan}
            onChange={(e) => setFormData({...formData, urutan: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700">Konten (Point-point)</label>
        {formData.konten.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <textarea 
              className="flex-1 p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#A47148]" 
              rows={2}
              value={item} 
              onChange={(e) => handleKontenChange(idx, e.target.value)} 
            />
            <button 
              type="button" 
              onClick={() => setFormData({...formData, konten: formData.konten.filter((_, i) => i !== idx)})} 
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20}/>
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => setFormData({...formData, konten: [...formData.konten, ""]})} 
          className="flex items-center gap-1 text-sm text-[#A47148] font-bold"
        >
          <Plus size={16}/> Tambah Baris Konten
        </button>
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