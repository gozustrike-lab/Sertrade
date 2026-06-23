# FastPagePro CMS Starter Kit — Prompt de Integracion para Zhipu/GLM

## COPY EXACTO PARA PEGAR EN UN NUEVO CHAT DE ZHIPU:

---

```
Tienes adjunto el ZIP "FastPagePro-CMS-Starter-Kit.zip" que es un starter kit de sitio web corporativo con Sanity CMS + Visual Editing (Presentation Tool) 100% funcional. Tu trabajo es adaptar TODO este proyecto para el siguiente negocio:

## DATOS DEL NUEVO NEGOCIO:
- **Nombre de la empresa**: [INSERTAR AQUI]
- **Rubro/Industria**: [INSERTAR AQUI — ej: Restaurante, Clinica Dental, Abogados, Tienda Online, Constructora, Gym, etc.]
- **Eslogan**: [INSERTAR AQUI]
- **Descripcion corta**: [INSERTAR AQUI]
- **Telefono**: [INSERTAR AQUI]
- **WhatsApp**: [INSERTAR AQUI con codigo de pais sin +]
- **Email**: [INSERTAR AQUI]
- **Direccion**: [INSERTAR AQUI]
- **Color primario (hex)**: [INSERTAR AQUI — ej: #004691]
- **Color acento (hex)**: [INSERTAR AQUI — ej: #D4AF37]
- **Color oscuro (hex)**: [INSERTAR AQUI — ej: #001C3D]
- **Sitio web / dominio**: [INSERTAR AQUI]
- **Redes sociales**: [INSERTAR URLs de Facebook, Instagram, LinkedIn, TikTok, YouTube]
- **Coordenadas Google Maps (lat, lng, zoom)**: [INSERTAR AQUI]

## INSTRUCCIONES CRITICAS — NO SALTAR NINGUNA:

### 1. REGLA DE ORO — CREDITO FASTPAGEPRO (INMUTABLE)
El texto "Desarrollado por FastPagePro" con enlace a https://www.fastpagepro.com esta HARDCODEADO en el Footer.tsx. JAMAS lo elimines, lo muevas al CMS, lo ocultes, ni lo modifiques. No debe aparecer en ningun schema de Sanity ni ser editable desde el CMS. Es permanente e inmutable en el codigo fuente.

### 2. ADAPTAR EL CODIGO AL NUEVO NEGOCIO
Descomprime el ZIP y realiza TODAS estas adaptaciones:

#### a) sanity/lib/constants.ts
- Cambiar BRAND_COLORS con los colores del nuevo negocio
- COMPANY_NAME se lee de NEXT_PUBLIC_COMPANY_NAME en .env

#### b) src/app/layout.tsx
- Actualizar metadata (title, description, keywords, openGraph, twitter) con datos del nuevo negocio
- Cambiar el locale si no es espanol
- Actualizar theme-color meta tag con el color primario del nuevo negocio

#### c) src/components/Header.tsx
- Cambiar "TU MARCA" por el nombre real del negocio
- Cambiar "Tu Eslogan Aqui" por el eslogan real
- Actualizar los navItems segun las secciones del negocio (no todos los negocios necesitan /servicios y /proyectos — pueden ser /menu, /galeria, /nosotros, /precios, etc.)
- Si el negocio tiene redes sociales, agregar los iconos/links correspondientes
- Actualizar el texto y link del boton "CONTACTANOS" del menu movil con el WhatsApp real

#### d) src/components/Footer.tsx
- NO TOCAR la linea de credito FastPagePro
- Los datos del footer ya se leen de siteSettings (via props), asi que se actualizan desde el CMS
- Ajustar las columnas del footer segun lo que el negocio necesite

#### e) src/components/WhatsAppButton.tsx
- Ya es generico (lee de siteSettings.whatsapp), no necesita cambios manuales

#### f) src/components/Preloader.tsx
- Ya es generico, usa logo-white.svg

#### g) src/app/globals.css
- Actualizar colores en :root (CSS variables) segun la paleta del nuevo negocio
- Actualizar los colores del scrollbar si quieres que combinen
- Mantener todas las animaciones y utilidades CSS existentes

#### h) sanity/schemas/siteSettings.ts
- Ya es generico — todos los campos son editables desde CMS
- Solo agregar campos adicionales si el negocio los necesita

#### i) sanity/schemas/heroSlide.ts
- Ya es generico — soporta imagen y video de fondo, CTA, etc.

#### j) Sanity schemas en general (service.ts, project.ts, etc.)
- Los schemas existentes cubren: servicios, proyectos, equipo, testimonios, socios, estadisticas, hero slides
- RENOMBRAR o ADAPTAR segun el rubro:
  - Restaurante: "servicios" → "platos" o "categorias", "proyectos" → "galeria"
  - Clinica: "servicios" → "especialidades", "teamMember" → "doctores"
  - Tienda: "servicios" → "categorias", "project" → "productos"
  - Gym: "servicios" → "programas", "teamMember" → "entrenadores"
- Mantener la misma estructura de campos (title, slug, image, description, order, featured)

#### k) sanity.config.ts — Presentation Tool
- Actualizar los resolve locations para que coincidan con las rutas del nuevo sitio
- Los defineLocations deben mapear cada tipo de documento a la URL correcta
- El previewUrl ya auto-detecta Vercel o localhost

#### l) src/lib/sanity.queries.ts
- Actualizar los GROQ queries si renombraste schemas

#### m) src/components/HomePage.tsx, ServicesPage.tsx, ProjectsPage.tsx
- Adaptar la UI, textos, iconos y estructura al nuevo rubro
- Los componentes ya leen datos del CMS via fetchCMS
- Cambiar los iconos Lucide importados segun el negocio
- Adaptar los textos de fallback (cuando CMS esta vacio)
- Mantener la misma arquitectura de datos: fetchCMS + props

#### n) .env.example → .env.local
- Llenar con los valores reales del nuevo negocio

#### o) public/
- Reemplazar logo.svg, logo-white.svg, favicon.svg con los del nuevo negocio
- Los archivos se suben directamente o como archivos SVG inline

### 3. SANITY CMS SETUP
Crear un nuevo proyecto en sanity.io/manage con:
- Project ID unico
- Dataset: production
- Generar API tokens (read + write)
- Configurar CORS origins: localhost:3000 y el dominio de Vercel

### 4. VERCEL DEPLOY
- Crear repo en GitHub
- Push del codigo
- Conectar a Vercel
- Configurar environment variables:
  - NEXT_PUBLIC_SANITY_PROJECT_ID
  - NEXT_PUBLIC_SANITY_DATASET=production
  - SANITY_API_READ_TOKEN (token con permiso read)
  - NEXT_PUBLIC_SANITY_API_READ_TOKEN (mismo token)
  - NEXT_PUBLIC_COMPANY_NAME
  - NEXT_PUBLIC_SITE_URL

### 5. SEED SCRIPT OPCIONAL
Crear un script de seed (scripts/seedCMS.ts) para poblar el CMS con datos iniciales del negocio usando el Sanity Write Token. El script debe crear:
- 1 documento siteSettings con todos los datos del negocio
- 3-5 heroSlides
- 3-6 servicios/categorias segun el rubro
- 3-4 estadisticas
- 2-3 socios/clientes
- 2-3 testimonios

### 6. IMAGENES Y VIDEOS
- Subir logos, fotos de portada, galerias, etc. directamente desde el Sanity Studio (/admin)
- El CMS soporta upload directo (form.image.directUploads: true en sanity.config.ts)
- Soporta imagenes Y videos (MP4, WebM) en hero slides

### 7. VERIFICACION FINAL
- npm install && npm run build debe compilar sin errores
- /admin debe cargar Sanity Studio con Presentation Tool
- Visual Editing debe funcionar (overlay de edicion al hacer clic en elementos desde /admin)
- Draft Mode debe funcionar (los cambios no publicados se ven en preview)
- Todas las secciones deben mostrar datos del CMS o fallbacks adecuados
- El credito "Desarrollado por FastPagePro" con link a https://www.fastpagepro.com debe ser visible en el footer

### STACK TECNOLOGICO (no cambiar):
- Next.js 16+ (Turbopack)
- Tailwind CSS v4
- Framer Motion
- Sanity v3 (Studio embebido en /admin)
- next-sanity (Visual Editing + Live + Presentation Tool)
- shadcn/ui components
- TypeScript
```

---

## NOTAS PARA EL USUARIO:

1. **El ZIP pesa ~1.5MB** (sin node_modules). Al descomprimir, ejecutar `npm install` primero.

2. **El credito de FastPagePro esta HARDCODEADO** en Footer.tsx — NO aparece en ningun schema de Sanity, NO es editable desde el CMS, y NO puede ser removido por el cliente final.

3. **Para cada nuevo proyecto**, solo necesitas:
   - Llenar los datos del negocio en el prompt de arriba
   - Un proyecto nuevo de Sanity (gratis hasta 100K API requests/mes)
   - Un repo de GitHub + Vercel (gratis para sitios personales)
   - Subir los logos del cliente a /public/

4. **El Presentation Tool (Visual Editing)** ya esta 100% configurado:
   - `/admin` carga Sanity Studio embebido
   - `presentationTool` plugin con `defineLocations` para todos los tipos de documento
   - Draft Mode API routes (`/api/draft-mode/enable` y `/disable`)
   - `VisualEditing` overlay en layout.tsx
   - `SanityLive` para live preview
   - Dual perspective client (published + previewDrafts)
   - Stega encoding para overlay de edicion