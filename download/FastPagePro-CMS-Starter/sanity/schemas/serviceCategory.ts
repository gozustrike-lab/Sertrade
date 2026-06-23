// @ts-nocheck
import { defineType, defineField } from "sanity";
import { titleField, slugField, orderField } from "../lib/schema-master";

export default defineType({
  name: "serviceCategory", title: "Categoría de Servicio", type: "document", icon: () => "📂",
  fields: [
    titleField("Nombre de la Categoría"),
    slugField("name"),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
    defineField({ name: "icon", title: "Icono", type: "string", description: "Nombre del icono Lucide. Ej: pencil-ruler, wrench, zap" }),
    defineField({ name: "color", title: "Color", type: "string", description: "Color hex. Ej: #004691" }),
    orderField(),
  ],
  preview: { select: { title: "name", color: "color" }, prepare({ title, color }) { return { title: title || "Sin nombre", subtitle: color || "" }; } },
});
