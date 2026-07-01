export interface Qna {
  id: number;
  question: string; // Sesuai API
  answer: string;   // Sesuai API (String, bukan array)
  created_at?: string;
  updated_at?: string;
}