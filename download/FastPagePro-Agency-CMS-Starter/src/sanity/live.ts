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

// ── Client with stega for Visual Editing ──
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: true,
    studioUrl: "/admin",
  },
});

// ── Tokens ──
const token = process.env.SANITY_API_READ_TOKEN;
const browserToken = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

// ── Export sanityFetch and SanityLive ──
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: browserToken,
});
