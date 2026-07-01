import { Portfolio } from "../entities/Portfolio";

export interface PortfolioRepository {
  getAll(): Promise<Portfolio[]>;
  getByCategory(categoryId: number): Promise<Portfolio[]>;
  create(data: FormData): Promise<Portfolio>;
  update(id: number, data: FormData): Promise<Portfolio>;
  delete(id: number): Promise<void>;
}