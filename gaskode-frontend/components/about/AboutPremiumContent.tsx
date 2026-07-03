"use client";

import { motion } from "framer-motion";
import {
  Crown1,
  Flash,
  People,
  QuoteDown,
  ShieldTick,
  Star1,
} from "iconsax-react";
import { About } from "@/core/domain/entities/About";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { revealItem, revealSection, revealStagger } from "@/lib/design-tokens";

type AboutPremiumContentProps = {
  data: About;
  uri: string;
};

export function AboutPremiumContent({ data, uri }: AboutPremiumContentProps) {
  const visi = data.visiMisi?.find((i) => i.tipe === "visi");
  const misi = data.visiMisi?.find((i) => i.tipe === "misi");
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

        <motion.div
          initial="hidden"
          animate="show"
          variants={revealStagger}
          className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32"
        >
          <motion.p variants={revealItem} className="mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:text-[11px] sm:tracking-[0.28em]">
              <Crown1 size={14} className="text-[#f3c9a4]" variant="Bulk" />
              About GasKodeAja
            </span>
          </motion.p>
          <motion.h1
            variants={revealItem}
            className="max-w-4xl text-balance font-display text-[2.7rem] font-light leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p variants={revealItem} className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.hero.subtitle}
          </motion.p>
          <motion.div variants={revealItem} className="mt-9">
            <Button href={data.hero.ctaLink} full={false}>{data.hero.ctaText}</Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── OUR STORY ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={revealSection}>
            <SectionHeading kicker="Our Story">{data.opening.pernyataan}</SectionHeading>
            <div className="mt-6 space-y-5 text-[15px] leading-7 text-slate-600 sm:mt-8 sm:text-base sm:leading-8">
              {data.opening.jawaban.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="card-sheen overflow-hidden rounded-[1.75rem] border border-[#a47148]/15 bg-white p-3 shadow-[0_30px_70px_-30px_rgba(58,36,20,0.35)] sm:rounded-[2rem]"
          >
            <img src={heroImage} alt={data.hero.title} className="aspect-[4/3] w-full rounded-[1.35rem] object-cover sm:rounded-[1.6rem]" />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── VISI & MISI ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a] px-5 py-16 text-white sm:px-6 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={revealSection} className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading kicker="Visi & Misi" tone="light" center>
              Fondasi Kerja Kami
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-white/70 sm:text-base sm:leading-8">
              &ldquo;{visi?.konten?.[0] || "Membangun solusi digital yang berdampak nyata untuk bisnis."}&rdquo;
            </p>
          </div>
          <motion.div variants={revealStagger} className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {(misi?.konten || []).map((item, idx) => (
              <motion.div key={item} variants={revealItem}>
                <Card tone="dark" index={idx}>
                  <div className="mb-5 inline-flex rounded-2xl bg-[#a47148]/15 p-3.5 text-[#f3c9a4] ring-1 ring-[#f3c9a4]/10">
                    <ShieldTick size={22} variant="Bulk" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-white">{item}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-white/60">
                    Standar kerja kami untuk menjaga kualitas pada setiap tahap project.
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── VALUES ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={revealSection} className="mx-auto max-w-7xl">
          <SectionHeading kicker="What We Value" center>
            {data.value.pernyataan}
          </SectionHeading>
          <motion.div variants={revealStagger} className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-14 sm:gap-4">
            {data.value.jawaban.map((val) => (
              <motion.span
                key={val}
                variants={revealItem}
                className="tap rounded-full border border-[#a47148]/20 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-[0_10px_26px_-18px_rgba(43,28,17,0.4)] transition-all hover:-translate-y-1 hover:border-[#a47148]/40"
              >
                {val}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── STATS ─────────────────────── */}
      <section className="bg-[#f4ece2] px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={revealStagger}
          className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3"
        >
          <motion.div variants={revealItem} className="card-sheen rounded-[1.75rem] bg-white p-8 text-center sm:rounded-[2rem]">
            <p className="font-display text-5xl font-medium text-[#100d0a]">{data.portfolio.total}+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Project Selesai</p>
          </motion.div>
          <motion.div variants={revealItem} className="card-sheen rounded-[1.75rem] bg-white p-8 text-center sm:rounded-[2rem]">
            <p className="flex items-center justify-center gap-1.5 font-display text-5xl font-medium text-[#100d0a]">
              {data.portfolio.rating}
              <Star1 size={26} variant="Bold" className="text-[#a47148]" />
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Rating Klien</p>
          </motion.div>
          <motion.div variants={revealItem} className="grain relative isolate overflow-hidden rounded-[1.75rem] bg-[#100d0a] p-8 text-white sm:rounded-[2rem]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Signature</p>
            <p className="mt-4 text-lg font-medium leading-8 text-white/75">
              Solusi digital premium untuk UMKM sampai perusahaan skala enterprise.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── PROCESS ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={revealSection} className="mx-auto max-w-6xl">
          <SectionHeading kicker="How We Work" center>
            Cara Kerja Kami
          </SectionHeading>
          <motion.div variants={revealStagger} className="mt-12 space-y-4 sm:mt-16">
            {data.caraKerja.map((step, idx) => (
              <motion.div
                key={step}
                variants={revealItem}
                className="tap flex items-center gap-5 rounded-[1.5rem] border border-[#a47148]/15 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#a47148]/35 hover:shadow-[0_20px_45px_-28px_rgba(43,28,17,0.4)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#a47148] font-display text-lg font-medium text-white">
                  {idx + 1}
                </div>
                <p className="text-lg font-medium text-slate-700">{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── TEAM ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a] px-5 py-16 text-white sm:px-6 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -bottom-20 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#a47148]/20 blur-[140px]" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={revealSection} className="mx-auto max-w-7xl">
          <SectionHeading kicker="Our People" tone="light" center>
            Tim Spesialis Kami
          </SectionHeading>
          <motion.div variants={revealStagger} className="mt-12 grid grid-cols-2 gap-5 sm:mt-16 md:grid-cols-3 lg:grid-cols-5">
            {data.team.map((member) => (
              <motion.div key={member.slug} variants={revealItem}>
                <Card tone="dark" className="text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-2xl bg-[#a47148]/15 p-3.5 text-[#f3c9a4] ring-1 ring-[#f3c9a4]/10">
                    <People size={22} variant="Bulk" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.1em] text-white/85">{member.name}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── TESTIMONIALS ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={revealSection} className="mx-auto max-w-7xl">
          <SectionHeading kicker="Client Voices" center>
            Apa Kata Klien Kami
          </SectionHeading>
          <motion.div variants={revealStagger} className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
            {data.testimonials.map((testi) => (
              <motion.div key={testi.name} variants={revealItem}>
                <Card>
                  <QuoteDown size={22} variant="Bulk" className="mb-4 text-[#a47148]" />
                  <div className="mb-4 flex gap-1 text-[#a47148]">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star1 key={`${testi.name}-${i}`} size={16} variant="Bold" />
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{testi.content}</p>
                  <p className="mt-5 font-display text-lg font-medium text-[#100d0a]">{testi.name}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a47148]">{testi.position}</p>
                </Card>
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Ready To Start</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            {data.closing.pernyataan}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.closing.jawaban[0]}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={data.hero.ctaLink} full={false}>
              Konsultasi Sekarang
              <Flash size={16} />
            </Button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
