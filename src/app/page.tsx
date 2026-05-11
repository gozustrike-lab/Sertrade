'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HomePage from '@/components/HomePage';
import ServicesPage from '@/components/ServicesPage';
import ProjectsPage from '@/components/ProjectsPage';

const ogMeta: Record<string, { title: string; description: string; image: string }> = {
  home: {
    title: 'Sertrade Design | Arquitectura Comercial e Innovacion',
    description: 'Especialistas en diseno retail, corporativo y residencial. Transformamos espacios con eficiencia y estetica.',
    image: '/og-home-final.png',
  },
  servicios: {
    title: 'Nuestros Servicios | Sertrade Design',
    description: 'Soluciones integrales en EPCM, diseno de salud, comercial y residencial.',
    image: '/og-servicios-final.png',
  },
  proyectos: {
    title: 'Portafolio de Proyectos | Sertrade Design',
    description: 'Explora nuestra trayectoria y casos de exito en arquitectura y construccion a nivel global.',
    image: '/og-proyectos-final.png',
  },
};

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');

  // Update OG meta tags dynamically when page changes
  useEffect(() => {
    const meta = ogMeta[currentPage];
    if (!meta) return;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    const setName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    setMeta('og:title', meta.title);
    setMeta('og:description', meta.description);
    setMeta('og:image', meta.image);
    setMeta('og:url', `https://sertradedesign.com/#${currentPage}`);
    setName('twitter:title', meta.title);
    setName('twitter:description', meta.description);
    setName('twitter:image', meta.image);

    // Update page title
    document.title = meta.title;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'servicios':
        return <ServicesPage />;
      case 'proyectos':
        return <ProjectsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
