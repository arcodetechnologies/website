# ARCODE Technologies — sitio corporativo

Landing page en React + Vite con una dirección visual editorial y limpia: tipografía de alto contraste, mucho aire, tarjetas con luz interactiva y movimiento sutil al hacer scroll.

## Requisitos

- Node.js 20.19+ or 22.12+
- npm

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
npm run preview
```

## Sistema de diseño

- **Base:** fondo `#f6f8fc`, superficies blancas, tinta `#060c1c`, azul eléctrico `#2f6bff` y cian `#12c2e9`.
- **Tipografía:** Manrope para títulos, DM Sans para cuerpo e Instrument Serif italic para una palabra de acento por titular.
- **Layout:** contenedor de 1240 px, gutter fluido y ritmo vertical de `clamp(64px, 9vw, 120px)`.
- **Componentes:** radios de 10–36 px, bordes de 1 px, tres niveles de sombra y botones tipo píldora.
- **Movimiento:** entrada del hero, reveals al hacer scroll, contadores animados, marquee de tecnologías, spotlight en tarjetas, acordeón con altura animada y barra de progreso.

Todos los tokens viven en `src/styles/variables.css`. Los estilos están separados en:

- `global.css`: base, navegación, footer y utilidades.
- `sections.css`: hero y secciones de contenido.
- `animations.css`: keyframes, reveals y `prefers-reduced-motion`.

## Skills de diseño

El proyecto incluye dos skills para mantener el criterio de diseño en futuras iteraciones:

- `.claude/skills/frontend-design/SKILL.md`: jerarquía, tipografía, color, espaciado y checklist de calidad.
- `.claude/skills/web-motion/SKILL.md`: patrones de movimiento, rendimiento y accesibilidad.

## Antes de publicar

- Reemplazar `https://example.com` en `index.html`, `src/i18n/LanguageContext.jsx`, `scripts/prerender.mjs`, `public/robots.txt` y `public/sitemap.xml` por el dominio definitivo.
- Ejecutar `npm run build` y publicar el contenido de `dist/`; incluye las páginas prerenderizadas en español y `/en/`.
- Verificar el dominio en Google Search Console y enviar `/sitemap.xml`.
- Sustituir las vistas conceptuales de proyectos por proyectos reales y autorizados.
- Revisar y confirmar cualquier cifra, testimonio y afirmación comercial.
- Conectar el formulario de contacto a un backend o servicio de formularios.
- Reemplazar el retrato editorial del fundador por la fotografía final aprobada.
- Revisar en dispositivos reales y con `prefers-reduced-motion` activado.
