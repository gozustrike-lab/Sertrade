// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Stat (Animated Counter)
// Numeric statistics displayed on the homepage.
// ============================================================

import { defineField, defineType } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "stat",
  title: "Estadística / Contador",
  type: "document",
  icon: () => "📊",

  fields: [
    defineField({
      name: "label",
      title: "Etiqueta",
      description: 'Ejemplo: "Proyectos Completados", "Clientes Satisfechos", "Años de Experiencia"',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(40)
          .error("La etiqueta es obligatoria (máximo 40 caracteres)."),
    }),
    defineField({
      name: "value",
      title: "Valor Numérico",
      description: "Número que se animará al entrar en viewport. Ejemplo: 150, 25, 500",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .integer()
          .error("El valor debe ser un número entero mayor o igual a 0."),
    }),
    defineField({
      name: "suffix",
      title: "Sufijo",
      description: 'Texto que sigue al número. Ejemplo: "+", "K", "M", "años", "m²"',
      type: "string",
      validation: (Rule) => Rule.max(10).optional(),
    }),
    defineField({
      name: "prefix",
      title: "Prefijo",
      description: 'Texto antes del número. Ejemplo: "+", "$", "S/."',
      type: "string",
      validation: (Rule) => Rule.max(5).optional(),
    }),
    orderField(),
  ],

  preview: {
    select: {
      label: "label",
      value: "value",
      suffix: "suffix",
      prefix: "prefix",
    },
    prepare({ label, value, suffix, prefix }) {
      return {
        title: label || "Sin etiqueta",
        subtitle: `${prefix || ""}${value}${suffix || ""}`,
      };
    },
  },
});
