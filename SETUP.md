# FASTPAGEPRO — Plantilla Starter
### Sitio web corporativo con Sanity CMS + Visual Editing integrado

---

## 🚀 Instalación en 3 minutos

### Requisitos
- Node.js 18+
- Una cuenta en [Sanity](https://www.sanity.io/manage) (gratuita)

### Paso 1 — Copiar y configurar

```bash
# Descomprime el zip en tu proyecto
unzip fastpagepro-template.zip
cd fastpagepro-template

# Ejecuta el script interactivo
chmod +x setup.sh
./setup.sh

# O crea .env.local manualmente:
cp .env.example .env.local
# Edita .env.local con tus credenciales de Sanity
```

### Paso 2 — Instalar dependencias

```bash
npm install
```

### Paso 3 — Ejecutar

```bash
npm run dev
```

- **Sitio público:** http://localhost:3000
- **Panel CMS:** http://localhost:3000/admin

---

## 📁 Estructura del Proyecto

```
├── sanity/                     # ← Sanity CMS schemas
│   ├── schema.ts               #   Registro de schemas
│   ├── lib/schema-master.ts    #   Fields reutilizables (titleField, slugField, etc.)
│   └── schemas/                #   Todos los content types:
│       ├── siteSettings.ts     #   Datos generales del sitio
│       ├── heroSlide.ts        #   Slides del hero (imagen/video)
│       ├── serviceCategory.ts  #   Categorías de servicio (con flip card fields)
│       ├── service.ts          #   Servicios (con subservicios)
│       ├── project.ts          #   Proyectos (con galería + video)
│       ├── stat.ts             #   Estadísticas numéricas
│       ├── partner.ts          #   Logos de clientes/socios
│       ├── teamMember.ts       #   Miembros del equipo
│       ├── testimonial.ts      #   Testimonios
│       └── guia.ts             #   Guías / artículos
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          #   Layout raíz (VE + LivePreview integrados)
│   │   ├── page.tsx            #   Página de inicio
│   │   ├── servicios/page.tsx  #   Página de servicios
│   │   ├── proyectos/
│   │   │   ├── page.tsx        #   Página de portafolio
│   │   │   └── [slug]/page.tsx #   Detalle de proyecto (rutas dinámicas)
│   │   ├── contacto/            #   (agregar según necesidad)
│   │   ├── admin/[[...tool]]/  #   ← Sanity Studio embebido
│   │   └── api/
│   │       ├── debug/route.ts           #   Endpoint de diagnóstico
│   │       ├── sanity-token/route.ts    #   Token seguro para CMS
│   │       └── draft-mode/
│   │           ├── enable/route.ts      #   Habilita draft mode
│   │           └── disable/route.ts     #   Deshabilita draft mode
│   │
│   ├── components/
│   │   ├── LayoutShell.tsx       #   Header + Footer + estructura
│   │   ├── Header.tsx            #   Navegación
│   │   ├── Footer.tsx            #   Pie de página
│   │   ├── HomePage.tsx          #   Página principal completa
│   │   ├── ServiciosSection.tsx  #   Flip cards de servicios (homepage)
│   │   ├── ServicesPage.tsx      #   Página de servicios completa
│   │   ├── ProjectsPage.tsx      #   Portafolio con video real + galería
│   │   ├── ProjectDetailPage.tsx #   Detalle individual de proyecto
│   │   ├── VisualEditing.tsx     #   ← Overlay VE solo en iframe (CMS)
│   │   ├── SanityLiveWithToken.tsx  #   Live preview en draft mode
│   │   └── ui/                   #   shadcn/ui components
│   │
│   └── lib/
│       ├── ve.ts                #   ← Helper VE: genera data-sanity attributes
│       ├── sanity.client.ts     #   Tipos + helpers (getImageUrl, getVideoUrl, plainText)
│       ├── sanity.queries.ts    #   GROQ queries (todas las entidades)
│       ├── fetchCMS.ts          #   Data fetching con sanityFetch
│       └── utils.ts             #   Utilidades generales
│
├── template.config.ts           # ← ⭐ CONFIGURACIÓN RÁPIDA del negocio
├── setup.sh                     #   Script de instalación interactiva
├── .env.example                 #   Template de variables de entorno
└── SETUP.md                     #   Este archivo
```

---

## ⚡ Configuración del Negocio

### Archivo principal: `template.config.ts`

Edita este archivo con los datos del nuevo negocio:

```ts
export const TEMPLATE_CONFIG = {
  businessName: 'Nombre del Negocio',
  slogan: 'Tu eslogan aquí',
  phone: '+51 999 999 999',
  whatsapp: '51999999999',
  email: 'contacto@tudominio.com',
  colors: {
    primary: '#004691',
    accent: '#d4a017',
  },
  // ...
};
```

### Variables de entorno (`.env.local`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="tu-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="tu-api-token"
```

### Imágenes a reemplazar en `/public/`

| Archivo | Uso |
|---------|-----|
| `sertrade-logo.png` / `.svg` | Logo principal (header + footer) |
| `sertrade-logo-white.png` | Logo blanco (fondo oscuro) |
| `favicon.png` / `.svg` | Favicon del navegador |
| `og-*.jpg` / `og-*.png` | Open Graph (compartir en redes) |
| `images/services/*.jpg` | Imágenes de las tarjetas de servicio |
| `img/clients/*.png` | Logos de clientes/socios |

---

## 🎨 Funcionalidades Incluidas

### Visual Editing (Presentation Tool)
- **Overlay SOLO en CMS** — La web pública (`tu-dominio.com`) NUNCA muestra el overlay de edición.
- **Detección automática por iframe** — `VisualEditing.tsx` detecta si está en un iframe (Presentation Tool) y solo entonces renderiza el overlay.
- **Todos los textos e imágenes son editables** — Cada elemento tiene atributos `data-sanity` generados por `ve()` helper.
- **Excepción**: Los créditos de FastPagePro nunca son editables.

### Video en Portafolio
- Videos reales MP4/WebM desde Sanity CMS — Se reproducen directamente en la tarjeta del proyecto.
- **Autoplay con scroll** — El video se reproduce al entrar en el viewport (IntersectionObserver) y se pausa al salir.
- **Fallback a YouTube/Vimeo** — Si no hay video directo, muestra poster + play icon → abre lightbox con iframe.
- **Click abre video en grande** — Lightbox con controles de reproducción completos.

### Tarjetas de Servicio (Flip Cards)
- **Debounce 400ms** — Las tarjetas no giran inmediatamente al pasar el cursor.
- **Contenido del reverso editable desde CMS** — Campos: `flipTitle`, `flipServices[]`, `flipCtaLabel`.
- **VE overlay en ambos lados** — Front y back son editables desde Presentation Tool.

### Rutas Dinámicas
- `/proyectos/nombre-del-proyecto` — Cada proyecto tiene su propia URL.

### Sanity CMS Integrado
- **Studio embebido** en `/admin` — No necesita despliegue separado.
- **Draft mode** — Edición en tiempo real desde Presentation Tool.
- **10 content types** preconfigurados: siteSettings, heroSlide, service, serviceCategory, project, stat, partner, teamMember, testimonial, guia.

---

## 🔧 Personalización Avanzada

### Agregar una nueva página
1. Crea el archivo en `src/app/mi-pagina/page.tsx`
2. Agrega el item en `template.config.ts` → `navItems`
3. Si necesita datos del CMS, agrega el schema en `sanity/schemas/` y la query en `src/lib/sanity.queries.ts`

### Cambiar colores globalmente
Edita `template.config.ts` → `colors` y reemplaza en los componentes las referencias hardcodeadas de color. Los principales están en:
- `globals.css` (CSS variables)
- `LayoutShell.tsx` (header/footer)
- `HomePage.tsx` (secciones)

### Deploy a Vercel
```bash
npm i -g vercel
vercel
# Conecta tu repo de GitHub
# Configura las env vars en el dashboard de Vercel
```

---

## 📋 Checklist para Nuevo Proyecto

- [ ] Copiar zip al nuevo proyecto
- [ ] Ejecutar `setup.sh` o crear `.env.local`
- [ ] Editar `template.config.ts` con datos del negocio
- [ ] Reemplazar logos e imágenes en `/public/`
- [ ] `npm install && npm run dev`
- [ ] Entrar a `/admin` y configurar Site Settings
- [ ] Crear servicios, proyectos, etc. desde el CMS
- [ ] Verificar que el Visual Editing funciona en Presentation Tool
- [ ] Verificar que NO hay overlay en la web pública
- [ ] Deploy a Vercel

---

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **Sanity CMS v3** (Studio embebido)
- **Tailwind CSS 4**
- **Framer Motion** (animaciones)
- **shadcn/ui** (componentes UI)
- **Lucide React** (iconos)
- **TypeScript**

---

*Plantilla desarrollada con FastPagePro*