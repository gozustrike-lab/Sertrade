// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Constants (Environment-Driven)
// Branding y configuración dinámica por proyecto.
// Cada nueva web solo necesita cambiar las variables de entorno.
// ============================================================

/** Nombre de la empresa — lee desde env */
export const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "Fast Page Pro Client";

/** Título dinámico del Sanity Studio */
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;

/** URL del sitio (para previews, metadata, Presentation Tool) */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ── Colores de marca — SOBRESCRIBIR por proyecto ──
// Sertrade: Blue #004691, Gold #D4AF37, Dark Navy #001C3D
// Cada agencia/proyecto cambia estos valores.
export const BRAND_COLORS = {
  primary: "#004691",
  accent: "#D4AF37",
  dark: "#001C3D",
} as const;
