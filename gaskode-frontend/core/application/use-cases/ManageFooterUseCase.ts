// src/core/application/use-cases/ManageFooter.ts

import { IFooterRepository } from "../../domain/repositories/IFooterRepository";
import { Footer } from "../../domain/entities/Footer";

export class ManageFooterUseCase {
  constructor(private repository: IFooterRepository) {}

  async executeGet(): Promise<Footer | null> {
    return await this.repository.get();
  }

  async executeSave(data: Footer): Promise<void> {
    // Validasi sederhana sebelum kirim
    if (!data.brandName || !data.shortDescription) {
      throw new Error("Brand Name dan Deskripsi wajib diisi");
    }

    if (data.id) {
      return await this.repository.update(data.id, data);
    }
    return await this.repository.save(data);
  }
}