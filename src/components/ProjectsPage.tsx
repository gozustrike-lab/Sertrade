'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  MapPin, Maximize2, Calendar, Building2, Eye, ArrowRight, MessageCircle, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';

const categories = ['Todos', 'Comercial', 'Salud', 'Residencial'];

const projects = [
  { id: 1, slug: 'plaza-central', title: 'Centro Comercial Plaza Central', category: 'Comercial', location: 'Lima, Perú', area: '15,000 m²', year: '2023', client: 'Inversiones SAC', status: 'Completado', description: 'Un complejo comercial de tres niveles que integra retail, entretenimiento y gastronomía bajo un concepto arquitectónico moderno y sostenible. El diseño prioriza la circulación fluida y la experiencia del visitante con espacios abiertos iluminados naturalmente.', images: ['https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80', 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&q=80', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80'] },
  { id: 2, slug: 'clinica-san-rafael', title: 'Clínica San Rafael', category: 'Salud', location: 'Bogotá, Colombia', area: '8,500 m²', year: '2022', client: 'Grupo Salud Integral', status: 'Completado', description: 'Una clínica de alta complejidad diseñada para optimizar los flujos clínicos y ofrecer un ambiente terapéutico. Las áreas de espera se concibieron como jardines interiores que promueven la calma y el bienestar de pacientes y acompañantes.', images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&q=80', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80'] },
  { id: 3, slug: 'residencial-los-cedros', title: 'Residencial Los Cedros', category: 'Residencial', location: 'La Molina, Lima', area: '3,200 m²', year: '2024', client: 'Privado', status: 'En Proceso', description: 'Vivienda unifamiliar contemporánea que fusiona la calidez del hogar con líneas arquitectónicas audaces. Grandes ventanales de piso a techo conectan el interior con el jardín, creando una experiencia de vida íntegra con la naturaleza circundante.', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'] },
  { id: 4, slug: 'oficinas-torre-andina', title: 'Oficinas Torre Andina', category: 'Comercial', location: 'Quito, Ecuador', area: '6,000 m²', year: '2023', client: 'Corporación Andina', status: 'Completado', description: 'Torre de oficinas corporativas con certificación LEED Gold. El diseño incorpora bioclimatismo, paneles solares y jardines verticales. Los espacios de coworking y terrazas verdes fomentan la colaboración y el bienestar laboral.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'] },
  { id: 5, slug: 'hospital-metropolitano', title: 'Hospital Metropolitano', category: 'Salud', location: 'Guayaquil, Ecuador', area: '22,000 m²', year: '2024', client: 'Ministerio de Salud', status: 'En Proceso', description: 'Proyecto hospitalario de gran escala con 200 camas. El diseño modular permite futuras ampliaciones, mientras que la eficiencia energética y la iluminación natural son pilares fundamentales de la concepción espacial.', images: ['https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80'] },
  { id: 6, slug: 'casa-del-lago', title: 'Casa del Lago', category: 'Residencial', location: 'Cusco, Perú', area: '1,800 m²', year: '2023', client: 'Privado', status: 'Completado', description: 'Residencia de lujo junto al lago que integra materiales locales como piedra andina y madera de eucalipto en un diseño contemporáneo. La casa se organiza en volúmenes escalonados que se adaptan a la topografía del terreno.', images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'] },
];

/* Swipe threshold in px */
const SWIPE_THRESHOLD = 50;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect viewport for drag behavior */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Scroll to project from hash (e.g. #plaza-central) */
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const project = projects.find((p) => p.slug === hash);
    if (project) {
      /* Set category filter to match the project */
      setActiveCategory('Todos');
      /* Wait for render, then scroll */
      const timer = setTimeout(() => {
        const el = document.getElementById(`project-${project.slug}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          /* Brief highlight flash */
          el.style.transition = 'box-shadow 0.3s ease';
          el.style.boxShadow = '0 0 0 3px #d4a017, 0 0 30px rgba(212,160,23,0.3)';
          setTimeout(() => {
            el.style.boxShadow = '';
          }, 2000);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  /* Track current image index per project for swipe */
  const [projectImages, setProjectImages] = useState<Record<number, number>>({});
  const getImageIndex = (id: number) => projectImages[id] || 0;
  const setImageIndex = (id: number, idx: number) =>
    setProjectImages((prev) => ({ ...prev, [id]: idx }));

  /* Lightbox state */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredProjects =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  /* Track if a meaningful drag happened (to distinguish from tap) */
  const didSwipeRef = useRef(false);

  /* Swipe handler — Instagram-style: LEFT→next, RIGHT→prev */
  const handleSwipe = useCallback(
    (projectId: number, images: string[], info: PanInfo) => {
      const idx = getImageIndex(projectId);
      if (info.offset.x < -SWIPE_THRESHOLD) {
        /* Swiped LEFT → next image */
        setImageIndex(projectId, Math.min(idx + 1, images.length - 1));
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        /* Swiped RIGHT → prev image */
        setImageIndex(projectId, Math.max(idx - 1, 0));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectImages],
  );

  /* Tap handler — open lightbox with current image */
  const handleImageTap = (project: typeof projects[0]) => {
    openLightbox(project.images, getImageIndex(project.id));
  };

  return (
    <div>
      {/* ======== HERO HEADER — Solid uniform blue, clean edge ======== */}
      <section className="relative w-full bg-[#004691] overflow-hidden" style={{ minHeight: '40vh' }}>
        {/* Decorative geometric accents — ultra subtle */}
        <div className="absolute top-0 right-0 w-60 h-60 border border-white/5 rotate-45 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 border border-[#d4a017]/8 -rotate-12 translate-y-1/3 -translate-x-1/4" />

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 mb-4">
              <Building2 size={14} strokeWidth={1.5} className="text-[#d4a017]" />
              <span className="text-white/80 text-xs tracking-widest uppercase">Portafolio</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
            >
              Nuestros Proyectos
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p
              className="text-sm md:text-base text-white max-w-2xl mx-auto leading-relaxed mb-6"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
            >
              Cada proyecto es un testimonio de nuestro compromiso con la excelencia, la innovación y la satisfacción de nuestros clientes.
            </p>
          </ScrollReveal>
        </div>

        {/* Subtle 0.3cm gradient: blue → content transition */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '11px', background: 'linear-gradient(to top, #f7f8fa 0%, rgba(247,248,250,0.8) 4px, rgba(247,248,250,0.3) 7px, #004691 11px)' }} />
      </section>

      {/* ======== FILTER + GALLERY — Unified light wrapper ======== */}
      <div className="brand-pattern-wrapper bg-[#f7f8fa]">
        {/* ======== CATEGORY FILTER — Horizontal scroll on mobile ======== */}
        <section className="relative">
          {/* Fading overlays — mobile only */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f7f8fa] to-transparent pointer-events-none z-20 md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f7f8fa] to-transparent pointer-events-none z-20 md:hidden" />

          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" delay={0.15}>
              <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none justify-start md:justify-center items-center py-8 md:py-10 border-b border-gray-200/60 px-4 md:px-0">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-sm sm:text-base font-semibold tracking-[0.15em] uppercase transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 shrink-0 ${
                      activeCategory === cat
                        ? 'text-[#004691]'
                        : 'text-[#999] hover:text-[#4A4A4A]'
                    }`}
                  >
                    {/* Active underline indicator — fixed width centered */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300 ${
                        activeCategory === cat
                          ? 'w-8 bg-[#d4a017]'
                          : 'w-0 bg-[#d4a017]'
                      }`}
                    />
                    {cat}
                    {/* Dot separator between items — desktop only */}
                    {i < categories.length - 1 && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 select-none pointer-events-none hidden md:inline">/</span>
                    )}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ======== PROJECTS GALLERY ======== */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="space-y-20"
              >
                {filteredProjects.map((project) => {
                  const currentImgIdx = getImageIndex(project.id);
                  const totalImages = project.images.length;

                  return (
                    <article
                      key={project.id}
                      id={`project-${project.slug}`}
                      className="group rounded-xl transition-shadow duration-500"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="contents"
                      >
                        {/* TITLE — Above image */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 px-4 md:px-2">
                          <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#004691] tracking-wide group-hover:text-[#0062b8] transition-colors duration-300">
                              {project.title}
                            </h2>
                            <p className="text-[#4A4A4A] text-sm mt-2 max-w-2xl leading-[1.7]">{project.description}</p>
                          </div>
                          <button
                            onClick={() => handleImageTap(project)}
                            className="hidden sm:flex items-center gap-2 text-[#004691] font-semibold text-sm hover:text-[#d4a017] transition-colors group/btn shrink-0"
                          >
                            Ver galería <ArrowRight size={16} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        {/* ===== HERO IMAGE — Swipeable on mobile ===== */}
                        <div
                          className="relative overflow-hidden rounded-none md:rounded-xl shadow-lg"
                          style={{ height: 'clamp(280px, 60vh, 650px)' }}
                        >
                          {/* Swipeable image container — drag only on mobile, click on desktop */}
                          <motion.div
                            className="w-full h-full cursor-grab active:cursor-grabbing md:cursor-pointer"
                            drag={isMobile && totalImages > 1 ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.1}
                            onDragStart={() => { didSwipeRef.current = false; }}
                            onDrag={(_, info) => {
                              if (Math.abs(info.offset.x) > 8) didSwipeRef.current = true;
                            }}
                            onDragEnd={(_, info) => {
                              if (didSwipeRef.current) {
                                handleSwipe(project.id, project.images, info);
                              }
                              didSwipeRef.current = false;
                            }}
                            onTap={() => {
                              if (!didSwipeRef.current) {
                                handleImageTap(project);
                              }
                              didSwipeRef.current = false;
                            }}
                            onClick={() => {
                              /* Desktop fallback — when drag is false, framer-motion still fires onTap.
                                 This onClick ensures the lightbox opens even if onTap fails. */
                              if (!isMobile) {
                                handleImageTap(project);
                              }
                            }}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.img
                                key={currentImgIdx}
                                src={project.images[currentImgIdx]}
                                alt={`${project.title} - Imagen ${currentImgIdx + 1}`}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                loading="lazy"
                                draggable={false}
                              />
                            </AnimatePresence>
                          </motion.div>

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                          {/* Category Badge — top left */}
                          <div className="absolute top-4 left-4 md:top-5 md:left-5">
                            <span className="px-4 py-1.5 bg-[#004691] text-white text-xs font-semibold rounded-[8px] tracking-wider uppercase">
                              {project.category}
                            </span>
                          </div>

                          {/* Status Badge — top right */}
                          <div className="absolute top-4 right-4 md:top-5 md:right-5">
                            <span
                              className={`px-3 py-1 rounded-[8px] text-xs font-semibold ${
                                project.status === 'Completado'
                                  ? 'bg-green-500/90 text-white'
                                  : 'bg-amber-500/90 text-white'
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>

                          {/* Desktop: Lightbox CTA on hover — pointer-events-none so clicks pass through */}
                          <div
                            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-500 pointer-events-none md:flex hidden ${
                              hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <div className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-[12px] border border-white/20">
                              <Eye size={22} strokeWidth={1.5} className="text-white" />
                              <span className="text-white font-semibold tracking-wide">Abrir Galería</span>
                            </div>
                          </div>

                          {/* Desktop: Thumbnail strip on hover */}
                          {project.images.length > 1 && (
                            <div
                              className={`absolute bottom-4 left-1/2 -translate-x-1/2 items-center gap-2 transition-all duration-500 hidden md:flex ${
                                hoveredProject === project.id ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                              }`}
                            >
                              {project.images.map((img, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageIndex(project.id, i);
                                  }}
                                  className={`w-14 h-14 rounded-[8px] overflow-hidden border-2 transition-all duration-200 ${
                                    i === currentImgIdx
                                      ? 'border-[#d4a017] scale-110'
                                      : 'border-white/40 opacity-60 hover:opacity-100 hover:border-white/80'
                                  }`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={img} alt={`${project.title} miniatura ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Mobile: Instagram-style dot indicators */}
                          {totalImages > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:hidden">
                              {project.images.map((_, i) => (
                                <span
                                  key={i}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === currentImgIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          )}

                          {/* Mobile: Prev/Next chevrons (tap) */}
                          {totalImages > 1 && (
                            <>
                              {currentImgIdx > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageIndex(project.id, currentImgIdx - 1);
                                  }}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white md:hidden"
                                  aria-label="Imagen anterior"
                                >
                                  <ChevronLeft size={18} strokeWidth={2} />
                                </button>
                              )}
                              {currentImgIdx < totalImages - 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageIndex(project.id, currentImgIdx + 1);
                                  }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white md:hidden"
                                  aria-label="Siguiente imagen"
                                >
                                  <ChevronRight size={18} strokeWidth={2} />
                                </button>
                              )}
                            </>
                          )}
                        </div>

                        {/* DATA STRIP */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 px-4 md:px-2">
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
                            onClick={() => handleImageTap(project)}
                            className="sm:hidden flex items-center gap-2 text-[#004691] font-semibold text-xs ml-auto"
                          >
                            <Eye size={13} strokeWidth={1.5} /> Galería
                          </button>
                        </div>

                        {/* Thin separator between projects */}
                        <div className="mt-20 h-px bg-gray-200 mx-4 md:mx-0" />
                      </motion.div>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Load More CTA */}
            <div className="text-center mt-16 px-4 md:px-0">
              <ScrollReveal animation="scale">
                <button className="px-10 py-4 bg-[#004691] text-white rounded-[8px] font-semibold hover:bg-[#0062b8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] inline-flex items-center gap-2">
                  Cargar Más Proyectos <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </ScrollReveal>
            </div>

            {/* WhatsApp CTA */}
            <div className="text-center mt-12 px-4 md:px-0">
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
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
}
