// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Project (Portfolio / Case Study)
// Each project is a case study with full gallery.
// ============================================================

import { defineField, defineType } from "sanity";
import {
  titleField,
  slugField,
  imageField,
  descriptionField,
  excerptField,
  orderField,
  featuredField,
} from "../lib/schema-master";

export default defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  icon: () => "📁",

  fieldsets: [
    {
      name: "info",
      title: "ℹ️ Información Principal",
      description: "Título, imagen, descripción del proyecto.",
      options: { collapsible: false },
    },
    {
      name: "gallery",
      title: "🖼️ Galería de Fotos",
      description: "Hasta 15 fotos del proyecto. Se muestran en el lightbox y detalle.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "detail",
      title: "📋 Detalles del Proyecto",
      description: "Cliente, ubicación, año, área, estado.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "display",
      title: "👁️ Visualización",
      description: "Tags, servicio relacionado y control de visibilidad.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Info ──
    titleField("Nombre del Proyecto"),
    slugField("title"),
    defineField({
      ...imageField("Imagen de Portada", true),
      name: "coverImage",
      title: "Imagen de Portada",
      description: "Imagen principal. Se recomienda 1200×800px.",
    }),
    descriptionField("Descripción del Proyecto"),
    excerptField("Resumen (para tarjetas)", 300),

    // ── Gallery ──
    defineField({
      name: "gallery",
      title: "Fotos del Proyecto",
      fieldset: "gallery",
      description: "Hasta 15 fotos. Se muestran en el lightbox del detalle.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Pie de foto",
              type: "string",
              description: "Texto opcional que describe la foto.",
              validation: (Rule: any) => Rule.max(80),
            },
          ],
          preview: {
            select: {
              asset: "asset",
              caption: "caption",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(15).error("Máximo 15 fotos en la galería."),
    }),

    // ── Detail ──
    defineField({
      name: "client",
      title: "Cliente",
      fieldset: "detail",
      description: "Nombre del cliente o empresa.",
      type: "string",
      validation: (Rule) => Rule.max(100).optional(),
    }),
    defineField({
      name: "location",
      title: "Ubicación del Proyecto",
      fieldset: "detail",
      description: "Ciudad o dirección del proyecto.",
      type: "string",
      validation: (Rule) => Rule.max(150).optional(),
    }),
    defineField({
      name: "year",
      title: "Año",
      fieldset: "detail",
      description: 'Año de ejecución. Ejemplo: "2024"',
      type: "string",
      validation: (Rule) => Rule.max(10).optional(),
    }),
    defineField({
      name: "area",
      title: "Área / Superficie",
      fieldset: "detail",
      description: 'Superficie del proyecto. Ejemplo: "2,500 m²"',
      type: "string",
      validation: (Rule) => Rule.max(50).optional(),
    }),
    defineField({
      name: "status",
      title: "Estado del Proyecto",
      fieldset: "detail",
      description: "Estado actual del proyecto.",
      type: "string",
      options: {
        list: [
          { title: "✅ Completado", value: "completed" },
          { title: "🔧 En Progreso", value: "in-progress" },
          { title: "📋 Planificado", value: "planned" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
    }),

    // ── Display ──
    defineField({
      name: "tags",
      title: "Etiquetas / Filtros",
      fieldset: "display",
      description: "Tags para filtrado. Ejemplo: Residencial, Comercial, Salud",
      type: "array",
      of: [{ type: "string" }],
      options: {
        of: [{ type: "string", title: "Etiqueta" }],
      },
      validation: (Rule) => Rule.max(10).error("Máximo 10 etiquetas."),
    }),
    defineField({
      name: "service",
      title: "Servicio Relacionado",
      fieldset: "display",
      description: "Vincula este proyecto al servicio principal.",
      type: "reference",
      to: [{ type: "service" }],
      options: { disableNew: true },
    }),
    featuredField("Proyecto Destacado", "Activa para mostrarlo en la página principal o portafolio."),
    orderField(),
  ],

  preview: {
    select: {
      title: "title",
      client: "client",
      status: "status",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, client, status, media, featured }) {
      const statusLabel =
        status === "completed"
          ? "✅"
          : status === "in-progress"
          ? "🔧"
          : "📋";
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${statusLabel} ${client || "Sin cliente"}`,
        media,
      };
    },
  },
});
