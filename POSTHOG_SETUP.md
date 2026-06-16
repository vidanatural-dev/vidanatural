# PostHog — Guía de instalación y uso

Integración de **PostHog** en el sitio (Next.js 14 App Router). Convive con Google
Analytics 4 (no lo reemplaza) y respeta privacidad.

## 1. Archivos modificados / creados

| Archivo | Qué hace |
|---|---|
| `src/lib/analytics.ts` | **Nuevo.** Utilidad `trackEvent(nombre, props)` + `getPageType()`. Seguro en SSR. |
| `src/components/PostHogProvider.tsx` | **Nuevo.** Inicializa PostHog una sola vez, captura pageviews en cada navegación, auto-detecta clics por palabra clave y configura session replay con privacidad. |
| `src/app/layout.tsx` | Envuelve la app con `<PostHogProvider>`. GA4 sigue intacto. |
| `src/components/ContactForm.tsx` | Dispara `formulario_enviado` y `lead_generado` al enviar (sin datos personales). |
| `src/components/GlobalSearch.tsx` | Dispara `busqueda_realizada` (con debounce). |
| `src/components/Footer.tsx` | Email y teléfono marcados con `data-ph-mask` (se ocultan en el replay). |
| `.env.example` | **Nuevo.** Placeholders de variables de entorno. |
| `package.json` | Dependencia `posthog-js`. |

## 2. Dónde pegar tu Project API Key

1. En PostHog: **Project Settings → Project API Key** (empieza con `phc_...`).
2. Local: creá un archivo `.env.local` en `dietetica/` con:

   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_tu_clave_aca
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```

3. En producción (Railway): agregá esas dos variables en **Variables** del servicio y
   redeployá. Si tu proyecto PostHog es de la región UE, usá `https://eu.i.posthog.com`.

> Sin la key, PostHog simplemente **no se inicializa** (no rompe nada). Nunca subas la
> key real al repo: va en `.env.local` / variables de Railway, no en `.env.example`.

## 3. Cómo verificar que funciona

1. Con la key cargada, abrí el sitio y navegá por algunas páginas.
2. En PostHog → **Activity / Live events**: deberías ver `$pageview`, y al hacer clic en
   WhatsApp/Contacto, eventos como `click_whatsapp` o `lead_generado`.
3. En la consola del navegador no debe haber errores de PostHog ni de hidratación.
4. Verificación rápida en consola del navegador: `window.posthog` debe existir y
   `window.posthog.__loaded` ser `true`.

## 4. Eventos que se están midiendo

**Automáticos**
- `$pageview` — en cada cambio de ruta (sin duplicar al navegar).
- `$pageleave` — al salir de la página.
- Autocapture de **clics** (solo clics, no inputs).
- `producto_visto` — al entrar a `/productos/<slug>` (incluye `slug`).
- `categoria_vista` — al entrar a `/usos/<slug>` (incluye `slug`).

**Auto-detección por palabra clave** (texto o destino del botón/link):
| Coincide con | Evento |
|---|---|
| `whatsapp`, `wa.me`, `api.whatsapp.com` | `click_whatsapp` |
| `comprar` | `click_comprar` |
| `vender`, `publicar` | `click_vender` |
| `registrar`, `registro`, `crear cuenta`, `sign up` | `click_registro` |
| `contacto`, `consultar`, `consulta` | `lead_generado` |

Cada uno envía: `boton_texto`, `link_destino`, `page`, `page_type`, `timestamp`.

**Manuales (ya cableados)**
- `formulario_enviado`, `lead_generado` — formulario de contacto.
- `busqueda_realizada` — buscador global (incluye `query` y `resultados`).

**Disponibles para usar cuando sumes esas funciones** (ej. e-commerce):
`registro_inicio`, `registro_completo`, `checkout_iniciado`, `checkout_abandonado`.

## 5. Cómo agregar nuevos eventos

Importá la utilidad y llamá `trackEvent` desde cualquier componente cliente:

```tsx
import { trackEvent } from '@/lib/analytics';

trackEvent('checkout_iniciado', {
  source: 'boton_principal_landing',
  // ...las props que quieras (sin datos sensibles)
});
```

`trackEvent` agrega solo `page`, `page_type` y `timestamp`. No pases emails, teléfonos,
DNI ni datos de tarjetas.

## 6. Privacidad aplicada

- **Session replay activado pero enmascarado:** `maskAllInputs: true` (todos los inputs
  ocultos), más `maskInputOptions` para password/email.
- **`maskTextSelector: '[data-ph-mask]'`** → el email y el teléfono del footer se ocultan
  en la grabación. Para ocultar cualquier otro texto, agregale `data-ph-mask`.
- **`sanitize_properties`** limpia automáticamente emails y secuencias largas de dígitos
  de las propiedades antes de enviarlas.
- **`person_profiles: 'identified_only'`** → menos datos personales por defecto.
- **`respect_dnt: true`** → respeta "Do Not Track" del navegador.
- **Autocapture solo de clics** (no captura el contenido de formularios).
- No se envían nombre, email ni mensaje del formulario; solo el evento.

## Convivencia con Google Analytics
GA4 sigue cargando vía `NEXT_PUBLIC_GA_ID` en `layout.tsx`. PostHog y GA funcionan en
paralelo, sin pisarse.
