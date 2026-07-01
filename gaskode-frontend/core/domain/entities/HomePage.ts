export interface Hero {
  title: string;
  subtitle: string;
  image_path: string;
  cta_text: string;
  cta_link: string;
}

export interface SectionContent {
  pernyataan: string;
  jawaban: string[];
}

export interface Portfolio {
  id: number;
  title: string;
  client_name: string;
  image_thumbnail: string;
  problems: string[];
  solutions: string[];
  results: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
}

export interface HomeData {
  hero: Hero;
  opening: SectionContent;
  portfolio: Portfolio[];
  services: Service[];
  testimonial: Testimonial[];
  closing: SectionContent;
}