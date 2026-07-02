import { BlogPageData } from "../../domain/entities/BlogEntity";
import { mapBrandingFromApi, mapHeroFromApi } from "../api/mappers";
import { apiClient } from "../services/ApiClient";

export class ApiBlogRepository {
  private readonly path = '/public/blogs';

  async getBlogPageData(): Promise<BlogPageData> {
    const res = await apiClient(this.path, { cache: 'no-store' });

    if (!res.ok) throw new Error("Gagal mengambil data blog");
    const data = await res.json();

    return {
      hero: mapHeroFromApi(data.hero),
      posts: (data.posts ?? []).map((p: Record<string, unknown>) => ({
        id: Number(p.id),
        title: String(p.title ?? ''),
        slug: String(p.slug ?? ''),
        excerpt: String(p.excerpt ?? ''),
        content: String(p.content ?? ''),
        status: String(p.status ?? ''),
        categoryId: Number(p.category_id),
      })),
      categories: (data.kategoris ?? []).map((k: Record<string, unknown>) => ({
        id: Number(k.id),
        name: String(k.name ?? ''),
        slug: String(k.slug ?? ''),
      })),
      closing: mapBrandingFromApi(data.closing),
    };
  }
}