import { Hero } from "../entities/Hero";

export interface HeroRepository {
  getAll(): Promise<Hero[]>;
  getActive(): Promise<Hero>; // <--- Pastikan ini ada
  create(data: FormData): Promise<Hero>;
  update(id: number, data: FormData): Promise<Hero>;
  delete(id: number): Promise<void>;
}