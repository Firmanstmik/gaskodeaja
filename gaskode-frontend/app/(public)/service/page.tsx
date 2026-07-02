import { ApiServiceRepository } from "@/core/infrastructure/repositories/ApiServicePageRepository";
import { GetServicePageData } from "@/core/application/use-cases/GetServicePageDataUseCase";
import {
  ArrowRight2,
  CalendarTick,
  Crown1,
  Flash,
  Global,
  Mobile,
  MonitorMobbile,
  SearchNormal1,
  Setting4,
  TickCircle,
} from "iconsax-react";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const repository = new ApiServiceRepository();
  const useCase = new GetServicePageData(repository);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return (
    <main className="bg-[#fbf7f1] text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[#161310]" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${uri}/${data.hero.imagePath}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(10,8,7,0.92)_0%,rgba(10,8,7,0.74)_50%,rgba(10,8,7,0.36)_100%)]" />
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4] backdrop-blur">
            <Crown1 size={16} />
            Service Catalog
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">
            {data.hero.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/75">{data.hero.subtitle}</p>
          <a
            href={data.hero.ctaLink}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(164,113,72,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C]"
          >
            {data.hero.ctaText}
            <ArrowRight2 size={16} />
          </a>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black tracking-[-0.03em] md:text-5xl">{data.opening.pernyataan}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.opening.jawaban.map((item) => (
              <div key={item} className="rounded-[1.6rem] border border-[#eadcc9] bg-white p-7 shadow-[0_12px_30px_rgba(43,28,17,0.07)]">
                <div className="mb-4 inline-flex rounded-xl bg-[#fff3e6] p-2.5 text-[#A47148]">
                  <Flash size={20} variant="Bulk" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Solusi detail untuk kebutuhan bisnis modern Anda.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161310] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black tracking-[-0.03em] md:text-5xl">Layanan Utama</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.services.map((svc) => (
              <div key={svc.id} className="rounded-[1.6rem] border border-white/15 bg-white/[0.04] p-6">
                <div className="mb-4 inline-flex rounded-xl bg-[#A47148]/20 p-2.5 text-[#f3c9a4]">
                  <ServiceIcon title={svc.title} />
                </div>
                <h3 className="text-xl font-bold">{svc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black tracking-[-0.03em] md:text-5xl">Paket Harga</h2>
            <p className="mt-3 text-lg text-slate-600">Pilih paket terbaik untuk scale bisnis Anda</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {data.plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-[1.8rem] border p-7 transition-all ${
                  plan.isFeatured
                    ? "border-[#A47148] bg-white shadow-[0_20px_50px_rgba(164,113,72,0.18)]"
                    : "border-[#eadcc9] bg-white/80"
                }`}
              >
                {plan.isFeatured && (
                  <p className="mb-4 inline-flex rounded-full bg-[#fff3e6] px-4 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#A47148]">
                    Rekomendasi
                  </p>
                )}
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className="mt-2 text-3xl font-black text-[#A47148]">Rp {plan.price}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                      <TickCircle size={16} variant="Bulk" className="mt-1 text-[#A47148]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-[#fbf7f1] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Maintenance</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">Rp {plan.maintenance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2.2rem] bg-[#161310] p-12 text-center text-white shadow-[0_28px_70px_rgba(18,13,9,0.28)]">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Let&apos;s Build</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-6xl">{data.closing.pernyataan}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{data.closing.jawaban[0]}</p>
          <a
            href={data.hero.ctaLink}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
          >
            Konsultasi Sekarang
            <CalendarTick size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

function ServiceIcon({ title }: { title: string }) {
  if (title.toLowerCase().includes("website")) return <Global size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("aplikasi")) return <Mobile size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("seo")) return <SearchNormal1 size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("ui") || title.toLowerCase().includes("ux")) return <MonitorMobbile size={20} variant="Bulk" />;
  return <Setting4 size={20} variant="Bulk" />;
}

