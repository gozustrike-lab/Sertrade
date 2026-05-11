'use client';

import { useState, useEffect, useCallback } from 'react';
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

const sliderData = [
  {
    title: 'SERTRADE DESIGN',
    subtitle: 'Arquitectura Comercial',
    description: 'Transformamos espacios en experiencias memorables',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  },
  {
    title: 'DISENO INNOVADOR',
    subtitle: 'Espacios que Inspiran',
    description: 'Soluciones arquitectonicas a la medida de tu marca',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  },
  {
    title: 'EXCELENCIA CREATIVA',
    subtitle: 'Mas de 10 Anos de Experiencia',
    description: 'Proyectos que superan expectativas en cada detalle',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80',
  },
];

const timelineData = [
  { year: '2010', title: 'Fundacion', description: 'Nace SERTRADE DESIGN con la vision de transformar la arquitectura comercial en Peru.' },
  { year: '2013', title: 'Primer Gran Proyecto', description: 'Diseno del centro comercial Plaza Central, marcando nuestro inicio en gran escala.' },
  { year: '2016', title: 'Expansion Sector Salud', description: 'Incorporamos el diseno de espacios de salud, abriendo una nueva linea de servicio.' },
  { year: '2019', title: 'Internacionalizacion', description: 'Primeros proyectos en Colombia y Ecuador, expandiendo nuestra presencia regional.' },
  { year: '2022', title: 'Innovacion Digital', description: 'Implementacion de recorridos virtuales y modelado 3D como servicio estandar.' },
  { year: '2024', title: 'Mas de 200 Proyectos', description: 'Alcanzamos el hito de 200 proyectos entregados con exito en toda Latinoamerica.' },
];

const pillars = [
  {
    icon: BookOpen,
    title: 'Conocimiento',
    description: 'Equipo multidisciplinario con formacion continua en tendencias globales de arquitectura comercial.',
  },
  {
    icon: Briefcase,
    title: 'Experiencia',
    description: 'Mas de una decada construyendo proyectos exitosos para las principales marcas del mercado.',
  },
  {
    icon: RefreshCw,
    title: 'Flexibilidad',
    description: 'Capacidad de adaptarnos a cada requerimiento, entregando soluciones personalizadas y efectivas.',
  },
  {
    icon: ThumbsUp,
    title: 'Referencias',
    description: 'Mas de 200 clientes satisfechos avalan nuestro compromiso con la excelencia y la calidad.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div>
      {/* HERO SLIDER - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#003366]/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div
                    className={`transition-all duration-700 delay-200 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                      <Building2 size={14} strokeWidth={1.5} className="text-[#c8a951]" />
                      <span className="text-white/80 text-xs tracking-widest uppercase">{slide.subtitle}</span>
                    </div>
                  </div>
                  <h2
                    className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight transition-all duration-700 delay-300 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className={`text-lg sm:text-xl text-white/80 mb-8 max-w-lg leading-relaxed transition-all duration-700 delay-400 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {slide.description}
                  </p>
                  <div
                    className={`flex items-center gap-4 transition-all duration-700 delay-500 ${
                      index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <button className="px-8 py-3.5 bg-[#c8a951] text-[#003366] rounded-full font-semibold hover:bg-[#d4b862] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                      Explorar Proyectos <ArrowRight size={18} strokeWidth={1.5} />
                    </button>
                    <button className="px-8 py-3.5 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300">
                      Contactanos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'w-10 bg-[#c8a951]' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 text-white/50 text-sm font-medium hidden sm:block">
          <span className="text-white text-2xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(sliderData.length).padStart(2, '0')}</span>
        </div>
      </section>

      {/* NOSOTROS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-[#c8a951] text-sm font-semibold tracking-[0.2em] uppercase">Quienes Somos</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366] mt-3 mb-5">
              Nosotros
            </h2>
            <div className="w-16 h-1 bg-[#c8a951] mx-auto rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              SERTRADE DESIGN es un estudio de arquitectura especializado en el diseno de espacios comerciales,
              de salud y residenciales. Nuestro enfoque combina creatividad, funcionalidad y sostenibilidad
              para crear entornos que transforman la experiencia de quienes los habitan.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { number: '200+', label: 'Proyectos Entregados', icon: Building2 },
              { number: '14+', label: 'Anos de Experiencia', icon: Award },
              { number: '50+', label: 'Profesionales', icon: Users },
              { number: '3', label: 'Paises', icon: Ruler },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-[#f7f8fa] hover:bg-[#003366] group transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <stat.icon size={28} strokeWidth={1.5} className="mx-auto mb-3 text-[#003366] group-hover:text-[#c8a951] transition-colors" />
                <div className="text-3xl font-bold text-[#003366] group-hover:text-white transition-colors">{stat.number}</div>
                <div className="text-sm text-gray-500 group-hover:text-white/70 transition-colors mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* TIMELINE */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-[#003366] mb-12 text-center">Nuestra Trayectoria</h3>
            <div className="relative">
              {/* Center Line */}
              <div className="hidden md:block timeline-line" />

              <div className="space-y-8 md:space-y-0">
                {timelineData.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div key={index} className="relative md:flex md:items-center md:min-h-[120px]">
                      {/* Mobile Layout */}
                      <div className="md:hidden flex items-start gap-4 pl-12">
                        <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#003366] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {item.year}
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-[#f7f8fa] border border-gray-100">
                          <h4 className="font-semibold text-[#003366]">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className={`hidden md:flex md:w-1/2 ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12 order-3'}`}>
                        <div className="p-6 rounded-2xl bg-[#f7f8fa] border border-gray-100 max-w-sm hover:shadow-lg transition-all duration-300">
                          <span className="text-[#c8a951] font-bold text-sm">{item.year}</span>
                          <h4 className="font-semibold text-[#003366] mt-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#c8a951] border-4 border-white shadow-md z-10" />

                      {/* Empty space for other side */}
                      <div className={`hidden md:block md:w-1/2 ${isLeft ? 'order-3' : ''}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4 PILLARS */}
          <div>
            <h3 className="text-2xl font-bold text-[#003366] mb-12 text-center">Nuestros Pilares</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#003366]/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#c8a951] transition-all duration-500 group-hover:scale-110 shadow-lg">
                    <pillar.icon size={28} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-[#003366] text-lg mb-3">{pillar.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-[#003366]/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Comienza tu proximo proyecto con nosotros
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cada espacio tiene una historia. Permitemos escribir la tuya con diseno, innovacion y excelencia.
            Agenda una consulta gratuita hoy.
          </p>
          <button className="px-8 py-4 bg-[#c8a951] text-[#003366] rounded-full font-semibold hover:bg-[#d4b862] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2">
            Solicitar Consulta Gratuita <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </section>
    </div>
  );
}
