import { Footer } from "../entities/Footer";

export interface IFooterRepository {
  get(): Promise<Footer | null>;
  save(data: Footer): Promise<void>;
  update(id: number, data: Footer): Promise<void>;
}