import { VisiMisi } from "../entities/VisiMisi";

export interface IVisiMisiRepository {
  findAll(): Promise<VisiMisi[]>;
  create(data: Omit<VisiMisi, 'id'>): Promise<void>;
  update(id: number, data: Partial<VisiMisi>): Promise<void>;
  delete(id: number): Promise<void>;
}