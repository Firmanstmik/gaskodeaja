export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "published" | "draft";
  categoryId: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPageData {
  hero: {
    title: string;
    subtitle: string;
    imagePath: string;
    ctaText: string;
    ctaLink: string;
  };
  posts: BlogPost[];
  categories: BlogCategory[];
  closing: {
    pernyataan: string;
    jawaban: string[];
  };
}