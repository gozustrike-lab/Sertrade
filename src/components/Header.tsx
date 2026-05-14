'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';

/* =============================================
   NAV ITEMS — Centered menu
   ============================================= */
const navItems = [
  { href: '/', label: 'INICIO', id: 'home' },
  { href: '/servicios', label: 'SERVICIOS', id: 'servicios' },
  { href: '/proyectos', label: 'PORTAFOLIO', id: 'proyectos' },
];

/* =============================================
   HEXAGONAL LOGO SVG (reusable)
   ============================================= */
function HexLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <polygon points="32,4 56.6,18 56.6,46 32,60 7.4,46 7.4,18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="19" y1="11" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="11" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="53" x2="45" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="53" x2="19" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="32" x2="51" y2="32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <polygon points="32,22 40.4,26.5 40.4,37.5 32,42 23.6,37.5 23.6,26.5" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  /* =============================================
     SCROLL LISTENER
     ============================================= */
  useEffect(() => {
    setScrolled(window.scrollY > 50);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  /* =============================================
     DYNAMIC STYLES
     ============================================= */
  const headerBg = scrolled
    ? 'bg-[rgba(0,70,145,0.85)] backdrop-blur-[14px] shadow-[0_4px_30px_rgba(0,0,0,0.15)]'
    : 'bg-transparent shadow-none';

  const logoSizePC = scrolled ? 34 : 40;
  const logoSizeMobile = scrolled ? 28 : 34;

  return (
    <>
      {/* =============================================
          MAIN NAVBAR — Logo LEFT, Nav CENTER, Hamburger RIGHT
          ============================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-[400ms] ease-in-out ${headerBg}`}
        style={{ height: scrolled ? '68px' : '80px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between">

          {/* ====== LOGO (LEFT) ====== */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 transition-all duration-[400ms] ease-in-out">
            <div className="transition-all duration-[400ms] ease-in-out" style={{ transform: `scale(${scrolled ? 0.85 : 1})` }}>
              <HexLogo size={logoSizePC} />
            </div>
            <div className="hidden sm:block transition-all duration-[400ms] ease-in-out">
              <span className="text-white font-bold text-[17px] tracking-wide leading-none group-hover:text-[#d4a017] transition-colors duration-300">
                SERTRADE
              </span>
              <span className="text-white/50 text-[9px] tracking-[0.22em] uppercase leading-none block mt-0.5">
                Design & Arquitectura
              </span>
            </div>
          </Link>

          {/* ====== PC/TABLET NAV (CENTER) ====== */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-[400ms] ease-in-out after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-[#d4a017] after:transition-all after:duration-[400ms] after:ease-in-out ${
                  isActive(item.href)
                    ? 'text-white after:w-full'
                    : 'text-white/80 hover:text-white hover:after:w-full'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ====== MOBILE HAMBURGER (RIGHT, <768px) ====== */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white p-2 rounded-[8px] hover:bg-white/15 transition-all duration-[400ms] ease-in-out"
            aria-label="Abrir menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* =============================================
          OFF-CANVAS MOBILE DRAWER
          ============================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[1001] bg-black/50 backdrop-blur-[8px] md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, bounce: 0 }}
              className="fixed top-0 right-0 z-[1002] w-[85vw] max-w-[360px] h-full md:hidden flex flex-col"
            >
              <div className="relative flex flex-col h-full bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]">

                {/* Close Button */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <HexLogo size={36} />
                    <span className="text-white font-bold text-base tracking-wide">SERTRADE</span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
                    aria-label="Cerrar menu"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Separator */}
                <div className="mx-6 h-px bg-white/10" />

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-6 flex flex-col">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 + i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between py-4 border-b border-white/[0.06] text-lg font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-[#d4a017]'
                            : 'text-white hover:text-[#d4a017] hover:pl-2'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-200" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom Section */}
                <div className="px-6 pb-8 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
                  >
                    <a
                      href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola Sertrade Design, vi su página web y me gustaría recibir asesoría sobre sus servicios de arquitectura.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2.5 w-full py-[15px] bg-[#d4a017] text-[#003466] rounded-full text-[15px] font-bold tracking-wide hover:bg-[#e0b030] transition-all duration-300 shadow-lg shadow-[#d4a017]/20 hover:shadow-xl hover:scale-[1.02]"
                    >
                      CONTÁCTANOS
                      <ArrowRight size={18} strokeWidth={2} />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.38 }}
                    className="space-y-2.5 pt-2"
                  >
                    <a href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, quiero información sobre sus servicios.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors">
                      <Phone size={14} strokeWidth={1.5} />
                      <span>+51 944 106 163</span>
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
