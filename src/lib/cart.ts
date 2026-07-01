export interface CartLine {
  slug: string;
  cantidad: number;
}

export interface ShippingData {
  nombre: string;
  direccion: string;
  entreCalles: string;
  localidad: string;
  codigoPostal: string;
  provincia: string;
}

export const CART_STORAGE_KEY = 'materia-cart-v1';

export const ARGENTINE_PROVINCES = [
  'Buenos Aires',
  'Ciudad Autónoma de Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
] as const;

export function readCartFromStorage(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => typeof l.slug === 'string' && typeof l.cantidad === 'number' && l.cantidad > 0
    );
  } catch {
    return [];
  }
}

export function writeCartToStorage(lines: CartLine[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
}
