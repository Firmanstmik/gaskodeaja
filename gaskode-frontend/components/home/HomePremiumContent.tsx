"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight2,
  Crown1,
  Flash,
  MessageQuestion,
  MonitorMobbile,
  PictureFrame,
  QuoteDown,
  ShieldTick,
  Star1,
  TickCircle,
  TrendUp,
} from "iconsax-react";
import { Button } from "@/components/ui/Button";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { TiltCard } from "@/components/ui/TiltCard";
import { OverlapCTA } from "@/components/ui/OverlapCTA";
import { ease, ghostNumeral, heroH1, revealItem, revealLine, revealStagger, sectionH2 } from "@/lib/design-tokens";

type HomePremiumContentProps = {
  hero: {
    title?: string;
    subtitle?: string;
    image_path?: string;
    cta_text?: string;
    cta_link?: string;
  };
  opening: {
    pernyataan?: string;
    jawaban?: string[];
  };
  closing: {
    pernyataan?: string;
    jawaban?: string[];
  };
  services: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  portfolio: Array<{
    id: number;
    title: string;
    client_name: string;
    image_thumbnail: string;
    solutions: string[];
  }>;
  testimonial: Array<{
    id: number;
    name: string;
    position: string;
    content: string;
    rating: number;
  }>;
  uri: string;
};

/** Split a headline into two display lines so the final word can receive the champagne accent. */
function splitLast(text: string) {
  const parts = text.trim().split(" ");
  if (parts.length < 2) return { head: "", tail: text };
  return { head: parts.slice(0, -1).join(" "), tail: parts[parts.length - 1] };
}

export function HomePremiumContent({
  hero,
  opening,
  closing,
  services,
  portfolio,
  testimonial,
  uri,
}: HomePremiumContentProps) {
  const heroImage = hero?.image_path ? `${uri}/${hero.image_path}` : null;
  const heroTitle = hero?.title || "GasKodeAja";
  const { head: heroHead, tail: heroTail } = splitLast(heroTitle);

  // Reveal the app-style sticky action bar once past the hero.
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const benefits = [
    {
      icon: <Flash size={22} variant="Bulk" className="text-[#a47148]" />,
      title: "Execution Cepat",
      copy:
        opening?.jawaban?.[0] ||
        "Delivery cepat tanpa mengorbankan kualitas platform.",
    },
    {
      icon: <MonitorMobbile size={22} variant="Bulk" className="text-[#a47148]" />,
      title: "Design Premium",
      copy:
        opening?.jawaban?.[1] ||
        "Tampilan modern dengan pengalaman pengguna yang nyaman.",
    },
    {
      icon: <TrendUp size={22} variant="Bulk" className="text-[#a47148]" />,
      title: "Growth Mindset",
      copy:
        opening?.jawaban?.[2] ||
        "Setiap fitur dirancang untuk mendukung pertumbuhan bisnis.",
    },
    {
      icon: <ShieldTick size={22} variant="Bulk" className="text-[#a47148]" />,
      title: "Support Berkelanjutan",
      copy:
        opening?.jawaban?.[3] ||
        "Dukungan maintenance dan optimasi setelah project live.",
    },
  ];

  // Asymmetric bento layout: uneven spans + vertical offsets instead of a flat grid.
  const benefitLayout = [
    "lg:col-span-7",
    "lg:col-span-5 lg:translate-y-10",
    "lg:col-span-5",
    "lg:col-span-7 lg:-translate-y-6",
  ];

  // Trust ribbon — real client names when available, otherwise disciplines.
  const clients = portfolio.map((p) => p.client_name).filter(Boolean);
  const ribbon = (clients.length >= 4
    ? clients
    : ["Startup", "Enterprise", "UMKM", "Fintech", "E-Commerce", "Agency", "SaaS", "Brand"]
  ).slice(0, 10);

  const featured = testimonial[0];
  const restTestimonials = testimonial.slice(1);

  const ctaLink = hero?.cta_link || "/contact";
  const ctaText = hero?.cta_text || "Hubungi Kami";

  const stats = [
    { value: `${portfolio.length}+`, label: "Project Delivered" },
    { value: `${services.length}+`, label: "Digital Services" },
    { value: `${testimonial.length}+`, label: "Happy Clients" },
  ];

  // Cinematic scroll parallax — background drifts down, copy drifts up as the hero scrolls away.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "14%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-10%"]);

  return (
    <>
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section ref={heroRef} className="grain relative isolate overflow-hidden bg-[#100d0a]">
        {/* Base image */}
        <motion.div className="absolute inset-0 -z-20 overflow-hidden opacity-45" style={{ y: heroImageY }}>
          {heroImage && (
            <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          )}
        </motion.div>
        {/* Cinematic wash */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
        {/* Floating champagne glow */}
        <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
        <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />
        {/* Ghost brand watermark, sitting behind the headline for depth */}
        <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -left-2 top-6 -z-10 text-white/[0.035] sm:top-2`}>
          GK
        </span>

        <div className="mx-auto grid min-h-[calc(100svh-84px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:min-h-[calc(100vh-84px)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-28 lg:pt-24">
          <motion.div initial="hidden" animate="show" variants={revealStagger} style={{ y: heroContentY }}>
            <motion.p variants={revealItem} className="mb-7 sm:mb-9">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.28em]">
                <Crown1 size={14} className="text-[#f3c9a4]" variant="Bulk" />
                AI-Ready Digital Studio
              </span>
            </motion.p>

            <motion.div variants={revealStagger} className={`${heroH1} text-white`}>
              {heroHead && (
                <span className="block overflow-hidden">
                  <motion.span variants={revealLine} className="block">
                    {heroHead}
                  </motion.span>
                </span>
              )}
              <span className="block overflow-hidden">
                <motion.span variants={revealLine} className="block text-gold-gradient italic">
                  {heroTail}
                </motion.span>
              </span>
            </motion.div>

            <motion.p
              variants={revealItem}
              className="mt-6 max-w-xl text-pretty text-base leading-7 text-white/70 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl"
            >
              {hero?.subtitle ||
                "Kami membangun website dan aplikasi modern yang siap meningkatkan kepercayaan dan pertumbuhan bisnis Anda."}
            </motion.p>

            <motion.div
              variants={revealItem}
              className="mt-8 flex flex-col items-stretch gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Button href={ctaLink}>
                {ctaText}
                <ArrowRight2 size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#services" variant="ghost">Jelajahi Layanan</Button>
            </motion.div>

            {/* Mobile showcase visual */}
            <motion.div variants={revealItem} className="mt-10 lg:hidden">
              <CornerFrame tone="dark" className="card-sheen overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-2.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {heroImage ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.35rem]">
                    <Image src={heroImage} alt={heroTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/10] w-full rounded-[1.35rem] bg-white/10" />
                )}
                <div className="mt-2.5 flex items-center justify-between gap-4 rounded-[1.15rem] bg-black/40 px-4 py-3.5 text-white">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#f3c9a4]">
                      Performance Focus
                    </p>
                    <p className="mt-1 font-display text-lg font-medium">Fast · Scalable</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-b from-white to-[#f3eadd] px-4 py-2 text-center text-[#100d0a]">
                    <p className="font-display text-2xl font-semibold leading-none">{portfolio.length}+</p>
                    <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#8b5e3c]">
                      Projects
                    </p>
                  </div>
                </div>
              </CornerFrame>
            </motion.div>

            {/* Micro trust line */}
            <motion.div
              variants={revealItem}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/55 sm:mt-12 sm:gap-x-8 sm:gap-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex text-[#f3c9a4]">
                  {[...Array(5)].map((_, i) => (
                    <Star1 key={i} size={15} variant="Bold" />
                  ))}
                </span>
                <span className="text-sm font-medium">Rated by our clients</span>
              </div>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="text-sm font-medium">
                {portfolio.length}+ projects · {services.length}+ services
              </span>
            </motion.div>
          </motion.div>

          {/* Desktop showcase card — cursor-aware tilt + gallery corner frame */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.8rem] bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
            <TiltCard>
              <CornerFrame tone="dark" className="card-sheen rounded-[2.4rem] border border-white/15 bg-white/[0.06] p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {heroImage ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.9rem]">
                    <Image src={heroImage} alt={heroTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full rounded-[1.9rem] bg-white/10" />
                )}
                <div className="mt-3 flex items-center justify-between gap-4 rounded-[1.5rem] bg-black/35 px-6 py-5 text-white">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4]">
                      Performance Focus
                    </p>
                    <p className="mt-1.5 font-display text-2xl font-medium">Fast · Scalable</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-b from-white to-[#f3eadd] px-5 py-3 text-center text-[#100d0a]">
                    <p className="font-display text-3xl font-semibold leading-none">{portfolio.length}+</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">
                      Projects
                    </p>
                  </div>
                </div>
              </CornerFrame>
            </TiltCard>
          </motion.div>
        </div>

        {/* ── Trust marquee ── */}
        <div className="relative border-t border-white/10 bg-black/25 py-5 sm:py-6">
          <div className="marquee-mask overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
              {[...ribbon, ...ribbon].map((name, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 whitespace-nowrap font-display text-base font-light italic tracking-wide text-white/40 sm:gap-14 sm:text-lg"
                >
                  {name}
                  <span className="text-[#a47148]/70">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── STAT BAND — overlaps the hero's bottom edge ─────────────────────── */}
      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-5 sm:-mt-16 sm:px-6">
        <Reveal>
          <div className="glass grid grid-cols-3 divide-x divide-[#a47148]/15 overflow-hidden rounded-[1.75rem] border border-white/60 shadow-[0_36px_80px_-30px_rgba(43,28,17,0.4)] sm:rounded-[2rem]">
            {stats.map((item) => (
              <div key={item.label} className="group relative bg-white/95 px-2 py-7 text-center sm:px-10 sm:py-9">
                <span className="absolute inset-x-6 top-0 h-px origin-center scale-x-0 bg-[#a47148] transition-transform duration-500 ease-out group-hover:scale-x-100 sm:inset-x-10" />
                <p className="font-display text-3xl font-medium tracking-tight text-[#100d0a] transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-5xl md:text-6xl">
                  {item.value}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-slate-500 sm:mt-2 sm:text-xs sm:tracking-[0.22em]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ─────────────────────── WHY CHOOSE US — asymmetric bento ─────────────────────── */}
      <Section tone="cream" prevTone="ink" rhythm="tight" className="px-5 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 pt-6 sm:pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:h-fit">
            <SectionKicker>Why Choose Us</SectionKicker>
            <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-[#100d0a]`}>
              {opening?.pernyataan || "Mengapa Memilih Kami"}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-[15px] leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
              Kombinasi craftsmanship, kecepatan, dan estetika kelas dunia — dirancang untuk
              menempatkan brand Anda selangkah di depan kompetitor.
            </p>
            <a
              href="/about"
              className="tap group mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#a47148] sm:mt-8"
            >
              Kenali Kami
              <ArrowRight2 size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={revealStagger}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                className={`${idx === 0 ? "gradient-frame" : "card-sheen"} corner-frame tap group relative overflow-hidden rounded-[1.5rem] border border-[#a47148]/15 bg-white p-6 hover:-translate-y-1.5 hover:border-[#a47148]/35 hover:shadow-[0_28px_55px_-24px_rgba(43,28,17,0.35)] sm:rounded-[1.6rem] sm:p-8 ${benefitLayout[idx % benefitLayout.length]}`}
              >
                {idx === 0 && (
                  <>
                    <span aria-hidden data-pos="tl" className="corner-frame-mark text-[#a47148]/0 transition-colors duration-500 group-hover:text-[#a47148]/60" />
                    <span aria-hidden data-pos="br" className="corner-frame-mark text-[#a47148]/0 transition-colors duration-500 group-hover:text-[#a47148]/60" />
                  </>
                )}
                <span className="absolute right-5 top-5 font-display text-4xl font-light text-[#a47148]/15 transition-colors duration-300 group-hover:text-[#a47148]/30 sm:right-6 sm:top-6">
                  0{idx + 1}
                </span>
                <div className="mb-5 inline-flex rounded-2xl bg-[#fff5eb] p-3.5 ring-1 ring-[#a47148]/10 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-medium text-[#100d0a] sm:text-xl">{item.title}</h3>
                <p className="mt-2.5 text-[14px] leading-7 text-slate-600 sm:mt-3 sm:text-sm">{item.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────── SERVICES — off-grid bento ─────────────────────── */}
      <Section id="services" tone="ink" prevTone="cream" className="grain relative isolate overflow-hidden px-5 text-white sm:px-6">
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <Reveal className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <SectionKicker tone="light">Services</SectionKicker>
              <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-white`}>
                Layanan Digital <span className="text-gold-gradient italic">Profesional</span>
              </h2>
            </div>
            <a
              href="/service"
              className="tap inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-6 py-3 text-sm font-bold hover:border-white/45 hover:bg-white/[0.06]"
            >
              Semua Layanan
              <ArrowRight2 size={16} />
            </a>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealStagger}
            className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => {
              const offsetCls = idx % 3 === 1 ? "lg:translate-y-8" : idx % 3 === 2 ? "lg:-translate-y-4" : "";
              return (
                <motion.a
                  key={service.id}
                  href="/service"
                  variants={revealItem}
                  className={`corner-frame group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:bg-white/[0.06] sm:rounded-[1.75rem] sm:p-9 ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  } ${offsetCls}`}
                >
                  <span aria-hidden data-pos="tl" className="corner-frame-mark text-[#f3c9a4]/0 transition-colors duration-500 group-hover:text-[#f3c9a4]/60" />
                  <span aria-hidden data-pos="br" className="corner-frame-mark text-[#f3c9a4]/0 transition-colors duration-500 group-hover:text-[#f3c9a4]/60" />

                  <div className="mb-6 flex items-center justify-between sm:mb-7">
                    <div className="inline-flex rounded-2xl bg-[#a47148]/15 p-3.5 text-[#f3c9a4] ring-1 ring-[#f3c9a4]/10">
                      <TickCircle size={22} variant="Bulk" />
                    </div>
                    <span className="font-mono text-xs tracking-widest text-white/30">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-white/60 sm:mt-4">{service.description}</p>
                  <span className="relative mt-6 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full px-1 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#f3c9a4] sm:mt-7">
                    <span className="cta-wipe-fill bg-white/10" />
                    <span className="cta-wipe-label relative z-10">
                      <span>Selengkapnya</span>
                    </span>
                    <span className="cta-wipe-arrow relative z-10">
                      <ArrowRight2 size={14} />
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </Reveal>
      </Section>

      {/* ─────────────────────── SELECTED WORKS — full-bleed gallery ─────────────────────── */}
      <Section tone="cream" prevTone="ink" className="px-5 sm:px-6">
        <Reveal className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:mb-16">
            <div className="flex justify-center">
              <SectionKicker center>Selected Works</SectionKicker>
            </div>
            <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-[#100d0a]`}>
              Karya Yang Sudah Kami <span className="text-gold-gradient italic">Deliver</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealStagger}
            className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {portfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={revealItem}
                className={`relative ${idx % 3 === 1 ? "md:translate-y-8" : ""}`}
              >
                <div className="tap group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[#a47148]/15 bg-white shadow-[0_20px_46px_-26px_rgba(58,36,20,0.4)] duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(58,36,20,0.55)] sm:rounded-[2rem]">
                  {/* Full-card link for click/keyboard access; OverlapCTA below is a separate, non-nested link */}
                  <a href="/portfolio" aria-label={item.title} className="absolute inset-0 z-10" />
                  <CornerFrame className="relative bg-[#f4ece2]">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={`${uri}/${item.image_thumbnail}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 font-mono text-[10px] tracking-widest text-white backdrop-blur sm:left-5 sm:top-5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <OverlapCTA href="/portfolio" label={`Lihat ${item.title}`} className="z-20" />
                  </CornerFrame>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a47148]">
                      <MonitorMobbile size={14} variant="Bulk" />
                      {item.client_name}
                    </span>
                    <h3 className="mt-2.5 font-display text-xl font-medium tracking-tight text-[#100d0a] sm:text-2xl">
                      {item.title}
                    </h3>
                    {item.solutions?.[0] && (
                      <p className="mt-3 flex items-start gap-1.5 text-sm leading-7 text-slate-600">
                        <PictureFrame size={15} variant="Bulk" className="mt-1 shrink-0 text-[#a47148]/60" />
                        {item.solutions[0]}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </Section>

      {/* ─────────────────────── TESTIMONIALS — oversized editorial quote ─────────────────────── */}
      <Section tone="stone" prevTone="cream" className="px-5 sm:px-6">
        <Reveal className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <SectionKicker>Testimonials</SectionKicker>
            <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-[#100d0a]`}>
              Dipercaya, <span className="text-gold-gradient italic">Direkomendasikan</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Featured quote — oversized editorial type instead of a boxed card */}
            {featured && (
              <div className="grain relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#100d0a] p-7 text-white sm:rounded-[2rem] sm:p-9 md:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-[#a47148]/25 blur-[110px]" />
                <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -left-3 -top-10 -z-0 text-white/[0.05]`}>
                  &ldquo;
                </span>
                <div className="relative">
                  <QuoteDown size={38} className="text-[#a47148]" variant="Bulk" />
                  <div className="mt-5 flex gap-1 text-[#f3c9a4] sm:mt-6">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star1 key={i} size={18} variant="Bold" />
                    ))}
                  </div>
                  <p className="mt-5 text-balance font-display text-2xl font-light leading-[1.4] text-white/90 sm:mt-6 sm:text-3xl md:text-4xl">
                    &ldquo;{featured.content}&rdquo;
                  </p>
                </div>
                <div className="relative mt-8 border-t border-white/10 pt-6 sm:mt-10">
                  <h4 className="font-display text-lg font-medium sm:text-xl">{featured.name}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">
                    {featured.position}
                  </p>
                </div>
              </div>
            )}

            {/* Supporting quotes — idle float, asymmetric offset, overlapping the featured quote's edge */}
            <div className="grid gap-6 sm:gap-7 lg:-ml-6 lg:mt-10">
              {(restTestimonials.length ? restTestimonials : testimonial).slice(0, 2).map((testi, i) => (
                <div
                  key={testi.id}
                  className={`transition-transform duration-500 hover:rotate-0 ${i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"}`}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  >
                    <div className="tap flex h-full flex-col justify-between rounded-[1.5rem] border border-[#a47148]/15 bg-white p-6 shadow-[0_18px_40px_-26px_rgba(58,36,20,0.4)] hover:-translate-y-1 hover:border-[#a47148]/30 sm:rounded-[1.8rem] sm:p-8">
                      <div>
                        <div className="flex gap-1 text-[#a47148]">
                          {[...Array(testi.rating)].map((_, s) => (
                            <Star1 key={s} size={15} variant="Bold" />
                          ))}
                        </div>
                        <p className="mt-4 text-[15px] leading-7 text-slate-600">&ldquo;{testi.content}&rdquo;</p>
                      </div>
                      <div className="mt-6 border-t border-[#a47148]/12 pt-5">
                        <h4 className="font-display text-lg font-medium text-[#100d0a]">{testi.name}</h4>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a47148]">
                          {testi.position}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <Section tone="cream" prevTone="stone" rhythm="cinematic" className="px-5 sm:px-6">
        <Reveal className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-20 md:px-16 md:py-24">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/12 blur-[130px]" />
          <span aria-hidden className="pointer-events-none absolute -right-8 bottom-0 select-none text-[10rem] leading-none text-white/[0.04] sm:text-[14rem]">
            ✦
          </span>
          <div className="relative max-w-2xl">
            <SectionKicker tone="light">Let&apos;s Build Together</SectionKicker>
            <h2 className={`mt-5 sm:mt-6 ${sectionH2} text-white`}>
              {closing?.pernyataan || "Siap Memulai Proyek Anda?"}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/65 sm:mt-6 sm:text-lg sm:leading-8">
              {closing?.jawaban?.[0] ||
                "Hubungi tim kami untuk konsultasi gratis dan wujudkan platform digital berkelas untuk bisnis Anda."}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button href={ctaLink} tone="cream">
                {hero?.cta_text ?? "Hubungi Kami Sekarang"}
                <MessageQuestion size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              </Button>
              <Button href="/portfolio" variant="ghost">
                Lihat Portfolio
                <ArrowRight2 size={16} />
              </Button>
            </div>
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
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">
              Konsultasi Gratis
            </p>
            <p className="truncate font-display text-sm text-white/85">Mulai proyek Anda hari ini</p>
          </div>
          <a
            href={ctaLink}
            className="btn-shine tap relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-[#c08a5c] to-[#8b5e3c] px-5 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(164,113,72,0.7)]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {ctaText}
              <ArrowRight2 size={16} />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
