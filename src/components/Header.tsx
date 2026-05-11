'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio', id: 'home' },
  { href: '/servicios', label: 'Servicios', id: 'servicios' },
  { href: '/proyectos', label: 'Proyectos', id: 'proyectos' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const id = setTimeout(closeMobileMenu, 0);
    return () => clearTimeout(id);
  }, [pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#004691] shadow-lg shadow-[#004691]/20 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between h-[64px]">

        {/* Logo — Left aligned, ~150px wide on desktop */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="32,4 56.6,18 56.6,46 32,60 7.4,46 7.4,18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
              <line x1="19" y1="11" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="11" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="19" y1="53" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="53" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="13" y1="32" x2="51" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <polygon points="32,22 40.4,26.5 40.4,37.5 32,42 23.6,37.5 23.6,26.5" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-[17px] tracking-wide leading-none group-hover:text-[#d4a017] transition-colors duration-300">
              Sertrade
            </span>
            <span className="text-white/50 text-[9px] tracking-[0.22em] uppercase leading-none block mt-0.5">
              Design & Arquitectura
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-5 py-2 rounded-[8px] text-[13px] font-medium tracking-wide transition-all duration-300 ${
                isActive(item.href)
                  ? 'bg-white text-[#004691] shadow-md'
                  : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/proyectos"
            className="px-5 py-2 bg-[#d4a017] text-[#003466] rounded-[8px] text-[13px] font-semibold hover:bg-[#e0b030] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]"
          >
            Ver Proyectos
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-[8px] hover:bg-white/15 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003466]/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-2">

            {/* Mobile Logo */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10"
            >
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="32,4 56.6,18 56.6,46 32,60 7.4,46 7.4,18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
                  <line x1="19" y1="11" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="45" y1="11" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="19" y1="53" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="45" y1="53" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="13" y1="32" x2="51" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="32,22 40.4,26.5 40.4,37.5 32,42 23.6,37.5 23.6,26.5" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-base tracking-wide">Sertrade</span>
                <span className="text-white/50 text-[9px] tracking-[0.22em] uppercase block">Design & Arquitectura</span>
              </div>
            </Link>

            {/* Nav Items */}
            {navItems.map((item, i) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={`px-4 py-3.5 rounded-[8px] text-left text-sm font-medium tracking-[0.04em] transition-all animate-fade-in-up ${
                  isActive(item.href)
                    ? 'bg-white text-[#004691] shadow-md'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
                style={{ animationDelay: `${0.05 * (i + 1)}s` }}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA */}
            <Link
              href="/proyectos"
              onClick={closeMobileMenu}
              className="mt-3 px-4 py-[15px] bg-[#d4a017] text-[#003466] rounded-[8px] text-sm font-semibold hover:bg-[#e0b030] transition-all text-center tracking-wide animate-fade-in-up"
              style={{ animationDelay: '0.25s' }}
            >
              Ver Proyectos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
