import { sanityFetch } from "@/sanity/live";

/**
 * Safely fetch data from Sanity CMS. Returns null on failure for graceful fallback.
 */
export async function fetchCMS<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
    const data = await sanityFetch<T>(query, params);
    return data ?? null;
  } catch (error) {
    console.warn("[CMS] Fetch failed, using fallback:", error);
    return null;
  }
}
