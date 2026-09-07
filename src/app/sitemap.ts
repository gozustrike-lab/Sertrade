import type { MetadataRoute } from "next";
import { fetchCMS } from "@/lib/fetchCMS";
import { ALL_PROJECTS_QUERY, ALL_SERVICES_QUERY } from "@/lib/sanity.queries";
import type { SanityProject, SanityService } from "@/lib/sanity.client";

const BASE_URL = "https://www.sertradeproyectos.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic service pages
  try {
    const services = await fetchCMS<SanityService[]>(ALL_SERVICES_QUERY);
    const servicePages: MetadataRoute.Sitemap = (services || [])
      .filter((service) => Boolean(service?.slug))
      .map((service) => ({
        url: `${BASE_URL}/servicios/${encodeURI(String(service.slug).trim())}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    staticPages.push(...servicePages);
  } catch (e) {
    console.error("Sitemap: could not fetch services", e);
  }

  // Dynamic project pages
  try {
    const projects = await fetchCMS<SanityProject[]>(ALL_PROJECTS_QUERY);
    const projectPages: MetadataRoute.Sitemap = (projects || [])
      .filter((project) => Boolean(project?.slug))
      .map((project) => ({
        url: `${BASE_URL}/proyectos/${encodeURI(String(project.slug).trim())}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    staticPages.push(...projectPages);
  } catch (e) {
    console.error("Sitemap: could not fetch projects", e);
  }

  return staticPages;
}
