# Spec & Plan: Home Feed (`/`) — OpenDayCare

## Estado de Aprobación

- **Status:** `Implemented`

### Checklist de Revisión (completar al aprobar)

- [x] Objetivo y alcance correctos
- [x] Stack y estructura de carpetas correctos
- [x] Comportamiento responsive / Drawer hamburguesa definido correctamente
- [x] Criterios de éxito medibles y correctos
- [x] Sin "Open Questions" pendientes

## 1. Objective

Implementar la pantalla principal de la maestra (`references/pantallas/feed.dc.html`) en la ruta `/` de `open-daycare`, logrando fidelidad visual 1:1 en desktop con Tailwind CSS v4, soporte **responsive** con menú **Drawer hamburguesa** en mobile, arquitectura modular de componentes en `components/` y una capa estructurada de datos ficticios en `app/_data/mock.ts` (sin autenticación ni base de datos por ahora).

## 2. Tech Stack

- **Framework:** Next.js 16.4.3 (App Router, `cacheComponents: true`)
- **UI:** React 19.3.0 (Server Components por defecto; Client Component solo en el contenedor interactivo del Drawer móvil)
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/turbopack`) + `next/font/google` (`Fredoka` y `Nunito`)
- **Lenguaje:** TypeScript 5 (strict mode, sin `any`, estructuras inmutables)

## 3. Commands

- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Typecheck:** `npx tsc --noEmit`

## 4. Project Structure

```text
app/
  _data/
    types.ts                   → Contratos e interfaces de dominio (Teacher, ClassroomSummary, FeedPost, PostCategory, NavItem)
    mock.ts                    → Datos ficticios normalizados + selectores de acceso (getCurrentTeacher, getClassroomSummary, getFeedPosts, getNavigationItems)
    index.ts                   → Barrel export para importar desde "@/app/_data"
  globals.css                  → Configuración de Tailwind v4 (@theme inline con Fredoka y Nunito) y estilos de scrollbar
  layout.tsx                   → Carga de Google Fonts (Fredoka, Nunito) y estructura raíz en español (<html lang="es">)
  page.tsx                     → Vista principal del Feed (/) que consume los selectores de "@/app/_data"

components/
  layout/
    sidebar.tsx                → Sidebar fijo en desktop (248px) + Topbar móvil con botón hamburguesa y Drawer lateral deslizable
    nav-item.tsx               → Enlace de navegación reutilizable con variante activa/inactiva
  feed/
    feed-header.tsx            → Encabezado ("GUARDERÍA · SALA SOLES", "Buenas, Caro", "12 niños · martes 17 jun")
    quick-composer.tsx         → Caja rápida "Compartí un momento…" con avatar e ícono de cámara
    post-card.tsx              → Tarjeta de publicación (cabecera, destinatario, texto, foto opcional dashed, likes, comentarios, botón Editar)
    post-badge.tsx             → Pill de categoría (LOGRO, ACTIVIDAD, ANUNCIO) con paleta visual mapeada
  ui/
    avatar.tsx                 → Avatar circular reutilizable (inicial con colores personalizados o ícono SVG)
    icons.tsx                  → Íconos SVG del diseño centralizados y tipados
```

## 5. Data Access Architecture (`app/_data/`)

### `app/_data/types.ts`

```ts
export type PostCategory = "logro" | "actividad" | "anuncio";

export type NavIconName = "home" | "users" | "bell" | "user";

export interface TeacherProfile {
  readonly id: string;
  readonly firstName: string;
  readonly fullName: string;
  readonly initial: string;
  readonly roleLabel: string;
  readonly avatarBg: string;
  readonly avatarText: string;
}

export interface ClassroomSummary {
  readonly id: string;
  readonly badgeLabel: string;
  readonly name: string;
  readonly childrenCount: number;
  readonly dateLabel: string;
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: NavIconName;
  readonly active?: boolean;
}

export interface FeedPost {
  readonly id: string;
  readonly authorName: string;
  readonly authorInitial?: string;
  readonly authorIcon?: "megaphone";
  readonly avatarBg: string;
  readonly avatarText: string;
  readonly timeLabel: string;
  readonly publishedByLabel: string;
  readonly category: PostCategory;
  readonly recipientLabel: string;
  readonly content: string;
  readonly photoCaption?: string;
  readonly likesCount: number;
  readonly commentsCount: number;
}
```

### `app/_data/mock.ts`

- Almacena las constantes inmutables (`MOCK_TEACHER`, `MOCK_CLASSROOM`, `MOCK_NAV_ITEMS`, `MOCK_FEED_POSTS`) con los textos, horas y colores exactos de `references/pantallas/feed.dc.html`.
- Expone funciones selectoras limpias:
  - `getCurrentTeacher(): TeacherProfile`
  - `getClassroomSummary(): ClassroomSummary`
  - `getNavigationItems(): readonly NavItem[]`
  - `getFeedPosts(): readonly FeedPost[]`
  - `getHomeFeedPageData()` (agregador conveniente para `app/page.tsx`)

## 6. Design & Responsive Specification

### Paleta de Colores y Tokens Fieles al Mockup

- **Fondo general:** `bg-[#F6ECDF]`
- **Texto principal:** `text-[#3F362E]`
- **Superficie tarjetas / sidebar:** `bg-[#FFFDF9]` con borde `border-[#ECE0D0]`
- **Acento terracota / primario:**
  - Gradiente botón principal: `bg-[linear-gradient(180deg,#F4977E,#EE8164)]` con sombra `shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]`
  - Gradiente logo: `bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]`
  - Item activo nav: `bg-[#FBE3D8] text-[#D9583C]`
- **Badges de categoría (`PostBadge`):**
  - `logro`: fondo `bg-[#CFEBD8]`, punto `bg-[#3E9B6C]`, texto `text-[#3E9B6C]` (`LOGRO`)
  - `actividad`: fondo `bg-[#C7E7F1]`, punto `bg-[#2E89A6]`, texto `text-[#2E89A6]` (`ACTIVIDAD`)
  - `anuncio`: fondo `bg-[#CCD8F4]`, punto `bg-[#4E72C8]`, texto `text-[#4E72C8]` (`ANUNCIO`)

### Comportamiento Responsive y Drawer Hamburguesa

1. **Desktop (`md` / `>= 768px`):**
   - Layout horizontal `flex min-h-screen bg-[#F6ECDF]`.
   - `<aside>` lateral izquierdo fijo de `w-[248px] shrink-0 sticky top-0 h-screen` visible (`hidden md:flex`).
   - `<main>` con scroll independiente (`md:h-screen md:overflow-y-auto`) y contenedor centrado `max-w-[760px] mx-auto px-[40px] pt-[34px] pb-[80px]`.
2. **Mobile (`< 768px`):**
   - **Header superior móvil (`md:hidden`):** Barra sticky superior con fondo `#FFFDF9`, borde inferior `#ECE0D0`, logo `OpenDayCare · Sala Soles` y botón **hamburguesa** (`aria-label="Abrir menú"`).
   - **Drawer lateral (`md:hidden`):**
     - Overlay oscuro semitransparente (`fixed inset-0 z-40 bg-[#3F362E]/40 backdrop-blur-[1px]`) que cierra el drawer al hacer clic.
     - Panel deslizante izquierdo (`fixed inset-y-0 left-0 z-50 w-[248px] bg-[#FFFDF9] border-r border-[#ECE0D0] p-[24px_16px] flex flex-col transition-transform duration-200`) con botón de cierre (`X`), el mismo contenido del sidebar y soporte para cerrar con tecla `Escape`.
   - **Espaciados adaptados:** Contenedor principal con `px-4 pt-6 pb-14`, tarjetas con `p-4 sm:px-[22px] sm:py-[20px]` y cabeceras flexibles para evitar desbordes horizontales en pantallas de `320px–375px`.

## 7. Boundaries

- **Always do:** Mantener finales de línea LF, tipos estrictos sin `any`, valores de estilo idénticos a `feed.dc.html` y componentes desacoplados de los datos mediante `app/_data`.
- **Ask first:** Instalar dependencias externas o crear páginas fuera de `/`.
- **Never do:** Modificar archivos en `references/` o agregar lógica de mutación/base de datos que no fue solicitada.

## 8. Tasks Breakdown

- [x] **Task 1: Configurar fuentes (`Fredoka` y `Nunito`) y estilos globales**
  - **Files:** `app/layout.tsx`, `app/globals.css`
  - **Acceptance:** `Fredoka` (400–700) y `Nunito` (400–800, italic 400) cargadas con `next/font/google`, registradas como `--font-fredoka` y `--font-nunito` en `@theme inline`, scrollbar estilizado y fondo `#F6ECDF`.
  - **Verify:** `npx tsc --noEmit`

- [x] **Task 2: Crear capa modular de datos ficticios (`app/_data/`)**
  - **Files:** `app/_data/types.ts`, `app/_data/mock.ts`, `app/_data/index.ts`
  - **Acceptance:** Tipos exportados e inmutables; `mock.ts` contiene los datos exactos de Caro Giménez, Sala Soles, navegación y las 3 publicaciones (`Mateo - LOGRO`, `Mateo - ACTIVIDAD` con foto, `Anuncio general - ANUNCIO`) junto con selectores de acceso.
  - **Verify:** `npx tsc --noEmit`

- [x] **Task 3: Crear componentes base UI (`components/ui/`)**
  - **Files:** `components/ui/icons.tsx`, `components/ui/avatar.tsx`
  - **Acceptance:** Todos los SVGs del mockup (sol, plus, home, niños, campana, usuario, logout, cámara, imagen, corazón, comentario, megáfono, hamburguesa, cerrar) tipados y reutilizables; componente `Avatar` soporta inicial o ícono.
  - **Verify:** `npx tsc --noEmit`

- [x] **Task 4: Crear Sidebar Desktop + Drawer Hamburguesa Mobile (`components/layout/`)**
  - **Files:** `components/layout/nav-item.tsx`, `components/layout/sidebar.tsx`
  - **Acceptance:** En desktop se muestra el `<aside>` de `248px` idéntico al mockup; en mobile se muestra la barra superior con botón hamburguesa que abre/cierra el Drawer lateral con overlay.
  - **Verify:** `npx tsc --noEmit`

- [x] **Task 5: Crear componentes del Feed y ensamblar `app/page.tsx`**
  - **Files:** `components/feed/post-badge.tsx`, `components/feed/feed-header.tsx`, `components/feed/quick-composer.tsx`, `components/feed/post-card.tsx`, `app/page.tsx`
  - **Acceptance:** `app/page.tsx` obtiene los datos desde `@/app/_data` y renderiza el layout completo; los botones/enlaces son estáticos (`href="#"` o `<button type="button">`) sin errores.
  - **Verify:** `npx tsc --noEmit` y `npm run build`

- [x] **Task 6: Verificación visual y de calidad**
  - **Files:** Capturas en `.playwright-mcp/`
  - **Acceptance:** `npm run build` exitoso, sin errores de ESLint en `app/` ni `components/`, y validación visual en desktop (`1280x800`) y mobile (`375x812` con Drawer cerrado y abierto).
  - **Verify:** `npm run build`, `npm run lint` y Playwright MCP.
