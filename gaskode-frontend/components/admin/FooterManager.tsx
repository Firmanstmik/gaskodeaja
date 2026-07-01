"use client";
import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Footer } from "@/core/domain/entities/Footer";
import { ApiFooterRepository } from "@/core/infrastructure/repositories/ApiFooterRepository";
import { ManageFooterUseCase } from "@/core/application/use-cases/ManageFooterUseCase";
import {
    Save,
    Globe,
    Mail,
    MapPin,
    Phone,
    Edit2,
    Plus,
    Info,
    Layout,
} from "lucide-react";

// Custom Icons
const Instagram = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Github = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const Facebook = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const repo = new ApiFooterRepository();
const useCase = new ManageFooterUseCase(repo);

export default function FooterManager() {
    const [footerData, setFooterData] = useState<Footer | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State untuk Form di dalam Modal
    const [form, setForm] = useState<Footer>({
        brandName: "",
        shortDescription: "",
        copyrightText: "",
        socialLinks: {},
    });

    const loadData = useCallback(async () => {
        const data = await useCase.executeGet();
        if (data) {
            setFooterData(data);
            setForm(data);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleOpenEdit = () => {
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await useCase.executeSave(form);
            setIsModalOpen(false);
            loadData();
            alert("Footer Berhasil Diperbarui!");
        } catch (error) {
            alert("Gagal memperbarui footer");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header dengan Tombol Tambah/Edit */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layout className="text-blue-400" /> Footer Configuration
                </h2>
                {!footerData && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all"
                    >
                        <Plus size={18} /> Setup Footer
                    </button>
                )}
            </div>

            {/* TABEL TAMPILAN DATA */}
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 font-bold text-sm text-slate-600">
                                Brand & Desc
                            </th>
                            <th className="p-4 font-bold text-sm text-slate-600">
                                Contact Info
                            </th>
                            <th className="p-4 font-bold text-sm text-center text-slate-600">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {footerData ? (
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 align-top">
                                    <div className="font-bold text-slate-900">
                                        {footerData.brandName}
                                    </div>
                                    <div className="text-xs text-slate-500 max-w-xs line-clamp-2">
                                        {footerData.shortDescription}
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <div className="flex flex-col gap-1 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} /> {footerData.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} /> {footerData.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={handleOpenEdit}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-10 text-center text-slate-400 italic"
                                >
                                    Data footer belum dikonfigurasi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL FORM */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={footerData ? "Edit Footer Settings" : "Initial Footer Setup"}
            >
                <form
                    onSubmit={handleSave}
                    className="space-y-6 max-h-[70vh] overflow-y-auto px-1"
                >
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                            <Globe size={16} className="text-blue-500" /> Identity
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Brand Name
                                </label>
                                <input
                                    required
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 outline-none text-slate-900"
                                    value={form.brandName}
                                    onChange={(e) =>
                                        setForm({ ...form, brandName: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Short Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 outline-none text-slate-900"
                                    value={form.shortDescription}
                                    onChange={(e) =>
                                        setForm({ ...form, shortDescription: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                            <Info size={16} className="text-orange-500" /> Contact & Copyright
                        </h4>

                        {/* Baris Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-slate-900 focus:border-blue-500"
                                    value={form.email || ""}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-slate-900 focus:border-blue-500"
                                    value={form.phone || ""}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Alamat (Full Width) */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                                Address
                            </label>
                            <textarea
                                rows={2}
                                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-slate-900 focus:border-blue-500"
                                placeholder="Jl. Raya Koding No. 48, Lombok..."
                                value={form.address || ""}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                            />
                        </div>

                        {/* Copyright */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">
                                Copyright Text
                            </label>
                            <input
                                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-slate-900 focus:border-blue-500"
                                placeholder="© 2026 GaskodeAja. All rights reserved."
                                value={form.copyrightText || ""}
                                onChange={(e) =>
                                    setForm({ ...form, copyrightText: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                            <Plus size={16} className="text-pink-500" /> Social Links
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Instagram */}
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <Instagram className="text-pink-500" />
                                <input
                                    placeholder="Instagram URL"
                                    className="bg-transparent outline-none text-sm w-full text-slate-900"
                                    value={form.socialLinks?.instagram || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            socialLinks: {
                                                ...form.socialLinks,
                                                instagram: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            {/* Github */}
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <Github className="text-slate-900" />
                                <input
                                    placeholder="Github URL"
                                    className="bg-transparent outline-none text-sm w-full text-slate-900"
                                    value={form.socialLinks?.github || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            socialLinks: {
                                                ...form.socialLinks,
                                                github: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            {/* Facebook */}
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <Facebook className="text-blue-600" />
                                <input
                                    placeholder="Facebook URL"
                                    className="bg-transparent outline-none text-sm w-full text-slate-900"
                                    value={form.socialLinks?.facebook || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            socialLinks: {
                                                ...form.socialLinks,
                                                facebook: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            {/* LinkedIn */}
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <Linkedin className="text-blue-700" />
                                <input
                                    placeholder="LinkedIn URL"
                                    className="bg-transparent outline-none text-sm w-full text-slate-900"
                                    value={form.socialLinks?.linkedin || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            socialLinks: {
                                                ...form.socialLinks,
                                                linkedin: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-black shadow-lg shadow-blue-200 transition-all"
                        >
                            <Save size={18} /> Update Footer
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
