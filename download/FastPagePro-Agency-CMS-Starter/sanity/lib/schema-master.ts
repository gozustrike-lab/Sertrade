// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Schema Master (Reusable Field Presets)
// Centralized helpers for all Fast Page Pro projects.
// Each new project only changes constants.ts — schemas inherit automatically.
//
// REUTILIZACIÓN:
//   1. Copy sanity/lib/schema-master.ts to new project
//   2. Configure .env.local with NEXT_PUBLIC_COMPANY_NAME
//   3. Update BRAND_COLORS in constants.ts
//   4. Schemas inherit name and branding automatically
//
// REGLA FAST PAGE PRO:
// Footer credits ("Desarrollado por FastPagePro.com") are
// HARDCODED in the frontend — never editable via CMS or Visual Editing.
// ============================================================

import { defineField, defineArrayMember, type Rule } from "sanity";

// ═══════════════════════════════════════════════════
// STANDARD FIELD PRESETS
// ═══════════════════════════════════════════════════

/**
 * Standard slug field — auto-generates URL from a source field.
 * @param source - field name to derive slug from (e.g. "title")
 */
export function slugField(source: string) {
  return defineField({
    name: "slug",
    title: "URL amigable (slug)",
    description:
      "Se genera automáticamente desde el título. Edítalo solo si necesitas una URL personalizada.",
    type: "slug",
    options: {
      source,
      maxLength: 96,
      slugify: (input: string) =>
        input
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
          .slice(0, 96),
    },
    validation: (Rule: Rule) =>
      Rule.required().error("El slug es obligatorio para generar la URL."),
  });
}

/**
 * Image field with hotspot and crop support.
 * @param label - visual label
 * @param required - whether the field is mandatory
 */
export function imageField(label: string, required = true) {
  return defineField({
    name: "image",
    title: label,
    description:
      "Sube una imagen de alta calidad. Se recomienda 1200×800px mínimo. Soporta JPG, PNG y WebP. Activa el hotspot para centrar el recorte.",
    type: "image",
    options: {
      hotspot: true,
    },
    validation: (Rule: Rule) =>
      required
        ? Rule.required().error("La imagen es obligatoria.")
        : Rule.optional(),
  });
}

/**
 * Named image field with a custom field name.
 */
export function namedImageField(fieldName: string, label: string, required = false) {
  return defineField({
    name: fieldName,
    title: label,
    type: "image",
    options: {
      hotspot: true,
    },
    validation: (Rule: Rule) =>
      required
        ? Rule.required().error(`${label} es obligatoria.`)
        : Rule.optional(),
  });
}

/**
 * Standard name/title field with validation.
 * @param label - visual label
 * @param maxLen - maximum length
 */
export function nameField(label: string, maxLen = 120) {
  return defineField({
    name: "name",
    title: label,
    description: `Nombre visible. Máximo ${maxLen} caracteres.`,
    type: "string",
    validation: (Rule: Rule) =>
      Rule.required()
        .max(maxLen)
        .error(`El nombre es obligatorio (máximo ${maxLen} caracteres).`),
  });
}

/**
 * Standard title field.
 */
export function titleField(label = "Título", maxLen = 120) {
  return defineField({
    name: "title",
    title: label,
    description: `Título visible. Máximo ${maxLen} caracteres.`,
    type: "string",
    validation: (Rule: Rule) =>
      Rule.required()
        .max(maxLen)
        .error(`El título es obligatorio (máximo ${maxLen} caracteres).`),
  });
}

/**
 * Portable Text (rich text) field for descriptions.
 * Supports bold, italic, lists, and links.
 */
export function descriptionField(title = "Descripción", required = true) {
  return defineField({
    name: "description",
    title,
    description:
      "Describe con detalle. Puedes usar negritas, cursivas y listas.",
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Título H3", value: "h3" },
          { title: "Título H4", value: "h4" },
          { title: "Cita", value: "blockquote" },
        ],
        lists: [{ title: "Viñetas", value: "bullet" }, { title: "Numerada", value: "number" }],
        marks: {
          decorators: [
            { title: "Negrita", value: "strong" },
            { title: "Cursiva", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Enlace",
              fields: [
                {
                  name: "href",
                  type: "url",
                  title: "URL",
                },
              ],
            },
          ],
        },
      }),
    ],
    validation: (Rule: Rule) =>
      required
        ? Rule.required().error("La descripción es obligatoria.")
        : Rule.optional(),
  });
}

/**
 * Short text field for excerpts/summaries.
 */
export function excerptField(label = "Resumen", maxLen = 300) {
  return defineField({
    name: "excerpt",
    title: label,
    description: `Texto corto para tarjetas y previews. Máximo ${maxLen} caracteres.`,
    type: "text",
    rows: 3,
    validation: (Rule: Rule) => Rule.max(maxLen).optional(),
  });
}

/**
 * Order field for manual sorting.
 */
export function orderField() {
  return defineField({
    name: "order",
    title: "Orden de Aparición",
    description: "Menor número = aparece primero.",
    type: "number",
    initialValue: 0,
    validation: (Rule: Rule) =>
      Rule.integer().error("El orden debe ser un número entero."),
  });
}

/**
 * Featured/toggle field.
 */
export function featuredField(label = "Destacado", description = "Activa para mostrarlo en secciones principales.") {
  return defineField({
    name: "featured",
    title: label,
    description,
    type: "boolean",
    initialValue: false,
  });
}

/**
 * URL field with validation.
 */
export function urlField(label: string, required = false) {
  return defineField({
    name: label.toLowerCase().replace(/\s/g, ""),
    title: label,
    type: "url",
    validation: (Rule: Rule) =>
      required ? Rule.required().error(`${label} es obligatorio.`) : Rule.optional(),
  });
}

/**
 * Category reference field — links to a document type.
 */
export function categoryReferenceField(typeName: string, label: string) {
  return defineField({
    name: "category",
    title: label,
    description: `Vincula a una categoría existente. Crea categorías desde el panel "${label}".`,
    type: "reference",
    to: [{ type: typeName }],
    options: {
      disableNew: true,
    },
    validation: (Rule: Rule) =>
      Rule.required().error(`Debes seleccionar una ${label.toLowerCase()}.`),
    preview: {
      select: {
        title: "category.name",
        subtitle: "category.description",
      },
    },
  });
}
