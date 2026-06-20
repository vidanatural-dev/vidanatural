import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { allGuides } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Guías de productos naturales · Materia Natural',
  description:
    'Guías prácticas sobre productos naturales: beneficios, usos, dosis, precauciones y preguntas frecuentes. Todo lo que necesitás saber antes de empezar.',
  alternates: { canonical: '/guias' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://materianatural.com.ar' },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: 'https://materianatural.com.ar/guias' },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Guías de productos naturales',
      numberOfItems: allGuides.length,
      itemListElement: allGuides.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.titulo,
        url: `https://materianatural.com.ar/guias/${g.slug}`,
      })),
    },
  ],
};

export default function GuiasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-10 sm:pt-14">
        <Container width="wide">
          <section aria-labelledby="guias-heading">
            <Reveal>
              <h1
                id="guias-heading"
                className="font-display text-4xl text-ink sm:text-5xl"
              >
                Guías sobre productos naturales
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Todo lo que necesitás saber sobre cada producto: para qué sirve, cómo tomarlo,
                qué precauciones tener y las preguntas más frecuentes. Guías claras, sin
                exageraciones.
              </p>
            </Reveal>

            <Reveal className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guias/${g.slug}`}
                  className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-brand"
                >
                  <span className="inline-block text-xs font-medium text-brand bg-brand/8 rounded-full px-2.5 py-0.5">
                    {g.categoria}
                  </span>
                  <h2 className="mt-3 font-display text-lg leading-snug text-ink group-hover:text-brand transition-colors">
                    {g.titulo}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-2">
                    {g.descripcion}
                  </p>
                </Link>
              ))}
            </Reveal>
          </section>
        </Container>
      </div>
    </>
  );
}
