import React from "react";
import { ApiHomeRepository } from "@/core/infrastructure/repositories/ApiHomePageRepository";
import { HomeData } from "@/core/domain/entities/HomePage";
import {
  Zap,
  Layout,
  Wrench,
  ChevronRight,
  Star,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const repo = new ApiHomeRepository();
  const data: HomeData = await repo.getHomeData();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";
  const hero = data.hero;
  const opening = data.opening;
  const closing = data.closing;
  const benefits = [
    {
      icon: <Zap className="text-amber-500" size={32} />,
      gradient: "from-amber-50 to-orange-50",
    },
    {
      icon: <Layout className="text-blue-500" size={32} />,
      gradient: "from-blue-50 to-indigo-50",
    },
    {
      icon: <Wrench className="text-purple-500" size={32} />,
      gradient: "from-purple-50 to-fuchsia-50",
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={32} />,
      gradient: "from-emerald-50 to-teal-50",
    },
  ];
  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* GAMBAR SEBAGAI BACKGROUND UTAMA */}
        <div className="absolute inset-0 z-0">
          {hero?.image_path ? (
          <img
            src={`${uri}/${hero.image_path}`}
            alt={hero.title}
            className="w-full h-full object-cover"
          />
          ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
          {/* OVERLAY: Agar teks tetap terbaca jelas di atas gambar */}
          <div className="absolute inset-0 bg-slate-700/70 backdrop-blur-[1px]"></div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-8xl font-black text-white leading-tight">
                {hero?.title || "GasKode Aja"}
                <span className="text-[#A47148]">.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-200 max-w-2xl italic leading-relaxed">
                "{hero?.subtitle || "Solusi digital profesional untuk bisnis Anda"}"
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={hero?.cta_link || "/contact"}
                className="inline-flex items-center gap-3 bg-[#A47148] hover:bg-[#8B5E3C] text-white px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
              >
                {hero?.cta_text || "Hubungi Kami"}
                <ChevronRight size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* DEKORASI BAWAH (OPSIONAL) */}
        {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10"></div> */}
      </section>

      {/* OPENING SECTION */}
      <section className="py-10 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl lg:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {opening?.pernyataan || "Mengapa Memilih Kami?"}
            </h2>
          </div>

          {/* Bento/Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-lg border border-slate-100 bg-white hover:border-[#A47148]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-slate-50">
                    {item.icon}
                  </div>

                  {/* Menampilkan teks jawaban berdasarkan index yang sama dengan benefits */}
                  <p className="text-md font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors leading-tight">
                    {opening?.jawaban?.[index] || ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-10 container mx-auto px-6">
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-3xl font-bold text-slate-800">Layanan Kami</h2>
          <p className="text-slate-500">
            Solusi teknologi modern untuk percepatan bisnis
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#A47148] group-hover:bg-[#A47148] group-hover:text-white transition-colors">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section>
        <div className="container mx-auto px-6">
          <div className="text-center my-5">
            <h1 className="text-3xl font-black">Projek</h1>
            <p className="text-gray-500">
              Berikut beberapa projek yang sudah kami kerjakan, semoga bisa
              menjadi referensi anda
            </p>
          </div>
          <div className="grid lg:grid-cols-4 gap-10">
            {data.portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 shadow-sm rounded-3xl overflow-hidden border border-white/10 hover:border-[#A47148]/50 transition-all"
              >
                <img
                  src={`${uri}${item.image_thumbnail}`}
                  className="w-full object-cover"
                  alt={item.title}
                />
                <div className="p-3 space-y-2">
                  <div>
                    <span className="text-[#A47148] text-xs font-bold uppercase">
                      {item.client_name}
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Solusi:
                    </p>
                    <p className="text-sm text-slate-300 italic">
                      "{item.solutions[0]}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
            Apa Kata Klien Kami?
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Grid Wrapper */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonial.map((testi) => (
            <div
              key={testi.id}
              className="bg-orange-50 p-10 rounded-lg border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Rating Dinamis */}
                <div className="flex gap-1 text-orange-400">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={18} />
                  ))}
                </div>

                <p className="text-lg text-slate-700 italic font-medium leading-relaxed">
                  "{testi.content}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                <h4 className="font-bold text-slate-800 text-lg">
                  {testi.name}
                </h4>
                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                  {testi.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="py-24 bg-orange-300/50 text-slate-900 text-center">
        <div className="container mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-bold">{closing?.pernyataan || "Siap Memulai Proyek Anda?"}</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            {closing?.jawaban?.[0] || "Hubungi tim kami untuk konsultasi gratis."}
          </p>
          <a
            href={hero?.cta_link || "/contact"}
            className="inline-block bg-[#A47148] text-white px-6 py-3 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
          >
            {hero?.cta_text ?? "Hubungi Kami Sekarang"}
          </a>
        </div>
      </section>
    </main>
  );
}
