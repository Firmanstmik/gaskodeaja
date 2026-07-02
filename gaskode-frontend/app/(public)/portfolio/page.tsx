import { ApiPortfolioPageRepository } from "@/core/infrastructure/repositories/ApiPortfolioPageRepository";
import { GetPortfolioPageDataUseCase } from "@/core/application/use-cases/GetPortfolioPageDataUseCase";
import { PremiumPortfolioPage } from "@/components/portfolio/PremiumPortfolioPage";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const repository = new ApiPortfolioPageRepository();
  const useCase = new GetPortfolioPageDataUseCase(repository);
  const data = await useCase.execute();

  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return <PremiumPortfolioPage data={data} imageBaseUrl={uri} />;
}