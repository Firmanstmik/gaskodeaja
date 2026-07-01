"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUseCase } from "@/core/application/use-cases/AuthUseCase";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "", // Tambahkan state ini
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (formData.password !== formData.password_confirmation) {
            return setError("Konfirmasi password tidak cocok.");
        }

        if (formData.password.length < 6) {
            return setError("Password minimal 6 karakter.");
        }

        try {
            await AuthUseCase.register(formData);
            setSuccess(true);

            // Tunggu 2-3 detik agar user sempat membaca pesan sukses, lalu pindah ke login
            setTimeout(() => {
                router.push("/login");
            }, 2500);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Registrasi Berhasil!
                    </h2>
                    <p className="text-gray-600">
                        Akun Anda telah terdaftar. Silakan login menggunakan email dan
                        password Anda.
                    </p>
                    <div className="mt-6 animate-pulse text-sm text-[#A47148]">
                        Mengalihkan ke halaman login...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
            {/* Card Form */}
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-[#A47148] text-center">
                        Register Gaskode
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Silakan buat akun untuk berlangganan
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 max-w-md mx-auto p-6"
                >
                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <input
                        required
                        type="text"
                        placeholder="Nama Lengkap"
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A47148] focus:border-transparent transition-all"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <input
                        required
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A47148] focus:border-transparent transition-all"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <input
                        required
                        type="password"
                        placeholder="Password (Min. 8 Karakter)"
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A47148] focus:border-transparent transition-all"
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <input
                        required
                        type="password"
                        placeholder="Konfirmasi Password"
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A47148] focus:border-transparent transition-all"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password_confirmation: e.target.value,
                            })
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#A47148] text-white py-3 rounded-xl font-bold transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#8b5e3c]"
                            }`}
                    >
                        {loading ? "Sedang Mendaftar..." : "Daftar Sekarang"}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Sudah punya akun?{" "}
                        <a href="/login" className="text-[#A47148] font-bold">
                            Login di sini
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
