"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight2,
  Briefcase,
  Code,
  Eye,
  LampCharge,
  MedalStar,
  MessageQuestion,
  Mobile,
  Ranking,
  ShieldTick,
  ShoppingCart,
  Star1,
  TickCircle,
  TrendUp,
  Warning2,
} from "iconsax-react";
import { PortfolioPageData, PortfolioItem } from "@/core/domain/entities/PortfolioEntity";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { TiltCard } from "@/components/ui/TiltCard";
import { OverlapCTA } from "@/components/ui/OverlapCTA";
import { ease, ghostNumeral, heroH1, revealItem, revealStagger, sectionH2 } from "@/lib/design-tokens";

type PremiumPortfolioPageProps = {
  data: PortfolioPageData;
  imageBaseUrl: string;
};

const categoryIcons: Record<string, ReactNode> = {
  "Web Development": <Code size={18} />,
  "Mobile Apps": <Mobile size={18} />,
  "E-Commerce": <ShoppingCart size={18} />,
  "Digital Marketing": <Ranking size={18} />,
};

function resolveCategory(item: PortfolioItem) {
  const text = `${item.title} ${item.clientName} ${item.tag ?? ""}`.toLowerCase();
  if (text.includes("mobile") || text.includes("sika") || text.includes("doctor")) return "Mobile Apps";
  if (text.includes("rental") || text.includes("car") || text.includes("atlas")) return "E-Commerce";
  if (text.includes("seo") || text.includes("marketing")) return "Digital Marketing";
  return item.tag || "Web Development";
}

function imageUrl(baseUrl: string, path: string) {
  if (!path) return "/logo-gaskodeaja.png";
  if (path.startsWith("http")) return path;
  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
}

export function PremiumPortfolioPage({ data, imageBaseUrl }: PremiumPortfolioPageProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(data.portfolios.map(resolveCategory)));
    return ["All Projects", ...unique];
  }, [data.portfolios]);

  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") return data.portfolios;
    return data.portfolios.filter((item) => resolveCategory(item) === activeCategory);
  }, [activeCategory, data.portfolios]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-slate-950">
      {/* ─────────────────────── HERO — full-bleed gallery showcase ─────────────────────── */}
      <section className="grain relative isolate min-h-[86vh] overflow-hidden bg-[#100d0a] px-5 pt-32 text-white sm:px-6">
        <div className="absolute inset-0 -z-20 opacity-30">
          <Image src={imageUrl(imageBaseUrl, data.hero.imagePath)} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
        <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
        <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -left-2 top-6 -z-10 text-white/[0.035]`}>
          {String(data.portfolios.length).padStart(2, "0")}
        </span>

        <motion.div
          initial="hidden"
          animate="show"
          variants={revealStagger}
          className="mx-auto grid max-w-7xl items-center gap-14 pb-24 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <motion.div
              variants={revealItem}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:text-[11px] sm:tracking-[0.28em]"
            >
              <Briefcase size={16} />
              Portfolio Showcase
            </motion.div>
            <motion.h1 variants={revealItem} className={`max-w-5xl ${heroH1} text-white`}>
              {data.hero.title}
            </motion.h1>
            <motion.p variants={revealItem} className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              {data.hero.subtitle}
            </motion.p>
            <motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3 sm:gap-4">
              <Button href={data.hero.ctaLink} full={false}>
                {data.hero.ctaText}
                <ArrowRight2 size={18} />
              </Button>
              <Button href="#projects" variant="ghost" full={false}>
                Lihat Project
                <Eye size={18} />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.8rem] bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
            <TiltCard>
              <CornerFrame tone="dark" className="card-sheen rounded-[2.4rem] border border-white/15 bg-white/[0.06] p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.9rem]">
                  <Image
                    src={imageUrl(imageBaseUrl, data.portfolios[0]?.imageThumbnail || data.hero.imagePath)}
                    alt={data.portfolios[0]?.title || data.hero.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 rounded-[1.5rem] bg-black/35 px-6 py-5 text-white">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4]">Featured Work</p>
                    <p className="mt-1.5 font-display text-xl font-medium">{data.portfolios[0]?.title || "GaskodeAja Project"}</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-b from-white to-[#f3eadd] px-5 py-3 text-center text-[#100d0a]">
                    <p className="font-display text-3xl font-semibold leading-none">{data.portfolios.length}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#8b5e3c]">Projects</p>
                  </div>
                </div>
              </CornerFrame>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── STAT BAND — overlaps the hero's bottom edge ─────────────────────── */}
      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-5 sm:-mt-16 sm:px-6">
        <Reveal>
          <div className="glass grid grid-cols-1 divide-y divide-[#a47148]/15 overflow-hidden rounded-[1.75rem] border border-white/60 shadow-[0_36px_80px_-30px_rgba(43,28,17,0.4)] sm:rounded-[2rem] md:grid-cols-3 md:divide-x md:divide-y-0">
            <Stat icon={<MedalStar size={26} />} label="Premium Delivery" value="10+" />
            <Stat icon={<TrendUp size={26} />} label="Digital Growth" value="3x" />
            <Stat icon={<ShieldTick size={26} />} label="Support & Maintenance" value="Ready" />
          </div>
        </Reveal>
      </div>

      {/* ─────────────────────── INTRO ─────────────────────── */}
      <Section tone="cream" prevTone="ink" rhythm="tight" className="px-5 sm:px-6">
        <Reveal className="mx-auto max-w-4xl pt-6 text-center sm:pt-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#a47148]">Curated Case Studies</p>
          <h2 className={`mt-4 ${sectionH2} text-[#100d0a]`}>{data.opening.pernyataan}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
            {data.opening.jawaban[0] || "Kumpulan project digital yang dirancang untuk tampil modern, cepat, dan siap membantu bisnis tumbuh."}
          </p>
        </Reveal>
      </Section>

      {/* ─────────────────────── PROJECTS GRID — full-bleed gallery cards ─────────────────────── */}
      <Section id="projects" tone="cream" prevTone="cream" rhythm="tight" className="px-5 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-20 z-30 mb-10 overflow-x-auto rounded-full border border-[#a47148]/15 bg-background/85 p-2 shadow-lg shadow-[#3a2411]/5 backdrop-blur">
            <div className="flex min-w-max gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                    activeCategory === category
                      ? "bg-ink text-white shadow-xl shadow-ink/20"
                      : "text-slate-600 hover:bg-white hover:text-[#100d0a]"
                  }`}
                >
                  {categoryIcons[category] ?? <Briefcase size={18} />}
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((item, index) => (
              <ProjectCard key={item.id} item={item} index={index} imageBaseUrl={imageBaseUrl} ctaLink={data.hero.ctaLink} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <Section tone="cream" prevTone="cream" rhythm="cinematic" className="px-5 sm:px-6">
        <Reveal className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-20 md:px-14">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/12 blur-[130px]" />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Start Your Build</p>
              <h2 className="mt-4 max-w-3xl text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">
                {data.closing.pernyataan}
              </h2>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg sm:leading-8">{data.closing.jawaban[0]}</p>
            </div>
            <Button href={data.hero.ctaLink} full={false}>
              Chat WhatsApp Sekarang
              <MessageQuestion size={22} />
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="group relative bg-white/95 px-6 py-8 text-center">
      <div className="mx-auto mb-4 inline-flex rounded-2xl bg-[#fff1e4] p-3 text-[#a47148]">{icon}</div>
      <p className="font-display text-3xl font-medium tracking-tight text-[#100d0a]">{value}</p>
      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
    </div>
  );
}

function ProjectCard({
  item,
  index,
  imageBaseUrl,
  ctaLink,
}: {
  item: PortfolioItem;
  index: number;
  imageBaseUrl: string;
  ctaLink: string;
}) {
  const category = resolveCategory(item);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.45, type: "spring", stiffness: 120 }}
      className="group overflow-hidden rounded-[1.9rem] border border-[#a47148]/15 bg-white shadow-xl shadow-[#3a2411]/5"
    >
      <CornerFrame className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
          <Image
            src={imageUrl(imageBaseUrl, item.imageThumbnail)}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/85 via-[#100d0a]/10 to-transparent opacity-90" />
        </div>
        <span aria-hidden className={`${ghostNumeral} pointer-events-none absolute -right-2 -top-6 text-[5rem] leading-none text-white/[0.12] sm:text-[6.5rem]`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute bottom-5 left-5 right-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#a47148] px-3 py-1.5 text-xs font-bold text-white">
            {categoryIcons[category] ?? <Briefcase size={16} />}
            {category}
          </p>
          <h3 className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">{item.title}</h3>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-white/60">{item.clientName}</p>
        </div>
        <OverlapCTA href={ctaLink} label={`Diskusikan ${item.title}`} />
      </CornerFrame>

      <div className="space-y-6 p-6">
        <InsightBlock icon={<Warning2 size={20} />} title="Masalah Utama" items={item.problems} tone="danger" />
        <InsightBlock icon={<LampCharge size={20} />} title="Solusi Gaskode" items={item.solutions} tone="warm" />
        <div className="rounded-[1.5rem] border border-[#a47148]/15 bg-background p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#a47148]">
            <TickCircle size={18} />
            Dampak Nyata
          </div>
          <p className="text-sm font-semibold leading-7 text-slate-600">
            {item.results[0] || "Project membantu operasional menjadi lebih mudah, rapi, dan siap berkembang."}
          </p>
        </div>
        <Link href={ctaLink} className="group/link inline-flex items-center gap-2 font-bold text-[#100d0a] transition hover:text-[#a47148]">
          Diskusikan Project Serupa
          <ArrowRight2 size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

function InsightBlock({
  icon,
  title,
  items,
  tone,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
  tone: "danger" | "warm";
}) {
  return (
    <div>
      <div className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] ${tone === "danger" ? "text-red-500" : "text-[#a47148]"}`}>
        {icon}
        {title}
      </div>
      <ul className="space-y-2 text-sm leading-7 text-slate-600">
        {(items.length ? items : ["Kebutuhan bisnis perlu sistem digital yang lebih cepat, rapi, dan mudah digunakan."]).slice(0, 2).map((item) => (
          <li key={item} className="flex gap-2">
            <Star1 size={15} variant="Bold" className="mt-1 shrink-0 text-[#a47148]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
