import React from 'react';
import { ApiHomeRepository } from "@/core/infrastructure/repositories/ApiHomePageRepository";
import { HomeData } from "@/core/domain/entities/HomePage";
import { ChevronRight, Star, CheckCircle2 } from "lucide-react";

export default async function HomePage() {
  const repo = new ApiHomeRepository();
  const data: HomeData = await repo.getHomeData();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              {data.hero.title}
            </h1>
            <p className="text-xl text-slate-300 max-w-lg italic">
              "{data.hero.subtitle}"
            </p>
            <a 
              href={data.hero.cta_link}
              className="inline-flex items-center gap-2 bg-[#A47148] hover:bg-[#8B5E3C] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
            >
              {data.hero.cta_text}
              <ChevronRight size={20} />
            </a>
          </div>
          <div className="hidden lg:block relative">
            <img 
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${data.hero.image_path}`} 
              alt="Hero"
              className="rounded-3xl shadow-2xl border-4 border-white/10 object-cover w-full h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* OPENING SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 uppercase tracking-wider">
            {data.opening.pernyataan}
          </h2>
          <div className="space-y-6">
            {data.opening.jawaban.map((txt, i) => (
              <p key={i} className="text-lg text-slate-600 leading-relaxed">
                {txt}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl font-bold text-slate-800">Layanan Unggulan</h2>
          <p className="text-slate-500">Solusi teknologi modern untuk percepatan bisnis</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.services.map((service) => (
            <div key={service.id} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#A47148] group-hover:bg-[#A47148] group-hover:text-white transition-colors">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 border-l-4 border-[#A47148] pl-4">Proyek Pilihan</h2>
          <div className="grid lg:grid-cols-3 gap-10">
            {data.portfolio.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#A47148]/50 transition-all">
                <img 
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image_thumbnail}`} 
                  className="w-full h-56 object-cover" 
                  alt={item.title}
                />
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[#A47148] text-xs font-bold uppercase">{item.client_name}</span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">Solusi:</p>
                    <p className="text-sm text-slate-300 italic">"{item.solutions[0]}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-orange-50 p-12 rounded-[3rem] text-center space-y-6">
          <div className="flex justify-center gap-1 text-orange-400">
            {[...Array(data.testimonial[0].rating)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <p className="text-xl text-slate-700 italic font-medium">
            "{data.testimonial[0].content}"
          </p>
          <div>
            <h4 className="font-bold text-slate-800">{data.testimonial[0].name}</h4>
            <p className="text-sm text-slate-500">{data.testimonial[0].position}</p>
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="py-24 bg-[#A47148] text-white text-center">
        <div className="container mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-bold">{data.closing.pernyataan}</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            {data.closing.jawaban[0]}
          </p>
          <a 
            href={data.hero.cta_link}
            className="inline-block bg-white text-[#A47148] px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>
    </main>
  );
}