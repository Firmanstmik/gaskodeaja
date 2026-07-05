"use client";

import Image from "next/image";
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
import { ServicePageData, ServicePlan } from "@/core/domain/entities/ServicesEntity";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";
import { useSpotlight } from "@/components/ui/Spotlight";
import { heroH1, revealItem, revealStagger } from "@/lib/design-tokens";

function ServiceIcon({ title }: { title: string }) {
  if (title.toLowerCase().includes("website")) return <Global size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("aplikasi")) return <Mobile size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("seo")) return <SearchNormal1 size={20} variant="Bulk" />;
  if (title.toLowerCase().includes("ui") || title.toLowerCase().includes("ux")) return <MonitorMobbile size={20} variant="Bulk" />;
  return <Setting4 size={20} variant="Bulk" />;
}

/** Shared pricing-card content — kept as one component so the dramatically-elevated
 *  featured plan and the regular plans don't duplicate the feature-list markup. */
function PlanContent({ plan }: { plan: ServicePlan }) {
  return (
    <>
      {plan.isFeatured && (
        <span className="btn-shine relative overflow-hidden mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#a47148]/30 bg-gradient-to-r from-[#fff3e6] to-[#f3ddc0] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#a47148] shadow-[0_0_15px_rgba(164,113,72,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(164,113,72,0.3)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a47148] opacity-80" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#a47148]" />
          </span>
          Rekomendasi
        </span>
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
      <div className="mt-6 rounded-xl bg-background p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Maintenance</p>
        <p className="mt-1 text-lg font-bold text-slate-700">Rp {plan.maintenance}</p>
      </div>
    </>
  );
}

type ServicePremiumContentProps = {
  data: ServicePageData;
  uri: string;
};

export function ServicePremiumContent({ data, uri }: ServicePremiumContentProps) {
  const heroImage = `${uri}/${data.hero.imagePath}`;
  const onSpotlightMove = useSpotlight();

  // Middle card raised, taller padding — breaks the flat symmetric 3-up.
  const openingLayout = ["", "md:-translate-y-6 md:py-10", ""];

  return (
    <main className="bg-background text-slate-900">
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a]">
        <div className="absolute inset-0 -z-20 opacity-45">
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
        <div className="animate-glow-pulse pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/30 blur-[120px]" />
        <div className="animate-float-dynamic pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/20 blur-[130px]" />
        <div className="animate-float-slow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9a875]/15 blur-[160px]" />

        <motion.div initial="hidden" animate="show" variants={revealStagger} className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32">
          <motion.p variants={revealItem} className="mb-7">
            <span className="btn-shine relative overflow-hidden inline-flex items-center gap-2 rounded-full border border-[#f3c9a4]/30 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:text-[11px] sm:tracking-[0.28em] shadow-[0_0_20px_rgba(243,201,164,0.15)] transition-all duration-300 hover:bg-white/[0.08] hover:border-[#f3c9a4]/60 hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f3c9a4] opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f3c9a4]" />
              </span>
              <Crown1 size={14} className="text-[#f3c9a4] animate-pulse" variant="Bulk" />
              Service Catalog
            </span>
          </motion.p>
          <motion.h1 variants={revealItem} className={`max-w-5xl ${heroH1} text-white`}>
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

      {/* ─────────────────────── OPENING — asymmetric 3-up, middle card raised ─────────────────────── */}
      <Section tone="cream" prevTone="ink" className="px-5 sm:px-6">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading center>{data.opening.pernyataan}</SectionHeading>
          <motion.div variants={revealStagger} className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3">
            {data.opening.jawaban.map((item, idx) => (
              <motion.div key={item} variants={revealItem} className={openingLayout[idx % 3]}>
                <div
                  onPointerMove={onSpotlightMove}
                  className="card-sheen spotlight tap group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#a47148]/15 bg-white p-6 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-[#a47148]/50 hover:shadow-[0_40px_80px_-20px_rgba(164,113,72,0.25)] sm:rounded-[1.75rem] sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#fff8ee] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mb-5 inline-flex w-fit items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff5eb] to-[#f3ddc0] ring-1 ring-[#a47148]/20 p-3 text-[#a47148] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_25px_rgba(164,113,72,0.4)]">
                    <span className="transition-transform duration-500 group-hover:scale-125"><Flash size={22} variant="Bulk" /></span>
                  </div>
                  <h3 className="relative font-display text-xl font-medium text-slate-900 group-hover:text-[#100d0a] transition-colors">{item}</h3>
                  <p className="relative mt-2.5 text-sm leading-7 text-slate-600">
                    Solusi detail untuk kebutuhan bisnis modern Anda.
                  </p>
                  <span className="relative mt-5 h-px w-8 origin-left scale-x-100 bg-[#a47148]/20 transition-all duration-500 group-hover:w-16 group-hover:bg-[#a47148]/60" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </Section>

      {/* ─────────────────────── LAYANAN UTAMA — off-grid bento ─────────────────────── */}
      <Section tone="ink" prevTone="cream" className="grain relative isolate overflow-hidden px-5 text-white sm:px-6">
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading tone="light" center>Layanan Utama</SectionHeading>
          <motion.div
            variants={revealStagger}
            className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {data.services.map((svc, idx) => {
              const isLast = idx === data.services.length - 1;
              const offsetCls = idx % 3 === 1 ? "lg:translate-y-8" : idx % 3 === 2 ? "lg:-translate-y-4" : "";
              return (
                <motion.div
                  key={svc.id}
                  variants={revealItem}
                  onPointerMove={onSpotlightMove}
                  className={`corner-frame spotlight-dark group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/[0.08] hover:border-[#f3c9a4]/40 hover:shadow-[0_0_40px_rgba(243,201,164,0.1)] sm:rounded-[1.75rem] ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2 gradient-frame" : ""
                  } ${offsetCls} ${isLast ? "lg:-mb-10 lg:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)]" : ""}`}
                >
                  <span aria-hidden data-pos="tl" className="corner-frame-mark text-[#f3c9a4]/0 transition-all duration-500 group-hover:text-[#f3c9a4]/100 group-hover:scale-125" />
                  <span aria-hidden data-pos="br" className="corner-frame-mark text-[#f3c9a4]/0 transition-all duration-500 group-hover:text-[#f3c9a4]/100 group-hover:scale-125" />
                  <span aria-hidden data-pos="tr" className="corner-frame-mark text-[#f3c9a4]/0 transition-all duration-500 group-hover:text-[#f3c9a4]/100 group-hover:scale-125" />
                  <span aria-hidden data-pos="bl" className="corner-frame-mark text-[#f3c9a4]/0 transition-all duration-500 group-hover:text-[#f3c9a4]/100 group-hover:scale-125" />
                  <div className="mb-6 inline-flex w-fit rounded-2xl bg-[#a47148]/15 p-3.5 text-[#f3c9a4] ring-1 ring-[#f3c9a4]/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:bg-[#a47148]/30 group-hover:ring-[#f3c9a4]/40">
                    <span className="transition-transform duration-300 group-hover:scale-110"><ServiceIcon title={svc.title} /></span>
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight">{svc.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-white/60">{svc.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Reveal>
      </Section>

      {/* ─────────────────────── PRICING — featured plan dramatically elevated ─────────────────────── */}
      <Section tone="cream" prevTone="ink" className="px-5 sm:px-6">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading kicker="Investment" center>
            Paket Harga
          </SectionHeading>
          <p className="mt-5 text-center text-[15px] leading-7 text-slate-600 sm:text-base">Pilih paket terbaik untuk scale bisnis Anda</p>

          <motion.div variants={revealStagger} className="mt-10 grid gap-6 sm:mt-16 md:grid-cols-3 md:items-center">
            {data.plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={revealItem}
                className={`relative ${plan.isFeatured ? "z-10 md:-translate-y-8 md:scale-[1.07]" : ""}`}
              >
                {plan.isFeatured ? (
                  <TiltCard range={4} className="relative z-10">
                    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#a47148]/30 to-transparent blur-3xl animate-glow-pulse" />
                    <div onPointerMove={onSpotlightMove} className="gradient-frame corner-frame spotlight tap relative overflow-hidden rounded-[1.9rem] border border-[#a47148]/40 bg-white p-8 shadow-[0_44px_100px_-30px_rgba(164,113,72,0.45)] sm:rounded-[2.2rem] sm:p-9 transition-all duration-500 hover:border-[#f3c9a4]/80 hover:shadow-[0_44px_120px_-20px_rgba(164,113,72,0.55)]">
                      <PlanContent plan={plan} />
                    </div>
                  </TiltCard>
                ) : (
                  <div onPointerMove={onSpotlightMove} className="tap card-sheen spotlight relative overflow-hidden rounded-[1.75rem] border border-[#a47148]/15 bg-white/80 p-7 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-[#a47148]/40 hover:shadow-[0_30px_60px_-15px_rgba(164,113,72,0.25)] hover:bg-white sm:rounded-[2rem]">
                    <PlanContent plan={plan} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </Section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <Section tone="cream" prevTone="cream" rhythm="cinematic" className="px-5 sm:px-6">
        <Reveal className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-center text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-20">
          <div className="animate-glow-pulse pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/30 blur-[120px]" />
          <div className="animate-float-dynamic pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/20 blur-[130px]" />
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
        </Reveal>
      </Section>
    </main>
  );
}
