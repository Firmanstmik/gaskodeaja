import { CaraKerja } from "../entities/CaraKerja";

export interface ICaraKerjaRepository {
  findAll(): Promise<CaraKerja[]>;
  create(data: Omit<CaraKerja, 'id'>): Promise<void>;
  update(id: number, data: Partial<CaraKerja>): Promise<void>;
  delete(id: number): Promise<void>;
}