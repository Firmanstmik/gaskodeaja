import { ServicePlan, CreateServicePlanDTO, UpdateServicePlanDTO } from "../entities/ServicePlan";

export interface ServicePlanRepository {
  getAll(): Promise<ServicePlan[]>;
  getById(id: number): Promise<ServicePlan>;
  getByService(serviceId: number): Promise<ServicePlan[]>;
  create(data: CreateServicePlanDTO): Promise<ServicePlan>;
  update(id: number, data: UpdateServicePlanDTO): Promise<ServicePlan>;
  delete(id: number): Promise<void>;
}