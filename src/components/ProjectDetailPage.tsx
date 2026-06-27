'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Ruler, Briefcase, Users, ArrowLeft, ArrowRight,
  Eye, Maximize2, ChevronLeft, ChevronRight, Calendar,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';
import { ve } from '@/lib/ve';
import type { ProjectData } from '@/lib/projectHelpers';

/* ═══════════════════════════════════════════════════
   COMPONENT PROPS
   ═══════════════════════════════════════════════════ */
interface ProjectDetailPageProps {
  project: ProjectData | null;
  moreProjects: ProjectData[];
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ProjectDetailPage({ project, moreProjects }: ProjectDetailPageProps) {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#004691] mb-4">Proyecto no encontrado</h1>
          <button
            onClick={() => router.push('/proyectos')}
            className="inline-flex items-center gap-2 text-[#004691] font-semibold hover:text-[#d4a017] transition-colors"
          >
            <ArrowLeft size={18} /> Volver a Portafolio
          </button>
        </div>
      </div>
    );
  }

  const coverImage = project.images[0] || '';
  const galleryImages = project.images.slice(1);

  const specs = [
    { icon: MapPin, label: 'Ubicación', value: project.location },
    { icon: Ruler, label: 'Medida', value: project.area },
    { icon: Briefcase, label: 'Cliente', value: project.client },
    { icon: Calendar, label: 'Año', value: project.year },
  ].filter(s => s.value);

  return (
    <div className="bg-white min-h-screen">
      {/* ══════════════════════════════════════════════
          BACK BUTTON — Fixed top
          ══════════════════════════════════════════════ */}
      <div className="fixed top-20 left-4 md:left-8 z-50">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onClick={() => router.push('/proyectos')}
          className="group flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/60 hover:bg-white hover:shadow-xl hover:border-[#d4a017]/40 transition-all duration-300"
        >
          <ArrowLeft size={16} strokeWidth={2} className="text-[#004691] group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-semibold text-[#004691] tracking-wide uppercase">Volver a Portafolio</span>
        </motion.button>
      </div>

      {/* ══════════════════════════════════════════════
          HERO COVER IMAGE — Full bleed, 70vh
          ══════════════════════════════════════════════ */}
      <section className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
          {...(project._id ? ve(project._id, 'project', 'coverImage') : {})}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Project info overlay — bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Category badge + Status */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#004691]/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg tracking-wider uppercase">
                  {project.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                  project.status === 'Completado' ? 'bg-emerald-500/90 text-white' :
                  project.status === 'En Proceso' ? 'bg-amber-500/90 text-white' :
                  'bg-gray-400/90 text-white'
                }`}>
                  {project.status}
                </span>
                {project.year && (
                  <>
                    <span className="text-white/40">|</span>
                    <span className="text-white/70 text-xs font-medium tracking-wide flex items-center gap-1">
                      <Calendar size={12} strokeWidth={2} />
                      {project.year}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                {...(project._id ? ve(project._id, 'project', 'title') : {})}
              >
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Expand gallery button — bottom right */}
        {project.images.length > 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
            className="absolute bottom-10 md:bottom-14 right-4 sm:right-6 lg:right-8 flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white hover:bg-white/25 transition-all duration-300 hover:scale-105"
          >
            <Maximize2 size={16} strokeWidth={1.5} />
            <span className="text-xs font-semibold tracking-wide">{project.images.length} fotos</span>
          </motion.button>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          DESCRIPTION + SPECS SECTION
          ══════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Description — 7 columns */}
            <ScrollReveal animation="fade-up" className="lg:col-span-7">
              <h2 className="text-[#004691] text-lg md:text-xl font-bold uppercase tracking-wide mb-4">Sobre el Proyecto</h2>
              <div className="text-gray-700 text-sm md:text-[15px] leading-relaxed space-y-3" {...(project._id ? ve(project._id, 'project', 'description') : {})}>
                {project.description.split('\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* Specs — 5 columns */}
            <ScrollReveal animation="fade-up" delay={0.15} className="lg:col-span-5">
              <h2 className="text-[#004691] text-lg md:text-xl font-bold uppercase tracking-wide mb-4">Ficha Técnica</h2>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-[#f7f8fa] rounded-xl border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-[#004691] rounded-lg flex items-center justify-center shrink-0">
                      <spec.icon size={18} strokeWidth={2} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-0.5">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          IMAGE GALLERY GRID — 4 columns
          ══════════════════════════════════════════════ */}
      {project.images.length > 1 && (
        <section className="py-8 md:py-12 bg-[#f7f8fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <h2 className="text-[#004691] text-lg md:text-xl font-bold uppercase tracking-wide mb-6">Galería</h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" {...(project._id ? ve(project._id, 'project', 'gallery') : {})}>
                {project.images.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3] bg-gray-200"
                    onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.title} — Imagen ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={i < 2 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                          <Eye size={18} strokeWidth={1.5} className="text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Image counter — first image only */}
                    {i === 0 && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-md text-white text-[10px] font-medium">
                        {i + 1}/{project.images.length}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          FULL-WIDTH GALLERY STRIP (additional if many images)
          ══════════════════════════════════════════════ */}
      {project.images.length > 4 && (
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" {...(project._id ? ve(project._id, 'project', 'gallery') : {})}>
                {project.images.slice(0, 2).map((img, i) => (
                  <motion.div
                    key={`wide-${i}`}
                    whileHover={{ scale: 1.01 }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[16/9] bg-gray-200"
                    onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.title} — Panorámica ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Maximize2 size={20} strokeWidth={1.5} className="text-white drop-shadow-lg" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          MORE PROJECTS SECTION
          ══════════════════════════════════════════════ */}
      {moreProjects.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f7f8fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <h2 className="text-[#004691] text-lg md:text-xl font-bold uppercase tracking-wide">Más Proyectos</h2>
                <button
                  onClick={() => router.push('/proyectos')}
                  className="text-sm text-[#004691] font-semibold hover:text-[#d4a017] transition-colors flex items-center gap-1.5"
                >
                  Ver todos <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.1} staggerDelay={0.12}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {moreProjects.map((p) => (
                  <motion.article
                    key={p.slug}
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#d4a017]/30 transition-all duration-400 cursor-pointer"
                    onClick={() => router.push(`/proyectos/${p.slug}`)}
                    {...(p._id ? ve(p._id, 'project', 'title') : {})}
                  >
                    {/* Card image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-200" {...(p._id ? ve(p._id, 'project', 'coverImage') : {})}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0] || ''}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 bg-[#004691]/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-md tracking-wider uppercase">
                          {p.category}
                        </span>
                      </div>
                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                          p.status === 'Completado' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      {/* Arrow */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <ArrowRight size={14} strokeWidth={2} className="text-[#004691]" />
                        </div>
                      </div>
                    </div>
                    {/* Card content */}
                    <div className="p-4 md:p-5">
                      <h3 className="text-[#004691] text-sm md:text-base font-bold tracking-tight uppercase leading-tight mb-2 group-hover:text-[#d4a017] transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                        {p.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={11} strokeWidth={2} />
                            {p.location}
                          </span>
                        )}
                        {p.year && (
                          <>
                            <span className="text-gray-200">|</span>
                            <span>{p.year}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          BOTTOM CTA — Back to portfolio
          ══════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-[#004691]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-3">Explora más de nuestro trabajo</p>
            <button
              onClick={() => router.push('/proyectos')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-[#004691] rounded-lg font-semibold text-sm hover:bg-[#d4a017] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03]"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Volver a Portafolio
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LIGHTBOX
          ══════════════════════════════════════════════ */}
      <Lightbox
        images={project.images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}