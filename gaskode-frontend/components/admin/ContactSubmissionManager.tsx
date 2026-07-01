'use client';
import { useState, useEffect, useCallback } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ContactSubmission, SubmissionStatus } from '@/core/domain/entities/ContactSubmission';
import { ApiContactSubmissionRepository } from '@/core/infrastructure/repositories/ApiContactSubmissionRepository';
import { ManageContactSubmission } from '@/core/application/use-cases/ManageContactSubmission';
import { Trash2, CheckCircle, Clock, Edit2, ExternalLink, Plus } from 'lucide-react';

const repo = new ApiContactSubmissionRepository();
const useCase = new ManageContactSubmission(repo);

export default function ContactSubmissionManager() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

    // State untuk form input (digunakan saat tambah manual)
    const [formData, setFormData] = useState({ name: '', whatsappNumber: '', message: '' });
    const [newStatus, setNewStatus] = useState<SubmissionStatus>('pending');

    const loadData = useCallback(async () => {
        try {
            const data = await useCase.executeGetAll();
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
        }
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    // Handler Buka Modal Tambah
    const handleOpenAdd = () => {
        setSelectedSubmission(null);
        setFormData({ name: '', whatsappNumber: '', message: '' });
        setNewStatus('pending');
        setIsModalOpen(true);
    };

    // Handler Buka Modal Detail/Edit
    const handleOpenDetail = (item: ContactSubmission) => {
        setSelectedSubmission(item);
        setFormData({
            name: item.name,
            whatsappNumber: item.whatsappNumber,
            message: item.message || ''
        });
        setNewStatus(item.status || 'pending');
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedSubmission?.id) {
                // Mode Edit Status
                await useCase.executeChangeStatus(selectedSubmission.id, newStatus);
            } else {
                // Mode Tambah Manual
                await useCase.executeCreate({
                    name: formData.name,
                    whatsappNumber: formData.whatsappNumber,
                    message: formData.message,
                    status: newStatus
                });
            }
            setIsModalOpen(false);
            loadData(); // Refresh tabel setelah simpan
            alert("Data berhasil disimpan!");
        } catch (error) {
            alert("Terjadi kesalahan saat menyimpan data");
        }
    };

    const handleQuickUpdateStatus = async (id: number, status: SubmissionStatus) => {
        await useCase.executeChangeStatus(id, status);
        loadData();
    };
    const handleDelete = async (id: number) => {

        if (confirm('Hapus data pesan ini?')) {

            await useCase.executeDelete(id);

            loadData();

        }

    };

    return (
        <div className="space-y-6">
            {/* Header dengan Tombol Tambah */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Daftar Pesan Masuk</h2>
                <button
                    onClick={handleOpenAdd}
                    className="bg-[#A47148] hover:bg-[#8B5E3C] text-white px-5 py-2.5 rounded-2xl transition-all font-bold flex items-center gap-2 shadow-lg shadow-[#A47148]/20"
                >
                    <Plus size={20} /> Tambah Manual
                </button>
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 font-bold text-sm text-slate-600">Sender</th>
                            <th className="p-4 font-bold text-sm text-slate-600">Message</th>
                            <th className="p-4 font-bold text-sm text-center text-slate-600">Status</th>
                            <th className="p-4 font-bold text-sm text-center text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((item) => (
                            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-slate-900">{item.name}</div>
                                    <div className="text-xs text-slate-500 font-mono">{item.whatsappNumber}</div>
                                </td>
                                <td className="p-4 text-sm text-slate-600 max-w-xs truncate">
                                    {item.message || <span className="text-slate-300 italic">No message</span>}
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm
                    ${item.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                            item.status === 'processed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-700'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleOpenDetail(item)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"><Edit2 size={18} /></button>
                                        {item.status === 'pending' && (
                                            <button onClick={() => handleQuickUpdateStatus(item.id!, 'processed')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Clock size={18} /></button>
                                        )}
                                        <button onClick={() => handleDelete(item.id!)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Dinamis */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedSubmission ? "Submission Detail" : "Add Manual Submission"}
            >
                <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Customer Name</label>
                            <input
                                required
                                disabled={!!selectedSubmission}
                                className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 disabled:opacity-70 text-slate-900"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp</label>
                            <input
                                required
                                disabled={!!selectedSubmission}
                                className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 disabled:opacity-70 text-slate-900"
                                value={formData.whatsappNumber}
                                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                        <textarea
                            required
                            disabled={!!selectedSubmission}
                            rows={4}
                            className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-blue-500 disabled:opacity-70 text-slate-900"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['pending', 'processed', 'archived'] as SubmissionStatus[]).map((status) => (
                                <button
                                    key={status} type="button"
                                    onClick={() => setNewStatus(status)}
                                    className={`py-2.5 rounded-xl border text-[10px] font-black uppercase transition-all
                    ${newStatus === status
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                                            : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                        <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200">
                            {selectedSubmission ? 'Update Status' : 'Save Submission'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}