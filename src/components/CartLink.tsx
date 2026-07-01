'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Icon } from './Icon';

export function CartLink({ className = '' }: { className?: string }) {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const active = pathname === '/comprar/carrito';

  return (
    <Link
      href="/comprar/carrito"
      aria-label={`Carrito${itemCount > 0 ? `, ${itemCount} productos` : ''}`}
      className={`relative inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-semibold transition-colors hover:border-amber-500/50 hover:text-amber-600 ${
        active ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300' : 'text-ink-soft'
      } ${className}`}
    >
      <Icon name="ShoppingCart" size={18} weight={active ? 'fill' : 'regular'} />
      <span className="hidden sm:inline">Carrito</span>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
