'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PencilRuler, Wrench, Zap } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: 'DISEÑO',
    icon: PencilRuler,
    img: '/images/services/diseno.jpg',
    services: [
      'Ingeniería básica y de detalle.',
      'Modelado arquitectónico 3D.',
      'Optimización de flujos de trabajo.',
    ],
  },
  {
    id: 2,
    title: 'SERVICIOS GENERALES',
    icon: Wrench,
    img: '/images/services/servicios-generales.jpg',
    services: [
      'Drywall y acabados.',
      'Estructuras metálicas.',
      'Ampliaciones y obras civiles.',
    ],
  },
  {
    id: 3,
    title: 'IMPLEMENTACIÓN',
    icon: Zap,
    img: '/images/services/implementacion.jpg',
    services: [
      'Sub-estaciones eléctricas.',
      'Instalaciones eléctricas.',
      'Instalaciones sanitarias.',
    ],
  },
];

export default function ServiciosSection() {
  // Mobile tap state
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Touch device detection
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F7FA] py-20" style={{ overflow: 'visible' }}>

      {/* ===== HEADER TEXT ===== */}
      <div className="relative z-10 text-center mb-12 px-4">
        <span className="text-[#C5960C] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
          Nuestros Servicios
        </span>
        <h2 className="text-[#004691] text-3xl md:text-4xl font-black tracking-tight text-shadow-pro">
          Lo Que Hacemos
        </h2>
        <div className="w-12 h-1 bg-[#C5960C] mx-auto mt-3 rounded-full" />
      </div>

      {/* ===== 3D FLIP CARDS — FULL BLEED GRID ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-8" style={{ overflow: 'visible' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ overflow: 'visible', transformStyle: 'preserve-3d' }}>

          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                className="w-full h-[480px] md:h-[450px] cursor-pointer"
                style={{ perspective: '1200px', overflow: 'visible', transformStyle: 'preserve-3d' }}
                onClick={() => {
                  if (isTouch) {
                    setFlippedCard(flippedCard === card.id ? null : card.id);
                  }
                }}
              >
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: flippedCard === card.id ? 180 : 0 }}
                  whileHover={isTouch ? {} : { rotateY: 180, boxShadow: '0 25px 60px rgba(0,70,145,0.35)' }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {/* ===== FRONT FACE ===== */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col justify-center items-center p-6 relative"
                    style={{
                      backgroundImage: `url(${card.img})`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#004691]/60" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Icon — gold with vivid saturation */}
                      <div className="w-16 h-16 bg-[#C5960C] rounded-xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                        <IconComp size={30} strokeWidth={1.5} className="text-white" />
                      </div>
                      <h3 className="text-white text-2xl font-black tracking-wider mb-2 drop-shadow-md">
                        {card.title}
                      </h3>
                      {/* Responsive hint */}
                      <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase mt-4 block md:hidden">
                        Toca para ver ↗
                      </span>
                      <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase mt-4 hidden md:block">
                        Pasa el cursor ↗
                      </span>
                    </div>
                  </div>

                  {/* ===== BACK FACE — Blur Pro Effect ===== */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center p-8 flex flex-col justify-between text-white overflow-hidden"
                    style={{
                      backgroundImage: `url(${card.img})`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Premium blur layer + brand blue tint */}
                    <div className="absolute inset-0 bg-[#004691]/60 backdrop-blur-lg z-0" />

                    {/* Content: Title + Service List */}
                    <div className="relative z-10 w-full">
                      <h4 className="text-[#D4AF37] text-xl font-black mb-6 tracking-wider text-center uppercase drop-shadow-md">
                        {card.title}
                      </h4>
                      {/* Service list — left-aligned, centered in block */}
                      <ul className="max-w-[240px] mx-auto space-y-4 text-left text-sm font-medium text-white/95">
                        {card.services.map((service, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#D4AF37] text-base leading-none">•</span>
                            <span className="drop-shadow-sm">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="relative z-10 w-full px-2">
                      <a
                        href={`https://wa.me/51944106163?text=${encodeURIComponent(`Hola Sertrade Design, estoy interesado en cotizar el servicio de ${card.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3 bg-[#D4AF37] hover:bg-[#bfa032] text-[#004691] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-[0.98] text-center block"
                      >
                        COTIZAR SERVICIO
                      </a>
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
