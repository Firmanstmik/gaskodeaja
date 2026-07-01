export interface PortfolioHero {
  title: string;
  subtitle: string;
  imagePath: string;
  ctaText: string;
  ctaLink: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  clientName: string;
  imageThumbnail: string;
  problems: string[];
  solutions: string[];
  results: string[];
  tag: string; // Diambil dari mapping category_id atau static
}

export interface PortfolioPageData {
  hero: PortfolioHero;
  opening: {
    pernyataan: string;
    jawaban: string[];
  };
  portfolios: PortfolioItem[];
  closing: {
    pernyataan: string;
    jawaban: string[];
  };
}