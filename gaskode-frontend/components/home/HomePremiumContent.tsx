"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const section: any = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const rise: any = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Split a headline so the final word can receive the champagne accent. */
function splitLast(text: string) {
  const parts = text.trim().split(" ");
  if (parts.length < 2) return { head: "", tail: text };
  return { head: parts.slice(0, -1).join(" "), tail: parts[parts.length - 1] };
}

function Kicker({
  children,
  tone = "dark",
  center = false,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.3em] sm:gap-3 sm:text-[11px] sm:tracking-[0.34em] ${
        tone === "light" ? "text-[#f3c9a4]" : "text-[#a47148]"
      }`}
    >
      {!center && (
        <span className={`h-px w-6 sm:w-8 ${tone === "light" ? "bg-[#f3c9a4]/60" : "bg-[#a47148]/50"}`} />
      )}
      {children}
      {center && (
        <span className={`h-px w-6 sm:w-8 ${tone === "light" ? "bg-[#f3c9a4]/60" : "bg-[#a47148]/50"}`} />
      )}
    </span>
  );
}

/** Premium primary CTA — full-width & tappable on mobile, auto on desktop. */
function CtaPrimary({
  href,
  children,
  variant = "bronze",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "bronze" | "cream";
}) {
  const skin =
    variant === "cream"
      ? "from-[#f7e6d0] to-[#e6c39d] text-[#100d0a] shadow-[0_20px_50px_-16px_rgba(243,201,164,0.6)]"
      : "from-[#c08a5c] via-[#a97650] to-[#8b5e3c] text-white shadow-[0_22px_50px_-14px_rgba(164,113,72,0.65)]";
  return (
    <a
      href={href}
      className={`btn-shine tap group relative inline-flex min-h-[3.35rem] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-b ${skin} px-8 text-[15px] font-bold tracking-wide sm:w-auto sm:min-h-[3.5rem] hover:-translate-y-1`}
    >
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </a>
  );
}

/** Ghost / secondary CTA. */
function CtaGhost({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const skin =
    tone === "dark"
      ? "border-[#a47148]/30 text-[#3a2718] hover:border-[#a47148]/60 hover:bg-[#a47148]/[0.06]"
      : "border-white/25 text-white/90 hover:border-white/50 hover:bg-white/[0.07]";
  return (
    <a
      href={href}
      className={`tap inline-flex min-h-[3.35rem] w-full items-center justify-center gap-3 rounded-full border px-8 text-[15px] font-bold tracking-wide backdrop-blur sm:w-auto sm:min-h-[3.5rem] ${skin}`}
    >
      {children}
    </a>
  );
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

  return (
    <>
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a]">
        {/* Base image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
          style={{ backgroundImage: heroImage ? `url('${heroImage}')` : undefined }}
        />
        {/* Cinematic wash */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
        {/* Floating champagne glow */}
        <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
        <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />

        <div className="mx-auto grid min-h-[calc(100svh-84px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:min-h-[calc(100vh-84px)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-28 lg:pt-24">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={rise} className="mb-7 sm:mb-9">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.28em]">
                <Crown1 size={14} className="text-[#f3c9a4]" variant="Bulk" />
                AI-Ready Digital Studio
              </span>
            </motion.p>

            <motion.h1
              variants={rise}
              className="text-balance font-display text-[2.7rem] font-light leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-[5.6rem] lg:leading-[0.98]"
            >
              {heroHead && <span>{heroHead} </span>}
              <span className="text-gold-gradient italic">{heroTail}</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-xl text-pretty text-base leading-7 text-white/70 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl"
            >
              {hero?.subtitle ||
                "Kami membangun website dan aplikasi modern yang siap meningkatkan kepercayaan dan pertumbuhan bisnis Anda."}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-8 flex flex-col items-stretch gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <CtaPrimary href={ctaLink}>
                {ctaText}
                <ArrowRight2 size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </CtaPrimary>
              <CtaGhost href="#services">Jelajahi Layanan</CtaGhost>
            </motion.div>

            {/* Mobile showcase visual */}
            <motion.div variants={rise} className="mt-10 lg:hidden">
              <div className="card-sheen overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-2.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={heroTitle}
                    className="aspect-[16/10] w-full rounded-[1.35rem] object-cover"
                  />
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
              </div>
            </motion.div>

            {/* Micro trust line */}
            <motion.div
              variants={rise}
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

          {/* Desktop showcase card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.8rem] bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
            <div className="card-sheen rounded-[2.4rem] border border-white/15 bg-white/[0.06] p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={heroTitle}
                  className="aspect-[4/3] w-full rounded-[1.9rem] object-cover"
                />
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
            </div>
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

      {/* ─────────────────────── STAT BAND ─────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={section}
        className="border-b border-[#a47148]/15 bg-[#fbf7f1] px-5 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-[#a47148]/15 py-3 sm:py-4">
          {[
            { value: `${portfolio.length}+`, label: "Project Delivered" },
            { value: `${services.length}+`, label: "Digital Services" },
            { value: `${testimonial.length}+`, label: "Happy Clients" },
          ].map((item) => (
            <div key={item.label} className="px-2 py-6 text-center sm:px-10 sm:py-8">
              <p className="font-display text-3xl font-medium tracking-tight text-[#100d0a] sm:text-5xl md:text-6xl">
                {item.value}
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-slate-500 sm:mt-2 sm:text-xs sm:tracking-[0.22em]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─────────────────────── WHY CHOOSE US ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={section}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <Kicker>Why Choose Us</Kicker>
            <h2 className="mt-5 text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] text-[#100d0a] sm:mt-6 sm:text-5xl md:text-6xl">
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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={rise}
                className="card-sheen tap group relative overflow-hidden rounded-[1.5rem] border border-[#a47148]/15 bg-white p-6 hover:-translate-y-1.5 hover:border-[#a47148]/35 hover:shadow-[0_28px_55px_-24px_rgba(43,28,17,0.35)] sm:rounded-[1.6rem] sm:p-8"
              >
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
      </section>

      {/* ─────────────────────── SERVICES ─────────────────────── */}
      <section
        id="services"
        className="grain relative isolate overflow-hidden bg-[#100d0a] px-5 py-16 text-white sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-10 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <Kicker tone="light">Services</Kicker>
              <h2 className="mt-5 text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] sm:mt-6 sm:text-5xl md:text-6xl">
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
            variants={stagger}
            className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:rounded-[2rem] md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => (
              <motion.a
                key={service.id}
                href="/service"
                variants={rise}
                className="group relative flex flex-col bg-[#100d0a] p-7 transition-colors duration-300 hover:bg-[#181410] sm:p-9"
              >
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
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f3c9a4] transition-all duration-300 sm:mt-7 sm:opacity-0 sm:group-hover:opacity-100">
                  Selengkapnya
                  <ArrowRight2 size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── SELECTED WORKS ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-10 text-center sm:mb-16">
            <div className="flex justify-center">
              <Kicker center>Selected Works</Kicker>
            </div>
            <h2 className="mt-5 text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] text-[#100d0a] sm:mt-6 sm:text-5xl md:text-6xl">
              Karya Yang Sudah Kami <span className="text-gold-gradient italic">Deliver</span>
            </h2>
          </div>

          <motion.div variants={stagger} className="grid gap-5 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.map((item, idx) => (
              <motion.a
                key={item.id}
                href="/portfolio"
                variants={rise}
                className="tap group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-[#a47148]/15 bg-white shadow-[0_18px_40px_-24px_rgba(58,36,20,0.35)] duration-500 hover:-translate-y-2 hover:shadow-[0_36px_70px_-28px_rgba(58,36,20,0.5)] sm:rounded-[1.8rem]"
              >
                <div className="relative overflow-hidden bg-[#f4ece2]">
                  <img
                    src={`${uri}/${item.image_thumbnail}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 font-mono text-[10px] tracking-widest text-white backdrop-blur sm:left-5 sm:top-5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a47148]">
                    <MonitorMobbile size={14} variant="Bulk" />
                    {item.client_name}
                  </span>
                  <h3 className="mt-2.5 font-display text-xl font-medium tracking-tight text-[#100d0a] sm:text-2xl">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex-1 rounded-2xl bg-[#fbf7f1] p-4 sm:mt-5 sm:p-5">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <PictureFrame size={14} variant="Bulk" />
                      Highlight
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 sm:mt-2.5">{item.solutions?.[0]}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── TESTIMONIALS ─────────────────────── */}
      <section className="bg-[#f4ece2] px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-10 max-w-3xl sm:mb-14">
            <Kicker>Testimonials</Kicker>
            <h2 className="mt-5 text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] text-[#100d0a] sm:mt-6 sm:text-5xl md:text-6xl">
              Dipercaya, <span className="text-gold-gradient italic">Direkomendasikan</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:gap-7 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Featured quote */}
            {featured && (
              <div className="grain relative isolate flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#100d0a] p-7 text-white sm:rounded-[2rem] sm:p-9 md:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-[#a47148]/25 blur-[110px]" />
                <div>
                  <QuoteDown size={38} className="text-[#a47148]" variant="Bulk" />
                  <div className="mt-5 flex gap-1 text-[#f3c9a4] sm:mt-6">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star1 key={i} size={18} variant="Bold" />
                    ))}
                  </div>
                  <p className="mt-5 text-balance font-display text-xl font-light leading-[1.5] text-white/90 sm:mt-6 sm:text-2xl md:text-3xl">
                    “{featured.content}”
                  </p>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10">
                  <h4 className="font-display text-lg font-medium sm:text-xl">{featured.name}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">
                    {featured.position}
                  </p>
                </div>
              </div>
            )}

            {/* Supporting quotes */}
            <div className="grid gap-5 sm:gap-7">
              {(restTestimonials.length ? restTestimonials : testimonial).slice(0, 2).map((testi) => (
                <div
                  key={testi.id}
                  className="tap flex h-full flex-col justify-between rounded-[1.5rem] border border-[#a47148]/15 bg-white p-6 shadow-[0_14px_34px_-24px_rgba(58,36,20,0.4)] hover:-translate-y-1 hover:border-[#a47148]/30 sm:rounded-[1.8rem] sm:p-8"
                >
                  <div>
                    <div className="flex gap-1 text-[#a47148]">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star1 key={i} size={15} variant="Bold" />
                      ))}
                    </div>
                    <p className="mt-4 text-[15px] leading-7 text-slate-600">“{testi.content}”</p>
                  </div>
                  <div className="mt-6 border-t border-[#a47148]/12 pt-5">
                    <h4 className="font-display text-lg font-medium text-[#100d0a]">{testi.name}</h4>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a47148]">
                      {testi.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={section}
        className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-20 md:px-16 md:py-24">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/12 blur-[130px]" />
          <div className="max-w-2xl">
            <Kicker tone="light">Let&apos;s Build Together</Kicker>
            <h2 className="mt-5 text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] sm:mt-6 sm:text-5xl md:text-6xl">
              {closing?.pernyataan || "Siap Memulai Proyek Anda?"}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/65 sm:mt-6 sm:text-lg sm:leading-8">
              {closing?.jawaban?.[0] ||
                "Hubungi tim kami untuk konsultasi gratis dan wujudkan platform digital berkelas untuk bisnis Anda."}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <CtaPrimary href={ctaLink} variant="cream">
                {hero?.cta_text ?? "Hubungi Kami Sekarang"}
                <MessageQuestion size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              </CtaPrimary>
              <CtaGhost href="/portfolio">
                Lihat Portfolio
                <ArrowRight2 size={16} />
              </CtaGhost>
            </div>
          </div>
        </div>
      </motion.section>

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
