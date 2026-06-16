import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { SearchProducts } from '@/components/SearchProducts';
import { Disclaimer } from '@/components/Disclaimer';
import { products } from '@/data/products';
import { useCases } from '@/data/useCases';

export const metadata: Metadata = {
  title: 'Productos naturales',
  alternates: { canonical: '/productos' },
  description:
    'Listado de productos naturales y de dietética con su composición, usos tradicionales y precauciones. Buscá por nombre o filtrá por caso de uso.',
};

export default function ProductosPage() {
  return (
    <div className="pt-12 sm:pt-16">
      <Container width="wide">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Catálogo informativo</span>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Productos naturales</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Explorá las fichas por nombre o por caso de uso. Cada una explica qué es el producto, su
            composición, sus usos y las precauciones a tener en cuenta.
          </p>
        </Reveal>

        <div className="mt-10">
          <SearchProducts products={products} useCases={useCases} />
        </div>

        <Disclaimer className="my-16" />
      </Container>
    </div>
  );
}
