export interface ServiceHero {
  title: string;
  subtitle: string;
  imagePath: string;
  ctaText: string;
  ctaLink: string;
}

export interface ServiceDetail {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ServicePlan {
  id: number;
  name: string;
  price: string; // Sudah diformat (e.g. "2,5 Juta")
  features: string[];
  maintenance: string;
  isFeatured: boolean;
}

export interface ServicePageData {
  hero: ServiceHero;
  opening: {
    pernyataan: string;
    jawaban: string[];
  };
  services: ServiceDetail[];
  plans: ServicePlan[];
  closing: {
    pernyataan: string;
    jawaban: string[];
  };
}