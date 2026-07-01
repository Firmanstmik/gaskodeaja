import { ICaraKerjaRepository } from "@/core/domain/repositories/ICaraKerjaRepository";
import { CaraKerja } from "@/core/domain/entities/CaraKerja";

export class CaraKerjaUseCase {
  constructor(private repo: ICaraKerjaRepository) {}

  async getAll() { 
    return await this.repo.findAll(); 
  }
  
  async add(data: Omit<CaraKerja, 'id'>) { 
    return await this.repo.create(data); 
  }
  
  async update(id: number, data: Partial<CaraKerja>) { 
    return await this.repo.update(id, data); 
  }
  
  async delete(id: number) { 
    return await this.repo.delete(id); 
  }
}