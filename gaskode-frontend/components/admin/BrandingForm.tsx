"use client";
import React, { useState, useEffect } from "react";
import { Branding } from "@/core/domain/entities/Branding";
import { Plus, Trash2, Save } from "lucide-react";

export const BrandingForm = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}: any) => {
  const [formData, setFormData] = useState({
    kategori: "opening",
    pernyataan: "",
    jawaban: [""] as string[],
    cta_text: "",
    cta_link: "",
  });

  useEffect(() => {
    if (initialData)
      setFormData({ ...initialData, jawaban: initialData.jawaban || [""] });
  }, [initialData]);

  const addJawaban = () =>
    setFormData({ ...formData, jawaban: [...formData.jawaban, ""] });

  const removeJawaban = (index: number) => {
    const newJawaban = formData.jawaban.filter((_, i) => i !== index);
    setFormData({ ...formData, jawaban: newJawaban });
  };

  const handleJawabanChange = (index: number, value: string) => {
    const newJawaban = [...formData.jawaban];
    newJawaban[index] = value;
    setFormData({ ...formData, jawaban: newJawaban });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">
          Kategori
        </label>
        <select
          className="w-full p-3 border border-slate-200 rounded-xl bg-white outline-none focus:border-[#A47148] focus:ring-2 focus:ring-[#A47148]/20 transition-all text-slate-800"
          value={formData.kategori}
          onChange={(e) =>
            setFormData({ ...formData, kategori: e.target.value })
          }
        >
          <option value="opening">Opening</option>
          <option value="closing">Closing</option>
        </select>
      </div>
      <textarea
        className="w-full p-3 border rounded-xl"
        placeholder="Pernyataan"
        value={formData.pernyataan}
        onChange={(e) =>
          setFormData({ ...formData, pernyataan: e.target.value })
        }
      />

      <div className="space-y-2">
        <label className="text-sm font-bold">Daftar Jawaban (Poin-poin)</label>
        {formData.jawaban.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className="flex-1 p-2 border rounded-lg text-sm"
              value={item}
              onChange={(e) => handleJawabanChange(idx, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeJawaban(idx)}
              className="text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addJawaban}
          className="flex items-center gap-1 text-sm text-[#A47148] font-bold"
        >
          <Plus size={16} /> Tambah Poin
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#A47148] text-white px-6 py-2 rounded-xl flex items-center gap-2"
        >
          <Save size={18} /> {loading ? "Menyimpan..." : "Simpan Branding"}
        </button>
      </div>
    </form>
  );
};
