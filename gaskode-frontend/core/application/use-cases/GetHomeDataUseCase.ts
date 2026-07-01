import { ApiHomeRepository } from "@/core/infrastructure/repositories/ApiHomePageRepository";

export class GetHomeDataUseCase {
  constructor(private repo: ApiHomeRepository) {}

  async execute() {
    const data = await this.repo.getHomeData();
    
    // Di sini Anda bisa menambahkan logika transformasi data jika diperlukan
    // sebelum dikirim ke UI
    return data;
  }
}