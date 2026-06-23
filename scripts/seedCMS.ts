// @ts-nocheck
/**
 * Sanity CMS Seed Script — Sertrade Design
 *
 * Run: npx tsx scripts/seedCMS.ts
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET (default: production)
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
  process.exit(1);
}
if (!token) {
  console.error("ERROR: SANITY_API_WRITE_TOKEN is not set.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// ─── HELPERS ────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function createOrReplace(doc: Record<string, unknown>) {
  if (!doc._id) throw new Error("Document missing _id");
  const existing = await client.getDocument(doc._id as string);
  if (existing) {
    console.log(`  ↻ Updating: ${(doc._id as string).split(".")[1] || doc._id}`);
    await client.patch(doc._id as string).set(doc).commit();
  } else {
    console.log(`  + Creating: ${(doc._id as string).split(".")[1] || doc._id}`);
    await client.createIfNotExists(doc);
  }
  await sleep(150);
}

// ─── SEED DATA ──────────────────────────────────────────────────────────────

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  companyName: "Sertrade Design",
  slogan: "Construimos Confianza, Diseñamos Futuro",
  tagline: "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
  phone: "+51 944 106 163",
  whatsapp: "51944106163",
  email: "contacto@sertrade.com",
  address: "Lima, Perú",
  businessHours: "Lun - Vie: 9:00 - 18:00",
  facebookUrl: "https://facebook.com/sertradedesign",
  instagramUrl: "https://instagram.com/sertradedesign",
  linkedinUrl: "https://linkedin.com/company/sertradedesign",
  tiktokUrl: "",
  youtubeUrl: "",
  mapLatitude: -12.0464,
  mapLongitude: -77.0428,
  mapZoom: 15,
  seoTitle: "Sertrade Design | Arquitectura e Ingeniería Premium",
  seoDescription: "Estudio de arquitectura e ingeniería premium. Especialistas en diseño, servicios generales e implementación inmersiva de proyectos comerciales, industriales y de salud.",
};

const heroSlides = [
  {
    _id: "heroSlide.northpark",
    _type: "heroSlide",
    title: "Northpark Mall",
    subtitle: [{ _type: "block", _key: "h1", style: "normal", children: [{ _type: "span", _key: "s1", text: "Diseño comercial de clase mundial para experiencias inmersivas." }] }],
    ctaLabel: "Ver Proyecto",
    ctaLink: "/proyectos",
    ctaType: "primary",
    order: 1,
  },
  {
    _id: "heroSlide.paseo-antara",
    _type: "heroSlide",
    title: "Paseo Antara",
    subtitle: [{ _type: "block", _key: "h2", style: "normal", children: [{ _type: "span", _key: "s2", text: "Arquitectura que transforma espacios en experiencias memorables." }] }],
    ctaLabel: "Conócenos",
    ctaLink: "/#contacto",
    ctaType: "whatsapp",
    order: 2,
  },
  {
    _id: "heroSlide.construction",
    _type: "heroSlide",
    title: "Implementación Inmersiva",
    subtitle: [{ _type: "block", _key: "h3", style: "normal", children: [{ _type: "span", _key: "s3", text: "Del concepto a la realidad — ejecución premium en cada detalle." }] }],
    ctaLabel: "Nuestros Servicios",
    ctaLink: "/servicios",
    ctaType: "secondary",
    order: 3,
  },
  {
    _id: "heroSlide.electrical",
    _type: "heroSlide",
    title: "Ingeniería Eléctrica",
    subtitle: [{ _type: "block", _key: "h4", style: "normal", children: [{ _type: "span", _key: "s4", text: "Soluciones eléctricas integrales para proyectos de gran escala." }] }],
    ctaLabel: "Contáctanos",
    ctaLink: "/#contacto",
    ctaType: "mail",
    order: 4,
  },
];

const stats = [
  { _id: "stat.years", _type: "stat", label: "Años de Experiencia", value: 15, suffix: "+", prefix: "", order: 1 },
  { _id: "stat.projects", _type: "stat", label: "Proyectos Completados", value: 200, suffix: "+", prefix: "", order: 2 },
  { _id: "stat.area", _type: "stat", label: "m² Diseñados", value: 500000, suffix: " m²", prefix: "+", order: 3 },
];

const serviceCategories = [
  { _id: "serviceCategory.diseno", _type: "serviceCategory", name: "Diseño", slug: { _type: "slug", current: "diseno" }, description: "Diseño arquitectónico e infoarquitectura para espacios comerciales de clase mundial.", icon: "pencil-ruler", color: "#004691", order: 1 },
  { _id: "serviceCategory.servicios-generales", _type: "serviceCategory", name: "Servicios Generales", slug: { _type: "slug", current: "servicios-generales" }, description: "Ingeniería integral: eléctrica, mecánica, sanitaria y más.", icon: "wrench", color: "#D4AF37", order: 2 },
  { _id: "serviceCategory.implementacion", _type: "serviceCategory", name: "Implementación Inmersiva", slug: { _type: "slug", current: "implementacion-inmersiva" }, description: "Modelado 3D, recorridos virtuales y construcción premium.", icon: "zap", color: "#001C3D", order: 3 },
];

const services = [
  {
    _id: "service.diseno-arquitectonico",
    _type: "service",
    title: "Diseño Arquitectónico",
    slug: { _type: "slug", current: "diseno-arquitectonico" },
    category: { _type: "reference", _ref: "serviceCategory.diseno" },
    description: [{ _type: "block", _key: "d1", style: "normal", children: [{ _type: "span", _key: "sd1", text: "Creamos espacios comerciales que combinan funcionalidad, estética y experiencia del usuario. Nuestro equipo de arquitectos especializados diseña cada proyecto con atención al detalle y visión global." }] }],
    featured: true,
    subservices: [
      { title: "Infoarquitectura", description: "Organización y señalización del espacio comercial." },
      { title: "Diseño de Interiores", description: "Ambientes que reflejan la identidad de tu marca." },
      { title: "Modelado 3D", description: "Visualización inmersiva antes de construir." },
    ],
    order: 1,
  },
  {
    _id: "service.ingenieria-electrica",
    _type: "service",
    title: "Ingeniería Eléctrica",
    slug: { _type: "slug", current: "ingenieria-electrica" },
    category: { _type: "reference", _ref: "serviceCategory.servicios-generales" },
    description: [{ _type: "block", _key: "d2", style: "normal", children: [{ _type: "span", _key: "sd2", text: "Soluciones eléctricas integrales para centros comerciales, hospitales y proyectos industriales. Diseñamos sistemas eficientes, seguros y escalables." }] }],
    featured: true,
    subservices: [
      { title: "Sistemas de Distribución", description: "Diseño de redes eléctricas de media y baja tensión." },
      { title: "Iluminación Arquitectónica", description: "Diseño lumínico para ambientes comerciales." },
    ],
    order: 2,
  },
  {
    _id: "service.implementacion-3d",
    _type: "service",
    title: "Implementación Inmersiva",
    slug: { _type: "slug", current: "implementacion-inmersiva" },
    category: { _type: "reference", _ref: "serviceCategory.implementacion" },
    description: [{ _type: "block", _key: "d3", style: "normal", children: [{ _type: "span", _key: "sd3", text: "Llevamos los diseños a la realidad con modelado 3D de alta fidelidad, recorridos virtuales y supervisión de obra con estándares premium." }] }],
    featured: true,
    subservices: [
      { title: "Modelado 3D", description: "Renderizados fotorrealistas para presentaciones." },
      { title: "Recorridos Virtuales", description: "Experiencias inmersivas 360°." },
      { title: "Supervisión de Obra", description: "Control de calidad durante toda la ejecución." },
    ],
    order: 3,
  },
];

const projects = [
  {
    _id: "project.northpark",
    _type: "project",
    title: "Northpark Mall",
    slug: { _type: "slug", current: "northpark-mall" },
    excerpt: "Diseño arquitectónico integral para centro comercial de 45,000 m².",
    client: "Northpark Developers",
    location: "Lima, Perú",
    year: "2023",
    area: "45,000 m²",
    status: "completed",
    tags: ["centro comercial", "arquitectura", "diseño interior"],
    service: { _type: "reference", _ref: "service.diseno-arquitectonico" },
    description: [{ _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", _key: "sp1", text: "Proyecto de diseño arquitectónico integral para un centro comercial de gran escala en Lima. Incluye infoarquitectura, diseño de interiores y señalización." }] }],
    featured: true,
    order: 1,
  },
  {
    _id: "project.paseo-antara",
    _type: "project",
    title: "Paseo Antara",
    slug: { _type: "slug", current: "paseo-antara" },
    excerpt: "Remodelación completa de área comercial premium.",
    client: "Grupo Antara",
    location: "Ciudad de México, México",
    year: "2023",
    area: "28,000 m²",
    status: "completed",
    tags: ["remodelación", "lujo", "comercial"],
    service: { _type: "reference", _ref: "service.diseno-arquitectonico" },
    description: [{ _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", _key: "sp2", text: "Remodelación integral de un centro comercial premium, incluyendo rediseño de fachadas, interiores e implementación de tecnología de experiencia del usuario." }] }],
    featured: true,
    order: 2,
  },
  {
    _id: "project.hospital-central",
    _type: "project",
    title: "Hospital Central del Norte",
    slug: { _type: "slug", current: "hospital-central-del-norte" },
    excerpt: "Ingeniería eléctrica y mecánica para hospital de alta complejidad.",
    client: "Red de Salud Norte",
    location: "Bogotá, Colombia",
    year: "2024",
    area: "32,000 m²",
    status: "in-progress",
    tags: ["hospital", "ingeniería eléctrica", "salud"],
    service: { _type: "reference", _ref: "service.ingenieria-electrica" },
    description: [{ _type: "block", _key: "p3", style: "normal", children: [{ _type: "span", _key: "sp3", text: "Diseño e implementación de sistemas eléctricos de emergencia, UPS, iluminación quirúrgica y sistemas mecánicos para un hospital de alta complejidad." }] }],
    featured: true,
    order: 3,
  },
  {
    _id: "project.plaza-solaris",
    _type: "project",
    title: "Plaza Solaris",
    slug: { _type: "slug", current: "plaza-solaris" },
    excerpt: "Modelado 3D y recorrido virtual para centro comercial en etapa de planificación.",
    client: "Inversiones Solaris",
    location: "Quito, Ecuador",
    year: "2024",
    area: "38,000 m²",
    status: "planned",
    tags: ["modelado 3D", "recorrido virtual", "centro comercial"],
    service: { _type: "reference", _ref: "service.implementacion-3d" },
    description: [{ _type: "block", _key: "p4", style: "normal", children: [{ _type: "span", _key: "sp4", text: "Modelado 3D fotorrealista y recorrido virtual 360° para un centro comercial en etapa de planificación y captación de anchor tenants." }] }],
    featured: false,
    order: 4,
  },
  {
    _id: "project.oficina-corporativa",
    _type: "project",
    title: "Torre Corporativa Andina",
    slug: { _type: "slug", current: "torre-corporativa-andina" },
    excerpt: "Diseño de interiores para torre de oficinas clase A.",
    client: "Andina Capital",
    location: "Lima, Perú",
    year: "2023",
    area: "12,000 m²",
    status: "completed",
    tags: ["corporativo", "oficinas", "diseño interior"],
    service: { _type: "reference", _ref: "service.diseno-arquitectonico" },
    description: [{ _type: "block", _key: "p5", style: "normal", children: [{ _type: "span", _key: "sp5", text: "Diseño de interiores para torre de oficinas clase A, incluyendo lobby, áreas comunes y pisos de trabajo con identidad corporativa." }] }],
    featured: false,
    order: 5,
  },
  {
    _id: "project.centro-logistico",
    _type: "project",
    title: "Centro Logístico Industrial",
    slug: { _type: "slug", current: "centro-logistico-industrial" },
    excerpt: "Ingeniería eléctrica industrial para centro de distribución.",
    client: "Logística del Sur",
    location: "Lima, Perú",
    year: "2024",
    area: "55,000 m²",
    status: "in-progress",
    tags: ["industrial", "logística", "ingeniería"],
    service: { _type: "reference", _ref: "service.ingenieria-electrica" },
    description: [{ _type: "block", _key: "p6", style: "normal", children: [{ _type: "span", _key: "sp6", text: "Diseño e implementación de sistemas eléctricos industriales de alta capacidad para centro de distribución logística." }] }],
    featured: false,
    order: 6,
  },
];

const partners = [
  { _id: "partner.mitsubishi", _type: "partner", name: "Mitsubishi Motors", url: "https://www.mitsubishi-motors.com", order: 1 },
  { _id: "partner.lima-kombo", _type: "partner", name: "Lima Kombo", url: "", order: 2 },
  { _id: "partner.redrilsa", _type: "partner", name: "Redrilsa", url: "", order: 3 },
];

// ─── MAIN ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Seeding Sanity CMS`);
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  console.log("📋 Site Settings");
  await createOrReplace(siteSettings);

  console.log("\n🖼️  Hero Slides");
  for (const slide of heroSlides) await createOrReplace(slide);

  console.log("\n📊 Stats");
  for (const stat of stats) await createOrReplace(stat);

  console.log("\n📂 Service Categories");
  for (const cat of serviceCategories) await createOrReplace(cat);

  console.log("\n📐 Services");
  for (const svc of services) await createOrReplace(svc);

  console.log("\n🏗️  Projects");
  for (const proj of projects) await createOrReplace(proj);

  console.log("\n🤝 Partners");
  for (const p of partners) await createOrReplace(p);

  console.log("\n✅ Seed completed successfully!\n");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
