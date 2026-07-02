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
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

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
  const benefits = [
    {
      icon: <Flash size={22} variant="Bulk" className="text-[#A47148]" />,
      title: "Execution Cepat",
      copy:
        opening?.jawaban?.[0] ||
        "Delivery cepat tanpa mengorbankan kualitas platform.",
    },
    {
      icon: <MonitorMobbile size={22} variant="Bulk" className="text-[#A47148]" />,
      title: "Design Premium",
      copy:
        opening?.jawaban?.[1] ||
        "Tampilan modern dengan pengalaman pengguna yang nyaman.",
    },
    {
      icon: <TrendUp size={22} variant="Bulk" className="text-[#A47148]" />,
      title: "Growth Mindset",
      copy:
        opening?.jawaban?.[2] ||
        "Setiap fitur dirancang untuk mendukung pertumbuhan bisnis.",
    },
    {
      icon: <ShieldTick size={22} variant="Bulk" className="text-[#A47148]" />,
      title: "Support Berkelanjutan",
      copy:
        opening?.jawaban?.[3] ||
        "Dukungan maintenance dan optimasi setelah project live.",
    },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[#161310]" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-70"
          style={{ backgroundImage: heroImage ? `url('${heroImage}')` : undefined }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(114deg,rgba(10,9,8,0.94)_0%,rgba(10,9,8,0.75)_45%,rgba(10,9,8,0.3)_100%)]" />
        <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-14 px-6 pb-24 pt-24 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={section}>
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur">
              <Crown1 size={16} className="text-[#f3c9a4]" />
              AI Ready Digital Studio
            </p>
            <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.05em] text-white md:text-7xl lg:text-8xl">
              {hero?.title || "GasKodeAja"}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-white/78 md:text-2xl">
              {hero?.subtitle ||
                "Kami membangun website dan aplikasi modern yang siap meningkatkan kepercayaan dan pertumbuhan bisnis Anda."}
            </p>
            <div className="mt-11 flex flex-wrap gap-4">
              <a
                href={hero?.cta_link || "/contact"}
                className="group inline-flex items-center gap-3 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black tracking-wide text-white shadow-[0_18px_45px_rgba(164,113,72,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C]"
              >
                {hero?.cta_text || "Hubungi Kami"}
                <ArrowRight2 size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-black tracking-wide text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
              >
                Jelajahi Layanan
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="rounded-[2.2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
              {heroImage ? (
                <img src={heroImage} alt={hero?.title || "Hero"} className="aspect-[4/3] w-full rounded-[1.8rem] object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full rounded-[1.8rem] bg-slate-700" />
              )}
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-black/35 px-5 py-4 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Performance Focus</p>
                  <p className="mt-1 text-xl font-black">Modern, Fast, and Scalable</p>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 text-center text-slate-900">
                  <p className="text-2xl font-black">{portfolio.length}+</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Projects</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={section} className="-mt-14 px-6">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-[2rem] border border-[#e7d8c7] bg-white/90 p-5 shadow-[0_25px_60px_rgba(17,12,9,0.12)] backdrop-blur md:grid-cols-3">
          {[
            { value: `${portfolio.length}+`, label: "Project Delivered" },
            { value: `${services.length}+`, label: "Digital Services" },
            { value: `${testimonial.length}+`, label: "Happy Clients" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-[#fbf7f1] p-5">
              <p className="text-4xl font-black tracking-tight text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <section className="px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={section} className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#A47148]">Why Choose Us</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.03em] text-slate-900 md:text-6xl">{opening?.pernyataan || "Mengapa Memilih Kami"}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="group rounded-[1.7rem] border border-[#ebdfd2] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b79b] hover:shadow-[0_18px_40px_rgba(43,28,17,0.10)]"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-[#fff5eb] p-3">{item.icon}</div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="services" className="bg-[#161310] px-6 py-24 text-white">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={section} className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Services</p>
              <h2 className="mt-4 text-5xl font-black tracking-[-0.03em] md:text-6xl">Layanan Digital Profesional</h2>
            </div>
            <a href="/service" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20">
              Semua Layanan
              <ArrowRight2 size={16} />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.06, duration: 0.45 }}
                className="group rounded-[1.8rem] border border-white/15 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#f3c9a4]/50 hover:bg-white/[0.08]"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-[#A47148]/20 p-3 text-[#f3c9a4]">
                  <TickCircle size={22} variant="Bulk" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={section} className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#A47148]">Selected Works</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.03em] text-slate-900 md:text-6xl">Project Yang Sudah Kami Deliver</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.06, duration: 0.45 }}
                className="group overflow-hidden rounded-[1.9rem] border border-[#ebdfd2] bg-white shadow-[0_12px_30px_rgba(58,36,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(58,36,20,0.14)]"
              >
                <img src={`${uri}/${item.image_thumbnail}`} className="w-full bg-[#f7efe4] object-contain transition duration-500" alt={item.title} />
                <div className="p-6 space-y-3">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#A47148]">
                      <MonitorMobbile size={14} variant="Bulk" />
                      {item.client_name}
                    </span>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{item.title}</h3>
                  </div>
                  <div className="rounded-2xl bg-[#fbf7f1] p-4">
                    <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      <PictureFrame size={14} variant="Bulk" />
                      Highlight
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.solutions?.[0]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-[#f4ece2] px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={section} className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#A47148]">Testimonials</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.03em] text-slate-900 md:text-6xl">Apa Kata Klien Kami</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonial.map((testi, idx) => (
              <motion.div
                key={testi.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="flex h-full flex-col justify-between rounded-[1.8rem] border border-[#e7d8c7] bg-white p-7 shadow-[0_12px_30px_rgba(58,36,20,0.06)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <QuoteDown size={24} className="text-[#A47148]" variant="Bulk" />
                  <div className="flex gap-1 text-[#A47148]">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star1 key={i} size={16} variant="Bold" />
                    ))}
                  </div>
                  <p className="text-base leading-8 text-slate-600">{testi.content}</p>
                </div>
                <div className="mt-8 border-t border-slate-100 pt-5">
                  <h4 className="text-lg font-black text-slate-900">{testi.name}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#A47148]">{testi.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={section} className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2.4rem] bg-[#161310] px-8 py-16 text-white shadow-[0_30px_70px_rgba(18,13,9,0.28)] md:px-14">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Let&apos;s Build Together</p>
          <h2 className="mt-4 text-5xl font-black tracking-[-0.03em] md:text-6xl">{closing?.pernyataan || "Siap Memulai Proyek Anda?"}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{closing?.jawaban?.[0] || "Hubungi tim kami untuk konsultasi gratis."}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={hero?.cta_link || "/contact"}
              className="group inline-flex items-center gap-3 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(164,113,72,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              {hero?.cta_text ?? "Hubungi Kami Sekarang"}
              <MessageQuestion size={18} className="transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
}

