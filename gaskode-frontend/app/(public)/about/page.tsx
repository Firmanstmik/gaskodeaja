import { ApiAboutRepository } from "@/core/infrastructure/repositories/ApiAboutRepository";
import { GetAboutPageData } from "@/core/application/use-cases/GetAboutPageData";
import { AboutPremiumContent } from "@/components/about/AboutPremiumContent";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const repository = new ApiAboutRepository();
  const useCase = new GetAboutPageData(repository);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return <AboutPremiumContent data={data} uri={uri} />;
}
