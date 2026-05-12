'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const sliderData = [
  {
    title: 'SERTRADE DESIGN',
    subtitle: 'Arquitectura Comercial',
    description: 'Transformamos espacios en experiencias memorables',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  },
  {
    title: 'DISEÑO INNOVADOR',
    subtitle: 'Espacios que Inspiran',
    description: 'Soluciones arquitectónicas a la medida de tu marca',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  },
  {
    title: 'EXCELENCIA CREATIVA',
    subtitle: 'Más de 10 Años de Experiencia',
    description: 'Proyectos que superan expectativas en cada detalle',
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

const stats = [
  { number: '200+', label: 'Proyectos Entregados', icon: Building2 },
  { number: '14+', label: 'Años de Experiencia', icon: Award },
  { number: '50+', label: 'Profesionales', icon: Users },
  { number: '3', label: 'Países', icon: Ruler },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(nextSlide, 4000);
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

  const slide = sliderData[currentSlide];

  return (
    <div>
      {/* Page Transition Overlay */}
      <div
        id="page-transition-overlay"
        className="fixed inset-0 z-[9999] bg-[#004691] pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.4s ease-in-out' }}
      />

      {/* HERO SLIDER */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Slides (pointer-events locked to active only) */}
        {sliderData.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100 pointer-events-auto z-[2]'
                : 'opacity-0 scale-105 pointer-events-none z-[1]'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }} />
            {/* Primary brand gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#004691]/90 via-[#004691]/70 to-transparent" />
            {/* Extra dark overlay */}
            <div className="hero-overlay-dark absolute inset-0" />
          </div>
        ))}

        {/* Content Layer — ALWAYS on top, always clickable (z-100) */}
        <div className="absolute inset-0 z-[100] flex items-center pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Subtitle badge */}
              <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/20 mb-6">
                  <Building2 size={14} strokeWidth={1.5} className="text-[#d4a017]" />
                  <span className="text-white/80 text-xs tracking-widest uppercase">{slide.subtitle}</span>
                </div>
              </div>

              {/* Title */}
              <h2
                key={`title-${currentSlide}`}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight animate-blur-reveal"
                style={{ animationDelay: '0.15s' }}
              >
                {slide.title}
              </h2>

              {/* Description */}
              <p
                key={`desc-${currentSlide}`}
                className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 max-w-lg leading-[1.7] animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                {slide.description}
              </p>

              {/* ===== CTA BUTTONS — Always interactive ===== */}
              <div
                key={`cta-${currentSlide}`}
                className="hero-btn-stack flex items-center gap-4 animate-fade-in-up pointer-events-auto"
                style={{ animationDelay: '0.45s' }}
              >
                {/* PRIMARY CTA — VER PROYECTOS with shimmer */}
                <button
                  onClick={() => navigateWithTransition('/proyectos')}
                  className="cta-shimmer-btn group relative px-8 py-3.5 bg-[#d4a017] text-[#003466] rounded-[8px] font-bold text-[15px] hover:bg-[#e0b030] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.05] flex items-center gap-2.5 justify-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    VER PROYECTOS
                    <ArrowRight
                      size={18}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                  {/* Shimmer light sweep */}
                  <span className="cta-shimmer-sweep absolute inset-0 pointer-events-none" />
                </button>

                {/* SECONDARY CTA — Contáctanos */}
                <Link
                  href="/servicios"
                  onClick={() => navigateWithTransition('/servicios')}
                  className="pointer-events-auto px-8 py-3.5 border border-white/30 text-white rounded-[8px] font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[100]">
          {sliderData.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-10 bg-[#d4a017]' : 'w-2 bg-white/40 hover:bg-white/60'}`} aria-label={`Ir a slide ${index + 1}`} />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 text-white/50 text-sm font-medium hidden sm:block z-[100]">
          <span className="text-white text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(sliderData.length).padStart(2, '0')}</span>
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} animation="scale">
                <div className="text-center p-5 sm:p-6 rounded-[8px] bg-[#f7f8fa] hover:bg-[#004691] group transition-all duration-500 hover:shadow-lg hover:-translate-y-1 border border-gray-100 hover:border-[#004691]">
                  <stat.icon size={24} strokeWidth={1.5} className="mx-auto mb-3 text-[#004691] group-hover:text-[#d4a017] transition-colors" />
                  <div className="text-2xl sm:text-3xl font-bold text-[#004691] group-hover:text-white transition-colors">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-[#4A4A4A] group-hover:text-white/70 transition-colors mt-1">{stat.label}</div>
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

          {/* Pillars */}
          <div className="mt-20">
            <ScrollReveal>
              <h3 className="text-2xl font-bold text-[#004691] mb-12 text-center">Nuestros Pilares</h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((pillar, i) => (
                <ScrollReveal key={i} delay={i * 0.12} animation="fade-up">
                  <div className="group text-center p-6 sm:p-7 rounded-[8px] bg-white border border-gray-100 hover:border-[#004691]/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-[8px] bg-[#004691] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#d4a017] transition-all duration-500 group-hover:scale-110 shadow-lg">
                      <pillar.icon size={26} strokeWidth={1.5} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-[#004691] text-lg mb-3">{pillar.title}</h4>
                    <p className="text-[#4A4A4A] text-sm leading-[1.7]">{pillar.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
            <button
              onClick={() => navigateWithTransition('/servicios')}
              className="cta-shimmer-btn group relative px-8 py-4 bg-[#d4a017] text-[#003466] rounded-[8px] font-semibold hover:bg-[#e0b030] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.05] inline-flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Solicitar Consulta Gratuita <ChevronRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
              <span className="cta-shimmer-sweep absolute inset-0 pointer-events-none" />
            </button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
