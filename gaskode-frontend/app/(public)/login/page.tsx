'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AuthUseCase } from '@/core/application/use-cases/AuthUseCase';
import { useRouter } from 'next/navigation';
import { Magnetic } from '@/components/ui/Magnetic';
import { CornerFrame } from '@/components/ui/CornerFrame';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await AuthUseCase.login({ email, password });
    setLoading(false);

    if (res.status === 'success') {
      router.push('/branding');
      router.refresh();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="grain relative isolate flex min-h-[calc(100svh-84px)] w-full items-center justify-center overflow-hidden bg-[#100d0a] px-5 py-16 sm:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
      <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
      <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />

      <CornerFrame tone="dark" className="glass-dark w-full max-w-md rounded-[1.9rem] border border-white/10 p-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:rounded-[2.2rem] sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f3c9a4]">Welcome Back</p>
          <h1 className="mt-4 font-display text-3xl font-light tracking-[-0.02em] text-white">GaskodeAja</h1>
          <p className="mt-2 text-sm text-white/50">Silakan login ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              className="w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#f3c9a4]/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f3c9a4]/25 placeholder:text-white/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#f3c9a4]/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f3c9a4]/25 placeholder:text-white/30"
            />
          </div>

          <Magnetic className="mt-2 w-full">
            <button
              type="submit"
              disabled={loading}
              className="btn-shine tap group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#c08a5c] via-[#a97650] to-[#8b5e3c] px-5 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_22px_50px_-14px_rgba(164,113,72,0.65)] transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
            >
              <span className="relative z-10">{loading ? 'Memproses...' : 'Login'}</span>
            </button>
          </Magnetic>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-[#f3c9a4] hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </CornerFrame>
    </div>
  );
}
