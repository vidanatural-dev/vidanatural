/**
 * Reemplaza imágenes de tienda con gráficos promocionales por fotos del detalle del producto.
 * Uso: npx tsx scripts/refresh-store-images.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CATALOG = join(process.cwd(), 'src/data/dieteticasCatalog.json');
const DELAY_MS = 600;

interface Entry {
  slug: string;
  nombre: string;
  imagen: string;
  urlOrigen: string;
  [key: string]: unknown;
}

function isPoor(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes('no-photo') ||
    u.includes('diseno-sin-titulo') ||
    u.includes('copia-de-diseno') ||
    u.includes('black-white-square')
  );
}

function score(url: string): number {
  if (isPoor(url)) return -1;
  if (url.includes('-1024-')) return 4;
  if (url.includes('-640-')) return 3;
  if (url.includes('-480-')) return 2;
  return 1;
}

function extractImages(html: string): string[] {
  const re = /https:\/\/acdn-us\.mitiendanube\.com[^"'\s)]+\.(?:webp|jpg|png)/gi;
  return [...new Set([...html.matchAll(re)].map((m) => m[0]))];
}

function pickBest(urls: string[]): string | undefined {
  return urls
    .filter((u) => !u.includes('/assets/stores/img/'))
    .sort((a, b) => score(b) - score(a))[0];
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const catalog = JSON.parse(readFileSync(CATALOG, 'utf8')) as Entry[];
  let updated = 0;

  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    if (!isPoor(item.imagen)) continue;

    process.stdout.write(`[${i + 1}/${catalog.length}] ${item.slug.slice(0, 40)}... `);
    try {
      const res = await fetch(item.urlOrigen, {
        headers: { 'User-Agent': 'MateriaNatural/1.0' },
      });
      if (!res.ok) {
        console.log('skip (http)');
        continue;
      }
      const html = await res.text();
      const best = pickBest(extractImages(html));
      if (best && !isPoor(best)) {
        item.imagen = best.replace(/-480-0\.webp$/, '-640-0.webp');
        updated++;
        console.log('ok');
      } else {
        console.log('sin alternativa');
      }
    } catch {
      console.log('error');
    }
    await sleep(DELAY_MS);
  }

  writeFileSync(CATALOG, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`\nActualizadas: ${updated}`);
}

main();
