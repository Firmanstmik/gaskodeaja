// app/(public)/portfolios/page.tsx
import React from 'react';
import { 
  CheckCircle2, AlertCircle, Lightbulb, 
  TrendingUp, MessageCircle, Star, 
  ShieldCheck, Globe, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';
import { ApiPortfolioPageRepository } from "@/core/infrastructure/repositories/ApiPortfolioPageRepository";
import { GetPortfolioPageDataUseCase } from "@/core/application/use-cases/GetPortfolioPageDataUseCase";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const repository = new ApiPortfolioPageRepository();
  const useCase = new GetPortfolioPageDataUseCase(repository);
  const data = await useCase.execute();

  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return (
    <div className="min-h-screen font-sans text-slate-200">
      
      {/* --- 🧭 HEADER SECTION (Hero) --- */}
      <section 
        className="relative min-h-[60vh] flex items-center text-white overflow-hidden bg-slate-900"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 1)), url('${uri}/${data.hero.imagePath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">
              {data.hero.title}
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
              {data.hero.subtitle}
            </p>
            <Link 
              href={data.hero.ctaLink} 
              className="inline-flex items-center bg-[#A47148] hover:bg-[#8B5E3C] text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-[#A47148]/20"
            >
              {data.hero.ctaText} <MessageCircle className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- 💡 INTRO SECTION (Opening) --- */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
            {data.opening.pernyataan}
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed italic">
            "{data.opening.jawaban[0]}"
          </p>
        </div>
      </section>

      {/* --- 💼 LIST PORTOFOLIO --- */}
      <section className="py-10 px-6 max-w-6xl mx-auto space-y-40">
        {data.portfolios.map((item, index) => (
          <CaseStudyCard 
            key={item.id}
            index={index + 1}
            title={item.title}
            client={item.clientName}
            thumbnail={`${uri}/${item.imageThumbnail}`}
            problems={item.problems}
            solutions={item.solutions}
            results={item.results}
            reverse={index % 2 !== 0} // Otomatis selang-seling kiri-kanan
            ctaLink={data.hero.ctaLink}
          />
        ))}
      </section>

      {/* --- 📊 HIGHLIGHT TRUST BOOSTER --- */}
      <section className="bg-orange-300/40 py-24 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <HighlightItem icon={<ShieldCheck className="text-[#A47148]" />} text="Keamanan Terjamin" />
          <HighlightItem icon={<Star className="text-[#A47148]" />} text="Kepuasan Klien 100%" />
          <HighlightItem icon={<TrendingUp className="text-[#A47148]" />} text="Meningkatkan Profit" />
          <HighlightItem icon={<Globe className="text-[#A47148]" />} text="SEO Friendly" />
        </div>
      </section>

      {/* --- 📞 CLOSING SECTION --- */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto bg-orange-300/50 rounded-[2rem] p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-slate-700">
              {data.closing.pernyataan}
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
              {data.closing.jawaban[0]}
            </p>
            <Link 
              href={data.hero.ctaLink} 
              className="inline-flex items-center bg-[#A47148] hover:bg-[#8B5E3C] text-white px-6 py-3 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-2xl"
            >
              <MessageCircle className="mr-3" size={28} /> Chat WhatsApp Sekarang
            </Link>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function CaseStudyCard({ index, title, client, thumbnail, problems, solutions, results, reverse, ctaLink }: any) {
  return (
    <div className={`flex flex-col lg:flex-row gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      {/* Visual Section */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-4 bg-[#A47148]/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-duration-500"></div>
        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur-md px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-[#A47148] border border-[#A47148]/30">
            Project 0{index}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2">
        <div className="mb-4 text-[#A47148] font-bold tracking-widest uppercase text-sm">Client: {client}</div>
        <h3 className="text-4xl font-black text-slate-800 mb-8 tracking-tight">
          {title}
        </h3>
        
        <div className="space-y-8 mb-12">
          {/* Masalah */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-1 text-red-500"><AlertCircle size={20} /></div>
            <h4 className="text-slate-800 font-bold mb-3 uppercase text-xs tracking-widest">Masalah Utama</h4>
            <ul className="text-slate-500 space-y-2 text-sm leading-relaxed">
              {problems.map((p: string, i: number) => <li key={i}>• {p}</li>)}
            </ul>
          </div>

          {/* Solusi */}
          <div className="relative pl-8 border-l border-slate-800">
            <div className="absolute left-[-11px] top-1 bg-slate-950 text-blue-400"><Lightbulb size={20} /></div>
            <h4 className="text-slate-800 font-bold mb-3 uppercase text-xs tracking-widest">Solusi Gaskode</h4>
            <ul className="text-slate-500 space-y-2 text-sm leading-relaxed">
              {solutions.map((s: string, i: number) => <li key={i}>• {s}</li>)}
            </ul>
          </div>

          {/* Hasil */}
          <div className="bg-[#A47148]/5 p-8 rounded-3xl border border-[#A47148]/20">
            <h4 className="flex items-center text-[#A47148] font-bold mb-4 text-xs uppercase tracking-widest">
              <CheckCircle2 size={18} className="mr-2" /> Dampak Nyata
            </h4>
            <ul className="text-slate-500 font-medium space-y-3 text-sm italic">
              {results.map((r: string, i: number) => <li key={i} className="flex items-start">" {r} "</li>)}
            </ul>
          </div>
        </div>

        <Link href={ctaLink} className="inline-flex items-center  text-slate-800 font-bold hover:text-[#A47148] transition-colors group">
          Lihat Case Study Lengkap <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function HighlightItem({ icon, text }: any) {
  return (
    <div className="group p-8 rounded-3xl bg-orange-50/50 shadow-md hover:border-[#A47148]/30 transition-all">
      <div className="mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform">
        {React.cloneElement(icon, { size: 40, strokeWidth: 1.5 })}
      </div>
      <p className="font-bold text-slate-700 text-lg leading-snug">{text}</p>
    </div>
  );
}