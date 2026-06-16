import type { SeedProduct } from './productEngine';

// Catálogo extendido (productos nuevos, sin repetir los 29 base).
// Se completa por lotes hasta llegar a 250 productos en total.
export const extraSeeds: SeedProduct[] = [
  // ===== Frutos secos =====
  { slug: 'castanas-caju', nombre: 'Castañas de cajú', categoria: 'Fruto seco', nombreCientifico: 'Anacardium occidentale', hue: 45, casosDeUso: ['energia', 'mente'] },
  { slug: 'mani', nombre: 'Maní', categoria: 'Fruto seco', nombreCientifico: 'Arachis hypogaea', hue: 40, casosDeUso: ['energia', 'mente'] },
  { slug: 'avellanas', nombre: 'Avellanas', categoria: 'Fruto seco', nombreCientifico: 'Corylus avellana', hue: 35, casosDeUso: ['energia', 'mente'] },
  { slug: 'nuez-de-brasil', nombre: 'Nueces de Brasil', categoria: 'Fruto seco', nombreCientifico: 'Bertholletia excelsa', hue: 38, casosDeUso: ['energia', 'defensas'] },
  { slug: 'nuez-pecan', nombre: 'Nueces pecán', categoria: 'Fruto seco', nombreCientifico: 'Carya illinoinensis', hue: 33, casosDeUso: ['energia', 'mente'] },
  { slug: 'pistachos', nombre: 'Pistachos', categoria: 'Fruto seco', nombreCientifico: 'Pistacia vera', hue: 110, casosDeUso: ['energia', 'mente'] },
  { slug: 'macadamia', nombre: 'Nueces de macadamia', categoria: 'Fruto seco', nombreCientifico: 'Macadamia integrifolia', hue: 60, casosDeUso: ['energia'] },
  { slug: 'pinones', nombre: 'Piñones', categoria: 'Fruto seco', nombreCientifico: 'Pinus pinea', hue: 80, casosDeUso: ['energia'] },

  // ===== Semillas =====
  { slug: 'semillas-de-calabaza', nombre: 'Semillas de calabaza', categoria: 'Semilla', nombreCientifico: 'Cucurbita pepo', hue: 110, casosDeUso: ['energia', 'defensas'] },
  { slug: 'semillas-de-amapola', nombre: 'Semillas de amapola', categoria: 'Semilla', nombreCientifico: 'Papaver somniferum', hue: 280, casosDeUso: ['digestion'] },
  { slug: 'semillas-de-canamo', nombre: 'Semillas de cáñamo', categoria: 'Semilla', nombreCientifico: 'Cannabis sativa', hue: 130, casosDeUso: ['energia', 'articulaciones'] },
  { slug: 'alpiste', nombre: 'Alpiste', categoria: 'Semilla', nombreCientifico: 'Phalaris canariensis', hue: 70, casosDeUso: ['digestion'] },

  // ===== Frutas secas / deshidratadas =====
  { slug: 'higos-secos', nombre: 'Higos secos', categoria: 'Fruta seca', nombreCientifico: 'Ficus carica', hue: 40, casosDeUso: ['digestion', 'energia'] },
  { slug: 'orejones', nombre: 'Orejones de damasco', categoria: 'Fruta seca', nombreCientifico: 'Prunus armeniaca', hue: 50, casosDeUso: ['digestion', 'energia'] },
  { slug: 'arandanos-secos', nombre: 'Arándanos secos', categoria: 'Fruta seca', nombreCientifico: 'Vaccinium', hue: 300, casosDeUso: ['defensas', 'energia'] },
  { slug: 'mango-deshidratado', nombre: 'Mango deshidratado', categoria: 'Fruta seca', nombreCientifico: 'Mangifera indica', hue: 60, casosDeUso: ['energia'] },
  { slug: 'banana-chips', nombre: 'Chips de banana', categoria: 'Fruta seca', nombreCientifico: 'Musa', hue: 55, casosDeUso: ['energia'] },
  { slug: 'manzana-deshidratada', nombre: 'Manzana deshidratada', categoria: 'Fruta seca', nombreCientifico: 'Malus domestica', hue: 45, casosDeUso: ['digestion'] },
  { slug: 'pasas-rubias', nombre: 'Pasas de uva rubias', categoria: 'Fruta seca', nombreCientifico: 'Vitis vinifera', hue: 75, casosDeUso: ['energia'] },
  { slug: 'goji', nombre: 'Bayas de goji', categoria: 'Fruta seca', nombreCientifico: 'Lycium barbarum', hue: 30, casosDeUso: ['defensas', 'energia'] },
  { slug: 'anana-deshidratado', nombre: 'Ananá deshidratado', categoria: 'Fruta seca', nombreCientifico: 'Ananas comosus', hue: 65, casosDeUso: ['digestion'] },

  // ===== Cereales =====
  { slug: 'arroz-integral', nombre: 'Arroz integral', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 70, casosDeUso: ['energia', 'digestion'] },
  { slug: 'arroz-yamani', nombre: 'Arroz yamaní', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 60, casosDeUso: ['energia', 'digestion'] },
  { slug: 'salvado-de-avena', nombre: 'Salvado de avena', categoria: 'Cereal', nombreCientifico: 'Avena sativa', hue: 65, casosDeUso: ['digestion'] },
  { slug: 'salvado-de-trigo', nombre: 'Salvado de trigo', categoria: 'Cereal', nombreCientifico: 'Triticum', hue: 55, casosDeUso: ['digestion'] },
  { slug: 'trigo-burgol', nombre: 'Trigo burgol', categoria: 'Cereal', nombreCientifico: 'Triticum', hue: 60, casosDeUso: ['energia', 'digestion'] },
  { slug: 'mijo', nombre: 'Mijo', categoria: 'Cereal', nombreCientifico: 'Panicum miliaceum', hue: 75, casosDeUso: ['energia'] },
  { slug: 'maiz-pisingallo', nombre: 'Maíz pisingallo', categoria: 'Cereal', nombreCientifico: 'Zea mays', hue: 70, casosDeUso: ['energia'] },
  { slug: 'cebada', nombre: 'Cebada', categoria: 'Cereal', nombreCientifico: 'Hordeum vulgare', hue: 65, casosDeUso: ['digestion', 'energia'] },
  { slug: 'centeno', nombre: 'Centeno', categoria: 'Cereal', nombreCientifico: 'Secale cereale', hue: 50, casosDeUso: ['digestion'] },
  { slug: 'polenta', nombre: 'Polenta de maíz', categoria: 'Cereal', nombreCientifico: 'Zea mays', hue: 75, casosDeUso: ['energia'] },
  { slug: 'copos-de-maiz', nombre: 'Copos de maíz', categoria: 'Cereal', nombreCientifico: 'Zea mays', hue: 72, casosDeUso: ['energia'] },

  // ===== Pseudocereal =====
  { slug: 'trigo-sarraceno', nombre: 'Trigo sarraceno', categoria: 'Pseudocereal', nombreCientifico: 'Fagopyrum esculentum', hue: 25, casosDeUso: ['energia', 'digestion'] },

  // ===== Legumbres =====
  { slug: 'porotos-negros', nombre: 'Porotos negros', categoria: 'Legumbre', nombreCientifico: 'Phaseolus vulgaris', hue: 280, casosDeUso: ['energia', 'digestion'] },
  { slug: 'porotos-colorados', nombre: 'Porotos colorados', categoria: 'Legumbre', nombreCientifico: 'Phaseolus vulgaris', hue: 25, casosDeUso: ['energia', 'digestion'] },
  { slug: 'porotos-blancos', nombre: 'Porotos blancos', categoria: 'Legumbre', nombreCientifico: 'Phaseolus vulgaris', hue: 80, casosDeUso: ['energia', 'digestion'] },
  { slug: 'soja', nombre: 'Soja', categoria: 'Legumbre', nombreCientifico: 'Glycine max', hue: 70, casosDeUso: ['energia'] },
  { slug: 'arvejas-secas', nombre: 'Arvejas secas', categoria: 'Legumbre', nombreCientifico: 'Pisum sativum', hue: 120, casosDeUso: ['energia', 'digestion'] },
  { slug: 'habas', nombre: 'Habas secas', categoria: 'Legumbre', nombreCientifico: 'Vicia faba', hue: 90, casosDeUso: ['energia', 'digestion'] },
  { slug: 'poroto-mung', nombre: 'Poroto mung', categoria: 'Legumbre', nombreCientifico: 'Vigna radiata', hue: 130, casosDeUso: ['digestion', 'energia'] },
  { slug: 'poroto-aduki', nombre: 'Poroto aduki', categoria: 'Legumbre', nombreCientifico: 'Vigna angularis', hue: 20, casosDeUso: ['digestion', 'energia'] },
  { slug: 'soja-texturizada', nombre: 'Soja texturizada', categoria: 'Legumbre', nombreCientifico: 'Glycine max', hue: 55, casosDeUso: ['energia'] },

  // ===== Harinas =====
  { slug: 'harina-de-garbanzo', nombre: 'Harina de garbanzo', categoria: 'Harina', nombreCientifico: 'Cicer arietinum', hue: 75, casosDeUso: ['energia', 'digestion'] },
  { slug: 'harina-integral', nombre: 'Harina integral de trigo', categoria: 'Harina', nombreCientifico: 'Triticum', hue: 55, casosDeUso: ['energia', 'digestion'] },
  { slug: 'harina-de-avena', nombre: 'Harina de avena', categoria: 'Harina', nombreCientifico: 'Avena sativa', hue: 65, casosDeUso: ['energia', 'digestion'] },
  { slug: 'harina-de-arroz', nombre: 'Harina de arroz', categoria: 'Harina', nombreCientifico: 'Oryza sativa', hue: 60, casosDeUso: ['energia'] },
  { slug: 'harina-de-maiz', nombre: 'Harina de maíz', categoria: 'Harina', nombreCientifico: 'Zea mays', hue: 75, casosDeUso: ['energia'] },
  { slug: 'harina-de-algarroba', nombre: 'Harina de algarroba', categoria: 'Harina', nombreCientifico: 'Ceratonia siliqua', hue: 35, casosDeUso: ['digestion', 'energia'] },
  { slug: 'fecula-de-maiz', nombre: 'Fécula de maíz', categoria: 'Harina', nombreCientifico: 'Zea mays', hue: 70, casosDeUso: ['energia'] },
  { slug: 'harina-de-lino', nombre: 'Harina de lino', categoria: 'Harina', nombreCientifico: 'Linum usitatissimum', hue: 45, casosDeUso: ['digestion'] },

  // ===== Aceites =====
  { slug: 'aceite-de-oliva', nombre: 'Aceite de oliva', categoria: 'Aceite', nombreCientifico: 'Olea europaea', hue: 110, casosDeUso: ['articulaciones', 'energia'] },
  { slug: 'aceite-de-girasol', nombre: 'Aceite de girasol', categoria: 'Aceite', nombreCientifico: 'Helianthus annuus', hue: 90, casosDeUso: ['energia'] },
  { slug: 'aceite-de-lino', nombre: 'Aceite de lino', categoria: 'Aceite', nombreCientifico: 'Linum usitatissimum', hue: 100, casosDeUso: ['mente', 'articulaciones'] },
  { slug: 'aceite-de-sesamo', nombre: 'Aceite de sésamo', categoria: 'Aceite', nombreCientifico: 'Sesamum indicum', hue: 70, casosDeUso: ['articulaciones'] },

  // ===== Endulzantes =====
  { slug: 'stevia', nombre: 'Stevia', categoria: 'Endulzante', nombreCientifico: 'Stevia rebaudiana', hue: 150, casosDeUso: ['energia'] },
  { slug: 'jarabe-de-arce', nombre: 'Jarabe de arce', categoria: 'Endulzante', nombreCientifico: 'Acer saccharum', hue: 40, casosDeUso: ['energia'] },
  { slug: 'jarabe-de-agave', nombre: 'Jarabe de agave', categoria: 'Endulzante', nombreCientifico: 'Agave', hue: 60, casosDeUso: ['energia'] },
  { slug: 'azucar-de-coco', nombre: 'Azúcar de coco', categoria: 'Endulzante', nombreCientifico: 'Cocos nucifera', hue: 45, casosDeUso: ['energia'] },
  { slug: 'melaza', nombre: 'Melaza', categoria: 'Endulzante', nombreCientifico: 'Saccharum officinarum', hue: 30, casosDeUso: ['energia'] },

  // ===== Infusiones / Té =====
  { slug: 'yerba-mate', nombre: 'Yerba mate', categoria: 'Infusión', nombreCientifico: 'Ilex paraguariensis', hue: 120, casosDeUso: ['energia', 'mente'] },
  { slug: 'te-negro', nombre: 'Té negro', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 30, casosDeUso: ['energia', 'mente'] },
  { slug: 'rooibos', nombre: 'Rooibos', categoria: 'Infusión', nombreCientifico: 'Aspalathus linearis', hue: 35, casosDeUso: ['descanso', 'defensas'] },
  { slug: 'matcha', nombre: 'Té matcha', categoria: 'Superalimento', nombreCientifico: 'Camellia sinensis', hue: 150, casosDeUso: ['energia', 'mente'] },

  // ===== Hierbas =====
  { slug: 'manzanilla', nombre: 'Manzanilla', categoria: 'Hierba', nombreCientifico: 'Matricaria chamomilla', hue: 90, casosDeUso: ['descanso', 'digestion'] },
  { slug: 'tilo', nombre: 'Tilo', categoria: 'Hierba', nombreCientifico: 'Tilia', hue: 95, casosDeUso: ['descanso'] },
  { slug: 'menta', nombre: 'Menta', categoria: 'Hierba', nombreCientifico: 'Mentha', hue: 150, casosDeUso: ['digestion', 'descanso'] },
  { slug: 'cedron', nombre: 'Cedrón', categoria: 'Hierba', nombreCientifico: 'Aloysia citrodora', hue: 130, casosDeUso: ['descanso', 'digestion'] },

  // ===== Especias =====
  { slug: 'canela', nombre: 'Canela', categoria: 'Especia', nombreCientifico: 'Cinnamomum verum', hue: 40, casosDeUso: ['digestion', 'energia'] },
  { slug: 'comino', nombre: 'Comino', categoria: 'Especia', nombreCientifico: 'Cuminum cyminum', hue: 60, casosDeUso: ['digestion'] },
  { slug: 'oregano', nombre: 'Orégano', categoria: 'Especia', nombreCientifico: 'Origanum vulgare', hue: 110, casosDeUso: ['digestion', 'defensas'] },
];
