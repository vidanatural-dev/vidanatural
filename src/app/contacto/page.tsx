import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Sugerí productos para sumar a la guía o escribinos tu consulta sobre el sitio. Contenido informativo, no médico.',
};

export default function ContactoPage() {
  return (
    <div className="pt-12 sm:pt-16">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">Contacto</span>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              ¿Querés que sumemos un producto?
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Estamos ampliando la guía por casos de uso. Si hay un producto natural que te gustaría
              ver explicado, escribinos. También respondemos consultas sobre el sitio.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={site.whatsappCta}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-white"
                style={{ background: '#25D366' }}
              >
                <Icon name="WhatsappLogo" size={18} weight="fill" />
                {site.whatsapp}
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                <Icon name="Envelope" size={18} weight="fill" />
                Escribir un email
              </a>
            </div>

            <ul className="mt-8 space-y-4">
              {[
                'Sugerir un producto nuevo para una ficha',
                'Avisar sobre información que conviene revisar',
                'Dudas sobre cómo usar el sitio',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink-soft">
                  <span className="text-brand">
                    <Icon name="Leaf" size={18} weight="fill" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-md border border-line bg-surface-2 p-4 text-sm text-ink-soft">
              Importante: no respondemos consultas médicas ni indicamos tratamientos. Para eso,
              consultá con un profesional de la salud.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
