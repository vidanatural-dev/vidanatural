'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ARGENTINE_PROVINCES, type ShippingData } from '@/lib/cart';
import { formatPrice } from '@/lib/price';
import { getEffectivePrice } from '@/lib/storePricing';
import { site } from '@/lib/site';
import { QuantityControl } from './QuantityControl';
import { Icon } from './Icon';
import { StoreProductImage } from './StoreProductImage';

const EMPTY_SHIPPING: ShippingData = {
  nombre: '',
  direccion: '',
  entreCalles: '',
  localidad: '',
  codigoPostal: '',
  provincia: '',
};

function buildOrderMessage(shipping: ShippingData, items: ReturnType<typeof useCart>['items'], total: number) {
  const lines = items.map((i) => {
    const unit = getEffectivePrice(i.product);
    const note =
      i.product.precioOferta != null && i.product.precioOferta < i.product.precio
        ? ` (oferta, antes ${formatPrice(i.product.precio)})`
        : '';
    return `• ${i.product.nombre} x${i.cantidad} — ${formatPrice(i.subtotal)}${note}`;
  });

  return [
    '*Nuevo pedido — Materia Natural*',
    '',
    '*Productos:*',
    ...lines,
    '',
    `*Total: ${formatPrice(total)}*`,
    '',
    '*Datos de envío:*',
    `Nombre: ${shipping.nombre}`,
    `Dirección: ${shipping.direccion}`,
    `Entre calles: ${shipping.entreCalles}`,
    `Localidad: ${shipping.localidad}`,
    `Código postal: ${shipping.codigoPostal}`,
    `Provincia: ${shipping.provincia}`,
    '',
    '*Pago por transferencia*',
    `Alias: ${site.payment.alias}`,
    `Titular: ${site.payment.holder}`,
    `Medio: ${site.payment.method}`,
    '',
    'Adjunto comprobante de pago en este chat.',
  ].join('\n');
}

export function StoreCheckout() {
  const { items, total, setQuantity, removeItem, clearCart } = useCart();
  const [shipping, setShipping] = useState<ShippingData>(EMPTY_SHIPPING);
  const [comprobante, setComprobante] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  function updateField<K extends keyof ShippingData>(key: K, value: ShippingData[K]) {
    setShipping((s) => ({ ...s, [key]: value }));
  }

  function validate(): string | null {
    if (items.length === 0) return 'Tu carrito está vacío.';
    if (shipping.nombre.trim().length < 2) return 'Ingresá tu nombre completo.';
    if (shipping.direccion.trim().length < 4) return 'Ingresá la dirección de envío.';
    if (shipping.localidad.trim().length < 2) return 'Ingresá la localidad.';
    if (shipping.codigoPostal.trim().length < 4) return 'Ingresá el código postal.';
    if (!shipping.provincia) return 'Seleccioná la provincia.';
    if (!comprobante) return 'Adjuntá el comprobante de transferencia.';
    if (comprobante.size > 8 * 1024 * 1024) return 'El comprobante no puede superar 8 MB.';
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError('');

    const text = buildOrderMessage(shipping, items, total);
    const url = `${site.whatsappLink}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSent(true);
    clearCart();
    setShipping(EMPTY_SHIPPING);
    setComprobante(null);
  }

  if (items.length === 0 && !sent) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-line-strong bg-surface-2 px-6 py-20 text-center">
        <Icon name="ShoppingCart" size={40} weight="duotone" className="text-amber-500" />
        <h2 className="mt-4 font-display text-2xl text-ink">Tu carrito está vacío</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Agregá productos desde el catálogo con la cantidad que necesites.
        </p>
        <Link
          href="/comprar"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-amber-600"
        >
          <Icon name="Storefront" size={18} weight="fill" />
          Ir al catálogo
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <Icon name="Check" size={40} weight="bold" className="mx-auto text-amber-500" />
        <h2 className="mt-4 font-display text-2xl text-ink">Pedido preparado</h2>
        <p className="mt-3 text-sm text-ink-soft">
          Se abrió WhatsApp con el resumen de tu pedido. <strong className="text-ink">Adjuntá el comprobante</strong>{' '}
          de transferencia en el chat antes de enviar el mensaje.
        </p>
        <Link href="/comprar" className="btn btn-ghost mt-6">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-h2 text-ink">Tu pedido</h2>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface">
            {items.map((item) => (
              <li key={item.slug} className="flex gap-4 p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                  <StoreProductImage product={item.product} sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-medium text-ink">{item.product.nombre}</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {formatPrice(getEffectivePrice(item.product))} c/u
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <QuantityControl
                      value={item.cantidad}
                      onChange={(n) => setQuantity(item.slug, n)}
                      size="sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="text-xs text-muted underline-offset-2 hover:text-red-500 hover:underline"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <p className="shrink-0 font-mono font-bold text-ink">{formatPrice(item.subtotal)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-h2 text-ink">Datos de envío</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Nombre completo</span>
              <input
                required
                value={shipping.nombre}
                onChange={(e) => updateField('nombre', e.target.value)}
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink outline-none focus:border-amber-500"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Dirección</span>
              <input
                required
                value={shipping.direccion}
                onChange={(e) => updateField('direccion', e.target.value)}
                placeholder="Calle y número"
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink outline-none focus:border-amber-500"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Entre calles</span>
              <input
                value={shipping.entreCalles}
                onChange={(e) => updateField('entreCalles', e.target.value)}
                placeholder="Ej: Av. Corrientes y Callao"
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink outline-none focus:border-amber-500"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Localidad</span>
              <input
                required
                value={shipping.localidad}
                onChange={(e) => updateField('localidad', e.target.value)}
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink outline-none focus:border-amber-500"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Código postal</span>
              <input
                required
                inputMode="numeric"
                value={shipping.codigoPostal}
                onChange={(e) => updateField('codigoPostal', e.target.value)}
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink outline-none focus:border-amber-500"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">Provincia</span>
              <select
                required
                value={shipping.provincia}
                onChange={(e) => updateField('provincia', e.target.value)}
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink outline-none focus:border-amber-500"
              >
                <option value="">Seleccionar provincia</option>
                {ARGENTINE_PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
          <h2 className="font-display text-xl text-ink">Resumen</h2>
          <p className="mt-4 font-mono text-3xl font-bold text-amber-600 dark:text-amber-400">
            {formatPrice(total)}
          </p>
          <p className="mt-1 text-xs text-muted">Total en pesos argentinos</p>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="flex items-center gap-2 font-display text-lg text-ink">
            <Icon name="Wallet" size={22} weight="duotone" className="text-amber-600" />
            Pago por transferencia
          </h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Alias</dt>
              <dd className="font-mono font-bold text-ink">{site.payment.alias}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Titular</dt>
              <dd className="text-right font-medium text-ink">{site.payment.holder}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Medio</dt>
              <dd className="text-right font-medium text-ink">{site.payment.method}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft">
            Transferí el total del pedido y adjuntá el comprobante antes de enviar por WhatsApp.
          </p>
        </div>

        <label className="block rounded-2xl border border-line bg-surface p-6">
          <span className="block text-sm font-medium text-ink">Comprobante de pago *</span>
          <span className="mt-1 block text-xs text-muted">Imagen o PDF del comprobante de transferencia</span>
          <input
            type="file"
            accept="image/*,.pdf"
            required
            onChange={(e) => setComprobante(e.target.files?.[0] ?? null)}
            className="mt-3 w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-600"
          />
          {comprobante && (
            <p className="mt-2 truncate text-xs text-ink-soft">
              Archivo: {comprobante.name} ({Math.round(comprobante.size / 1024)} KB)
            </p>
          )}
        </label>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b8c4e] px-6 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#167a42] active:scale-[0.98]"
        >
          <Icon name="WhatsappLogo" size={22} weight="fill" />
          Enviar pedido por WhatsApp
        </button>
      </aside>
    </form>
  );
}
