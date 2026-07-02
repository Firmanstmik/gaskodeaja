// src/core/infrastructure/repositories/ApiAboutRepository.ts

import { About } from "@/core/domain/entities/About";
import { mapHeroFromApi } from "../api/mappers";
import { apiClient } from "../services/ApiClient";

export class ApiAboutRepository {
  private readonly path = '/public/about';
  async getAboutData(): Promise<About> {
    const response = await apiClient(this.path, { cache: 'no-store' });
    if (!response.ok) throw new Error("Gagal memuat data about");
    const data = await response.json();

    return {
      hero: mapHeroFromApi(data.hero),
      opening: data.opening ?? { pernyataan: '', jawaban: [] },
      visiMisi: data['visi-misi'] ?? [],
      value: data.value ?? { pernyataan: '', jawaban: [] },
      caraKerja: (data['cara-kerja'] ?? []).map((item: { list?: unknown }) => item.list),
      team: data.team ?? [],
      portfolio: data.portfolio ?? [],
      testimonials: data.testimonial ?? [],
      closing: data.closing ?? { pernyataan: '', jawaban: [] },
    };
  }
}