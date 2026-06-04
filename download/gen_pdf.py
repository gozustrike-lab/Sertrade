# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont('Tinos', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Tinos-B', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Tinos-I', '/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf'))
pdfmetrics.registerFont(TTFont('DJV', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DJV-B', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('MONO', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFontFamily('Tinos', normal='Tinos', bold='Tinos-B', italic='Tinos-I')

NAVY = HexColor('#004691')
DNAVY = HexColor('#001C3D')
GOLD = HexColor('#D4AF37')
LIGHT = HexColor('#F4F7FA')
GREEN = HexColor('#16A34A')
RED = HexColor('#DC2626')
GDARK = HexColor('#374151')
GMED = HexColor('#6B7280')
GLIGHT = HexColor('#E5E7EB')

W, H = A4
LM, RM, TM, BM = 25*mm, 20*mm, 25*mm, 22*mm
CW = W - LM - RM

# Styles
sH1 = ParagraphStyle('H1', fontName='DJV-B', fontSize=20, leading=26, textColor=NAVY, spaceBefore=10*mm, spaceAfter=5*mm)
sH2 = ParagraphStyle('H2', fontName='DJV-B', fontSize=15, leading=20, textColor=DNAVY, spaceBefore=7*mm, spaceAfter=4*mm)
sH3 = ParagraphStyle('H3', fontName='DJV-B', fontSize=12, leading=16, textColor=NAVY, spaceBefore=5*mm, spaceAfter=3*mm)
sBody = ParagraphStyle('B', fontName='Tinos', fontSize=10, leading=14, textColor=GDARK, alignment=TA_JUSTIFY, spaceAfter=3*mm)
sCode = ParagraphStyle('C', fontName='MONO', fontSize=8.5, leading=12, textColor=HexColor('#1E293B'), backColor=HexColor('#F1F5F9'), leftIndent=6*mm, rightIndent=6*mm, spaceBefore=2*mm, spaceAfter=2*mm, borderWidth=0.5, borderColor=GLIGHT, borderPadding=4)
sChk = ParagraphStyle('CK', fontName='Tinos', fontSize=10.5, leading=16, textColor=GDARK, leftIndent=6*mm, spaceAfter=1.5*mm)
sTH = ParagraphStyle('TH', fontName='DJV-B', fontSize=9, leading=12, textColor=white, alignment=TA_LEFT)
sTC = ParagraphStyle('TC', fontName='MONO', fontSize=8.5, leading=11.5, textColor=GDARK, alignment=TA_LEFT)
sTCB = ParagraphStyle('TCB', fontName='Tinos-B', fontSize=9, leading=12, textColor=DNAVY, alignment=TA_LEFT)
sTCD = ParagraphStyle('TCD', fontName='Tinos', fontSize=9, leading=12, textColor=GDARK, alignment=TA_JUSTIFY)
sCoverT = ParagraphStyle('CT', fontName='DJV-B', fontSize=28, leading=34, textColor=white, alignment=TA_CENTER, spaceAfter=6*mm)
sCoverS = ParagraphStyle('CS', fontName='Tinos', fontSize=14, leading=18, textColor=GOLD, alignment=TA_CENTER, spaceAfter=4*mm)
sCoverI = ParagraphStyle('CI', fontName='Tinos', fontSize=11, leading=15, textColor=HexColor('#CBD5E1'), alignment=TA_CENTER)

def gold_line():
    return HRFlowable(width="100%", thickness=1.5, color=GOLD, spaceAfter=4*mm, spaceBefore=1*mm)

def tbl(headers, rows, widths):
    hdr = [Paragraph(h, sTH) for h in headers]
    data = [hdr]
    for r in rows:
        data.append([Paragraph(c, sTC) if i==0 and len(r)>2 else Paragraph(c, sTCD) for i,c in enumerate(r)])
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),NAVY),('TEXTCOLOR',(0,0),(-1,0),white),
        ('BOTTOMPADDING',(0,0),(-1,0),6),('TOPPADDING',(0,0),(-1,0),6),
        ('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4),
        ('TOPPADDING',(0,1),(-1,-1),4),('BOTTOMPADDING',(0,1),(-1,-1),4),
        ('GRID',(0,0),(-1,-1),0.5,GLIGHT),('VALIGN',(0,0),(-1,-1),'TOP'),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[white,LIGHT]),
    ]))
    return t

def bul(text, bold=None):
    pre = f'<b>{bold}:</b> ' if bold else ''
    return Paragraph(f'<bullet>&bull;</bullet>{pre}{text}',
        ParagraphStyle('BI', parent=sBody, leftIndent=8*mm, bulletIndent=4*mm, spaceAfter=2*mm))

def chk(ok, text):
    sym = '<font color="#16A34A" size="11"><b>[YES]</b></font>' if ok else '<font color="#DC2626" size="11"><b>[NO]</b></font>'
    return Paragraph(f'{sym}  {text}', sChk)

def code_block(text):
    return Paragraph(text.replace('\n','<br/>').replace('  ','&nbsp;&nbsp;'), sCode)

# Pages
def cover_pg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DNAVY); canvas.rect(0,0,W,H,fill=1,stroke=0)
    canvas.setFillColor(GOLD); canvas.rect(0,H*0.42,W,3*mm,fill=1,stroke=0)
    canvas.setFillColor(NAVY); canvas.rect(0,0,W,15*mm,fill=1,stroke=0)
    canvas.setFillColor(GOLD); canvas.rect(0,15*mm,W,0.8*mm,fill=1,stroke=0)
    canvas.restoreState()

def normal_pg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY); canvas.rect(0,H-8*mm,W,8*mm,fill=1,stroke=0)
    canvas.setFillColor(GOLD); canvas.rect(0,H-8.6*mm,W,0.6*mm,fill=1,stroke=0)
    canvas.setFont('Tinos',8); canvas.setFillColor(GMED)
    canvas.drawString(LM,10*mm,'FastPagePro CMS Integration - Validation Document')
    canvas.drawRightString(W-RM,10*mm,f'{doc.page}')
    canvas.setFillColor(GOLD); canvas.rect(LM,9*mm,W-LM-RM,0.3*mm,fill=1,stroke=0)
    canvas.restoreState()

OUT = '/home/z/my-project/download/FastPagePro_CMS_Validacion_Final.pdf'
doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=LM, rightMargin=RM,
    topMargin=TM+5*mm, bottomMargin=BM,
    title='FastPagePro CMS - Validacion Final', author='FastPagePro.com')

S = []

# ═══ COVER ═══
S.append(Spacer(1,55*mm))
S.append(Paragraph('FastPagePro Studio v2.0', sCoverS))
S.append(Paragraph('Documento de Validacion Final', sCoverT))
S.append(Spacer(1,8*mm))
S.append(Paragraph('Integracion Sanity CMS v3 + Next.js 16', sCoverI))
S.append(Paragraph('Arquitectura de Plantilla Maestra para Agencias', sCoverI))
S.append(Spacer(1,15*mm))
S.append(Paragraph('Proyecto: Sertrade Design', ParagraphStyle('x',fontName='Tinos-B',fontSize=13,leading=17,textColor=GOLD,alignment=TA_CENTER,spaceAfter=3*mm)))
S.append(Paragraph('https://sertrade.vercel.app', ParagraphStyle('x2',fontName='MONO',fontSize=10,leading=13,textColor=HexColor('#94A3B8'),alignment=TA_CENTER)))
S.append(Spacer(1,20*mm))
S.append(Paragraph('Fecha: 4 de junio, 2026', sCoverI))
S.append(Paragraph('Version: 1.0.0 - Pre-implementacion', sCoverI))
S.append(Paragraph('Desarrollado por FastPagePro.com', ParagraphStyle('x3',fontName='Tinos-I',fontSize=9,leading=12,textColor=HexColor('#64748B'),alignment=TA_CENTER,spaceBefore=5*mm)))
S.append(PageBreak())

# ═══ 1. RESUMEN EJECUTIVO ═══
S.append(Paragraph('1. Resumen Ejecutivo', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Este documento establece la validacion final y completa antes de iniciar la implementacion '
    'de la integracion entre Sanity CMS v3 y el sitio web de Sertrade Design construido con '
    'Next.js 16.1 (App Router), Tailwind CSS v4, y Framer Motion 12. La arquitectura disenada '
    'no es exclusiva para Sertrade: es una plantilla maestra reutilizable para cualquier proyecto '
    'de FastPagePro, cubriendo verticales como construccion, arquitectura, ingenieria, logistica, '
    'industria y corporativo general.', sBody))
S.append(Paragraph(
    'Todos los contenidos visibles del sitio seran editables desde el Sanity Studio embebido en '
    '/admin, incluyendo textos, imagenes, videos, SEO, Open Graph, hero slides con soporte de video '
    'MP4/WebM, proyectos, servicios, testimonios, equipo y estadisticas animadas. El credito del pie '
    'de pagina "Desarrollado por FastPagePro.com" permanecera permanentemente hardcodeado y excluido '
    'del CMS, Visual Editing y Presentation Tool.', sBody))
S.append(Paragraph(
    'La infraestructura de Sanity ya fue desplegada en el commit a02f484 (Fast Page Pro Studio v2.0), '
    'incluyendo la configuracion del Studio, los 10 schemas documentales, el cliente con Stega para '
    'Visual Editing, las queries GROQ centralizadas, el sistema defineLive para revalidacion en '
    'tiempo real, los API routes de Draft Mode y el overlay de Visual Editing. Sin embargo, los '
    'componentes del frontend (HomePage, ProjectsPage, ServicesPage) aun consumen datos hardcodeados '
    'y necesitan ser migrados para consultar datos desde Sanity.', sBody))
S.append(Paragraph(
    'La implementacion se dividira en 5 fases secuenciales: primero la infraestructura base '
    '(configuracion, schemas, helpers), segundo el cliente y queries, tercero el Studio route handler, '
    'cuarto la conexion del layout principal con SanityLive y VisualEditing, y quinto la migracion '
    'gradual de cada pagina del frontend (Footer, Servicios, Proyectos, Home) para consumir datos del CMS '
    'en lugar de datos estaticos. Cada fase se validara antes de pasar a la siguiente.', sBody))

# ═══ 2. ARBOL DE ARCHIVOS NUEVOS ═══
S.append(Paragraph('2. Arbol Completo de Archivos Nuevos', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Los siguientes archivos seran creados o verificados durante la implementacion. Los archivos marcados '
    'con (*) ya existen en el commit a02f484 y seran verificados/actualizados. Los demas se crean desde cero.', sBody))

tree_text = (
    'sanity/<br/>'
    '&nbsp;&nbsp;config.ts (*)<br/>'
    '&nbsp;&nbsp;lib/<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;constants.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;schema-master.ts (*)<br/>'
    '&nbsp;&nbsp;schema.ts (*)<br/>'
    '&nbsp;&nbsp;schemas/<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;index.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;siteSettings.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;heroSlide.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;serviceCategory.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;service.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;project.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;teamMember.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;testimonial.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;partner.ts (*)<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;stat.ts (*)<br/>'
    '<br/>'
    'src/lib/<br/>'
    '&nbsp;&nbsp;sanity.client.ts (*)<br/>'
    '&nbsp;&nbsp;sanity.queries.ts (*)<br/>'
    '<br/>'
    'src/sanity/<br/>'
    '&nbsp;&nbsp;live.ts (*)<br/>'
    '<br/>'
    'src/app/admin/[[...tool]]/<br/>'
    '&nbsp;&nbsp;page.tsx (*)<br/>'
    '<br/>'
    'src/app/api/draft-mode/<br/>'
    '&nbsp;&nbsp;enable/route.ts (*)<br/>'
    '&nbsp;&nbsp;disable/route.ts (*)<br/>'
    '<br/>'
    'src/components/<br/>'
    '&nbsp;&nbsp;VisualEditing.tsx (*)'
)
S.append(Paragraph(tree_text, ParagraphStyle('Tree', fontName='MONO', fontSize=8, leading=11,
    textColor=HexColor('#1E293B'), backColor=HexColor('#F1F5F9'),
    leftIndent=5*mm, rightIndent=5*mm, borderWidth=0.5, borderColor=GLIGHT, borderPadding=5,
    spaceBefore=3*mm, spaceAfter=4*mm)))

S.append(Paragraph(
    'Total: 22 archivos relacionados con Sanity. De estos, 21 ya existen en la infraestructura '
    'desplegada (commit a02f484) y seran verificados. Los archivos que requieren creacion o modificacion '
    'importante son los componentes del frontend (HomePage, ProjectsPage, ServicesPage, Footer) y el '
    'layout.tsx que aun no estan conectados al CMS.', sBody))

# ═══ 3. ARCHIVOS MODIFICADOS ═══
S.append(Paragraph('3. Archivos Modificados', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Los siguientes archivos existentes seran modificados para conectar el CMS al frontend. '
    'Cada modificacion es incremental y retrocompatible: si el CMS no responde, los componentes '
    'mostraran los datos hardcodeados existentes como fallback.', sBody))

mod_data = [
    ['src/app/layout.tsx', 'Envolver children con &lt;SanityLive&gt; + &lt;VisualEditing&gt; para revalidacion en tiempo real y overlay de edicion inline', 'Bajo'],
    ['src/components/HomePage.tsx', 'Reemplazar datos hardcodeados de hero, stats, servicios, proyectos, pilares y logos por fetch a Sanity queries con fallback', 'Medio'],
    ['src/components/ProjectsPage.tsx', 'Reemplazar 6 proyectos hardcodeados por fetch a query allProjects; mantener galeria y video lightbox intactos', 'Medio'],
    ['src/components/ServicesPage.tsx', 'Reemplazar 3 modulos de servicio por fetch a query allServices con subservicios y categorias dinamicas', 'Medio'],
    ['src/components/Footer.tsx', 'Reemplazar datos de contacto, redes y direccion por fetch a siteSettings; MANTENER credito FastPagePro hardcodeado', 'Bajo'],
    ['next.config.ts', 'Agregar cdn.sanity.io en images.remote para optimizacion de imagenes desde CDN de Sanity', 'Bajo'],
]
S.append(tbl(['Archivo','Modificacion','Riesgo'], mod_data, [50*mm, CW-70*mm, 20*mm]))

# ═══ 4. DEPENDENCIAS ═══
S.append(Paragraph('4. Dependencias a Instalar', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Las siguientes dependencias son necesarias para Sanity CMS v3. Algunas ya estan en package.json '
    'pero se listan para confirmar versiones minimas requeridas.', sBody))

dep_data = [
    ['next-sanity','9.x','Cliente Sanity optimizado para Next.js App Router. Incluye NextStudio, createClient, defineRouteHandler.'],
    ['sanity','3.x','Core de Sanity Studio: defineConfig, defineType, defineField, plugins.'],
    ['@sanity/image-url','1.x','Constructor de URLs optimizadas para imagenes de Sanity CDN con parametros de transformacion.'],
    ['@sanity/icons','2.x','Iconos oficiales para identificar tipos de documento en el panel del Studio.'],
]
S.append(tbl(['Paquete','Version','Proposito'], dep_data, [35*mm,20*mm,CW-55*mm]))
S.append(Spacer(1,2*mm))
S.append(Paragraph('Comando de instalacion:', sBody))
S.append(code_block('bun add next-sanity sanity @sanity/image-url @sanity/icons'))

# ═══ 5. VARIABLES DE ENTORNO ═══
S.append(Paragraph('5. Variables de Entorno Necesarias', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Variables obligatorias para desarrollo local (.env.local) y produccion (Vercel dashboard). '
    'Las credenciales se obtienen de manage.sanity.io.', sBody))

env_data = [
    ['NEXT_PUBLIC_SANITY_PROJECT_ID','abc123xyz','ID unico del proyecto Sanity. Publica para image URL builder del lado del cliente.'],
    ['NEXT_PUBLIC_SANITY_DATASET','production','Nombre del dataset. Por defecto "production".'],
    ['SANITY_API_READ_TOKEN','sk_abc123...','Token solo lectura (CDA). Server-side. Obligatorio para prevenir dataset publico.'],
    ['SANITY_API_TOKEN_PREVIEW','sk_preview...','Token con permisos de preview. Server-side. Para Draft Mode y Presentation Tool.'],
    ['NEXT_PUBLIC_SANITY_STUDIO_URL','/admin','URL del Studio embebido. Publica para redirect desde Presentation Tool.'],
    ['NEXT_PUBLIC_SITE_URL','https://sertrade.vercel.app','URL publica del sitio. Para OG images, sitemaps y metadatos SEO dinamicos.'],
]
S.append(tbl(['Variable','Ejemplo','Descripcion'], env_data, [48*mm,28*mm,CW-76*mm]))
S.append(Spacer(1,2*mm))
S.append(Paragraph('Archivo .env.local.example:', sBody))
S.append(code_block(
    'NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id<br/>'
    'NEXT_PUBLIC_SANITY_DATASET=production<br/>'
    'SANITY_API_READ_TOKEN=tu_read_token<br/>'
    'SANITY_API_TOKEN_PREVIEW=tu_preview_token<br/>'
    'NEXT_PUBLIC_SANITY_STUDIO_URL=/admin<br/>'
    'NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app'))
S.append(Paragraph(
    'Las variables NEXT_PUBLIC_ son accesibles del lado del cliente. Las demas son exclusivas del servidor '
    'y nunca se exponen al navegador. Los tokens de API permiten acceder a los documentos del CMS, '
    'incluyendo drafts, por lo que deben protegerse estrictamente.', sBody))

# ═══ 6. SCHEMAS DEFINITIVOS ═══
S.append(PageBreak())
S.append(Paragraph('6. Schemas Definitivos (10 Tipos de Documento)', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Los schemas definen la estructura de documentos en Sanity. Son genericos y reutilizables para '
    'cualquier proyecto de FastPagePro, no solo para Sertrade. Cada schema se configura con defineType '
    'y contiene campos con defineField. Los singletons (siteSettings, studioGuide) solo permiten un '
    'documento; los demas soportan multiples instancias.', sBody))

sch_data = [
    ['siteSettings','Singleton','title, description, ogImage, favicon, logo, phone, email, address, socialLinks[], location (geopoint), seoTitle, seoDescription, ogTitle, ogDescription, canonicalUrl'],
    ['heroSlide','Multiple','title, subtitle, ctaText, ctaLink, backgroundImage, videoMP4 (file), videoWebM (file), posterImage, muted, autoplay, loop, mobileFallbackImage, order'],
    ['serviceCategory','Multiple','title, slug, description, icon (icon picker), accentColor, image'],
    ['service','Multiple','title, slug, shortDescription, featuredImage, category (ref), subservices[] (title, description, icon, image), featured, order'],
    ['project','Multiple','title, slug, client, year, description (Portable Text), featuredImage, gallery[] (max 15), tags[], status (enum), category, videoUrl'],
    ['teamMember','Multiple','name, slug, role, photo, bio (Portable Text), email, phone, socialLinks[], order'],
    ['testimonial','Multiple','name, role, company, quote, rating (1-5), avatar, featured'],
    ['partner','Multiple','name, logo (image), url, order'],
    ['stat','Multiple','label, value (number), suffix (+/%/K), icon, order, featured'],
    ['studioGuide','Singleton','title, content (Portable Text), version'],
]
S.append(tbl(['Schema','Tipo','Campos principales'], sch_data, [30*mm,22*mm,CW-52*mm]))

S.append(Spacer(1,4*mm))
S.append(Paragraph('6.1 Detalle del Schema heroSlide (Soporte de Video)', sH2))
S.append(Paragraph(
    'El schema heroSlide es el mas complejo porque soporta imagen estatica, video MP4, video WebM, '
    'poster image y fallback movil. Cada campo es opcional (excepto title y backgroundImage) lo que '
    'permite crear slides solo con imagen, solo con video, o con combinacion de ambos. Los booleanos '
    'muted/autoplay/loop controlan el comportamiento del reproductor.', sBody))

hero_data = [
    ['title','string','Si','Titulo principal del slide'],
    ['subtitle','string','No','Subtitulo o descripcion breve'],
    ['ctaText','string','No','Texto del boton de accion'],
    ['ctaLink','string','No','URL o slug destino del CTA'],
    ['backgroundImage','image','Si','Imagen de fondo principal (fallback universal)'],
    ['videoMP4','file (video/mp4)','No','Video MP4 de fondo para escritorio'],
    ['videoWebM','file (video/webm)','No','Video WebM para navegadores compatibles'],
    ['posterImage','image','No','Imagen mostrada mientras el video carga'],
    ['muted','boolean','No','Silenciar video (default: true)'],
    ['autoplay','boolean','No','Reproducir automaticamente (default: true)'],
    ['loop','boolean','No','Reproducir en bucle (default: true)'],
    ['mobileFallbackImage','image','No','Imagen especifica para moviles'],
    ['order','number','Si','Posicion en el carrusel'],
]
S.append(tbl(['Campo','Tipo Sanity','Req.','Descripcion'], hero_data, [30*mm,32*mm,14*mm,CW-76*mm]))

# ═══ 7. QUERIES GROQ ═══
S.append(Paragraph('7. Queries GROQ Definitivas (10 Queries)', sH1))
S.append(gold_line())
S.append(Paragraph(
    'GROQ (Graph-Relational Object Queries) es el lenguaje de consulta de Sanity. Todas las queries '
    'estan centralizadas en src/lib/sanity.queries.ts. Cada query retorna solo los campos necesarios '
    'con proyecciones para imagenes optimizadas y coalesce para valores por defecto.', sBody))

q_data = [
    ['siteSettingsQuery','Config global','1 documento singleton con datos de contacto, redes, SEO y OG'],
    ['allHeroSlidesQuery','Hero carousel','Array ordenado por "order": imagenes, videos, poster y fallback movil'],
    ['allServicesQuery','Servicios','Array con categoria referenciada, subservicios inline, imagen destacada'],
    ['allProjectsQuery','Portafolio','Array con galeria (max 15), tags, estado, video URL'],
    ['allTeamMembersQuery','Equipo','Array ordenado con foto, bio (Portable Text), redes sociales'],
    ['allTestimonialsQuery','Testimonios','Array filtrado por "featured" con quote, avatar, rating'],
    ['allPartnersQuery','Partners','Array ordenado con nombre, logo, URL del sitio'],
    ['allStatsQuery','Estadisticas','Array filtrado por "featured" con valor numerico y sufijo'],
    ['serviceBySlugQuery','Servicio por slug','1 documento con subservicios y categoria'],
    ['projectBySlugQuery','Proyecto por slug','1 documento con galeria, descripcion (Portable Text), tags'],
]
S.append(tbl(['Query','Proposito','Retorna'], q_data, [40*mm,30*mm,CW-70*mm]))

S.append(Spacer(1,3*mm))
S.append(Paragraph('7.1 Ejemplo: allHeroSlidesQuery', sH2))
S.append(code_block(
    '*[_type == "heroSlide"] | order(order asc) {<br/>'
    '&nbsp;&nbsp;_id, title, subtitle, ctaText, ctaLink,<br/>'
    '&nbsp;&nbsp;"bgImage": backgroundImage { asset-> { url, metadata { dimensions } } },<br/>'
    '&nbsp;&nbsp;"videoMp4": videoMP4.asset->url,<br/>'
    '&nbsp;&nbsp;"videoWebm": videoWebM.asset->url,<br/>'
    '&nbsp;&nbsp;"poster": posterImage { asset-> { url, metadata { dimensions } } },<br/>'
    '&nbsp;&nbsp;muted, autoplay, loop,<br/>'
    '&nbsp;&nbsp;"mobileImg": mobileFallbackImage { asset-> { url, metadata { dimensions } } },<br/>'
    '&nbsp;&nbsp;order<br/>'
    '}'))

# ═══ 8. EDITABLE vs HARDCODEADO ═══
S.append(PageBreak())
S.append(Paragraph('8. Contenido Editable vs. Hardcodeado', sH1))
S.append(gold_line())

S.append(Paragraph('8.1 Contenido Editable desde Sanity Studio', sH2))
S.append(Paragraph(
    'Todo el contenido visible sera editable desde /admin sin tocar codigo ni hacer deploys. '
    'Los cambios en documentos publicados se reflejan inmediatamente gracias a defineLive que escucha '
    'mutaciones via WebSocket y dispara revalidacion del cache ISR de Next.js.', sBody))

for t,d in [
    ('Textos','Todos los textos publicos: titulos, descripciones, subtitulos, CTAs, textos de contacto, direcciones, textos del header y footer (seccion contacto)'),
    ('Imagenes','Todas las imagenes: hero slides, servicios, galerias de proyectos, fotos de equipo, avatares, logos de partners, iconos, OG image, favicon, logo del sitio'),
    ('Videos','Videos de hero slides: MP4, WebM, poster image. Video URL en proyectos. Parametros muted, autoplay, loop'),
    ('Hero Video','Cada slide soporta: imagen + video MP4 + video WebM + poster + fallback movil. Todo editable campo por campo'),
    ('Open Graph','Titulo OG, descripcion OG, imagen OG, URL canonica desde siteSettings del CMS. Metadata dinamica en layout.tsx'),
    ('SEO','Title tag, meta description, URL canonica. Obtenido de siteSettings e inyectado en metadata API de Next.js App Router'),
    ('Proyectos','Titulo, cliente, ano, descripcion (Portable Text), imagen destacada, galeria (15 imgs), tags, estado, categoria, video URL'),
    ('Servicios','Titulo, slug, descripcion, imagen, categoria, subservicios (titulo + desc + icono + imagen), orden, destacado'),
    ('Testimonios','Nombre, rol, empresa, quote, rating (1-5), avatar, destacado'),
    ('Equipo','Nombre, rol, foto, bio (Portable Text), email, telefono, redes sociales, orden'),
    ('Config global','Nombre empresa, telefono, email, direccion, redes sociales, ubicacion GPS, colores, titulo, descripcion'),
]:
    S.append(bul(d, t))

S.append(Paragraph('8.2 Contenido Hardcodeado (Fuera del CMS)', sH2))
S.append(Paragraph(
    'Estos elementos permaneceran permanentemente fuera del CMS, Visual Editing y Presentation Tool '
    'por diseno para proteger la integridad de marca y elementos funcionales.', sBody))

for t,d in [
    ('"Desarrollado por FastPagePro.com"','String literal en Footer.tsx. Nunca en Sanity, nunca editable en Studio, ignorado por VisualEditing. Atributo de marca inmutable.'),
    ('URL del credito','href apunta siempre a https://fastpagepro.com. No almacenado en CMS ni configurable.'),
    ('Estructura de componentes','Layout HTML/JSX de Header, Footer, HomePage. No editable. Solo los datos que consumen son editables.'),
    ('Logica de animaciones','Animaciones Framer Motion (fadeIn, slideIn, flip cards) hardcodeadas en componentes y CSS. No configurables.'),
    ('Rutas de navegacion','Paths (/, /proyectos, /servicios, /admin) hardcodeados en Header. Solo textos de links serian editables en futuro.'),
    ('Libro de Reclamaciones','Formulario con validacion Zod, envio simulado. No conectado al CMS.'),
]:
    S.append(bul(d, t))

# ═══ 9. VISUAL EDITING ═══
S.append(Paragraph('9. Funcionamiento de Visual Editing', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Visual Editing permite overlayear un panel transparente sobre el sitio en produccion, para '
    'que un editor haga clic en cualquier elemento editable y lo modifique directamente, viendo los '
    'cambios en tiempo real. Funciona en tres capas: Stega en el cliente, overlay de VisualEditing, '
    'y edicion inline con revalidacion automatica.', sBody))

S.append(bul(
    'El cliente de Sanity se configura con stega: { enabled: true, studioUrl: "/admin" } en '
    'src/lib/sanity.client.ts. Cuando se consulta un documento, Sanity inyecta metadatos invisibles '
    '(source maps) en cada campo, conteniendo referencias al documento, campo y proyecto.', 
    'Capa 1 - Cliente con Stega'))
S.append(bul(
    'El componente VisualEditing.tsx (ya existente) se renderiza en layout.tsx envolviendo el contenido. '
    'Detecta si el usuario esta autenticado en el Studio y si los datos contienen Stega. Si ambas '
    'condiciones se cumplen, renderiza un overlay con indicadores visuales en cada campo editable.', 
    'Capa 2 - Overlay'))
S.append(bul(
    'Al hacer clic en un campo editable, se abre un modal inline del Studio dentro de la misma ventana. '
    'Al guardar, los cambios se publican y la pagina se revalida automaticamente via defineLive, '
    'mostrando el contenido actualizado sin recarga manual.', 
    'Capa 3 - Edicion inline'))
S.append(Paragraph(
    'Importante: El footer credit "Desarrollado por FastPagePro.com" no sera detectado como editable '
    'porque no proviene de ninguna query con Stega - es una string literal hardcodeada.', sBody))

S.append(Paragraph('9.1 Configuracion en layout.tsx:', sH3))
S.append(code_block(
    "import { VisualEditing } from '@/components/VisualEditing';<br/>"
    "import { SanityLive } from '@/sanity/live';<br/>"
    "// En RootLayout:<br/>"
    "&lt;SanityLive&gt;{children}&lt;/SanityLive&gt;<br/>"
    "{process.env.NODE_ENV === 'development' &amp;&amp; &lt;VisualEditing /&gt;}"))

# ═══ 10. PRESENTATION TOOL ═══
S.append(Paragraph('10. Funcionamiento de Presentation Tool', sH1))
S.append(gold_line())
S.append(Paragraph(
    'El Presentation Tool reemplaza Vision/Releases y consiste en dos tabs: Structure (Studio normal) '
    'y Presentation (preview en tiempo real). Al modificar un documento en Structure, se puede cambiar '
    'a Presentation para ver el contenido en el sitio web real sin abrir otra ventana.', sBody))

S.append(bul(
    'La ubicacion del Studio se configura en sanity.config.ts con basePath: "/admin". Esta ruta '
    'resuelve las ubicaciones de vista previa del Presentation Tool.',
    'Studio Route'))
S.append(bul(
    'Las preview locations mapean cada tipo de documento a una URL del sitio. Un documento "project" '
    'con slug "mi-proyecto" se previsualiza en /proyectos/mi-proyecto.',
    'Preview Locations'))
S.append(bul(
    'Los API routes /api/draft-mode/enable y disable gestionan cookies para activar la consulta de '
    'documentos draft. El Presentation Tool habilita Draft Mode automaticamente al abrir una preview.',
    'Draft Mode Integration'))
S.append(bul(
    'El credito del footer nunca aparecera como editable en Presentation Tool porque: no esta en '
    'ningun documento de Sanity, no aparece en queries GROQ, no tiene source maps Stega, y las '
    'preview locations solo aplican a documentos CMS.',
    'Exclusion del Footer Credit'))

# ═══ 11. IMAGENES, VIDEOS, MULTIMEDIA ═══
S.append(Paragraph('11. Manejo de Imagenes, Videos y Multimedia', sH1))
S.append(gold_line())

S.append(Paragraph('11.1 Imagenes', sH2))
S.append(Paragraph(
    'Todas las imagenes se almacenan como assets de Sanity y se sirven via cdn.sanity.io. '
    '@sanity/image-url genera URLs optimizadas con parametros de transformacion en tiempo real.', sBody))
S.append(bul(
    'URLs del tipo cdn.sanity.io/images/{projectId}/{dataset}/{assetId}-{dimensions}.webp con '
    'parametros automaticos de formato WebP, calidad 85, dimensiones segun componente.',
    'Image URL Builder'))
S.append(bul(
    'Se agregara cdn.sanity.io al array images.remote en next.config.ts para permitir que el '
    'componente &lt;Image&gt; de Next.js optimice imagenes de Sanity.',
    'next.config.ts'))
S.append(bul(
    'Metadata automatico: dimensiones, MIME, tamano, SHA1 hash, paleta de colores dominante. '
    'Las queries GROQ pueden proyectar estos metadatos para lazy loading y placeholders blur.',
    'Metadata'))

S.append(Paragraph('11.2 Videos (Hero Slides)', sH2))
S.append(Paragraph(
    'Los videos se almacenan como assets con tipos video/mp4 y video/webm. Se sirven en formato '
    'original (sin transformacion CDN). En escritorio, si existe videoMP4/WebM se reproduce como '
    'fondo con muted/autoplay/loop. En movil, siempre se muestra la imagen de fallback para ahorrar '
    'datos. La posterImage se muestra mientras el video carga.', sBody))

S.append(Paragraph('11.3 Galerias de Proyectos', sH2))
S.append(Paragraph(
    'Cada proyecto soporta hasta 15 imagenes en galeria. El lightbox existente (zoom, pan, swipe, '
    'rotacion) se mantiene intacto; solo se reemplazan las URLs de Unsplash por URLs de Sanity. '
    'No se requiere modificacion en la logica del lightbox.', sBody))

# ═══ 12. CACHE E ISR ═══
S.append(Paragraph('12. Estrategia de Cache e ISR', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Tres pilares: SSG con revalidacion periodica (ISR), revalidacion bajo demanda via defineLive, '
    'y cache del CDN de Vercel. Tiempos de carga rapidos sin sacrificar actualizacion en tiempo real.', sBody))

for t,d in [
    ('ISR (Incremental Static Regeneration)','Paginas generadas estaticamente en build, revalidadas cada 60 segundos (revalidate: 60). Contenido actualizado max en 60s sin rebuild.'),
    ('defineLive (Tiempo Real)','Conexion WebSocket con Sanity que escucha mutaciones. Cuando un documento cambia, dispara revalidacion inmediata. Latencia reducida de 60s a casi instantaneo.'),
    ('CDN de Vercel','HTML cacheado en edge nodes globales. Revalidacion invalida cache automaticamente. Stale-while-revalidate garantiza que el sitio nunca sea lento.'),
    ('Sanity CDN (Imagenes)','Cache agresivo (1 ano). URLs unicas por dimensiones y hash del asset. Actualizar imagen en Sanity genera nueva URL, invalidando cache automaticamente.'),
    ('Draft Mode (Sin Cache)','Con Draft Mode habilitado, queries se ejecutan con token de preview sin cache. Cambios visibles en tiempo real. Se deshabilita al cerrar navegador.'),
]:
    S.append(bul(d, t))

# ═══ 13. VERCEL ═══
S.append(Paragraph('13. Compatibilidad con Vercel', sH1))
S.append(gold_line())
S.append(Paragraph(
    'La integracion esta disenada para Vercel. Next.js 16 con App Router es el runtime nativo, y '
    'todos los sistemas de Sanity estan probados y compatibles con la plataforma.', sBody))

for t,d in [
    ('Studio Embebido','NextStudio de next-sanity se ejecuta como Server Component en edge sin servidor dedicado.'),
    ('Environment Variables','Se configuran en Vercel dashboard. NEXT_PUBLIC_ se inyectan en build; las demas son server-only.'),
    ('ISR y Revalidacion','Vercel soporta ISR nativo con revalidate. 60s optimo para sitios corporativos.'),
    ('Edge Functions','API routes de Draft Mode se ejecutan como Edge Functions, rapidas y globales.'),
    ('Imagenes Optimizadas','&lt;Image&gt; de Next.js con cdn.sanity.io permite optimizacion desde infrastructure Vercel (hasta 80% menor).'),
    ('Deploy Automatico','Push a main dispara deploy. Build time tipico: 45-90 segundos.'),
]:
    S.append(bul(d, t))

# ═══ 14. FASTPAGEPRO CLONACION ═══
S.append(Paragraph('14. Compatibilidad con Clonaciones FastPagePro', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Arquitectura como plantilla maestra reutilizable. Al clonar para nuevo proyecto, solo cambios '
    'de configuracion: no se modifican schemas, queries ni componentes.', sBody))

S.append(Paragraph('14.1 Checklist de Clonacion:', sH2))
for item in [
    'Actualizar NEXT_PUBLIC_SANITY_PROJECT_ID con ID del nuevo proyecto',
    'Actualizar NEXT_PUBLIC_SITE_URL con el dominio nuevo',
    'Actualizar SANITY_API_READ_TOKEN y SANITY_API_TOKEN_PREVIEW',
    'Modificar sanity/lib/constants.ts: BRAND_COLORS, COMPANY_NAME, STUDIO_TITLE, SITE_URL',
    'Cambiar logo, favicon y OG images en public/ y Sanity',
    'Actualizar contenido del CMS desde Studio (no tocar codigo)',
    'Configurar dominio personalizado en Vercel',
    'El credito "Desarrollado por FastPagePro.com" permanecera automaticamente en el footer',
]:
    S.append(bul(item))

S.append(Paragraph('14.2 Verticales Soportadas:', sH2))
v_data = [
    ['Construccion / Ingenieria','Proyectos de construccion, servicios, galeria renders, equipo, testimonios'],
    ['Arquitectura','Proyectos arquitectonicos, diseno, renders, equipo, estadisticas m2'],
    ['Logistica / Transporte','Servicios logisticos, flota, cobertura rutas, clientes, metricas entregas'],
    ['Industria / Manufactura','Productos industriales, lineas produccion, certificaciones, capacidad'],
    ['Corporativo General','Paginas informativas, directorio, servicios, casos de exito, valores'],
    ['Tecnologia / Software','Productos digitales, desarrollo, equipo tech, stack, metricas rendimiento'],
]
S.append(tbl(['Vertical','Aplicacion'], v_data, [45*mm,CW-45*mm]))

# ═══ 15. CONFIRMACIONES ═══
S.append(PageBreak())
S.append(Paragraph('15. Confirmaciones Obligatorias', sH1))
S.append(gold_line())
S.append(Paragraph(
    'Lista de verificacion final con todas las confirmaciones explicitas solicitadas. Cada item '
    'esta marcado como afirmativo [YES] o negativo [NO]. Estos estados son vinculantes.', sBody))
S.append(Spacer(1,3*mm))

for ok, text in [
    (True,'Textos editables - Todos los textos publicos seran editables desde Sanity Studio'),
    (True,'Imagenes editables - Todas las imagenes almacenadas y editables desde Sanity'),
    (True,'Videos editables - Videos de hero slides (MP4/WebM) gestionados desde Sanity'),
    (True,'Hero Video editable desde CMS - Imagen + video MP4 + WebM + poster + fallback movil, todo configurable'),
    (True,'Open Graph editable - Titulo, descripcion, imagen, URL canonica desde siteSettings del CMS'),
    (True,'SEO editable - Title tag, meta description, URL canonica dinamicos desde CMS'),
    (True,'Proyectos editables - Titulo, cliente, ano, descripcion (Portable Text), galeria, tags, estado, video'),
    (True,'Servicios editables - Titulo, subservicios, categoria, imagen, orden, destacado'),
    (True,'Testimonios editables - Nombre, rol, quote, rating, avatar, destacado'),
    (True,'Equipo editable - Nombre, rol, foto, bio (Portable Text), email, redes, orden'),
    (True,'Configuracion global editable - Contacto, redes, ubicacion, SEO, OG desde siteSettings'),
    (True,'Visual Editing funcional - Overlay de edicion inline sobre el sitio en produccion'),
    (True,'Presentation Tool funcional - Tabs Structure y Presentation con Draft Mode'),
    (False,'El credito "Desarrollado por FastPagePro.com" permanecera HARDCODEADO y fuera del CMS permanentemente'),
]:
    S.append(chk(ok, text))

# ═══ 16. PLAN DE IMPLEMENTACION ═══
S.append(Spacer(1,6*mm))
S.append(Paragraph('16. Plan de Implementacion (5 Fases)', sH1))
S.append(gold_line())

for t,d in [
    ('Fase 1: Infraestructura','Verificar sanity.config.ts, schemas (10 types), constants.ts, schema-master.ts. Validar compilacion en Studio /admin.'),
    ('Fase 2: Cliente y Queries','Verificar sanity.client.ts (Stega), sanity.queries.ts (10 queries), sanity/live.ts (defineLive). Verificar API routes Draft Mode.'),
    ('Fase 3: Studio Route','Verificar src/app/admin/[[...tool]]/page.tsx. Validar Studio carga correctamente con 10 tipos de documento.'),
    ('Fase 4: Layout','Modificar layout.tsx: SanityLive + VisualEditing. Modificar next.config.ts: cdn.sanity.io en images.remote.'),
    ('Fase 5: Migracion Frontend','Migrar componentes en orden: Footer > ServicesPage > ProjectsPage > HomePage. Cada uno con fallback hardcodeado.'),
]:
    S.append(bul(d, t))

S.append(Spacer(1,8*mm))
S.append(HRFlowable(width="40%", thickness=1, color=GOLD, spaceAfter=4*mm, spaceBefore=2*mm))
S.append(Paragraph('<i>Documento generado por FastPagePro.com - Arquitectura de Plantilla Maestra v1.0</i>',
    ParagraphStyle('fc', fontName='Tinos-I', fontSize=9, leading=12, textColor=GMED, alignment=TA_CENTER)))
S.append(Paragraph('https://sertrade.vercel.app',
    ParagraphStyle('fu', fontName='MONO', fontSize=8, leading=11, textColor=GMED, alignment=TA_CENTER)))

# BUILD
doc.build(S, onFirstPage=cover_pg, onLaterPages=normal_pg)
print(f'PDF generado: {OUT}')
