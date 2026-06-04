// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Site Settings (Singleton)
// Global site configuration: identity, contact, social, location, SEO.
// This is a SINGLETON document — only one instance exists.
//
// REGLA: Footer credits "Desarrollado por FastPagePro.com" are
// HARDCODED in the frontend and NOT editable from this schema.
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  icon: () => "🏢",

  fieldsets: [
    {
      name: "identity",
      title: "📋 Identidad Corporativa",
      description: "Nombre, logo y descripción de la empresa.",
      options: { collapsible: false },
    },
    {
      name: "contact",
      title: "📞 Información de Contacto",
      description: "Datos que aparecen en el Footer y página de contacto.",
      options: { collapsible: false },
    },
    {
      name: "social",
      title: "🌐 Redes Sociales",
      description: "URLs de perfiles sociales. Se muestran en el Footer.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "location",
      title: "📍 Ubicación (Google Maps)",
      description: "Coordenadas para el mapa embebido en el Footer.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seo",
      title: "🔍 SEO y Metadatos",
      description: "Títulos y descripciones para buscadores y Open Graph.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Identity ──
    defineField({
      name: "companyName",
      title: "Nombre de la Empresa",
      fieldset: "identity",
      description: "Nombre oficial. Aparece en el título del sitio y metadata.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(80)
          .error("El nombre es obligatorio (máximo 80 caracteres)."),
    }),
    defineField({
      name: "slogan",
      title: "Eslogan / Slogan",
      fieldset: "identity",
      description: "Frase corta que acompaña al nombre. Aparece en el Hero o Header.",
      type: "string",
      validation: (Rule) => Rule.max(150).optional(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline Descriptivo",
      fieldset: "identity",
      description: "Descripción breve de la empresa (1-2 líneas). Para sección 'Nosotros'.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(300).optional(),
    }),
    defineField({
      name: "logo",
      title: "Logo Principal",
      fieldset: "identity",
      description: "Logo en color para fondos claros. Se recomienda PNG o SVG con transparencia.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("El logo es obligatorio."),
    }),
    defineField({
      name: "logoWhite",
      title: "Logo Blanco (Fondos Oscuros)",
      fieldset: "identity",
      description: "Versión del logo en blanco puro para fondos oscuros/azules. Si no se carga, se usa el principal con filtro de inversión.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ogImage",
      title: "Imagen Open Graph (Compartidos)",
      fieldset: "identity",
      description: "Imagen que se muestra al compartir el enlace en WhatsApp, Facebook, LinkedIn. Se recomienda 1200×630px.",
      type: "image",
      options: { hotspot: true },
    }),

    // ── Contact ──
    defineField({
      name: "phone",
      title: "Teléfono",
      fieldset: "contact",
      description: 'Número visible. Ejemplo: "+51 944 106 163"',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(20)
          .error("El teléfono es obligatorio (máximo 20 caracteres)."),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp (número)",
      fieldset: "contact",
      description:
        'Número de WhatsApp sin espacios ni guiones. Para el botón de cotización. Ejemplo: "51944106163"',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(20)
          .error("El número de WhatsApp es obligatorio."),
    }),
    defineField({
      name: "email",
      title: "Correo Electrónico",
      fieldset: "contact",
      description: "Email de contacto. Se usa como enlace mailto:.",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("El correo electrónico es obligatorio."),
    }),
    defineField({
      name: "address",
      title: "Dirección",
      fieldset: "contact",
      description: "Dirección física. Se muestra en el Footer y Google Maps.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error("La dirección es obligatoria (máximo 200 caracteres)."),
    }),
    defineField({
      name: "businessHours",
      title: "Horario de Atención",
      fieldset: "contact",
      description: 'Ejemplo: "Lun-Vie 8:00-17:00 | Sáb 9:00-13:00"',
      type: "string",
      validation: (Rule) => Rule.max(80).optional(),
    }),

    // ── Social ──
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      fieldset: "social",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      fieldset: "social",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      fieldset: "social",
      type: "url",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      fieldset: "social",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      fieldset: "social",
      type: "url",
    }),

    // ── Location ──
    defineField({
      name: "mapLatitude",
      title: "Latitud",
      fieldset: "location",
      description: "Coordenada de latitud. Ejemplo: -12.0854 (Lima, Perú)",
      type: "number",
      validation: (Rule) =>
        Rule.min(-90)
          .max(90)
          .warning("La latitud debe estar entre -90 y 90 grados."),
    }),
    defineField({
      name: "mapLongitude",
      title: "Longitud",
      fieldset: "location",
      description: "Coordenada de longitud. Ejemplo: -77.0325 (Lima, Perú)",
      type: "number",
      validation: (Rule) =>
        Rule.min(-180)
          .max(180)
          .warning("La longitud debe estar entre -180 y 180 grados."),
    }),
    defineField({
      name: "mapZoom",
      title: "Nivel de Zoom del Mapa",
      fieldset: "location",
      description: "Zoom del mapa embebido (1-21). Recomendado: 15-17.",
      type: "number",
      initialValue: 17,
      validation: (Rule) =>
        Rule.min(1)
          .max(21)
          .integer()
          .warning("El zoom debe ser un entero entre 1 y 21."),
    }),

    // ── SEO ──
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      fieldset: "seo",
      description: "Título para buscadores. Se recomienda 50-60 caracteres.",
      type: "string",
      validation: (Rule) => Rule.max(60).optional(),
    }),
    defineField({
      name: "seoDescription",
      title: "Descripción SEO",
      fieldset: "seo",
      description: "Texto que aparece en resultados de Google y al compartir. Recomendado: 150-160 caracteres.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160).optional(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Configuración del Sitio",
        subtitle: "Identidad, Contacto, Redes Sociales, SEO",
      };
    },
  },
});
