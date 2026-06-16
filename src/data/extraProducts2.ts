import type { SeedProduct } from './productEngine';

// Catálogo extendido — Lote 2. Completa el catálogo hasta 250 productos.
export const extraSeeds2: SeedProduct[] = [
  // ===== Hierbas =====
  { slug: 'boldo', nombre: 'Boldo', categoria: 'Hierba', nombreCientifico: 'Peumus boldus', hue: 120, casosDeUso: ['digestion'] },
  { slug: 'peperina', nombre: 'Peperina', categoria: 'Hierba', nombreCientifico: 'Minthostachys', hue: 140, casosDeUso: ['digestion'] },
  { slug: 'melisa', nombre: 'Melisa', categoria: 'Hierba', nombreCientifico: 'Melissa officinalis', hue: 130, casosDeUso: ['descanso'] },
  { slug: 'lavanda', nombre: 'Lavanda', categoria: 'Hierba', nombreCientifico: 'Lavandula', hue: 280, casosDeUso: ['descanso'] },
  { slug: 'romero', nombre: 'Romero', categoria: 'Hierba', nombreCientifico: 'Salvia rosmarinus', hue: 150, casosDeUso: ['mente', 'digestion'] },
  { slug: 'salvia', nombre: 'Salvia', categoria: 'Hierba', nombreCientifico: 'Salvia officinalis', hue: 145, casosDeUso: ['digestion'] },
  { slug: 'ortiga', nombre: 'Ortiga', categoria: 'Hierba', nombreCientifico: 'Urtica dioica', hue: 150, casosDeUso: ['defensas'] },
  { slug: 'diente-de-leon', nombre: 'Diente de león', categoria: 'Hierba', nombreCientifico: 'Taraxacum officinale', hue: 95, casosDeUso: ['digestion'] },
  { slug: 'cola-de-caballo', nombre: 'Cola de caballo', categoria: 'Hierba', nombreCientifico: 'Equisetum arvense', hue: 140, casosDeUso: ['defensas'] },
  { slug: 'carqueja', nombre: 'Carqueja', categoria: 'Hierba', nombreCientifico: 'Baccharis trimera', hue: 135, casosDeUso: ['digestion'] },
  { slug: 'marcela', nombre: 'Marcela', categoria: 'Hierba', nombreCientifico: 'Achyrocline satureioides', hue: 90, casosDeUso: ['digestion'] },
  { slug: 'burrito', nombre: 'Burrito', categoria: 'Hierba', nombreCientifico: 'Aloysia polystachya', hue: 130, casosDeUso: ['digestion', 'descanso'] },
  { slug: 'hierba-luisa', nombre: 'Hierba Luisa', categoria: 'Hierba', nombreCientifico: 'Cymbopogon citratus', hue: 125, casosDeUso: ['descanso', 'digestion'] },
  { slug: 'poleo', nombre: 'Poleo', categoria: 'Hierba', nombreCientifico: 'Mentha pulegium', hue: 150, casosDeUso: ['digestion'] },
  { slug: 'eucalipto', nombre: 'Eucalipto', categoria: 'Hierba', nombreCientifico: 'Eucalyptus', hue: 160, casosDeUso: ['defensas'] },
  { slug: 'malva', nombre: 'Malva', categoria: 'Hierba', nombreCientifico: 'Malva sylvestris', hue: 290, casosDeUso: ['digestion'] },
  { slug: 'llanten', nombre: 'Llantén', categoria: 'Hierba', nombreCientifico: 'Plantago major', hue: 140, casosDeUso: ['defensas'] },
  { slug: 'sen', nombre: 'Sen', categoria: 'Hierba', nombreCientifico: 'Senna alexandrina', hue: 80, casosDeUso: ['digestion'] },
  { slug: 'pasiflora', nombre: 'Pasiflora', categoria: 'Hierba', nombreCientifico: 'Passiflora', hue: 270, casosDeUso: ['descanso'] },
  { slug: 'valeriana', nombre: 'Valeriana', categoria: 'Hierba', nombreCientifico: 'Valeriana officinalis', hue: 260, casosDeUso: ['descanso'] },
  { slug: 'ginkgo-biloba', nombre: 'Ginkgo biloba', categoria: 'Hierba', nombreCientifico: 'Ginkgo biloba', hue: 120, casosDeUso: ['mente'] },
  { slug: 'centella-asiatica', nombre: 'Centella asiática', categoria: 'Hierba', nombreCientifico: 'Centella asiatica', hue: 150, casosDeUso: ['defensas'] },
  { slug: 'calendula', nombre: 'Caléndula', categoria: 'Hierba', nombreCientifico: 'Calendula officinalis', hue: 65, casosDeUso: ['defensas'] },
  { slug: 'equinacea', nombre: 'Equinácea', categoria: 'Hierba', nombreCientifico: 'Echinacea', hue: 320, casosDeUso: ['defensas'] },
  { slug: 'hibisco', nombre: 'Hibisco', categoria: 'Hierba', nombreCientifico: 'Hibiscus sabdariffa', hue: 350, casosDeUso: ['defensas'] },
  { slug: 'aloe-vera', nombre: 'Aloe vera', categoria: 'Hierba', nombreCientifico: 'Aloe barbadensis', hue: 150, casosDeUso: ['digestion'] },
  { slug: 'cardo-mariano', nombre: 'Cardo mariano', categoria: 'Hierba', nombreCientifico: 'Silybum marianum', hue: 290, casosDeUso: ['digestion'] },
  { slug: 'fucus', nombre: 'Fucus', categoria: 'Hierba', nombreCientifico: 'Fucus vesiculosus', hue: 160, casosDeUso: ['energia'] },
  { slug: 'zarzaparrilla', nombre: 'Zarzaparrilla', categoria: 'Hierba', nombreCientifico: 'Smilax', hue: 130, casosDeUso: ['defensas'] },
  { slug: 'lupulo', nombre: 'Lúpulo', categoria: 'Hierba', nombreCientifico: 'Humulus lupulus', hue: 100, casosDeUso: ['descanso'] },
  { slug: 'milenrama', nombre: 'Milenrama', categoria: 'Hierba', nombreCientifico: 'Achillea millefolium', hue: 90, casosDeUso: ['digestion'] },
  { slug: 'una-de-gato', nombre: 'Uña de gato', categoria: 'Hierba', nombreCientifico: 'Uncaria tomentosa', hue: 40, casosDeUso: ['defensas'] },

  // ===== Especias =====
  { slug: 'pimienta-negra', nombre: 'Pimienta negra', categoria: 'Especia', nombreCientifico: 'Piper nigrum', hue: 30, casosDeUso: ['digestion'] },
  { slug: 'pimienta-blanca', nombre: 'Pimienta blanca', categoria: 'Especia', nombreCientifico: 'Piper nigrum', hue: 60, casosDeUso: ['digestion'] },
  { slug: 'pimenton', nombre: 'Pimentón', categoria: 'Especia', nombreCientifico: 'Capsicum annuum', hue: 30, casosDeUso: ['digestion'] },
  { slug: 'aji-molido', nombre: 'Ají molido', categoria: 'Especia', nombreCientifico: 'Capsicum', hue: 25, casosDeUso: ['digestion'] },
  { slug: 'nuez-moscada', nombre: 'Nuez moscada', categoria: 'Especia', nombreCientifico: 'Myristica fragrans', hue: 40, casosDeUso: ['digestion'] },
  { slug: 'clavo-de-olor', nombre: 'Clavo de olor', categoria: 'Especia', nombreCientifico: 'Syzygium aromaticum', hue: 35, casosDeUso: ['digestion', 'defensas'] },
  { slug: 'cardamomo', nombre: 'Cardamomo', categoria: 'Especia', nombreCientifico: 'Elettaria cardamomum', hue: 110, casosDeUso: ['digestion'] },
  { slug: 'curry', nombre: 'Curry', categoria: 'Especia', hue: 60, casosDeUso: ['digestion'] },
  { slug: 'laurel', nombre: 'Laurel', categoria: 'Especia', nombreCientifico: 'Laurus nobilis', hue: 150, casosDeUso: ['digestion'] },
  { slug: 'tomillo', nombre: 'Tomillo', categoria: 'Especia', nombreCientifico: 'Thymus vulgaris', hue: 140, casosDeUso: ['digestion', 'defensas'] },
  { slug: 'eneldo', nombre: 'Eneldo', categoria: 'Especia', nombreCientifico: 'Anethum graveolens', hue: 130, casosDeUso: ['digestion'] },
  { slug: 'azafran', nombre: 'Azafrán', categoria: 'Especia', nombreCientifico: 'Crocus sativus', hue: 45, casosDeUso: ['mente'] },
  { slug: 'vainilla', nombre: 'Vainilla', categoria: 'Especia', nombreCientifico: 'Vanilla planifolia', hue: 50, casosDeUso: ['energia'] },
  { slug: 'coriandro', nombre: 'Coriandro', categoria: 'Especia', nombreCientifico: 'Coriandrum sativum', hue: 90, casosDeUso: ['digestion'] },
  { slug: 'fenogreco', nombre: 'Fenogreco', categoria: 'Especia', nombreCientifico: 'Trigonella foenum-graecum', hue: 70, casosDeUso: ['digestion'] },
  { slug: 'anis-estrellado', nombre: 'Anís estrellado', categoria: 'Especia', nombreCientifico: 'Illicium verum', hue: 40, casosDeUso: ['digestion'] },
  { slug: 'hinojo', nombre: 'Hinojo', categoria: 'Especia', nombreCientifico: 'Foeniculum vulgare', hue: 110, casosDeUso: ['digestion'] },
  { slug: 'ajo-en-polvo', nombre: 'Ajo en polvo', categoria: 'Especia', nombreCientifico: 'Allium sativum', hue: 70, casosDeUso: ['defensas'] },
  { slug: 'cebolla-en-polvo', nombre: 'Cebolla en polvo', categoria: 'Especia', nombreCientifico: 'Allium cepa', hue: 60, casosDeUso: ['digestion'] },
  { slug: 'provenzal', nombre: 'Hierbas provenzales', categoria: 'Especia', hue: 140, casosDeUso: ['digestion'] },

  // ===== Superalimentos =====
  { slug: 'chlorella', nombre: 'Chlorella', categoria: 'Superalimento', nombreCientifico: 'Chlorella', hue: 160, casosDeUso: ['energia', 'defensas'] },
  { slug: 'acai', nombre: 'Açaí', categoria: 'Superalimento', nombreCientifico: 'Euterpe oleracea', hue: 290, casosDeUso: ['energia', 'defensas'] },
  { slug: 'camu-camu', nombre: 'Camu camu', categoria: 'Superalimento', nombreCientifico: 'Myrciaria dubia', hue: 30, casosDeUso: ['defensas'] },
  { slug: 'moringa', nombre: 'Moringa', categoria: 'Superalimento', nombreCientifico: 'Moringa oleifera', hue: 150, casosDeUso: ['energia', 'defensas'] },
  { slug: 'baobab', nombre: 'Baobab', categoria: 'Superalimento', nombreCientifico: 'Adansonia', hue: 55, casosDeUso: ['defensas', 'digestion'] },
  { slug: 'lucuma', nombre: 'Lúcuma', categoria: 'Superalimento', nombreCientifico: 'Pouteria lucuma', hue: 55, casosDeUso: ['energia'] },
  { slug: 'wheatgrass', nombre: 'Hierba de trigo', categoria: 'Superalimento', nombreCientifico: 'Triticum aestivum', hue: 150, casosDeUso: ['energia', 'defensas'] },
  { slug: 'guarana', nombre: 'Guaraná', categoria: 'Superalimento', nombreCientifico: 'Paullinia cupana', hue: 30, casosDeUso: ['energia', 'mente'] },
  { slug: 'maqui', nombre: 'Maqui', categoria: 'Superalimento', nombreCientifico: 'Aristotelia chilensis', hue: 290, casosDeUso: ['defensas'] },
  { slug: 'reishi', nombre: 'Reishi', categoria: 'Superalimento', nombreCientifico: 'Ganoderma lucidum', hue: 25, casosDeUso: ['defensas', 'descanso'] },
  { slug: 'cordyceps', nombre: 'Cordyceps', categoria: 'Superalimento', nombreCientifico: 'Cordyceps', hue: 40, casosDeUso: ['energia'] },
  { slug: 'melena-de-leon', nombre: 'Melena de león', categoria: 'Superalimento', nombreCientifico: 'Hericium erinaceus', hue: 60, casosDeUso: ['mente'] },
  { slug: 'cacao-nibs', nombre: 'Nibs de cacao', categoria: 'Superalimento', nombreCientifico: 'Theobroma cacao', hue: 35, casosDeUso: ['energia', 'mente'] },
  { slug: 'levadura-de-cerveza', nombre: 'Levadura de cerveza', categoria: 'Superalimento', hue: 70, casosDeUso: ['energia'] },
  { slug: 'proteina-de-arveja', nombre: 'Proteína de arveja', categoria: 'Superalimento', hue: 110, casosDeUso: ['energia', 'articulaciones'] },
  { slug: 'proteina-de-arroz', nombre: 'Proteína de arroz', categoria: 'Superalimento', hue: 60, casosDeUso: ['energia', 'articulaciones'] },

  // ===== Producto apícola =====
  { slug: 'jalea-real', nombre: 'Jalea real', categoria: 'Producto apícola', hue: 65, casosDeUso: ['energia', 'defensas'] },
  { slug: 'propoleo', nombre: 'Propóleo', categoria: 'Producto apícola', hue: 40, casosDeUso: ['defensas'] },
  { slug: 'polen', nombre: 'Polen', categoria: 'Producto apícola', hue: 60, casosDeUso: ['energia', 'defensas'] },

  // ===== Raíz =====
  { slug: 'ginseng', nombre: 'Ginseng', categoria: 'Raíz', nombreCientifico: 'Panax ginseng', hue: 50, casosDeUso: ['energia', 'mente'] },
  { slug: 'regaliz', nombre: 'Regaliz', categoria: 'Raíz', nombreCientifico: 'Glycyrrhiza glabra', hue: 60, casosDeUso: ['digestion'] },
  { slug: 'bardana', nombre: 'Bardana', categoria: 'Raíz', nombreCientifico: 'Arctium lappa', hue: 40, casosDeUso: ['defensas'] },

  // ===== Alga =====
  { slug: 'nori', nombre: 'Alga nori', categoria: 'Alga', nombreCientifico: 'Porphyra', hue: 160, casosDeUso: ['defensas'] },
  { slug: 'wakame', nombre: 'Alga wakame', categoria: 'Alga', nombreCientifico: 'Undaria pinnatifida', hue: 165, casosDeUso: ['defensas'] },
  { slug: 'kombu', nombre: 'Alga kombu', categoria: 'Alga', nombreCientifico: 'Laminaria', hue: 155, casosDeUso: ['digestion'] },
  { slug: 'agar-agar', nombre: 'Agar agar', categoria: 'Alga', hue: 150, casosDeUso: ['digestion'] },

  // ===== Untables =====
  { slug: 'tahini', nombre: 'Tahini (pasta de sésamo)', categoria: 'Untable', nombreCientifico: 'Sesamum indicum', hue: 70, casosDeUso: ['articulaciones', 'energia'] },
  { slug: 'manteca-de-mani', nombre: 'Manteca de maní', categoria: 'Untable', hue: 40, casosDeUso: ['energia'] },
  { slug: 'manteca-de-almendras', nombre: 'Manteca de almendras', categoria: 'Untable', hue: 60, casosDeUso: ['energia'] },
  { slug: 'pasta-de-datil', nombre: 'Pasta de dátil', categoria: 'Untable', hue: 40, casosDeUso: ['energia'] },

  // ===== Aceites =====
  { slug: 'aceite-de-uva', nombre: 'Aceite de semilla de uva', categoria: 'Aceite', nombreCientifico: 'Vitis vinifera', hue: 100, casosDeUso: ['articulaciones'] },
  { slug: 'aceite-de-palta', nombre: 'Aceite de palta', categoria: 'Aceite', nombreCientifico: 'Persea americana', hue: 110, casosDeUso: ['articulaciones', 'energia'] },
  { slug: 'aceite-de-almendras', nombre: 'Aceite de almendras', categoria: 'Aceite', nombreCientifico: 'Prunus dulcis', hue: 60, casosDeUso: ['energia'] },

  // ===== Endulzantes =====
  { slug: 'eritritol', nombre: 'Eritritol', categoria: 'Endulzante', hue: 150, casosDeUso: ['energia'] },
  { slug: 'xilitol', nombre: 'Xilitol', categoria: 'Endulzante', hue: 150, casosDeUso: ['energia'] },
  { slug: 'panela', nombre: 'Panela', categoria: 'Endulzante', nombreCientifico: 'Saccharum officinarum', hue: 40, casosDeUso: ['energia'] },
  { slug: 'azucar-rubia', nombre: 'Azúcar rubia', categoria: 'Endulzante', hue: 55, casosDeUso: ['energia'] },

  // ===== Cereales =====
  { slug: 'arroz-basmati', nombre: 'Arroz basmati', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 65, casosDeUso: ['energia'] },
  { slug: 'tapioca', nombre: 'Tapioca', categoria: 'Cereal', nombreCientifico: 'Manihot esculenta', hue: 70, casosDeUso: ['energia'] },
  { slug: 'copos-de-quinoa', nombre: 'Copos de quinoa', categoria: 'Cereal', nombreCientifico: 'Chenopodium quinoa', hue: 90, casosDeUso: ['energia', 'digestion'] },
  { slug: 'germen-de-trigo', nombre: 'Germen de trigo', categoria: 'Cereal', nombreCientifico: 'Triticum', hue: 60, casosDeUso: ['energia', 'defensas'] },
  { slug: 'arroz-arborio', nombre: 'Arroz arborio', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 68, casosDeUso: ['energia'] },
  { slug: 'salvado-de-arroz', nombre: 'Salvado de arroz', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 60, casosDeUso: ['digestion'] },

  // ===== Semillas =====
  { slug: 'semillas-de-mostaza', nombre: 'Semillas de mostaza', categoria: 'Semilla', nombreCientifico: 'Brassica', hue: 55, casosDeUso: ['digestion'] },
  { slug: 'sesamo-negro', nombre: 'Sésamo negro', categoria: 'Semilla', nombreCientifico: 'Sesamum indicum', hue: 30, casosDeUso: ['articulaciones', 'digestion'] },

  // ===== Frutas secas / deshidratadas =====
  { slug: 'cerezas-secas', nombre: 'Cerezas secas', categoria: 'Fruta seca', nombreCientifico: 'Prunus avium', hue: 0, casosDeUso: ['energia'] },
  { slug: 'peras-deshidratadas', nombre: 'Peras deshidratadas', categoria: 'Fruta seca', nombreCientifico: 'Pyrus', hue: 70, casosDeUso: ['digestion'] },
  { slug: 'frutillas-deshidratadas', nombre: 'Frutillas deshidratadas', categoria: 'Fruta seca', nombreCientifico: 'Fragaria', hue: 0, casosDeUso: ['energia'] },
  { slug: 'kiwi-deshidratado', nombre: 'Kiwi deshidratado', categoria: 'Fruta seca', nombreCientifico: 'Actinidia deliciosa', hue: 110, casosDeUso: ['defensas'] },
  { slug: 'papaya-deshidratada', nombre: 'Papaya deshidratada', categoria: 'Fruta seca', nombreCientifico: 'Carica papaya', hue: 50, casosDeUso: ['digestion'] },
  { slug: 'coco-chips', nombre: 'Chips de coco', categoria: 'Fruta seca', nombreCientifico: 'Cocos nucifera', hue: 110, casosDeUso: ['energia'] },
  { slug: 'datil-medjool', nombre: 'Dátiles medjool', categoria: 'Fruta seca', nombreCientifico: 'Phoenix dactylifera', hue: 35, casosDeUso: ['energia'] },
  { slug: 'pasas-de-corinto', nombre: 'Pasas de Corinto', categoria: 'Fruta seca', nombreCientifico: 'Vitis vinifera', hue: 30, casosDeUso: ['energia'] },
  { slug: 'pelones', nombre: 'Pelones (duraznos secos)', categoria: 'Fruta seca', nombreCientifico: 'Prunus persica', hue: 45, casosDeUso: ['digestion', 'energia'] },
  { slug: 'mix-tropical', nombre: 'Mix tropical deshidratado', categoria: 'Fruta seca', hue: 55, casosDeUso: ['energia'] },

  // ===== Frutos secos =====
  { slug: 'castanas', nombre: 'Castañas', categoria: 'Fruto seco', nombreCientifico: 'Castanea sativa', hue: 35, casosDeUso: ['energia'] },
  { slug: 'frutos-secos-tostados', nombre: 'Frutos secos tostados', categoria: 'Fruto seco', hue: 45, casosDeUso: ['energia', 'mente'] },

  // ===== Legumbres =====
  { slug: 'lenteja-turca', nombre: 'Lenteja turca (coral)', categoria: 'Legumbre', nombreCientifico: 'Lens culinaris', hue: 30, casosDeUso: ['energia', 'digestion'] },
  { slug: 'poroto-pallar', nombre: 'Poroto pallar', categoria: 'Legumbre', nombreCientifico: 'Phaseolus lunatus', hue: 80, casosDeUso: ['energia', 'digestion'] },
  { slug: 'edamame', nombre: 'Edamame', categoria: 'Legumbre', nombreCientifico: 'Glycine max', hue: 120, casosDeUso: ['energia'] },

  // ===== Harinas =====
  { slug: 'harina-de-mandioca', nombre: 'Harina de mandioca', categoria: 'Harina', nombreCientifico: 'Manihot esculenta', hue: 65, casosDeUso: ['energia'] },
  { slug: 'harina-de-trigo-sarraceno', nombre: 'Harina de trigo sarraceno', categoria: 'Harina', nombreCientifico: 'Fagopyrum esculentum', hue: 30, casosDeUso: ['energia', 'digestion'] },
  { slug: 'harina-de-quinoa', nombre: 'Harina de quinoa', categoria: 'Harina', nombreCientifico: 'Chenopodium quinoa', hue: 90, casosDeUso: ['energia', 'digestion'] },
  { slug: 'harina-de-centeno', nombre: 'Harina de centeno', categoria: 'Harina', nombreCientifico: 'Secale cereale', hue: 50, casosDeUso: ['digestion'] },
  { slug: 'harina-de-soja', nombre: 'Harina de soja', categoria: 'Harina', nombreCientifico: 'Glycine max', hue: 70, casosDeUso: ['energia'] },
  { slug: 'harina-de-amaranto', nombre: 'Harina de amaranto', categoria: 'Harina', nombreCientifico: 'Amaranthus', hue: 28, casosDeUso: ['energia', 'digestion'] },
  { slug: 'harina-de-mijo', nombre: 'Harina de mijo', categoria: 'Harina', nombreCientifico: 'Panicum miliaceum', hue: 75, casosDeUso: ['energia'] },
  { slug: 'premezcla-sin-tacc', nombre: 'Premezcla sin TACC', categoria: 'Harina', hue: 60, casosDeUso: ['energia'] },

  // ===== Coco =====
  { slug: 'leche-de-coco', nombre: 'Leche de coco', categoria: 'Coco', nombreCientifico: 'Cocos nucifera', hue: 110, casosDeUso: ['energia'] },
  { slug: 'agua-de-coco', nombre: 'Agua de coco', categoria: 'Coco', nombreCientifico: 'Cocos nucifera', hue: 120, casosDeUso: ['energia'] },
  { slug: 'coco-en-cubos', nombre: 'Coco en cubos', categoria: 'Coco', nombreCientifico: 'Cocos nucifera', hue: 108, casosDeUso: ['energia'] },

  // ===== Condimentos =====
  { slug: 'sal-rosa-del-himalaya', nombre: 'Sal rosa del Himalaya', categoria: 'Condimento', hue: 10, casosDeUso: ['energia'] },
  { slug: 'sal-marina', nombre: 'Sal marina', categoria: 'Condimento', hue: 200, casosDeUso: ['energia'] },
  { slug: 'gomasio', nombre: 'Gomasio', categoria: 'Condimento', hue: 60, casosDeUso: ['digestion'] },

  // ===== Fermentados =====
  { slug: 'vinagre-de-manzana', nombre: 'Vinagre de manzana', categoria: 'Fermentado', nombreCientifico: 'Malus domestica', hue: 45, casosDeUso: ['digestion'] },
  { slug: 'miso', nombre: 'Miso', categoria: 'Fermentado', nombreCientifico: 'Glycine max', hue: 40, casosDeUso: ['digestion', 'defensas'] },

  // ===== Más hierbas para completar =====
  { slug: 'genciana', nombre: 'Genciana', categoria: 'Hierba', nombreCientifico: 'Gentiana lutea', hue: 50, casosDeUso: ['digestion'] },
  { slug: 'abedul', nombre: 'Abedul', categoria: 'Hierba', nombreCientifico: 'Betula', hue: 130, casosDeUso: ['defensas'] },
  { slug: 'hamamelis', nombre: 'Hamamelis', categoria: 'Hierba', nombreCientifico: 'Hamamelis virginiana', hue: 60, casosDeUso: ['defensas'] },
  { slug: 'palo-azul', nombre: 'Palo azul', categoria: 'Hierba', nombreCientifico: 'Eysenhardtia polystachya', hue: 220, casosDeUso: ['defensas'] },
  { slug: 'doradilla', nombre: 'Doradilla', categoria: 'Hierba', nombreCientifico: 'Selaginella lepidophylla', hue: 90, casosDeUso: ['defensas'] },
  { slug: 'espina-colorada', nombre: 'Espina colorada', categoria: 'Hierba', nombreCientifico: 'Solanum sisymbriifolium', hue: 20, casosDeUso: ['digestion'] },
  { slug: 'incayuyo', nombre: 'Incayuyo', categoria: 'Hierba', nombreCientifico: 'Lippia integrifolia', hue: 120, casosDeUso: ['digestion'] },
  { slug: 'te-de-bugre', nombre: 'Té de bugre', categoria: 'Hierba', nombreCientifico: 'Cordia salicifolia', hue: 100, casosDeUso: ['energia'] },
  { slug: 'pezuna-de-vaca', nombre: 'Pezuña de vaca', categoria: 'Hierba', nombreCientifico: 'Bauhinia forficata', hue: 130, casosDeUso: ['defensas'] },
  { slug: 'yacon', nombre: 'Yacón', categoria: 'Raíz', nombreCientifico: 'Smallanthus sonchifolius', hue: 55, casosDeUso: ['digestion'] },

  // ===== Más superalimentos / varios =====
  { slug: 'alga-klamath', nombre: 'Alga klamath', categoria: 'Superalimento', hue: 165, casosDeUso: ['energia', 'mente'] },
  { slug: 'mix-energetico', nombre: 'Mix energético', categoria: 'Fruto seco', hue: 50, casosDeUso: ['energia'] },
  { slug: 'semillas-surtidas', nombre: 'Mix de semillas', categoria: 'Semilla', hue: 75, casosDeUso: ['energia', 'digestion'] },
  { slug: 'granola-sin-tacc', nombre: 'Granola sin TACC', categoria: 'Cereal', hue: 60, casosDeUso: ['energia', 'digestion'] },
  { slug: 'frambuesas-deshidratadas', nombre: 'Frambuesas deshidratadas', categoria: 'Fruta seca', nombreCientifico: 'Rubus idaeus', hue: 350, casosDeUso: ['defensas'] },
  { slug: 'higos-turcos', nombre: 'Higos turcos', categoria: 'Fruta seca', nombreCientifico: 'Ficus carica', hue: 42, casosDeUso: ['digestion', 'energia'] },
  { slug: 'ciruela-dagen', nombre: "Ciruela d'Agen", categoria: 'Fruta seca', nombreCientifico: 'Prunus domestica', hue: 28, casosDeUso: ['digestion'] },
  { slug: 'arroz-rojo', nombre: 'Arroz rojo', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 20, casosDeUso: ['energia', 'digestion'] },
  { slug: 'copos-de-avena-finos', nombre: 'Copos de avena finos', categoria: 'Cereal', nombreCientifico: 'Avena sativa', hue: 65, casosDeUso: ['energia', 'digestion'] },
  { slug: 'quinoa-inflada', nombre: 'Quinoa inflada', categoria: 'Cereal', nombreCientifico: 'Chenopodium quinoa', hue: 88, casosDeUso: ['energia'] },
  { slug: 'mostaza-en-polvo', nombre: 'Mostaza en polvo', categoria: 'Especia', nombreCientifico: 'Brassica', hue: 55, casosDeUso: ['digestion'] },
  { slug: 'manteca-de-castanas-caju', nombre: 'Manteca de castañas de cajú', categoria: 'Untable', hue: 45, casosDeUso: ['energia'] },
  { slug: 'garbanzo-partido', nombre: 'Garbanzo partido', categoria: 'Legumbre', nombreCientifico: 'Cicer arietinum', hue: 75, casosDeUso: ['energia', 'digestion'] },
  { slug: 'lenteja-coral', nombre: 'Lenteja coral', categoria: 'Legumbre', nombreCientifico: 'Lens culinaris', hue: 32, casosDeUso: ['energia', 'digestion'] },
  { slug: 'aceite-de-chia', nombre: 'Aceite de chía', categoria: 'Aceite', nombreCientifico: 'Salvia hispanica', hue: 150, casosDeUso: ['mente', 'articulaciones'] },
  { slug: 'aceite-de-girasol-alto-oleico', nombre: 'Aceite de girasol alto oleico', categoria: 'Aceite', nombreCientifico: 'Helianthus annuus', hue: 88, casosDeUso: ['energia'] },
  { slug: 'fructosa', nombre: 'Fructosa', categoria: 'Endulzante', hue: 50, casosDeUso: ['energia'] },
  { slug: 'azucar-impalpable', nombre: 'Azúcar impalpable', categoria: 'Endulzante', hue: 60, casosDeUso: ['energia'] },
  { slug: 'cacao-amargo', nombre: 'Cacao amargo en polvo', categoria: 'Superalimento', nombreCientifico: 'Theobroma cacao', hue: 33, casosDeUso: ['energia', 'mente'] },
  { slug: 'chia-blanca', nombre: 'Chía blanca', categoria: 'Semilla', nombreCientifico: 'Salvia hispanica', hue: 60, casosDeUso: ['digestion', 'articulaciones'] },
  { slug: 'lino-dorado', nombre: 'Lino dorado', categoria: 'Semilla', nombreCientifico: 'Linum usitatissimum', hue: 55, casosDeUso: ['digestion', 'mente'] },
  { slug: 'avena-instantanea', nombre: 'Avena instantánea', categoria: 'Cereal', nombreCientifico: 'Avena sativa', hue: 66, casosDeUso: ['energia', 'digestion'] },
  { slug: 'arroz-largo-fino', nombre: 'Arroz largo fino', categoria: 'Cereal', nombreCientifico: 'Oryza sativa', hue: 70, casosDeUso: ['energia'] },
  { slug: 'harina-de-coco-fina', nombre: 'Harina de coco extrafina', categoria: 'Harina', nombreCientifico: 'Cocos nucifera', hue: 108, casosDeUso: ['digestion', 'energia'] },
  { slug: 'semillas-de-zapallo-tostadas', nombre: 'Semillas de zapallo tostadas', categoria: 'Semilla', nombreCientifico: 'Cucurbita', hue: 100, casosDeUso: ['energia', 'defensas'] },
  { slug: 'mix-frutas-deshidratadas', nombre: 'Mix de frutas deshidratadas', categoria: 'Fruta seca', hue: 50, casosDeUso: ['energia'] },
  { slug: 'mani-tostado', nombre: 'Maní tostado', categoria: 'Fruto seco', nombreCientifico: 'Arachis hypogaea', hue: 42, casosDeUso: ['energia'] },
  { slug: 'castanas-de-caju-tostadas', nombre: 'Castañas de cajú tostadas', categoria: 'Fruto seco', nombreCientifico: 'Anacardium occidentale', hue: 47, casosDeUso: ['energia', 'mente'] },
  { slug: 'datiles-deglet', nombre: 'Dátiles deglet nour', categoria: 'Fruta seca', nombreCientifico: 'Phoenix dactylifera', hue: 38, casosDeUso: ['energia'] },
  { slug: 'te-blanco', nombre: 'Té blanco', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 90, casosDeUso: ['defensas', 'mente'] },
  { slug: 'te-rojo', nombre: 'Té rojo (pu-erh)', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 25, casosDeUso: ['energia', 'digestion'] },
  { slug: 'mate-cocido', nombre: 'Mate cocido', categoria: 'Infusión', nombreCientifico: 'Ilex paraguariensis', hue: 110, casosDeUso: ['energia'] },
  { slug: 'te-chai', nombre: 'Té chai', categoria: 'Infusión', hue: 35, casosDeUso: ['energia', 'digestion'] },
  { slug: 'curcuma-latte', nombre: 'Cúrcuma latte (golden milk)', categoria: 'Especia', nombreCientifico: 'Curcuma longa', hue: 70, casosDeUso: ['articulaciones', 'descanso'] },
];
