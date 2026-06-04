# Guía de Integración — FastPagePro Agency CMS Starter

Guía paso a paso para integrar el starter CMS en un proyecto Next.js 16 existente.

---

## 1. Verificación de Dependencias

Antes de comenzar, asegúrate de que tu proyecto Next.js cumpla con:

- **Next.js 16+** con App Router (`src/app/` structure)
- **TypeScript** configurado (`tsconfig.json`)
- **Tailwind CSS** (opcional, pero recomendado para el Studio theme)

---

## 2. Instalación de Dependencias de Sanity

```bash
npm install next-sanity@latest @sanity/client@latest @sanity/image-url@latest @sanity/icons@latest sanity@latest @portabletext/react@latest
```

Dependencias clave:
- `next-sanity`: Incluye `@sanity/client`, `@sanity/image-url`, `defineLive`, `VisualEditing`
- `@sanity/icons`: Iconos oficiales para el Studio
- `sanity`: Core de Sanity Studio embebido
- `@portabletext/react`: Renderizado de rich text (Portable Text)

---

## 3. Variables de Entorno

Agrega al archivo `.env.local`:

```env
# Sanity CMS — Obligatorio
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=tu_read_token
NEXT_PUBLIC_SANITY_API_READ_TOKEN=tu_read_token

# Marca del proyecto — Opcional (tiene defaults)
NEXT_PUBLIC_COMPANY_NAME=Nombre del Cliente
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### Cómo obtener los valores:
1. **Project ID**: Se encuentra en `sanity.io/manage > Projects > [tu proyecto] > Project ID`
2. **Dataset**: Por defecto es `production`
3. **API Read Token**: En `sanity.io/manage > [tu proyecto] > API > API Tokens > New Token`
   - Nombre: "Next.js Read Token"
   - Permisos: Solo **Viewer** (lectura)
   - Copia y pega en ambas variables (con y sin `NEXT_PUBLIC_`)

---

## 4. Configuración de next.config.ts

Agrega Sanity CDN a las imágenes remotas:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
```

---

## 5. Copia de Archivos

Copia los archivos de la plantilla manteniendo esta estructura:

```
tu-proyecto/
├── sanity.config.ts                     ← NUEVO
├── sanity/
│   ├── schema.ts                        ← NUEVO
│   ├── lib/
│   │   ├── constants.ts                 ← NUEVO
│   │   └── schema-master.ts            ← NUEVO
│   └── schemas/
│       ├── index.ts                     ← NUEVO
│       ├── siteSettings.ts              ← NUEVO
│       ├── heroSlide.ts                  ← NUEVO
│       ├── stat.ts                      ← NUEVO
│       ├── partner.ts                   ← NUEVO
│       ├── serviceCategory.tsx          ← NUEVO
│       ├── service.ts                   ← NUEVO
│       ├── project.ts                   ← NUEVO
│       ├── teamMember.ts               ← NUEVO
│       ├── testimonial.ts               ← NUEVO
│       └── guia.ts                     ← NUEVO
├── src/
│   ├── sanity/
│   │   └── live.ts                     ← NUEVO
│   ├── lib/
│   │   ├── sanity.client.ts           ← NUEVO
│   │   ├── sanity.queries.ts          ← NUEVO
│   │   └── fetchCMS.ts               ← NUEVO
│   ├── components/
│   │   └── VisualEditing.tsx          ← NUEVO
│   └── app/
│       ├── layout.tsx                  ← MODIFICAR
│       ├── page.tsx                    ← MODIFICAR (ejemplo)
│       ├── admin/
│       │   └── [[...tool]]/
│       │       └── page.tsx           ← NUEVO
│       └── api/
│           └── draft-mode/
│               ├── enable/route.ts     ← NUEVO
│               └── disable/route.ts    ← NUEVO
```

---

## 6. Modificación del Layout Principal

En `src/app/layout.tsx`, importa y envuelve con Sanity:

```tsx
import { SanityLive } from "@/sanity/live";
import { VisualEditing } from "@/components/VisualEditing";
import { fetchCMS } from "@/lib/fetchCMS";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.client";

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return fetchCMS<SanitySiteSettings>(SITE_SETTINGS_QUERY);
}

export default async function RootLayout({ children }) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <SanityLive />
        {/* Tu Header con siteSettings */}
        <main>{children}</main>
        {/* Tu Footer con siteSettings */}
        <VisualEditing />
      </body>
    </html>
  );
}
```

---

## 7. Modificación de Páginas (Ejemplos)

### Página de Inicio (`src/app/page.tsx`)

```tsx
import HomePage from "@/components/HomePage";
import { fetchCMS } from "@/lib/fetchCMS";
import {
  ALL_HERO_SLIDES_QUERY,
  ALL_STATS_QUERY,
  FEATURED_SERVICES_QUERY,
  FEATURED_PROJECTS_QUERY,
  ALL_PARTNERS_QUERY,
} from "@/lib/sanity.queries";
import type {
  SanityHeroSlide,
  SanityStat,
  SanityService,
  SanityProject,
  SanityPartner,
} from "@/lib/sanity.client";

export const revalidate = 60;

export default async function Page() {
  const [heroSlides, stats, services, projects, partners] = await Promise.all([
    fetchCMS<SanityHeroSlide[]>(ALL_HERO_SLIDES_QUERY),
    fetchCMS<SanityStat[]>(ALL_STATS_QUERY),
    fetchCMS<SanityService[]>(FEATURED_SERVICES_QUERY),
    fetchCMS<SanityProject[]>(FEATURED_PROJECTS_QUERY),
    fetchCMS<SanityPartner[]>(ALL_PARTNERS_QUERY),
  ]);

  return (
    <HomePage
      heroSlides={heroSlides}
      stats={stats}
      services={services}
      projects={projects}
      partners={partners}
    />
  );
}
```

### Página de Servicios (`src/app/servicios/page.tsx`)

```tsx
import ServicesPage from "@/components/ServicesPage";
import { fetchCMS } from "@/lib/fetchCMS";
import { ALL_SERVICES_QUERY } from "@/lib/sanity.queries";
import type { SanityService } from "@/lib/sanity.client";

export const revalidate = 60;

export default async function Page() {
  const services = await fetchCMS<SanityService[]>(ALL_SERVICES_QUERY);
  return <ServicesPage services={services} />;
}
```

### Página de Proyectos (`src/app/proyectos/page.tsx`)

```tsx
import ProjectsPage from "@/components/ProjectsPage";
import { fetchCMS } from "@/lib/fetchCMS";
import { ALL_PROJECTS_QUERY } from "@/lib/sanity.queries";
import type { SanityProject } from "@/lib/sanity.client";

export const revalidate = 60;

export default async function Page() {
  const projects = await fetchCMS<SanityProject[]>(ALL_PROJECTS_QUERY);
  return <ProjectsPage projects={projects} />;
}
```

---

## 8. Fallbacks (Sin Sanity Configurado)

La función `fetchCMS()` retorna `null` si:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` no está configurado
- Sanity arroja un error de conexión
- La query no retorna datos

Tus componentes deben manejar esto con datos por defecto:

```tsx
const heroSlides = props.heroSlides || DEFAULT_SLIDES;
const stats = props.stats || DEFAULT_STATS;
```

---

## 9. Primeros Pasos en Sanity Studio

1. Navega a `http://localhost:3000/admin`
2. Sanity Studio se abrirá embebido en tu app
3. Crea el documento **"Configuración del Sitio"** (siteSettings) — es un singleton
4. Agrega hero slides, servicios, proyectos según necesites
5. Publica cada documento para que aparezca en tu sitio

---

## 10. Verificación Final

- [ ] `/admin` abre Sanity Studio correctamente
- [ ] Panel de control en español
- [ ] Pestaña "Presentación" muestra vista previa del sitio
- [ ] Edición visual funciona en Draft Mode
- [ ] Videos del Hero son editables (MP4, WebM, poster)
- [ ] Footer consume datos de siteSettings
- [ ] "Desarrollado por FastPagePro.com" permanece hardcodeado
- [ ] Fallbacks funcionan sin Sanity configurado
- [ ] ISR funciona (`revalidate = 60`)
