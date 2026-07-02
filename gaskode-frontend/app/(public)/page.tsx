import { ApiHomeRepository } from "@/core/infrastructure/repositories/ApiHomePageRepository";
import { HomeData } from "@/core/domain/entities/HomePage";
import { HomePremiumContent } from "@/components/home/HomePremiumContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const repo = new ApiHomeRepository();
  const data: HomeData = await repo.getHomeData();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return (
    <main className="min-h-screen bg-[#fbf7f1] text-slate-900">
      <HomePremiumContent
        hero={data.hero}
        opening={data.opening}
        closing={data.closing}
        services={data.services}
        portfolio={data.portfolio}
        testimonial={data.testimonial}
        uri={uri}
      />
    </main>
  );
}
