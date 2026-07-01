import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { StoreCheckout } from '@/components/StoreCheckout';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Carrito y checkout',
  description: 'Revisá tu pedido, ingresá datos de envío y confirmá el pago por transferencia.',
  alternates: { canonical: '/comprar/carrito' },
  robots: { index: false, follow: false },
};

export default function CarritoPage() {
  return (
    <div className="pt-10 sm:pt-14">
      <Container width="wide" className="pb-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            <Icon name="ShoppingCart" size={14} weight="fill" />
            Checkout
          </span>
          <h1 className="mt-4 font-display text-h1 text-ink">Tu carrito</h1>
          <p className="mt-3 max-w-2xl text-lead text-ink-soft">
            Revisá los productos, completá el envío y transferí el total. Luego enviá el pedido con el comprobante
            por WhatsApp.
          </p>
        </Reveal>

        <div className="mt-10">
          <StoreCheckout />
        </div>
      </Container>
    </div>
  );
}
