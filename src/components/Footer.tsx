import Link from 'next/link';
import { Container } from './Container';
import { Icon } from './Icon';
import { site } from '@/lib/site';
import { useCases } from '@/data/useCases';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-brand-deep text-on-brand">
      <Container width="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-semibold">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-on-brand-soft">
              {site.description}
            </p>
            <div className="mt-5 space-y-2.5 text-sm">
              <a
                href={site.whatsappCta}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-on-brand/90 transition-colors hover:text-on-brand"
              >
                <Icon name="WhatsappLogo" size={18} weight="fill" />
                {site.whatsapp}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-on-brand/90 transition-colors hover:text-on-brand"
              >
                <Icon name="Envelope" size={18} weight="fill" />
                {site.email}
              </a>
            </div>
          </div>

          <nav aria-label="Navegación del pie">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-on-brand-soft">
              Explorar
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-on-brand/90 transition-colors hover:text-on-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Casos de uso">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-on-brand-soft">
              Por uso
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {useCases.slice(0, 5).map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/usos/${u.slug}`}
                    className="text-on-brand/90 transition-colors hover:text-on-brand"
                  >
                    {u.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-on-brand/15 pt-6 text-xs text-on-brand-soft">
          <p>
            {year} {site.name}. Sitio informativo sobre productos naturales. No constituye consejo
            médico ni reemplaza la consulta profesional.
          </p>
        </div>
      </Container>
    </footer>
  );
}
