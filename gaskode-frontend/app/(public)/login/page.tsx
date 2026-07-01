'use client';
import { useState } from 'react';
import { AuthUseCase } from '@/core/application/use-cases/AuthUseCase';
import { useRouter } from 'next/navigation';

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
    /* Wrapper Utama: min-h-screen memastikan tinggi penuh layar, flex justify-center items-center untuk centering */
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      
      {/* Card Form */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">GaskodeAja</h1>
          <p className="text-gray-500 mt-2">Silakan login ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="nama@email.com" 
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A47148] focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A47148] focus:border-transparent transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#A47148] hover:bg-[#8b5e3c] text-white font-semibold p-3 rounded-lg shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun? <a href="/register" className="text-[#A47148] font-bold hover:underline">Daftar sekarang</a>
        </p>
      </div>
      
    </div>
  );
}