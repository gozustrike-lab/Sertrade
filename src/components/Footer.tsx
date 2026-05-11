import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#003366] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-wide">SERTRADE DESIGN</h3>
                <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Arquitectura Comercial</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Transformamos espacios comerciales en experiencias memorables. Con mas de una decada de experiencia,
              ofrecemos soluciones integrales de diseno arquitectonico con los mas altos estandares de calidad e
              innovacion.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="font-semibold text-base mb-6 text-white">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.5} className="text-[#c8a951] mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  Av. Javier Prado Este 4600<br />
                  La Molina, Lima, Peru
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.5} className="text-[#c8a951] shrink-0" />
                <span className="text-white/70 text-sm">+51 (01) 234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.5} className="text-[#c8a951] shrink-0" />
                <span className="text-white/70 text-sm">info@sertradedesign.com</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-6 text-white">Enlaces Rapidos</h4>
            <ul className="space-y-3">
              {['Inicio', 'Servicios', 'Proyectos', 'Sobre Nosotros', 'Contacto'].map((link) => (
                <li key={link}>
                  <span className="text-white/70 text-sm hover:text-[#c8a951] transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social & Map */}
          <div>
            <h4 className="font-semibold text-base mb-6 text-white">Siguenos</h4>
            <div className="flex items-center gap-3 mb-8">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#c8a951] hover:border-[#c8a951] hover:text-[#003366] text-white transition-all duration-300 hover:scale-110"
                  aria-label="Social media"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </button>
              ))}
            </div>
            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-white/15 h-32">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9565!2d-76.95!3d-12.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzAwLjAiUyA3NsKwNTcnMDAuMCJX!5e0!3m2!1ses!2spe!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion Sertrade Design"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} SERTRADE DESIGN. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-[#c8a951] hover:border-[#c8a951] hover:text-[#003366] text-white transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
