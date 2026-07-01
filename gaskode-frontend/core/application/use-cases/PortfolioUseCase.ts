import { Portfolio } from "../../domain/entities/Portfolio";
import { ApiPortfolioRepository } from "../../infrastructure/repositories/ApiPortfolioRepository";

export class PortfolioUseCase {
  constructor(private repository: ApiPortfolioRepository) {}

  async fetchAll() {
    return await this.repository.getAll();
  }

  async savePortfolio(data: FormData, id?: number) {
    // Validasi file minimal 2MB
    const file = data.get('image_thumbnail') as File;
    if (file && file.size > 0 && file.size > 2 * 1024 * 1024) {
      throw new Error("Foto thumbnail minimal harus 2MB, Om!");
    }

    if (id) {
      return await this.repository.update(id, data);
    }
    return await this.repository.create(data);
  }

  async deletePortfolio(id: number) {
    return await this.repository.delete(id);
  }
}