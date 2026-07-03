"use client";

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

function Kicker({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em] ${
        tone === "light" ? "text-[#f3c9a4]" : "text-[#a47148]"
      }`}
    >
      <span className={`h-px w-8 ${tone === "light" ? "bg-[#f3c9a4]/60" : "bg-[#a47148]/50"}`} />
      {children}
    </span>
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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.97)_0%,rgba(12,10,8,0.82)_46%,rgba(12,10,8,0.42)_100%)]" />
        {/* Floating champagne glow */}
        <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
        <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />

        <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-14 px-6 pb-28 pt-24 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={rise} className="mb-9">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#f3c9a4] backdrop-blur">
                <Crown1 size={15} className="text-[#f3c9a4]" variant="Bulk" />
                AI-Ready Digital Studio
              </span>
            </motion.p>

            <motion.h1
              variants={rise}
              className="font-display text-[3.4rem] font-light leading-[0.98] tracking-[-0.02em] text-white sm:text-7xl lg:text-[5.6rem]"
            >
              {heroHead && <span>{heroHead} </span>}
              <span className="text-gold-gradient italic">{heroTail}</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-8 max-w-xl text-lg leading-8 text-white/70 md:text-xl"
            >
              {hero?.subtitle ||
                "Kami membangun website dan aplikasi modern yang siap meningkatkan kepercayaan dan pertumbuhan bisnis Anda."}
            </motion.p>

            <motion.div variants={rise} className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href={hero?.cta_link || "/contact"}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#b98255] to-[#8b5e3c] px-8 py-4 text-sm font-bold tracking-wide text-white shadow-[0_20px_50px_-12px_rgba(164,113,72,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-12px_rgba(164,113,72,0.7)]"
              >
                {hero?.cta_text || "Hubungi Kami"}
                <ArrowRight2 size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-bold tracking-wide text-white/90 backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06]"
              >
                Jelajahi Layanan
              </a>
            </motion.div>

            {/* Micro trust line */}
            <motion.div
              variants={rise}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/55"
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

          {/* Showcase card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.8rem] bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
            <div className="rounded-[2.4rem] border border-white/15 bg-white/[0.06] p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
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
        <div className="relative border-t border-white/10 bg-black/25 py-6">
          <div className="marquee-mask overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-14 pr-14">
              {[...ribbon, ...ribbon].map((name, i) => (
                <span
                  key={i}
                  className="flex items-center gap-14 whitespace-nowrap font-display text-lg font-light italic tracking-wide text-white/40"
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
        className="border-b border-[#a47148]/15 bg-[#fbf7f1] px-6"
      >
        <div className="mx-auto grid max-w-6xl divide-y divide-[#a47148]/15 py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: `${portfolio.length}+`, label: "Project Delivered" },
            { value: `${services.length}+`, label: "Digital Services" },
            { value: `${testimonial.length}+`, label: "Happy Clients" },
          ].map((item) => (
            <div key={item.label} className="px-4 py-8 text-center sm:px-10">
              <p className="font-display text-5xl font-medium tracking-tight text-[#100d0a] md:text-6xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─────────────────────── WHY CHOOSE US ─────────────────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={section}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <Kicker>Why Choose Us</Kicker>
            <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-[-0.02em] text-[#100d0a] md:text-6xl">
              {opening?.pernyataan || "Mengapa Memilih Kami"}
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-slate-600">
              Kombinasi craftsmanship, kecepatan, dan estetika kelas dunia — dirancang untuk
              menempatkan brand Anda selangkah di depan kompetitor.
            </p>
            <a
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#a47148]"
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
            className="grid gap-5 sm:grid-cols-2"
          >
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={rise}
                className="group relative overflow-hidden rounded-[1.6rem] border border-[#a47148]/15 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#a47148]/35 hover:shadow-[0_28px_55px_-24px_rgba(43,28,17,0.35)]"
              >
                <span className="absolute right-6 top-6 font-display text-4xl font-light text-[#a47148]/15 transition-colors duration-300 group-hover:text-[#a47148]/30">
                  0{idx + 1}
                </span>
                <div className="mb-6 inline-flex rounded-2xl bg-[#fff5eb] p-3.5 ring-1 ring-[#a47148]/10">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-medium text-[#100d0a]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── SERVICES ─────────────────────── */}
      <section id="services" className="grain relative isolate overflow-hidden bg-[#100d0a] px-6 py-28 text-white">
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Kicker tone="light">Services</Kicker>
              <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-[-0.02em] md:text-6xl">
                Layanan Digital <span className="text-gold-gradient italic">Profesional</span>
              </h2>
            </div>
            <a
              href="/service"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:border-white/45 hover:bg-white/[0.06]"
            >
              Semua Layanan
              <ArrowRight2 size={16} />
            </a>
          </div>

          <motion.div
            variants={stagger}
            className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, idx) => (
              <motion.a
                key={service.id}
                href="/service"
                variants={rise}
                className="group relative flex flex-col bg-[#100d0a] p-9 transition-colors duration-300 hover:bg-[#181410]"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="inline-flex rounded-2xl bg-[#a47148]/15 p-3.5 text-[#f3c9a4] ring-1 ring-[#f3c9a4]/10">
                    <TickCircle size={22} variant="Bulk" />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-white/30">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tight">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-white/60">{service.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f3c9a4] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Selengkapnya
                  <ArrowRight2 size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── SELECTED WORKS ─────────────────────── */}
      <section className="px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-16 text-center">
            <div className="flex justify-center">
              <Kicker>Selected Works</Kicker>
            </div>
            <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-[-0.02em] text-[#100d0a] md:text-6xl">
              Karya Yang Sudah Kami <span className="text-gold-gradient italic">Deliver</span>
            </h2>
          </div>

          <motion.div
            variants={stagger}
            className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
          >
            {portfolio.map((item, idx) => (
              <motion.a
                key={item.id}
                href="/portfolio"
                variants={rise}
                className="group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-[#a47148]/15 bg-white shadow-[0_18px_40px_-24px_rgba(58,36,20,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_70px_-28px_rgba(58,36,20,0.5)]"
              >
                <div className="relative overflow-hidden bg-[#f4ece2]">
                  <img
                    src={`${uri}/${item.image_thumbnail}`}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 font-mono text-[10px] tracking-widest text-white backdrop-blur">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a47148]">
                    <MonitorMobbile size={14} variant="Bulk" />
                    {item.client_name}
                  </span>
                  <h3 className="mt-2.5 font-display text-2xl font-medium tracking-tight text-[#100d0a]">
                    {item.title}
                  </h3>
                  <div className="mt-5 flex-1 rounded-2xl bg-[#fbf7f1] p-5">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <PictureFrame size={14} variant="Bulk" />
                      Highlight
                    </p>
                    <p className="mt-2.5 text-sm leading-7 text-slate-600">{item.solutions?.[0]}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── TESTIMONIALS ─────────────────────── */}
      <section className="bg-[#f4ece2] px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-14 max-w-3xl">
            <Kicker>Testimonials</Kicker>
            <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-[-0.02em] text-[#100d0a] md:text-6xl">
              Dipercaya, <span className="text-gold-gradient italic">Direkomendasikan</span>
            </h2>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Featured quote */}
            {featured && (
              <div className="grain relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#100d0a] p-9 text-white md:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-[#a47148]/25 blur-[110px]" />
                <div>
                  <QuoteDown size={40} className="text-[#a47148]" variant="Bulk" />
                  <div className="mt-6 flex gap-1 text-[#f3c9a4]">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star1 key={i} size={18} variant="Bold" />
                    ))}
                  </div>
                  <p className="mt-6 font-display text-2xl font-light leading-[1.5] text-white/90 md:text-3xl">
                    “{featured.content}”
                  </p>
                </div>
                <div className="mt-10 border-t border-white/10 pt-6">
                  <h4 className="font-display text-xl font-medium">{featured.name}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">
                    {featured.position}
                  </p>
                </div>
              </div>
            )}

            {/* Supporting quotes */}
            <div className="grid gap-7">
              {(restTestimonials.length ? restTestimonials : testimonial).slice(0, 2).map((testi) => (
                <div
                  key={testi.id}
                  className="flex h-full flex-col justify-between rounded-[1.8rem] border border-[#a47148]/15 bg-white p-8 shadow-[0_14px_34px_-24px_rgba(58,36,20,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a47148]/30"
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
        className="px-6 py-28"
      >
        <div className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.6rem] bg-[#100d0a] px-8 py-20 text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] md:px-16 md:py-24">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/12 blur-[130px]" />
          <div className="max-w-2xl">
            <Kicker tone="light">Let&apos;s Build Together</Kicker>
            <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-[-0.02em] md:text-6xl">
              {closing?.pernyataan || "Siap Memulai Proyek Anda?"}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              {closing?.jawaban?.[0] ||
                "Hubungi tim kami untuk konsultasi gratis dan wujudkan platform digital berkelas untuk bisnis Anda."}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={hero?.cta_link || "/contact"}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#f3ddc4] to-[#e6c39d] px-8 py-4 text-sm font-bold tracking-wide text-[#100d0a] shadow-[0_20px_50px_-16px_rgba(243,201,164,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                {hero?.cta_text ?? "Hubungi Kami Sekarang"}
                <MessageQuestion size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-bold tracking-wide text-white/90 transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06]"
              >
                Lihat Portfolio
                <ArrowRight2 size={16} />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
