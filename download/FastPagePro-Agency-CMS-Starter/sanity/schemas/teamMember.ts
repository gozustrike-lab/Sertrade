// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Team Member
// Team members / staff directory.
// ============================================================

import { defineField, defineType } from "sanity";
import {
  nameField,
  slugField,
  descriptionField,
  orderField,
} from "../lib/schema-master";

export default defineType({
  name: "teamMember",
  title: "Miembro del Equipo",
  type: "document",
  icon: () => "👤",

  fields: [
    nameField("Nombre Completo"),
    slugField("name"),
    defineField({
      name: "role",
      title: "Cargo / Posición",
      description: 'Ejemplo: "Director de Proyectos", "Arquitecto Senior"',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(80)
          .error("El cargo es obligatorio (máximo 80 caracteres)."),
    }),
    defineField({
      name: "department",
      title: "Departamento / Área",
      description: 'Ejemplo: "Dirección", "Diseño", "Construcción"',
      type: "string",
      validation: (Rule) => Rule.max(60).optional(),
    }),
    defineField({
      name: "photo",
      title: "Foto",
      description: "Foto profesional. Se recomienda 400×500px (formato retrato).",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("La foto es obligatoria."),
    }),
    descriptionField("Biografía", false),
    defineField({
      name: "email",
      title: "Correo Electrónico",
      description: "Email profesional del miembro.",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Teléfono",
      description: "Teléfono de contacto directo.",
      type: "string",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    orderField(),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Sin nombre",
        subtitle: subtitle || "Sin cargo",
        media,
      };
    },
  },
});
