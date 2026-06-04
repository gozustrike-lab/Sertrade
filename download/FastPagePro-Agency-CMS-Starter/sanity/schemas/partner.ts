// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Partner / Client Logo
// Logos of clients, partners, or certifications.
// ============================================================

import { defineField, defineType } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "partner",
  title: "Socio / Cliente (Logo)",
  type: "document",
  icon: () => "🤝",

  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      description: "Nombre de la empresa, socio o certificación.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(80)
          .error("El nombre es obligatorio (máximo 80 caracteres)."),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description:
        "Logo de la empresa. Se recomienda SVG o PNG con fondo transparente. Se muestra en blanco y negro o color según el diseño.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("El logo es obligatorio."),
    }),
    defineField({
      name: "url",
      title: "Enlace al Sitio",
      description: "URL del sitio web del socio (opcional).",
      type: "url",
    }),
    orderField(),
  ],

  preview: {
    select: {
      title: "name",
      media: "logo",
    },
    prepare({ title, media }) {
      return {
        title: title || "Sin nombre",
        media,
      };
    },
  },
});
