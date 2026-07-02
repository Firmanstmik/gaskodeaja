"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
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

type PremiumPortfolioPageProps = {
  data: PortfolioPageData;
  imageBaseUrl: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
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
    <main className="min-h-screen overflow-hidden bg-[#fff7ea] text-slate-950">
      <section className="relative isolate min-h-[86vh] overflow-hidden bg-[#130f0b] px-6 pt-32 text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${imageUrl(imageBaseUrl, data.hero.imagePath)}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(164,113,72,0.45),transparent_34%),linear-gradient(120deg,#120d09_0%,rgba(18,13,9,0.92)_45%,rgba(54,35,22,0.84)_100%)]" />
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto grid max-w-7xl items-center gap-14 pb-24 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#f0c69e] backdrop-blur"
            >
              <Briefcase size={16} />
              Portfolio Showcase
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl"
            >
              {data.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              {data.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href={data.hero.ctaLink}
                className="group inline-flex items-center gap-3 rounded-full bg-[#c4834d] px-7 py-4 text-sm font-black text-white shadow-2xl shadow-[#c4834d]/30 transition hover:bg-[#a66a3f]"
              >
                {data.hero.ctaText}
                <ArrowRight2 size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
              >
                Lihat Project
                <Eye size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: 4, y: 40 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-[3rem] bg-[#c4834d]/25 blur-3xl" />
            <div className="relative rounded-[2.2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <img
                src={imageUrl(imageBaseUrl, data.portfolios[0]?.imageThumbnail || data.hero.imagePath)}
                alt={data.portfolios[0]?.title || data.hero.title}
                className="aspect-[4/3] w-full rounded-[1.7rem] object-cover"
              />
              <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/15 bg-black/45 p-5 text-white backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0c69e]">Featured Work</p>
                    <h2 className="mt-1 text-2xl font-black">{data.portfolios[0]?.title || "GaskodeAja Project"}</h2>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-center text-slate-950">
                    <p className="text-3xl font-black">{data.portfolios.length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative -mt-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto grid max-w-6xl gap-4 rounded-[2rem] border border-[#e9d6bf] bg-white/80 p-5 shadow-2xl shadow-[#7a4c2c]/10 backdrop-blur md:grid-cols-3"
        >
          <Stat icon={<MedalStar size={26} />} label="Premium Delivery" value="10+" />
          <Stat icon={<TrendUp size={26} />} label="Digital Growth" value="3x" />
          <Stat icon={<ShieldTick size={26} />} label="Support & Maintenance" value="Ready" />
        </motion.div>
      </section>

      <section className="px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.08 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.28em] text-[#a47148]">
            Curated Case Studies
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-6xl">
            {data.opening.pernyataan}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {data.opening.jawaban[0] || "Kumpulan project digital yang dirancang untuk tampil modern, cepat, dan siap membantu bisnis tumbuh."}
          </motion.p>
        </motion.div>
      </section>

      <section id="projects" className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-20 z-30 mb-10 overflow-x-auto rounded-full border border-[#e8d7c1] bg-[#fff7ea]/85 p-2 shadow-lg shadow-[#7a4c2c]/5 backdrop-blur">
            <div className="flex min-w-max gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${
                    activeCategory === category
                      ? "bg-slate-950 text-white shadow-xl shadow-slate-950/20"
                      : "text-slate-600 hover:bg-white hover:text-slate-950"
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
      </section>

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl md:p-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f0c69e]">Start Your Build</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] md:text-6xl">
                {data.closing.pernyataan}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{data.closing.jawaban[0]}</p>
            </div>
            <Link
              href={data.hero.ctaLink}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#c4834d] px-8 py-5 text-base font-black text-white shadow-xl shadow-[#c4834d]/25 transition hover:bg-[#a66a3f]"
            >
              Chat WhatsApp Sekarang
              <MessageQuestion size={22} className="transition group-hover:rotate-12" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-6">
      <div className="mb-5 inline-flex rounded-2xl bg-[#fff1e4] p-3 text-[#a47148]">{icon}</div>
      <p className="text-3xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
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
      className="group overflow-hidden rounded-[2rem] border border-[#ead8c5] bg-white shadow-xl shadow-[#7a4c2c]/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageUrl(imageBaseUrl, item.imageThumbnail)}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-90" />
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 backdrop-blur">
          Project {String(index + 1).padStart(2, "0")}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#c4834d] px-3 py-1.5 text-xs font-black text-white">
            {categoryIcons[category] ?? <Briefcase size={16} />}
            {category}
          </p>
          <h3 className="text-3xl font-black tracking-[-0.04em] text-white">{item.title}</h3>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-white/60">{item.clientName}</p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <InsightBlock icon={<Warning2 size={20} />} title="Masalah Utama" items={item.problems} tone="danger" />
        <InsightBlock icon={<LampCharge size={20} />} title="Solusi Gaskode" items={item.solutions} tone="warm" />
        <div className="rounded-[1.5rem] border border-[#ead8c5] bg-[#fff7ea] p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#a47148]">
            <TickCircle size={18} />
            Dampak Nyata
          </div>
          <p className="text-sm font-semibold leading-7 text-slate-600">
            {item.results[0] || "Project membantu operasional menjadi lebih mudah, rapi, dan siap berkembang."}
          </p>
        </div>
        <Link href={ctaLink} className="inline-flex items-center gap-2 font-black text-slate-950 transition hover:text-[#a47148]">
          Diskusikan Project Serupa
          <ArrowRight2 size={18} className="transition group-hover:translate-x-1" />
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
      <div className={`mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] ${tone === "danger" ? "text-red-500" : "text-[#a47148]"}`}>
        {icon}
        {title}
      </div>
      <ul className="space-y-2 text-sm leading-7 text-slate-600">
        {(items.length ? items : ["Kebutuhan bisnis perlu sistem digital yang lebih cepat, rapi, dan mudah digunakan."]).slice(0, 2).map((item) => (
          <li key={item} className="flex gap-2">
            <Star1 size={15} variant="Bold" className="mt-1 shrink-0 text-[#c4834d]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
