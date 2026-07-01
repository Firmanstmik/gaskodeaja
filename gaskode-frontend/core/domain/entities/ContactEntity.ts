export interface ContactHero {
  title: string;
  subtitle: string;
  imagePath: string;
  ctaText: string;
  ctaLink: string;
}

export interface ContactDetail {
  id: number;
  label: string;
  value: string;
  icon: string;
}

export interface ContentSection {
  title: string;
  description: string[];
}

export interface ContactEntity {
  hero: ContactHero;
  opening: ContentSection;
  contacts: ContactDetail[];
  value: ContentSection;
  closing: ContentSection;
}