import { ApiContactRepository } from "../../infrastructure/repositories/ApiContactRepository";

export class GetContactPageData {
  constructor(private repository: ApiContactRepository) {}

  async execute() {
    return await this.repository.getContactPage();
  }
}