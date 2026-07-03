"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight2, CalendarTick, Crown1, MessageQuestion, SearchNormal1, Tag } from "iconsax-react";
import { BlogPageData } from "@/core/domain/entities/BlogEntity";
import { Button } from "@/components/ui/Button";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { revealItem, revealStagger } from "@/lib/design-tokens";

type BlogPremiumContentProps = {
  data: BlogPageData;
  uri: string;
};

export function BlogPremiumContent({ data, uri }: BlogPremiumContentProps) {
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
              Blog & Insights
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
            <Button href={data.hero.ctaLink || "/contact"} full={false}>
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── POSTS ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={revealStagger}
            className="mb-10 flex flex-wrap items-center gap-3 sm:mb-14"
          >
            <SectionKicker>Kategori</SectionKicker>
            {data.categories.map((cat) => (
              <motion.span
                key={cat.id}
                variants={revealItem}
                className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-slate-600"
              >
                <Tag size={14} />
                {cat.name}
              </motion.span>
            ))}
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={revealStagger}
              className="space-y-6"
            >
              {data.posts.map((post) => {
                const categoryName = data.categories.find((c) => c.id === post.categoryId)?.name || "Uncategorized";
                return (
                  <motion.div key={post.id} variants={revealItem}>
                    <Card>
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#a47148]">
                        <span>{categoryName}</span>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <CalendarTick size={14} />
                          Published
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">{post.title}</h2>
                      <p className="mt-4 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">{post.excerpt}</p>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#a47148]"
                      >
                        Baca Selengkapnya
                        <ArrowRight2 size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.aside
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealStagger}
              className="space-y-6"
            >
              <motion.div variants={revealItem} className="rounded-[1.75rem] border border-[#a47148]/15 bg-white p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Search</p>
                <div className="glass flex items-center gap-2 rounded-xl px-4 py-3">
                  <SearchNormal1 size={16} className="text-[#a47148]" />
                  <span className="text-sm text-slate-500">Cari artikel...</span>
                </div>
              </motion.div>

              <motion.div variants={revealItem} className="grain relative isolate overflow-hidden rounded-[1.75rem] bg-[#100d0a] p-7 text-white shadow-[0_22px_55px_-24px_rgba(18,13,9,0.5)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Need Help?</p>
                <h3 className="mt-3 font-display text-2xl font-medium leading-tight">{data.closing.pernyataan}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{data.closing.jawaban[0]}</p>
                <div className="mt-6">
                  <Button href={data.hero.ctaLink || "/contact"} full={false} className="px-5 py-3 text-xs">
                    <MessageQuestion size={16} />
                    Konsultasi Gratis
                  </Button>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}
