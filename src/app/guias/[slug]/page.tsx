import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { FAQ } from '@/components/FAQ';
import { Disclaimer } from '@/components/Disclaimer';
import { Icon } from '@/components/Icon';
import { allGuides, getGuide, allGuideSlugs } from '@/data/guides';

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: `${guide.titulo} · Materia Natural`,
    description: guide.descripcion,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      title: guide.titulo,
      description: guide.descripcion,
      url: `/guias/${guide.slug}`,
      type: 'article',
    },
  };
}

export default function GuiaPage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  // 3-4 related guides from same category, fallback to any
  const related = allGuides
    .filter((g) => g.slug !== guide.slug && g.categoria === guide.categoria)
    .slice(0, 4)
    .concat(
      allGuides
        .filter((g) => g.slug !== guide.slug && g.categoria !== guide.categoria)
        .slice(0, 4)
    )
    .slice(0, 4);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://materianatural.com.ar' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Guías',
          item: 'https://materianatural.com.ar/guias',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: guide.titulo,
          item: `https://materianatural.com.ar/guias/${guide.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-10 sm:pt-12">
        <Container width="wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted" aria-label="Migas de pan">
            <Link href="/" className="transition-colors hover:text-ink">
              Inicio
            </Link>
            <Icon name="CaretDown" size={13} className="-rotate-90" />
            <Link href="/guias" className="transition-colors hover:text-ink">
              Guías
            </Link>
            <Icon name="CaretDown" size={13} className="-rotate-90" />
            <span className="text-ink-soft line-clamp-1">{guide.titulo}</span>
          </nav>

          {/* Two-column layout */}
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <main className="lg:col-span-2" aria-label="Contenido de la guía">
              <Reveal>
                <span className="inline-block text-xs font-medium text-brand bg-brand/8 rounded-full px-2.5 py-0.5">
                  {guide.categoria}
                </span>
                <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                  {guide.titulo}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{guide.intro}</p>
              </Reveal>

              <Reveal className="mt-10">
                <FAQ items={guide.faq} />
              </Reveal>

              {guide.productosRelacionados.length > 0 && (
                <Reveal className="mt-14">
                  <h2 className="font-display text-2xl text-ink">Productos relacionados</h2>
                  <p className="mt-1 text-sm text-muted">
                    Productos que se mencionan en esta guía.
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {guide.productosRelacionados.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/productos/${slug}`}
                          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-brand hover:text-ink"
                        >
                          <Icon name="Leaf" size={15} weight="duotone" className="text-brand" />
                          {slug
                            .split('-')
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(' ')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Disclaimer className="mt-16" />
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Guías relacionadas">
              <div className="sticky top-24">
                <Reveal>
                  <h2 className="font-display text-lg text-ink">Guías relacionadas</h2>
                  <ul className="mt-4 space-y-3">
                    {related.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/guias/${g.slug}`}
                          className="group flex flex-col gap-1 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-brand"
                        >
                          <span className="text-xs font-medium text-brand">{g.categoria}</span>
                          <span className="text-sm leading-snug text-ink-soft group-hover:text-ink transition-colors">
                            {g.titulo}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-line pt-5">
                    <Link
                      href="/guias"
                      className="flex items-center gap-1.5 text-sm text-brand hover:underline"
                    >
                      Ver todas las guías
                      <Icon name="ArrowRight" size={14} weight="bold" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
