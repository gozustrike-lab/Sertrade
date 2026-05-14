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
    <section className="relative w-full overflow-hidden bg-[#F4F7FA] py-20">

      {/* ===== HEXAGONAL WATERMARK BACKGROUND — Floating Animation ===== */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpolygon points='28,2 52,15 52,37 28,50 4,37 4,15' fill='none' stroke='%23004691' stroke-width='0.8'/%3E%3Cpolygon points='28,52 52,65 52,87 28,100 4,87 4,65' fill='none' stroke='%23004691' stroke-width='0.8'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: 0.04,
          }}
        />
      </motion.div>

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

      {/* ===== 3D FLIP CARDS — IMMERSIVE GRID ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-0 rounded-none overflow-hidden shadow-2xl">

          {cards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                className="w-full h-[450px] cursor-pointer"
                style={{ perspective: '1000px' }}
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
                  whileHover={isTouch ? {} : { rotateY: 180 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
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

                  {/* ===== BACK FACE (rotateY 180°) ===== */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#004691] p-8 flex flex-col justify-between text-white"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      {/* Title with gold accent */}
                      <h4 className="text-[#C5960C] text-xl font-bold mb-6 tracking-wide text-center">
                        {card.title}
                      </h4>
                      {/* Service list — left-aligned, centered in block */}
                      <ul className="max-w-[240px] mx-auto space-y-3 text-left text-sm text-white/90">
                        {card.services.map((service, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#C5960C] font-bold mt-[1px]">•</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://wa.me/51944106163?text=${encodeURIComponent(`Hola Sertrade Design, estoy interesado en cotizar el servicio de ${card.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-3 bg-[#C5960C] hover:bg-[#d4a817] text-[#003466] font-black text-sm uppercase tracking-wider transition-colors duration-300 text-center block"
                    >
                      COTIZAR SERVICIO
                    </a>
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
