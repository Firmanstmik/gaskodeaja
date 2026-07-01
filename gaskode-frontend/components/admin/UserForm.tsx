"use client";
import React, { useState, useEffect } from "react";
import { Save, Mail, User as UserIcon, Lock } from "lucide-react";

interface UserFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading: boolean;
}

export const UserForm = ({ initialData, onSubmit, onCancel, loading }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "" // Wajib untuk rule 'confirmed' Laravel
  });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({ 
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        password_confirmation: ""
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validasi Client-side: Cek kecocokan password
    if (formData.password !== formData.password_confirmation) {
      setLocalError("Konfirmasi password tidak cocok!");
      return;
    }

    // Menggunakan Destructuring untuk menghindari error "delete operator"
    const { password_confirmation, password, ...restData } = formData;

    // Jika mode EDIT dan password kosong, jangan kirim field password
    const payload = initialData && !password 
      ? restData 
      : { ...restData, password, password_confirmation };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {localError && (
        <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium">
          ⚠️ {localError}
        </div>
      )}

      {/* Input Nama */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <UserIcon size={18} />
          </div>
          <input 
            required
            type="text"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#A47148] text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
      </div>

      {/* Input Email */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Alamat Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Mail size={18} />
          </div>
          <input 
            required
            type="email"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#A47148] text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              placeholder={initialData ? "••••••••" : "Min. 6 Karakter"}
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#A47148] text-sm"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required={!initialData}
            />
          </div>
        </div>

        {/* Input Konfirmasi Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Konfirmasi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              placeholder={initialData ? "••••••••" : "Ulangi password"}
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#A47148] text-sm"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
              required={!initialData || formData.password.length > 0}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-5 py-2 text-slate-500 font-bold text-sm">Batal</button>
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-[#A47148] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#A47148]/20 transition-all hover:bg-[#8B5E3C] disabled:opacity-50"
        >
          <Save size={18}/> {loading ? "Menyimpan..." : "Simpan User"}
        </button>
      </div>
    </form>
  );
};