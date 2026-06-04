// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Service Category
// Dynamic categories for services. Client can create/delete from Studio.
// Services link to these via a 'reference' field.
// ============================================================

import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "serviceCategory",
  title: "Categoría de Servicio",
  type: "document",
  icon: TagIcon,

  fields: [
    defineField({
      name: "name",
      title: "Nombre de la Categoría",
      description: "Ejemplos: Arquitectura, Construcción, Ejecución, Consultoría",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(50)
          .error("El nombre es obligatorio (máximo 50 caracteres)."),
    }),
    defineField({
      name: "slug",
      title: "URL amigable (slug)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 60,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
            .slice(0, 60),
      },
      validation: (Rule) => Rule.required().error("El slug es obligatorio."),
    }),
    defineField({
      name: "description",
      title: "Descripción Corta",
      description: "Texto opcional para tooltips o previews.",
      type: "string",
      rows: 2,
      validation: (Rule) => Rule.max(120).optional(),
    }),
    defineField({
      name: "icon",
      title: "Icono",
      description: "Icono representativo de la categoría.",
      type: "string",
      options: {
        list: [
          { title: "Lápiz (Diseño)", value: "pencil" },
          { title: "Llave (Servicios Generales)", value: "wrench" },
          { title: "Rayo (Implementación)", value: "zap" },
          { title: "Edificio (Arquitectura)", value: "building" },
          { title: "Engranaje (Ingeniería)", value: "cog" },
          { title: "Camión (Logística)", value: "truck" },
          { title: "Fábrica (Industria)", value: "factory" },
          { title: "Casco (Seguridad)", value: "hard-hat" },
          { title: "Paquete (General)", value: "package" },
          { title: "Estrella (Destacados)", value: "star" },
        ],
      },
      initialValue: "package",
    }),
    defineField({
      name: "color",
      title: "Color de Categoría",
      description: "Color de acento para badges y etiquetas en el frontend.",
      type: "string",
      options: {
        list: [
          { title: "Azul", value: "blue" },
          { title: "Verde", value: "green" },
          { title: "Ámbar / Dorado", value: "amber" },
          { title: "Rojo", value: "red" },
          { title: "Morado", value: "purple" },
          { title: "Gris", value: "gray" },
          { title: "Cyan", value: "cyan" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    }),
    defineField({
      name: "order",
      title: "Orden de Aparición",
      description: "Posición en la lista. Menor número = aparece primero.",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.integer().error("El orden debe ser un número entero."),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "description",
      color: "color",
    },
    prepare({ title, subtitle, color }) {
      const colorMap: Record<string, string> = {
        blue: "#3B82F6",
        green: "#22C55E",
        amber: "#F59E0B",
        red: "#EF4444",
        purple: "#8B5CF6",
        gray: "#6B7280",
        cyan: "#06B6D4",
      };
      return {
        title: title || "Sin nombre",
        subtitle: subtitle || "Categoría de Servicio",
        media: (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: colorMap[color || "gray"] || "#6B7280",
            }}
          />
        ),
      };
    },
  },

  orderings: [
    {
      title: "Orden de Aparición",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
