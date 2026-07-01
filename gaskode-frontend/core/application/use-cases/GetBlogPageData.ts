import { ApiBlogRepository } from "../../infrastructure/repositories/ApiBlogRepository";

export class GetBlogPageData {
  constructor(private repository: ApiBlogRepository) {}

  async execute() {
    const data = await this.repository.getBlogPageData();
    return data;
  }
}