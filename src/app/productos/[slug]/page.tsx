import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { ProductImage } from '@/components/ProductImage';
import { ProductCard } from '@/components/ProductCard';
import { FAQ } from '@/components/FAQ';
import { Disclaimer } from '@/components/Disclaimer';
import { TableOfContents } from '@/components/TableOfContents';
import { RecipeCard } from '@/components/RecipeCard';
import { Icon } from '@/components/Icon';
import { allProductSlugs, getProduct, relatedProducts } from '@/data/products';
import { recipesByProduct } from '@/data/recipes';
import { useCaseBySlug } from '@/data/useCases';

export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.nombre}: qué es, usos y precauciones`,
    description: product.resumen,
    alternates: { canonical: `/productos/${params.slug}` },
    openGraph: { title: product.nombre, description: product.resumen, type: 'article' },
  };
}

const toc = [
  { id: 'que-es', label: 'Qué es' },
  { id: 'composicion', label: 'Composición' },
  { id: 'usos', label: 'Usos tradicionales' },
  { id: 'consumo', label: 'Cómo se consume' },
  { id: 'precauciones', label: 'Precauciones' },
  { id: 'faq', label: 'Preguntas frecuentes' },
  { id: 'fuentes', label: 'Fuentes' },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const recetas = recipesByProduct(product.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${product.nombre}: qué es, usos y precauciones`,
        description: product.resumen,
        about: product.nombreCientifico ?? product.nombre,
      },
      {
        '@type': 'FAQPage',
        mainEntity: product.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="pt-8 sm:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== Encabezado ===== */}
      <Container width="wide">
        <nav className="flex items-center gap-1.5 text-sm text-muted" aria-label="Migas de pan">
          <Link href="/" className="transition-colors hover:text-ink">Inicio</Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <Link href="/productos" className="transition-colors hover:text-ink">Productos</Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <span className="text-ink-soft">{product.nombre}</span>
        </nav>

        <div className="mt-6 grid items-center gap-8 pb-12 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
          <Reveal>
            <span className="badge">{product.categoria}</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
              {product.nombre}
            </h1>
            {product.nombreCientifico && (
              <p className="mt-2 font-mono text-sm italic text-muted">{product.nombreCientifico}</p>
            )}
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">{product.resumen}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.casosDeUso.map((slug) => {
                const u = useCaseBySlug(slug);
                if (!u) return null;
                return (
                  <Link key={slug} href={`/usos/${slug}`} className="chip">
                    <Icon name={u.icon} size={15} weight="bold" />
                    {u.nombre}
                  </Link>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-surface-2 shadow-lift">
              <ProductImage product={product} priority sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* ===== Cuerpo ===== */}
      <Container width="wide" className="pb-8">
        <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>

          <div className="min-w-0">
            <Disclaimer className="mb-12" />

            <section id="que-es" className="scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Qué es</h2>
              <div className="prose-materia mt-4">
                <p>{product.queEs}</p>
              </div>
            </section>

            <section id="composicion" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Composición y nutrientes</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.composicion.map((c, i) => (
                  <li key={i} className="flex gap-3 rounded-md border border-line bg-surface p-4">
                    <span className="mt-0.5 shrink-0 text-brand">
                      <Icon name="Leaf" size={16} weight="fill" />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-ink-soft">{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="usos" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Usos tradicionales</h2>
              <p className="mt-3 text-sm text-muted">
                Usos populares y culinarios. No implican efectos médicos comprobados.
              </p>
              <ul className="prose-materia mt-4 space-y-3">
                {product.usosTradicionales.map((u, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="consumo" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Cómo se consume</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {product.comoSeConsume.map((c, i) => (
                  <div key={i} className="rounded-md border border-line bg-surface p-5">
                    <p className="font-display text-lg text-ink">{c.forma}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{c.detalle}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                Seguí siempre las indicaciones del envase y consultá a un profesional de la salud.
              </p>
            </section>

            <section id="precauciones" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Precauciones</h2>
              <div className="mt-5 rounded-lg border border-line bg-surface-2 p-6">
                <ul className="space-y-3">
                  {product.precauciones.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-accent-ink">
                        <Icon name="Warning" size={17} weight="fill" />
                      </span>
                      <span className="text-[0.97rem] leading-relaxed text-ink-soft">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="font-display text-xl text-ink">Contraindicaciones generales</h3>
                <p className="prose-materia mt-3">{product.contraindicaciones}</p>
              </div>
            </section>

            <section id="faq" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Preguntas frecuentes</h2>
              <div className="mt-5">
                <FAQ items={product.faq} />
              </div>
            </section>

            <section id="fuentes" className="mt-14 scroll-mt-24">
              <h2 className="font-display text-3xl text-ink">Fuentes</h2>
              <p className="mt-3 text-sm text-muted">
                Organismos y entidades de referencia para profundizar. La información puede
                actualizarse con el tiempo.
              </p>
              <ul className="mt-5 space-y-2.5">
                {product.fuentes.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-brand">
                      <Icon name="BookOpen" size={17} weight="duotone" />
                    </span>
                    {f.url ? (
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.97rem] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-brand-deep hover:decoration-brand"
                      >
                        {f.nombre}
                      </a>
                    ) : (
                      <span className="text-[0.97rem] text-ink-soft">{f.nombre}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>

      {/* ===== Recetas con este producto ===== */}
      {recetas.length > 0 && (
        <section className="border-t border-line py-16">
          <Container width="wide">
            <h2 className="font-display text-3xl text-ink">Recetas con {product.nombre.toLowerCase()}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recetas.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===== Relacionados ===== */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface-2/50 py-16">
          <Container width="wide">
            <h2 className="font-display text-3xl text-ink">Productos relacionados</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
