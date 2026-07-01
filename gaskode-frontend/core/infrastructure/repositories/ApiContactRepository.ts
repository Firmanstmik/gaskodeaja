import { ContactEntity } from "../../domain/entities/ContactEntity";
import { apiClient } from "../services/ApiClient";

export class ApiContactRepository {
  private readonly path = '/public/contacts';

  async getContactPage(): Promise<ContactEntity> {
    const res = await apiClient(this.path, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal memuat data kontak');
    const response = await res.json();
    const d = response; // Berdasarkan struktur JSON yang Anda berikan

    return {
      hero: {
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        imagePath: d.hero.image_path,
        ctaText: d.hero.cta_text,
        ctaLink: d.hero.cta_link
      },
      opening: {
        title: d.opening.pernyataan,
        description: d.opening.jawaban
      },
      contacts: d.contacts,
      value: {
        title: d.value.pernyataan,
        description: d.value.jawaban
      },
      closing: {
        title: d.closing.pernyataan,
        description: d.closing.jawaban
      }
    };
  }
}