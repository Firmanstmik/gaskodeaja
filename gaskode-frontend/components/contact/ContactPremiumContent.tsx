"use client";

import { motion } from "framer-motion";
import { ArrowRight2, Call, Clock, Crown1, Location, MessageText1, Sms } from "iconsax-react";
import { ContactEntity } from "@/core/domain/entities/ContactEntity";
import { Button } from "@/components/ui/Button";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { revealItem, revealSection, revealStagger } from "@/lib/design-tokens";
import { ContactForm } from "./ContactForm";

function pickIcon(iconName: string) {
  const key = iconName.toLowerCase();
  if (key.includes("call")) return <Call size={20} variant="Bulk" />;
  if (key.includes("gmail") || key.includes("mail")) return <Sms size={20} variant="Bulk" />;
  if (key.includes("location")) return <Location size={20} variant="Bulk" />;
  if (key.includes("time")) return <Clock size={20} variant="Bulk" />;
  return <Call size={20} variant="Bulk" />;
}

type ContactPremiumContentProps = {
  data: ContactEntity;
  uri: string;
};

export function ContactPremiumContent({ data, uri }: ContactPremiumContentProps) {
  const heroImage = `${uri}/${data.hero.imagePath}`;
  const phoneFromContacts = data.contacts
    .map((c) => c.value.replace(/[^0-9]/g, ""))
    .find((digits) => digits.length >= 10);

  return (
    <main className="bg-[#fbf7f1] text-slate-900">
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-[#100d0a]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(164,113,72,0.28)_0%,rgba(16,13,10,0)_45%),linear-gradient(115deg,rgba(12,10,8,0.98)_0%,rgba(12,10,8,0.86)_46%,rgba(12,10,8,0.5)_100%)]" />
        <div className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
        <div className="animate-float-slow pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/15 blur-[130px] [animation-delay:-4s]" />

        <motion.div initial="hidden" animate="show" variants={revealStagger} className="mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32">
          <motion.p variants={revealItem} className="mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f3c9a4] backdrop-blur sm:text-[11px] sm:tracking-[0.28em]">
              <Crown1 size={14} className="text-[#f3c9a4]" variant="Bulk" />
              Contact Us
            </span>
          </motion.p>
          <motion.h1
            variants={revealItem}
            className="max-w-5xl text-balance font-display text-[2.7rem] font-light leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
          >
            {data.hero.title}
          </motion.h1>
          <motion.p variants={revealItem} className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.hero.subtitle}
          </motion.p>
          <motion.div variants={revealItem} className="mt-9">
            <Button href={data.hero.ctaLink || "/contact"} full={false}>
              {data.hero.ctaText}
              <ArrowRight2 size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────── DETAILS + FORM ─────────────────────── */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={revealStagger} className="space-y-7">
            <motion.div variants={revealItem}>
              <SectionKicker>Start Conversation</SectionKicker>
              <h2 className="mt-5 text-balance font-display text-[2.1rem] font-light leading-[1.05] tracking-[-0.02em] text-[#100d0a] sm:text-4xl md:text-5xl">
                {data.opening.title}
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">{data.opening.description[0]}</p>
            </motion.div>

            <div className="space-y-4">
              {data.contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  variants={revealItem}
                  className="tap flex items-center gap-4 rounded-2xl border border-[#a47148]/15 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#a47148]/35 hover:shadow-[0_18px_40px_-28px_rgba(43,28,17,0.4)]"
                >
                  <div className="rounded-xl bg-[#fff3e6] p-3 text-[#a47148]">{pickIcon(contact.icon)}</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{contact.label}</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={revealItem} className="card-sheen rounded-[1.75rem] border border-[#a47148]/15 bg-white p-7">
              <h3 className="font-display text-2xl font-medium text-slate-900">{data.value.title}</h3>
              <ul className="mt-5 space-y-3">
                {data.value.description.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                    <MessageText1 size={16} variant="Bulk" className="mt-1 shrink-0 text-[#a47148]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm ctaLink={data.hero.ctaLink} fallbackNumber={phoneFromContacts} />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={revealSection}
        className="px-5 pb-16 sm:px-6 sm:pb-24 lg:pb-28"
      >
        <div className="grain relative isolate mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] bg-[#100d0a] px-6 py-14 text-center text-white shadow-[0_50px_100px_-40px_rgba(18,13,9,0.8)] sm:rounded-[2.6rem] sm:px-8 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#a47148]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-80 w-80 rounded-full bg-[#f3c9a4]/12 blur-[130px]" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3c9a4]">Final CTA</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">
            {data.closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {data.closing.description[0]}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={data.hero.ctaLink || "/contact"} full={false}>
              Mulai Sekarang
              <ArrowRight2 size={16} />
            </Button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
