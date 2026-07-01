import {
  CheckCircle2,
  ShieldCheck,
  Target,
  Users,
  MessageSquare,
  TrendingUp,
  Search,
  Star,
} from "lucide-react";

// Layer Domain & Infrastructure
import { ApiAboutRepository } from "@/core/infrastructure/repositories/ApiAboutRepository";
import { GetAboutPageData } from "@/core/application/use-cases/GetAboutPageData";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // 1. Inisialisasi Clean Architecture di Server Side
  const repository = new ApiAboutRepository();
  const useCase = new GetAboutPageData(repository);
  const data = await useCase.execute();

  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  // 2. Helper untuk memisahkan Visi dan Misi dari Entity visiMisi[]
  const visi = data.visiMisi?.find((i) => i.tipe === "visi");
  const misi = data.visiMisi?.find((i) => i.tipe === "misi");

  // Mapping Icon untuk Misi
  const missionIcons = [
    <Target />,
    <ShieldCheck />,
    <Search />,
    <TrendingUp />,
  ];

  return (
    <main className="text-slate-900 font-sans">

      {/* --- 🧭 HEADER SECTION (Hero) --- */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-800">
        {/* Gambar Banner dari API */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${uri}/${data.hero.imagePath}`}
            alt="Hero Banner GaskodeAja"
            className="w-full h-full object-cover opacity-40" // Opacity dikurangi agar teks terbaca
          />
          {/* Overlay Gradien agar lebih elegan */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl lg:text-7xl font-extrabold mb-6 text-white leading-tight">
            {data.hero.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {data.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={data.hero.ctaLink}
              className="bg-[#A47148] text-white px-10 py-4 rounded-full font-bold hover:bg-[#8a5a3c] transition-all shadow-xl hover:shadow-[#A47148]/50 text-lg"
            >
              {data.hero.ctaText}
            </a>
            <button className="border border-white/30 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Lihat Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* --- 💡 STORY / LATAR BELAKANG (Opening) --- */}
      <section className="py-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              {data.opening.pernyataan}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>{data.opening.jawaban[0]}</p>
              <p className="font-boold text-slate-600">
                {data.opening.jawaban[1]}
              </p>
              <p className="pt-4 border-t border-slate-100 italic">
                {data.opening.jawaban[2]}
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 rounded-3xl h-96 overflow-hidden shadow-2xl relative">
            <img
              src={`${uri}/${data.hero.imagePath}`}
              alt="About GaskodeAja"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- 🎯 VISI & MISI --- */}
      <section className="py-10 text-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Visi Kami</h2>
            <p className="text-slate-700 max-w-2xl mx-auto text-lg italic">
              "{visi?.konten[0]}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {misi?.konten.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-sm rounded-xl hover:bg-orange-200 transition-colors"
              >
                <div className="text-slate-900 mb-4">
                  {missionIcons[index] || <CheckCircle2 />}
                </div>
                <h3 className="font-bold mb-2">{item}</h3>
                <p className="text-slate-700 text-sm">
                  Memberikan standar {item.toLowerCase()} terbaik untuk setiap
                  proyek.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 🚀 VALUE PROPOSITION --- */}
      <section className="py-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">{data.value.pernyataan}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.value.jawaban.map((val, i) => (
              <div
                key={i}
                className="p-4 bg-orange-50 rounded-lg font-semibold text-slate-700 border border-orange-100 shadow-sm"
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 📊 STATISTIK --- */}
      <section className="py-16 bg-[#A47148] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-black mb-2">
                {data.portfolio.total}+
              </div>
              <p className="text-slate-100">Project Selesai</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black mb-2 flex items-center justify-center gap-2">
                {data.portfolio.rating} <Star fill="white" size={32} />
              </div>
              <p className="text-slate-100">Rating Kepuasan</p>
            </div>
            <div className="col-span-2 lg:col-span-1 text-sm lg:text-base flex items-center justify-center italic opacity-80">
              "Solusi digital terpercaya untuk UMKM hingga korporasi."
            </div>
          </div>
        </div>
      </section>

      {/* --- 💼 CARA KERJA --- */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Bagaimana Kami Bekerja?
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {data.caraKerja.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 bg-[#A47148] text-white rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xl shadow-md">
                  {i + 1}
                </div>
                <p className="text-lg font-semibold text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 👨‍💻 TIM / LAYANAN --- */}
      <section className="py-10 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Layanan Spesialis Kami</h2>
        <p className="mb-12 text-slate-600">
          Tim ahli yang siap mengeksekusi ide digital Anda
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {data.team.map((member, i) => (
            <div key={i} className="group">
              <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-[#A47148] transition-all duration-300">
                <Users
                  className="text-[#A47148] group-hover:text-white"
                  size={32}
                />
              </div>
              <h4 className="font-bold text-slate-800">{member.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* --- ⭐ TESTIMONI --- */}
      <section className="py-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Apa Kata Klien Kami?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.map((testi, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm text-left relative group"
              >
                <MessageSquare className="absolute -top-3 -right-3 text-[#A47148] w-12 h-12" />
                <div className="flex gap-1 mb-4 text-orange-400">
                  {[...Array(testi.rating)].map((_, s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="italic text-slate-600 mb-6 leading-relaxed">
                  "{testi.content}"
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-bold text-slate-800">{testi.name}</h4>
                  <p className="text-sm text-[#A47148] font-medium">
                    {testi.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 📞 CLOSING SECTION --- */}
      <section className="py-10 container mx-auto px-6 text-center">
        <div className="bg-orange-300/50 rounded-[2rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">{data.closing.pernyataan}</h2>
          <p className="text-xl text-slate-900 mb-10 max-w-2xl mx-auto">
            {data.closing.jawaban[0]}
          </p>
          <a
            href={data.hero.ctaLink}
            className="inline-flex items-center gap-3 bg-white text-slate-700 px-6 py-3 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-xl"
          >
            Konsultasi Sekarang
          </a>
        </div>
      </section>
    </main>
  );
}
