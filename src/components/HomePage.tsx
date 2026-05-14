'use client';

import { useState, useEffect, useCallback } from 'react';
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
  History,
  ChevronLeft,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import StatCard from '@/components/StatCard';

const sliderData = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80',
  },
];

const timelineData = [
  { year: '2010', title: 'Fundación', description: 'Nace SERTRADE DESIGN con la visión de transformar la arquitectura comercial en Perú.' },
  { year: '2013', title: 'Primer Gran Proyecto', description: 'Diseño del centro comercial Plaza Central, marcando nuestro inicio en gran escala.' },
  { year: '2016', title: 'Expansión Sector Salud', description: 'Incorporamos el diseño de espacios de salud, abriendo una nueva línea de servicio.' },
  { year: '2019', title: 'Internacionalización', description: 'Primeros proyectos en Colombia y Ecuador, expandiendo nuestra presencia regional.' },
  { year: '2022', title: 'Innovación Digital', description: 'Implementación de recorridos virtuales y modelado 3D como servicio estándar.' },
  { year: '2024', title: 'Más de 200 Proyectos', description: 'Alcanzamos el hito de 200 proyectos entregados con éxito en toda Latinoamérica.' },
];

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
  { icon: History, value: 10, prefix: '+', suffix: ' Años', label: 'Experiencia' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  }, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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
    <div>
      {/* Page Transition Overlay */}
      <div
        id="page-transition-overlay"
        className="fixed inset-0 z-[9999] bg-[#004691] pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.4s ease-in-out' }}
      />

      {/* =============================================
          HERO SLIDER — CENTERED LAYOUT
            LAYER 1 (z-10): Background images — opacity fade
            LAYER 2 (z-20): Text content — 100% STATIC, centered
            LAYER 3 (z-30): Arrows + Dots
          ============================================= */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>

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
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${s.image})`,
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold text-white mb-4 leading-[1.02] tracking-tight uppercase"
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

        {/* ===== BOTTOM FADE: Hero → Section (z-45) — minimal 45px ===== */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            zIndex: 45,
            height: '45px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
          }}
        />
      </section>

      {/* PRO STATS — Animated Counters with Spring Physics */}
      <section className="py-14 md:py-16 bg-[#F4F7FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#d4a017] text-sm font-semibold tracking-[0.2em] uppercase">Nuestros Números</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-4">Resultados que Hablan</h2>
              <div className="w-12 h-1 bg-[#004691] mx-auto rounded-full" />
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="pt-10 pb-20 md:pt-10 md:pb-24 bg-white" style={{ overflow: 'visible', height: 'auto' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ overflow: 'visible' }}>
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#d4a017] text-sm font-semibold tracking-[0.2em] uppercase">Quiénes Somos</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-5">Nosotros</h2>
              <div className="w-12 h-1 bg-[#004691] mx-auto rounded-full" />
              <p className="text-[#4A4A4A] max-w-2xl mx-auto mt-6 leading-[1.7]">
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
                <div className="text-center p-6 sm:p-7 rounded-[8px] bg-[#004691] group cursor-pointer border border-transparent shadow-[0_4px_15px_rgba(0,70,145,0.2)] transition-all duration-[300ms] ease-in-out hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-[#e8eaed] active:bg-white active:shadow-[0_10px_25px_rgba(0,0,0,0.1)] active:-translate-y-1">
                  <stat.icon size={36} strokeWidth={1.5} className="mx-auto mb-4 text-[#D4AF37] group-hover:text-[#004691] transition-colors duration-[300ms]" />
                  <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#004691] transition-colors duration-[300ms]">{stat.number}</div>
                  <div className="text-xs sm:text-[13px] text-[#F3F4F6] group-hover:text-[#4A4A4A] transition-colors duration-[300ms] mt-1.5 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Timeline */}
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-[#004691] mb-12 text-center">Nuestra Trayectoria</h3>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden md:block timeline-line" />
            <div className="space-y-8 md:space-y-0">
              {timelineData.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <ScrollReveal key={index} animation={isLeft ? 'fade-right' : 'fade-left'} delay={0.15}>
                    <div className="relative md:flex md:items-center md:min-h-[120px]">
                      {/* Mobile Timeline */}
                      <div className="md:hidden flex items-start gap-4 pl-12">
                        <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#004691] flex items-center justify-center text-white text-xs font-bold shrink-0">{item.year}</div>
                        <div className="flex-1 p-4 rounded-[8px] bg-[#f7f8fa] border border-gray-100">
                          <h4 className="font-semibold text-[#004691]">{item.title}</h4>
                          <p className="text-sm text-[#4A4A4A] mt-1 leading-[1.7]">{item.description}</p>
                        </div>
                      </div>
                      {/* Desktop Timeline */}
                      <div className={`hidden md:flex md:w-1/2 ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12 order-3'}`}>
                        <div className="p-6 rounded-[8px] bg-[#f7f8fa] border border-gray-100 max-w-sm hover:shadow-lg transition-all duration-300">
                          <span className="text-[#d4a017] font-bold text-sm">{item.year}</span>
                          <h4 className="font-semibold text-[#004691] mt-1">{item.title}</h4>
                          <p className="text-sm text-[#4A4A4A] mt-2 leading-[1.7]">{item.description}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4a017] border-4 border-white shadow-md z-10" />
                      <div className={`hidden md:block md:w-1/2 ${isLeft ? 'order-3' : ''}`} />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Pillars — with stagger */}
          <div className="mt-20">
            <ScrollReveal>
              <h3 className="text-2xl font-bold text-[#004691] mb-12 text-center">Nuestros Pilares</h3>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" staggerDelay={0.12}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                    className="group text-center p-6 sm:p-7 rounded-[8px] bg-white border border-gray-100 hover:border-[#004691]/20 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="w-14 h-14 rounded-[8px] bg-[#004691] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#d4a017] transition-all duration-500 group-hover:scale-110 shadow-lg">
                      <pillar.icon size={26} strokeWidth={1.5} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-[#004691] text-lg mb-3">{pillar.title}</h4>
                    <p className="text-[#4A4A4A] text-sm leading-[1.7]">{pillar.description}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
