// @ts-nocheck — Sanity Live types are validated by Studio runtime
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Sanity Live (defineLive)
// Configures sanityFetch + SanityLive for real-time revalidation.
// Visual Editing overlay is handled separately in VisualEditing.tsx.
//
// IMPORTANT: The client MUST have stega.studioUrl configured
// for sanityFetch to return source maps (stega) when Draft Mode is active.
// ============================================================

import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

// ── Lazy Client — only created when projectId is available ──
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// ── Export sanityFetch and SanityLive ──
export const { sanityFetch, SanityLive } = projectId
  ? defineLive({
      client: createClient({
        projectId,
        dataset,
        apiVersion: "2025-01-01",
        useCdn: true,
        perspective: "published",
        stega: {
          enabled: true,
          studioUrl: "/admin",
        },
      }),
      serverToken: process.env.SANITY_API_READ_TOKEN,
      browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
    })
  : { sanityFetch: async () => ({ data: null, sourceMap: null, tags: [] }), SanityLive: () => null };
