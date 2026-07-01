export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface Footer {
  id?: number;
  brandName: string;
  logoPath?: string;
  shortDescription: string;
  address?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLinks;
  copyrightText: string;
}