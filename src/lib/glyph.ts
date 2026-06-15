/**
 * Mapea la categoría de un producto a un glifo de icono.
 * Módulo neutro (sin 'use client') para poder usarse en componentes de servidor.
 */
export const glyphForCategory = (categoria: string): string => {
  switch (categoria) {
    case 'Raíz':
    case 'Semilla':
    case 'Cereal':
    case 'Pseudocereal':
    case 'Fruto seco':
    case 'Fruta seca':
    case 'Legumbre':
    case 'Harina':
    case 'Coco':
      return 'Plant';
    case 'Alga':
      return 'Waves';
    case 'Aceite':
    case 'Endulzante':
      return 'Drop';
    case 'Infusión':
      return 'Leaf';
    case 'Superalimento':
      return 'Sparkle';
    case 'Producto apícola':
      return 'FlowerLotus';
    default:
      return 'Leaf';
  }
};
