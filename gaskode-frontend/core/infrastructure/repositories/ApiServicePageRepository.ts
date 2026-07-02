import { ServicePageData } from "@/core/domain/entities/ServicesEntity";
import { mapBrandingFromApi, mapHeroFromApi } from "../api/mappers";
import { apiClient } from "../services/ApiClient";

export class ApiServiceRepository {
  private readonly path = '/public/services';
  async getServiceData(): Promise<ServicePageData> {
    const res = await apiClient(this.path, { cache: 'no-store' });
    if (!res.ok) throw new Error("Gagal memuat data layanan");
    const data = await res.json();

    return {
      hero: mapHeroFromApi(data.hero),
      opening: mapBrandingFromApi(data.opening),
      services: data.services ?? [],
      plans: (data["service-plans"] ?? []).map((plan: Record<string, unknown>) => ({
        id: Number(plan.id),
        name: String(plan.name ?? ''),
        price: (Number(plan.price) / 1000000).toString().replace('.', ',') + " Juta",
        features: Array.isArray(plan.features) ? plan.features : [],
        maintenance: (Number(plan.maintenance_cost) / 1000).toString() + "k",
        isFeatured: Boolean(plan.is_featured),
      })),
      closing: mapBrandingFromApi(data.closing),
    };
  }
}