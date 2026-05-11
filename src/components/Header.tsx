'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'proyectos', label: 'Proyectos' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#003366]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className={`text-white font-bold text-lg leading-tight tracking-wide ${scrolled ? 'text-base' : 'text-lg'}`}>
              SERTRADE DESIGN
            </h1>
            <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
              Arquitectura Comercial
            </p>
          </div>
        </button>

        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-white text-[#003366] shadow-md'
                  : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('proyectos')}
            className="px-5 py-2.5 bg-[#c8a951] text-[#003366] rounded-full text-sm font-semibold hover:bg-[#d4b862] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Ver Proyectos
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/15 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003366]/98 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-3 rounded-xl text-left text-sm font-medium tracking-wide transition-all ${
                  currentPage === item.id
                    ? 'bg-white text-[#003366] shadow-md'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('proyectos')}
              className="mt-2 px-4 py-3 bg-[#c8a951] text-[#003366] rounded-xl text-sm font-semibold hover:bg-[#d4b862] transition-all"
            >
              Ver Proyectos
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
