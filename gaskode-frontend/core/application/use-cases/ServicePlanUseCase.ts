import { ServicePlanRepository } from "../../domain/repositories/ServicePlanRepository";
import { CreateServicePlanDTO, UpdateServicePlanDTO } from "../../domain/entities/ServicePlan";

export class ServicePlanUseCase {
  constructor(private repository: ServicePlanRepository) {}

  async fetchAll() {
    return this.repository.getAll();
  }

  // belum digunakan di view
  async fetchByService(serviceId: number) {
    return this.repository.getByService(serviceId);
  }

  async savePlan(data: CreateServicePlanDTO | UpdateServicePlanDTO, id?: number) {
    if (id) {
      return this.repository.update(id, data as UpdateServicePlanDTO);
    }
    return this.repository.create(data as CreateServicePlanDTO);
  }

  async deletePlan(id: number) {
    return this.repository.delete(id);
  }
}