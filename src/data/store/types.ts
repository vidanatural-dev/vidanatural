export interface StoreProduct {
  slug: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioOrigen: number;
  /** Imagen principal (local si hay galería, si no CDN) */
  imagen: string;
  /** Hasta 10 fotos propias en /public/comprar/{slug}/ */
  imagenes?: string[];
  urlOrigen: string;
}
