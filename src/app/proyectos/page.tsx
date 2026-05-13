import ProjectsPage from '@/components/ProjectsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portafolio de Proyectos | Sertrade Design',
  description: 'Explora nuestra trayectoria y casos de éxito en arquitectura y construcción a nivel global. Comercial, salud y residencial.',
  openGraph: {
    title: 'Portafolio de Proyectos | Sertrade Design',
    description: 'Explora nuestra trayectoria y casos de éxito en arquitectura y construcción a nivel global.',
    images: [{ url: '/og-proyectos-final.png', width: 1200, height: 630, alt: 'Proyectos - Sertrade Design' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portafolio de Proyectos | Sertrade Design',
    description: 'Explora nuestra trayectoria y casos de éxito en arquitectura y construcción a nivel global.',
    images: ['/og-proyectos-final.png'],
  },
};

export default function Page() {
  return <ProjectsPage />;
}
