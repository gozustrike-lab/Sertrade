// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Sanity Studio Configuration
// Embedded in Next.js App Router at /admin
// Plugins: Structure + Presentation (2 tabs only)
// No Releases, No Vision — clean interface for clients
// REUSABLE: reads COMPANY_NAME and BRAND_COLORS from env/constants
//
// REGLA FAST PAGE PRO:
// Footer credits ("Desarrollado por FastPagePro.com") are
// HARDCODED and never pass through this CMS.
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import {
  PackageIcon,
  HomeIcon,
  CogIcon,
  BookIcon,
  StackIcon,
  UsersIcon,
  MessageSquareIcon,
  BarChartIcon,
  DashboardIcon,
} from "@sanity/icons";
import { schemaTypes } from "./sanity/schema";
import {
  STUDIO_TITLE,
  SITE_URL,
  BRAND_COLORS,
} from "./sanity/lib/constants";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "fast-page-pro-studio",
  title: STUDIO_TITLE,

  projectId,
  dataset,

  // ── Studio embedded at /admin ──
  basePath: "/admin",

  // ── Disable Releases ──
  releases: {
    enabled: false,
  },

  // ── Plugins (Structure + Presentation) ──
  plugins: [
    structureTool({
      structure: (S) => {
        return S.list()
          .title("Panel de Control")
          .items([
            // ── Group 1: Homepage ──
            S.listItem()
              .title("Inicio")
              .icon(DashboardIcon)
              .id("home-group")
              .child(
                S.list()
                  .title("Inicio")
                  .items([
                    S.listItem()
                      .title("Hero (Slides)")
                      .icon(StackIcon)
                      .id("hero-slides")
                      .child(
                        S.documentTypeList("heroSlide")
                          .title("Slides del Hero")
                          .defaultOrdering([{ field: "order", direction: "asc" }]),
                      ),
                    S.listItem()
                      .title("Estadísticas")
                      .icon(BarChartIcon)
                      .id("stats-list")
                      .child(
                        S.documentTypeList("stat")
                          .title("Estadísticas")
                          .defaultOrdering([{ field: "order", direction: "asc" }]),
                      ),
                    S.listItem()
                      .title("Socios / Clientes")
                      .icon(UsersIcon)
                      .id("partners-list")
                      .child(
                        S.documentTypeList("partner")
                          .title("Socios / Clientes")
                          .defaultOrdering([{ field: "order", direction: "asc" }]),
                      ),
                  ]),
              ),

            // ── Group 2: Servicios ──
            S.listItem()
              .title("Servicios")
              .icon(PackageIcon)
              .id("services-group")
              .child(
                S.list()
                  .title("Servicios")
                  .items([
                    S.listItem()
                      .title("Categorías")
                      .icon(StackIcon)
                      .id("service-categories-list")
                      .child(
                        S.documentTypeList("serviceCategory")
                          .title("Categorías")
                          .defaultOrdering([{ field: "order", direction: "asc" }]),
                      ),
                    ...S.documentTypeListItems().filter(
                      (item) => item.getId() === "service",
                    ),
                  ]),
              ),

            // ── Group 3: Proyectos ──
            ...S.documentTypeListItems().filter(
              (item) => item.getId() === "project",
            ),

            // ── Group 4: Equipo ──
            ...S.documentTypeListItems().filter(
              (item) => item.getId() === "teamMember",
            ),

            // ── Group 5: Testimonios ──
            ...S.documentTypeListItems().filter(
              (item) => item.getId() === "testimonial",
            ),

            // ── Group 6: Config ──
            S.listItem()
              .title("Configuración del Sitio")
              .icon(CogIcon)
              .id("settings-group")
              .child(
                S.list()
                  .title("Configuración")
                  .items([
                    S.listItem()
                      .title("Datos del Sitio")
                      .icon(HomeIcon)
                      .id("site-settings-editor")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId("siteSettings")
                          .title("Configuración"),
                      ),
                  ]),
              ),

            // ── Group 7: Guide ──
            S.listItem()
              .title("Guía de Uso")
              .icon(BookIcon)
              .id("guide-group")
              .child(
                S.document()
                  .schemaType("studioGuide")
                  .documentId("studio-guide")
                  .title("Guía Paso a Paso"),
              ),
          ]);
      },
    }),

    // ── Presentation Tool ──
    presentationTool({
      document: {
        actions: [],
      },
      previewUrl: {
        initial:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : SITE_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          heroSlide: defineLocations({
            type: "heroSlide",
            resolve: () => ({
              locations: [{ title: "Inicio", href: "/" }],
            }),
          }),
          stat: defineLocations({
            type: "stat",
            resolve: () => ({
              locations: [{ title: "Inicio", href: "/" }],
            }),
          }),
          partner: defineLocations({
            type: "partner",
            resolve: () => ({
              locations: [{ title: "Inicio", href: "/" }],
            }),
          }),
          serviceCategory: defineLocations({
            type: "serviceCategory",
            resolve: () => ({
              locations: [{ title: "Servicios", href: "/servicios" }],
            }),
          }),
          service: defineLocations({
            type: "service",
            resolve: (doc) => ({
              locations: [
                { title: "Servicios", href: "/servicios" },
                {
                  title: `Servicio: ${doc.title || ""}`,
                  href: `/servicios#${doc.slug?.current || ""}`,
                },
              ],
            }),
          }),
          project: defineLocations({
            type: "project",
            resolve: (doc) => ({
              locations: [
                { title: "Proyectos", href: "/proyectos" },
                {
                  title: `Proyecto: ${doc.title || ""}`,
                  href: `/proyectos/${doc.slug?.current || ""}`,
                },
              ],
            }),
          }),
          teamMember: defineLocations({
            type: "teamMember",
            resolve: () => ({
              locations: [
                { title: "Nosotros", href: "/nosotros" },
              ],
            }),
          }),
          testimonial: defineLocations({
            type: "testimonial",
            resolve: () => ({
              locations: [{ title: "Inicio", href: "/" }],
            }),
          }),
          siteSettings: defineLocations({
            type: "siteSettings",
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Nosotros", href: "/nosotros" },
                { title: "Contacto", href: "/#contacto" },
              ],
            }),
          }),
        },
      },
    }),
  ],

  // ── Schemas ──
  schema: {
    types: schemaTypes,
  },

  // ── Document settings ──
  document: {
    unsavedChanges: {
      warning: "Tienes cambios sin guardar. ¿Seguro que quieres salir?",
    },
  },

  // ── Image uploads ──
  form: {
    image: {
      directUploads: true,
    },
  },

  // ── Studio theme (dynamic branding) ──
  theme: {
    "--brand-primary": BRAND_COLORS.primary,
    "--brand-accent": BRAND_COLORS.accent,
    "--brand-dark": BRAND_COLORS.dark,
  } as React.CSSProperties,
});
