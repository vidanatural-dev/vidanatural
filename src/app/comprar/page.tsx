import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { SearchStoreProducts } from '@/components/SearchStoreProducts';
import { Icon } from '@/components/Icon';
import { storeCategories, storeProductCount, storeProducts } from '@/data/store/products';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Comprar productos naturales',
  description:
    'Tienda de productos naturales y de dietética. Más de mil productos con precios en pesos argentinos. Consultá y comprá por WhatsApp.',
  alternates: { canonical: '/comprar' },
};

export default function ComprarPage() {
  const categories = storeCategories();

  return (
    <div className="pt-12 sm:pt-16">
      <section className="relative isolate overflow-hidden border-b border-line bg-gradient-to-b from-amber-500/10 via-transparent to-transparent">
        <Container width="wide" className="relative py-10 sm:py-14">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              <Icon name="Storefront" size={14} weight="fill" />
              Tienda online
            </span>
            <h1 className="mt-5 font-display text-h1 text-ink">Comprá productos naturales</h1>
            <p className="mt-4 text-lead text-ink-soft">
              Catálogo con <strong className="font-semibold text-ink">{storeProductCount} productos</strong> de
              dietética, herboristería, suplementos y más. Elegí cantidad, armá tu carrito y finalizá con datos de
              envío y pago por transferencia.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/comprar/carrito"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-transform hover:-translate-y-0.5 hover:bg-amber-600 active:scale-[0.98]"
              >
                <Icon name="ShoppingCart" size={20} weight="fill" />
                Ver carrito
              </Link>
              <a
                href={site.whatsappCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-[#1b8c4e] hover:text-[#1b8c4e]"
              >
                <Icon name="WhatsappLogo" size={20} weight="fill" />
                Consultar
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container width="wide" className="py-10 sm:py-14">
        <SearchStoreProducts products={storeProducts} categories={categories} />
      </Container>
    </div>
  );
}
