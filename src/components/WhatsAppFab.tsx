'use client';

import { useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { site } from '@/lib/site';
import { startPulse } from '@/lib/animations/pulse';

export function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startPulse(ref.current);
  }, []);

  return (
    <a
      ref={ref}
      href={site.whatsappCta}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 flex items-center gap-2 rounded-full bg-[#1b8c4e] px-4 py-3.5 text-white shadow-lift transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <Icon name="WhatsappLogo" size={24} weight="fill" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
