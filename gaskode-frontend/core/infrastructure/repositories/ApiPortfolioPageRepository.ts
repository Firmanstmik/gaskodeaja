import { PortfolioPageData } from "../../domain/entities/PortfolioEntity";
import { mapBrandingFromApi, mapHeroFromApi, toStringArray } from "../api/mappers";
import { apiClient } from "../services/ApiClient";

export class ApiPortfolioPageRepository {
  private readonly path = '/public/portfolios';

  async getPortfolioPageData(): Promise<PortfolioPageData> {
    const res = await apiClient(this.path, { cache: 'no-store' });

    if (!res.ok) throw new Error("Gagal memuat data portofolio");
    const data = await res.json();

    return {
      hero: mapHeroFromApi(data.hero),
      opening: mapBrandingFromApi(data.opening),
      portfolios: (data.portfolio ?? []).map((p: Record<string, unknown>) => ({
        id: Number(p.id),
        title: String(p.title ?? ''),
        clientName: String(p.client_name ?? ''),
        imageThumbnail: String(p.image_thumbnail ?? ''),
        problems: toStringArray(p.problems),
        solutions: toStringArray(p.solutions),
        results: toStringArray(p.results),
        tag: String(p.tag ?? ''),
      })),
      closing: mapBrandingFromApi(data.closing),
    };
  }
}