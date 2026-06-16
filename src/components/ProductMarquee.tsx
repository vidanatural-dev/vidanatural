import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import type { Product } from '@/data/types';

/**
 * Tira viva de productos: dos filas con foto real que se desplazan en sentidos
 * opuestos, con desvanecido en los bordes y pausa al hover. Cada chip enlaza a su
 * ficha. CSS puro; se frena con prefers-reduced-motion (regla global).
 */
function Chip({ p }: { p: Product }) {
  return (
    <Link
      href={`/productos/${p.slug}`}
      className="group flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pl-1.5 pr-4 shadow-soft backdrop-blur-sm transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand/50"
    >
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface-2">
        {p.imagen ? (
          <Image src={p.imagen} alt="" fill sizes="36px" className="object-cover" />
        ) : (
          <span
            className="block h-full w-full"
            style={{ background: `oklch(0.9 0.07 ${p.hue})` }}
            aria-hidden
          />
        )}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-ink-soft transition-colors group-hover:text-ink">
        {p.nombre}
      </span>
    </Link>
  );
}

export function ProductMarquee() {
  const withImg = products.filter((p) => p.imagen);
  const pool = withImg.length >= 24 ? withImg : products;
  const rowA = pool.slice(0, 12);
  const rowB = pool.slice(12, 24).length >= 8 ? pool.slice(12, 24) : [...pool.slice(0, 12)].reverse();

  return (
    <div className="marquee-mask relative flex flex-col gap-3 overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-3 pr-3">
        {[...rowA, ...rowA].map((p, i) => (
          <Chip key={`a-${i}`} p={p} />
        ))}
      </div>
      <div className="flex w-max animate-marquee-reverse items-center gap-3 pr-3">
        {[...rowB, ...rowB].map((p, i) => (
          <Chip key={`b-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}
