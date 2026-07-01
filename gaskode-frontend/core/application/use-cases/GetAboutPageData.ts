import { About } from "@/core/domain/entities/About";
import { ApiAboutRepository } from "../../infrastructure/repositories/ApiAboutRepository";

export class GetAboutPageData {
  constructor(private aboutRepository: ApiAboutRepository) {}

  async execute(): Promise<About> {
    return await this.aboutRepository.getAboutData();
  }
}