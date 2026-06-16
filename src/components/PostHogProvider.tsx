'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { trackEvent, getPageType } from '@/lib/analytics';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let started = false;

/** Reglas de auto-detección por texto/destino del elemento clickeado. */
const RULES: { re: RegExp; event: string }[] = [
  { re: /(wa\.me|api\.whatsapp\.com|whatsapp)/i, event: 'click_whatsapp' },
  { re: /comprar/i, event: 'click_comprar' },
  { re: /(vender|publicar)/i, event: 'click_vender' },
  { re: /(registrar|registro|crear cuenta|sign\s?up)/i, event: 'click_registro' },
  { re: /(contacto|consultar|consulta)/i, event: 'lead_generado' },
];

function initPostHog() {
  if (started || !KEY || typeof window === 'undefined') return;
  started = true;
  posthog.init(KEY, {
    api_host: HOST,
    // Pageview manual (lo manejamos en App Router para no duplicar al navegar).
    capture_pageview: false,
    capture_pageleave: true,
    // Autocapture solo de clicks (no inputs).
    autocapture: { dom_event_allowlist: ['click'] },
    // Menos PII: solo crea perfiles para usuarios identificados.
    person_profiles: 'identified_only',
    respect_dnt: true,
    // Session replay preparado, pero con privacidad fuerte.
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-ph-mask]',
      maskInputOptions: { password: true, email: true },
    },
    // Limpia posibles datos sensibles de las propiedades antes de enviar.
    sanitize_properties: (props) => {
      const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
      const LONGNUM = /\b\d{6,}\b/g;
      for (const k of Object.keys(props)) {
        const v = props[k];
        if (typeof v === 'string') props[k] = v.replace(EMAIL, '[email]').replace(LONGNUM, '[num]');
      }
      return props;
    },
  });
}

function onGlobalClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  const el = target?.closest('a, button') as HTMLElement | null;
  if (!el) return;
  const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
  const href = el.getAttribute('href') || '';
  const aria = el.getAttribute('aria-label') || '';
  const hay = `${text} ${href} ${aria}`;
  for (const r of RULES) {
    if (r.re.test(hay)) {
      trackEvent(r.event, {
        boton_texto: text || undefined,
        link_destino: href || undefined,
        source: 'autocapture',
      });
      break;
    }
  }
}

/** Captura $pageview + eventos por tipo de página en cada cambio de ruta. */
function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!started) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    posthog.capture('$pageview', { $current_url: window.location.origin + url });

    const type = getPageType(pathname);
    if (type === 'producto') {
      trackEvent('producto_visto', { slug: pathname.split('/').pop() });
    } else if (type === 'categoria') {
      trackEvent('categoria_vista', { slug: pathname.split('/').pop() });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
    if (!KEY) return;
    document.addEventListener('click', onGlobalClick, true);
    return () => document.removeEventListener('click', onGlobalClick, true);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageView />
      </Suspense>
      {children}
    </>
  );
}
