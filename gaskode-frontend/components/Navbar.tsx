'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight2, Category2, Code, CloseCircle, Mobile, MonitorMobbile, Profile2User, Ranking, ShieldTick } from 'iconsax-react';
import { ease } from '@/lib/design-tokens';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        { name: 'Website Development', icon: <MonitorMobbile size={19} variant="Bulk" />, path: '/service' },
        { name: 'Web App & Dashboard', icon: <Code size={19} variant="Bulk" />, path: '/service' },
        { name: 'Mobile App', icon: <Mobile size={19} variant="Bulk" />, path: '/service' },
      ],
    },
    {
      title: 'Growth & Optimization',
      items: [
        { name: 'SEO & Performance', icon: <Ranking size={19} variant="Bulk" />, path: '/service' },
        { name: 'Maintenance Support', icon: <ShieldTick size={19} variant="Bulk" />, path: '/service' },
        { name: 'UI/UX Revamp', icon: <Category2 size={19} variant="Bulk" />, path: '/service' },
      ],
    },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-4'
      } px-4 sm:px-5`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border bg-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl transition-all duration-500 md:px-5 ${
          scrolled
            ? 'border-[#ece0d0] px-4 py-1.5 shadow-[0_20px_50px_-24px_rgba(43,28,17,0.35),inset_0_1px_0_rgba(255,255,255,0.7)]'
            : 'border-[#ece0d0]/70 px-4 py-2.5 shadow-[0_12px_30px_-20px_rgba(43,28,17,0.2),inset_0_1px_0_rgba(255,255,255,0.7)]'
        }`}
      >
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
              className={`group flex items-center gap-1 py-3 text-sm font-semibold transition-colors hover:text-brand ${
                pathname.startsWith('/service') ? 'text-brand' : 'text-slate-700'
              }`}
            >
              Services
              <ArrowRight2 size={14} className={`rotate-90 transition-transform ${showMega ? 'translate-x-0.5' : ''}`} />
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 group-hover:scale-x-100 ${
                  pathname.startsWith('/service') ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
            <AnimatePresence>
              {showMega && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.32, ease }}
                  className="absolute left-[-140px] top-full z-[80] mt-4 w-[620px] origin-top overflow-hidden rounded-[1.75rem] border border-[#eadccb] bg-white/95 shadow-[0_32px_80px_rgba(29,19,12,0.18)] backdrop-blur"
                >
                  <div className="grid grid-cols-[0.85fr_1.4fr]">
                    {/* Left rail — group switcher */}
                    <div className="space-y-1.5 border-r border-[#eadccb]/70 bg-[#fdf8f2] p-4">
                      {serviceGroups.map((group, i) => (
                        <button
                          key={group.title}
                          type="button"
                          onMouseEnter={() => setActiveGroup(i)}
                          className={`w-full rounded-xl px-4 py-3.5 text-left text-[13px] font-bold uppercase tracking-[0.06em] transition-colors ${
                            activeGroup === i ? 'bg-brand text-white shadow-[0_10px_24px_-8px_rgba(164,113,72,0.5)]' : 'text-slate-500 hover:bg-white hover:text-brand-dark'
                          }`}
                        >
                          {group.title}
                        </button>
                      ))}
                    </div>
                    {/* Right pane — active group's cards */}
                    <div className="p-5">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeGroup}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.22, ease }}
                          className="grid grid-cols-1 gap-1.5"
                        >
                          {serviceGroups[activeGroup].items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.path}
                              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#fff2e5] hover:text-brand-dark"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                                {item.icon}
                              </span>
                              {item.name}
                              <ArrowRight2 size={13} className="ml-auto -translate-x-1 text-brand opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                      <Link
                        href="/contact"
                        className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-br from-ink to-[#332417] px-5 py-4 text-white transition hover:-translate-y-0.5"
                      >
                        <span className="text-sm font-black leading-snug">Build platform profesional dengan desain yang benar-benar premium</span>
                        <ArrowRight2 size={16} className="shrink-0 text-brand-tint" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {menuItems.map((item) => {
            const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`group relative py-3 text-sm font-semibold transition-colors hover:text-brand ${
                  isActive ? 'text-brand' : 'text-slate-600'
                }`}
              >
                {item.name}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:block">
          <Button href="/contact" full={false} size="sm">
            Konsultasi Gratis
          </Button>
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className="z-[60] text-brand md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
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

        {/* MOBILE BOTTOM-SHEET MENU */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[55] bg-ink/50 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.45, ease }}
                className="pb-safe fixed inset-x-0 bottom-0 z-[56] max-h-[85vh] overflow-y-auto rounded-t-[2rem] border-t border-[#eadccb] bg-[#fffaf3] px-5 pt-3 shadow-[0_-20px_60px_rgba(29,19,12,0.25)] md:hidden"
              >
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#eadccb]" />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu"
                  className="absolute right-5 top-5 text-brand/70"
                >
                  <CloseCircle size={22} variant="Bulk" />
                </button>

                <p className="mb-3 mt-2 text-xs font-black uppercase tracking-[0.2em] text-brand">Layanan</p>
                <div className="mb-6 grid grid-cols-1 gap-1.5 rounded-2xl border border-[#eadccb] bg-white p-2">
                  {serviceGroups.flatMap((g) => g.items).map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#fff3e0]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mb-6 flex flex-col gap-1">
                  {menuItems.map((item) => {
                    const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
                    return (
                      <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`rounded-xl px-3 py-3 text-lg font-semibold transition hover:bg-white hover:text-brand ${
                          isActive ? 'bg-white text-brand' : 'text-[#171310]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mb-6 flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-[0_16px_36px_-10px_rgba(164,113,72,0.55)]"
                >
                  <Profile2User size={16} />
                  Konsultasi Gratis
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
