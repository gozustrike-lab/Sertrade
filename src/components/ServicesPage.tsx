'use client';

import { motion } from 'framer-motion';
import {
  Store, HeartPulse, Home, LayoutGrid, Eye, Box,
  Paintbrush, ClipboardList, Lightbulb, MonitorSmartphone,
  Compass, Layers, ChevronRight, Phone, Mail,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const serviceCategories = [
  { icon: Store, title: 'Diseño Comercial', description: 'Creamos espacios comerciales estratégicos que potencian la marca y mejoran la experiencia del cliente. Desde boutiques hasta grandes centros comerciales, cada proyecto refleja la identidad única de tu negocio.', features: ['Retail y Tiendas', 'Oficinas Corporativas', 'Centros Comerciales', 'Restaurantes y Cafés'], color: 'from-[#004691] to-[#0062b8]', waMsg: 'Hola, me interesa el servicio de Diseño Comercial para mi negocio. Deseo más información.' },
  { icon: HeartPulse, title: 'Diseño Salud', description: 'Diseñamos entornos de salud que combinan funcionalidad clínica con bienestar. Nuestros espacios hospitalarios y clínicos están optimizados para la eficiencia y el confort de pacientes y profesionales.', features: ['Hospitales', 'Clínicas', 'Centros Médicos', 'Laboratorios'], color: 'from-[#004691] to-[#006d8f]', waMsg: 'Hola, necesito información y asesoría sobre el diseño técnico para el sector Salud / Clínicas.' },
  { icon: Home, title: 'Diseño Residencial', description: 'Transformamos la visión de nuestros clientes en hogares excepcionales. Cada diseño residencial es una fusión de estética, funcionalidad y personalidad que refleja el estilo de vida único de sus habitantes.', features: ['Casas Unifamiliares', 'Departamentos', 'Viviendas Multifamiliares', 'Remodelaciones'], color: 'from-[#004691] to-[#003466]', waMsg: 'Hola, me gustaría cotizar el diseño arquitectónico de un proyecto Residencial.' },
];

const projectBlocks = [
  { icon: LayoutGrid, title: 'Infoarquitectura', description: 'Organizamos y estructuramos la información de tus espacios para maximizar la usabilidad. Definimos flujos de circulación, zonificaciones y distribuciones óptimas.', items: ['Zonificación funcional', 'Flujos de circulación', 'Análisis de espacios'] },
  { icon: Eye, title: 'Recorridos Virtuales', description: 'Ofrecemos experiencias inmersivas que permiten a tus clientes explorar cada rincón del proyecto antes de construir. Tecnología 360 para una visualización completa.', items: ['Tours 360 grados', 'Realidad virtual', 'Visualización inmersiva'] },
  { icon: Box, title: 'Modelado 3D', description: 'Cada proyecto cobra vida con nuestros renderizados fotorrealistas y modelos tridimensionales de alta precisión que permiten anticipar cada detalle del resultado final.', items: ['Render fotorrealista', 'Animaciones 3D', 'Maquetas digitales'] },
];

const additionalServices = [
  { icon: Paintbrush, label: 'Interiorismo' },
  { icon: ClipboardList, label: 'Planimetría' },
  { icon: Lightbulb, label: 'Consultoría' },
  { icon: MonitorSmartphone, label: 'BIM / Revit' },
  { icon: Compass, label: 'Dirección de Obra' },
  { icon: Layers, label: 'Peritajes' },
];

export default function ServicesPage() {
  return (
    <div>
      {/* ======== HERO HEADER — Solid uniform blue, clean edge ======== */}
      <section className="relative w-full bg-[#004691] overflow-hidden" style={{ minHeight: '40vh' }}>
        {/* Decorative geometric accents */}
        <div className="absolute top-0 right-0 w-80 h-80 border border-white/5 rotate-45 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 border border-[#d4a017]/8 -rotate-12 translate-y-1/3 -translate-x-1/4" />

        {/* Brand pattern watermark — ultra subtle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/brand-pattern-tile.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '1086px 177px',
            opacity: 0.02,
          }}
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-[120px] md:pt-[130px] pb-16 md:pb-20">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 mb-6">
              <Layers size={14} strokeWidth={1.5} className="text-[#d4a017]" />
              <span className="text-white/80 text-xs tracking-widest uppercase">Nuestros Servicios</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
            >
              Alcance de Nuestros Servicios
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.35}>
            <p
              className="text-sm md:text-base text-white max-w-2xl mx-auto leading-relaxed mb-6"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
            >
              Ofrecemos soluciones integrales de arquitectura y diseño que abarcan desde la concepción
              hasta la materialización de cada proyecto, con estándares de calidad internacional.
            </p>
          </ScrollReveal>
        </div>

        {/* Subtle 0.3cm gradient: blue → white transition */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-white to-[#004691] pointer-events-none" />
      </section>

      {/* SERVICE CATEGORIES — with stagger + spring hover */}
      <section className="py-24 bg-white brand-pattern-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#d4a017] text-sm font-semibold tracking-[0.2em] uppercase">Especialidades</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-5">Áreas de Diseño</h2>
              <div className="w-12 h-1 bg-[#004691] mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="group rounded-[12px] overflow-hidden bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500">
                  <div className={`bg-gradient-to-r ${cat.color} p-8 text-center`}>
                    <div className="w-16 h-16 rounded-[8px] bg-white/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
                      <cat.icon size={32} strokeWidth={1.5} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  </div>
                  <div className="p-7">
                    <p className="text-[#4A4A4A] text-sm leading-[1.7] mb-5">{cat.description}</p>
                    <ul className="space-y-2.5 list-none m-0 p-0">
                      {cat.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#004691] shrink-0" />
                          <span className="text-[#4A4A4A] font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/51944106163?text=${encodeURIComponent(cat.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 text-[#004691] font-semibold text-sm flex items-center gap-2 group-hover:text-[#d4a017] transition-colors"
                    >
                      Cotizar Servicio <ChevronRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* PROJECT PRESENTATION BLOCKS — with stagger + spring hover */}
      <section className="py-24 bg-white brand-pattern-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#d4a017] text-sm font-semibold tracking-[0.2em] uppercase">Herramientas</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#004691] mt-3 mb-5">Presentación de Proyectos</h2>
              <div className="w-12 h-1 bg-[#004691] mx-auto rounded-full" />
              <p className="text-[#4A4A4A] max-w-2xl mx-auto mt-6 leading-[1.7]">
                Utilizamos herramientas de vanguardia para que nuestros clientes visualicen cada detalle de su proyecto antes de la construcción.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="scale" staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectBlocks.map((block, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="group bg-[#f7f8fa] rounded-[12px] p-7 border border-gray-100 hover:border-[#004691]/20 hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 rounded-[8px] bg-[#004691] flex items-center justify-center mb-5 group-hover:bg-[#d4a017] transition-all duration-500 group-hover:scale-110 shadow-lg">
                    <block.icon size={28} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#004691] mb-3">{block.title}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-[1.7] mb-5">{block.description}</p>
                  <div className="space-y-2.5">
                    {block.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3 px-4 py-2.5 rounded-[8px] bg-white border border-gray-100 group-hover:border-[#004691]/10">
                        <div className="w-5 h-5 rounded-full bg-[#004691]/10 flex items-center justify-center shrink-0 group-hover:bg-[#d4a017]/20 transition-colors">
                          <ChevronRight size={12} strokeWidth={1.5} className="text-[#004691] group-hover:text-[#d4a017] transition-colors" />
                        </div>
                        <span className="text-sm text-[#4A4A4A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ADDITIONAL SERVICES — with stagger + spring hover */}
      <section className="py-24 bg-white brand-pattern-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#004691] mb-5">Servicios Adicionales</h2>
              <p className="text-[#4A4A4A] max-w-xl mx-auto leading-[1.7]">
                Complementamos nuestra oferta principal con servicios especializados que garantizan un resultado integral y de máxima calidad.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {additionalServices.map((svc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="group flex flex-col items-center text-center p-5 rounded-[8px] bg-[#f7f8fa] border border-gray-100 hover:bg-[#004691] hover:border-[#004691] transition-all duration-500 hover:shadow-lg">
                  <div className="w-11 h-11 rounded-[8px] bg-[#004691]/10 flex items-center justify-center mb-3.5 group-hover:bg-white/15 transition-all duration-500 group-hover:scale-110">
                    <svc.icon size={22} strokeWidth={1.5} className="text-[#004691] group-hover:text-[#d4a017] transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-[#004691] group-hover:text-white transition-colors">{svc.label}</span>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal animation="fade">
        <section className="relative py-20 bg-[#004691]">
          {/* Subtle 0.3cm gradient: white → blue transition */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white to-[#004691] pointer-events-none z-10" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">¿Necesitas un servicio personalizado?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-[1.7]">
              Cada proyecto es único. Contáctanos para recibir una propuesta adaptada a tus necesidades
              específicas y descubre cómo podemos hacer realidad tu visión.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, necesito un servicio personalizado de arquitectura. ¿Podrían asesorarme?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#d4a017] text-[#003466] rounded-[8px] font-semibold shadow-lg inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212,160,23,0.35)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Phone size={18} strokeWidth={1.5} /> Solicitar Cotización
              </motion.a>
              <motion.a
                href="mailto:info@sertradedesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-white/30 text-white rounded-[8px] font-medium inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Mail size={18} strokeWidth={1.5} /> Enviar Correo
              </motion.a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
