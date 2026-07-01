import type { StoreProduct } from '@/data/store/types';

/** Porcentaje de “descuento” mostrado en combos (solo visual). */
export const COMBO_OFFER_DISCOUNT = 0.15;

export function isComboProduct(nombre: string): boolean {
  return /\bcombo\b/i.test(nombre);
}

/** Precio tachado: se infla el precio real y luego se “descuenta” de vuelta. */
export function comboDisplayListPrice(realPrice: number): number {
  return Math.round(realPrice * (1 + COMBO_OFFER_DISCOUNT));
}

/** Precio que paga el cliente (siempre el precio real del catálogo). */
export function getEffectivePrice(product: StoreProduct): number {
  return product.precio;
}

export function getDisplayListPrice(product: StoreProduct): number {
  return product.precioLista ?? product.precio;
}

export function hasVisualOffer(product: StoreProduct): boolean {
  const lista = getDisplayListPrice(product);
  return lista > getEffectivePrice(product);
}

export function offerDiscountPercent(product: StoreProduct): number | null {
  if (!hasVisualOffer(product)) return null;
  return Math.round(COMBO_OFFER_DISCOUNT * 100);
}
