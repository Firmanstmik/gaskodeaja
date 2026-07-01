// import React from 'react';
// import { 
//   MessageCircle, Mail, MapPin, Clock, 
//   CheckCircle2, Send, Phone, Star 
// } from 'lucide-react';
// import Link from 'next/link';

// export default function ContactPage() {
//   return (
//     <div className="bg-white min-h-screen font-sans">

//       {/* 🧭 HEADER SECTION */}
//       <section className="bg-blue-600 py-20 px-6 text-white text-center">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-black mb-6">Hubungi Kami</h1>
//           <p className="text-xl text-blue-100 mb-8 leading-relaxed">
//             Kami siap membantu Anda membangun website atau aplikasi yang sesuai dengan kebutuhan bisnis Anda.
//           </p>
//           <div className="flex justify-center">
//              <div className="bg-blue-500/30 px-6 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-blue-400/50">
//                ⚡ Respon Cepat & Profesional
//              </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 px-6 max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-16">

//           {/* 📱 KONTAK UTAMA & INFO */}
//           <div className="space-y-10">
//             <div>
//               <h2 className="text-3xl font-black text-slate-900 mb-4">Mulai Diskusi Sekarang</h2>
//               <p className="text-slate-600 leading-relaxed">
//                 Punya ide atau ingin mengembangkan bisnis secara digital? Tim kami siap membantu dari perencanaan hingga website Anda siap digunakan.
//               </p>
//             </div>

//             <div className="space-y-6">
//               <ContactInfoBox 
//                 icon={<MessageCircle className="text-green-500" />} 
//                 label="WhatsApp" 
//                 value="0812-xxxx-xxxx" 
//                 subValue="Respon lebih cepat"
//                 isPrimary
//               />
//               <ContactInfoBox 
//                 icon={<Mail className="text-blue-500" />} 
//                 label="Email" 
//                 value="halo@gaskodeaja.com" 
//               />
//               <ContactInfoBox 
//                 icon={<MapPin className="text-red-500" />} 
//                 label="Lokasi" 
//                 value="Lombok, Nusa Tenggara Barat" 
//               />
//               <ContactInfoBox 
//                 icon={<Clock className="text-orange-500" />} 
//                 label="Jam Operasional" 
//                 value="Senin – Sabtu: 09.00 – 21.00" 
//                 subValue="Minggu: By Appointment"
//               />
//             </div>

//             {/* 🧠 TRUST BOOSTER */}
//             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
//               <h3 className="font-bold text-lg mb-4 text-slate-900">Kenapa Konsultasi di GaskodeAja?</h3>
//               <ul className="space-y-3">
//                 <li className="flex items-center text-slate-600 text-sm">
//                   <CheckCircle2 size={18} className="text-green-500 mr-2" /> 100% Gratis Konsultasi (Tanpa Biaya)
//                 </li>
//                 <li className="flex items-center text-slate-600 text-sm">
//                   <CheckCircle2 size={18} className="text-green-500 mr-2" /> Solusi Sesuai Budget Bisnis
//                 </li>
//                 <li className="flex items-center text-slate-600 text-sm">
//                   <CheckCircle2 size={18} className="text-green-500 mr-2" /> Tanpa Komitmen (Bisa Diskusi Dulu)
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* 📝 SIMPLE CONTACT FORM */}
//           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-50">
//             <h3 className="text-2xl font-black mb-8 text-slate-900">Kirim Pesan</h3>
//             <form className="space-y-6">
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
//                 <input type="text" placeholder="Masukkan nama Anda" className="w-full bg-slate-50 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp</label>
//                 <input type="tel" placeholder="0812xxxx" className="w-full bg-slate-50 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-2">Apa kebutuhan Anda? (Opsional)</label>
//                 <textarea rows={4} placeholder="Ceritakan singkat rencana project Anda..." className="w-full bg-slate-50 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-blue-600 outline-none transition-all"></textarea>
//               </div>
//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
//                 Kirim & Konsultasi Gratis <Send size={18} />
//               </button>
//             </form>

//             {/* ⭐ TESTIMONI SINGKAT */}
//             <div className="mt-12 pt-8 border-t border-slate-100">
//               <div className="flex text-yellow-400 mb-4">
//                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
//               </div>
//               <p className="text-slate-600 italic text-sm mb-4">
//                 "Respon cepat dan sangat membantu dari awal sampai selesai. Gak nyesel pilih GaskodeAja!"
//               </p>
//               <span className="text-xs font-bold text-slate-900">— Pak Haji, Rental Mobil Lombok</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 📞 CLOSING SECTION (SUPER BIG CTA) */}
//       <section className="py-24 px-6 bg-slate-900">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Siap Mulai Project Anda?</h2>
//           <p className="text-xl text-slate-400 mb-12">
//             Jangan tunggu sampai bisnis Anda tertinggal. Mulai sekarang, bangun website profesional yang siap menghasilkan.
//           </p>
//           <Link href="https://wa.me/628123456789" className="group relative inline-flex items-center bg-green-500 hover:bg-green-400 text-white px-12 py-6 rounded-full font-black text-2xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
//             <MessageCircle className="mr-4 animate-bounce" size={32} /> 
//             GAS WHATSAPP SEKARANG
//           </Link>
//           <p className="mt-8 text-slate-500 text-sm font-medium">
//              *Konsultasi 100% Gratis & Tanpa Komitmen
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function ContactInfoBox({ icon, label, value, subValue, isPrimary }: any) {
//   return (
//     <div className={`flex items-start p-6 rounded-2xl border transition-all ${isPrimary ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-white border-slate-100'}`}>
//       <div className="bg-white p-3 rounded-xl shadow-sm mr-4">
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <div>
//         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
//         <p className={`font-bold ${isPrimary ? 'text-blue-700 text-xl' : 'text-slate-800'}`}>{value}</p>
//         {subValue && <p className="text-xs text-slate-500 mt-1">{subValue}</p>}
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useEffect, useState } from 'react';
import {
  MessageCircle, Mail, MapPin, Clock,
  CheckCircle2, Send, Star
} from 'lucide-react';
import Link from 'next/link';
import { ApiContactRepository } from '@/core/infrastructure/repositories/ApiContactRepository';
import { GetContactPageData } from '@/core/application/use-cases/GetContactPageData';
import { ContactEntity } from '@/core/domain/entities/ContactEntity';

export default function ContactPage() {
  const [data, setData] = useState<ContactEntity | null>(null);

  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";
  useEffect(() => {
    const repo = new ApiContactRepository();
    const useCase = new GetContactPageData(repo);
    useCase.execute().then(setData).catch(console.error);
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Helper untuk memilih Icon berdasarkan string dari API
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'call': return <MessageCircle className="text-[#A47148]" />;
      case 'gmail': return <Mail className="text-[#A47148]" />;
      case 'location': return <MapPin className="text-[#A47148]" />;
      case 'time': return <Clock className="text-[#A47148]" />;
      default: return <MessageCircle />;
    }
  };

  return (
    <div className="min-h-screen font-sans">

      {/* 🧭 HERO SECTION */}
      <section className="relative py-32 px-6 text-white text-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${uri}/${data.hero.imagePath}`} // Gabungkan base URL API Anda
            alt={data.hero.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradasi agar teks terbaca jelas */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-900/80 to-amber-50"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {data.hero.title}
          </h1>
          <p className="text-xl text-blue-50 mb-8 leading-relaxed max-w-2xl mx-auto opacity-90">
            {data.hero.subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={data.hero.ctaLink}
              className="bg-[#A47148] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#8B5E3C] transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              {data.hero.ctaText}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* 📱 KONTAK UTAMA & INFO */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">{data.opening.title}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {data.opening.description[0]}
              </p>
            </div>

            <div className="space-y-4">
              {data.contacts.map((contact) => (
                <ContactInfoBox
                  key={contact.id}
                  icon={getIcon(contact.icon)}
                  label={contact.label}
                  value={contact.value}
                  isPrimary={contact.label === 'WHATSAPP'}
                />
              ))}
            </div>

            {/* 🧠 TRUST BOOSTER */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative overflow-hidden">
              <h3 className="font-bold text-xl mb-6 text-slate-900">{data.value.title}</h3>
              <ul className="space-y-4">
                {data.value.description.map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle2 size={20} className="text-[#A47148] mr-3 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 📝 CONTACT FORM */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-50 sticky top-10">
            <h3 className="text-2xl font-black mb-8 text-slate-900">Kirim Pesan Cepat</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input type="text" placeholder="Masukkan nama Anda" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-[#A47148] focus:bg-white outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nomor WhatsApp</label>
                <input type="tel" placeholder="0812xxxx" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-[#A47148] focus:bg-white outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Pesan Anda</label>
                <textarea rows={4} placeholder="Ceritakan rencana project Anda..." className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-[#A47148] focus:bg-white outline-none transition-all"></textarea>
              </div>
              <button className="w-full bg-[#A47148] hover:bg-[#8B5E3C] text-white font-black py-3 rounded-2xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-3 text-lg">
                Kirim Sekarang <Send size={20} />
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />)}
              </div>
              <p className="text-sm text-slate-500 font-medium">Bergabung dengan 100+ bisnis lainnya</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📞 CLOSING SECTION */}
      <section className="py-24 px-6 bg-orange-300/50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            {data.closing.title}
          </h2>
          <p className="text-xl text-slate-500 mb-12">
            {data.closing.description[0]}
          </p>
          <Link href={data.hero.ctaLink} className="inline-flex items-center bg-[#8B5E3C] hover:bg-[#A47148] text-white px-12 py-3 rounded-full font-black text-xl transition-transform hover:scale-105 shadow-orange-100">
            <MessageCircle className="mr-4" size={32} />
            HUBUNGI VIA WHATSAPP
          </Link>
        </div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function ContactInfoBox({ icon, label, value, isPrimary }: any) {
  return (
    <div className={`flex items-center p-5 rounded-2xl border transition-all ${isPrimary ? 'bg-orange-50 border-orange-100 shadow-md ring-2 ring-blue-500/5' : 'bg-white border-slate-100'}`}>
      <div className={`p-3 rounded-xl shadow-sm mr-4 ${isPrimary ? 'bg-white text-white' : 'bg-slate-50'}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">{label}</p>
        <p className={`font-bold ${isPrimary ? 'text-slate-800 text-lg' : 'text-slate-800'}`}>{value}</p>
      </div>
    </div>
  );
}