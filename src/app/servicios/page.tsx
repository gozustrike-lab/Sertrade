import ServicesPage from '@/components/ServicesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios de Arquitectura | Sertrade Design',
  description: 'Soluciones integrales en arquitectura: EPCM, infoarquitectura, modelado 3D, recorridos virtuales y diseño de espacios comerciales, de salud y residenciales. Más de 14 años de experiencia en Latinoamérica.',
  openGraph: {
    title: 'Servicios de Arquitectura | Sertrade Design',
    description: 'EPCM, infoarquitectura, modelado 3D y recorridos virtuales. Soluciones integrales para espacios comerciales, de salud y residenciales.',
    images: [{ url: '/og-servicios-final.png', width: 1200, height: 630, alt: 'Servicios de Arquitectura - Sertrade Design' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Arquitectura | Sertrade Design',
    description: 'EPCM, infoarquitectura, modelado 3D y recorridos virtuales. Soluciones integrales para espacios comerciales, de salud y residenciales.',
    images: ['/og-servicios-final.png'],
  },
};

export default function Page() {
  return <ServicesPage />;
}
