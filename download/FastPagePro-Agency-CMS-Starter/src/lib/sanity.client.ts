// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Sanity Client + Image Builder + Types
// Client for fetching published data with stega for Visual Editing.
//
// REGLA FAST PAGE PRO:
// Footer credits ("Desarrollado por FastPagePro.com") are
// HARDCODED and never pass through this client.
// ============================================================

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// ── Client ──
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  stega: {
    enabled: true,
    studioUrl: "/admin",
  },
});

// ── Image URL Builder ──
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ═══════════════════════════════════════════════════
// TYPESCRIPT INTERFACES
// ═══════════════════════════════════════════════════

/** Image with expanded asset */
export interface SanityImage {
  asset?: { _ref: string; _type: string; _id?: string; url?: string };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

/** Portable Text block */
export interface PortableTextBlock {
  _type: string;
  _key: string;
  children: Array<{ text: string; marks: string[] }>;
  style?: string;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  listItem?: string;
  level?: number;
}

/** File (for videos) */
export interface SanityFile {
  asset?: { _ref: string; _type: string; url?: string };
}

// ── Document Types ──

export interface SanityServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order?: number;
}

export interface SanitySubservice {
  title: string;
  description?: string;
  image?: SanityImage | null;
}

export interface SanityService {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImage | null;
  description?: PortableTextBlock[];
  category?: SanityServiceCategory | null;
  subservices?: SanitySubservice[];
  featured?: boolean;
  order?: number;
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImage | null;
  gallery?: SanityImage[];
  description?: PortableTextBlock[];
  excerpt?: string;
  client?: string;
  location?: string;
  year?: string;
  area?: string;
  status?: "completed" | "in-progress" | "planned";
  tags?: string[];
  service?: { _id: string; title: string; slug: string } | null;
  featured?: boolean;
  order?: number;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  slug: string;
  role: string;
  department?: string;
  photo?: SanityImage | null;
  bio?: PortableTextBlock[];
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  order?: number;
}

export interface SanityTestimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  quote?: PortableTextBlock[];
  photo?: SanityImage | null;
  rating?: number;
  project?: { _id: string; title: string; slug: string } | null;
  featured?: boolean;
  order?: number;
}

export interface SanityPartner {
  _id: string;
  name: string;
  logo?: SanityImage | null;
  url?: string;
  order?: number;
}

export interface SanityHeroSlide {
  _id: string;
  title: string;
  subtitle?: PortableTextBlock[];
  backgroundImage?: SanityImage | null;
  backgroundVideoMp4?: SanityFile | null;
  backgroundVideoWebm?: SanityFile | null;
  posterImage?: SanityImage | null;
  mobileFallbackImage?: SanityImage | null;
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
  ctaType?: "primary" | "secondary" | "whatsapp" | "mail";
  order?: number;
}

export interface SanityStat {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  order?: number;
}

export interface SanitySiteSettings {
  _id: string;
  companyName?: string;
  slogan?: string;
  tagline?: string;
  logo?: SanityImage | null;
  logoWhite?: SanityImage | null;
  ogImage?: SanityImage | null;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  businessHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  mapZoom?: number;
  seoTitle?: string;
  seoDescription?: string;
}

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════

/** Extract plain text from Portable Text blocks */
export function plainText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join("\n")
    .trim();
}

/** Build image URL safely, returns null if no valid asset */
export function getImageUrl(
  image: SanityImage | null | undefined,
  width = 800,
  height = 600,
): string | null {
  if (!image || !image.asset) return null;
  try {
    return urlFor(image).width(width).height(height).fit("crop").url();
  } catch {
    return null;
  }
}

/** Build video file URL safely */
export function getVideoUrl(file: SanityFile | null | undefined): string | null {
  if (!file || !file.asset) return null;
  try {
    const ref = file.asset._ref || "";
    const parts = ref.split("-");
    parts[0] = "file";
    const [projectId, dataset, ...idParts] = parts;
    const id = idParts.join("-");
    const cdnBase = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`
      : "";
    return `${cdnBase}/${id}.${file.asset._ref.split('.').pop() || 'mp4'}`;
  } catch {
    return null;
  }
}
