import { IVisiMisiRepository } from "@/core/domain/repositories/IVisiMisiRepository";
import { VisiMisi } from "@/core/domain/entities/VisiMisi";

export class VisiMisiUseCase {
  constructor(private repo: IVisiMisiRepository) {}

  async getAll() { return await this.repo.findAll(); }
  async add(data: Omit<VisiMisi, 'id'>) { return await this.repo.create(data); }
  async update(id: number, data: Partial<VisiMisi>) { return await this.repo.update(id, data); }
  async delete(id: number) { return await this.repo.delete(id); }
}