import { ApiFooterRepository } from "@/core/infrastructure/repositories/ApiFooterRepository";
import { ManageFooterUseCase } from "@/core/application/use-cases/ManageFooterUseCase";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inisialisasi
  const repo = new ApiFooterRepository();
  const useCase = new ManageFooterUseCase(repo);
  
  // Eksekusi UseCase untuk mendapatkan data
  const footerData = await useCase.executeGet();

  return (
    <>
      <Navbar />
      {/* Setiap halaman menyediakan elemen <main> nya sendiri */}
      {children}

      {/* Kirim hasil data UseCase ke komponen Footer */}
      {footerData && <Footer data={footerData} />}
    </>
  );
}