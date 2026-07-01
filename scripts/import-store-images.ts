/**
 * Copia imágenes de producto desde una carpeta local, las convierte a WebP
 * y genera src/data/store/localImages.json con rutas públicas.
 *
 * Uso: npx tsx scripts/import-store-images.ts [carpeta-origen]
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE = path.join('C:', 'Users', 'Mi Pc', 'Downloads', 'MATERIA NATURAL');
const OUT_DIR = path.join(ROOT, 'public', 'comprar');
const MANIFEST = path.join(ROOT, 'src', 'data', 'store', 'localImages.json');

/** Carpeta de origen → slug del catálogo tienda */
const FOLDER_TO_SLUG: Record<string, string> = {
  'ASHWAGANDHA EN COMPRIMIDOS': 'dn-ashwagandha-en-comprimidos-natural-plus',
  'BOTIQUIN HERBAL LIBRO DIGITAL': 'dn-botiquin-herbal-libro-digital',
  'CARDO MARIANO': 'dn-cardo-mariano-en-capsulas-prodenza',
  'CITRATO DE MAGNESIO': 'dn-citrato-de-magnesio-x60-comprimidos-original-green',
  'COMBO ARTICULACION': 'dn-combo-articulacion',
  'COMBO CALMA CRONICA': 'dn-combo-calma-cronica-1rmj2',
  'COMBO CANDIDA': 'dn-combo-parasitos-candida-elimina-la-candida',
  'COMBO CANDIDA PARASITOS': 'dn-combo-anti-inflamacion-y-parasitos-intestinales-1rzqy',
  'COMBO COLESTEROL': 'dn-combo-colesterol',
  'COMBO DIABETES': 'dn-combo-diabetes-controla-tu-azucar-de-forma-natural',
  'COMBO HEPATOPROTECTOR': 'dn-combo-hepatoprotector-higado-graso-acidez-y-reflujo',
  'COMBO PONTENCIA': 'dn-combo-potencia-mayor-potencia-sexual',
  'COMBO REDUCTORA': 'dn-combo-reductor-baja-de-peso-de-forma-natural',
  'COMBO SIBO': 'dn-combo-sibo-300-gr-de-hierbas-aceite-de-oregano',
  'GELATINA SIN SABOR': 'dn-gelatina-sin-sabor-x-100gr',
  'MINI GUIA KETO + HIERBAS': 'dn-mini-guia-keto-hierbas',
  'NAD + NICOTINAMIDA + RESVERATROL': 'dn-nad-nicotinamida-resveratrol-x-60-capsulas-original-green',
  'UVA URSINI TINTURA MADRE': 'dn-uva-ursi-tintura-madre-oasis',
};

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

function sortKey(filename: string): number {
  const paren = filename.match(/\((\d+)\)/);
  if (paren) return parseInt(paren[1], 10);
  const trail = filename.match(/(\d+)\.(png|jpe?g|webp)$/i);
  if (trail) return parseInt(trail[1], 10);
  return 0;
}

async function convertOne(src: string, dest: string): Promise<void> {
  await sharp(src)
    .rotate()
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
}

async function main() {
  const sourceDir = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SOURCE;

  if (!fs.existsSync(sourceDir)) {
    console.error(`No existe la carpeta: ${sourceDir}`);
    process.exit(1);
  }

  const manifest: Record<string, string[]> = {};

  for (const [folder, slug] of Object.entries(FOLDER_TO_SLUG)) {
    const folderPath = path.join(sourceDir, folder);
    if (!fs.existsSync(folderPath)) {
      console.warn(`⚠ Carpeta no encontrada: ${folder}`);
      continue;
    }

    const files = fs
      .readdirSync(folderPath)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => sortKey(a) - sortKey(b))
      .slice(0, 10);

    if (files.length === 0) {
      console.warn(`⚠ Sin imágenes en: ${folder}`);
      continue;
    }

    const slugDir = path.join(OUT_DIR, slug);
    fs.mkdirSync(slugDir, { recursive: true });

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const idx = String(i + 1).padStart(2, '0');
      const dest = path.join(slugDir, `${idx}.webp`);
      await convertOne(path.join(folderPath, files[i]), dest);
      urls.push(`/comprar/${slug}/${idx}.webp`);
    }

    manifest[slug] = urls;
    console.log(`✓ ${folder} → ${slug} (${urls.length} imgs)`);
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`\nManifest: ${MANIFEST}`);
  console.log(`Productos con imágenes locales: ${Object.keys(manifest).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
