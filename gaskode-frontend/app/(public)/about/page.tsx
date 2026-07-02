import { ApiAboutRepository } from "@/core/infrastructure/repositories/ApiAboutRepository";
import { GetAboutPageData } from "@/core/application/use-cases/GetAboutPageData";
import {
  Crown1,
  Flash,
  People,
  QuoteDown,
  ShieldTick,
  Star1,
  TickCircle,
} from "iconsax-react";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const repository = new ApiAboutRepository();
  const useCase = new GetAboutPageData(repository);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  const visi = data.visiMisi?.find((i) => i.tipe === "visi");
  const misi = data.visiMisi?.find((i) => i.tipe === "misi");

  return (
    <main className="bg-[#fbf7f1] text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[#161310]" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url('${uri}/${data.hero.imagePath}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(12,10,8,0.92)_0%,rgba(12,10,8,0.74)_50%,rgba(12,10,8,0.38)_100%)]" />
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4] backdrop-blur">
            <Crown1 size={16} />
            About GasKodeAja
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">
            {data.hero.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/75">{data.hero.subtitle}</p>
          <a
            href={data.hero.ctaLink}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(164,113,72,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C]"
          >
            {data.hero.ctaText}
          </a>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#A47148]">Our Story</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] md:text-5xl">
              {data.opening.pernyataan}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
              {data.opening.jawaban.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#e8d9c7] bg-white p-3 shadow-[0_20px_50px_rgba(32,21,14,0.12)]">
            <img src={`${uri}/${data.hero.imagePath}`} alt={data.hero.title} className="h-full w-full rounded-[1.6rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#161310] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-[-0.03em] md:text-5xl">Visi & Misi Kami</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-white/70">"{visi?.konten?.[0] || "Membangun solusi digital yang berdampak nyata untuk bisnis."}"</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(misi?.konten || []).map((item) => (
              <div key={item} className="rounded-[1.6rem] border border-white/15 bg-white/[0.04] p-6">
                <div className="mb-4 inline-flex rounded-xl bg-[#A47148]/20 p-2.5 text-[#f3c9a4]">
                  <ShieldTick size={20} variant="Bulk" />
                </div>
                <h3 className="text-xl font-bold">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  Standar kerja kami untuk menjaga kualitas pada setiap tahap project.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black tracking-[-0.03em] md:text-5xl">{data.value.pernyataan}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {data.value.jawaban.map((val) => (
              <div key={val} className="rounded-2xl border border-[#eadbc8] bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-sm">
                {val}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ece2] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 text-center">
              <p className="text-5xl font-black text-slate-900">{data.portfolio.total}+</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Project Selesai</p>
            </div>
            <div className="rounded-3xl bg-white p-8 text-center">
              <p className="flex items-center justify-center gap-1 text-5xl font-black text-slate-900">
                {data.portfolio.rating}
                <Star1 size={22} variant="Bold" className="text-[#A47148]" />
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Rating Klien</p>
            </div>
            <div className="rounded-3xl bg-[#161310] p-8 text-white">
              <p className="text-sm uppercase tracking-[0.18em] text-[#f3c9a4]">Signature</p>
              <p className="mt-4 text-lg font-semibold leading-8 text-white/75">
                Solusi digital premium untuk UMKM sampai perusahaan skala enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-black tracking-[-0.03em] md:text-5xl">Cara Kerja Kami</h2>
          <div className="mt-14 space-y-4">
            {data.caraKerja.map((step, idx) => (
              <div key={step} className="flex items-center gap-5 rounded-2xl border border-[#eadbc8] bg-white p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A47148] text-lg font-black text-white">
                  {idx + 1}
                </div>
                <p className="text-lg font-semibold text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161310] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black tracking-[-0.03em] md:text-5xl">Tim Spesialis Kami</h2>
          <div className="mt-12 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {data.team.map((member) => (
              <div key={member.slug} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 text-center">
                <div className="mx-auto mb-4 inline-flex rounded-2xl bg-[#A47148]/20 p-3 text-[#f3c9a4]">
                  <People size={22} variant="Bulk" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-white/80">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-black tracking-[-0.03em] md:text-5xl">Apa Kata Klien Kami</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {data.testimonials.map((testi) => (
              <div key={testi.name} className="rounded-[1.8rem] border border-[#eadbc8] bg-white p-7 shadow-[0_10px_30px_rgba(42,28,18,0.08)]">
                <QuoteDown size={22} variant="Bulk" className="mb-4 text-[#A47148]" />
                <div className="mb-4 flex gap-1 text-[#A47148]">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star1 key={`${testi.name}-${i}`} size={16} variant="Bold" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-600">{testi.content}</p>
                <p className="mt-5 text-base font-black text-slate-900">{testi.name}</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A47148]">{testi.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2.2rem] bg-[#161310] p-12 text-center text-white shadow-[0_28px_70px_rgba(18,13,9,0.28)]">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Ready To Start</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-6xl">{data.closing.pernyataan}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{data.closing.jawaban[0]}</p>
          <a
            href={data.hero.ctaLink}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
          >
            Konsultasi Sekarang
            <Flash size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

