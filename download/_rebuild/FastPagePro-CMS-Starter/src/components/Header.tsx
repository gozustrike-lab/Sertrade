'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
  { href: '/', label: 'INICIO', id: 'home' },
  { href: '/servicios', label: 'SERVICIOS', id: 'servicios' },
  { href: '/proyectos', label: 'PORTAFOLIO', id: 'proyectos' },
];

function BrandLogo({ className = '', white = false }: { className?: string; white?: boolean }) {
  return (
    <img src={white ? '/logo-white.svg' : '/logo.svg'} alt="Logo" className={`object-contain block ${className}`} />
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const closeMobileMenu = useCallback(() => { setMobileMenuOpen(false); }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 50);
    const h = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const id = setTimeout(closeMobileMenu, 0);
    return () => clearTimeout(id);
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const headerBg = scrolled
    ? 'bg-[var(--brand-primary,#004691)]/75 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.12)]'
    : 'bg-transparent shadow-none border-b border-transparent';
  const logoHeightPC = scrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-12';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-[400ms] ease-in-out ${headerBg}`}
        style={{ height: scrolled ? '68px' : '80px', WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <motion.div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--brand-accent,#D4AF37)] origin-left z-50" style={{ scaleX }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <BrandLogo className={logoHeightPC} white />
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-bold text-[17px] tracking-wide leading-none group-hover:text-[var(--brand-accent,#d4a017)] transition-colors">TU MARCA</span>
              <span className="text-white/50 text-[9px] tracking-[0.22em] uppercase leading-none block mt-0.5">Tu Eslogan Aqui</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href}
                className={`relative px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.15em] transition-all after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-[var(--brand-accent,#D4AF37)] after:transition-all ${isActive(item.href) ? 'text-white after:w-full' : 'text-white/80 hover:text-white hover:after:w-full'}`}
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>{item.label}</Link>
            ))}
          </nav>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white p-2 rounded-[8px] hover:bg-white/15" aria-label="Menu"><Menu size={24} strokeWidth={1.5} /></button>
        </div>
      </header>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMobileMenu} className="fixed inset-0 z-[1001] bg-black/50 backdrop-blur-[8px] md:hidden" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 z-[1002] w-[85vw] max-w-[360px] h-full md:hidden flex flex-col">
              <div className="relative flex flex-col h-full bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]">
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                  <div className="flex items-center gap-2.5"><BrandLogo className="h-9" white /><span className="text-white font-bold text-base">TU MARCA</span></div>
                  <button onClick={closeMobileMenu} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><X size={20} strokeWidth={1.5} /></button>
                </div>
                <div className="mx-6 h-px bg-white/10" />
                <nav className="flex-1 px-6 py-4 flex flex-col">
                  {navItems.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 + i * 0.06 }}>
                      <Link href={item.href} onClick={closeMobileMenu} className={`flex items-center justify-between py-4 border-b border-white/[0.06] text-lg font-bold tracking-[0.12em] uppercase ${isActive(item.href) ? 'text-[var(--brand-accent,#d4a017)]' : 'text-white hover:text-[var(--brand-accent,#d4a017)]'}`}>
                        <span>{item.label}</span><ArrowRight size={18} strokeWidth={1.5} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="px-6 pb-8">
                  <a href="#contacto" onClick={closeMobileMenu} className="flex items-center justify-center gap-2.5 w-full py-[15px] bg-[var(--brand-accent,#D4AF37)] text-[var(--brand-dark,#003466)] rounded-full text-[15px] font-bold">CONTACTANOS <ArrowRight size={18} strokeWidth={2} /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
