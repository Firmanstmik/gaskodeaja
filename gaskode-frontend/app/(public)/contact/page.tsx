import { ApiContactRepository } from "@/core/infrastructure/repositories/ApiContactRepository";
import { GetContactPageData } from "@/core/application/use-cases/GetContactPageData";
import { ContactPremiumContent } from "@/components/contact/ContactPremiumContent";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const repo = new ApiContactRepository();
  const useCase = new GetContactPageData(repo);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return <ContactPremiumContent data={data} uri={uri} />;
}
