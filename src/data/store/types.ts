export interface StoreProduct {
  slug: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioOrigen: number;
  /** Precio promocional (combos con nombre "combo"). */
  precioOferta?: number;
  /** Imagen principal (local si hay galería, si no CDN) */
  imagen: string;
  /** Hasta 10 fotos propias en /public/comprar/{slug}/ */
  imagenes?: string[];
  urlOrigen: string;
  /** HTML de la ficha original (dieteticasnaturalmente.com.ar) */
  descripcion?: string;
}
