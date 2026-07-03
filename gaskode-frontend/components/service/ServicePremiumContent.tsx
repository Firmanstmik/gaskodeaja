"use client";

import { motion } from "framer-motion";
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
import { ServicePageData } from "@/core/domain/entities/ServicesEntity";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { revealItem, revealSection, revealStagger } from "@/lib/design-tokens";

function ServiceIcon({ title }: { title: string }) {
  if (title.toLowerCase().includes("website")) return <Global size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("aplikasi")) return <Mobile size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("seo")) return <SearchNormal1 size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("ui") || title.toLowerCase().includes("ux")) return <MonitorMobbile size={20} variant="Bulk" />;
  return <Setting4 size={20} variant="Bulk" />;
}

type ServicePremiumContentProps = {
  data: ServicePageData;
  uri: string;
};

export function ServicePremiumContent({ data, uri }: ServicePremiumContentProps) {
  const heroImage = `${uri}/${data.hero.imagePath}`;

  return (
    <main className="bg-[#fbf7f1] text-slate-900">
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
        <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
        <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />

        <motion.div initial="hidden" animate="show" variants={revealStagger} className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32">
          <motion.p variants={revealItem} className="mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:text-[11px] sm:tracking-[0.28em]">
              <Crown1 size={14} className="text-[#f3c9a4]" variant="Bulk" />
              Service Catalog
            </span>
          </motion.p>
          <motion.h1
            variants={revealItem}
            className="max-w-5xl text-balance font-display text-[2.7rem] font-light leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p variants={revealItem} className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.hero.subtitle}
          </motion.p>
          <motion.div variants={revealItem} className="mt-9">
            <Button href={data.hero.ctaLink} full={false}>
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── OPENING ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={revealSection} className="mx-auto max-w-7xl">
          <SectionHeading center>{data.opening.pernyataan}</SectionHeading>
          <motion.div variants={revealStagger} className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3">
            {data.opening.jawaban.map((item, idx) => (
              <motion.div key={item} variants={revealItem}>
                <Card index={idx}>
                  <div className="mb-4 inline-flex rounded-xl bg-[#fff3e6] p-2.5 text-[#a47148]">
                    <Flash size={20} variant="Bulk" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-slate-900">{item}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-slate-600">
                    Solusi detail untuk kebutuhan bisnis modern Anda.
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── LAYANAN UTAMA (bento) ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a] px-5 py-16 text-white sm:px-6 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={revealSection} className="mx-auto max-w-7xl">
          <SectionHeading tone="light" center>Layanan Utama</SectionHeading>
          <motion.div
            variants={revealStagger}
            className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:mt-14 sm:rounded-[2rem] md:grid-cols-2 lg:grid-cols-4"
          >
            {data.services.map((svc, idx) => (
              <motion.div
                key={svc.id}
                variants={revealItem}
                className={`group relative flex flex-col bg-[#100d0a] p-7 transition-colors duration-300 hover:bg-[#181410] ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#f3c9a4]/0 transition-colors duration-500 group-hover:border-[#f3c9a4]/50" />
                <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[#f3c9a4]/0 transition-colors duration-500 group-hover:border-[#f3c9a4]/50" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#f3c9a4]/0 transition-colors duration-500 group-hover:border-[#f3c9a4]/50" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#f3c9a4]/0 transition-colors duration-500 group-hover:border-[#f3c9a4]/50" />
                <div className="mb-6 inline-flex w-fit rounded-2xl bg-[#a47148]/15 p-3.5 text-[#f3c9a4] ring-1 ring-[#f3c9a4]/10">
                  <ServiceIcon title={svc.title} />
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight">{svc.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/60">{svc.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── PRICING ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={revealSection} className="mx-auto max-w-7xl">
          <SectionHeading kicker="Investment" center>
            Paket Harga
          </SectionHeading>
          <p className="mt-5 text-center text-[15px] leading-7 text-slate-600 sm:text-base">Pilih paket terbaik untuk scale bisnis Anda</p>

          <motion.div variants={revealStagger} className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {data.plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={revealItem}
                className={`tap relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 hover:-translate-y-1.5 sm:rounded-[2rem] ${
                  plan.isFeatured
                    ? "gradient-frame border-[#a47148]/40 bg-white shadow-[0_28px_60px_-24px_rgba(164,113,72,0.35)]"
                    : "card-sheen border-[#a47148]/15 bg-white/80 hover:border-[#a47148]/35"
                }`}
              >
                {plan.isFeatured && (
                  <p className="mb-4 inline-flex rounded-full bg-[#fff3e6] px-4 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#a47148]">
                    Rekomendasi
                  </p>
                )}
                <h3 className="font-display text-2xl font-medium text-[#100d0a]">{plan.name}</h3>
                <p className="mt-2 font-display text-3xl font-medium text-[#a47148]">Rp {plan.price}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                      <TickCircle size={16} variant="Bulk" className="mt-1 shrink-0 text-[#a47148]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-[#fbf7f1] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Maintenance</p>
                  <p className="mt-1 text-lg font-bold text-slate-700">Rp {plan.maintenance}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={revealSection}
        className="px-5 pb-16 sm:px-6 sm:pb-24 lg:pb-28"
      >
        <div className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-center text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/12 blur-[130px]" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Let&apos;s Build</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            {data.closing.pernyataan}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.closing.jawaban[0]}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={data.hero.ctaLink} full={false}>
              Konsultasi Sekarang
              <CalendarTick size={16} />
            </Button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
