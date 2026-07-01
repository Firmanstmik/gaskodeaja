import { BlogPageData } from "../../domain/entities/BlogEntity";
import { apiClient } from "../services/ApiClient";

export class ApiBlogRepository {
  private readonly path = '/public/blogs';

  async getBlogPageData(): Promise<BlogPageData> {
    const res = await apiClient(this.path, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Gagal mengambil data blog");
    const data = await res.json();

    return {
      hero: {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        imagePath: data.hero.image_path,
        ctaText: data.hero.cta_text,
        ctaLink: data.hero.cta_link,
      },
      posts: data.posts.map((p: any) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        status: p.status,
        categoryId: p.category_id,
      })),
      categories: data.kategoris.map((k: any) => ({
        id: k.id,
        name: k.name,
        slug: k.slug,
      })),
      closing: {
        pernyataan: data.closing.pernyataan,
        jawaban: data.closing.jawaban,
      }
    };
  }
}