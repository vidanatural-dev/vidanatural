/**
 * Ordena archivos de imagen por el número de secuencia en el nombre.
 * Soporta: "(3).png", "3/10", "03.webp", "slide-3.png", etc.
 */
export function extractImageSequence(filename: string): number {
  const base = filename.replace(/\\/g, '/').split('/').pop() ?? filename;

  const slash = base.match(/(\d+)\s*\/\s*(\d+)/);
  if (slash) return parseInt(slash[1], 10);

  const allParen = [...base.matchAll(/\((\d+)\)/g)];
  if (allParen.length > 0) {
    return parseInt(allParen[allParen.length - 1][1], 10);
  }

  const padded = base.match(/(?:^|[\s_-])(\d{1,2})(?=\.(png|jpe?g|webp)$)/i);
  if (padded) return parseInt(padded[1], 10);

  const trail = base.match(/(\d+)\.(png|jpe?g|webp)$/i);
  if (trail) return parseInt(trail[1], 10);

  return Number.MAX_SAFE_INTEGER;
}

export function sortImageFilenames(files: string[]): string[] {
  return [...files].sort((a, b) => {
    const na = extractImageSequence(a);
    const nb = extractImageSequence(b);
    if (na !== nb) return na - nb;
    return a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' });
  });
}

/** Ordena rutas públicas /comprar/slug/01.webp por índice numérico */
export function sortImageUrls(urls: string[]): string[] {
  return [...urls].sort((a, b) => {
    const na = extractImageSequence(a);
    const nb = extractImageSequence(b);
    if (na !== nb) return na - nb;
    return a.localeCompare(b, 'es', { numeric: true });
  });
}
