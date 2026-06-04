import { sanityClient } from "@/lib/sanity.client";

/**
 * Safely fetch data from Sanity CMS. Returns null on failure for graceful fallback.
 * Uses sanityClient.fetch() for reliable typed queries with stega source maps.
 */
export async function fetchCMS<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
    const data = await sanityClient.fetch<T>(query);
    return data ?? null;
  } catch (error) {
    console.warn("[CMS] Fetch failed, using fallback:", error);
    return null;
  }
}
