'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight2, Category2, Code, Mobile, MonitorMobbile, Profile2User, Ranking, ShieldTick } from 'iconsax-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceGroups = [
    {
      title: 'Product Engineering',
      items: [
        { name: 'Website Development', icon: <MonitorMobbile size={17} variant="Bulk" />, path: '/service' },
        { name: 'Web App & Dashboard', icon: <Code size={17} variant="Bulk" />, path: '/service' },
        { name: 'Mobile App', icon: <Mobile size={17} variant="Bulk" />, path: '/service' },
      ],
    },
    {
      title: 'Growth & Optimization',
      items: [
        { name: 'SEO & Performance', icon: <Ranking size={17} variant="Bulk" />, path: '/service' },
        { name: 'Maintenance Support', icon: <ShieldTick size={17} variant="Bulk" />, path: '/service' },
        { name: 'UI/UX Revamp', icon: <Category2 size={17} variant="Bulk" />, path: '/service' },
      ],
    },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full border-b border-[#eadcc9] bg-[#fbf7f1]/90 px-5 py-3 shadow-[0_16px_40px_rgba(31,20,14,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[#ece0d0] bg-white/75 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:px-5">

        {/* LOGO */}
        <Link href="/" className="z-[60] flex items-center gap-2">
          <Image
            src="/logo-gaskodeaja.png"
            alt="GasKode Logo"
            width={75}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setShowMega(true)}
            onMouseLeave={() => setShowMega(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 py-3 text-sm font-semibold text-slate-700 transition-colors hover:text-[#A47148]"
            >
              Services
              <ArrowRight2 size={14} className={`rotate-90 transition-transform ${showMega ? 'translate-x-0.5' : ''}`} />
            </button>
            {showMega && (
              <div className="absolute left-[-180px] top-full z-[80] mt-4 w-[780px] rounded-3xl border border-[#eadccb] bg-white/95 p-6 shadow-[0_28px_70px_rgba(29,19,12,0.16)] backdrop-blur">
                <div className="grid grid-cols-[1fr_1fr_1.1fr] gap-6">
                  {serviceGroups.map((group) => (
                    <div key={group.title}>
                      <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#a47148]">{group.title}</p>
                      <div className="space-y-2">
                        {group.items.map((item) => (
                          <Link key={item.name} href={item.path} className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#fff2e5] hover:text-[#8B5E3C]">
                            <span className="text-[#a47148]">{item.icon}</span>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-[#eadccb] bg-gradient-to-br from-[#161310] to-[#332417] p-5 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f3c9a4]">Premium Delivery</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight">Build platform profesional dengan desain yang benar-benar premium</h3>
                    <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#8B5E3C]">
                      Konsultasi Sekarang
                      <ArrowRight2 size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.path}
                className="flex items-center gap-1 py-3 text-sm font-semibold text-slate-600 transition-colors hover:text-[#A47148]"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group flex items-center gap-2 rounded-full bg-[#A47148] px-6 py-2.5 text-white shadow-[0_12px_30px_rgba(164,113,72,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B5E3C]"
          >
            <span className="text-sm font-semibold">Konsultasi Gratis</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className="z-[60] text-[#A47148] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* MOBILE MENU OVERLAY */}
        <div className={`
          fixed inset-0 bg-[#fff3e0] z-[50] flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-in-out md:hidden overflow-y-auto
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}>
          <div className="w-full max-w-sm rounded-3xl border border-[#eadccb] bg-white p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#a47148]">Services</p>
            {serviceGroups.flatMap((g) => g.items).map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-[#fff3e0]"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          {menuItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center w-full">
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-700 font-medium hover:text-[#A47148]"
              >
                {item.name}
              </Link>
            </div>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#A47148] px-8 py-3 font-semibold text-white shadow-lg"
          >
            <Profile2User size={16} />
            Konsultasi Gratis
          </Link>
        </div>

      </div>
    </nav>
  );
};