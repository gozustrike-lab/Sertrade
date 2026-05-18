'use client';

import { useState } from 'react';
import {
  MapPin, Maximize2, Calendar, Building2, Eye, ArrowRight, MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';

const categories = ['Todos', 'Comercial', 'Salud', 'Residencial'];

const projects = [
  { id: 1, title: 'Centro Comercial Plaza Central', category: 'Comercial', location: 'Lima, Perú', area: '15,000 m²', year: '2023', client: 'Inversiones SAC', status: 'Completado', description: 'Un complejo comercial de tres niveles que integra retail, entretenimiento y gastronomía bajo un concepto arquitectónico moderno y sostenible. El diseño prioriza la circulación fluida y la experiencia del visitante con espacios abiertos iluminados naturalmente.', images: ['https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80', 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&q=80', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80'] },
  { id: 2, title: 'Clínica San Rafael', category: 'Salud', location: 'Bogotá, Colombia', area: '8,500 m²', year: '2022', client: 'Grupo Salud Integral', status: 'Completado', description: 'Una clínica de alta complejidad diseñada para optimizar los flujos clínicos y ofrecer un ambiente terapéutico. Las áreas de espera se concibieron como jardines interiores que promueven la calma y el bienestar de pacientes y acompañantes.', images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80'] },
  { id: 3, title: 'Residencial Los Cedros', category: 'Residencial', location: 'La Molina, Lima', area: '3,200 m²', year: '2024', client: 'Privado', status: 'En Proceso', description: 'Vivienda unifamiliar contemporánea que fusiona la calidez del hogar con líneas arquitectónicas audaces. Grandes ventanales de piso a techo conectan el interior con el jardín, creando una experiencia de vida íntegra con la naturaleza circundante.', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'] },
  { id: 4, title: 'Oficinas Torre Andina', category: 'Comercial', location: 'Quito, Ecuador', area: '6,000 m²', year: '2023', client: 'Corporación Andina', status: 'Completado', description: 'Torre de oficinas corporativas con certificación LEED Gold. El diseño incorpora bioclimatismo, paneles solares y jardines verticales. Los espacios de coworking y terrazas verdes fomentan la colaboración y el bienestar laboral.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'] },
  { id: 5, title: 'Hospital Metropolitano', category: 'Salud', location: 'Guayaquil, Ecuador', area: '22,000 m²', year: '2024', client: 'Ministerio de Salud', status: 'En Proceso', description: 'Proyecto hospitalario de gran escala con 200 camas. El diseño modular permite futuras ampliaciones, mientras que la eficiencia energética y la iluminación natural son pilares fundamentales de la concepción espacial.', images: ['https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80'] },
  { id: 6, title: 'Casa del Lago', category: 'Residencial', location: 'Cusco, Perú', area: '1,800 m²', year: '2023', client: 'Privado', status: 'Completado', description: 'Residencia de lujo junto al lago que integra materiales locales como piedra andina y madera de eucalipto en un diseño contemporáneo. La casa se organiza en volúmenes escalonados que se adaptan a la topografía del terreno.', images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'] },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredProjects = activeCategory === 'Todos' ? projects : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div>
      {/* COMPACT HERO HEADER — Slim gradient strip behind transparent header */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #004691 0%, #003a7a 50%, #002B5B 100%)' }}>
        {/* Decorative geometric accents */}
        <div className="absolute top-0 right-0 w-60 h-60 border border-white/5 rotate-45 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 border border-[#d4a017]/10 -rotate-12 translate-y-1/3 -translate-x-1/4" />
        {/* Slim content — clear header only */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-[120px] md:pt-[130px] pb-10 md:pb-12">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 mb-4">
              <Building2 size={14} strokeWidth={1.5} className="text-[#d4a017]" />
              <span className="text-white/80 text-xs tracking-widest uppercase">Portafolio</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">Nuestros Proyectos</h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-white/60 max-w-2xl mx-auto text-base leading-[1.7]">
              Cada proyecto es un testimonio de nuestro compromiso con la excelencia, la innovación y la satisfacción de nuestros clientes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* IMMERSIVE CATEGORY FILTER — Editorial text-only uppercase strip */}
      <section className="relative bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={0.15}>
            <div className="flex items-center justify-center py-8 md:py-10 border-b border-gray-200/60">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative text-sm sm:text-base font-semibold tracking-[0.15em] uppercase transition-all duration-400 px-4 sm:px-6 lg:px-8 py-3 group ${
                    activeCategory === cat
                      ? 'text-[#004691]'
                      : 'text-[#999] hover:text-[#4A4A4A]'
                  }`}
                >
                  {/* Active underline indicator */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-400 ${
                    activeCategory === cat
                      ? 'w-8 bg-[#d4a017]'
                      : 'w-0 bg-[#d4a017] group-hover:w-4'
                  }`} />
                  {cat}
                  {/* Dot separator between items */}
                  {i < categories.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 select-none pointer-events-none">/</span>
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROJECTS GALLERY */}
      <section className="py-16 md:py-20 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Projects — Full-Width Gallery Layout with Animated Filter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="space-y-20"
            >
            {filteredProjects.map((project) => (
                <article
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="contents"
                  >
                  {/* TITLE — Above image, large with tracking */}
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#004691] tracking-wide group-hover:text-[#0062b8] transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-[#4A4A4A] text-sm mt-2 max-w-2xl leading-[1.7]">{project.description}</p>
                    </div>
                    <button
                      onClick={() => openLightbox(project.images, 0)}
                      className="hidden sm:flex items-center gap-2 text-[#004691] font-semibold text-sm hover:text-[#d4a017] transition-colors group/btn shrink-0"
                    >
                      Ver galería <ArrowRight size={16} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* HERO IMAGE — Full Width, 60vh height */}
                  <div
                    className="relative overflow-hidden rounded-[12px] shadow-lg cursor-pointer"
                    style={{ height: 'clamp(280px, 60vh, 650px)' }}
                    onClick={() => openLightbox(project.images, 0)}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className={`img-lazy-zoom w-full h-full object-cover transition-transform duration-700 ${hoveredProject === project.id ? 'scale-105' : 'scale-100'}`}
                      loading="lazy"
                    />
                    {/* Gradient overlay for status badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Category Badge — top left */}
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-1.5 bg-[#004691] text-white text-xs font-semibold rounded-[8px] tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Status Badge — top right */}
                    <div className="absolute top-5 right-5">
                      <span className={`px-3 py-1 rounded-[8px] text-xs font-semibold ${
                        project.status === 'Completado' ? 'bg-green-500/90 text-white' : 'bg-amber-500/90 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Lightbox CTA — center on hover */}
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-500 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-[12px] border border-white/20">
                        <Eye size={22} strokeWidth={1.5} className="text-white" />
                        <span className="text-white font-semibold tracking-wide">Abrir Galería</span>
                      </div>
                    </div>

                    {/* Thumbnail strip — bottom on hover */}
                    {project.images.length > 1 && (
                      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-500 ${hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {project.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); openLightbox(project.images, i); }}
                            className={`w-14 h-14 rounded-[8px] overflow-hidden border-2 transition-all duration-200 ${
                              i === 0 ? 'border-[#d4a017] scale-110' : 'border-white/40 opacity-60 hover:opacity-100 hover:border-white/80'
                            }`}
                          >
                            <img src={img} alt={`${project.title} miniatura ${i + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DATA STRIP — Horizontal, subtle, below image */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 px-1">
                    {[
                      { icon: MapPin, value: project.location },
                      { icon: Maximize2, value: project.area },
                      { icon: Calendar, value: project.year },
                      { icon: Building2, value: project.client },
                    ].map((data, j) => (
                      <div key={j} className="flex items-center gap-2 text-[#888]">
                        <data.icon size={13} strokeWidth={1.5} className="text-[#d4a017]" />
                        <span className="text-xs font-light tracking-wide">{data.value}</span>
                      </div>
                    ))}
                    {/* Mobile gallery button */}
                    <button
                      onClick={() => openLightbox(project.images, 0)}
                      className="sm:hidden flex items-center gap-2 text-[#004691] font-semibold text-xs ml-auto"
                    >
                      <Eye size={13} strokeWidth={1.5} /> Galería
                    </button>
                  </div>

                  {/* Thin separator between projects */}
                  <div className="mt-20 h-px bg-gray-200" />
                  </motion.div>
                </article>
            ))}
          </motion.div>
          </AnimatePresence>

          {/* Load More CTA */}
          <div className="text-center mt-16">
            <ScrollReveal animation="scale">
              <button className="px-10 py-4 bg-[#004691] text-white rounded-[8px] font-semibold hover:bg-[#0062b8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] inline-flex items-center gap-2">
                Cargar Más Proyectos <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </ScrollReveal>
          </div>

          {/* WhatsApp CTA — Cotizar Proyecto Similar */}
          <div className="text-center mt-12">
            <ScrollReveal animation="fade-up" delay={0.15}>
              <a
                href={`https://wa.me/51944106163?text=${encodeURIComponent('Hola, estuve revisando su portafolio de proyectos y me interesa cotizar un desarrollo arquitectónico similar.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-[8px] font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
              >
                <MessageCircle size={20} strokeWidth={1.5} />
                Cotizar Proyecto Similar
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
}
