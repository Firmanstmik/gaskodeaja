import { IBrandingRepository } from "@/core/domain/repositories/IBrandingRepository";
import { Branding } from "@/core/domain/entities/Branding";

export class BrandingUseCase {
  constructor(private brandingRepo: IBrandingRepository) {}

  async getAll() { return await this.brandingRepo.findAll(); }
  async add(data: Omit<Branding, 'id'>) { return await this.brandingRepo.create(data); }
  async update(id: number, data: Partial<Branding>) { return await this.brandingRepo.update(id, data); }
  async delete(id: number) { return await this.brandingRepo.delete(id); }
}