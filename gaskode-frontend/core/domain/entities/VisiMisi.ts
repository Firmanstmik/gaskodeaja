export interface VisiMisi {
  id: number;
  tipe: "visi" | "misi"; // Literals untuk membatasi tipe
  konten: string[];      // Array of strings sesuai API
  urutan: number;
  created_at?: string;
  updated_at?: string;
}