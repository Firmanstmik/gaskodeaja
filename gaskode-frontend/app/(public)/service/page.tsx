import { ApiServiceRepository } from "@/core/infrastructure/repositories/ApiServicePageRepository";
import { GetServicePageData } from "@/core/application/use-cases/GetServicePageDataUseCase";
import { ServicePremiumContent } from "@/components/service/ServicePremiumContent";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const repository = new ApiServiceRepository();
  const useCase = new GetServicePageData(repository);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return <ServicePremiumContent data={data} uri={uri} />;
}
