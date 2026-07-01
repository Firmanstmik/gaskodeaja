export interface Branding {
  id: number;
  kategori: string;
  pernyataan: string;
  jawaban: string[]; // Response API berupa array of strings
  cta_text: string | null;
  cta_link: string | null;
  created_at?: string;
  updated_at?: string;
}