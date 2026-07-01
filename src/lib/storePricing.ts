import type { StoreProduct } from '@/data/store/types';

/** Descuento de oferta aplicado a productos cuyo nombre incluye "combo". */
export const COMBO_OFFER_DISCOUNT = 0.15;

export function isComboProduct(nombre: string): boolean {
  return /\bcombo\b/i.test(nombre);
}

export function comboOfferPrice(precioLista: number): number {
  return Math.round(precioLista * (1 - COMBO_OFFER_DISCOUNT));
}

export function getEffectivePrice(product: StoreProduct): number {
  return product.precioOferta ?? product.precio;
}

export function offerDiscountPercent(product: StoreProduct): number | null {
  if (!product.precioOferta || product.precioOferta >= product.precio) return null;
  return Math.round((1 - product.precioOferta / product.precio) * 100);
}
