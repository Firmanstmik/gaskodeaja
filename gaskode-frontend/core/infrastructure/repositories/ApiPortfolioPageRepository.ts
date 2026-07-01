import { PortfolioPageData } from "../../domain/entities/PortfolioEntity";
import { apiClient } from "../services/ApiClient";

export class ApiPortfolioPageRepository {
  private readonly path = '/public/portfolios';

  async getPortfolioPageData(): Promise<PortfolioPageData> {
    const res = await apiClient(this.path, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Gagal memuat data portofolio");
    const data = await res.json();

    return {
      hero: {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        imagePath: data.hero.image_path,
        ctaText: data.hero.cta_text,
        ctaLink: data.hero.cta_link,
      },
      opening: {
        pernyataan: data.opening.pernyataan,
        jawaban: data.opening.jawaban,
      },
      portfolios: data.portfolio.map((p: any) => ({
        id: p.id,
        title: p.title,
        clientName: p.client_name,
        imageThumbnail: p.image_thumbnail,
        problems: p.problems,
        solutions: p.solutions,
        results: p.results,
      })),
      closing: {
        pernyataan: data.closing.pernyataan,
        jawaban: data.closing.jawaban,
      }
    };
  }
}