# Ase de la Cruz - Sitio Web Oficial

Sitio web multi-página (MPA) construido con **Astro 5**, **React Islands**, **Tailwind CSS v4** y **TypeScript**. Desplegado en **Cloudflare Pages** con analytics **Umami**.

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Astro 5** | Framework principal (MPA, SSR híbrido, Islands) |
| **React 18** | Isla interactiva para formulario de contacto |
| **Tailwind CSS v4** | Estilos utility-first con paleta ámbar profesional |
| **TypeScript** | Tipado estricto en todo el proyecto |
| **Cloudflare Pages** | Hosting gratuito, edge global, SSR nativo |
| **Umami** | Analytics privacy-first (sin cookies, GDPR) |
| **Telegram Bot API** | Envío de formularios a chat privado |

## 📁 Estructura del Proyecto

```
ase-de-la-cruz/
├── public/
│   ├── images/
│   │   ├── team/           # Fotos del equipo (agregar)
│   │   ├── services/       # Imágenes de servicios (opcional)
│   │   └── blog/           # Imágenes hero de posts
│   ├── favicon.svg
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── ui/             # Componentes base (Button, Card, Input, etc.)
│   │   ├── layout/         # Header, Footer, Layouts
│   │   ├── forms/          # ContactForm.tsx (React Island)
│   │   ├── sections/       # Hero, ServicesGrid, ProcessSteps, etc.
│   │   └── blog/           # BlogCard, BlogLayout
│   ├── content/
│   │   ├── config.ts       # Schemas de collections
│   │   ├── servicios/      # 6 archivos .md (salud, vida, hogar, vehicular, empresas, art)
│   │   ├── nosotros/       # equipo.json + historia.md + valores.md
│   │   └── blog/           # Posts .md con frontmatter
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell + SEO + JSON-LD
│   │   ├── PageLayout.astro      # Header + Slot + Footer
│   │   └── BlogLayout.astro      # Layout específico para posts
│   ├── lib/
│   │   ├── constants.ts    # Config sitio, contactos, opciones formulario
│   │   ├── telegram.ts     # Cliente Telegram Bot API
│   │   ├── utils.ts        # Helpers (slugify, formatDate, etc.)
│   │   └── umami.ts        # Eventos analytics
│   ├── pages/
│   │   ├── index.astro              # Home
│   │   ├── servicios/index.astro    # Catálogo servicios + FAQ
│   │   ├── nosotros/index.astro     # Historia, valores, equipo
│   │   ├── contacto/index.astro     # Info + Formulario React
│   │   ├── blog/index.astro         # Listado posts + filtros
│   │   ├── blog/[slug].astro        # Detalle post (SSG)
│   │   ├── api/contact.ts           # Endpoint POST → Telegram
│   │   └── rss.xml.js               # Feed RSS
│   ├── styles/
│   │   └── global.css       # Tailwind v4 + tema + utilidades
│   └── env.d.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── wrangler.toml            # Config Cloudflare Pages
├── .env.example
└── README.md
```

## 🛠️ Instalación y Desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env
# Editar .env con tus tokens reales

# 3. Desarrollo local
npm run dev
# Abre http://localhost:4321

# 4. Verificar tipos
npm run check

# 5. Build producción
npm run build

# 6. Preview build local
npm run preview
```

## 📝 Cómo Completar el Contenido

### 1. Equipo (`src/content/nosotros/equipo.json`)

Edita el array con los datos reales de cada integrante:

```json
[
  {
    "name": "Diego García",
    "role": "Director & Fundador",
    "bio": "Más de 20 años en el mercado asegurador. Especialista en planificación patrimonial y riesgos corporativos.",
    "image": "/images/team/diego.jpg",
    "linkedin": "https://linkedin.com/in/diegogarcia",
    "email": "diegog.garcia1@gmail.com",
    "order": 1,
    "badge": "20+ años experiencia"
  }
  // ... más integrantes
]
```

- **image**: Sube la foto a `public/images/team/` y referencia la ruta
- **badge**: Etiqueta opcional (ej: "Socio Fundador", "Especialista en Vida")

### 2. Historia y Valores (`src/content/nosotros/historia.md`, `valores.md`)

Son archivos Markdown estándar. Edita el contenido libremente:

```markdown
---
title: "Nuestra Historia"
description: "Más de 20 años protegiendo el patrimonio de familias y empresas argentinas"
---

# Nuestra Historia

Tu contenido aquí en **Markdown**...
```

### 3. Servicios (`src/content/servicios/*.md`)

Cada servicio tiene su archivo. Campos importantes:

```markdown
---
title: "Prevención Salud"
description: "Resumen corto para cards y SEO"
icon: "heart-pulse"           # Icono Material Symbols
category: "salud"             # salud | vida | hogar | vehicular | empresas | art
featured: true                # Aparece destacado en Home
order: 1                      # Orden en listados
insurer: "Sancor Seguros"     # Opcional
coverages:                    # Opcional - lista de coberturas
  - "Consultas médicas sin límite"
  - "Internación en clínicas de primer nivel"
pdfBrochure: "/pdfs/..."      # Opcional - PDF descargable
pdfConditions: "/pdfs/..."    # Opcional - Condiciones generales
ctaText: "Solicitar cotización"
---

# Título del Servicio

Contenido detallado en Markdown...
```

**Para agregar PDFs de aseguradoras:**
1. Sube los PDFs a `public/pdfs/`
2. Referencia la ruta en `pdfBrochure` y `pdfConditions`

### 4. Blog (`src/content/blog/*.md`)

Crear archivos con nombre: `YYYY-MM-DD-slug-descriptivo.md`

```markdown
---
title: "5 Claves para Elegir tu Seguro de Vida"
description: "Resumen para SEO y cards (máx 160 chars)"
pubDate: 2025-01-15
updatedDate: 2025-01-20      # Opcional
heroImage: "/images/blog/mi-imagen.jpg"  # Opcional - subir a public/images/blog/
category: "Consejos"          # Consejos | Noticias | Guías
tags: ["vida", "ahorro", "familia"]
author: "Diego García"        # Debe coincidir con nombre en equipo.json
draft: false                  # true = no se publica
---

# Contenido del artículo en Markdown

## Subtítulos

- Listas
- **Negritas**
- [Enlaces](/contacto?interes=vida/prepaga)

> Citas destacadas
```

### 5. Imágenes

| Carpeta | Uso | Formato recomendado |
|---------|-----|---------------------|
| `public/images/team/` | Fotos equipo | JPG/WebP, 400x400px, cara centrada |
| `public/images/services/` | Imágenes servicios | JPG/WebP, 800x600px |
| `public/images/blog/` | Hero posts | JPG/WebP, 1200x630px (16:9) |
| `public/pdfs/` | Brochures/condiciones | PDF |

## 🔧 Configuración de Despliegue

### Cloudflare Pages (Recomendado)

1. **Conectar repositorio** en Cloudflare Pages
2. **Build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: `20` (o superior)
3. **Environment Variables** (en Settings > Environment variables):
   ```
   TELEGRAM_BOT_TOKEN=tu_token
   TELEGRAM_CHAT_ID=tu_chat_id
   SITE_URL=https://tudominio.com
   ```
4. **Custom Domain:** Agregar `asedelacruz.com` y `www.asedelacruz.com`

### Umami Analytics (Opcional, Gratis)

**Opción A: Cloudflare Workers (1-click deploy)**

```bash
# 1. Crear base de datos PostgreSQL (Neon, Supabase, o Cloudflare D1)
# 2. Generar HASH_SALT: openssl rand -base64 32
# 3. Configurar wrangler.umami.toml con DATABASE_URL y HASH_SALT
# 4. Deploy
wrangler deploy --config wrangler.umami.toml --env production
```

**Opción B: Docker en VPS/Coolify/Railway**

```yaml
# docker-compose.yml
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    environment:
      DATABASE_URL: postgresql://user:pass@host:5432/umami
      HASH_SALT: "tu-salt-seguro"
    ports:
      - "3000:3000"
```

**Luego en `BaseLayout.astro`:**
```astro
<script defer src="https://analytics.tudominio.com/script.js" data-website-id="TU_WEBSITE_ID"></script>
```

## 📋 Checklist Pre-Producción

- [ ] Completar `equipo.json` con datos reales + fotos
- [ ] Escribir `historia.md` y `valores.md` con contenido real
- [ ] Revisar/actualizar 6 servicios en `src/content/servicios/`
- [ ] Subir PDFs de aseguradoras a `public/pdfs/` y referenciarlos
- [ ] Crear al menos 3-4 posts de blog en `src/content/blog/`
- [ ] Subir imágenes hero para blog a `public/images/blog/`
- [ ] Configurar dominio en Cloudflare Pages
- [ ] Agregar variables de entorno en Cloudflare Dashboard
- [ ] Probar formulario de contacto (llega a Telegram)
- [ ] Verificar SEO: meta tags, JSON-LD, sitemap.xml, robots.txt
- [ ] Test responsive: móvil, tablet, laptop, desktop
- [ ] Configurar Umami Analytics (opcional)
- [ ] Agregar favicon real en `public/favicon.svg`

## 🎨 Personalización de Estilos

### Colores (en `src/styles/global.css`)

```css
@theme {
  --color-primary: #D97706;      /* Ámbar 600 - Principal */
  --color-primary-hover: #B45309; /* Ámbar 700 - Hover */
  --color-primary-light: #FEF3C7; /* Ámbar 100 - Fondos suaves */
  --color-dark: #1E293B;         /* Slate 800 - Texto principal */
  --color-surface: #FAFAF9;      /* Stone 50 - Fondo principal */
}
```

### Fuentes

- **Inter**: UI, body text
- **Plus Jakarta Sans**: Headings (títulos)

Se cargan via Google Fonts con `preload` en `BaseLayout.astro`.

## 📱 Responsive Breakpoints

| Breakpoint | Ancho | Uso |
|------------|-------|-----|
| `xs` | 480px | Móvil grande |
| `sm` | 640px | Móvil landscape / Tablet pequeña |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1440px | Desktop grande |

## 🔍 SEO Incluido

- Meta tags completos (Open Graph, Twitter Cards)
- JSON-LD estructurado: `Organization`, `WebSite`, `Article`, `Service`
- Sitemap.xml automático (`/sitemap-index.xml`)
- RSS feed (`/rss.xml`)
- Canonical URLs
- Imágenes optimizadas con `loading="lazy"` / `fetchpriority="high"`

## 📊 Analytics Events (Umami)

```typescript
// Tracking automático en componentes
trackContactFormSubmit(interest)
trackContactFormSuccess(interest)
trackCTAClick(ctaName, location)
trackServiceCardClick(serviceName, category)
trackBlogPostRead(slug, category)
trackBlogShare(platform, slug)
```

## 🐛 Troubleshooting

### Formulario no envía a Telegram
1. Verificar `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` en Cloudflare Pages env vars
2. Revisar logs en Cloudflare Pages > Functions > Logs
3. Probar endpoint local: `curl -X POST http://localhost:4321/api/contact -d "nombre=Test&telefono=1111111111&interesPrincipal=vida/prepaga"`

### Build falla en Cloudflare
- Node version debe ser 20+ (configurar en Pages settings)
- Verificar que `output: 'hybrid'` en `astro.config.mjs`
- Revisar que no haya imports de `fs` o `node:` en código cliente

### Imágenes no cargan
- Verificar rutas: `/images/...` desde `public/`
- En producción, Cloudflare sirve `public/` en root

## 📄 Licencia

Proyecto privado - Ase de la Cruz Assurance Group

---

## 🆘 Soporte

Para dudas técnicas sobre el código:
- Revisar `astro.config.mjs` para configuración de build
- Ver `src/lib/constants.ts` para configuración centralizada
- Componentes UI en `src/components/ui/` son reutilizables
- Isla React en `src/components/forms/ContactForm.tsx`

**Última actualización**: Enero 2025