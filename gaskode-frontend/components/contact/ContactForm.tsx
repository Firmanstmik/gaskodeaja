"use client";

import { useState } from "react";
import { MessageQuestion, TickCircle, Warning2, Whatsapp } from "iconsax-react";

type ContactFormProps = {
  /** CTA / WhatsApp link coming from the CMS (e.g. https://wa.me/62812xxxx) */
  ctaLink?: string;
  /** Fallback phone number (digits) if ctaLink has none */
  fallbackNumber?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8006/api";

function extractNumber(...sources: (string | undefined)[]) {
  for (const src of sources) {
    if (!src) continue;
    const digits = src.replace(/[^0-9]/g, "");
    if (digits.length >= 8) return digits;
  }
  return "";
}

export function ContactForm({ ctaLink, fallbackNumber }: ContactFormProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});

  const targetNumber = extractNumber(ctaLink, fallbackNumber);

  function validate() {
    const next: { name?: string; whatsapp?: string } = {};
    if (name.trim().length < 2) next.name = "Nama minimal 2 karakter.";
    const digits = whatsapp.replace(/[^0-9]/g, "");
    if (digits.length < 10 || digits.length > 15)
      next.whatsapp = "Masukkan nomor WhatsApp yang valid (10–15 digit).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function openWhatsApp() {
    if (!targetNumber) return;
    const text = encodeURIComponent(
      `Halo GasKodeAja! 👋\n\nNama: ${name}\nNo. WhatsApp: ${whatsapp}\n\n${
        message || "Saya ingin berkonsultasi mengenai project digital saya."
      }`
    );
    window.open(`https://wa.me/${targetNumber}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Best-effort lead capture ke backend. WhatsApp tetap dibuka meski gagal.
    try {
      await fetch(`${API_BASE}/public/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp_number: whatsapp.replace(/[^0-9]/g, ""),
          message: message.trim() || null,
        }),
      });
    } catch {
      /* diamkan — WhatsApp adalah jalur konversi utama */
    }

    openWhatsApp();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="card-sheen flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-[#a47148]/15 bg-white p-10 text-center shadow-[0_20px_50px_-24px_rgba(44,30,20,0.35)] sm:rounded-[2rem]">
        <div className="mb-5 inline-flex rounded-2xl bg-[#eafaf0] p-4 text-emerald-600">
          <TickCircle size={34} variant="Bulk" />
        </div>
        <h3 className="font-display text-2xl font-medium tracking-tight text-slate-900">Pesan Anda Terkirim!</h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
          Terima kasih, {name.split(" ")[0] || "Sobat"}. Kami sudah menerima detail Anda
          {targetNumber ? " dan membuka WhatsApp untuk melanjutkan obrolan." : "."} Tim kami akan segera merespons.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setWhatsapp("");
            setMessage("");
          }}
          className="tap mt-7 inline-flex items-center gap-2 rounded-xl border border-[#a47148]/25 px-5 py-3 text-sm font-bold text-[#a47148] transition hover:bg-[#fff3e6]"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card-sheen rounded-[1.75rem] border border-[#a47148]/15 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(44,30,20,0.3)] sm:rounded-[2rem]"
    >
      <h3 className="font-display text-3xl font-medium tracking-tight text-slate-900">Kirim Pesan Cepat</h3>
      <p className="mt-2 text-sm text-slate-500">
        Isi form di bawah, dan kami lanjutkan obrolan langsung via WhatsApp.
      </p>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="cf-name" className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Nama Lengkap
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            aria-invalid={!!errors.name}
            className={`w-full rounded-2xl border bg-[#fbf7f1] px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#a47148]/25 placeholder:text-slate-400 ${
              errors.name ? "border-red-400" : "border-[#eadcc9] focus:border-[#a47148]"
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-xs font-semibold text-red-500">
              <Warning2 size={13} variant="Bulk" /> {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="cf-wa" className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Nomor WhatsApp
          </label>
          <input
            id="cf-wa"
            type="tel"
            inputMode="numeric"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="0812xxxxxxxx"
            aria-invalid={!!errors.whatsapp}
            className={`w-full rounded-2xl border bg-[#fbf7f1] px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#a47148]/25 placeholder:text-slate-400 ${
              errors.whatsapp ? "border-red-400" : "border-[#eadcc9] focus:border-[#a47148]"
            }`}
          />
          {errors.whatsapp && (
            <p className="flex items-center gap-1 text-xs font-semibold text-red-500">
              <Warning2 size={13} variant="Bulk" /> {errors.whatsapp}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="cf-msg" className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Pesan Anda <span className="font-semibold normal-case tracking-normal text-slate-400">(opsional)</span>
          </label>
          <textarea
            id="cf-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Ceritakan rencana project Anda..."
            className="w-full resize-none rounded-2xl border border-[#eadcc9] bg-[#fbf7f1] px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-[#a47148] focus:bg-white focus:ring-2 focus:ring-[#a47148]/25 placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-shine tap group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#c08a5c] via-[#a97650] to-[#8b5e3c] px-5 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_22px_50px_-14px_rgba(164,113,72,0.65)] transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {status === "submitting" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Mengirim...
              </>
            ) : (
              <>
                {targetNumber ? <Whatsapp size={18} variant="Bulk" /> : <MessageQuestion size={18} />}
                Kirim & Chat WhatsApp
              </>
            )}
          </span>
        </button>

        <p className="text-center text-xs text-slate-400">
          Data Anda aman dan hanya digunakan untuk menghubungi kembali.
        </p>
      </div>
    </form>
  );
}
