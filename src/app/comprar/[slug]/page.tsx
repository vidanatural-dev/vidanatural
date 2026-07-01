import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { StoreProductGallery } from '@/components/StoreProductGallery';
import { StoreProductCard } from '@/components/StoreProductCard';
import { StoreProductActions } from '@/components/StoreProductActions';
import { Icon } from '@/components/Icon';
import {
  allStoreSlugs,
  getStoreProduct,
  relatedStoreProducts,
} from '@/data/store/products';
import { formatPrice } from '@/lib/price';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return allStoreSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getStoreProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.nombre} — ${formatPrice(product.precio)}`,
    description: `Comprá ${product.nombre} en ${site.name}. Precio: ${formatPrice(product.precio)}. Pedí por WhatsApp.`,
    alternates: { canonical: `/comprar/${params.slug}` },
    openGraph: {
      title: product.nombre,
      description: `Precio: ${formatPrice(product.precio)}`,
      type: 'website',
      images: (product.imagenes ?? [product.imagen]).map((url) => ({
        url: url.startsWith('/') ? `${site.url}${url}` : url,
      })),
    },
  };
}

export default function StoreProductPage({ params }: { params: { slug: string } }) {
  const product = getStoreProduct(params.slug);
  if (!product) notFound();

  const related = relatedStoreProducts(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    image: product.imagenes ?? product.imagen,
    offers: {
      '@type': 'Offer',
      price: product.precio,
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
      url: `${site.url}/comprar/${product.slug}`,
    },
  };

  return (
    <article className="pt-8 sm:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container width="wide">
        <nav className="flex items-center gap-1.5 text-sm text-muted" aria-label="Migas de pan">
          <Link href="/" className="transition-colors hover:text-ink">
            Inicio
          </Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <Link href="/comprar" className="transition-colors hover:text-ink">
            Comprar
          </Link>
          <Icon name="CaretDown" size={13} className="-rotate-90" />
          <span className="line-clamp-1 text-ink-soft">{product.nombre}</span>
        </nav>

        <div className="mt-6 grid items-start gap-10 pb-14 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <StoreProductGallery product={product} priority />
          </Reveal>

          <Reveal delay={0.08}>
            <span className="inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
              {product.categoria}
            </span>
            <h1 className="mt-4 font-display text-h1 text-ink">{product.nombre}</h1>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="font-mono text-4xl font-bold text-amber-600 dark:text-amber-400">
                {formatPrice(product.precio)}
              </p>
              <p className="pb-1 text-sm text-muted">Precio en pesos argentinos</p>
            </div>

            <div className="mt-8">
              <StoreProductActions product={product} />
            </div>

            <ul className="mt-8 space-y-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} weight="bold" className="text-amber-500" />
                Elegí cantidad y agregá al carrito
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} weight="bold" className="text-amber-500" />
                Pagá por transferencia y enviá el comprobante por WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} weight="bold" className="text-amber-500" />
                Productos naturales y de dietética
              </li>
            </ul>

            <p className="mt-6 text-xs text-muted">
              Las imágenes son referenciales y pueden actualizarse. Ante dudas sobre el producto, escribinos por
              WhatsApp.
            </p>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="border-t border-line pt-12">
            <h2 className="font-display text-h2 text-ink">También en {product.categoria}</h2>
            <div className="mt-6 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <StoreProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
