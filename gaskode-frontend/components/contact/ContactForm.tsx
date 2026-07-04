"use client";

import { useState } from "react";
import { MessageQuestion, TickCircle, Warning2, Whatsapp } from "iconsax-react";
import { Magnetic } from "@/components/ui/Magnetic";

type Status = "idle" | "submitting" | "success" | "error";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8006/api";

export function ContactForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});

  const targetNumber = "6281236893055"; // Hardcoded default based on request

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
      `Halo Tim GasKodeAja Studio,\n\nPerkenalkan saya ${name}, menghubungi dari nomor ${whatsapp}.\n\n${
        message || "Saya tertarik untuk berkonsultasi mengenai layanan pembuatan platform digital dan ingin berdiskusi lebih lanjut."
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
      <div className="glass-dark corner-frame flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-white/10 p-10 text-center shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:rounded-[2rem]">
        <span aria-hidden data-pos="tl" className="corner-frame-mark text-[#f3c9a4]/60" />
        <span aria-hidden data-pos="br" className="corner-frame-mark text-[#f3c9a4]/60" />
        <div className="mb-5 inline-flex rounded-2xl bg-emerald-400/15 p-4 text-emerald-300">
          <TickCircle size={34} variant="Bulk" />
        </div>
        <h3 className="font-display text-2xl font-medium tracking-tight text-white">Pesan Anda Terkirim!</h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-white/60">
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
          className="tap mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-[#f3c9a4] transition hover:bg-white/[0.06]"
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
      className="glass-dark corner-frame relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 p-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:rounded-[2rem]"
    >
      <span aria-hidden data-pos="tl" className="corner-frame-mark text-[#f3c9a4]/60" />
      <span aria-hidden data-pos="br" className="corner-frame-mark text-[#f3c9a4]/60" />
      <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-[#a47148]/25 blur-[110px]" />

      <h3 className="font-display text-3xl font-medium tracking-tight text-white">Kirim Pesan Cepat</h3>
      <p className="mt-2 text-sm text-white/50">
        Isi form di bawah, dan kami lanjutkan obrolan langsung via WhatsApp.
      </p>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="cf-name" className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
            Nama Lengkap
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            aria-invalid={!!errors.name}
            className={`w-full rounded-2xl border bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f3c9a4]/25 placeholder:text-white/30 ${
              errors.name ? "border-red-400/60" : "border-white/15 focus:border-[#f3c9a4]/60"
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-xs font-semibold text-red-300">
              <Warning2 size={13} variant="Bulk" /> {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="cf-wa" className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
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
            className={`w-full rounded-2xl border bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f3c9a4]/25 placeholder:text-white/30 ${
              errors.whatsapp ? "border-red-400/60" : "border-white/15 focus:border-[#f3c9a4]/60"
            }`}
          />
          {errors.whatsapp && (
            <p className="flex items-center gap-1 text-xs font-semibold text-red-300">
              <Warning2 size={13} variant="Bulk" /> {errors.whatsapp}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="cf-msg" className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
            Pesan Anda <span className="font-semibold normal-case tracking-normal text-white/30">(opsional)</span>
          </label>
          <textarea
            id="cf-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Ceritakan rencana project Anda..."
            className="w-full resize-none rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#f3c9a4]/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#f3c9a4]/25 placeholder:text-white/30"
          />
        </div>

        <Magnetic className="w-full">
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
        </Magnetic>

        <p className="text-center text-xs text-white/40">
          Data Anda aman dan hanya digunakan untuk menghubungi kembali.
        </p>
      </div>
    </form>
  );
}
