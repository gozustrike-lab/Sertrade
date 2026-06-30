import { fetchCMS } from '@/lib/fetchCMS';
import { ALL_SERVICE_CATEGORIES_QUERY, serviceCategoryBySlugQuery, servicesByCategorySlugQuery } from '@/lib/sanity.queries';
import type { SanityService, SanityServiceCategory } from '@/lib/sanity.client';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/ServiceDetailPage';

export const revalidate = 0;

/* ═══════════════════════════════════════════════════
   STATIC PARAMS — pre-generate all category slugs
   ═══════════════════════════════════════════════════ */
const FALLBACK_SLUGS = ['diseno', 'servicios-generales', 'implementacion'];

const CATEGORY_LABELS: Record<string, string> = {
  diseno: 'Diseño',
  'servicios-generales': 'Servicios Generales',
  implementacion: 'Implementación',
};

export async function generateStaticParams() {
  try {
    const categories = await fetchCMS<SanityServiceCategory[]>(ALL_SERVICE_CATEGORIES_QUERY);
    if (categories?.length) {
      return categories
        .map(cat => {
          const slug = typeof cat.slug === 'string' ? cat.slug : (cat.slug as { current?: string })?.current;
          return slug ? { slug } : null;
        })
        .filter(Boolean) as { slug: string }[];
    }
  } catch {
    // CMS unavailable — use fallback slugs
  }
  return FALLBACK_SLUGS.map(slug => ({ slug }));
}

/* ═══════════════════════════════════════════════════
   DYNAMIC METADATA
   ═══════════════════════════════════════════════════ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCMS<SanityServiceCategory>(serviceCategoryBySlugQuery(slug));
  const title = category?.name || CATEGORY_LABELS[slug] || slug;

  return {
    title: `${title} | Sertrade Design`,
    description: `Servicio de ${title} — Soluciones integrales de arquitectura y diseño por Sertrade Design.`,
    openGraph: {
      title: `${title} | Sertrade Design`,
      description: `Servicio de ${title} — Soluciones integrales de arquitectura y diseño por Sertrade Design.`,
      images: [{ url: '/og-servicios-final.png', width: 1200, height: 630, alt: `${title} - Sertrade Design` }],
    },
  };
}

/* ═══════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the category and its services in parallel
  const [category, services] = await Promise.all([
    fetchCMS<SanityServiceCategory>(serviceCategoryBySlugQuery(slug)),
    fetchCMS<SanityService[]>(servicesByCategorySlugQuery(slug)),
  ]);

  return (
    <ServiceDetailPage
      category={category}
      services={services}
      fallbackSlug={slug}
    />
  );
}
