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
