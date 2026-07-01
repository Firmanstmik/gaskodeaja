"use client";
import { useState, useEffect } from "react";
import { ContactMe } from "@/core/domain/entities/ContactMe";
import { ApiContactMeRepository } from "@/core/infrastructure/repositories/ApiContactMeRepository";
import { ManageContactMe } from "@/core/application/use-cases/ManageContactMe";
import { Modal } from "@/components/ui/Modal";
import { Edit2, Trash2, Info } from "lucide-react";

const repo = new ApiContactMeRepository();
const useCase = new ManageContactMe(repo);

export default function ContactMeManager() {
    const [contacts, setContacts] = useState<ContactMe[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [form, setForm] = useState({
        label: "",
        value: "",
        icon: "",
        subValue: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await useCase.executeGetAll();
        setContacts(data);
    };

    const openModal = (contact?: ContactMe) => {
        if (contact) {
            setSelectedId(contact.id);
            setForm({
                label: contact.label,
                value: contact.value,
                icon: contact.icon,
                subValue: contact.subValue || "",
            });
        } else {
            setSelectedId(null);
            setForm({ label: "", value: "", icon: "", subValue: "" });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedId) {
                await useCase.executeUpdate(selectedId, form);
            } else {
                await useCase.executeCreate(form);
            }
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            alert("Gagal menyimpan data");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            await useCase.executeDelete(id);
            loadData();
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Daftar Kontak</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                    + Tambah Kontak
                </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 font-bold text-sm text-slate-600">
                                Contact Detail
                            </th>
                            <th className="p-4 font-bold text-sm text-slate-600">Identity</th>
                            <th className="p-4 font-bold text-sm text-center text-slate-600">
                                Icon Type
                            </th>
                            <th className="p-4 font-bold text-sm text-center text-slate-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c) => (
                            <tr
                                key={c.id}
                                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="font-bold text-slate-900">{c.label}</div>
                                    <div className="text-xs text-slate-500 font-medium">
                                        {c.subValue || "-"}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">{c.value}</td>
                                <td className="p-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm bg-indigo-50 text-indigo-700 border border-indigo-100">
                                        <Info size={12} /> {c.icon}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => openModal(c)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {contacts.length === 0 && (
                    <div className="p-10 text-center text-slate-400 text-sm italic">
                        Belum ada data kontak yang tersedia.
                    </div>
                )}
            </div>

            {/* --- IMPLEMENTASI MODAL --- */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedId ? "Edit Info Kontak" : "Tambah Kontak Baru"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Label</label>
                        <input
                            required
                            placeholder="Contoh: WhatsApp / Email"
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.label}
                            onChange={(e) => setForm({ ...form, label: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Value</label>
                        <input
                            required
                            placeholder="Contoh: 0812xxx / admin@gaskode.com"
                            className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.value}
                            onChange={(e) => setForm({ ...form, value: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">
                                Icon Name
                            </label>
                            <input
                                required
                                placeholder="Lucide Icon (ex: Mail)"
                                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                value={form.icon}
                                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">
                                Sub Value (Opsional)
                            </label>
                            <input
                                placeholder="ex: Fast Response"
                                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                value={form.subValue}
                                onChange={(e) => setForm({ ...form, subValue: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-orange-100"
                        >
                            {selectedId ? "Simpan Perubahan" : "Buat Kontak"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
