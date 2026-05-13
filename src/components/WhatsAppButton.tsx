'use client';

import { MessageCircle } from 'lucide-react';

const PHONE = '51944106163';
const GLOBAL_MSG = encodeURIComponent('Hola Sertrade Design, vi su página web y me gustaría recibir asesoría sobre sus servicios de arquitectura.');

export { PHONE };

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${GLOBAL_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* BUTTON */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]">
          <MessageCircle size={28} strokeWidth={1.5} className="text-white fill-white/10" />
        </div>

        {/* PULSE NOTIFICATION DOT — top right */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444] shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
        </span>
      </div>

      {/* TOOLTIP */}
      <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-white rounded-xl shadow-xl text-sm text-[#003366] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Escríbenos por WhatsApp
        <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
      </div>
    </a>
  );
}
