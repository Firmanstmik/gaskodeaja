import React from 'react';
import { CheckCircle, Smartphone, Globe, Search, Settings, MessageCircle, Zap } from 'lucide-react';
import { ApiServiceRepository } from "@/core/infrastructure/repositories/ApiServicePageRepository";
import { GetServicePageData } from "@/core/application/use-cases/GetServicePageDataUseCase";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  // Integrasi Clean Architecture
  const repository = new ApiServiceRepository();
  const useCase = new GetServicePageData(repository);
  const data = await useCase.execute();

  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return (
    <div className="min-h-screen font-sans">

      {/* --- 🧠 HEADER SECTION (Hero with Image Thumbnail as Background) --- */}
      <section
        className="relative min-h-[70vh] flex items-center text-white overflow-hidden bg-slate-900"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 30%, rgba(15, 23, 42, 0.2) 100%), url('${uri}/${data.hero.imagePath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Badge Opsional untuk Estetika */}
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-[#A47148] uppercase bg-[#A47148]/10 border border-[#a47148]/20 rounded-lg">
              Our Solutions
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {data.hero.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              {data.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={data.hero.ctaLink}
                className="inline-flex items-center bg-[#A47148] hover:bg-[#8B5E3C] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-[#A47148]/40 transform hover:-translate-y-1"
              >
                <MessageCircle className="mr-2" /> {data.hero.ctaText}
              </a>

              <button className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-lg transition-all">
                Lihat Layanan
              </button>
            </div>
          </div>
        </div>

        {/* Dekorasi Overlay Tambahan untuk kedalaman visual */}
        {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent"></div> */}
      </section>

      {/* 💡 VALUE PROPOSITION (Opening) */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">{data.opening.pernyataan}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.opening.jawaban.map((val, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-[#A47148]" />
              </div>
              <h3 className="font-bold text-xl mb-3">{val}</h3>
              <p className="text-slate-600">Standar kualitas terbaik untuk memastikan fungsionalitas {val.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛠 DETAIL LAYANAN (Services) */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Layanan yang Kami Sediakan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.map((svc) => (
              <ServiceCard
                key={svc.id}
                title={svc.title}
                description={svc.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 💰 PAKET HARGA (Service Plans) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Pilih Paket Sesuai Kebutuhan</h2>
        <p className="text-center text-slate-500 mb-16">Investasi transparan untuk pertumbuhan bisnis jangka panjang</p>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {data.plans.map((plan) => (
            <PricingCard
              key={plan.id}
              tier={plan.name}
              price={plan.price}
              features={plan.features}
              maintenance={plan.maintenance}
              isFeatured={plan.isFeatured}
            />
          ))}
        </div>
      </section>

      {/* 📞 CLOSING SECTION */}
      <section className="bg-orange-300/50 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-orange-200/50 p-12 rounded-[2rem] border border-[#A47148]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">{data.closing.pernyataan}</h2>
          <p className="mb-10 text-xl text-slate-700">{data.closing.jawaban[0]}</p>
          <a
            href={data.hero.ctaLink}
            className="inline-flex items-center bg-[#A47148] hover:bg-[#8B5E3C] text-white px-6 py-3 rounded-lg font-black text-xl transition-transform hover:scale-105 shadow-2xl"
          >
            <MessageCircle className="mr-3" /> Chat WhatsApp Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}

// Reusable Components
const ServiceCard = ({ title, description }: any) => {
  const getIcon = (t: string) => {
    if (t.includes("Website")) return <Globe className="text-[#A47148]" />;
    if (t.includes("Aplikasi")) return <Smartphone className="text-[#A47148]" />;
    if (t.includes("SEO")) return <Search className="text-[#A47148]" />;
    return <Settings className="text-[#A47148]" />;
  };

  return (
    <div className="p-8 rounded-3xl shadow-lg transition-all bg-slate-50/50 group">
      <div className="mb-6 transform group-hover:scale-110 transition-transform">{getIcon(title)}</div>
      <h3 className="font-bold text-xl mb-4 leading-snug">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const PricingCard = ({ tier, price, features, maintenance, isFeatured }: any) => (
  <div className={`p-8 rounded-[2rem] border transition-all flex flex-col h-full ${
    isFeatured 
      ? 'border-[#a47148] shadow-xl scale-105 bg-white z-10' 
      : 'border-slate-200 bg-white/60 hover:bg-white'
  }`}>
    
    {/* Kontainer Atas & List Fitur */}
    <div className="flex-grow">
      {isFeatured && (
        <span className="border border-[#A47148] text-slate-800 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest mb-6 inline-block">
          Rekomendasi Utama
        </span>
      )}
      
      <h3 className="text-xl font-bold mb-2">{tier}</h3>
      
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-2xl font-black text-slate-900">Rp {price}</span>
      </div>

      <ul className="space-y-2 mb-5">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start text-sm text-slate-700 leading-tight">
            <CheckCircle size={18} className="text-[#A47148] mr-3 flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>

    {/* Kontainer Bawah (Maintenance & Button) */}
    <div className="mt-auto">
      <div className="pt-3 border-t border-slate-100 mb-4">
        <p className="text-xs text-slate-600 font-bold tracking-tighter">Maintenance Tahunan</p>
        <p className="text-lg font-bold text-slate-700">Rp {maintenance}</p>
      </div>

      <button 
        className={`w-full py-2 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
          isFeatured 
            ? 'bg-[#A47148] text-white hover:bg-[#8B5E3C] shadow-lg shadow-[#A47148]/40' 
            : 'bg-slate-900 text-white hover:bg-black shadow-md'
        }`}
      >
        Pilih Paket
      </button>
    </div>
  </div>
);