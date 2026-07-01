import { ServicePageData } from "@/core/domain/entities/ServicesEntity";
import { apiClient } from "../services/ApiClient";

export class ApiServiceRepository {
  private readonly path = '/public/services';
  async getServiceData(): Promise<ServicePageData> {
    const res = await apiClient(this.path, {
      next: { revalidate: 3600 }
    });
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
      services: data.services,
      plans: data["service-plans"].map((plan: any) => ({
        id: plan.id,
        name: plan.name,
        price: (plan.price / 1000000).toString().replace('.', ',') + " Juta",
        features: plan.features,
        maintenance: (plan.maintenance_cost / 1000).toString() + "k",
        isFeatured: plan.is_featured,
      })),
      closing: {
        pernyataan: data.closing.pernyataan,
        jawaban: data.closing.jawaban,
      }
    };
  }
}