import Link from 'next/link';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-brand-soft text-brand-deep">
          <Icon name="Leaf" size={32} weight="duotone" />
        </span>
        <p className="mt-6 font-mono text-sm uppercase tracking-[0.16em] text-muted">Error 404</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Página no encontrada</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          La página que buscás no existe o se movió. Volvé al inicio o explorá los productos.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">Ir al inicio</Link>
          <Link href="/productos" className="btn btn-ghost">Ver productos</Link>
        </div>
      </div>
    </Container>
  );
}
