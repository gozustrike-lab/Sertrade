import ServicesPage from '@/components/ServicesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestros Servicios | Sertrade Design',
  description: 'Soluciones integrales en EPCM, diseño de salud, comercial y residencial. Infoarquitectura, recorridos virtuales y modelado 3D.',
  openGraph: {
    title: 'Nuestros Servicios | Sertrade Design',
    description: 'Soluciones integrales en EPCM, diseño de salud, comercial y residencial.',
    images: [{ url: '/og-servicios-final.png', width: 1200, height: 630, alt: 'Servicios - Sertrade Design' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestros Servicios | Sertrade Design',
    description: 'Soluciones integrales en EPCM, diseño de salud, comercial y residencial.',
    images: ['/og-servicios-final.png'],
  },
};

export default function Page() {
  return <ServicesPage />;
}
