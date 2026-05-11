'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Inicio', id: 'home' },
  { href: '/servicios', label: 'Servicios', id: 'servicios' },
  { href: '/proyectos', label: 'Proyectos', id: 'proyectos' },
];

const slideEasing = [0.4, 0, 0.2, 1] as const;

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#004691] shadow-lg shadow-[#004691]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between h-[64px]">

          {/* Logo */}
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
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white p-2 rounded-[8px] hover:bg-white/15 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ============================================
          OFF-CANVAS MOBILE MENU (Slide-in from Right)
          ============================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop — blur + dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: slideEasing }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[8px] md:hidden"
            />

            {/* Menu Panel — slides from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: slideEasing }}
              className="fixed top-0 right-0 z-[70] w-[85vw] max-w-[360px] h-full md:hidden flex flex-col"
            >
              {/* Panel Background */}
              <div className="relative flex flex-col h-full bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]">

                {/* Close Button */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 flex items-center justify-center">
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
                    <span className="text-white font-bold text-base tracking-wide">Sertrade</span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
                    aria-label="Cerrar menu"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Thin separator */}
                <div className="mx-6 h-px bg-white/10" />

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-6 flex flex-col">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: slideEasing, delay: 0.1 + i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between py-4 border-b border-white/[0.06] text-lg font-bold tracking-[0.02em] transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-[#d4a017]'
                            : 'text-white hover:text-[#d4a017] hover:pl-2'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={18} strokeWidth={1.5} className={`transition-transform duration-200 ${isActive(item.href) ? 'translate-x-1 text-[#d4a017]' : 'opacity-0 group-hover:opacity-100'}`} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom CTA Section */}
                <div className="px-6 pb-8 space-y-4">
                  {/* CTA Button — pill shaped */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: slideEasing, delay: 0.35 }}
                  >
                    <Link
                      href="/proyectos"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2.5 w-full py-[15px] bg-[#d4a017] text-[#003466] rounded-full text-[15px] font-bold tracking-wide hover:bg-[#e0b030] transition-all duration-300 shadow-lg shadow-[#d4a017]/20 hover:shadow-xl hover:scale-[1.02]"
                    >
                      Ver Proyectos
                      <ArrowRight size={18} strokeWidth={2} />
                    </Link>
                  </motion.div>

                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: slideEasing, delay: 0.42 }}
                    className="space-y-2.5 pt-2"
                  >
                    <a href="tel:+51123456789" className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors">
                      <Phone size={14} strokeWidth={1.5} />
                      <span>+51 (01) 234-5678</span>
                    </a>
                    <a href="mailto:info@sertradedesign.com" className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors">
                      <Mail size={14} strokeWidth={1.5} />
                      <span>info@sertradedesign.com</span>
                    </a>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
