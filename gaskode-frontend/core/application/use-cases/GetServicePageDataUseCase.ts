// core/application/use-cases/GetServicePageData.ts
import { ApiServiceRepository } from "../../infrastructure/repositories/ApiServicePageRepository";

export class GetServicePageData {
  constructor(private repository: ApiServiceRepository) {}

  async execute() {
    return await this.repository.getServiceData();
  }
}