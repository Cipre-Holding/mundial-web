# Vive México — Sitio de Comercialización

Sitio web de **landing y comercialización** para conectar negocios mexicanos con turistas durante la Copa Mundial FIFA 2026 (México, Estados Unidos y Canadá). Permite a restaurantes, hoteles, retail y entretenimiento afiliarse mediante planes de pago único y aparecer en la app oficial del Mundial. Incluye un **panel comercial** para el equipo de ventas.

---

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Funcionalidades principales](#funcionalidades-principales)
- [Tecnologías](#tecnologías)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Rutas y páginas](#rutas-y-páginas)
- [Panel comercial (Admin)](#panel-comercial-admin)
- [Documentación del código (JSDoc)](#documentación-del-código-jsdoc)
- [Backend y servicios](#backend-y-servicios)
- [Base de datos Supabase](#base-de-datos-supabase)
- [Diseño y tema](#diseño-y-tema)
- [Configuración y ejecución](#configuración-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Scripts disponibles](#scripts-disponibles)
- [Testing](#testing)

---

## Descripción del proyecto

**Vive México** es una plataforma web que:

- **Promociona** la app oficial del Mundial en 2026 para turistas.
- **Ofrece planes de afiliación** a negocios (Participante, Destacado, Élite Mundial) con pago único por temporada.
- **Recopila solicitudes** mediante un formulario multi-paso (datos del negocio, documentación, ubicación, confirmación).
- **Incluye un asistente IA (Goyo)** para resolver dudas sobre planes, beneficios y proceso de afiliación.
- **Panel comercial** para el equipo de ventas: dashboard, catálogo, propuestas, plantillas, recursos, prospectos y targets.

El sitio está orientado a **Negocios México**: restaurantes, entretenimiento, retail y servicios en las ciudades sede (CDMX, Guadalajara, Monterrey).

---

## Funcionalidades principales

| Funcionalidad | Descripción |
|---------------|-------------|
| **Landing de conversión** | Hero con cuenta regresiva, CTA a planes, secciones de valor y beneficios. |
| **Planes de afiliación** | Tres planes (Participante $4,000 · Destacado $75,000 · Élite $150,000 MXN) con comparativa de características. |
| **Selección de plan y formulario** | Al elegir un plan se muestra un formulario de afiliación en 4 pasos; al terminar se vuelve a la vista de planes. |
| **Formulario de afiliación** | Wizard: (1) Información del negocio, (2) Documentación, (3) Ubicación y contacto, (4) Confirmación y pago. |
| **Chat con Goyo (IA)** | Asistente virtual con personalidad mexicana que responde sobre planes, beneficios y proceso; streaming vía Supabase Edge Function. |
| **Sección Internet del Bienestar** | Promoción de alianza con "Internet del Bienestar": 7 días de internet gratis con la descarga de la app. |
| **Panel comercial** | Dashboard, catálogo de beneficios, constructor de propuestas, plantillas, biblioteca de recursos, prospectos y targets. |
| **Auth** | Login/registro para acceso al panel comercial (Supabase Auth). |

---

## Tecnologías

### Frontend

- **React 18** — Componentes funcionales y hooks.
- **TypeScript** — Tipado estático.
- **Vite 5** — Build y dev server (puerto 8080), alias `@/` → `src/`.
- **React Router DOM 6** — Rutas SPA.
- **Tailwind CSS 3** — Estilos, diseño responsive, tema custom Mundial 2026.
- **shadcn/ui (Radix UI)** — Componentes: Button, Card, Input, Select, Accordion, Dialog, Toast, etc.
- **Lucide React** — Iconografía.
- **React Hook Form + Zod** — Formularios y validación.
- **TanStack React Query** — Cache y mutaciones para datos de Supabase.
- **date-fns** — Utilidades de fecha (CountdownTimer).
- **Recharts** — Gráficos (dashboard).
- **jsPDF** — Exportación de plantillas a PDF.
- **Sonner** — Toasts.

### Backend / Servicios

- **Supabase** — Auth, base de datos PostgreSQL, storage, Edge Functions.
- **Supabase Edge Functions** — Función `chat-goyo` para el asistente IA con streaming.

---

## Estructura del repositorio

```
mundial-web/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── vercel.json
├── .env                    # VITE_SUPABASE_* (no commitear)
├── .env.example
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── main.tsx            # Punto de entrada
│   ├── App.tsx             # Proveedores, router, rutas
│   ├── index.css           # Tailwind + variables CSS
│   ├── pages/
│   │   ├── Index.tsx       # Landing
│   │   ├── Comercios.tsx   # Página de planes + formulario
│   │   ├── DescargarApp.tsx
│   │   ├── Auth.tsx        # Login/registro panel
│   │   ├── TerminosCondiciones.tsx
│   │   ├── NotFound.tsx
│   │   └── panel/          # Páginas del panel comercial
│   │       ├── Dashboard.tsx
│   │       ├── CatalogPage.tsx
│   │       ├── ProposalBuilderPage.tsx
│   │       ├── PitchTemplatesPage.tsx
│   │       ├── ResourceLibraryPage.tsx
│   │       ├── ProspectsPage.tsx
│   │       └── TargetsPage.tsx
│   ├── components/
│   │   ├── comercializacion/   # Secciones landing
│   │   ├── panel/              # PanelLayout
│   │   ├── dashboard/          # Gráficos y widgets
│   │   ├── ScrollToTop.tsx
│   │   └── ui/                 # shadcn
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useBenefits.ts
│   │   ├── useDashboardData.ts
│   │   ├── useProposals.ts
│   │   ├── useProspects.ts
│   │   ├── useSalesResources.ts
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── utils.ts        # cn()
│   │   └── pdfExport.ts    # Exportación PDF
│   └── integrations/
│       └── supabase/
│           ├── client.ts
│           └── types.ts    # Tipos Database
└── supabase/
    ├── config.toml
    └── functions/
        └── chat-goyo/
            └── index.ts    # Edge Function Goyo
```

---

## Rutas y páginas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Index` | Landing con Hero, App, Video, Bienestar, Imagen, Chat, Footer. |
| `/comercios` | `Comercios` | Planes, beneficios, formulario de afiliación. |
| `/descargarapp` | `DescargarApp` | Página de descarga de la app. |
| `/terminos` | `TerminosCondiciones` | Términos y condiciones legales. |
| `/auth` | `Auth` | Login/registro para el panel comercial. |
| `/panel` | `Dashboard` | Resumen KPIs, gráficos, actividad, metas. |
| `/panel/catalogo` | `CatalogPage` | Catálogo de beneficios por categoría. |
| `/panel/propuestas` | `ProposalBuilderPage` | Constructor de propuestas con beneficios. |
| `/panel/plantillas` | `PitchTemplatesPage` | Plantillas comerciales editables + export PDF. |
| `/panel/recursos` | `ResourceLibraryPage` | Biblioteca de materiales de venta. |
| `/panel/prospectos` | `ProspectsPage` | Pipeline y directorio de prospectos. |
| `/panel/targets` | `TargetsPage` | Sectores objetivo por tier. |
| `/panel/presentaciones` | — | Próximamente. |
| `*` | `NotFound` | 404. |

---

## Panel comercial (Admin)

El panel comercial está protegido por autenticación. Solo usuarios autenticados pueden acceder a `/panel/*`. Si no hay sesión, se redirige a `/auth`.

### Arquitectura

- **AuthProvider** (`useAuth`) — Contexto de sesión Supabase.
- **PanelLayout** — Layout con sidebar, navegación y logout.
- **Hooks** — `useBenefits`, `useProposals`, `useProspects`, `useSalesResources`, `useDashboardData`.

### Páginas del panel

| Página | Descripción |
|--------|-------------|
| **Dashboard** | KPIs (prospectos, propuestas activas, ventas cerradas, ingresos), gráfico por sector, pipeline, actividad reciente, ranking vendedores, metas del mes. |
| **Catálogo** | Qué vendemos: categorías y beneficios con precios. |
| **Propuestas** | Crear/editar propuestas combinando beneficios; calcular totales. |
| **Plantillas** | Machotes para Empresas, Gobierno, Restaurantes, Hotelería, Bancos, Seguros; exportar a PDF. |
| **Recursos** | Subir/descargar materiales (decks, one-pagers, mockups, etc.) por categoría. |
| **Prospectos** | Vista pipeline o lista; CRUD; filtros por sector/ciudad. |
| **Targets** | Sectores objetivo por tier (Premium, Alto, Medio, Emergente). |

### Acceso

- Botón **Admin** en el Hero y Footer del landing.
- Ruta directa: `/auth` → login → redirect a `/panel`.

---

## Documentación del código (JSDoc)

El proyecto usa JSDoc para documentar módulos y funciones clave:

- **Hooks** — `@fileoverview` y descripción de cada hook (`useAuth`, `useBenefits`, `useProposals`, etc.).
- **Integraciones** — `@fileoverview` en `client.ts` de Supabase.
- **Lib** — `cn()` en `utils.ts`, `exportTemplateToPDF()` en `pdfExport.ts`.
- **Componentes** — `@fileoverview` en `PanelLayout`, `ScrollToTop`, componentes del dashboard.
- **Páginas** — Descripción breve en `Auth`, `Index`, `App`.

Ejemplo:

```ts
/**
 * Hook para acceder al contexto de autenticación.
 * Debe usarse dentro de un componente envuelto por AuthProvider.
 *
 * @returns {AuthContextType} user, session, loading, signIn, signUp, signOut
 * @throws {Error} Si se usa fuera de AuthProvider
 */
export function useAuth() { ... }
```

---

## Backend y servicios

### Supabase

- **Cliente**: `src/integrations/supabase/client.ts` — `createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)` con auth en `localStorage`.
- **Tipos**: `src/integrations/supabase/types.ts` — Tipos generados para tablas y funciones.

### Edge Function: `chat-goyo`

- **Ruta**: `supabase/functions/chat-goyo/index.ts`.
- **Invocación**: POST desde `AIChatSection` a `${VITE_SUPABASE_URL}/functions/v1/chat-goyo` con header `Authorization: Bearer VITE_SUPABASE_PUBLISHABLE_KEY` y body `{ messages }`.
- **Flujo**: Recibe `messages`, añade system prompt de Goyo, llama a Lovable AI Gateway (Gemini) con `stream: true`, reenvía como SSE.
- **Variable**: `LOVABLE_API_KEY` en el entorno de la Edge Function.

---

## Base de datos Supabase

Tablas utilizadas por el panel comercial:

| Tabla | Descripción |
|-------|-------------|
| `benefit_categories` | Categorías del catálogo (nombre, icono, orden). |
| `benefits` | Beneficios con precio y unidad por categoría. |
| `proposals` | Propuestas (nombre, cliente, total, estado, tipo plantilla). |
| `proposal_items` | Líneas de propuesta (beneficio_id, cantidad, subtotal). |
| `prospects` | Prospectos (empresa, contacto, sector, ciudad, estado pipeline). |
| `sales_resources` | Recursos de venta (título, categoría, file_path). |
| `sales_targets` | Metas por usuario/mes (ingresos, ventas, prospectos). |
| `profiles` | Perfiles de usuario (full_name, etc.). |
| `user_roles` | Roles (admin, vendedor, supervisor). |

Storage: bucket `sales-materials` para archivos de la biblioteca de recursos.

---

## Diseño y tema

- **Tema**: "Mundial 2026 México" — verde bandera (`--primary`), dorado (`--accent`), rojo.
- **Tokens**: `--mundial-green`, `--mundial-red`, `--mundial-gold`, `--mundial-dark`, `--mundial-light`; `--plan-basic`, `--plan-featured`, `--plan-elite`; gradientes `--gradient-hero`, `--gradient-gold`, `--gradient-elite`.
- **Animaciones**: `fade-in`, `slide-in-left`, `slide-in-right`, `scale-in`, `pulse-glow`, `countdown`, `accordion-down/up`; Ken Burns y partículas en el hero.
- **Modo oscuro**: Clase `dark` con variables alternativas.
- **Tipografía**: Inter.

---

## Configuración y ejecución

### Requisitos

- **Node.js** v18+
- **npm** o **bun**

### Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd mundial-web
npm install
```

### Variables de entorno

Crear `.env` en la raíz (copiar de `.env.example`):

```env
VITE_SUPABASE_URL="https://xxx.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJ..."
```

### Desarrollo

```bash
npm run dev
```

Servidor en `http://localhost:8080` (o el siguiente puerto libre si 8080 está ocupado).

### Build

```bash
npm run build
```

Salida en `dist/`.

### Vista previa del build

```bash
npm run preview
```

---

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase (cliente y Edge Functions). |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave anónima de Supabase (auth y Authorization). |

En la Edge Function `chat-goyo` (entorno Supabase):

| Variable | Uso |
|----------|-----|
| `LOVABLE_API_KEY` | API Key para Lovable AI Gateway (Gemini). |

---

## Despliegue en Vercel

1. Conectar el repositorio en [vercel.com](https://vercel.com).
2. Configurar variables de entorno: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Deploy — Vercel detecta Vite automáticamente.

### Configuración incluida (`vercel.json`)

- **Build**: `npm run build` → `dist`.
- **Rewrites**: Todas las rutas → `/index.html` (SPA).
- **Headers**: Cache largo para `/assets/*`.

---

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `vite` | Servidor de desarrollo (puerto 8080). |
| `build` | `vite build` | Build de producción. |
| `build:dev` | `vite build --mode development` | Build en modo development. |
| `preview` | `vite preview` | Sirve el build localmente. |
| `lint` | `eslint .` | Ejecuta ESLint. |
| `test` | `vitest run` | Tests con Vitest. |
| `test:watch` | `vitest` | Tests en modo watch. |

---

## Testing

- **Vitest** + **Testing Library** (React).
- Configuración en `vitest.config.ts`; setup en `src/test/setup.ts`.

```bash
npm run test
```

---

## Resumen de componentes por carpeta

- **`src/pages`**: Index, Comercios, DescargarApp, Auth, TerminosCondiciones, NotFound, panel/*.
- **`src/components/comercializacion`**: HeroSection, AppShowcaseSection, VideoSection, BienestarSection, ImageSection, AIChatSection, FooterSection, etc.
- **`src/components/panel`**: PanelLayout.
- **`src/components/dashboard`**: ActivityFeed, SectorChart, PipelineFunnel, TargetsProgress, VendorLeaderboard.
- **`src/components/ui`**: Componentes shadcn.
- **`src/hooks`**: useAuth, useBenefits, useDashboardData, useProposals, useProspects, useSalesResources.
- **`src/lib`**: utils (cn), pdfExport.
- **`src/integrations/supabase`**: client, types.
