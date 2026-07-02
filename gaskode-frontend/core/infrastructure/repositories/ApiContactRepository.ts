import { ContactEntity } from "../../domain/entities/ContactEntity";
import { mapBrandingFromApi, mapHeroFromApi } from "../api/mappers";
import { apiClient } from "../services/ApiClient";

export class ApiContactRepository {
  private readonly path = '/public/contacts';

  async getContactPage(): Promise<ContactEntity> {
    const res = await apiClient(this.path, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal memuat data kontak');
    const d = await res.json();

    const opening = mapBrandingFromApi(d.opening);
    const value = mapBrandingFromApi(d.value);
    const closing = mapBrandingFromApi(d.closing);

    return {
      hero: mapHeroFromApi(d.hero),
      opening: {
        title: opening.pernyataan,
        description: opening.jawaban,
      },
      contacts: d.contacts ?? [],
      value: {
        title: value.pernyataan,
        description: value.jawaban,
      },
      closing: {
        title: closing.pernyataan,
        description: closing.jawaban,
      }
    };
  }
}