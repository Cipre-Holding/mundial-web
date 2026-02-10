# Vive México— Sitio de Comercialización

Sitio web de **landing y comercialización** para conectar negocios mexicanos con turistas durante la Copa Mundial FIFA 2026 (México, Estados Unidos y Canadá). Permite a restaurantes, hoteles, retail y entretenimiento afiliarse mediante planes de pago único y aparecer en la app oficial del Mundial.

---

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Funcionalidades principales](#funcionalidades-principales)
- [Tecnologías](#tecnologías)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Apartados y secciones](#apartados-y-secciones)
- [Rutas y páginas](#rutas-y-páginas)
- [Backend y servicios](#backend-y-servicios)
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

El sitio está orientado a **Negocios México**: restaurantes, entretenimiento, retail y servicios en las ciudades sede (CDMX, Guadalajara, Monterrey).

---

## Funcionalidades principales

| Funcionalidad | Descripción |
|---------------|-------------|
| **Landing de conversión** | Hero con cuenta regresiva, CTA a planes, secciones de valor y beneficios. |
| **Planes de afiliación** | Tres planes (Participante $4,000 · Destacado $75,000 · Élite $150,000 MXN) con comparativa de características. |
| **Selección de plan y formulario** | Al elegir un plan se muestra un formulario de afiliación en 4 pasos; al terminar se vuelve a la vista de planes. |
| **Formulario de afiliación** | Wizard: (1) Información del negocio, (2) Documentación, (3) Ubicación y contacto, (4) Confirmación y pago. Incluye categorías/subcategorías, ciudades y validación básica. |
| **Chat con Goyo (IA)** | Asistente virtual con personalidad mexicana que responde sobre planes, beneficios y proceso; respuestas en streaming vía Supabase Edge Function. |
| **Sección Internet del Bienestar** | Promoción de alianza con “Internet del Bienestar”: 7 días de internet gratis con la descarga de la app. |
| **FAQ** | Preguntas frecuentes en acordeón (duración del perfil, documentos, cambio de plan, pago, aprobación, ofertas, garantía, soporte). |
| **Términos y Condiciones** | Página legal con aceptación de términos, descripción del servicio, planes, obligaciones, propiedad intelectual, limitación de responsabilidad, etc. |
| **Footer** | Enlaces (Beneficios, Planes, Términos, Aviso de Privacidad), contacto (email, teléfono) y redes sociales. |

---

## Tecnologías

### Frontend

- **React 18** — Componentes funcionales y hooks.
- **TypeScript** — Tipado estático.
- **Vite 5** — Build y dev server (puerto 8080), alias `@/` → `src/`.
- **React Router DOM 6** — Rutas: `/`, `/terminos`, `*` (404).
- **Tailwind CSS 3** — Estilos, diseño responsive, tema custom Mundial 2026.
- **shadcn/ui (Radix UI)** — Componentes: Button, Card, Input, Select, Accordion, Collapsible, Dialog, Toast (Sonner), etc.
- **Lucide React** — Iconografía.
- **React Hook Form + Zod** — Formularios y validación (AffiliationForm).
- **TanStack React Query** — Cliente preparado en `App` (QueryClientProvider).
- **date-fns** — Utilidades de fecha (CountdownTimer).
- **Sonner** — Toasts; también Toaster de shadcn.

### Backend / Servicios

- **Supabase** — Cliente JS (`@supabase/supabase-js`) para auth y futuro uso de DB; tipos en `integrations/supabase/types.ts`.
- **Supabase Edge Functions (Deno)** — Función `chat-goyo`: recibe mensajes, llama a Lovable AI Gateway (Gemini) con system prompt de Goyo, devuelve streaming SSE.

### Herramientas de desarrollo

- **ESLint 9** — Linting.
- **Vitest + Testing Library** — Tests unitarios/integración.
- **lovable-tagger** — Plugin Vite (solo en desarrollo) para etiquetado de componentes.

---

## Estructura del repositorio

```
website-mundial/
├── index.html              # Entry HTML
├── package.json
├── vite.config.ts          # Vite + alias @, plugin react, lovable-tagger (dev)
├── tailwind.config.ts      # Tema Mundial 2026, colores, animaciones
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
├── vitest.config.ts
├── .env                    # VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY (no commitear)
├── .env.example            # Plantilla de variables de entorno
├── vercel.json             # Configuración Vercel: rewrites SPA, output, headers
├── .gitignore
├── .lovable/
│   └── plan.md             # Plan de la sección Bienestar
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── main.tsx            # React root + index.css
│   ├── App.tsx             # QueryClient, TooltipProvider, Toaster, Sonner, Router, Rutas
│   ├── App.css
│   ├── index.css           # Tailwind + variables CSS (tema Mundial 2026)
│   ├── vite-env.d.ts
│   ├── pages/
│   │   ├── Index.tsx       # Landing: secciones + estado selectedPlan → AffiliationForm
│   │   ├── NotFound.tsx   # 404
│   │   └── TerminosCondiciones.tsx
│   ├── components/
│   │   ├── NavLink.tsx     # Wrapper react-router NavLink con className/activeClassName
│   │   ├── comercializacion/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CountdownTimer.tsx
│   │   │   ├── AppShowcaseSection.tsx
│   │   │   ├── WhyAdvertiseSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── BienestarSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── AffiliationForm.tsx
│   │   │   ├── SocialProofSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── AIChatSection.tsx
│   │   │   └── FooterSection.tsx
│   │   └── ui/             # shadcn: button, card, input, accordion, dialog, etc.
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts        # cn() (clsx + tailwind-merge)
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts   # createClient con env
│   │       └── types.ts    # Database (vacío por ahora)
│   ├── assets/
│   │   ├── bienestar-logo.svg
│   │   └── stadium-hero.jpg
│   └── test/
│       ├── setup.ts
│       └── example.test.ts
└── supabase/
    ├── config.toml
    └── functions/
        └── chat-goyo/
            └── index.ts    # Edge Function: Goyo chat con streaming
```

---

## Apartados y secciones

La página principal (`/`) se compone de estas secciones en orden. Si el usuario ha elegido un plan (`selectedPlan`), se muestra solo `AffiliationForm` y el footer; si no, se muestran todas las secciones salvo el formulario.

| Orden | Sección | Componente | Contenido breve |
|-------|---------|------------|------------------|
| 1 | Hero | `HeroSection` | Imagen de estadio (Ken Burns), partículas, logo Mundial 2026, cuenta regresiva (`CountdownTimer` hasta 11 jun 2026), headline y CTA “Ver planes”. |
| 2 | App | `AppShowcaseSection` | Presentación de la app: ciudades sede, restaurantes, hoteles, calendario, quiniela, beneficios; mockups de móvil con pantallas simuladas. |
| 3 | Por qué anunciarse | `WhyAdvertiseSection` | Estadísticas (5M+ turistas, $2,500 USD gasto promedio, 80% búsquedas móviles, 10x ROI) y propuestas de valor (audiencia premium, momento perfecto, visibilidad). |
| 4 | Beneficios | `BenefitsSection` | Listado de beneficios por plan (perfil, mapa, redes, posicionamiento, badge, video, notificaciones, analytics, banner, reservas, etc.) con iconos. |
| 5 | Bienestar | `BienestarSection` | Alianza Internet del Bienestar: 7 días de internet gratis con la app; logo, CTA “Descargar app” y enlace a yosoybienestar.com. |
| 6 | Planes | `PricingSection` | Tres planes (Participante, Destacado, Élite) con precio, características y botón “Elegir plan” que dispara `onSelectPlan` y scroll al formulario. |
| 7 | Prueba social | `SocialProofSection` | Métricas (500+ negocios, 3 ciudades, 50K+ usuarios, 4.9/5), testimonios y logos de partners (FETUR, CANACO, etc.). |
| 8 | FAQ | `FAQSection` | Acordeón con 8 preguntas (vigencia del perfil, documentos, cambio de plan, pago, aprobación, ofertas, garantía, soporte). |
| 9 | Chat Goyo | `AIChatSection` | Chat con Goyo: avatar SVG, preguntas rápidas, input, mensajes y respuestas en streaming desde Edge Function. |
| — | Formulario | `AffiliationForm` | Visible solo cuando hay `selectedPlan`. Wizard 4 pasos; al enviar, alert y lógica a definir (backend). |
| 10 | Footer | `FooterSection` | Siempre visible: marca, descripción, redes, enlaces (Beneficios, Planes, Términos, Aviso de Privacidad), contacto. |

---

## Rutas y páginas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Index` | Landing con todas las secciones o formulario de afiliación según `selectedPlan`. |
| `/terminos` | `TerminosCondiciones` | Términos y condiciones (aceptación, servicio, planes, obligaciones, propiedad intelectual, limitación de responsabilidad, contacto). |
| `*` | `NotFound` | Página 404 con enlace a inicio. |

---

## Backend y servicios

### Supabase

- **Cliente**: `src/integrations/supabase/client.ts` — `createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)` con auth en `localStorage`.
- **Tipos**: `src/integrations/supabase/types.ts` — `Database` con schema `public` vacío (sin tablas definidas aún); útil para futuras tablas (afiliaciones, usuarios, etc.).

### Edge Function: `chat-goyo`

- **Ruta**: `supabase/functions/chat-goyo/index.ts`.
- **Invocación**: POST desde `AIChatSection` a `${VITE_SUPABASE_URL}/functions/v1/chat-goyo` con header `Authorization: Bearer VITE_SUPABASE_PUBLISHABLE_KEY` y body `{ messages }`.
- **Flujo**: Recibe `messages`, añade system prompt de Goyo, llama a `https://ai.gateway.lovable.dev/v1/chat/completions` (modelo `google/gemini-3-flash-preview`) con `stream: true`, reenvía el body como SSE.
- **Variables**: `LOVABLE_API_KEY` en el entorno de la Edge Function.
- **System prompt**: Goyo como asistente del Mundial en México: personalidad amigable, datos de planes (Participante, Destacado, Élite), beneficios, proceso de afiliación; respuestas breves y en tono mexicano.

---

## Diseño y tema

- **Tema**: “Mundial 2026 México” — verde bandera (`--primary`), dorado (`--accent`), rojo y tonos oscuros; variables en `src/index.css` y `tailwind.config.ts`.
- **Tokens**: `--mundial-green`, `--mundial-red`, `--mundial-gold`, `--mundial-dark`, `--mundial-light`; `--plan-basic`, `--plan-featured`, `--plan-elite`; gradientes `--gradient-hero`, `--gradient-gold`, `--gradient-elite`.
- **Animaciones**: `fade-in`, `slide-in-left`, `slide-in-right`, `scale-in`, `pulse-glow`, `countdown`, `accordion-down/up`; Ken Burns y partículas en el hero definidos en CSS.
- **Modo oscuro**: Clase `dark` con variables alternativas en `index.css`.
- **Tipografía**: Inter (Tailwind `font-display`, `font-body`).

---

## Configuración y ejecución

### Requisitos

- **Node.js** (recomendado v18+)
- **npm** o **bun** (existe `bun.lockb`)

### Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd website-mundial
npm install
```

### Variables de entorno

Crear `.env` en la raíz (ver sección [Variables de entorno](#variables-de-entorno)).

### Desarrollo

```bash
npm run dev
```

Servidor en `http://localhost:8080` (configurado en `vite.config.ts`).

### Build

```bash
npm run build
```

Salida en `dist/`. Para build en modo development:

```bash
npm run build:dev
```

### Vista previa del build

```bash
npm run preview
```

---

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase (cliente y URL base de Edge Functions). |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave anónima/pública de Supabase (cliente y Authorization para `chat-goyo`). |

En la Edge Function `chat-goyo` (entorno Supabase):

| Variable | Uso |
|----------|-----|
| `LOVABLE_API_KEY` | API Key para Lovable AI Gateway (Gemini). |

Para desarrollo local, copia `.env.example` a `.env` y rellena los valores.

---

## Despliegue en Vercel

El proyecto está preparado para desplegarse en [Vercel](https://vercel.com) sin cambios adicionales.

### Requisitos

- Repositorio Git (GitHub, GitLab o Bitbucket) conectado a Vercel.
- Variables de entorno configuradas en el dashboard de Vercel (ver [Variables de entorno](#variables-de-entorno)).

### Pasos

1. **Importar el proyecto**
   - En [vercel.com](https://vercel.com) → **Add New** → **Project**.
   - Importa el repositorio donde está `website-mundial` (o el directorio raíz si el repo es solo este proyecto).
   - Vercel detecta **Vite** por `vite.config.ts` y `package.json`.

2. **Configuración de build (opcional)**
   - **Build Command**: `npm run build` (por defecto).
   - **Output Directory**: `dist` (por defecto para Vite).
   - **Install Command**: `npm install` (por defecto).
   - Si el repositorio contiene varios proyectos, en **Root Directory** indica la carpeta `website-mundial` (o la que corresponda).

3. **Variables de entorno**
   - En el proyecto de Vercel: **Settings** → **Environment Variables**.
   - Añade:
     - `VITE_SUPABASE_URL` → URL de tu proyecto Supabase.
     - `VITE_SUPABASE_PUBLISHABLE_KEY` → Clave anónima (publishable) de Supabase.
   - Asigna a **Production**, **Preview** y **Development** según necesites.

4. **Desplegar**
   - **Deploy**; cada push a la rama de producción (p. ej. `main`) genera un despliegue en producción.
   - Las demás ramas generan **Preview Deployments** con su propia URL.

### Configuración incluida (`vercel.json`)

- **Framework**: `vite`.
- **Build / Output**: `npm run build` → `dist`.
- **Rewrites**: Todas las rutas que no sean archivos estáticos (p. ej. `/assets/*`, `.js`, `.css`, etc.) se reescriben a `/index.html` para que React Router funcione correctamente (`/`, `/terminos`, etc.).
- **Headers**: Cache largo para `/assets/*` (archivos con hash de Vite).

### Dominio personalizado

- En el proyecto de Vercel: **Settings** → **Domains** → **Add**.
   - Añade tu dominio y sigue las instrucciones de DNS (registro A/CNAME según indique Vercel).

### Nota sobre el chat (Goyo)

La Edge Function `chat-goyo` se ejecuta en **Supabase**, no en Vercel. Asegúrate de que el proyecto Supabase esté desplegado y que `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` apunten a ese proyecto. La variable `LOVABLE_API_KEY` se configura en el entorno de Supabase Edge Functions.

---

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `vite` | Servidor de desarrollo (puerto 8080). |
| `build` | `vite build` | Build de producción. |
| `build:dev` | `vite build --mode development` | Build en modo development. |
| `preview` | `vite preview` | Sirve el build localmente. |
| `lint` | `eslint .` | Ejecuta ESLint. |
| `test` | `vitest run` | Tests con Vitest (una ejecución). |
| `test:watch` | `vitest` | Tests en modo watch. |

---

## Testing

- **Vitest** + **Testing Library** (React).
- Configuración en `vitest.config.ts`; setup en `src/test/setup.ts`.
- Ejemplo de test en `src/test/example.test.ts`.

Para ejecutar:

```bash
npm run test
```

---

## Resumen de componentes por carpeta

- **`src/pages`**: Index (landing + formulario condicional), NotFound, TerminosCondiciones.
- **`src/components/comercializacion`**: Todas las secciones de la landing y el formulario de afiliación.
- **`src/components/ui`**: Componentes shadcn (button, card, input, select, accordion, dialog, toast, etc.).
- **`src/components`**: `NavLink` (compatibilidad con React Router y clases activas).

Si necesitas ampliar una sección (por ejemplo despliegue, CI/CD o convenciones de código), se puede añadir en este README o en documentos separados en el repo.
