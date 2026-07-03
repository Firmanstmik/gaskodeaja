import { ApiBlogRepository } from "@/core/infrastructure/repositories/ApiBlogRepository";
import { GetBlogPageData } from "@/core/application/use-cases/GetBlogPageData";
import { BlogPremiumContent } from "@/components/blog/BlogPremiumContent";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const repository = new ApiBlogRepository();
  const useCase = new GetBlogPageData(repository);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return <BlogPremiumContent data={data} uri={uri} />;
}
