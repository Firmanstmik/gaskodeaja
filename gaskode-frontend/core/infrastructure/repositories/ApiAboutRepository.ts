// src/core/infrastructure/repositories/ApiAboutRepository.ts

import { About } from "@/core/domain/entities/About";
import { apiClient } from "../services/ApiClient";

export class ApiAboutRepository {
  private readonly path = '/public/about';
  async getAboutData(): Promise<About> {
    const response = await apiClient(this.path);
    const data = await response.json();

    // Mapping API Response ke Entity
    return {
      hero: {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        imagePath: data.hero.image_path,
        ctaText: data.hero.cta_text,
        ctaLink: data.hero.cta_link,
      },
      opening: data.opening,
      visiMisi: data['visi-misi'],
      value: data.value,
      caraKerja: data['cara-kerja'].map((item: any) => item.list),
      team: data.team,
      portfolio: data.portfolio,
      testimonials: data.testimonial,
      closing: data.closing,
    };
  }
}