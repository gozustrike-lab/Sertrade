# FastPagePro Agency CMS Starter

> Plantilla reutilizable de Sanity CMS v3 + Next.js 16 para sitios web corporativos de agencias.
> Diseñada por FastPagePro.com para integraciones rápidas y profesionales.

---

## Descripción

FastPagePro Agency CMS Starter es una plantilla completa que integra **Sanity CMS v3** como backend de contenido dentro de un proyecto **Next.js 16** con App Router. Incluye todo lo necesario para que clientes y desarrolladores gestionen contenido de forma autónoma desde un panel de administración en español, con edición visual en tiempo real, vista previa en vivo, y revalidación automática.

Esta plantilla fue diseñada como un **master template reutilizable** que se adapta a cualquier proyecto de agencia. Solo necesitas copiar los archivos, configurar las variables de entorno, y personalizar los colores de marca. Todo el contenido editable se gestiona desde Sanity Studio, mientras que el crédito de desarrollo permanece permanentemente hardcodeado en el frontend.

---

## Características Principales

### Panel de Administración (Sanity Studio)
- **Studio embebido** en `/admin` dentro de la misma aplicación Next.js
- **Interfaz 100% en español** — labels, descripciones, fieldsets, validaciones
- **Solo 2 plugins**: Estructura + Presentación (sin Vision, sin Releases)
- **Singleton siteSettings** — configuración global del sitio en un único documento
- **Guía de uso integrada** — instrucciones paso a paso para clientes dentro del panel

### Schemas (10 Tipos de Documento)
| Schema | Descripción |
|--------|-------------|
| `siteSettings` | Configuración global: identidad, contacto, redes sociales, SEO, Open Graph |
| `heroSlide` | Slides del Hero con soporte completo de video (MP4/WebM/poster/autoplay/loop/muted) |
| `stat` | Estadísticas animadas con prefijo, sufijo y valor numérico |
| `partner` | Logos de socios, clientes y certificaciones |
| `serviceCategory` | Categorías dinámicas con icono, color y slug |
| `service` | Servicios con categoría, imagen, descripción Portable Text y subservicios |
| `project` | Proyectos/Casos de estudio con galería, estado, tags y servicio vinculado |
| `teamMember` | Directorio del equipo con foto, cargo, biografía y contacto |
| `testimonial` | Testimonios de clientes con calificación y proyecto asociado |
| `studioGuide` | Guía de uso del panel (singleton, auto-generada) |

### Visual Editing y Presentación
- **Visual Editing** con overlay de `@sanity/visual-editing` en Draft Mode
- **Presentation Tool** con ubicaciones resueltas para cada tipo de documento
- **Draft Mode** con API routes de habilitación y deshabilitación
- **Stega** (source maps) para edición visual desde Sanity Studio
- **SanityLive** con `defineLive` para revalidación en tiempo real

### Queries GROQ Centralizadas
Todas las queries están en un solo archivo (`src/lib/sanity.queries.ts`) con:
- 14+ queries predefinidas para todos los tipos de documento
- Fragmentos reutilizables (`IMAGE_FIELDS`, `FILE_FIELDS`)
- Queries parametrizadas (`serviceBySlugQuery`, `projectBySlugQuery`)
- Soporte para featured, slugs, y ordenamiento por campo personalizado

### TypeScript Interfaces
12 interfaces completas en `src/lib/sanity.client.ts`:
- `SanitySiteSettings`, `SanityHeroSlide`, `SanityService`, `SanityProject`
- `SanityTeamMember`, `SanityTestimonial`, `SanityPartner`, `SanityStat`
- `SanityServiceCategory`, `SanitySubservice`, `SanityImage`, `SanityFile`, `PortableTextBlock`

### Helpers y Utilidades
- `fetchCMS<T>()` — wrapper async con manejo de errores y fallback a `null`
- `urlFor()` — constructor de URLs de imágenes Sanity con dimensiones
- `getImageUrl()` — URL segura con dimensiones y crop
- `getVideoUrl()` — URL de archivo de video Sanity
- `plainText()` — extractor de texto plano desde Portable Text

### ISR (Incremental Static Regeneration)
- Todas las páginas con `revalidate = 60` (60 segundos)
- Next.js cachea automáticamente las páginas estáticas
- SanityLive actualiza en tiempo real cuando hay cambios publicados

---

## Estructura de Archivos

```
FastPagePro-Agency-CMS-Starter/
├── sanity.config.ts                    # Configuración del Studio
├── sanity/
│   ├── schema.ts                       # Entry point de schemas
│   ├── lib/
│   │   ├── constants.ts                # Marca y configuración por env
│   │   └── schema-master.ts            # Presets reutilizables de campos
│   └── schemas/
│       ├── index.ts                    # Re-export de schemas
│       ├── siteSettings.ts             # Configuración global (singleton)
│       ├── heroSlide.ts                # Slides del Hero (video MP4/WebM)
│       ├── stat.ts                     # Estadísticas/contadores
│       ├── partner.ts                  # Logos de socios
│       ├── serviceCategory.tsx         # Categorías de servicios
│       ├── service.ts                  # Servicios con subservicios
│       ├── project.ts                  # Proyectos/casos de estudio
│       ├── teamMember.ts              # Miembros del equipo
│       ├── testimonial.ts              # Testimonios
│       └── guia.ts                     # Guía de uso (singleton)
├── src/
│   ├── sanity/
│   │   └── live.ts                    # defineLive + stega
│   ├── lib/
│   │   ├── sanity.client.ts           # Cliente + urlFor + 12 interfaces
│   │   ├── sanity.queries.ts          # 14+ queries GROQ centralizadas
│   │   └── fetchCMS.ts               # Wrapper con fallback seguro
│   ├── components/
│   │   └── VisualEditing.tsx          # Overlay de edición visual
│   └── app/
│       ├── admin/
│       │   └── [[...tool]]/
│       │       └── page.tsx           # Studio embebido en /admin
│       └── api/
│           └── draft-mode/
│               ├── enable/route.ts    # Habilita Draft Mode
│               └── disable/route.ts  # Deshabilita Draft Mode
├── docs/
│   └── INTEGRACION.md                 # Guía de integración paso a paso
└── README.md                          # Este archivo
```

---

## Instalación Rápida

### Requisitos Previos
- Node.js 18+
- Un proyecto Next.js 16 con App Router
- Una cuenta de Sanity (gratuita en sanity.io)

### Paso 1: Crear proyecto en Sanity
1. Ve a [sanity.io](https://www.sanity.io/) y crea una cuenta
2. Crea un nuevo proyecto (puedes llamarlo como el cliente)
3. Anota el **Project ID** y configura el **Dataset** (por defecto: `production`)

### Paso 2: Copiar archivos al proyecto
1. Copia **todos los archivos** de esta plantilla a la raíz de tu proyecto Next.js
2. Asegúrate de mantener la estructura de directorios exacta

### Paso 3: Instalar dependencias
```bash
npm install next-sanity @sanity/client @sanity/image-url @sanity/icons sanity @portabletext/react
```

### Paso 4: Variables de entorno
Crea o edita tu archivo `.env.local`:
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=tu_token_de_lectura
NEXT_PUBLIC_SANITY_API_READ_TOKEN=tu_token_de_lectura_publico

# Marca del proyecto
NEXT_PUBLIC_COMPANY_NAME=Nombre del Cliente
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

**Para obtener el API Read Token:**
1. En Sanity Studio (sanity.io/manage), ve a **API > API Tokens**
2. Crea un nuevo token con permisos de **lectura** (Read)
3. Copia el token a ambas variables (`SANITY_API_READ_TOKEN` y `NEXT_PUBLIC_SANITY_API_READ_TOKEN`)

### Paso 5: Personalizar colores de marca
Edita `sanity/lib/constants.ts`:
```typescript
export const BRAND_COLORS = {
  primary: "#004691",   // Color principal
  accent: "#D4AF37",    // Color de acento/dorado
  dark: "#001C3D",      // Color oscuro
} as const;
```

### Paso 6: Configurar Next.js
Agrega lo siguiente a tu `next.config.ts`:
```typescript
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
```

### Paso 7: Envolver el layout
En tu `src/app/layout.tsx`, envuelve el contenido con los componentes de Sanity:
```tsx
import { SanityLive } from "@/sanity/live";
import { VisualEditing } from "@/components/VisualEditing";

export default async function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SanityLive />
        {/* Tu Header aquí */}
        <main>{children}</main>
        {/* Tu Footer aquí */}
        <VisualEditing />
      </body>
    </html>
  );
}
```

### Paso 8: Consumir datos en tus páginas
Ejemplo para la página de inicio:
```tsx
import { fetchCMS } from "@/lib/fetchCMS";
import { ALL_HERO_SLIDES_QUERY, ALL_STATS_QUERY } from "@/lib/sanity.queries";
import type { SanityHeroSlide, SanityStat } from "@/lib/sanity.client";

export const revalidate = 60;

export default async function Page() {
  const heroSlides = await fetchCMS<SanityHeroSlide[]>(ALL_HERO_SLIDES_QUERY);
  const stats = await fetchCMS<SanityStat[]>(ALL_STATS_QUERY);

  // Usa heroSlides ?? defaultSlides para fallback
  return <HomePage heroSlides={heroSlides} stats={stats} />;
}
```

### Paso 9: Verificar
1. Ejecuta `npm run dev`
2. Ve a `http://localhost:3000/admin` — debería abrir Sanity Studio
3. Crea tu documento `siteSettings` (singleton)
4. Agrega hero slides, servicios, proyectos desde el panel
5. Verifica que los datos aparecen en tu sitio web

---

## Uso del Panel de Administración

### Acceso
El Sanity Studio se accede en: **`/admin`** (embebido en tu app Next.js)

### Panel de Control
El menú izquierdo está organizado en secciones:

| Sección | Contenido |
|---------|-----------|
| **Inicio** | Hero Slides, Estadísticas, Socios/Clientes |
| **Servicios** | Categorías, Servicios |
| **Proyectos** | Todos los proyectos |
| **Equipo** | Miembros del equipo |
| **Testimonios** | Testimonios de clientes |
| **Configuración** | Datos del sitio (singleton) |
| **Guía de Uso** | Instrucciones para el cliente |

### Vista Previa en Tiempo Real
1. Haz clic en la pestaña **"Presentación"** en la barra superior del Studio
2. Selecciona un documento (ej: un Hero Slide)
3. La vista mostrará tu sitio web completo con los cambios reflejados al instante
4. Solo funciona si tu sitio está corriendo localmente o desplegado

### Edición Visual (Visual Editing)
1. Desde el Studio, usa el botón "Abrir vista previa" en Presentación
2. El sitio se abre en **Draft Mode** con un overlay de edición
3. Haz clic en cualquier campo editable directamente en la página
4. El contenido se actualiza en tiempo real sin recargar

---

## Queries Disponibles

| Query | Descripción |
|-------|-------------|
| `SITE_SETTINGS_QUERY` | Configuración global del sitio |
| `ALL_HERO_SLIDES_QUERY` | Todos los slides del Hero ordenados |
| `ALL_STATS_QUERY` | Todas las estadísticas |
| `ALL_PARTNERS_QUERY` | Todos los socios/clientes |
| `ALL_SERVICE_CATEGORIES_QUERY` | Todas las categorías de servicios |
| `ALL_SERVICES_QUERY` | Todos los servicios con categoría y subservicios |
| `FEATURED_SERVICES_QUERY` | Servicios destacados (top 6) |
| `serviceBySlugQuery(slug)` | Servicio individual por slug |
| `ALL_PROJECTS_QUERY` | Todos los proyectos con galería |
| `FEATURED_PROJECTS_QUERY` | Proyectos destacados (top 9) |
| `projectBySlugQuery(slug)` | Proyecto individual por slug |
| `ALL_PROJECT_SLUGS_QUERY` | Solo slugs de proyectos (para SSG) |
| `ALL_TEAM_QUERY` | Todos los miembros del equipo |
| `ALL_TESTIMONIALS_QUERY` | Todos los testimonios |
| `FEATURED_TESTIMONIALS_QUERY` | Testimonios destacados (top 7) |

---

## Regla FastPagePro

El crédito **"Desarrollado por FastPagePro.com"** está **permanentemente hardcodeado** en el frontend del sitio web. Este texto:

- **NO** aparece en ningún schema de Sanity
- **NO** es editable desde el panel de administración
- **NO** se modifica con Visual Editing
- **NO** se incluye en el Presentation Tool
- **SÍ** se renderiza directamente en el componente Footer como HTML estático

Esta regla garantiza que el crédito de desarrollo permanece intacto independientemente de las ediciones que realice el cliente desde el CMS.

---

## Personalización para Nuevos Proyectos

Para adaptar esta plantilla a un nuevo proyecto de agencia:

1. **Copiar** todos los archivos al nuevo proyecto Next.js
2. **Editar** `sanity/lib/constants.ts` con los colores de marca del nuevo proyecto
3. **Configurar** `.env.local` con el nuevo Project ID y dataset de Sanity
4. **Personalizar** los schemas según las necesidades del cliente (agregar/remover campos)
5. **Modificar** las queries GROQ si se agregan campos nuevos
6. **Actualizar** las interfaces TypeScript en `sanity.client.ts`
7. **Mantener** la regla FastPagePro del crédito hardcodeado

---

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16+ | Framework del sitio (App Router) |
| Sanity CMS | v3 | Backend de contenido |
| `next-sanity` | 13+ | Integración Next.js + Sanity |
| `@sanity/client` | 6+ | Cliente HTTP para fetch |
| `@sanity/image-url` | 2+ | Generador de URLs de imagen |
| `@sanity/icons` | 3+ | Iconos para el Studio |
| `@sanity/visual-editing` | - | Overlay de edición visual |
| `@portabletext/react` | 6+ | Renderizador de Portable Text |

---

## Soporte y Contribuciones

Esta plantilla es mantenida por **FastPagePro.com**. Para soporte técnico:

- Email: soporte@fastpagepro.com
- Web: [fastpagepro.com](https://www.fastpagepro.com)

---

## Licencia

Uso interno de FastPagePro. Distribución restringida a proyectos de clientes de la agencia.
