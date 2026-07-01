"use client";
import { User } from "@/core/domain/entities/User";
import { Edit2, Trash2, ShieldCheck, Mail } from "lucide-react";

export function UserTable({ data, onEdit, onDelete }: any) {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-4 font-bold text-sm text-slate-600 w-16 text-center">ID</th>
                        <th className="p-4 font-bold text-sm text-slate-600">User Information</th>
                        <th className="p-4 font-bold text-sm text-slate-600">Email Address</th>
                        <th className="p-4 font-bold text-sm text-center text-slate-600">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: User) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 text-center font-mono text-slate-400 text-xs">{item.id}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#A47148]/10 flex items-center justify-center text-[#A47148] font-bold">
                                        {item.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 leading-none">{item.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">Registered User</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Mail size={14} className="text-slate-300" />
                                    {item.email}
                                    {item.email_verified_at && (
                                        <span title="Verified">
                                            <ShieldCheck size={14} className="text-green-500" />
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        title="Edit User"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        title="Delete User"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {data?.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-10 text-center text-slate-400 text-sm italic">
                                Belum ada data user yang terdaftar.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}