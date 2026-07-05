"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight2,
  CalendarTick,
  Crown1,
  Global,
  Mobile,
  MonitorMobbile,
  SearchNormal1,
  Setting4,
  ShieldTick,
  TickCircle,
  Whatsapp,
} from "iconsax-react";
import { ServicePageData, ServicePlan } from "@/core/domain/entities/ServicesEntity";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { TiltCard } from "@/components/ui/TiltCard";
import { CountUp } from "@/components/ui/CountUp";
import { useSpotlight } from "@/components/ui/Spotlight";
import { ease, ghostNumeral, heroH1, revealItem, revealStagger, sectionH2 } from "@/lib/design-tokens";
import { waLink } from "@/lib/contact";

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
      <p className="mt-2 font-display text-3xl font-medium text-[#a47148] sm:text-4xl">
        Rp {plan.price}
      </p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm leading-7 text-slate-600">
            <TickCircle size={16} variant="Bulk" className="mt-1 shrink-0 text-[#a47148]" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl bg-background p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Maintenance</p>
        <p className="mt-1 text-lg font-bold text-slate-700">Rp {plan.maintenance}</p>
      </div>
      <div className="mt-6">
        <Button
          href={waLink(`Halo GasKodeAja, saya tertarik dengan paket ${plan.name} (Rp ${plan.price}). Bisa dijelaskan lebih lanjut?`)}
          variant={plan.isFeatured ? "primary" : "wipe"}
          full="always"
        >
          Pilih Paket Ini
          <Whatsapp size={18} variant="Bulk" />
        </Button>
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
  const ctaLink = waLink("Halo GasKodeAja, saya ingin konsultasi mengenai layanan dan paket harga.");
  const onSpotlightMove = useSpotlight();

  // Middle "why choose us" opening statement raised — breaks the flat symmetric rhythm.
  const openingLayout = ["", "md:-translate-y-6 md:py-10", ""];

  // App-style sticky action bar on mobile, revealed once past the hero.
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-slate-900">
      {/* ─────────────────────── HERO — cinematic, floating showcase panel ─────────────────────── */}
      <section onPointerMove={onSpotlightMove} className="grain relative isolate overflow-hidden bg-[#100d0a]">
        <div className="absolute inset-0 -z-20 opacity-40">
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.9)_46%,rgba(12,10,8,0.6)_100%)]" />
        <div aria-hidden className="spotlight-dark pointer-events-none absolute inset-0 -z-10 hidden lg:block" />
        <div className="animate-glow-pulse pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/30 blur-[120px]" />
        <div className="animate-float-dynamic pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/20 blur-[130px]" />
        <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -left-3 top-8 -z-10 text-white/[0.035]`}>
          S
        </span>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-36">
          <motion.div initial="hidden" animate="show" variants={revealStagger}>
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
            <motion.h1 variants={revealItem} className={`max-w-xl ${heroH1} text-white`}>
              {data.hero.title}
            </motion.h1>
            <motion.p variants={revealItem} className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              {data.hero.subtitle}
            </motion.p>
            <motion.div variants={revealItem} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={ctaLink}>
                {data.hero.ctaText}
                <ArrowRight2 size={16} />
              </Button>
              <a
                href="#layanan"
                className="tap group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
              >
                Jelajahi Layanan
                <ArrowRight2 size={13} className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>

            {/* Mobile showcase — compact version of the desktop panel */}
            <motion.div variants={revealItem} className="mt-10 lg:hidden">
              <CornerFrame tone="dark" className="card-sheen overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.05] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/20 px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image src={heroImage} alt={data.hero.title} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3.5 text-white">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#f3c9a4]">Layanan Aktif</p>
                    <p className="mt-1 font-display text-lg font-medium"><CountUp value={`${data.services.length}+`} /></p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#f3c9a4]">Paket Harga</p>
                    <p className="mt-1 font-display text-lg font-medium"><CountUp value={`${data.plans.length}`} /></p>
                  </div>
                </div>
              </CornerFrame>
            </motion.div>
          </motion.div>

          {/* Desktop showcase panel — browser-chrome preview + floating stat chip */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-[#a47148]/25 to-transparent blur-3xl" />
            <TiltCard>
              <CornerFrame tone="dark" className="group gradient-frame card-sheen overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.05] shadow-[0_50px_110px_-30px_rgba(0,0,0,0.75)] backdrop-blur-2xl transition-all duration-500 hover:border-[#f3c9a4]/40">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/20 px-5 py-3.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 flex-1 truncate rounded-full bg-white/[0.06] px-3 py-1 text-center text-[10px] font-medium text-white/40">
                    gaskodeaja.com/service
                  </span>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={heroImage}
                    alt={data.hero.title}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-[8s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/55 via-transparent to-transparent" />
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4]">Layanan Aktif</p>
                    <p className="mt-1.5 font-display text-2xl font-medium text-white"><CountUp value={`${data.services.length}+`} /></p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4]">Paket Harga</p>
                    <p className="mt-1.5 font-display text-2xl font-medium text-white"><CountUp value={`${data.plans.length}`} /></p>
                  </div>
                </div>
              </CornerFrame>
            </TiltCard>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass-dark absolute -bottom-6 -left-6 flex items-center gap-2.5 rounded-2xl border border-white/15 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#a47148]/25 text-[#f3c9a4]">
                <ShieldTick size={16} variant="Bulk" />
              </span>
              <span className="text-xs font-bold text-white">100% Custom Build</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── WHY CHOOSE US — editorial storytelling timeline ─────────────────────── */}
      <Section tone="stone" prevTone="ink" className="px-5 sm:px-6">
        <Reveal className="mx-auto max-w-5xl">
          <SectionKicker>Why GaskodeAja</SectionKicker>
          <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-[#100d0a]`}>{data.opening.pernyataan}</h2>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <div aria-hidden className="absolute bottom-2 left-[27px] top-2 hidden w-px bg-gradient-to-b from-[#a47148]/40 via-[#a47148]/15 to-transparent lg:block" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealStagger}
            className="space-y-10 sm:space-y-14"
          >
            {data.opening.jawaban.map((item, idx) => (
              <motion.div
                key={item}
                variants={revealItem}
                className={`group relative flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8 ${openingLayout[idx % 3]}`}
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a47148] to-[#8b5e3c] font-display text-xl font-medium text-white shadow-[0_16px_36px_-12px_rgba(164,113,72,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="relative flex-1 border-b border-[#a47148]/10 pb-10 sm:pb-14 lg:border-b-0 lg:pb-0">
                  <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -right-4 -top-10 hidden select-none text-[#a47148]/[0.05] lg:block lg:text-[7rem]`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-balance font-display text-2xl font-light leading-[1.2] tracking-[-0.01em] text-[#100d0a] transition-colors duration-300 group-hover:text-[#a47148] sm:text-3xl lg:text-4xl">
                    {item}
                  </h3>
                  <p className="relative mt-3 max-w-xl text-[15px] leading-7 text-slate-600">
                    Solusi detail untuk kebutuhan bisnis modern Anda.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────── LAYANAN UTAMA — flagship presentation blocks ─────────────────────── */}
      <Section id="layanan" tone="ink" prevTone="stone" className="grain relative isolate overflow-hidden px-5 text-white sm:px-6">
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <Reveal className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionKicker tone="light" center>What We Do</SectionKicker>
            <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-white`}>Layanan Utama</h2>
          </div>

          <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24 lg:space-y-32">
            {data.services.map((svc, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, ease }}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Visual panel — abstract UI-preview showcase, not a fake screenshot */}
                  <div
                    onPointerMove={onSpotlightMove}
                    className={`corner-frame spotlight-dark group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-1 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#f3c9a4]/30 ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="grain relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#1a140d] to-[#100d0a]">
                      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/5 px-5 py-3">
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                      </div>
                      <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -bottom-8 -right-4 select-none text-white/[0.05]`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#a47148]/25 to-[#f3c9a4]/10 text-[#f3c9a4] shadow-[0_0_60px_rgba(243,201,164,0.25)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 sm:h-28 sm:w-28">
                        <span className="scale-[2] sm:scale-[2.4]">
                          <ServiceIcon title={svc.title} />
                        </span>
                      </div>
                      <motion.span
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-8 top-16 h-2 w-2 rounded-full bg-[#f3c9a4]/40"
                      />
                      <motion.span
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-16 right-10 h-2.5 w-2.5 rounded-full bg-[#a47148]/50"
                      />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={isReversed ? "lg:order-1 lg:pr-6" : "lg:pl-6"}>
                    <span className="font-mono text-xs tracking-[0.3em] text-[#f3c9a4]/60">
                      {String(idx + 1).padStart(2, "0")} / {String(data.services.length).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-balance font-display text-3xl font-light leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                      {svc.title}
                    </h3>
                    <p className="mt-5 max-w-md text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8">
                      {svc.description}
                    </p>
                    <a
                      href={waLink(`Halo GasKodeAja, saya ingin tanya lebih lanjut tentang layanan ${svc.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap group/link mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#f3c9a4]"
                    >
                      Tanyakan Layanan Ini
                      <ArrowRight2 size={15} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
                    <div onPointerMove={onSpotlightMove} className="gradient-frame corner-frame spotlight tap relative overflow-hidden rounded-[1.9rem] border border-[#a47148]/40 bg-white p-8 shadow-[0_44px_100px_-30px_rgba(164,113,72,0.45)] transition-all duration-500 hover:border-[#f3c9a4]/80 hover:shadow-[0_44px_120px_-20px_rgba(164,113,72,0.55)] sm:rounded-[2.2rem] sm:p-9">
                      <PlanContent plan={plan} />
                    </div>
                  </TiltCard>
                ) : (
                  <div onPointerMove={onSpotlightMove} className="tap card-sheen spotlight relative overflow-hidden rounded-[1.75rem] border border-[#a47148]/15 bg-white/80 p-7 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-[#a47148]/40 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(164,113,72,0.25)] sm:rounded-[2rem]">
                    <PlanContent plan={plan} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </Section>

      {/* ─────────────────────── CLOSING CTA — unforgettable ─────────────────────── */}
      <Section tone="cream" prevTone="cream" rhythm="cinematic" className="px-5 sm:px-6">
        <Reveal className="gradient-frame grain group relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-center text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-24">
          <div className="animate-glow-pulse pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/30 blur-[120px]" />
          <div className="animate-float-dynamic pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/20 blur-[130px]" />
          <span aria-hidden className="pointer-events-none absolute -right-8 bottom-0 select-none text-[10rem] leading-none text-white/[0.04] sm:text-[14rem]">
            ✦
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Let&apos;s Build</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-[2.7rem] font-light leading-[1.0] tracking-[-0.03em] sm:text-6xl md:text-[5.2rem]">
            {data.closing.pernyataan}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.closing.jawaban[0]}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={ctaLink} full={false}>
              Konsultasi Sekarang
              <CalendarTick size={16} />
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ─────────── APP-STYLE STICKY ACTION BAR (mobile only) ─────────── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-safe transition-all duration-500 lg:hidden ${
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-md items-center gap-3 rounded-[1.35rem] border border-[#a47148]/20 bg-[#100d0a]/92 p-2 shadow-[0_20px_50px_-14px_rgba(18,13,9,0.7)] backdrop-blur-xl">
          <div className="min-w-0 flex-1 pl-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Konsultasi Gratis</p>
            <p className="truncate font-display text-sm text-white/85">Mulai proyek Anda hari ini</p>
          </div>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine tap relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-[#c08a5c] to-[#8b5e3c] px-5 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(164,113,72,0.7)]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Chat WA
              <Whatsapp size={16} variant="Bulk" />
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
