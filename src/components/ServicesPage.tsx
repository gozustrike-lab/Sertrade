'use client';

import {
  Store,
  HeartPulse,
  Home,
  LayoutGrid,
  Eye,
  Box,
  Paintbrush,
  ClipboardList,
  Lightbulb,
  MonitorSmartphone,
  Compass,
  Layers,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';

const serviceCategories = [
  {
    icon: Store,
    title: 'Diseno Comercial',
    description:
      'Creamos espacios comerciales estrategicos que potencian la marca y mejoran la experiencia del cliente. Desde boutiques hasta grandes centros comerciales, cada proyecto refleja la identidad unica de tu negocio.',
    features: ['Retail y Tiendas', 'Oficinas Corporativas', 'Centros Comerciales', 'Restaurantes y Cafes'],
    color: 'from-[#003366] to-[#004d99]',
  },
  {
    icon: HeartPulse,
    title: 'Diseno Salud',
    description:
      'Disenamos entornos de salud que combinan funcionalidad clinica con bienestar. Nuestros espacios hospitalarios y clinicos estan optimizados para la eficiencia y el confort de pacientes y profesionales.',
    features: ['Hospitales', 'Clinicas', 'Centros Medicos', 'Laboratorios'],
    color: 'from-[#003366] to-[#005577]',
  },
  {
    icon: Home,
    title: 'Diseno Residencial',
    description:
      'Transformamos la vision de nuestros clientes en hogares excepcionales. Cada diseno residencial es una fusion de estetica, funcionalidad y personalidad que refleja el estilo de vida unico de sus habitantes.',
    features: ['Casas Unifamiliares', 'Departamentos', 'Viviendas Multifamiliares', 'Remodelaciones'],
    color: 'from-[#003366] to-[#003d66]',
  },
];

const projectBlocks = [
  {
    icon: LayoutGrid,
    title: 'Infoarquitectura',
    description:
      'Organizamos y estructuramos la informacion de tus espacios para maximizar la usabilidad. Definimos flujos de circulacion, zonificaciones y distribuciones optimas.',
    items: ['Zonificacion funcional', 'Flujos de circulacion', 'Analisis de espacios'],
  },
  {
    icon: Eye,
    title: 'Recorridos Virtuales',
    description:
      'Ofrecemos experiencias inmersivas que permiten a tus clientes explorar cada rincon del proyecto antes de construir. Tecnologia 360 para una visualizacion completa.',
    items: ['Tours 360 grados', 'Realidad virtual', 'Visualizacion inmersiva'],
  },
  {
    icon: Box,
    title: 'Modelado 3D',
    description:
      'Cada proyecto cobra vida con nuestros renderizados fotorrealistas y modelos tridimensionales de alta precision que permiten anticipar cada detalle del resultado final.',
    items: ['Render fotorrealista', 'Animaciones 3D', 'Maquetas digitales'],
  },
];

const additionalServices = [
  { icon: Paintbrush, label: 'Interiorismo' },
  { icon: ClipboardList, label: 'Planimetria' },
  { icon: Lightbulb, label: 'Consultoria' },
  { icon: MonitorSmartphone, label: 'BIM / Revit' },
  { icon: Compass, label: 'Direccion de Obra' },
  { icon: Layers, label: 'Peritajes' },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* HERO HEADER - Blue Block */}
      <section className="relative bg-[#003366] py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#c8a951]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <Layers size={14} strokeWidth={1.5} className="text-[#c8a951]" />
            <span className="text-white/80 text-xs tracking-widest uppercase">Nuestros Servicios</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Alcance de Nuestros Servicios
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Ofrecemos soluciones integrales de arquitectura y diseno que abarcan desde la concepcion
            hasta la materializacion de cada proyecto, con estandares de calidad internacional.
          </p>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#c8a951] text-sm font-semibold tracking-[0.2em] uppercase">Especialidades</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366] mt-3 mb-5">
              Areas de Diseno
            </h2>
            <div className="w-16 h-1 bg-[#c8a951] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.map((cat, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Top */}
                <div className={`bg-gradient-to-r ${cat.color} p-8 text-center`}>
                  <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
                    <cat.icon size={36} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{cat.description}</p>
                  <ul className="space-y-3">
                    {cat.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-[#c8a951] shrink-0" />
                        <span className="text-gray-700 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 text-[#003366] font-semibold text-sm flex items-center gap-2 group-hover:text-[#c8a951] transition-colors">
                    Conocer mas <ChevronRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT PRESENTATION BLOCKS */}
      <section className="py-24 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#c8a951] text-sm font-semibold tracking-[0.2em] uppercase">Herramientas</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003366] mt-3 mb-5">
              Presentacion de Proyectos
            </h2>
            <div className="w-16 h-1 bg-[#c8a951] mx-auto rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Utilizamos herramientas de vanguardia para que nuestros clientes visualicen
              cada detalle de su proyecto antes de la construccion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectBlocks.map((block, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#003366]/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#003366] flex items-center justify-center mb-6 group-hover:bg-[#c8a951] transition-all duration-500 group-hover:scale-110 shadow-lg">
                  <block.icon size={30} strokeWidth={1.5} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-[#003366] mb-3">{block.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{block.description}</p>

                {/* Items */}
                <div className="space-y-3">
                  {block.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f7f8fa] border border-gray-100 group-hover:border-[#003366]/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#003366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c8a951]/20 transition-colors">
                        <ChevronRight size={12} strokeWidth={1.5} className="text-[#003366] group-hover:text-[#c8a951] transition-colors" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366] mb-5">Servicios Adicionales</h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              Complementamos nuestra oferta principal con servicios especializados que garantizan
              un resultado integral y de maxima calidad.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalServices.map((svc, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-[#f7f8fa] border border-gray-100 hover:bg-[#003366] hover:border-[#003366] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#003366]/10 flex items-center justify-center mb-4 group-hover:bg-white/15 transition-all duration-500 group-hover:scale-110">
                  <svc.icon size={24} strokeWidth={1.5} className="text-[#003366] group-hover:text-[#c8a951] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-[#003366] group-hover:text-white transition-colors">
                  {svc.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#003366]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Necesitas un servicio personalizado?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cada proyecto es unico. Contactanos para recibir una propuesta adaptada a tus necesidades
            especificas y descubre como podemos hacer realidad tu vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3.5 bg-[#c8a951] text-[#003366] rounded-full font-semibold hover:bg-[#d4b862] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2">
              <Phone size={18} strokeWidth={1.5} /> Solicitar Cotizacion
            </button>
            <button className="px-8 py-3.5 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2">
              <Mail size={18} strokeWidth={1.5} /> Enviar Correo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
