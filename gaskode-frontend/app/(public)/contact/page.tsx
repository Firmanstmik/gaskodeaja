import Link from "next/link";
import { ApiContactRepository } from "@/core/infrastructure/repositories/ApiContactRepository";
import { GetContactPageData } from "@/core/application/use-cases/GetContactPageData";
import { ArrowRight2, Call, Clock, Crown1, Location, MessageText1, Sms } from "iconsax-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const repo = new ApiContactRepository();
  const useCase = new GetContactPageData(repo);
  const data = await useCase.execute();
  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";
  const isExternalCta = data.hero.ctaLink?.startsWith("http");

  // Ambil nomor telepon/WhatsApp dari daftar kontak sebagai fallback form
  const phoneFromContacts = data.contacts
    .map((c) => c.value.replace(/[^0-9]/g, ""))
    .find((digits) => digits.length >= 10);

  return (
    <main className="bg-[#fbf7f1] text-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[#161310]" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${uri}/${data.hero.imagePath}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(10,8,7,0.92)_0%,rgba(10,8,7,0.74)_50%,rgba(10,8,7,0.35)_100%)]" />
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4] backdrop-blur">
            <Crown1 size={16} />
            Contact Us
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-7xl">
            {data.hero.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/75">{data.hero.subtitle}</p>
          {isExternalCta ? (
            <a
              href={data.hero.ctaLink}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </a>
          ) : (
            <Link
              href={data.hero.ctaLink || "/contact"}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </Link>
          )}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-7">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#A47148]">Start Conversation</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] md:text-5xl">{data.opening.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{data.opening.description[0]}</p>
            </div>

            <div className="space-y-4">
              {data.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-4 rounded-2xl border border-[#eadcc9] bg-white p-5">
                  <div className="rounded-xl bg-[#fff3e6] p-3 text-[#A47148]">{pickIcon(contact.icon)}</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{contact.label}</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-[#eadcc9] bg-white p-7">
              <h3 className="text-2xl font-black text-slate-900">{data.value.title}</h3>
              <ul className="mt-5 space-y-3">
                {data.value.description.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                    <MessageText1 size={16} variant="Bulk" className="mt-1 text-[#A47148]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm ctaLink={data.hero.ctaLink} fallbackNumber={phoneFromContacts} />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2.2rem] bg-[#161310] p-12 text-center text-white shadow-[0_28px_70px_rgba(18,13,9,0.28)]">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Final CTA</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-6xl">{data.closing.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{data.closing.description[0]}</p>
          {isExternalCta ? (
            <a
              href={data.hero.ctaLink}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              Mulai Sekarang
              <ArrowRight2 size={16} />
            </a>
          ) : (
            <Link
              href={data.hero.ctaLink || "/contact"}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition-all hover:-translate-y-1 hover:bg-[#8B5E3C]"
            >
              Mulai Sekarang
              <ArrowRight2 size={16} />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

function pickIcon(iconName: string) {
  const key = iconName.toLowerCase();
  if (key.includes("call")) return <Call size={20} variant="Bulk" />;
  if (key.includes("gmail") || key.includes("mail")) return <Sms size={20} variant="Bulk" />;
  if (key.includes("location")) return <Location size={20} variant="Bulk" />;
  if (key.includes("time")) return <Clock size={20} variant="Bulk" />;
  return <Call size={20} variant="Bulk" />;
}

