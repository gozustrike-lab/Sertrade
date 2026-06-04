// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Hero Slide
// Hero carousel slides with VIDEO support.
// Desktop: Video (WebM → MP4 fallback) or static image.
// Mobile: Always fallback image (no video on mobile).
// ============================================================

import { defineField, defineType, defineArrayMember } from "sanity";
import { orderField } from "../lib/schema-master";

export default defineType({
  name: "heroSlide",
  title: "Slide del Hero",
  type: "document",
  icon: () => "🖥️",

  fieldsets: [
    {
      name: "content",
      title: "📝 Contenido del Slide",
      description: "Título, subtítulo y llamada a la acción.",
      options: { collapsible: false },
    },
    {
      name: "media",
      title: "🎬 Multimedia",
      description: "Video (MP4/WebM) o imagen de fondo. Se recomienda proveer ambos formatos de video para máxima compatibilidad.",
      options: { collapsible: false },
    },
    {
      name: "cta",
      title: "🔗 Llamada a la Acción",
      description: "Botón o enlace del slide.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Content ──
    defineField({
      name: "title",
      title: "Título Principal",
      fieldset: "content",
      description: "Título grande y llamativo del Hero. Máximo 100 caracteres.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(100)
          .error("El título es obligatorio (máximo 100 caracteres)."),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      fieldset: "content",
      description: "Texto complementario debajo del título.",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
          },
        }),
      ],
    }),

    // ── Media ──
    defineField({
      name: "backgroundImage",
      title: "Imagen de Fondo (Desktop Fallback)",
      fieldset: "media",
      description: "Se usa si no hay video o como fallback. Se recomienda 1920×1080px.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundVideoMp4",
      title: "Video de Fondo (MP4)",
      fieldset: "media",
      description: "Video en formato MP4 (H.264). Compatibilidad máxima con navegadores.",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),
    defineField({
      name: "backgroundVideoWebm",
      title: "Video de Fondo (WebM — Calidad Superior)",
      fieldset: "media",
      description: "Video en formato WebM (VP9). Calidad superior, menor tamaño. Navegadores modernos.",
      type: "file",
      options: {
        accept: "video/webm",
      },
    }),
    defineField({
      name: "posterImage",
      title: "Poster del Video",
      fieldset: "media",
      description: "Imagen estática que se muestra mientras el video carga. Se recomienda 1920×1080px.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobileFallbackImage",
      title: "Imagen para Móviles",
      fieldset: "media",
      description:
        "Imagen estática que se muestra SIEMPRE en dispositivos móviles (no se reproduce video en móvil por rendimiento). Se recomienda 750×1334px (formato vertical).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoAutoplay",
      title: "Autoplay",
      fieldset: "media",
      description: "El video comienza a reproducirse automáticamente.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "videoMuted",
      title: "Silenciado (Muted)",
      fieldset: "media",
      description: "El video se reproduce sin audio (requerido para autoplay en la mayoría de navegadores).",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "videoLoop",
      title: "Repetir (Loop)",
      fieldset: "media",
      description: "El video se repite indefinidamente.",
      type: "boolean",
      initialValue: true,
    }),

    // ── CTA ──
    defineField({
      name: "ctaLabel",
      title: "Texto del Botón",
      fieldset: "cta",
      description: 'Ejemplo: "Ver Proyectos", "Solicitar Cotización", "Contáctanos"',
      type: "string",
      validation: (Rule) => Rule.max(30).optional(),
    }),
    defineField({
      name: "ctaLink",
      title: "Enlace del Botón",
      fieldset: "cta",
      description: 'URL interna o externa. Ejemplo: "/proyectos", "https://wa.me/51..."',
      type: "string",
      validation: (Rule) => Rule.max(200).optional(),
    }),
    defineField({
      name: "ctaType",
      title: "Tipo de Botón",
      fieldset: "cta",
      description: "Estilo visual del botón.",
      type: "string",
      options: {
        list: [
          { title: "Primario (Dorado)", value: "primary" },
          { title: "Secundario (Blanco borde)", value: "secondary" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Correo", value: "mail" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),

    orderField(),
  ],

  preview: {
    select: {
      title: "title",
      media: "backgroundImage",
      hasVideo: "backgroundVideoMp4",
    },
    prepare({ title, media, hasVideo }) {
      return {
        title: title || "Sin título",
        subtitle: hasVideo ? "🎬 Video + Imagen" : "🖼️ Solo Imagen",
        media,
      };
    },
  },
});
