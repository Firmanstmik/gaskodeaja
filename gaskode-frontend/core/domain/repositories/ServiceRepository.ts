import { Service, CreateServiceDTO } from "../entities/Service";

export interface ServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: number): Promise<Service>;
  create(data: CreateServiceDTO): Promise<Service>;
  update(id: number, data: CreateServiceDTO): Promise<Service>;
  delete(id: number): Promise<void>;
}