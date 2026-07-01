/**
 * Extrae descripciones HTML de cada ficha en dieteticasnaturalmente.com.ar
 * Uso: npx tsx scripts/scrape-store-descriptions.ts
 * Salida: src/data/storeDescriptions.json
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const CATALOG = join(ROOT, 'src/data/dieteticasCatalog.json');
const OUT = join(ROOT, 'src/data/storeDescriptions.json');
const CONCURRENCY = 4;
const DELAY_MS = 450;

interface CatalogRow {
  slug: string;
  urlOrigen: string;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function extractDescription(html: string): string | null {
  const userContent = html.match(
    /class="user-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:\s*<div\s+class="js-nubesdk)/i
  );
  if (userContent?.[1]) {
    const inner = userContent[1].trim();
    if (inner.length > 20) return inner;
  }

  const og = html.match(/property="og:description"\s+content="([^"]+)"/i);
  if (og?.[1]) {
    const text = decodeHtmlEntities(og[1].trim());
    if (text.length > 40 && !/^Comprá online/i.test(text)) return `<p>${text}</p>`;
  }

  const meta = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (meta?.[1]) {
    const text = decodeHtmlEntities(meta[1].trim());
    if (text.length > 40 && !/^Comprá online/i.test(text)) return `<p>${text}</p>`;
  }

  return null;
}

async function fetchDescription(url: string): Promise<string | null> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'MateriaNatural/1.0 (description-import)' },
  });
  if (!res.ok) return null;
  const html = await res.text();
  return extractDescription(html);
}

async function pool<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let i = 0;

  async function run() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx]);
      await sleep(DELAY_MS);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

async function main() {
  const catalog = JSON.parse(readFileSync(CATALOG, 'utf8')) as CatalogRow[];
  const existing: Record<string, string> = existsSync(OUT)
    ? JSON.parse(readFileSync(OUT, 'utf8'))
    : {};

  const pending = catalog.filter((p) => !existing[p.slug]);
  console.log(`Catálogo: ${catalog.length} | Ya con descripción: ${Object.keys(existing).length} | Pendientes: ${pending.length}`);

  if (pending.length === 0) {
    console.log('Nada que scrapear.');
    return;
  }

  let done = 0;
  const batch = [...pending];

  await pool(
    batch,
    async (row) => {
      try {
        const desc = await fetchDescription(row.urlOrigen);
        if (desc) existing[row.slug] = desc;
        done++;
        if (done % 25 === 0 || done === batch.length) {
          writeFileSync(OUT, JSON.stringify(existing, null, 2) + '\n', 'utf8');
          console.log(`  ${done}/${batch.length} — guardado (${Object.keys(existing).length} total)`);
        }
      } catch (e) {
        console.warn(`  ✗ ${row.slug}:`, e);
      }
      return null;
    },
    CONCURRENCY
  );

  writeFileSync(OUT, JSON.stringify(existing, null, 2) + '\n', 'utf8');
  console.log(`\nListo: ${Object.keys(existing).length} descripciones en ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
