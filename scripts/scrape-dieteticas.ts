/**
 * Extrae el catálogo de dieteticasnaturalmente.com.ar (Tienda Nube).
 * Uso: npx tsx scripts/scrape-dieteticas.ts
 * Salida: src/data/dieteticasCatalog.json
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE = 'https://dieteticasnaturalmente.com.ar';
const TOTAL_PAGES = 100;
const DELAY_MS = 800;

export interface ScrapedProduct {
  slug: string;
  nombre: string;
  precioOrigen: number;
  precio: number;
  imagen: string;
  categoria: string;
  urlOrigen: string;
}

const CATEGORY_MAP: Record<string, string> = {
  Suplementos: 'Superalimento',
  'Harinas cereales y legumbres': 'Harina',
  'Aceites y más': 'Aceite',
  'Frutos secos': 'Fruto seco',
  Herboristeria: 'Hierba',
  Condimentos: 'Especia',
  Dieteticos: 'Endulzante',
  'Galletitas chocolates y más': 'Snack',
  Educativo: 'Otro',
  Combos: 'Otro',
  'Tinturas madres': 'Hierba',
  Celiaco: 'Harina',
  Diabetico: 'Endulzante',
  Fideos: 'Cereal',
  'Premezclas sin TACC': 'Harina',
  Alfajores: 'Snack',
  'Te en saquitos': 'Infusión',
  Barritas: 'Snack',
  Vegano: 'Otro',
  Semillas: 'Semilla',
  Bazar: 'Otro',
  'Cosmetica natural': 'Otro',
  Yerbas: 'Infusión',
};

const USE_CASE_MAP: Record<string, string[]> = {
  Superalimento: ['energia', 'defensas'],
  Harina: ['digestion', 'control-peso'],
  Aceite: ['circulacion', 'piel-cabello'],
  'Fruto seco': ['energia', 'huesos'],
  Hierba: ['digestion', 'defensas'],
  Especia: ['digestion', 'circulacion'],
  Endulzante: ['control-peso'],
  Snack: ['energia'],
  Infusión: ['descanso', 'digestion'],
  Semilla: ['digestion', 'energia'],
  Cereal: ['energia', 'digestion'],
  Legumbre: ['digestion', 'control-peso'],
  Otro: ['digestion'],
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugFromUrl(url: string): string {
  const m = url.match(/\/productos\/([^/?#]+)/);
  return m ? m[1] : url;
}

function extractJsonLdProducts(html: string): ScrapedProduct[] {
  const results: ScrapedProduct[] = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item['@type'] !== 'Product') continue;
        const price = Number(item.offers?.price ?? item.offers?.[0]?.price ?? 0);
        const url = item.offers?.url ?? item.offers?.[0]?.url ?? '';
        const image = Array.isArray(item.image) ? item.image[0] : item.image;
        if (!item.name || !price || !image || !url) continue;
        const slug = slugFromUrl(url);
        const precioOrigen = Math.round(price);
        results.push({
          slug: `dn-${slug}`,
          nombre: String(item.name).trim(),
          precioOrigen,
          precio: Math.round(precioOrigen * 1.5),
          imagen: String(image),
          categoria: 'Otro',
          urlOrigen: url.startsWith('http') ? url : `${BASE}${url}`,
        });
      }
    } catch {
      // skip malformed JSON-LD
    }
  }
  return results;
}

async function fetchPage(page: number): Promise<string> {
  const url = page === 1 ? `${BASE}/productos/` : `${BASE}/productos/page/${page}/`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'MateriaNatural/1.0 (catalog-import)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  const bySlug = new Map<string, ScrapedProduct>();
  console.log(`Scraping ${TOTAL_PAGES} pages from ${BASE}...`);

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    process.stdout.write(`  page ${page}/${TOTAL_PAGES}...`);
    const html = await fetchPage(page);
    const found = extractJsonLdProducts(html);
    for (const p of found) {
      if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
    }
    console.log(` ${found.length} products (${bySlug.size} total)`);
    if (page < TOTAL_PAGES) await sleep(DELAY_MS);
  }

  const catalog = Array.from(bySlug.values()).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  const outPath = join(process.cwd(), 'src/data/dieteticasCatalog.json');
  writeFileSync(outPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`\nDone: ${catalog.length} products → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
