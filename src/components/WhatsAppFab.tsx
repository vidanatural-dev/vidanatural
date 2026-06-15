import { Icon } from './Icon';
import { site } from '@/lib/site';

/**
 * Botón flotante de WhatsApp, presente en todo el sitio.
 */
export function WhatsAppFab() {
  return (
    <a
      href={site.whatsappCta}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-lift transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
    >
      <Icon name="WhatsappLogo" size={24} weight="fill" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
