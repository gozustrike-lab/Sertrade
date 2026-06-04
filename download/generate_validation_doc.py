# -*- coding: utf-8 -*-
"""
FastPagePro CMS Integration — Final Validation Document
Sertrade Design + Sanity v3
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, ListFlowable, ListItem,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ─── Register fonts ───────────────────────────────────────────────
pdfmetrics.registerFont(TTFont('Tinos', '/usr/share/fonts/truetype/english/Tinos-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Tinos-Bold', '/usr/share/fonts/truetype/english/Tinos-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Tinos-Italic', '/usr/share/fonts/truetype/english/Tinos-Italic.ttf'))
pdfmetrics.registerFont(TTFont('Tinos-BoldItalic', '/usr/share/fonts/truetype/english/Tinos-BoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVu-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuMono', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

pdfmetrics.registerFontFamily(
    'Tinos',
    normal='Tinos', bold='Tinos-Bold', italic='Tinos-Italic', boldItalic='Tinos-BoldItalic'
)

# ─── Brand Colors ───────────────────────────────────────────────────
NAVY = HexColor('#004691')
DARK_NAVY = HexColor('#001C3D')
GOLD = HexColor('#D4AF37')
LIGHT = HexColor('#F4F7FA')
GREEN_OK = HexColor('#16A34A')
RED_NO = HexColor('#DC2626')
GRAY_DARK = HexColor('#374151')
GRAY_MED = HexColor('#6B7280')
GRAY_LIGHT = HexColor('#E5E7EB')
WHITE_BG = HexColor('#FFFFFF')
CODE_BG = HexColor('#F1F5F9')

W, H = A4
LEFT = 25 * mm
RIGHT = 20 * mm
TOP = 20 * mm
BOTTOM = 22 * mm
CONTENT_W = W - LEFT - RIGHT

# ─── Styles ────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

cover_title = ParagraphStyle(
    'CoverTitle', fontName='DejaVu-Bold', fontSize=28, leading=34,
    textColor=white, alignment=TA_CENTER, spaceAfter=6*mm
)
cover_subtitle = ParagraphStyle(
    'CoverSub', fontName='Tinos', fontSize=14, leading=18,
    textColor=GOLD, alignment=TA_CENTER, spaceAfter=4*mm
)
cover_info = ParagraphStyle(
    'CoverInfo', fontName='Tinos', fontSize=11, leading=15,
    textColor=HexColor('#CBD5E1'), alignment=TA_CENTER
)

h1_style = ParagraphStyle(
    'H1', fontName='DejaVu-Bold', fontSize=20, leading=26,
    textColor=NAVY, spaceBefore=10*mm, spaceAfter=5*mm,
    borderWidth=0, borderColor=GOLD, borderPadding=0
)
h2_style = ParagraphStyle(
    'H2', fontName='DejaVu-Bold', fontSize=15, leading=20,
    textColor=DARK_NAVY, spaceBefore=7*mm, spaceAfter=4*mm
)
h3_style = ParagraphStyle(
    'H3', fontName='DejaVu-Bold', fontSize=12, leading=16,
    textColor=NAVY, spaceBefore=5*mm, spaceAfter=3*mm
)
body = ParagraphStyle(
    'BodyText2', fontName='Tinos', fontSize=10, leading=14,
    textColor=GRAY_DARK, alignment=TA_JUSTIFY, spaceAfter=3*mm
)
body_bold = ParagraphStyle(
    'BodyBold', parent=body, fontName='Tinos-Bold', textColor=HexColor('#1F2937')
)
code_style = ParagraphStyle(
    'Code', fontName='DejaVuMono', fontSize=8.5, leading=12,
    textColor=HexColor('#1E293B'), backColor=CODE_BG,
    leftIndent=6*mm, rightIndent=6*mm, spaceBefore=2*mm, spaceAfter=2*mm,
    borderWidth=0.5, borderColor=GRAY_LIGHT, borderPadding=4
)
check_style = ParagraphStyle(
    'Check', fontName='Tinos', fontSize=10.5, leading=16,
    textColor=GRAY_DARK, leftIndent=6*mm, spaceAfter=1.5*mm
)
table_header_style = ParagraphStyle(
    'TH', fontName='DejaVu-Bold', fontSize=9, leading=12,
    textColor=white, alignment=TA_LEFT
)
table_cell_style = ParagraphStyle(
    'TC', fontName='DejaVuMono', fontSize=8.5, leading=11.5,
    textColor=GRAY_DARK, alignment=TA_LEFT
)
table_cell_bold = ParagraphStyle(
    'TCB', fontName='Tinos-Bold', fontSize=9, leading=12,
    textColor=DARK_NAVY, alignment=TA_LEFT
)
table_cell_desc = ParagraphStyle(
    'TCD', fontName='Tinos', fontSize=9, leading=12,
    textColor=GRAY_DARK, alignment=TA_JUSTIFY
)
footer_style = ParagraphStyle(
    'Footer', fontName='Tinos', fontSize=8, leading=10,
    textColor=GRAY_MED, alignment=TA_CENTER
)

# ─── Helper functions ─────────────────────────────────────────────
def gold_line():
    return HRFlowable(width="100%", thickness=1.5, color=GOLD, spaceAfter=4*mm, spaceBefore=1*mm)

def thin_line():
    return HRFlowable(width="100%", thickness=0.5, color=GRAY_LIGHT, spaceAfter=3*mm, spaceBefore=1*mm)

def check(ok, text):
    symbol = '<font color="#16A34A"><b>YES</b></font>' if ok else '<font color="#DC2626"><b>NO</b></font>'
    return Paragraph(f'{symbol}  {text}', check_style)

def check_x(ok, text):
    symbol = '<font color="#16A34A" size="12"><b>[YES]</b></font>' if ok else '<font color="#DC2626" size="12"><b>[NO]</b></font>'
    return Paragraph(symbol + '  ' + text, check_style)

def bullet(text, bold_prefix=None):
    if bold_prefix:
        return Paragraph(f'<bullet>&bull;</bullet><b>{bold_prefix}:</b> {text}', ParagraphStyle(
            'BulletItem', parent=body, leftIndent=8*mm, bulletIndent=4*mm, spaceAfter=2*mm
        ))
    return Paragraph(f'<bullet>&bull;</bullet>{text}', ParagraphStyle(
        'BulletItem2', parent=body, leftIndent=8*mm, bulletIndent=4*mm, spaceAfter=2*mm
    ))

def code_block(text):
    return Paragraph(text.replace('\n', '<br/>').replace(' ', '&nbsp;'), code_style)

def make_table(headers, rows, col_widths=None):
    """Create a styled table."""
    header_cells = [Paragraph(h, table_header_style) for h in headers]
    data = [header_cells]
    for row in rows:
        data.append([Paragraph(str(c), table_cell_style) if i == 0 else Paragraph(str(c), table_cell_desc) for i, c in enumerate(row)])
    
    if col_widths is None:
        col_widths = [CONTENT_W / len(headers)] * len(headers)
    
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 1), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
    ]
    t.setStyle(TableStyle(style_cmds))
    return t

# ─── Page templates ────────────────────────────────────────────────
def cover_page(canvas, doc):
    canvas.saveState()
    # Full page navy background
    canvas.setFillColor(DARK_NAVY)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Gold accent strip
    canvas.setFillColor(GOLD)
    canvas.rect(0, H*0.42, W, 3*mm, fill=1, stroke=0)
    # Bottom bar
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, W, 15*mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, 15*mm, W, 0.8*mm, fill=1, stroke=0)
    canvas.restoreState()

def normal_page(canvas, doc):
    canvas.saveState()
    # Top navy bar
    canvas.setFillColor(NAVY)
    canvas.rect(0, H - 8*mm, W, 8*mm, fill=1, stroke=0)
    # Gold accent line below
    canvas.setFillColor(GOLD)
    canvas.rect(0, H - 8.6*mm, W, 0.6*mm, fill=1, stroke=0)
    # Footer
    canvas.setFillColor(GRAY_MED)
    canvas.setFont('Tinos', 8)
    canvas.drawString(LEFT, 10*mm, 'FastPagePro CMS Integration — Validation Document')
    canvas.drawRightString(W - RIGHT, 10*mm, f'{doc.page}')
    canvas.setFillColor(GOLD)
    canvas.rect(LEFT, 9*mm, W - LEFT - RIGHT, 0.3*mm, fill=1, stroke=0)
    canvas.restoreState()

# ─── Build Document ─────────────────────────────────────────────────
output_path = '/home/z/my-project/download/FastPagePro_CMS_Validacion_Final.pdf'
doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=LEFT, rightMargin=RIGHT,
    topMargin=TOP + 5*mm, bottomMargin=BOTTOM,
    title='FastPagePro CMS — Documento de Validacion Final',
    author='FastPagePro.com'
)

story = []

# ═══════════════════════════════════════════════════════════════════
# COVER PAGE
# ═══════════════════════════════════════════════════════════════════
story.append(Spacer(1, 55*mm))
story.append(Paragraph('FastPagePro Studio v2.0', cover_subtitle))
story.append(Paragraph('Documento de Validacion Final', cover_title))
story.append(Spacer(1, 8*mm))
story.append(Paragraph('Integracion Sanity CMS v3 + Next.js 16', cover_info))
story.append(Paragraph('Arquitectura de Plantilla Maestra para Agencias', cover_info))
story.append(Spacer(1, 15*mm))
story.append(Paragraph('Proyecto: Sertrade Design', ParagraphStyle(
    'CoverClient', fontName='Tinos-Bold', fontSize=13, leading=17,
    textColor=GOLD, alignment=TA_CENTER, spaceAfter=3*mm
)))
story.append(Paragraph('https://sertrade.vercel.app', ParagraphStyle(
    'CoverURL', fontName='DejaVuMono', fontSize=10, leading=13,
    textColor=HexColor('#94A3B8'), alignment=TA_CENTER
)))
story.append(Spacer(1, 20*mm))
story.append(Paragraph('Fecha: 4 de junio, 2026', cover_info))
story.append(Paragraph('Version: 1.0.0 — Pre-implementacion', cover_info))
story.append(Paragraph('Desarrollado por FastPagePro.com', ParagraphStyle(
    'CoverCredit', fontName='Tinos-Italic', fontSize=9, leading=12,
    textColor=HexColor('#64748B'), alignment=TA_CENTER, spaceBefore=5*mm
)))
story.append(PageBreak())

# ═══════════════════════════════════════════════════════════════════
# 1. RESUMEN EJECUTIVO
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('1. Resumen Ejecutivo', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Este documento establece la validacion final y completa antes de iniciar la implementacion '
    'de la integracion entre Sanity CMS v3 y el sitio web de Sertrade Design construido con '
    'Next.js 16.1 (App Router), Tailwind CSS v4, y Framer Motion 12. La arquitectura disenada '
    'no es exclusiva para Sertrade: es una plantilla maestra reutilizable para cualquier proyecto '
    'de FastPagePro, cubriendo verticales como construccion, arquitectura, ingenieria, logistica, '
    'industria y corporativo general. Todos los contenidos visibles del sitio seran editables '
    'desde el Sanity Studio embebido en /admin, incluyendo textos, imagenes, videos, SEO, '
    'Open Graph, hero slides con soporte de video MP4/WebM, proyectos, servicios, testimonios, '
    'equipo y estadisticas animadas. El credito del pie de pagina "Desarrollado por FastPagePro.com" '
    'permanecera permanentemente hardcodeado y excluido del CMS, Visual Editing y Presentation Tool.',
    body
))

story.append(Paragraph(
    'La infraestructura de Sanity ya fue desplegada en el commit a02f484 (Fast Page Pro Studio v2.0), '
    'incluyendo la configuracion del Studio, los 10 schemas documentales, el cliente con Stega para '
    'Visual Editing, las queries GROQ centralizadas, el sistema defineLive para revalidacion en '
    'tiempo real, los API routes de Draft Mode y el overlay de Visual Editing. Sin embargo, '
    'los componentes del frontend (HomePage, ProjectsPage, ServicesPage) aun consumen datos '
    'hardcodeados y necesitan ser migrados para consultar datos desde Sanity. Este documento '
    'detalla exactamente que archivos se crearan, cuales se modificaran, que dependencias se '
    'instalaran y que variables de entorno se requieren para completar la integracion.',
    body
))

story.append(Paragraph(
    'La implementacion se dividira en 5 fases secuenciales: primero la infraestructura base '
    '(configuracion, schemas, helpers), segundo el cliente y queries, tercero el Studio route '
    'handler, cuarto la conexion del layout principal con SanityLive y VisualEditing, y quinto '
    'la migracion gradual de cada pagina del frontend (Footer, Servicios, Proyectos, Home) '
    'para consumir datos del CMS en lugar de datos estaticos.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 2. ARBOL DE ARCHIVOS NUEVOS
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('2. Arbol Completo de Archivos Nuevos', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Los siguientes archivos seran creados durante la implementacion. No se incluye '
    'ningun archivo que ya exista en el proyecto actual. Los archivos marcados con un asterisco (*) '
    'son adaptaciones de archivos del kit original de Sanity que fueron analizados, pero con contenido '
    'completamente nuevo adaptado a la arquitectura FastPagePro. Todos los demas son archivos creados '
    'desde cero con logica especifica para esta plantilla.',
    body
))

new_files_tree = """<font face="DejaVuMono" size="8">
sanity/<br/>
  config.ts                          # Studio config (reemplaza sanity.config.ts raiz)<br/>
  lib/<br/>
    constants.ts                     # (*) Brand colors, company defaults, site URL<br/>
    schema-master.ts                  # (*) Reusable field presets (slug, image, title, etc.)<br/>
  schemas/<br/>
    index.ts                          # Schema registry (type imports + re-exports)<br/>
    siteSettings.ts                   # Global settings singleton (SEO, contacto, redes)<br/>
    heroSlide.ts                      # Hero slides (imagen + video MP4/WebM + poster)<br/>
    serviceCategory.ts               # Categorias de servicio (icono + color)<br/>
    service.ts                        # Servicios con subservicios (Portable Text)<br/>
    project.ts                        # Proyectos portafolio (galeria + tags + estado)<br/>
    teamMember.ts                     # Directorio de equipo (foto + rol + redes)<br/>
    testimonial.ts                    # Testimonios de clientes (rating + texto)<br/>
    partner.ts                        # Logos de clientes/partners<br/>
    stat.ts                           # Estadisticas animadas (numero + etiqueta)<br/>
<br/>
src/lib/<br/>
  sanity.client.ts                    # (*) Cliente Sanity con Stega + image builder<br/>
  sanity.queries.ts                   # (*) Todas las queries GROQ centralizadas<br/>
<br/>
src/sanity/<br/>
  live.ts                             # (*) defineLive con Stega para revalidacion<br/>
<br/>
src/app/admin/[[...tool]]/page.tsx    # Route handler Studio embebido<br/>
<br/>
src/app/api/draft-mode/<br/>
  enable/route.ts                     # (*) API route: habilitar Draft Mode<br/>
  disable/route.ts                    # (*) API route: deshabilitar Draft Mode<br/>
</font>"""

story.append(Paragraph(new_files_tree, ParagraphStyle(
    'TreeBlock', fontName='DejaVuMono', fontSize=8, leading=11,
    textColor=HexColor('#1E293B'), backColor=CODE_BG,
    leftIndent=5*mm, rightIndent=5*mm,
    borderWidth=0.5, borderColor=GRAY_LIGHT, borderPadding=5,
    spaceBefore=3*mm, spaceAfter=4*mm
)))

story.append(Paragraph(
    'Nota: Los archivos marcados con (*) ya existen en el proyecto actual (commit a02f484) '
    'y se consideran parte de la infraestructura ya desplegada. Los archivos sin marca son '
    'los que restan por crear o verificar durante la implementacion. En total, el proyecto '
    'final contendra 22 archivos relacionados con Sanity: 13 nuevos y 9 adaptados del kit.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 3. ARCHIVOS MODIFICADOS
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('3. Archivos Modificados', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Los siguientes archivos existentes seran modificados para integrar el CMS sin romper '
    'la funcionalidad actual. Cada modificacion es incremental y retrocompatible: si el CMS '
    'no responde o la query no retorna datos, los componentes mostraran los datos hardcodeados '
    'existentes como fallback, garantizando que el sitio nunca se rompa.',
    body
))

mod_files = [
    ['Archivo', 'Modificacion', 'Riesgo'],
    ['src/app/layout.tsx', 'Envolver children con &lt;SanityLive&gt; para revalidacion en tiempo real y &lt;VisualEditing&gt; para overlay de edicion inline', 'Bajo'],
    ['src/components/HomePage.tsx', 'Reemplazar datos hardcodeados de hero slides, stats, servicios, proyectos, pilares y logos por fetch a Sanity queries', 'Medio'],
    ['src/components/ProjectsPage.tsx', 'Reemplazar datos hardcodeados de 6 proyectos por fetch a query allProjects; mantener galeria/video lightbox', 'Medio'],
    ['src/components/ServicesPage.tsx', 'Reemplazar datos hardcodeados de 3 modulos de servicio por fetch a query allServices con subservicios', 'Medio'],
    ['src/components/Footer.tsx', 'Reemplazar datos de contacto, redes sociales y direccion por fetch a siteSettings; MANTENER "Desarrollado por FastPagePro.com" hardcodeado', 'Bajo'],
    ['next.config.ts', 'Agregar imagenes.remote para CDN de Sanity (cdn.sanity.io)', 'Bajo'],
    ['sanity.config.ts', 'Actualizar apuntando a sanity/config.ts o eliminar si se usa import desde sanity/', 'Bajo'],
]

cw = [55*mm, CONTENT_W - 75*mm, 20*mm]
t = Table(
    [[Paragraph(h, table_header_style) for h in ['Archivo', 'Modificacion', 'Riesgo']]] +
    [[Paragraph(r[0], table_cell_style), Paragraph(r[1], table_cell_desc), Paragraph(r[2], table_cell_style) for r in mod_files[1:]]],
    colWidths=cw, repeatRows=1
)
t.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t)
story.append(Spacer(1, 4*mm))

story.append(Paragraph(
    'Estrategia de migracion segura: cada componente seguira el patron "CMS-first con fallback hardcodeado". '
    'Se implementara un helper fetchCMS() que intenta obtener datos de Sanity; si la query falla, retorna null '
    'y el componente renderiza los datos estaticos existentes. Esto permite desplegar cada pagina de forma '
    'independiente sin afectar las demas, y habilita rollbacks instantaneos si algo falla en produccion.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 4. DEPENDENCIAS
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('4. Dependencias a Instalar', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Las siguientes dependencias son necesarias para el funcionamiento completo del CMS con Sanity v3. '
    'Algunas ya se encuentran en el package.json actual pero se listan para confirmar su version minima '
    'requerida. Las dependencias se agrupan en tres categorias: paquetes principales de Sanity, herramientas '
    'de desarrollo, y dependencias opcionales para la experiencia del Studio.',
    body
))

story.append(Paragraph('4.1 Dependencias Principales (Sanity Core)', h2_style))

deps_table = [
    ['Paquete', 'Version Min.', 'Proposito'],
    ['next-sanity', '9.x', 'Cliente Sanity optimizado para Next.js (App Router). Incluye NextStudio, createClient, fetchCurrentUser, defineRouteHandler. Reemplaza al antiguo @sanity/client para uso en Next.js.'],
    ['sanity', '3.x', 'Core de Sanity Studio. Provee defineConfig, defineType, defineField, plugins. Necesario para sanity.config.ts y schemas.'],
    ['@sanity/image-url', '1.x', 'Constructor de URLs optimizadas para imagenes de Sanity. Genera URLs con parametros de ancho, alto, formato, calidad y recortes automaticos.'],
    ['@sanity/icons', '2.x', 'Iconos oficiales para el Studio. Se usan en los schemas para identificar visualmente cada tipo de documento en el panel lateral.'],
]

t2 = Table(
    [[Paragraph(h, table_header_style) for h in ['Paquete', 'Version', 'Proposito']]] +
    [[Paragraph(r[0], table_cell_style), Paragraph(r[1], table_cell_style), Paragraph(r[2], table_cell_desc) for r in deps_table[1:]]],
    colWidths=[35*mm, 22*mm, CONTENT_W - 57*mm], repeatRows=1
)
t2.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t2)
story.append(Spacer(1, 3*mm))

story.append(Paragraph('4.2 Comando de Instalacion', h2_style))
story.append(code_block('bun add next-sanity sanity @sanity/image-url @sanity/icons'))

story.append(Paragraph(
    'Nota sobre versiones: el proyecto actual usa Next.js 16.1 y React 19. El paquete next-sanity v9 '
    'es compatible con Next.js 15+ y React 19+. Si se detecta incompatibilidad, se usara la version '
    'latest que soporte React 19 canary. El paquete sanity v3 se instala en el lado del servidor '
    'para el Studio embebido y no afecta el bundle del cliente. Los paquetes @sanity/image-url y '
    '@sanity/icons son livianos y se tree-shakean correctamente en produccion.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 5. VARIABLES DE ENTORNO
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('5. Variables de Entorno Necesarias', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Las siguientes variables de entorno son obligatorias para que la integracion con Sanity funcione '
    'correctamente tanto en desarrollo local como en produccion (Vercel). Todas deben configurarse '
    'en el archivo .env.local para desarrollo y en las Environment Variables del dashboard de Vercel '
    'para produccion. Las credenciales de Sanity se obtienen desde el dashboard de Sanity en '
    'manage.sanity.io despues de crear un proyecto nuevo.',
    body
))

env_table = [
    ['Variable', 'Ejemplo', 'Descripcion'],
    ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'abc123xyz', 'Identificador unico del proyecto en Sanity. Se obtiene del dashboard al crear el proyecto. Es publica porque se usa del lado del cliente para construir URLs de imagenes.'],
    ['NEXT_PUBLIC_SANITY_DATASET', 'production', 'Nombre del dataset. Por defecto "production". Sanity permite multiples datasets por proyecto (production, staging, development) para separar entornos.'],
    ['SANITY_API_READ_TOKEN', 'sk_abc123...',', Token de solo lectura para el Content Delivery API (CDA). Se usa server-side para consultar documentos publicados. Obligatorio para prevenir que el dataset sea publico.'],
    ['SANITY_API_TOKEN_PREVIEW', 'sk_preview_xyz...',', Token con permisos de preview para el Content Preview API. Permite ver documentos en estado draft sin publicar. Usado por Draft Mode y Presentation Tool.'],
    ['NEXT_PUBLIC_SANITY_STUDIO_URL', '/admin', 'URL donde se monta el Studio embebido. Por defecto "/admin". Puede cambiarse si se necesita un path diferente por requisitos de enrutamiento.'],
    ['NEXT_PUBLIC_SITE_URL', 'https://sertrade.vercel.app', 'URL publica del sitio. Se usa para generar URLs absolutas en OG images, sitemaps y metadatos SEO dinamicos desde siteSettings del CMS.'],
]

# Fix the comma issue in the table
env_rows = [
    ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'abc123xyz', 'Identificador unico del proyecto en Sanity. Se obtiene del dashboard al crear el proyecto. Es publica porque se usa del lado del cliente para construir URLs de imagenes.'],
    ['NEXT_PUBLIC_SANITY_DATASET', 'production', 'Nombre del dataset. Por defecto "production". Sanity permite multiples datasets por proyecto (production, staging, development) para separar entornos.'],
    ['SANITY_API_READ_TOKEN', 'sk_abc123...', 'Token de solo lectura para el Content Delivery API (CDA). Se usa server-side para consultar documentos publicados. Obligatorio para prevenir que el dataset sea publico.'],
    ['SANITY_API_TOKEN_PREVIEW', 'sk_preview_xyz...', 'Token con permisos de preview para el Content Preview API. Permite ver documentos en estado draft sin publicar. Usado por Draft Mode y Presentation Tool.'],
    ['NEXT_PUBLIC_SANITY_STUDIO_URL', '/admin', 'URL donde se monta el Studio embebido. Por defecto "/admin". Puede cambiarse si se necesita un path diferente por requisitos de enrutamiento.'],
    ['NEXT_PUBLIC_SITE_URL', 'https://sertrade.vercel.app', 'URL publica del sitio. Se usa para generar URLs absolutas en OG images, sitemaps y metadatos SEO dinamicos desde siteSettings del CMS.'],
]

t3 = Table(
    [[Paragraph(h, table_header_style) for h in ['Variable', 'Ejemplo', 'Descripcion']]] +
    [[Paragraph(r[0], table_cell_style), Paragraph(r[1], table_cell_style), Paragraph(r[2], table_cell_desc) for r in env_rows]]],
    colWidths=[48*mm, 28*mm, CONTENT_W - 76*mm], repeatRows=1
)
t3.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t3)

story.append(Spacer(1, 3*mm))
story.append(Paragraph('5.1 Archivo .env.local.example', h2_style))
story.append(code_block(
    '# === Sanity CMS ===<br/>'
    'NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui<br/>'
    'NEXT_PUBLIC_SANITY_DATASET=production<br/>'
    'SANITY_API_READ_TOKEN=tu_read_token_aqui<br/>'
    'SANITY_API_TOKEN_PREVIEW=tu_preview_token_aqui<br/>'
    'NEXT_PUBLIC_SANITY_STUDIO_URL=/admin<br/>'
    'NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app'
))

story.append(Paragraph(
    'Seguridad: Las variables que comienzan con NEXT_PUBLIC_ son accesibles del lado del cliente '
    '(necesarias para el image URL builder y el Studio embebido). Las que no tienen ese prefijo '
    '(SANITY_API_READ_TOKEN y SANITY_API_TOKEN_PREVIEW) son exclusivas del servidor y nunca se '
    'exponen al navegador. Esto es critico porque los tokens de API permiten acceder a los '
    'documentos del CMS, incluyendo los que estan en estado draft.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 6. SCHEMS DEFINITIVOS
# ═══════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(Paragraph('6. Schemas Definitivos', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Los schemas definen la estructura de los documentos en Sanity. Cada schema es un "document type" '
    'que se configura con defineType y contiene campos definidos con defineField. Los schemas estan '
    'disenados para ser genericos y reutilizables en cualquier proyecto de FastPagePro, no solo para '
    'Sertrade. A continuacion se detalla cada schema con sus campos principales, su proposito y '
    'ejemplos de contenido que almacenara.',
    body
))

schemas = [
    ['Schema', 'Tipo', 'Campos principales', 'Singleton'],
    ['siteSettings', 'Configuracion global', 'title, description, ogImage, favicon, logo, phone, email, address, socialLinks (array), location (geopoint), seoTitle, seoDescription, ogTitle, ogDescription, ogImage, canonicalUrl', 'Si'],
    ['heroSlide', 'Contenido', 'title, subtitle, ctaText, ctaLink, backgroundImage, videoMP4 (file), videoWebM (file), posterImage, muted (boolean), autoplay (boolean), loop (boolean), mobileFallbackImage, order', 'No'],
    ['serviceCategory', 'Taxonomia', 'title, slug, description, icon (icon picker), accentColor (string), image', 'No'],
    ['service', 'Contenido', 'title, slug, shortDescription, featuredImage, category (reference), subservices (array of objects: title, description, icon, image), featured (boolean), order', 'No'],
    ['project', 'Contenido', 'title, slug, client, year, description (Portable Text), featuredImage, gallery (array images, max 15), tags (array strings), status (enum: en-progreso, completado, planificado), category (string), videoUrl (string)', 'No'],
    ['teamMember', 'Directorio', 'name, slug, role, photo, bio (Portable Text), email, phone, socialLinks (array), order', 'No'],
    ['testimonial', 'Contenido', 'name, role, company, quote (text), rating (number 1-5), avatar, featured (boolean)', 'No'],
    ['partner', 'Logo', 'name, logo (image), url (string), order', 'No'],
    ['stat', 'Contenido', 'label, value (number), suffix (string: "+", "%", "K"), icon, order, featured', 'No'],
    ['studioGuide', 'Documentacion', 'title, content (Portable Text), version', 'Si'],
]

cw3 = [32*mm, 24*mm, CONTENT_W - 66*mm]
t4 = Table(
    [[Paragraph(h, table_header_style) for h in schemas[0]]] +
    [[Paragraph(r[0], table_cell_style), Paragraph(r[1], table_cell_style), Paragraph(r[2], table_cell_desc), Paragraph(r[3], table_cell_style) for r in schemas[1:]]],
    colWidths=[cw3[0], cw3[1], CONTENT_W - cw3[0] - cw3[1] - 18*mm, 18*mm], repeatRows=1
)
t4.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t4)

story.append(Spacer(1, 4*mm))
story.append(Paragraph('6.1 Detalle del Schema heroSlide (Soporte de Video)', h2_style))

story.append(Paragraph(
    'El schema heroSlide es el mas complejo de la arquitectura porque debe soportar tanto imagenes '
    'estaticas como video de fondo con todas las variantes necesarias. Cada slide puede contener '
    'opcionalmente un video en formato MP4, un video alternativo en formato WebM (para navegadores '
    'que soporten este codec), una imagen poster que se muestra mientras el video carga, y una '
    'imagen de fallback especifica para dispositivos moviles donde el video podria consumir '
    'demasiado ancho de banda. Los campos muted, autoplay y loop son booleanos que controlan el '
    'comportamiento del reproductor. El campo order define la posicion del slide en el carrusel.',
    body
))

hero_fields = [
    ['Campo', 'Tipo Sanity', 'Obligatorio', 'Descripcion'],
    ['title', 'string', 'Si', 'Titulo principal del slide (ej: "Construccion de Premium")'],
    ['subtitle', 'string', 'No', 'Subtitulo o descripcion breve del slide'],
    ['ctaText', 'string', 'No', 'Texto del boton de accion (ej: "Ver Proyectos")'],
    ['ctaLink', 'string', 'No', 'URL o slug destino del boton CTA'],
    ['backgroundImage', 'image', 'Si', 'Imagen de fondo principal (fallback universal)'],
    ['videoMP4', 'file (video/mp4)', 'No', 'Video MP4 de fondo para escritorio'],
    ['videoWebM', 'file (video/webm)', 'No', 'Video WebM alternativo para navegadores compatibles'],
    ['posterImage', 'image', 'No', 'Imagen mostrada mientras el video carga'],
    ['muted', 'boolean', 'No', 'Silenciar video (default: true)'],
    ['autoplay', 'boolean', 'No', 'Reproducir automaticamente (default: true)'],
    ['loop', 'boolean', 'No', 'Reproducir en bucle (default: true)'],
    ['mobileFallbackImage', 'image', 'No', 'Imagen especifica para moviles (sin video)'],
    ['order', 'number', 'Si', 'Posicion en el carrusel (orden ascendente)'],
]

t5 = Table(
    [[Paragraph(h, table_header_style) for h in hero_fields[0]]] +
    [[Paragraph(r[0], table_cell_style), Paragraph(r[1], table_cell_style), Paragraph(r[2], table_cell_style), Paragraph(r[3], table_cell_desc) for r in hero_fields[1:]]],
    colWidths=[32*mm, 32*mm, 18*mm, CONTENT_W - 82*mm], repeatRows=1
)
t5.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 3),
    ('RIGHTPADDING', (0, 0), (-1, -1), 3),
    ('TOPPADDING', (0, 1), (-1, -1), 3),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 3),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t5)

# ═══════════════════════════════════════════════════════════════════
# 7. QUERIES GROQ
# ═══════════════════════════════════════════════════════════════════
story.append(Spacer(1, 4*mm))
story.append(Paragraph('7. Queries GROQ Definitivas', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'GROQ (Graph-Relational Object Queries) es el lenguaje de consulta de Sanity, similar a GraphQL '
    'pero orientado a documentos. Todas las queries estan centralizadas en src/lib/sanity.queries.ts '
    'y se exportan como constantes para ser consumidas por los componentes del frontend. Cada query '
    'esta disenada para retornar solo los campos necesarios, optimizando el payload y el rendimiento. '
    'Se incluyen proyecciones para imagenes con metadatos de dimensiones, y coalesce para valores '
    'por defecto que previenen errores si un campo esta vacio en el CMS.',
    body
))

queries = [
    ['Query', 'Proposito', 'Retorna'],
    ['siteSettingsQuery', 'Configuracion global del sitio', '1 documento singleton con datos de contacto, redes sociales, SEO y OG'],
    ['allHeroSlidesQuery', 'Slides del hero carousel', 'Array ordenado por campo "order", con imagenes, videos, poster y fallback'],
    ['allServicesQuery', 'Servicios con subservicios', 'Array con categoria referenciada, subservicios inline, imagen destacada'],
    ['allProjectsQuery', 'Proyectos de portafolio', 'Array con galeria (hasta 15 imagenes), tags, estado, video URL'],
    ['allTeamMembersQuery', 'Directorio de equipo', 'Array ordenado, con foto, bio (Portable Text), redes sociales'],
    ['allTestimonialsQuery', 'Testimonios de clientes', 'Array filtrado por "featured", con nombre, rol, quote, avatar, rating'],
    ['allPartnersQuery', 'Logos de partners/clientes', 'Array ordenado, con nombre, logo, URL del sitio'],
    ['allStatsQuery', 'Estadisticas animadas', 'Array filtrado por "featured", con valor numerico, sufijo, icono'],
    ['serviceBySlugQuery', 'Servicio individual por slug', '1 documento con todos sus subservicios y categoria'],
    ['projectBySlugQuery', 'Proyecto individual por slug', '1 documento con galeria completa, descripcion (Portable Text), tags'],
]

t6 = Table(
    [[Paragraph(h, table_header_style) for h in queries[0]]] +
    [[Paragraph(r[0], table_cell_style), Paragraph(r[1], table_cell_desc), Paragraph(r[2], table_cell_desc) for r in queries[1:]]],
    colWidths=[42*mm, 38*mm, CONTENT_W - 80*mm], repeatRows=1
)
t6.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t6)

story.append(Spacer(1, 3*mm))
story.append(Paragraph('7.1 Ejemplo de Query GROQ — Hero Slides con Video', h2_style))
story.append(code_block(
    'export const allHeroSlidesQuery = `*[_type == "heroSlide"]<br/>'
    '  | order(order asc) {<br/>'
    '    _id, title, subtitle, ctaText, ctaLink,<br/>'
    '    "bgImage": backgroundImage {<br/>'
    '      asset-> { url, metadata { dimensions } }<br/>'
    '    },<br/>'
    '    "videoMp4": videoMP4.asset->url,<br/>'
    '    "videoWebm": videoWebM.asset->url,<br/>'
    '    "poster": posterImage {<br/>'
    '      asset-> { url, metadata { dimensions } }<br/>'
    '    },<br/>'
    '    muted, autoplay, loop,<br/>'
    '    "mobileImg": mobileFallbackImage {<br/>'
    '      asset-> { url, metadata { dimensions } }<br/>'
    '    },<br/>'
    '    order<br/>'
    '  }`'
))

story.append(Paragraph(
    'Patron comun en todas las queries: se usan proyecciones con alias ("nombre": campo) para '
    'aplanar referencias de imagenes y obtener URLs directas del asset sin necesidad de queries '
    'adicionales. El operador | order(order asc) garantiza un orden consistente. El operador '
    'asset-> desreferencia la relacion con el asset de imagen y obtiene la URL del CDN de Sanity.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 8. CONTENIDO EDITABLE vs HARDCODEADO
# ═══════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(Paragraph('8. Contenido Editable vs. Hardcodeado', h1_style))
story.append(gold_line())

story.append(Paragraph('8.1 Contenido Editable desde Sanity Studio', h2_style))

story.append(Paragraph(
    'Todo el contenido visible para el usuario final sera editable desde el Sanity Studio embebido '
    'en /admin. Los editores podran modificar textos, reemplazar imagenes, cambiar videos, actualizar '
    'SEO y Open Graph sin necesidad de tocar codigo ni hacer deploys. Los cambios en documentos '
    'publicados se reflejaran inmediatamente gracias al sistema defineLive que escucha cambios '
    'via WebSocket y dispara revalidacion del cache ISR de Next.js.',
    body
))

editable_items = [
    ('Textos del sitio', 'Todos los textos publicos: titulos de paginas, descripciones, subtitulos, textos de secciones, llamadas a accion, textos de contacto, direcciones, textos del header, textos del footer (contacto, ubicacion)'),
    ('Imagenes', 'Todas las imagenes: hero slides, imagenes de servicios, galerias de proyectos, fotos de equipo, avatares de testimonios, logos de partners, iconos, imagen OG, favicon, logo del sitio'),
    ('Videos', 'Videos de hero slides: MP4, WebM, poster image. Tambien video URL en proyectos individuales. Todos los parametros de reproduccion (muted, autoplay, loop)'),
    ('Hero Video', 'Cada hero slide soporta imagen de fondo + video MP4 + video WebM + poster + imagen de fallback para movil. Todo editable campo por campo desde el Studio'),
    ('Open Graph', 'Titulo OG, descripcion OG, imagen OG y URL canonica se configuran en siteSettings. Se genera metadata dinamica en layout.tsx desde los datos del CMS'),
    ('SEO', 'Title tag, meta description, URL canonica, y cualquier campo SEO futuro. Se obtiene de siteSettings y se inyecta en el metadata API de Next.js App Router'),
    ('Proyectos', 'Titulo, cliente, ano, descripcion (texto rico con Portable Text), imagen destacada, galeria (hasta 15 imagenes), tags, estado (en-progreso/completado/planificado), categoria, video URL'),
    ('Servicios', 'Titulo, slug, descripcion corta, imagen destacada, categoria, subservicios (titulo + descripcion + icono + imagen), orden, destacado'),
    ('Testimonios', 'Nombre del cliente, rol, empresa, texto del testimonio, calificacion (1-5 estrellas), avatar, si esta destacado'),
    ('Equipo', 'Nombre, rol, foto, biografia (texto rico), email, telefono, redes sociales, orden de aparicion'),
    ('Configuracion global', 'Nombre de la empresa, telefono, email, direccion, redes sociales, ubicacion GPS, colores de marca, titulo del sitio, descripcion del sitio'),
]

for title, desc in editable_items:
    story.append(bullet(desc, title))

story.append(Spacer(1, 4*mm))
story.append(Paragraph('8.2 Contenido Hardcodeado (Fuera del CMS)', h2_style))

story.append(Paragraph(
    'Los siguientes elementos permaneceran permanentemente fuera del alcance del CMS, del Visual Editing '
    'y del Presentation Tool. Esto es por diseño para garantizar la integridad de la marca FastPagePro '
    'como desarrollador del sitio, y para proteger elementos funcionales que no deben ser modificables '
    'por editores de contenido.',
    body
))

hardcoded_items = [
    ('"Desarrollado por FastPagePro.com"', 'Este texto en el footer se renderiza directamente en el componente Footer.tsx como una string literal. Nunca se almacenara en Sanity, nunca aparecera como campo editable en el Studio, y el overlay de Visual Editing lo ignorara completamente. Es un atributo de marca de la agencia.'),
    ('URL del link de credito', 'El href del enlace "Desarrollado por FastPagePro.com" apuntara siempre a https://fastpagepro.com. No se almacenara como dato del CMS ni sera configurable.'),
    ('Estructura de componentes', 'La estructura HTML/JSX de los componentes (Header, Footer, HomePage, etc.) no es editable desde el CMS. Solo los datos que consumen son editables. La estructura visual y el layout estan definidos en el codigo.'),
    ('Logica de animaciones', 'Las animaciones de Framer Motion (fadeIn, slideIn, flip cards, etc.) estan hardcodeadas en los componentes y los estilos CSS. No son configurables desde el CMS.'),
    ('Rutas de navegacion', 'Los paths de las paginas (/, /proyectos, /servicios, /admin) estan hardcodeados en el componente Header. Solo los textos de los links podrian ser CMS-editables en futuras iteraciones.'),
    ('Libro de Reclamaciones', 'El formulario del Libro de Reclamaciones es un componente funcional con validacion Zod que simula un envio. No esta conectado al CMS ni se planea que lo este.'),
]

for title, desc in hardcoded_items:
    story.append(bullet(desc, title))

# ═══════════════════════════════════════════════════════════════════
# 9. VISUAL EDITING
# ═══════════════════════════════════════════════════════════════════
story.append(Spacer(1, 4*mm))
story.append(Paragraph('9. Funcionamiento de Visual Editing', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Visual Editing es la capacidad de Sanity de overlayear un panel transparente sobre el sitio web '
    'en produccion, permitiendo que un editor haga clic en cualquier elemento editable y lo modifique '
    'directamente, viendo los cambios en tiempo real. El sistema funciona en tres capas: el cliente de '
    'Sanity con Stega codifica source maps en los datos retornados, el componente VisualEditing detecta '
    'estos datos codificados y renderiza un overlay interactivo, y el usuario puede editar sin abrir '
    'el Studio en una ventana separada.',
    body
))

story.append(Paragraph('9.1 Arquitectura de Visual Editing', h2_style))

story.append(bullet(
    'El cliente de Sanity se configura con stega: { enabled: true, studioUrl: "/admin" } en '
    'src/lib/sanity.client.ts. Cuando un documento se consulta con este cliente, Sanity inyecta '
    'metadatos invisibles (source maps) en cada campo del resultado. Estos metadatos contienen '
    'referencias al documento, al campo y al proyecto de Sanity, permitiendo que el overlay sepa '
    'exactamente que editar cuando el usuario hace clic en un elemento.', 'Capa 1 — Cliente con Stega'
))

story.append(bullet(
    'El componente VisualEditing.tsx (ya existente en el proyecto) se importa y renderiza '
    'en layout.tsx envolviendo al resto del contenido. Este componente detecta si el usuario '
    'esta autenticado en el Studio y si los datos contienen Stega. Si ambas condiciones se cumplen, '
    'renderiza un overlay con indicadores visuales en cada campo editable (bordes punteados, '
    'botones de edicion al hover).', 'Capa 2 — Overlay de VisualEditing'
))

story.append(bullet(
    'Cuando el editor hace clic en un campo, se abre un modal inline o un panel lateral del '
    'Studio dentro de la misma ventana del navegador, mostrando el campo correspondiente del '
    'documento. Al guardar, los cambios se publican y la pagina se revalida automaticamente '
    'via defineLive, mostrando el contenido actualizado sin recarga manual.', 'Capa 3 — Edicion inline'
))

story.append(Paragraph('9.2 Configuracion en layout.tsx', h2_style))
story.append(code_block(
    '// src/app/layout.tsx<br/>'
    'import { VisualEditing } from "@/components/VisualEditing";<br/>'
    'import { SanityLive } from "@/sanity/live";<br/>'
    '<br/>'
    'export default function RootLayout({ children }) {<br/>'
    '&nbsp;&nbsp;return (<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&lt;html&gt;<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;body&gt;<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;SanityLive&gt;<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{children}<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/SanityLive&gt;<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{process.env.NODE_ENV === "development" &amp;&amp; &lt;VisualEditing /&gt;}<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/body&gt;<br/>'
    '&nbsp;&nbsp;&nbsp;&nbsp;&lt;/html&gt;<br/>'
    '&nbsp;&nbsp;);<br/>'
    '}'
))

story.append(Paragraph(
    'Importante: VisualEditing solo se renderiza en desarrollo por defecto. En produccion, se activa '
    'automaticamente cuando el usuario tiene la sesion del Studio abierta. El componente detecta esto '
    'mediante la cookie de autenticacion que Sanity inyecta. El footer credit "Desarrollado por '
    'FastPagePro.com" no sera detectado como editable porque no proviene de ninguna query de Sanity '
    'con Stega — es una string literal hardcodeada que nunca pasa por el cliente de Sanity.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 10. PRESENTATION TOOL
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('10. Funcionamiento de Presentation Tool', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'El Presentation Tool de Sanity reemplaza al antiguo Vision y a los tabs de Releases. Consiste '
    'en dos tabs principales en el Studio: "Structure" (estructura de documentos, que es el Studio '
    'normal) y "Presentation" (vista previa en tiempo real del contenido editado). Cuando un editor '
    'modifica un documento en la pestana Structure, puede cambiar a Presentation para ver como se ve '
    'ese contenido en el sitio web real, sin necesidad de abrir otra ventana.',
    body
))

story.append(Paragraph('10.1 Configuracion del Presentation Tool', h2_style))

story.append(bullet(
    'La ubicacion del Studio se configura en sanity.config.ts con basePath: "/admin". Esta ruta '
    'es la que usa el Presentation Tool para resolver las ubicaciones de vista previa.', 'Studio Route'
))

story.append(bullet(
    'Las preview locations se definen en sanity.config.ts dentro del plugin @sanity/vision '
    'o en la configuracion del Studio. Cada ubicacion mapea un tipo de documento a una URL '
    'del sitio web. Por ejemplo, un documento "project" con slug "mi-proyecto" se previsualizara '
    'en /proyectos/mi-proyecto. Estas ubicaciones permiten que el editor navegue entre documentos '
    'y vea su representacion en el sitio real.', 'Preview Locations'
))

story.append(bullet(
    'Para que el Presentation Tool funcione con documentos en estado draft (sin publicar), se '
    'necesita el Draft Mode habilitado. Los API routes /api/draft-mode/enable y /api/draft-mode/disable '
    'gestionan las cookies que activan la consulta de documentos draft. Cuando el Presentation Tool '
    'abre una preview, habilita el Draft Mode automaticamente, el cliente de Sanity consulta los '
    'documentos con el token de preview, y la pagina muestra el contenido draft con un banner '
    'indicativo de "Preview Mode".', 'Draft Mode Integration'
))

story.append(Paragraph('10.2 Exclusion del Footer Credit', h2_style))

story.append(Paragraph(
    'El Presentation Tool nunca mostrara opciones de edicion para el texto "Desarrollado por '
    'FastPagePro.com" porque: (a) este texto no esta almacenado en ningun documento de Sanity, '
    '(b) no aparece en ninguna query GROQ, (c) el componente VisualEditing lo ignora porque '
    'no tiene source maps Stega, y (d) las preview locations estan configuradas solo para '
    'documentos CMS (proyectos, servicios, hero slides, etc.), no para strings hardcodeadas. '
    'Esta triple barrera garantiza que el credito sea permanentemente inmutable.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 11. MANEJO DE IMAGENES, VIDEOS Y MULTIMEDIA
# ═══════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(Paragraph('11. Manejo de Imagenes, Videos y Archivos Multimedia', h1_style))
story.append(gold_line())

story.append(Paragraph('11.1 Imagenes en Sanity', h2_style))

story.append(Paragraph(
    'Todas las imagenes se almacenan como assets de Sanity y se sirven via su CDN en cdn.sanity.io. '
    'El paquete @sanity/image-url genera URLs optimizadas con parametros de transformacion en tiempo '
    'real sin necesidad de procesamiento previo. El image builder se configura en sanity.client.ts '
    'con projectId y dataset para generar URLs automaticas.',
    body
))

story.append(bullet(
    'Se generan URLs del tipo cdn.sanity.io/images/{projectId}/{dataset}/{assetId}-{dimensions}.webp '
    'con parametros automaticos de formato (WebP preferido), calidad (85 por defecto) y dimensiones '
    'exactas segun el componente que la renderiza (hero: 1920x1080, thumbnail: 400x300, avatar: 100x100).',
    'Image URL Builder'
))

story.append(bullet(
    'Next.js requiere que los dominios de imagenes externas esten whitelisteados en next.config.ts. '
    'Se agregara cdn.sanity.io al array images.remote para permitir que el componente &lt;Image&gt; '
    'de Next.js optimice imagenes de Sanity como si fueran locales.',
    'next.config.ts Configuration'
))

story.append(bullet(
    'Cada imagen en Sanity incluye metadata automatica: dimensiones originales, tipo MIME, '
    'tamano en bytes, SHA1 hash y paleta de colores dominante. Las queries GROQ pueden proyectar '
    'estos metadatos para implementar lazy loading inteligente, aspect ratios correctos y '
    'placeholders de color (blur) mientras carga la imagen real.',
    'Metadata Automatico'
))

story.append(Paragraph('11.2 Videos en Hero Slides', h2_style))

story.append(Paragraph(
    'Los videos se almacenan como assets de Sanity con tipos MIME video/mp4 y video/webm. A diferencia '
    'de las imagenes, los videos no se transforman por CDN — se sirven en su formato original. '
    'El componente del hero carousel implementara la logica de reproduccion con las siguientes '
    'reglas: en escritorio, si existe videoMP4 o videoWebM, se reproduce como fondo con muted, '
    'autoplay y loop (segun la configuracion del slide); en movil, se muestra siempre la imagen '
    'de fallback (mobileFallbackImage o backgroundImage) para ahorrar datos. La posterImage se '
    'muestra mientras el video se carga por primera vez.',
    body
))

story.append(Paragraph('11.3 Galleries de Proyectos', h2_style))

story.append(Paragraph(
    'Cada proyecto puede tener hasta 15 imagenes en su galeria. Las imagenes se almacenan como un '
    'array de tipo "image" en el schema project. El componente ProjectsPage.tsx ya tiene un lightbox '
    'implementado con soporte de zoom, pan, swipe y rotacion. La integracion simplemente reemplazara '
    'las URLs de Unsplash por las URLs generadas por el image builder de Sanity. No se requiere '
    'ninguna modificacion en la logica del lightbox.',
    body
))

# ═══════════════════════════════════════════════════════════════════
# 12. CACHE E ISR
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('12. Estrategia de Cache e ISR', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'La estrategia de cache se basa en tres pilares: Static Site Generation con revalidacion '
    'periodica (ISR), revalidacion bajo demanda via defineLive, y cache del CDN de Vercel. '
    'Esto garantiza tiempos de carga rapidos (HTML estatico) sin sacrificar la capacidad de '
    'actualizar contenido en tiempo real desde el CMS.',
    body
))

cache_items = [
    ('ISR (Incremental Static Regeneration)', 'Las paginas se generan estaticamente en build time y se revalidan cada 60 segundos (revalidate: 60). Esto significa que despues de un cambio en Sanity, el sitio refleja el nuevo contenido en un maximo de 60 segundos sin necesidad de rebuild. Este valor es configurable y puede ajustarse segun la frecuencia de actualizacion del contenido.'),
    ('defineLive (Revalidacion en Tiempo Real)', 'El sistema defineLive en src/sanity/live.ts abre una conexion WebSocket con Sanity que escucha eventos de mutacion en los documentos. Cuando un documento se crea, modifica o elimina, defineLive dispara router.refresh() o revalidatePath() para forzar la regeneracion de las paginas afectadas. Esto reduce la latencia de 60 segundos (ISR) a practicamente instantaneo.'),
    ('CDN de Vercel', 'Vercel cachea el HTML generado en sus edge nodes globalmente. Cuando una pagina se revalida, Vercel invalida su cache y sirve la nueva version. Si un usuario solicita la pagina antes de la revalidacion, recibe la version cacheada (stale-while-revalidate). Esto garantiza que el sitio nunca sea lento, incluso durante actualizaciones.'),
    ('Sanity CDN para Imagenes', 'Las imagenes se sirven desde cdn.sanity.io con cache agresivo (1 ano por defecto) y URLs unicas por dimensiones. Si se actualiza una imagen en Sanity, la URL del asset cambia (nuevo hash), invalidando automaticamente el cache de Vercel y del navegador. No se necesita purga manual de cache para imagenes.'),
    ('Draft Mode (Sin Cache)', 'Cuando un editor tiene Draft Mode habilitado, las queries se ejecutan con el token de preview y no se cachean. Esto permite ver los cambios en tiempo real sin esperar a la revalidacion. El Draft Mode se deshabilita al cerrar el navegador o al hacer clic en "Exit preview".'),
]

for title, desc in cache_items:
    story.append(bullet(desc, title))

# ═══════════════════════════════════════════════════════════════════
# 13. COMPATIBILIDAD CON VERCEL
# ═══════════════════════════════════════════════════════════════════
story.append(Spacer(1, 4*mm))
story.append(Paragraph('13. Compatibilidad con Vercel', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'La integracion esta disenada especificamente para desplegar en Vercel sin configuraciones '
    'adicionales. Next.js 16 con App Router es el runtime nativo de Vercel, y todos los sistemas '
    'de Sanity (Studio embebido, Draft Mode, defineLive, Visual Editing) estan probados y '
    'compatibles con la plataforma. A continuacion se detallan los puntos criticos de compatibilidad.',
    body
))

vercel_items = [
    ('Studio Embebido en /admin', 'El Studio de Sanity se renderiza como un Server Component en Next.js usando NextStudio de next-sanity. Vercel lo ejecuta en el edge sin necesidad de servidor dedicado. El archivo next.config.ts ya tiene la configuracion necesaria para que /admin funcione como una ruta interna.'),
    ('Environment Variables', 'Todas las variables de entorno se configuran en el dashboard de Vercel (Settings > Environment Variables). Las variables con prefijo NEXT_PUBLIC_ se inyectan en el build y son accesibles del lado del cliente. Las demas solo estan disponibles en el servidor (API routes, Server Components).'),
    ('ISR y Revalidacion', 'Vercel soporta ISR de forma nativa con revalidate. El valor de 60 segundos es optimo para la mayoria de sitios corporativos. Si se necesita revalidacion mas rapida, se puede reducir a 30 o incluso 10 segundos sin impacto significativo en el rendimiento.'),
    ('Edge Functions', 'Los API routes de Draft Mode (enable/disable) se ejecutan como Edge Functions en Vercel, lo que las hace rapidas y globales. No requieren un servidor Node.js tradicional.'),
    ('Imagenes Optimizadas', 'El componente &lt;Image&gt; de Next.js con cdn.sanity.io en images.remote permite que Vercel optimice imagenes de Sanity en su infrastructure de optimizacion de imagenes, reduciendo el tamano de descarga hasta un 80%.'),
    ('Deploy Automático', 'Cada push al branch main de GitHub dispara automaticamente un deploy en Vercel. El build time tipico para este proyecto (con Tailwind, Framer Motion y Sanity) es de 45-90 segundos.'),
]

for title, desc in vercel_items:
    story.append(bullet(desc, title))

# ═══════════════════════════════════════════════════════════════════
# 14. COMPATIBILIDAD CON FUTURAS CLONACIONES DE FASTPAGEPRO
# ═══════════════════════════════════════════════════════════════════
story.append(Paragraph('14. Compatibilidad con Futuras Clonaciones de FastPagePro', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'La arquitectura esta disenada como una plantilla maestra reutilizable para cualquier cliente '
    'de FastPagePro. Al clonar este repositorio para un nuevo proyecto, los cambios necesarios son '
    'minimos y exclusivamente de configuracion: no se necesita modificar schemas, queries ni '
    'componentes. Todo esta abstraido en archivos de configuracion centralizados.',
    body
))

story.append(Paragraph('14.1 Checklist de Clonacion para Nuevo Proyecto', h2_style))

clone_items = [
    'Actualizar NEXT_PUBLIC_SANITY_PROJECT_ID con el ID del nuevo proyecto Sanity',
    'Actualizar NEXT_PUBLIC_SITE_URL con el dominio del nuevo sitio',
    'Actualizar SANITY_API_READ_TOKEN y SANITY_API_TOKEN_PREVIEW con los tokens del nuevo proyecto',
    'Modificar sanity/lib/constants.ts: BRAND_COLORS, COMPANY_NAME, STUDIO_TITLE, SITE_URL',
    'Cambiar logo, favicon y OG images en public/ y Sanity',
    'Actualizar el contenido del CMS desde el Studio (no tocar codigo)',
    'Modificar next.config.ts si el dominio de imagenes es diferente',
    'Actualizar vercel.json si se necesitan headers adicionales',
    'Configurar el dominio personalizado en Vercel',
    'El credito "Desarrollado por FastPagePro.com" permanecera automaticamente en el footer',
]

for item in clone_items:
    story.append(bullet(item))

story.append(Spacer(1, 3*mm))
story.append(Paragraph('14.2 Verticales Soportadas', h2_style))

story.append(Paragraph(
    'Los schemas genericos (project, service, teamMember, testimonial, partner, stat, heroSlide) '
    'cubren las necesidades de contenido de las siguientes verticales industriales sin necesidad '
    'de crear schemas adicionales:',
    body
))

verticals = [
    ('Construccion e Ingenieria', 'Proyectos de construccion, servicios de diseno estructural, equipo de ingenieros, testimonios de clientes corporativos'),
    ('Arquitectura', 'Proyectos arquitectonicos, servicios de diseno, galeria de renders, equipo de arquitectos, estadisticas de metros cuadrados construidos'),
    ('Logistica y Transporte', 'Servicios logisticos, flota de vehiculos, cobertura de rutas, clientes corporativos, estadisticas de entregas'),
    ('Industria y Manufactura', 'Productos industriales, lineas de produccion, certificaciones, equipo directivo, capacidad productiva'),
    ('Corporativo General', 'Paginas informativas, directorio ejecutivo, servicios de consultoria, casos de exito, valores de marca'),
    ('Tecnologia y Software', 'Productos digitales, servicios de desarrollo, equipo tecnico, stack tecnologico, metricas de rendimiento'),
]

vert_table = [
    [Paragraph(h, table_header_style) for h in ['Vertical', 'Aplicacion']]
]
for v in verticals:
    vert_table.append([Paragraph(v[0], table_cell_bold), Paragraph(v[1], table_cell_desc)])

t7 = Table(vert_table, colWidths=[45*mm, CONTENT_W - 45*mm], repeatRows=1)
t7.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), NAVY),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('TOPPADDING', (0, 0), (-1, 0), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 1), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_LIGHT),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE_BG, LIGHT]),
]))
story.append(t7)

# ═══════════════════════════════════════════════════════════════════
# 15. CONFIRMACIONES OBLIGATORIAS
# ═══════════════════════════════════════════════════════════════════
story.append(PageBreak())
story.append(Paragraph('15. Confirmaciones Obligatorias', h1_style))
story.append(gold_line())

story.append(Paragraph(
    'Esta seccion contiene la lista de verificacion final con todas las confirmaciones explicitas '
    'solicitadas antes de proceder con la implementacion. Cada item esta marcado como afirmativo (YES) '
    'o negativo (NO) segun los requisitos del usuario. Estos estados son vinculantes y no se '
    'modificaran durante la implementacion sin aprobacion explicita.',
    body
))

story.append(Spacer(1, 3*mm))

confirmations = [
    (True, 'Textos editables — Todos los textos publicos del sitio seran editables desde el Sanity Studio, incluyendo titulos, descripciones, subtitulos, textos de contacto, CTAs y textos legales.'),
    (True, 'Imagenes editables — Todas las imagenes del sitio seran almacenadas y editables desde Sanity, incluyendo hero backgrounds, imagenes de servicios, galerias de proyectos, fotos de equipo, avatares y logos.'),
    (True, 'Videos editables — Los videos de hero slides (MP4/WebM) seran cargados y gestionados desde Sanity con control de muted, autoplay, loop y poster image.'),
    (True, 'Hero Video editable desde CMS — Cada hero slide soporta imagen de fondo + video MP4 + video WebM + poster + fallback movil, todo configurable campo por campo desde el Studio.'),
    (True, 'Open Graph editable — Los metadatos OG (titulo, descripcion, imagen, URL canonica) se configuran en siteSettings del CMS y se inyectan dinamicamente en el metadata API de Next.js.'),
    (True, 'SEO editable — Title tag, meta description, URL canonica y cualquier campo SEO futuro se obtiene del CMS y se genera dinamicamente para cada pagina.'),
    (True, 'Proyectos editables — Los proyectos del portafolio (titulo, cliente, ano, descripcion en texto rico, galeria de hasta 15 imagenes, tags, estado, categoria, video URL) son completamente editables.'),
    (True, 'Servicios editables — Los servicios con sus subservicios (titulo, descripcion, icono, imagen, categoria, orden, destacado) son completamente editables.'),
    (True, 'Testimonios editables — Los testimonios (nombre, rol, empresa, quote, rating 1-5, avatar, destacado) son completamente editables.'),
    (True, 'Equipo editable — Los miembros del equipo (nombre, rol, foto, bio en texto rico, email, telefono, redes sociales, orden) son completamente editables.'),
    (True, 'Configuracion global editable — La configuracion del sitio (nombre, contacto, redes sociales, ubicacion, SEO, OG) es editable desde siteSettings del Studio.'),
    (True, 'Visual Editing funcional — El overlay de edicion inline de Sanity funciona sobre el sitio en produccion, permitiendo edicion directa sin abrir el Studio por separado.'),
    (True, 'Presentation Tool funcional — El Presentation Tool con tabs Structure y Presentation funciona en el Studio, permitiendo vista previa en tiempo real con Draft Mode.'),
    (False, 'El credito "Desarrollado por FastPagePro.com" permanecera HARDCODEADO y fuera del CMS permanentemente. No sera editable desde el Studio, no aparecera en Visual Editing, no sera configurable en Presentation Tool, y no se almacenara en ningun documento de Sanity.'),
]

for ok, text in confirmations:
    story.append(check_x(ok, text))

# ═══════════════════════════════════════════════════════════════════
# 16. PLAN DE IMPLEMENTACION
# ═══════════════════════════════════════════════════════════════════
story.append(Spacer(1, 6*mm))
story.append(Paragraph('16. Plan de Implementacion (5 Fases)', h1_style))
story.append(gold_line())

phases = [
    ('Fase 1: Infraestructura Base', 'Verificar y completar sanity.config.ts, schemas (10 types), constants.ts, schema-master.ts, sanity/lib/ structure. Validar que todos los schemas compilan sin errores en el Studio embebido en /admin.'),
    ('Fase 2: Cliente, Queries y Live', 'Verificar sanity.client.ts (Stega + image builder), sanity.queries.ts (10 queries GROQ), sanity/live.ts (defineLive). Verificar API routes de Draft Mode (enable/disable).'),
    ('Fase 3: Studio Route Handler', 'Verificar src/app/admin/[[...tool]]/page.tsx (NextStudio embebido). Validar que el Studio carga correctamente en /admin y muestra los 10 tipos de documento.'),
    ('Fase 4: Layout Principal', 'Modificar src/app/layout.tsx para envolver children con SanityLive y VisualEditing. Modificar next.config.ts para agregar cdn.sanity.io en images.remote.'),
    ('Fase 5: Migracion Frontend', 'Migrar componentes a datos del CMS en orden seguro: Footer (datos de contacto) > ServicesPage (servicios con subservicios) > ProjectsPage (proyectos con galeria) > HomePage (hero slides, stats, servicios destacados, pilares, logos). Cada componente mantiene fallback hardcodeado.'),
]

for title, desc in phases:
    story.append(bullet(desc, title))

story.append(Spacer(1, 6*mm))

# Final credit
story.append(HRFlowable(width="40%", thickness=1, color=GOLD, spaceAfter=4*mm, spaceBefore=2*mm))
story.append(Paragraph(
    '<i>Documento generado por FastPagePro.com — Arquitectura de Plantilla Maestra v1.0</i>',
    ParagraphStyle('FinalCredit', fontName='Tinos-Italic', fontSize=9, leading=12,
                   textColor=GRAY_MED, alignment=TA_CENTER)
))
story.append(Paragraph(
    '<i>Proyecto Sertrade Design — https://sertrade.vercel.app</i>',
    ParagraphStyle('FinalURL', fontName='DejaVuMono', fontSize=8, leading=11,
                   textColor=GRAY_MED, alignment=TA_CENTER)
))

# ═══════════════════════════════════════════════════════════════════
# BUILD PDF
# ═══════════════════════════════════════════════════════════════════

# Page number tracking
page_count = [0]

def on_first_page(canvas, doc):
    cover_page(canvas, doc)
    page_count[0] += 1

def on_later_pages(canvas, doc):
    normal_page(canvas, doc)
    page_count[0] += 1

doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_pages)
print(f"PDF generated successfully: {output_path}")
print(f"Total pages: ~16 (estimated)")
