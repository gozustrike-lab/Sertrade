'use client';

import { useState } from 'react';
import {
  MapPin,
  Maximize2,
  Calendar,
  Building2,
  Filter,
  Eye,
  ArrowRight,
} from 'lucide-react';

const categories = ['Todos', 'Comercial', 'Salud', 'Residencial'];

const projects = [
  {
    id: 1,
    title: 'Centro Comercial Plaza Central',
    category: 'Comercial',
    location: 'Lima, Peru',
    area: '15,000 m2',
    year: '2023',
    client: 'Inversiones SAC',
    status: 'Completado',
    description:
      'Un complejo comercial de tres niveles que integra retail, entretenimiento y gastronomia bajo un concepto arquitectonico moderno y sostenible. El diseno prioriza la circulacion fluida y la experiencia del visitante con espacios abiertos iluminados naturalmente.',
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80',
    ],
  },
  {
    id: 2,
    title: 'Clinica San Rafael',
    category: 'Salud',
    location: 'Bogota, Colombia',
    area: '8,500 m2',
    year: '2022',
    client: 'Grupo Salud Integral',
    status: 'Completado',
    description:
      'Una clinica de alta complejidad disenada para optimizar los flujos clinicos y ofrecer un ambiente terapeutico. Las areas de espera se concibieron como jardines interiores que promueven la calma y el bienestar de pacientes y acompanantes.',
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80',
    ],
  },
  {
    id: 3,
    title: 'Residencial Los Cedros',
    category: 'Residencial',
    location: 'La Molina, Lima',
    area: '3,200 m2',
    year: '2024',
    client: 'Privado',
    status: 'En Proceso',
    description:
      'Vivienda unifamiliar contemporanea que fusiona la calidez del hogar con lineas arquitectonicas audaces. Grandes ventanales de piso a techo conectan el interior con el jardin, creando una experiencia de vida integra con la naturaleza circundante.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
    ],
  },
  {
    id: 4,
    title: 'Oficinas Torre Andina',
    category: 'Comercial',
    location: 'Quito, Ecuador',
    area: '6,000 m2',
    year: '2023',
    client: 'Corporacion Andina',
    status: 'Completado',
    description:
      'Torre de oficinas corporativas con certificacion LEED Gold. El diseno incorpora bioclimatismo, paneles solares y jardines verticales. Los espacios de coworking y terrazas verdes fomentan la colaboracion y el bienestar laboral.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80',
    ],
  },
  {
    id: 5,
    title: 'Hospital Metropolitano',
    category: 'Salud',
    location: 'Guayaquil, Ecuador',
    area: '22,000 m2',
    year: '2024',
    client: 'Ministerio de Salud',
    status: 'En Proceso',
    description:
      'Proyecto hospitalario de gran escala con 200 camas. El diseno modular permite futuras ampliaciones, mientras que la eficiencia energetica y la iluminacion natural son pilares fundamentales de la concepcion espacial.',
    images: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80',
    ],
  },
  {
    id: 6,
    title: 'Casa del Lago',
    category: 'Residencial',
    location: 'Cusco, Peru',
    area: '1,800 m2',
    year: '2023',
    client: 'Privado',
    status: 'Completado',
    description:
      'Residencia de lujo junto al lago que integra materiales locales como piedra andina y madera de eucalipto en un diseno contemporaneo. La casa se organiza en volumenes escalonados que se adaptan a la topografia del terreno.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
    ],
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20">
      {/* HERO HEADER */}
      <section className="relative bg-[#003366] py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#c8a951]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <Building2 size={14} strokeWidth={1.5} className="text-[#c8a951]" />
            <span className="text-white/80 text-xs tracking-widest uppercase">Portafolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Nuestros Proyectos
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada proyecto es un testimonio de nuestro compromiso con la excelencia, la innovacion
            y la satisfaccion de nuestros clientes.
          </p>
        </div>
      </section>

      {/* FILTER & PROJECTS */}
      <section className="py-24 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex items-center justify-center gap-3 mb-16 flex-wrap">
            <Filter size={18} strokeWidth={1.5} className="text-gray-400 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#003366] text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#003366]/30 hover:text-[#003366]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-16">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Layout: 1 large + 2 small */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Large Image */}
                  <div className="md:col-span-2 relative overflow-hidden h-64 md:h-80">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredProject === project.id ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-[#003366] text-white text-xs font-semibold rounded-full tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Completado'
                            ? 'bg-green-500/90 text-white'
                            : 'bg-amber-500/90 text-white'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-[#003366]/60 flex items-center justify-center transition-opacity duration-500 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#003366] rounded-full font-semibold hover:bg-[#c8a951] transition-colors">
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
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            hoveredProject === project.id ? 'scale-110' : 'scale-100'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description & Data Section */}
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    {/* Left: Description */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#003366] mb-3 group-hover:text-[#004d99] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
                      <button className="text-[#003366] font-semibold text-sm flex items-center gap-2 hover:text-[#c8a951] transition-colors group/btn">
                        Ver proyecto completo <ArrowRight size={16} strokeWidth={1.5} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Right: Data Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:min-w-[380px]">
                      {[
                        { icon: MapPin, label: 'Ubicacion', value: project.location },
                        { icon: Maximize2, label: 'Area', value: project.area },
                        { icon: Calendar, label: 'Ano', value: project.year },
                        { icon: Building2, label: 'Cliente', value: project.client },
                      ].map((data, j) => (
                        <div key={j} className="p-4 rounded-xl bg-[#f7f8fa] border border-gray-100">
                          <div className="flex items-center gap-2 mb-1.5">
                            <data.icon size={14} strokeWidth={1.5} className="text-[#c8a951]" />
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{data.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-[#003366]">{data.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <button className="px-10 py-4 bg-[#003366] text-white rounded-full font-semibold hover:bg-[#004d99] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2">
              Cargar Mas Proyectos <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
