#!/bin/bash
# ============================================================
#  FastPagePro CMS Starter Kit — ZIP Builder
# ============================================================
set -euo pipefail

BASE="/home/z/my-project"
DST="$BASE/download/FastPagePro-CMS-Starter"
OUT="$BASE/download/FastPagePro-CMS-Starter-Kit.zip"
ADMIN_CATCHALL="$DST/src/app/admin/[[...tool]]"

# Clean
rm -rf "$DST"
mkdir -p "$DST"

echo "[1/5] Copying project files..."

# Config
cp "$BASE/package.json" "$DST/"
cp "$BASE/next.config.ts" "$DST/"
cp "$BASE/tsconfig.json" "$DST/"
cp "$BASE/postcss.config.mjs" "$DST/"
cp "$BASE/tailwind.config.ts" "$DST/"
cp "$BASE/eslint.config.mjs" "$DST/"
cp "$BASE/components.json" "$DST/"
cp "$BASE/public/robots.txt" "$DST/robots.txt" 2>/dev/null || true

# Sanity
mkdir -p "$DST/sanity/schemas" "$DST/sanity/lib"
cp "$BASE/sanity.config.ts" "$DST/"
cp "$BASE/sanity/schema.ts" "$DST/sanity/"
cp "$BASE/sanity/lib/constants.ts" "$DST/sanity/lib/"
cp "$BASE/sanity/lib/schema-master.ts" "$DST/sanity/lib/"
for f in "$BASE/sanity/schemas/"*.ts; do
  bn=$(basename "$f")
  cp "$f" "$DST/sanity/schemas/$bn" 2>/dev/null || true
done

# API routes
mkdir -p "$DST/src/app/api/draft-mode/enable" "$DST/src/app/api/draft-mode/disable"
cp "$BASE/src/app/api/draft-mode/enable/route.ts" "$DST/src/app/api/draft-mode/enable/"
cp "$BASE/src/app/api/draft-mode/disable/route.ts" "$DST/src/app/api/draft-mode/disable/"

# Admin page
mkdir -p "$ADMIN_CATCHALL"
cp "$BASE/src/app/admin/"'[[...tool]]'"/page.tsx" "$ADMIN_CATCHALL/"

# Lib
mkdir -p "$DST/src/lib" "$DST/src/hooks" "$DST/src/sanity"
cp "$BASE/src/lib/sanity.client.ts" "$DST/src/lib/"
cp "$BASE/src/lib/sanity.queries.ts" "$DST/src/lib/"
cp "$BASE/src/lib/fetchCMS.ts" "$DST/src/lib/"
cp "$BASE/src/lib/utils.ts" "$DST/src/lib/"
cp "$BASE/src/sanity/live.ts" "$DST/src/sanity/"

# Hooks
cp "$BASE/src/hooks/use-mobile.ts" "$DST/src/hooks/" 2>/dev/null || true
cp "$BASE/src/hooks/use-toast.ts" "$DST/src/hooks/" 2>/dev/null || true

echo "[2/5] Copying components..."
mkdir -p "$DST/src/components/ui"
for comp in VisualEditing LayoutShell ScrollReveal Counter StatCard FlipCard Lightbox ServiciosSection HomePage ServicesPage ProjectsPage LibroReclamaciones; do
  cp "$BASE/src/components/${comp}.tsx" "$DST/src/components/" 2>/dev/null || true
done
for ui in button card badge input textarea separator tooltip dialog sheet tabs accordion collapsible carousel select navigation-menu dropdown-menu scroll-area skeleton progress avatar switch label form checkbox radio-group slider toggle toggle-group popover hover-card sonner toaster toast alert alert-dialog aspect-ratio breadcrumb calendar chart command drawer menubar pagination resizable sidebar table; do
  cp "$BASE/src/components/ui/${ui}.tsx" "$DST/src/components/ui/" 2>/dev/null || true
done

echo "[3/5] Copying pages..."
mkdir -p "$DST/src/app/servicios" "$DST/src/app/proyectos" "$DST/src/app/libro-reclamaciones"
cp "$BASE/src/app/layout.tsx" "$DST/src/app/"
cp "$BASE/src/app/page.tsx" "$DST/src/app/"
cp "$BASE/src/app/globals.css" "$DST/src/app/"
cp "$BASE/src/app/servicios/page.tsx" "$DST/src/app/servicios/"
cp "$BASE/src/app/proyectos/page.tsx" "$DST/src/app/proyectos/"
cp "$BASE/src/app/libro-reclamaciones/page.tsx" "$DST/src/app/libro-reclamaciones/" 2>/dev/null || true
# Remove extra route
rm -f "$DST/src/app/api/route.ts" 2>/dev/null || true

echo "[4/5] Copying public assets..."
mkdir -p "$DST/public/fonts/poppins/files"
for f in "$BASE/public/fonts/poppins/files/"*.ttf; do
  bn=$(basename "$f")
  cp "$f" "$DST/public/fonts/poppins/files/$bn" 2>/dev/null || true
done
cp "$BASE/public/fonts/poppins/files/OFL.txt" "$DST/public/fonts/poppins/files/" 2>/dev/null || true
cp "$BASE/public/favicon.svg" "$DST/public/" 2>/dev/null || true
cp "$BASE/public/favicon.png" "$DST/public/" 2>/dev/null || true
cp "$BASE/public/apple-touch-icon.png" "$DST/public/" 2>/dev/null || true

# Placeholder logos
cat > "$DST/public/logo.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" fill="none">
  <rect width="200" height="40" rx="4" fill="#004691"/>
  <text x="100" y="26" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" fill="white">TU MARCA</text>
</svg>
SVGEOF

cat > "$DST/public/logo-white.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" fill="none">
  <text x="100" y="28" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" fill="white">TU MARCA</text>
</svg>
SVGEOF

cat > "$DST/public/favicon.svg" << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#004691"/>
  <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" fill="white">M</text>
</svg>
SVGEOF

# .env.example
cat > "$DST/.env.example" << 'ENVEOF'
# ============================================================
#  FastPagePro CMS Starter Kit — Environment Variables
#  Copy to .env.local and fill your values
# ============================================================
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token_here
NEXT_PUBLIC_SANITY_API_READ_TOKEN=your_read_token_here
NEXT_PUBLIC_COMPANY_NAME=Tu Empresa
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ENVEOF

cat > "$DST/.gitignore" << 'GIEOF'
node_modules/
.next/
.env.local
.env*.local
*.tsbuildinfo
next-env.d.ts
GIEOF

echo "[5/5] Overwriting with genericized components..."

# --- Generic Header ---
cat > "$DST/src/components/Header.tsx" << 'HEADEREOF'
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
HEADEREOF

# --- Generic Footer ---
cat > "$DST/src/components/Footer.tsx" << 'FOOTEREOF'
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Phone, MapPin, Send } from 'lucide-react';

const moreInfoLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];
const legalLinks = [
  { label: 'Politica de Privacidad', href: '/' },
  { label: 'Politica de Cookies', href: '/' },
  { label: 'Terminos y Condiciones', href: '/' },
];

export default function Footer({ siteSettings }: { siteSettings: any }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const company = siteSettings?.companyName || 'Tu Empresa';
  const phone = siteSettings?.phone || '';
  const whatsapp = siteSettings?.whatsapp || '';
  const address = siteSettings?.address || '';
  const description = siteSettings?.tagline || siteSettings?.slogan || '';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 4000); }
  };

  return (
    <footer className="bg-white relative" id="contacto">
      <section className="w-full">
        <div className="w-full bg-[var(--brand-primary,#004691)] text-white py-12 px-4 md:px-12">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center text-center py-10">
            <div className="flex flex-col items-center">
              <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3">Contacto</h4>
              {phone && (
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><Phone size={16} strokeWidth={1.5} className="text-[#D4AF37]" /></div>
                  <a href={whatsapp ? `https://wa.me/${whatsapp}` : `tel:${phone}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors">{phone}</a>
                </div>
              )}
              {siteSettings?.email && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><Send size={14} strokeWidth={1.5} className="text-[#D4AF37]" /></div>
                  <p className="text-sm font-semibold text-white">{siteSettings.email}</p>
                </div>
              )}
            </div>
            {address && (
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3"><MapPin size={18} strokeWidth={2} className="text-[#D4AF37]" /></div>
                <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2">Ubicacion</h4>
                <p className="text-white text-base md:text-lg font-black tracking-wide leading-snug max-w-[280px] uppercase">{address}</p>
              </div>
            )}
            <div className="flex items-center justify-center">
              <div className="w-24 h-24"><img src="/logo-white.svg" alt={company} className="w-full h-full object-contain" /></div>
            </div>
          </div>
        </div>
      </section>

      {siteSettings?.mapLatitude && siteSettings?.mapLongitude && (
        <section className="relative w-full">
          <div className="w-full h-[300px] sm:h-[350px] md:h-[450px]">
            <iframe src={`https://maps.google.com/maps?q=${siteSettings.mapLatitude},${siteSettings.mapLongitude}&z=${siteSettings.mapZoom || 15}&output=embed`} className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Ubicacion ${company}`} />
          </div>
        </section>
      )}

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 text-[11px] leading-tight">
            <div>
              <div className="flex items-center gap-2.5 mb-3"><img src="/logo.svg" alt={company} className="h-7 w-auto object-contain" /></div>
              {description && <p className="text-gray-500 text-[11px] leading-[1.65] mb-4 max-w-[220px]">{description}</p>}
            </div>
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-3">Mas Informacion</h5>
              <ul className="space-y-1.5">{moreInfoLinks.map((l) => <li key={l.label}><Link href={l.href} className="text-[11px] text-gray-500 hover:text-[var(--brand-primary,#004691)] transition-colors">{l.label}</Link></li>)}</ul>
            </div>
            <div>
              <h5 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 mb-3">Legal</h5>
              <ul className="space-y-1.5">{legalLinks.map((l) => <li key={l.label}><Link href={l.href} className="text-[11px] text-gray-500 hover:text-[var(--brand-primary,#004691)] transition-colors">{l.label}</Link></li>)}</ul>
            </div>
          </div>
        </div>
        {/* SUB-FOOTER — HARDCODED FastPagePro Credit (NEVER in CMS) */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-400 text-[10px] leading-tight">&copy; {new Date().getFullYear()} {company}. Todos los derechos reservados.</p>
            <p className="text-gray-400 text-[10px] leading-tight">Desarrollado por <a href="https://www.fastpagepro.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#e0b030] transition-colors font-semibold">FastPagePro</a></p>
          </div>
        </div>
      </section>
    </footer>
  );
}
FOOTEREOF

# --- Generic WhatsApp ---
cat > "$DST/src/components/WhatsAppButton.tsx" << 'WABOTEOF'
'use client';
export default function WhatsAppButton({ siteSettings }: { siteSettings: any }) {
  const phone = siteSettings?.whatsapp || '';
  if (!phone) return null;
  const msg = encodeURIComponent(siteSettings?.slogan ? `Hola, vi su pagina web. ${siteSettings.slogan}` : 'Hola, quisiera informacion sobre sus servicios.');
  return (
    <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noopener noreferrer" className="fixed z-50 group" style={{ bottom: '25px', right: '25px' }} aria-label="WhatsApp">
      <div className="relative">
        <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#25D366', boxShadow: '0 4px 18px rgba(37,211,102,0.45)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '30px', height: '30px', fill: '#FFF' }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
        </div>
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-60" /><span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]" /></span>
      </div>
    </a>
  );
}
WABOTEOF

# --- Generic Preloader ---
cat > "$DST/src/components/Preloader.tsx" << 'PRELOADEREOF'
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { setIsLoading(false); document.body.style.overflow = ''; }, 600);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ backgroundColor: 'var(--brand-primary, #004691)' }}
          initial={{ opacity: 1 }} exit={{ opacity: 0, y: '-100%', transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.95] }} transition={{ duration: 0.6, times: [0, 0.33, 0.67, 1] }}>
            <img src="/logo-white.svg" alt="" width={120} height={120} className="brightness-0 invert object-contain block" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
PRELOADEREOF

# --- Generic LayoutShell ---
cat > "$DST/src/components/LayoutShell.tsx" << 'LSHEOF'
"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import type { SanitySiteSettings } from "@/lib/sanity.client";
export default function LayoutShell({ children, siteSettings }: { children: React.ReactNode; siteSettings: SanitySiteSettings | null }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (<><Preloader /><div className="min-h-screen flex flex-col bg-white"><Header /><main className="flex-1">{children}</main><Footer siteSettings={siteSettings} /><WhatsAppButton siteSettings={siteSettings} /></div></>);
}
LSHEOF

# --- Generic layout.tsx ---
cat > "$DST/src/app/layout.tsx" << 'LAYOUTEOF'
import type { Metadata } from "next";
import "./globals.css";
import { VisualEditing } from "@/components/VisualEditing";
import { SanityLive } from "@/sanity/live";
import LayoutShell from "@/components/LayoutShell";
import { fetchCMS } from "@/lib/fetchCMS";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.client";

export const metadata: Metadata = {
  title: { default: "Tu Empresa | Sitio Web Profesional", template: "%s | Tu Empresa" },
  description: "Sitio web profesional con CMS y edicion visual.",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  robots: { index: true, follow: true },
};

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return fetchCMS<SanitySiteSettings>(SITE_SETTINGS_QUERY);
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteSettings = await getSiteSettings();
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="var(--brand-primary, #004691)" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <SanityLive />
        <LayoutShell siteSettings={siteSettings}>{children}</LayoutShell>
        <VisualEditing />
      </body>
    </html>
  );
}
LAYOUTEOF

# --- Genericized constants ---
cat > "$DST/sanity/lib/constants.ts" << 'CONSTEOF'
// @ts-nocheck
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Mi Empresa";
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
export const BRAND_COLORS = { primary: "#004691", accent: "#D4AF37", dark: "#001C3D" } as const;
CONSTEOF

# --- Remove libro-reclamaciones (Peru-specific, not generic) ---
rm -rf "$DST/src/app/libro-reclamaciones" "$DST/src/components/LibroReclamaciones.tsx" 2>/dev/null || true

# --- Remove prisma/db (not needed for CMS-only) ---
rm -f "$DST/prisma" "$DST/src/lib/db.ts" 2>/dev/null || true

# --- Remove Sertrade-specific public images ---
rm -rf "$DST/public/img" "$DST/public/images" 2>/dev/null || true
rm -f "$DST/public/sertrade-logo"* "$DST/public/brand-pattern"* "$DST/public/og-"* 2>/dev/null || true

# --- INSTRUCCIONES.txt (prompt for Zhipu sandbox automation) ---
cp "$BASE/scripts/INSTRUCCIONES-new.txt" "$DST/INSTRUCCIONES.txt"

echo "[6/6] Building ZIP..."
cd "$DST/.."
rm -f "$OUT"
zip -r "$OUT" "FastPagePro-CMS-Starter" \
  -x "FastPagePro-CMS-Starter/node_modules/*" \
  -x "FastPagePro-CMS-Starter/.next/*"

echo ""
echo "============================================"
echo "  ZIP CREATED: $OUT"
echo "  Size: $(du -h "$OUT" | cut -f1)"
echo "============================================"