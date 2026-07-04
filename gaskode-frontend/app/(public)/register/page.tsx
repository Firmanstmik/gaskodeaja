"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TickCircle, Warning2 } from "iconsax-react";
import { AuthUseCase } from "@/core/application/use-cases/AuthUseCase";
import { Magnetic } from "@/components/ui/Magnetic";
import { CornerFrame } from "@/components/ui/CornerFrame";

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

    const inputClass =
        "w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#f3c9a4]/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f3c9a4]/25 placeholder:text-white/30";

    const backdrop = (
        <>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
            <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
            <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />
        </>
    );

    if (success) {
        return (
            <div className="grain relative isolate flex min-h-[calc(100svh-84px)] w-full items-center justify-center overflow-hidden bg-[#100d0a] px-5 py-16 sm:px-6">
                {backdrop}
                <CornerFrame tone="dark" className="glass-dark w-full max-w-md rounded-[1.9rem] border border-white/10 p-10 text-center shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:rounded-[2.2rem]">
                    <div className="mx-auto mb-5 inline-flex rounded-2xl bg-emerald-400/15 p-4 text-emerald-300">
                        <TickCircle size={34} variant="Bulk" />
                    </div>
                    <h2 className="font-display text-2xl font-medium tracking-tight text-white">
                        Registrasi Berhasil!
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                        Akun Anda telah terdaftar. Silakan login menggunakan email dan
                        password Anda.
                    </p>
                    <div className="mt-6 animate-pulse text-sm font-bold uppercase tracking-[0.16em] text-[#f3c9a4]">
                        Mengalihkan ke halaman login...
                    </div>
                </CornerFrame>
            </div>
        );
    }

    return (
        <div className="grain relative isolate flex min-h-[calc(100svh-84px)] w-full items-center justify-center overflow-hidden bg-[#100d0a] px-5 py-16 sm:px-6">
            {backdrop}
            <CornerFrame tone="dark" className="glass-dark w-full max-w-md rounded-[1.9rem] border border-white/10 p-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:rounded-[2.2rem] sm:p-10">
                <div className="mb-8 text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f3c9a4]">Get Started</p>
                    <h1 className="mt-4 font-display text-3xl font-light tracking-[-0.02em] text-white">
                        Register Gaskode
                    </h1>
                    <p className="mt-2 text-sm text-white/50">
                        Silakan buat akun untuk berlangganan
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="flex items-center gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
                            <Warning2 size={16} variant="Bulk" className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <input
                        required
                        type="text"
                        placeholder="Nama Lengkap"
                        className={inputClass}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <input
                        required
                        type="email"
                        placeholder="Email"
                        className={inputClass}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <input
                        required
                        type="password"
                        placeholder="Password (Min. 8 Karakter)"
                        className={inputClass}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <input
                        required
                        type="password"
                        placeholder="Konfirmasi Password"
                        className={inputClass}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password_confirmation: e.target.value,
                            })
                        }
                    />

                    <Magnetic className="w-full">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-shine tap group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#c08a5c] via-[#a97650] to-[#8b5e3c] px-5 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_22px_50px_-14px_rgba(164,113,72,0.65)] transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
                        >
                            <span className="relative z-10">{loading ? "Sedang Mendaftar..." : "Daftar Sekarang"}</span>
                        </button>
                    </Magnetic>

                    <p className="text-center text-sm text-white/50">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="font-bold text-[#f3c9a4] hover:underline">
                            Login di sini
                        </Link>
                    </p>
                </form>
            </CornerFrame>
        </div>
    );
}
