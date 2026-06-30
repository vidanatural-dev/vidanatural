# Materia · Guía de productos naturales

Sitio informativo sobre productos naturales y de dietética: qué son, composición, usos tradicionales, recetas y precauciones. Contenido educativo, no médico.

**Producción:** [materianatural.site](https://www.materianatural.site)

## Stack

- [Next.js 14](https://nextjs.org/) (App Router, SSG)
- TypeScript + Tailwind CSS
- PostHog (analítica) + GA4 (opcional)
- Supabase (formulario de contacto)
- Railway (hosting)

## Requisitos

- Node.js ≥ 20

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar variables según necesidad
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (~3700 páginas estáticas) |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint (Next.js) |
| `npm run recipes:generate` | Regenerar snapshot de recetas (opcional) |

## Variables de entorno

Ver `.env.example`. Las esenciales:

- `NEXT_PUBLIC_POSTHOG_KEY` — analítica (opcional en local)
- `SUPABASE_URL` + `SUPABASE_ANON_KEY` — formulario de contacto
- `GOOGLE_SITE_VERIFICATION` — Search Console

## Estructura

```
src/
  app/          # Rutas (productos, recetas, guías, usos, contacto)
  components/   # UI reutilizable
  data/         # Catálogo de productos, recetas y guías
  lib/          # Utilidades (fuentes, analytics, búsqueda)
public/
  productos/    # Packshots y fotos locales
  recetas/      # Fotos de familias de recetas
```

## Despliegue

El proyecto se despliega en Railway conectado al repo `vidanatural-dev/vidanatural`. Railway detecta Next.js automáticamente; configurá las variables de entorno en el panel del servicio.
