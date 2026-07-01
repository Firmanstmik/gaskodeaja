'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, 
  ArrowRight, Globe, MessageSquare 
} from 'lucide-react';

// Custom Social Icons agar tidak error
const Instagram = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Github = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

import { Footer as FooterEntity } from '@/core/domain/entities/Footer';

export default function Footer({ data }: { data: FooterEntity }) {
  if (!data) return null;

  return (
    <footer className="bg-[#A47148] text-slate-300 pt-20 pb-10 px-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Globe className="text-[#A47148]" size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                {data.brandName} {/* Pakai brandName sesuai Entity */}
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              {data.shortDescription} {/* Pakai shortDescription */}
            </p>
            <div className="flex gap-4">
              <SocialIcon link={data.socialLinks?.instagram} icon={<Instagram />} />
              <SocialIcon link={data.socialLinks?.github} icon={<Github />} />
              <SocialIcon link={data.socialLinks?.linkedin} icon={<Linkedin />} />
              <SocialIcon link={data.socialLinks?.facebook} icon={<Facebook />} />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Layanan Kami</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink label="Pembuatan Website" />
              <FooterLink label="Aplikasi Mobile" />
              <FooterLink label="Digital Marketing" />
              <FooterLink label="UI/UX Design" />
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Hubungi Kami</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-50 shrink-0" />
                <span>{data.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-50 shrink-0" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-50 shrink-0" />
                <span>{data.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Konsultasi Gratis</h4>
            <p className="text-sm opacity-80 italic">Mari diskusikan ide Anda.</p>
            <Link 
              href={`https://wa.me/${data.phone?.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 bg-white hover:bg-orange-100 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all group"
            >
              <MessageSquare size={18} />
              <span>Gas WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-orange-50 text-md font-medium tracking-widest text-orange-50 text-center">
          <p>{data.copyrightText}</p> {/* Pakai copyrightText */}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ link, icon }: { link: string | undefined; icon: any }) {
  if (!link) return null;
  return (
    <Link 
      href={link} 
      target="_blank" 
      className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 text-slate-500 hover:bg-amber-100 hover:text-slate-600 transition-all shadow-lg"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <Link href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {label}
      </Link>
    </li>
  );
}