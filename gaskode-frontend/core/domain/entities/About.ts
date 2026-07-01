export interface AboutHero {
  title: string;
  subtitle: string;
  imagePath: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutSection {
  pernyataan: string;
  jawaban: string[];
}

export interface VisiMisi {
  tipe: 'visi' | 'misi';
  konten: string[];
}

export interface About {
  hero: AboutHero;
  opening: AboutSection;
  visiMisi: VisiMisi[];
  value: AboutSection;
  caraKerja: string[]; // Diambil dari field 'list' di JSON
  team: { name: string; slug: string }[];
  portfolio: { total: number; rating: number };
  testimonials: { name: string; position: string; rating: number; content: string }[];
  closing: AboutSection;
}