'use client';

import { useState } from 'react';
import {
  MapPin, Maximize2, Calendar, Building2, Filter, Eye, ArrowRight,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';

const categories = ['Todos', 'Comercial', 'Salud', 'Residencial'];

const projects = [
  { id: 1, title: 'Centro Comercial Plaza Central', category: 'Comercial', location: 'Lima, Peru', area: '15,000 m2', year: '2023', client: 'Inversiones SAC', status: 'Completado', description: 'Un complejo comercial de tres niveles que integra retail, entretenimiento y gastronomia bajo un concepto arquitectonico moderno y sostenible. El diseno prioriza la circulacion fluida y la experiencia del visitante con espacios abiertos iluminados naturalmente.', images: ['https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80', 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&q=80', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80'] },
  { id: 2, title: 'Clinica San Rafael', category: 'Salud', location: 'Bogota, Colombia', area: '8,500 m2', year: '2022', client: 'Grupo Salud Integral', status: 'Completado', description: 'Una clinica de alta complejidad disenada para optimizar los flujos clinicos y ofrecer un ambiente terapeutico. Las areas de espera se concibieron como jardines interiores que promueven la calma y el bienestar de pacientes y acompanantes.', images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80'] },
  { id: 3, title: 'Residencial Los Cedros', category: 'Residencial', location: 'La Molina, Lima', area: '3,200 m2', year: '2024', client: 'Privado', status: 'En Proceso', description: 'Vivienda unifamiliar contemporanea que fusiona la calidez del hogar con lineas arquitectonicas audaces. Grandes ventanales de piso a techo conectan el interior con el jardin, creando una experiencia de vida integra con la naturaleza circundante.', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80'] },
  { id: 4, title: 'Oficinas Torre Andina', category: 'Comercial', location: 'Quito, Ecuador', area: '6,000 m2', year: '2023', client: 'Corporacion Andina', status: 'Completado', description: 'Torre de oficinas corporativas con certificacion LEED Gold. El diseno incorpora bioclimatismo, paneles solares y jardines verticales. Los espacios de coworking y terrazas verdes fomentan la colaboracion y el bienestar laboral.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80'] },
  { id: 5, title: 'Hospital Metropolitano', category: 'Salud', location: 'Guayaquil, Ecuador', area: '22,000 m2', year: '2024', client: 'Ministerio de Salud', status: 'En Proceso', description: 'Proyecto hospitalario de gran escala con 200 camas. El diseno modular permite futuras ampliaciones, mientras que la eficiencia energetica y la iluminacion natural son pilares fundamentales de la concepcion espacial.', images: ['https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80', 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80'] },
  { id: 6, title: 'Casa del Lago', category: 'Residencial', location: 'Cusco, Peru', area: '1,800 m2', year: '2023', client: 'Privado', status: 'Completado', description: 'Residencia de lujo junto al lago que integra materiales locales como piedra andina y madera de eucalipto en un diseno contemporaneo. La casa se organiza en volumenes escalonados que se adaptan a la topografia del terreno.', images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80'] },
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
    <div className="pt-[64px]">
      {/* HERO HEADER */}
      <section className="relative bg-[#004691] py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 border border-white/5 rotate-45 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 border border-[#d4a017]/10 -rotate-12 translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 mb-6">
              <Building2 size={14} strokeWidth={1.5} className="text-[#d4a017]" />
              <span className="text-white/80 text-xs tracking-widest uppercase">Portafolio</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Nuestros Proyectos</h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.35}>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Cada proyecto es un testimonio de nuestro compromiso con la excelencia, la innovacion y la satisfaccion de nuestros clientes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FILTER & PROJECTS */}
      <section className="py-24 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-16 flex-wrap">
              <Filter size={16} strokeWidth={1.5} className="text-gray-400 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat ? 'bg-[#004691] text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#004691]/30 hover:text-[#004691]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="space-y-14">
            {filteredProjects.map((project) => (
              <ScrollReveal key={project.id} animation="fade-up">
                <div
                  className="group bg-white rounded-[12px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Image Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Large Image */}
                    <div className="md:col-span-2 relative overflow-hidden h-64 md:h-80">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 cursor-pointer ${hoveredProject === project.id ? 'scale-105' : 'scale-100'}`}
                        onClick={() => openLightbox(project.images, 0)}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-[#004691] text-white text-xs font-semibold rounded-[8px] tracking-wider uppercase">{project.category}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-[8px] text-xs font-semibold ${project.status === 'Completado' ? 'bg-green-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className={`absolute inset-0 bg-[#004691]/60 flex items-center justify-center transition-opacity duration-500 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                        <button onClick={() => openLightbox(project.images, 0)} className="flex items-center gap-2 px-6 py-3 bg-white text-[#004691] rounded-[8px] font-semibold hover:bg-[#d4a017] hover:text-[#003466] transition-colors">
                          <Eye size={18} strokeWidth={1.5} /> Ver Detalle
                        </button>
                      </div>
                    </div>

                    {/* Two Small Images */}
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-0">
                      {project.images.slice(1).map((img, j) => (
                        <div key={j} className="relative overflow-hidden h-32 md:h-40">
                          <img
                            src={img}
                            alt={`${project.title} - ${j + 2}`}
                            className={`w-full h-full object-cover transition-transform duration-700 cursor-pointer ${hoveredProject === project.id ? 'scale-110' : 'scale-100'}`}
                            onClick={() => openLightbox(project.images, j + 1)}
                          />
                          {/* Zoom icon overlay */}
                          <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Eye size={20} strokeWidth={1.5} className="text-white" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description & Data */}
                  <div className="p-7">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-7">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#004691] mb-3 group-hover:text-[#0062b8] transition-colors">{project.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
                        <button onClick={() => openLightbox(project.images, 0)} className="text-[#004691] font-semibold text-sm flex items-center gap-2 hover:text-[#d4a017] transition-colors group/btn">
                          Ver proyecto completo <ArrowRight size={16} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:min-w-[360px]">
                        {[
                          { icon: MapPin, label: 'Ubicacion', value: project.location },
                          { icon: Maximize2, label: 'Area', value: project.area },
                          { icon: Calendar, label: 'Ano', value: project.year },
                          { icon: Building2, label: 'Cliente', value: project.client },
                        ].map((data, j) => (
                          <div key={j} className="p-3.5 rounded-[8px] bg-[#f7f8fa] border border-gray-100">
                            <div className="flex items-center gap-2 mb-1.5">
                              <data.icon size={13} strokeWidth={1.5} className="text-[#d4a017]" />
                              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{data.label}</span>
                            </div>
                            <span className="text-sm font-semibold text-[#004691]">{data.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-16">
            <ScrollReveal animation="scale">
              <button className="px-10 py-4 bg-[#004691] text-white rounded-[8px] font-semibold hover:bg-[#0062b8] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] inline-flex items-center gap-2">
                Cargar Mas Proyectos <ArrowRight size={18} strokeWidth={1.5} />
              </button>
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
