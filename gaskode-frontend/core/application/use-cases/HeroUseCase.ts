import { HeroRepository } from "../../domain/repositories/HeroRepository";

export class HeroUseCase {
  constructor(private repository: HeroRepository) {}

  async fetchAllHeros() {
    return await this.repository.getAll();
  }

  async saveHero(data: FormData, id?: number) {
    // Validasi bisnis sederhana sebelum kirim ke repo
    const file = data.get('image_file') as File;
    if (file && file.size > 0 && file.size > 2 * 1024 * 1024) {
      throw new Error("Ukuran file maksimal harus 2MB");
    }

    if (id) return await this.repository.update(id, data);
    return await this.repository.create(data);
  }

  async removeHero(id: number) {
    return await this.repository.delete(id);
  }
}