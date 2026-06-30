import type { Product } from '@/data/types';
import { isMarketingPackshot, upgradeStoreImageUrl } from './productImagery';

/**
 * Fotos reales de producto (tienda) para hero y fichas destacadas.
 * Packshots locales con texto de marketing quedan fuera.
 */
export const GUIDE_PHOTO_OVERRIDES: Record<string, string> = {
  chia: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/semillas-de-chia-2db349747b5ec1825117324043076752-480-0.webp',
  avena: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/avena-gruesa-94c1fdc8ad565cca6217295679478574-480-0.webp',
  quinoa: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/quinoa-3f7df86c14e378ce4617324619693515-480-0.webp',
  almendras: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/1-29328646821b1a1e0417295155356380-480-0.webp',
  curcuma: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/curcuma-0559f87b026a056cda17303754093055-480-0.webp',
  espirulina: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/modelife-espirulina-grande-e626b8e8a1a58d567e17631407326528-480-0.webp',
  cacao: 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/9b3a9de16dcb893b4a556ad7e7de1313-3b98c9c1163e778eb117371412120601-480-0.webp',
  'te-verde': 'https://acdn-us.mitiendanube.com/stores/003/435/959/products/te-verde-d1e9fb0701b7d6dca217326347165836-480-0.webp',
};

export function resolveGuidePhoto(product: Product): string | undefined {
  const override = GUIDE_PHOTO_OVERRIDES[product.slug];
  if (override) return upgradeStoreImageUrl(override);

  const img = product.imagen;
  if (img && !isMarketingPackshot(img)) return img;
  return undefined;
}
