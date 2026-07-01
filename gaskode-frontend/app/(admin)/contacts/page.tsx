import ContactMeManager from "@/components/admin/ContactMeManager";

export default function AdminContactPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto py-10">
        <div className="px-8 mb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact Configuration
          </h1>
          <p className="text-slate-600 mt-2">
            Kelola informasi kontak yang akan tampil di halaman utama website.
          </p>
        </div>
        <ContactMeManager />
      </div>
    </main>
  );
}