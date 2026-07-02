'use client';
import React from 'react';
import Link from 'next/link';
import {
  Mail, Phone, MapPin,
  ArrowRight, MessageSquare, ArrowUpRight,
} from 'lucide-react';

// Custom Social Icons agar tidak error
const Instagram = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Github = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

import { Footer as FooterEntity } from '@/core/domain/entities/Footer';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const SERVICE_LINKS = [
  'Pembuatan Website',
  'Web App & Dashboard',
  'Aplikasi Mobile',
  'SEO & Performance',
  'UI/UX Design',
];

export default function Footer({ data }: { data: FooterEntity }) {
  if (!data) return null;

  const currentYear = new Date().getFullYear();
  const waNumber = data.phone?.replace(/[^0-9]/g, '');

  return (
    <footer className="relative overflow-hidden bg-[#161310] px-6 pb-10 pt-20 text-white/70">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[#a47148]/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a47148]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 lg:grid-cols-12">

          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <span className="text-2xl font-black tracking-tight text-white">
              {data.brandName}
            </span>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              {data.shortDescription}
            </p>
            <div className="flex gap-3">
              <SocialIcon link={data.socialLinks?.instagram} label="Instagram" icon={<Instagram />} />
              <SocialIcon link={data.socialLinks?.github} label="GitHub" icon={<Github />} />
              <SocialIcon link={data.socialLinks?.linkedin} label="LinkedIn" icon={<Linkedin />} />
              <SocialIcon link={data.socialLinks?.facebook} label="Facebook" icon={<Facebook />} />
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5 lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Navigasi</h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((item) => (
                <FooterLink key={item.label} href={item.href} label={item.label} />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5 lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Layanan Kami</h4>
            <ul className="space-y-3 text-sm">
              {SERVICE_LINKS.map((label) => (
                <FooterLink key={label} href="/service" label={label} />
              ))}
            </ul>
          </div>

          {/* Contact + CTA */}
          <div className="space-y-5 lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#f3c9a4]">Hubungi Kami</h4>
            <div className="space-y-3.5 text-sm">
              {data.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-[#a47148]" />
                  <span className="text-white/60">{data.address}</span>
                </div>
              )}
              {data.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-white/60 transition-colors hover:text-white">
                  <Mail size={17} className="shrink-0 text-[#a47148]" />
                  <span>{data.email}</span>
                </a>
              )}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-[#a47148]" />
                  <span className="text-white/60">{data.phone}</span>
                </div>
              )}
            </div>

            {waNumber && (
              <Link
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a47148] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(164,113,72,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#8b5e3c]"
              >
                <MessageSquare size={17} />
                <span>Konsultasi via WhatsApp</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-medium tracking-wide text-white/50">
            {data.copyrightText || `© ${currentYear} ${data.brandName}. All rights reserved.`}
          </p>
          <div className="flex items-center gap-6 text-xs font-semibold text-white/50">
            <Link href="/about" className="transition-colors hover:text-white">Tentang</Link>
            <Link href="/service" className="transition-colors hover:text-white">Layanan</Link>
            <Link href="/contact" className="transition-colors hover:text-white">Kontak</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ link, icon, label }: { link: string | undefined; icon: React.ReactNode; label: string }) {
  if (!link) return null;
  return (
    <Link
      href={link}
      target="_blank"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-[#a47148]/50 hover:bg-[#a47148]/20 hover:text-white"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-white"
      >
        <ArrowUpRight size={14} className="text-[#a47148] opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        <span className="-ml-4 transition-all group-hover:ml-0">{label}</span>
      </Link>
    </li>
  );
}
