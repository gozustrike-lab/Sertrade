import HomePage from '@/components/HomePage';
import { fetchCMS } from '@/lib/fetchCMS';
import {
  ALL_HERO_SLIDES_QUERY,
  ALL_STATS_QUERY,
  ALL_SERVICES_QUERY,
  ALL_PROJECTS_QUERY,
  ALL_PARTNERS_QUERY,
} from '@/lib/sanity.queries';
import type {
  SanityHeroSlide,
  SanityStat,
  SanityService,
  SanityProject,
  SanityPartner,
} from '@/lib/sanity.client';

export const revalidate = 60;

export default async function Page() {
  const [heroSlides, stats, services, projects, partners] = await Promise.all([
    fetchCMS<SanityHeroSlide[]>(ALL_HERO_SLIDES_QUERY),
    fetchCMS<SanityStat[]>(ALL_STATS_QUERY),
    fetchCMS<SanityService[]>(ALL_SERVICES_QUERY),
    fetchCMS<SanityProject[]>(ALL_PROJECTS_QUERY),
    fetchCMS<SanityPartner[]>(ALL_PARTNERS_QUERY),
  ]);

  return <HomePage />;
}
