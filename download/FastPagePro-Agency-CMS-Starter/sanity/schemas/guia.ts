// @ts-nocheck — Sanity schema types are validated by Studio, not Next.js
// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Studio Guide (Singleton)
// Step-by-step instructions for using the CMS.
// Generic template — works for any Fast Page Pro project.
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "studioGuide",
  title: "Guía de Uso del Studio",
  type: "document",
  icon: () => "📖",

  fields: [
    defineField({
      name: "instructions",
      title: "Instrucciones de Uso",
      description: "Instrucciones paso a paso para gestionar el contenido del sitio desde Sanity Studio.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título H3", value: "h3" },
            { title: "Título H4", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
          },
        },
      ],
      initialValue: [
        {
          _type: "block",
          _key: "g1",
          style: "h3",
          children: [{ _type: "span", _key: "g1a", text: "Bienvenido al CMS de Fast Page Pro", marks: ["strong"] }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g2",
          style: "normal",
          children: [
            { _type: "span", _key: "g2a", text: "Este panel te permite editar todo el contenido visible de tu sitio web sin necesidad de tocar código." },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g3",
          style: "h4",
          children: [{ _type: "span", _key: "g3a", text: "Pasos básicos:" }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g4",
          style: "normal",
          children: [
            { _type: "span", _key: "g4a", text: "1. Selecciona un documento del menú izquierdo." },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g5",
          style: "normal",
          children: [
            { _type: "span", _key: "g5a", text: '2. Edita los campos que necesites (texto, imagen, etc.).' },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g6",
          style: "normal",
          children: [
            { _type: "span", _key: "g6a", text: '3. Haz clic en "Publicar" para guardar los cambios.' },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g7",
          style: "normal",
          children: [
            { _type: "span", _key: "g7a", text: "4. La web se actualizará automáticamente en menos de 60 segundos." },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g8",
          style: "h4",
          children: [{ _type: "span", _key: "g8a", text: "Live Preview (Vista Previa en Tiempo Real):" }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g9",
          style: "normal",
          children: [
            { _type: "span", _key: "g9a", text: "Usa la pestaña \"Presentación\" en la barra superior para ver tu web completa mientras editas. Los cambios se reflejan al instante." },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g10",
          style: "h4",
          children: [{ _type: "span", _key: "g10a", text: "Imágenes:" }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "g11",
          style: "normal",
          children: [
            { _type: "span", _key: "g11a", text: "Sube imágenes de alta calidad (mínimo 800px de ancho). Activa el hotspot (punto caliente) para centrar el recorte automáticamente." },
          ],
          markDefs: [],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Guía de Uso del Studio",
        subtitle: "Instrucciones para gestionar el contenido del sitio",
      };
    },
  },
});
