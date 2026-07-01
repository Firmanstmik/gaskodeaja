'use client';
import ContactSubmissionManager from "@/components/admin/ContactSubmissionManager";
import { MessageSquare, Clock, CheckCircle2 } from "lucide-react";

export default function SubmissionsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Customer Submissions
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Kelola pesan masuk dan permintaan layanan dari pengunjung website Gaskode.
          </p>
        </div>

        {/* Table Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ContactSubmissionManager />
        </div>

      </div>
    </main>
  );
}