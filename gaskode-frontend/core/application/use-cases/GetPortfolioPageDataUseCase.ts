import { ApiPortfolioPageRepository } from "../../infrastructure/repositories/ApiPortfolioPageRepository";

export class GetPortfolioPageDataUseCase {
  constructor(private repository: ApiPortfolioPageRepository) {}

  async execute() {
    return await this.repository.getPortfolioPageData();
  }
}