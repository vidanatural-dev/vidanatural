'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getStoreProduct } from '@/data/store/products';
import type { StoreProduct } from '@/data/store/types';
import { getEffectivePrice } from '@/lib/storePricing';
import {
  type CartLine,
  readCartFromStorage,
  writeCartToStorage,
} from '@/lib/cart';

interface CartItemResolved extends CartLine {
  product: StoreProduct;
  subtotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  items: CartItemResolved[];
  itemCount: number;
  total: number;
  addItem: (slug: string, cantidad?: number) => void;
  setQuantity: (slug: string, cantidad: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeCartToStorage(lines);
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, cantidad = 1) => {
    const qty = Math.max(1, Math.min(99, cantidad));
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.slug === slug);
      if (idx === -1) return [...prev, { slug, cantidad: qty }];
      const next = [...prev];
      next[idx] = {
        slug,
        cantidad: Math.min(99, next[idx].cantidad + qty),
      };
      return next;
    });
  }, []);

  const setQuantity = useCallback((slug: string, cantidad: number) => {
    if (cantidad <= 0) {
      setLines((prev) => prev.filter((l) => l.slug !== slug));
      return;
    }
    const qty = Math.min(99, cantidad);
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, cantidad: qty } : l)));
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const items = useMemo(() => {
    const resolved: CartItemResolved[] = [];
    for (const line of lines) {
      const product = getStoreProduct(line.slug);
      if (!product) continue;
      resolved.push({
        ...line,
        product,
        subtotal: getEffectivePrice(product) * line.cantidad,
      });
    }
    return resolved;
  }, [lines]);

  const itemCount = useMemo(() => items.reduce((n, i) => n + i.cantidad, 0), [items]);
  const total = useMemo(() => items.reduce((n, i) => n + i.subtotal, 0), [items]);

  const value = useMemo(
    () => ({
      lines,
      items,
      itemCount,
      total,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [lines, items, itemCount, total, addItem, setQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
