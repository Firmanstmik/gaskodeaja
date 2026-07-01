'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  path: string;
  subMenu?: SubMenuItem[];
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // 1. Update daftar menu dengan properti subMenu
  const menuItems: MenuItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Service',
      path: '/service',
      subMenu: [
        { name: 'Web Development', path: '/service/web-dev' },
        { name: 'Mobile Apps', path: '/service/mobile-apps' },
        { name: 'UI/UX Design', path: '/service/ui-ux' },
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    {
      name: 'Blog',
      path: '/blog',
      subMenu: [
        { name: 'Tech News', path: '/blog/tech' },
        { name: 'Tutorial', path: '/blog/tutorial' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#fff3e0] px-6 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 z-[60]">
          <Image
            src="/logo-gaskodeaja.png"
            alt="GasKode Logo"
            width={75}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.subMenu && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.path}
                aria-haspopup={item.subMenu ? "true" : "false"}
                aria-expanded={activeDropdown === item.name}
                className="flex items-center gap-1 text-gray-600 hover:text-[#A47148] transition-colors font-medium py-4"
              >
                {item.name}
                {item.subMenu && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-hover:rotate-180 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                )}
              </Link>

              {/* DROPDOWN DESKTOP */}
              {item.subMenu && activeDropdown === item.name && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 flex flex-col animate-in fade-in slide-in-from-top-2">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.path}
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-[#fff3e0] hover:text-[#A47148] transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:block">
          <Link
            href="/consultation"
            className="bg-[#A47148] text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#8B5E3C] transition-all shadow-md group"
          >
            <span className="text-sm font-semibold">Konsultasi Gratis</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden z-[60] text-[#A47148]"
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
          {menuItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2">
                <Link
                  href={item.path}
                  onClick={() => !item.subMenu && setIsOpen(false)}
                  className="text-xl text-gray-700 font-medium hover:text-[#A47148]"
                >
                  {item.name}
                </Link>
                {item.subMenu && (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="p-2 text-[#A47148]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                )}
              </div>

              {/* MOBILE SUBMENU */}
              {item.subMenu && activeDropdown === item.name && (
                <div className="flex flex-col items-center gap-3 bg-[#fbe9d1] w-full py-4 transition-all">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg text-gray-600 hover:text-[#A47148]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/consultation"
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-[#A47148] text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Konsultasi Gratis
          </Link>
        </div>

      </div>
    </nav>
  );
};