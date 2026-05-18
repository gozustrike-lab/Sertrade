'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  RefreshCw,
  ThumbsUp,
  ChevronRight,
  ArrowRight,
  Building2,
  Ruler,
  Users,
  Award,
  HardHat,
  PencilRuler,
  ChevronLeft,
  Clock,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import StatCard from '@/components/StatCard';
import ServiciosSection from '@/components/ServiciosSection';

const sliderData = [
  {
    image: '/images/hero/hero-construction.jpg',
    position: 'center center',
  },
  {
    image: '/images/hero/hero-electrical.jpg',
    position: 'center center',
  },
  {
    image: '/images/hero/hero-paseo-antara.jpg',
    position: 'center center',
  },
  {
    image: '/images/hero/hero-northpark.jpg',
    position: 'left center',
  },
];

/* =============================================
   SERVICE DATA (moved to ServiciosSection)
   ============================================= */

const pillars = [
  { icon: BookOpen, title: 'Conocimiento', description: 'Equipo multidisciplinario con formación continua en tendencias globales de arquitectura comercial.' },
  { icon: Briefcase, title: 'Experiencia', description: 'Más de una década construyendo proyectos exitosos para las principales marcas del mercado.' },
  { icon: RefreshCw, title: 'Flexibilidad', description: 'Capacidad de adaptarnos a cada requerimiento, entregando soluciones personalizadas y efectivas.' },
  { icon: ThumbsUp, title: 'Referencias', description: 'Más de 200 clientes satisfechos avalan nuestro compromiso con la excelencia y la calidad.' },
];

/* =============================================
   ANIMATED PRO STATS
   ============================================= */
const proStats = [
  { icon: HardHat, value: 5000, prefix: '+', suffix: ' m²', label: 'Construidos' },
  { icon: PencilRuler, value: 8000, prefix: '+', suffix: ' m²', label: 'Diseñados' },
  { icon: Clock, value: 10, prefix: '+', suffix: ' Años', label: 'Experiencia' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const router = useRouter();
  const statsSectionRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  }, []);

  /* Autoplay highlight for Nuestros Números — cycles every 3s */
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % proStats.length);
    }, 3000);
    return () => clearInterval(statsInterval);
  }, []);

  /* Smooth page transition: fade-out then navigate */
  const navigateWithTransition = (href: string) => {
    if (transitioning) return;
    setTransitioning(true);
    const overlay = document.getElementById('page-transition-overlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    }
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  return (
    <div className="relative">
      {/* Page Transition Overlay */}
      <div
        id="page-transition-overlay"
        className="fixed inset-0 z-[9999] bg-[#004691] pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.4s ease-in-out' }}
      />

      {/* Hex pattern is now applied per-section via hex-pattern-bg CSS class */}

      {/* =============================================
          HERO SLIDER — CENTERED LAYOUT
            LAYER 1 (z-10): Background images — opacity fade
            LAYER 2 (z-20): Text content — 100% STATIC, centered
            LAYER 3 (z-30): Arrows + Dots
          ============================================= */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* ===== LAYER 1: BACKGROUND IMAGES (z-10) ===== */}
        {sliderData.map((s, index) => (
          <div
            key={`bg-${index}`}
            className="absolute inset-0"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 10 : 1,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundPosition: s.position || 'center center',
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.08)',
                transition: 'transform 10s ease-out',
              }}
            />
            {/* Dark blue overlay for text readability */}
            <div className="absolute inset-0 bg-[rgba(0,20,50,0.60)]" />
          </div>
        ))}

        {/* ===== LAYER 2: STATIC TEXT — VERTICALLY CENTERED (z-20) ===== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: 20 }}
        >
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center">

              {/* Main Title — SERTRADE PROJECTS */}
              <h2
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.9s ease-out, transform 0.9s ease-out',
                  transitionDelay: '0.3s',
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold text-white mb-4 leading-[1.02] tracking-tight uppercase text-shadow-hero"
              >
                SERTRADE
                <span className="block mt-0.5">PROJECTS</span>
              </h2>

              {/* Subtitle — SERVICIOS ARQUITECTURA Y SERVICIOS GENERALES */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                  transitionDelay: '0.5s',
                }}
                className="mb-2"
              >
                <span className="text-[#E5E7EB] text-[11px] sm:text-xs tracking-[0.3em] uppercase font-light">
                  Servicios de Arquitectura y Servicios Generales
                </span>
              </div>

              {/* Tagline — DISEÑO Y EJECUCIÓN */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                  transitionDelay: '0.65s',
                }}
                className="mb-8"
              >
                <span className="text-[#E5E7EB] text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-light">
                  Diseño y Ejecución
                </span>
              </div>

              {/* CTA BUTTONS — Centered, side by side on desktop */}
              <div
                className="hero-btn-stack flex items-center gap-3 sm:gap-5 pointer-events-auto"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                  transitionDelay: '0.8s',
                }}
              >
                {/* PRIMARY CTA — VER PROYECTOS (Yellow) */}
                <motion.button
                  onClick={() => navigateWithTransition('/proyectos')}
                  className="cta-shimmer-btn group relative px-8 py-3 bg-[#d4a017] text-[#003466] rounded-[8px] font-bold text-[14px] sm:text-[15px] uppercase tracking-[0.08em] shadow-lg flex items-center gap-2.5 justify-center overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212,160,23,0.35)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut',
                    }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#002244]">
                    VER PROYECTOS
                    <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>

                {/* SECONDARY CTA — CONTACTO (Solid blue-green) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="pointer-events-auto"
                >
                  <a
                    href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, estoy en la página de inicio de Sertrade y quiero agendar una reunión para presentarles mi proyecto.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-transparent border border-white/40 text-white rounded-[8px] font-semibold text-[14px] sm:text-[15px] uppercase tracking-[0.08em] hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center justify-center"
                  >
                    CONTACTO
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LAYER 3: NAVIGATION ARROWS (z-35) ===== */}
        <button
          onClick={prevSlide}
          className="hero-arrow hero-arrow-left hidden sm:flex"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={nextSlide}
          className="hero-arrow hero-arrow-right hidden sm:flex"
          aria-label="Siguiente"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>

        {/* Slider Dots (z-40, bottom center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3" style={{ zIndex: 40 }}>
          {sliderData.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-10 bg-[#d4a017]' : 'w-2 bg-white/40 hover:bg-white/60'}`} aria-label={`Ir a slide ${index + 1}`} />
          ))}
        </div>

        {/* Slide Counter (z-40, bottom right) */}
        <div className="absolute bottom-8 right-8 text-white/50 text-sm font-medium hidden sm:block" style={{ zIndex: 40 }}>
          <span className="text-white text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(sliderData.length).padStart(2, '0')}</span>
        </div>

      </section>

      {/* ===== LIGHT SECTIONS WRAPPER — Single continuous brand pattern ===== */}
      <div className="brand-pattern-wrapper">

      {/* QUIÉNES SOMOS */}
      <section
        className="pt-10 pb-20 md:pt-10 md:pb-24"
        style={{
          background: 'linear-gradient(to bottom, #001C3D 0px, #001C3D 10px, transparent 30px, transparent 100%)',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase">Quiénes Somos</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-5 text-shadow-pro">Nosotros</h2>
              <div className="w-12 h-1 bg-[#C5960C] mx-auto rounded-full" />
              <p className="text-[#2D3748] max-w-2xl mx-auto mt-6 leading-[1.7]">
                Sertrade Design es un estudio de arquitectura especializado en el diseño de espacios comerciales,
                de salud y residenciales. Nuestro enfoque combina creatividad, funcionalidad y sostenibilidad
                para crear entornos que transforman la experiencia de quienes los habitan.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-20">
            {[
              { number: '200+', label: 'Proyectos Entregados', icon: Building2 },
              { number: '14+', label: 'Años de Experiencia', icon: Award },
              { number: '50+', label: 'Profesionales', icon: Users },
              { number: '3', label: 'Países', icon: Ruler },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} animation="scale">
                <div className="nosotros-card">
                  <div className="nosotros-card-icon">
                    <stat.icon size={36} strokeWidth={1.5} />
                  </div>
                  <div className="nosotros-card-number">{stat.number}</div>
                  <div className="nosotros-card-label">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* NUESTROS SERVICIOS */}
      <ServiciosSection />

      {/* NUESTROS NÚMEROS — Animated Counters with Autoplay Highlight */}
      <section className="py-14 md:py-16 bg-transparent" ref={statsSectionRef}>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal>
            <div className="text-center mt-4 mb-12">
              <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase">Nuestros Números</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-4 text-shadow-pro">Resultados que Hablan</h2>
              <div className="w-12 h-1 bg-[#C5960C] mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {proStats.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.3}
                isActive={activeStatIndex === i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="py-14 md:py-20 bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase">Portafolio</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-4 text-shadow-pro">Proyectos Destacados</h2>
              <div className="w-12 h-1 bg-[#C5960C] mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Centro Comercial Plaza Central', category: 'Comercial', location: 'Lima, Perú', area: '15,000 m²', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80' },
              { title: 'Clínica San Rafael', category: 'Salud', location: 'Bogotá, Colombia', area: '8,500 m²', image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80' },
              { title: 'Residencial Los Cedros', category: 'Residencial', location: 'La Molina, Lima', area: '3,200 m²', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80' },
              { title: 'Oficinas Torre Andina', category: 'Comercial', location: 'Quito, Ecuador', area: '6,000 m²', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
              { title: 'Hospital Metropolitano', category: 'Salud', location: 'Guayaquil, Ecuador', area: '22,000 m²', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80' },
              { title: 'Casa del Lago', category: 'Residencial', location: 'Cusco, Perú', area: '1,800 m²', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80' },
            ].map((project, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  onClick={() => navigateWithTransition('/proyectos')}
                >
                  {/* Immersive image */}
                  <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001C3D] via-[#001C3D]/30 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#C5960C] text-white text-xs font-semibold uppercase tracking-wider rounded-md">{project.category}</span>
                    </div>
                  </div>
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <span>{project.location}</span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Ver más — redirect to portfolio */}
          <ScrollReveal>
            <div className="text-center mt-12">
              <motion.button
                onClick={() => navigateWithTransition('/proyectos')}
                className="group inline-flex items-center gap-2.5 px-8 py-3 bg-[#004691] text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-[#003466] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos los Proyectos
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NUESTROS PILARES — Dynamic Professional Design */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #004691 0%, #003266 50%, #001C3D 100%)' }}>
        {/* Floating geometric circles — decorative */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {[{ size: 180, x: '8%', y: '15%', delay: 0 }, { size: 120, x: '75%', y: '10%', delay: 1.5 }, { size: 90, x: '60%', y: '70%', delay: 3 }, { size: 140, x: '20%', y: '75%', delay: 2 }, { size: 60, x: '90%', y: '50%', delay: 0.8 }, { size: 200, x: '40%', y: '-5%', delay: 4 }, { size: 70, x: '5%', y: '55%', delay: 1.2 }].map((c, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: c.size, height: c.size, left: c.x, top: c.y, border: '1px solid rgba(255,255,255,0.08)', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
              animate={{ y: [0, -12, 0], scale: [1, 1.03, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 6 + i * 0.8, ease: 'easeInOut', delay: c.delay }}
            />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative" style={{ zIndex: 1 }}>
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase">Lo que nos define</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Nuestros Pilares</h2>
              <div className="w-12 h-1 bg-[#C5960C] mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -10, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
                >
                  {/* Card */}
                  <div className="relative p-7 md:p-8 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition-all duration-500 group-hover:bg-white/[0.12] group-hover:border-white/20 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] h-full">

                    {/* Number — large decorative */}
                    <motion.div
                      className="absolute -top-3 -left-2 w-10 h-10 rounded-full bg-[#C5960C] flex items-center justify-center text-white font-black text-sm shadow-lg"
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.15 + 0.2 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.div>

                    {/* Rotating arc border — decorative ring */}
                    <div className="absolute -top-1 -right-1 w-12 h-12 pointer-events-none">
                      <svg viewBox="0 0 48 48" className="w-full h-full">
                        <motion.circle
                          cx="24" cy="24" r="20" fill="none" stroke="rgba(197,150,12,0.3)" strokeWidth="1.5" strokeLinecap="round"
                          strokeDasharray="40 90"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 12 + i * 2, ease: 'linear' }}
                          style={{ transformOrigin: 'center' }}
                        />
                      </svg>
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-[#C5960C] transition-all duration-500 group-hover:scale-110"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                    >
                      <pillar.icon size={26} strokeWidth={1.5} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <motion.h4
                      className="font-bold text-white text-lg mb-3 group-hover:text-[#C5960C] transition-colors duration-500"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.4 }}
                    >
                      {pillar.title}
                    </motion.h4>

                    {/* Description */}
                    <motion.p
                      className="text-white/70 text-sm leading-[1.8] group-hover:text-white/90 transition-colors duration-500"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.5 }}
                    >
                      {pillar.description}
                    </motion.p>

                    {/* Bottom accent line — animated */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-[3px] bg-[#C5960C] rounded-full"
                      initial={{ width: 0, x: '-50%' }}
                      whileInView={{ width: '60%', x: '-50%' }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.8, delay: i * 0.15 + 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NUESTROS CLIENTES COMERCIALES */}
      <section className="py-16 md:py-20 bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#C5960C] text-sm font-semibold tracking-[0.2em] uppercase">Confianza Comercial</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-4 text-shadow-pro">Nuestros Clientes</h2>
              <div className="w-12 h-1 bg-[#C5960C] mx-auto rounded-full" />
              <p className="text-[#2D3748]/70 max-w-xl mx-auto mt-5 leading-[1.7]">
                Empresas líderes confían en Sertrade Design para materializar sus espacios comerciales.
              </p>
            </div>
          </ScrollReveal>

          {/* Client logos grid */}
          <ScrollReveal animation="fade-up" staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center">
              {[
                { name: 'Lima Kombo', img: '/img/clients/lima-kombo.png', alt: 'Lima Kombo - Cocina al Fuego' },
                { name: 'Mitsubishi Motors', img: '/img/clients/mitsubishi-motors.png', alt: 'Mitsubishi Motors' },
                { name: 'REDRILSA', img: '/img/clients/redrilsa.png', alt: 'REDRILSA - Remicsa Drilling S.A.' },
              ].map((client, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-4 group"
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                >
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-white border border-gray-100 shadow-md flex items-center justify-center p-6 group-hover:shadow-xl group-hover:border-[#004691]/20 transition-all duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.img}
                      alt={client.alt}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:opacity-100 opacity-60"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[#2D3748]/50 text-xs font-medium uppercase tracking-[0.15em] group-hover:text-[#004691] transition-colors duration-500">
                    {client.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== END LIGHT SECTIONS WRAPPER ===== */}
      </div>

      {/* CTA */}
      <ScrollReveal animation="fade">
        <section className="relative py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)' }} />
          <div className="absolute inset-0 bg-[#004691]/90" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Comienza tu próximo proyecto con nosotros</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-[1.7]">
              Cada espacio tiene una historia. Permítenos escribir la tuya con diseño, innovación y excelencia.
              Agenda una consulta gratuita hoy.
            </p>
            <motion.a
              href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola Sertrade Design, quiero solicitar una consulta gratuita para evaluar mi próximo proyecto.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-shimmer-btn group relative px-8 py-4 bg-[#d4a017] text-[#003466] rounded-[8px] font-semibold shadow-lg inline-flex items-center gap-2 overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212,160,23,0.35)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Animated gradient background sweep */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: ['100%', '-100%'] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
                style={{ backgroundSize: '200% 100%' }}
              />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#002244]">
                Solicitar Consulta Gratuita <ChevronRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </motion.a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
