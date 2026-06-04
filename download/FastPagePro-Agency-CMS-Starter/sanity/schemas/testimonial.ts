// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Testimonial
// Client testimonials and reviews.
// ============================================================

import { defineField, defineType } from "sanity";
import { orderField, featuredField, descriptionField } from "../lib/schema-master";

export default defineType({
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  icon: () => "💬",

  fields: [
    defineField({
      name: "authorName",
      title: "Nombre del Autor",
      description: "Nombre del cliente o persona que da el testimonio.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(80)
          .error("El nombre es obligatorio (máximo 80 caracteres)."),
    }),
    defineField({
      name: "authorRole",
      title: "Cargo del Autor",
      description: 'Ejemplo: "Gerente General de Constructora ABC"',
      type: "string",
      validation: (Rule) => Rule.max(80).optional(),
    }),
    defineField({
      name: "company",
      title: "Empresa / Organización",
      type: "string",
      validation: (Rule) => Rule.max(100).optional(),
    }),
    defineField({
      name: "quote",
      title: "Testimonio / Cita",
      description: "Opinión o experiencia del cliente.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }, { title: "Cita", value: "blockquote" }],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().error("El testimonio es obligatorio."),
    }),
    defineField({
      name: "photo",
      title: "Foto del Autor",
      description: "Foto del cliente. Se recomienda 200×200px (cuadrada).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Calificación (Estrellas)",
      description: "Puntuación de 1 a 5 estrellas.",
      type: "number",
      initialValue: 5,
      validation: (Rule) =>
        Rule.min(1)
          .max(5)
          .integer()
          .warning("La calificación debe ser un entero entre 1 y 5."),
    }),
    defineField({
      name: "project",
      title: "Proyecto Asociado",
      description: "Vincula este testimonio a un proyecto específico.",
      type: "reference",
      to: [{ type: "project" }],
      options: { disableNew: true },
    }),
    featuredField("Testimonio Destacado"),
    orderField(),
  ],

  preview: {
    select: {
      title: "authorName",
      subtitle: "company",
      rating: "rating",
      media: "photo",
    },
    prepare({ title, subtitle, rating, media }) {
      const stars = "★".repeat(rating || 0) + "☆".repeat(5 - (rating || 0));
      return {
        title: title || "Sin nombre",
        subtitle: subtitle ? `${stars} · ${subtitle}` : stars,
        media,
      };
    },
  },
});
