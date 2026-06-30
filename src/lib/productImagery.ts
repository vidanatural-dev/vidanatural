/** Imágenes con texto/gráficos de marketing incrustados — usar arte generativo en su lugar. */
export function isMarketingPackshot(imagen?: string): boolean {
  if (!imagen) return false;
  if (imagen.endsWith('.png')) return true;
  if (imagen.startsWith('/productos/local/')) return true;
  if (/^\/productos\/[^/]+\.webp$/.test(imagen)) return true;
  return false;
}

/** URLs de tienda con gráficos promocionales o sin foto. */
export function isPoorStoreImage(url?: string): boolean {
  if (!url) return true;
  const u = url.toLowerCase();
  return (
    u.includes('no-photo') ||
    u.includes('diseno-sin-titulo') ||
    u.includes('copia-de-diseno') ||
    u.includes('/logo') ||
    u.includes('libro-digital') ||
    u.includes('black-white-square')
  );
}

/** Mejor resolución disponible en CDN Tienda Nube. */
export function upgradeStoreImageUrl(url: string): string {
  if (isPoorStoreImage(url)) return url;
  return url.replace(/-480-0\.webp$/, '-640-0.webp');
}
