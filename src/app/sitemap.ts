import type { MetadataRoute } from 'next';
import { allProductSlugs } from '@/data/products';
import { allRecipeSlugs } from '@/data/recipes';
import { useCases } from '@/data/useCases';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const out: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/productos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/recetas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/usos`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/sobre`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
  for (const s of allProductSlugs()) {
    out.push({ url: `${base}/productos/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const u of useCases) {
    out.push({ url: `${base}/usos/${u.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
  }
  for (const s of allRecipeSlugs()) {
    out.push({ url: `${base}/recetas/${s}`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 });
  }
  return out;
}
