export interface StoreProduct {
  slug: string;
  nombre: string;
  categoria: string;
  /** Precio real de venta (lo que se cobra en el carrito). */
  precio: number;
  precioOrigen: number;
  /** Precio tachado en combos (+15% sobre el real, solo visual). */
  precioLista?: number;
  /** Precio mostrado en oferta (= precio real en combos). */
  precioOferta?: number;
  /** Imagen principal (local si hay galería, si no CDN) */
  imagen: string;
  /** Hasta 10 fotos propias en /public/comprar/{slug}/ */
  imagenes?: string[];
  urlOrigen: string;
  /** HTML de la ficha original (dieteticasnaturalmente.com.ar) */
  descripcion?: string;
}
