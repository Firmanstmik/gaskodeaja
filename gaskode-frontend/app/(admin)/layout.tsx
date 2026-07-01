import { Sidebar } from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar tetap di kiri */}
      <Sidebar />
      
      {/* Konten Utama - Scroll mandiri */}
      <main className="flex-1 md:pl-[280px] h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-10 pt-20 md:pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}