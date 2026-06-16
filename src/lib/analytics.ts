import posthog from 'posthog-js';

/**
 * Utilidades de analítica (PostHog). Conviven con Google Analytics.
 * Todo es seguro en SSR: si no hay window o PostHog no está cargado, no hace nada.
 */

export type PageType =
  | 'home'
  | 'producto'
  | 'productos'
  | 'categoria'
  | 'usos'
  | 'receta'
  | 'recetas'
  | 'sobre'
  | 'contacto'
  | 'otra';

/** Detecta el tipo de página a partir del pathname. */
export function getPageType(path?: string): PageType {
  const p = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  if (p === '/') return 'home';
  if (/^\/productos\/[^/]+/.test(p)) return 'producto';
  if (p === '/productos') return 'productos';
  if (/^\/usos\/[^/]+/.test(p)) return 'categoria';
  if (p === '/usos') return 'usos';
  if (/^\/recetas\/[^/]+/.test(p)) return 'receta';
  if (p === '/recetas') return 'recetas';
  if (p.startsWith('/sobre')) return 'sobre';
  if (p.startsWith('/contacto')) return 'contacto';
  return 'otra';
}

/** ¿PostHog está inicializado? */
export function phReady(): boolean {
  return typeof window !== 'undefined' && Boolean((posthog as unknown as { __loaded?: boolean }).__loaded);
}

/**
 * Envía un evento a PostHog con propiedades base (página, tipo, fecha/hora).
 * Uso: trackEvent('click_whatsapp', { source: 'boton_principal_landing' })
 */
export function trackEvent(name: string, props: Record<string, unknown> = {}): void {
  if (!phReady()) return;
  try {
    posthog.capture(name, {
      page: window.location.pathname,
      page_type: getPageType(),
      timestamp: new Date().toISOString(),
      ...props,
    });
  } catch {
    /* noop: nunca romper la UI por analítica */
  }
}
