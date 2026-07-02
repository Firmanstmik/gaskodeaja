import Link from "next/link";
import { ApiBlogRepository } from "@/core/infrastructure/repositories/ApiBlogRepository";
import { GetBlogPageData } from "@/core/application/use-cases/GetBlogPageData";
import { ArrowRight2, CalendarTick, Crown1, MessageQuestion, SearchNormal1, Tag } from "iconsax-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const repository = new ApiBlogRepository();
  const useCase = new GetBlogPageData(repository);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";
  const isExternalCta = data.hero.ctaLink?.startsWith("http");

  return (
    <main className="bg-[#fbf7f1] text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[#161310]" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url('${uri}/${data.hero.imagePath}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(10,8,7,0.92)_0%,rgba(10,8,7,0.74)_50%,rgba(10,8,7,0.35)_100%)]" />
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4] backdrop-blur">
            <Crown1 size={16} />
            Blog & Insights
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">
            {data.hero.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/75">{data.hero.subtitle}</p>
          {isExternalCta ? (
            <a
              href={data.hero.ctaLink}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </a>
          ) : (
            <Link
              href={data.hero.ctaLink || "/contact"}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </Link>
          )}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Kategori</span>
            {data.categories.map((cat) => (
              <span key={cat.id} className="inline-flex items-center gap-1 rounded-full border border-[#eadcc9] bg-white px-4 py-2 text-xs font-bold text-slate-600">
                <Tag size={14} />
                {cat.name}
              </span>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {data.posts.map((post) => {
                const categoryName =
                  data.categories.find((c) => c.id === post.categoryId)?.name || "Uncategorized";
                return (
                  <article
                    key={post.id}
                    className="rounded-[1.8rem] border border-[#eadcc9] bg-white p-8 shadow-[0_10px_30px_rgba(42,28,18,0.08)]"
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-[#A47148]">
                      <span>{categoryName}</span>
                      <span className="text-slate-400">•</span>
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <CalendarTick size={14} />
                        Published
                      </span>
                    </div>
                    <h2 className="text-3xl font-black tracking-[-0.02em] text-slate-900">{post.title}</h2>
                    <p className="mt-4 text-base leading-8 text-slate-600">{post.excerpt}</p>
                    <div className="mt-6">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#A47148] transition hover:gap-3"
                      >
                        Baca Selengkapnya
                        <ArrowRight2 size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[1.8rem] border border-[#eadcc9] bg-white p-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Search</p>
                <div className="flex items-center gap-2 rounded-xl border border-[#eadcc9] bg-[#fbf7f1] px-4 py-3">
                  <SearchNormal1 size={16} className="text-[#A47148]" />
                  <span className="text-sm text-slate-500">Cari artikel...</span>
                </div>
              </div>

              <div className="rounded-[1.8rem] bg-[#161310] p-7 text-white shadow-[0_22px_55px_rgba(18,13,9,0.25)]">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Need Help?</p>
                <h3 className="mt-3 text-2xl font-black leading-tight">{data.closing.pernyataan}</h3>
                <p className="mt-4 text-sm leading-7 text-white/70">{data.closing.jawaban[0]}</p>
                {isExternalCta ? (
                  <a
                    href={data.hero.ctaLink}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#8B5E3C]"
                  >
                    <MessageQuestion size={16} />
                    Konsultasi Gratis
                  </a>
                ) : (
                  <Link
                    href={data.hero.ctaLink || "/contact"}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#8B5E3C]"
                  >
                    <MessageQuestion size={16} />
                    Konsultasi Gratis
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

