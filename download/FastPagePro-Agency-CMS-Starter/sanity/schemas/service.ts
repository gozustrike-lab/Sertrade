// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Service
// Main service document with inline subservices array.
// Each service belongs to a serviceCategory (reference).
// ============================================================

import { defineField, defineType } from "sanity";
import {
  titleField,
  slugField,
  imageField,
  descriptionField,
  orderField,
  featuredField,
  categoryReferenceField,
} from "../lib/schema-master";

export default defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  icon: () => "📐",

  fieldsets: [
    {
      name: "info",
      title: "ℹ️ Información Principal",
      description: "Título, imagen, categoría y descripción del servicio.",
      options: { collapsible: false },
    },
    {
      name: "detail",
      title: "🔧 Subservicios / Áreas",
      description: "Lista de subservicios o áreas de especialidad dentro de este servicio.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "display",
      title: "👁️ Visualización",
      description: "Control de cómo se muestra el servicio en el sitio.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Info ──
    titleField("Nombre del Servicio"),
    slugField("title"),
    categoryReferenceField("serviceCategory", "Categoría de Servicio"),
    defineField({
      ...imageField("Imagen de Portada", true),
      name: "coverImage",
      title: "Imagen de Portada",
      description: "Imagen panorámica para la cabecera del servicio. Se recomienda 1400×600px.",
    }),
    descriptionField("Descripción del Servicio"),

    // ── Subservices (inline array) ──
    defineField({
      name: "subservices",
      title: "Subservicios / Áreas",
      fieldset: "detail",
      description:
        "Lista de subservicios, especialidades o áreas incluidas. Se muestran como tarjetas debajo del servicio.",
      type: "array",
      of: [
        {
          type: "object",
          title: "Subservicio",
          fields: [
            {
              name: "title",
              title: "Nombre del Subservicio",
              type: "string",
              description: "Ejemplo: Oficinas Corporativas, Hospitales, Casas Unifamiliares",
              validation: (Rule: any) =>
                Rule.required()
                  .max(80)
                  .error("El nombre del subservicio es obligatorio."),
            },
            {
              name: "description",
              title: "Descripción Corta",
              type: "text",
              rows: 2,
              description: "Breve descripción de 1-2 líneas.",
              validation: (Rule: any) => Rule.max(200).optional(),
            },
            {
              name: "image",
              title: "Imagen del Subservicio",
              type: "image",
              options: { hotspot: true },
              description: "Imagen para la tarjeta. Se recomienda 800×1000px (formato vertical/portrait).",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(12).error("Máximo 12 subservicios por servicio."),
    }),

    // ── Display ──
    featuredField("Servicio Destacado", "Activa para mostrarlo en secciones principales del sitio."),
    orderField(),
  ],

  preview: {
    select: {
      title: "title",
      category: "category.name",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, category, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || "Sin categoría",
        media,
      };
    },
  },
});
