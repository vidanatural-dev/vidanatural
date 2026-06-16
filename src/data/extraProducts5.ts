import type { SeedProduct } from './productEngine';

// Catálogo extendido — Lote 5. Más variedad (tés, blends de especias, harinas,
// superalimentos, fermentos, untables, etc.). Lenguaje seguro, sin claims médicos.
export const extraSeeds5: SeedProduct[] = [
  // ── Infusiones y tés ──
  { slug: 'te-sencha', nombre: 'Té sencha', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 120, casosDeUso: ['mente', 'control-peso'] },
  { slug: 'te-genmaicha', nombre: 'Té genmaicha', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 70, casosDeUso: ['mente'] },
  { slug: 'te-earl-grey', nombre: 'Té Earl Grey', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 40, casosDeUso: ['mente'] },
  { slug: 'te-de-jazmin', nombre: 'Té de jazmín', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 60, casosDeUso: ['descanso'] },
  { slug: 'te-darjeeling', nombre: 'Té darjeeling', categoria: 'Infusión', nombreCientifico: 'Camellia sinensis', hue: 30, casosDeUso: ['mente'] },
  { slug: 'mate-tostado', nombre: 'Mate tostado', categoria: 'Infusión', nombreCientifico: 'Ilex paraguariensis', hue: 35, casosDeUso: ['energia', 'mente'] },
  { slug: 'te-de-anis', nombre: 'Té de anís', categoria: 'Infusión', nombreCientifico: 'Pimpinella anisum', hue: 70, casosDeUso: ['digestion'] },
  { slug: 'te-de-eucalipto', nombre: 'Té de eucalipto', categoria: 'Infusión', nombreCientifico: 'Eucalyptus globulus', hue: 150, casosDeUso: ['defensas'] },
  { slug: 'te-de-cedron', nombre: 'Té de cedrón', categoria: 'Infusión', nombreCientifico: 'Aloysia citrodora', hue: 110, casosDeUso: ['digestion', 'descanso'] },
  { slug: 'chai-latte-mix', nombre: 'Chai latte (mezcla)', categoria: 'Infusión', hue: 30, casosDeUso: ['digestion'] },

  // ── Especias y blends ──
  { slug: 'cinco-especias', nombre: 'Cinco especias chinas', categoria: 'Especia', hue: 30, casosDeUso: ['digestion'] },
  { slug: 'baharat', nombre: 'Baharat', categoria: 'Especia', hue: 25, casosDeUso: ['digestion'] },
  { slug: 'berbere', nombre: 'Berbere', categoria: 'Especia', hue: 20, casosDeUso: ['digestion'] },
  { slug: 'tandoori-masala', nombre: 'Tandoori masala', categoria: 'Especia', hue: 20, casosDeUso: ['digestion'] },
  { slug: 'harissa-seca', nombre: 'Harissa seca', categoria: 'Especia', hue: 18, casosDeUso: ['circulacion'] },
  { slug: 'jerk-seasoning', nombre: 'Jerk jamaiquino', categoria: 'Especia', hue: 30, casosDeUso: ['digestion'] },
  { slug: 'sazonador-cajun', nombre: 'Sazonador cajún', categoria: 'Especia', hue: 22, casosDeUso: ['digestion'] },
  { slug: 'mezcla-para-pizza', nombre: 'Mezcla para pizza', categoria: 'Especia', hue: 100, casosDeUso: ['digestion'] },
  { slug: 'pimienta-de-limon', nombre: 'Pimienta de limón', categoria: 'Especia', hue: 70, casosDeUso: ['digestion'] },
  { slug: 'sazonador-criollo', nombre: 'Sazonador criollo', categoria: 'Especia', hue: 25, casosDeUso: ['digestion'] },

  // ── Hierbas ──
  { slug: 'sauco', nombre: 'Saúco', categoria: 'Hierba', nombreCientifico: 'Sambucus nigra', hue: 280, casosDeUso: ['defensas'] },
  { slug: 'gordolobo', nombre: 'Gordolobo', categoria: 'Hierba', nombreCientifico: 'Verbascum thapsus', hue: 55, casosDeUso: ['defensas'] },
  { slug: 'hierbabuena', nombre: 'Hierbabuena', categoria: 'Hierba', nombreCientifico: 'Mentha spicata', hue: 145, casosDeUso: ['digestion'] },
  { slug: 'marrubio', nombre: 'Marrubio', categoria: 'Hierba', nombreCientifico: 'Marrubium vulgare', hue: 100, casosDeUso: ['digestion'] },
  { slug: 'salvia-blanca', nombre: 'Salvia blanca', categoria: 'Hierba', nombreCientifico: 'Salvia apiana', hue: 110, casosDeUso: ['digestion'] },
  { slug: 'oregano-de-monte', nombre: 'Orégano de monte', categoria: 'Hierba', nombreCientifico: 'Lippia graveolens', hue: 95, casosDeUso: ['digestion'] },

  // ── Superalimentos ──
  { slug: 'maca-amarilla', nombre: 'Maca amarilla', categoria: 'Superalimento', nombreCientifico: 'Lepidium meyenii', hue: 50, casosDeUso: ['energia'] },
  { slug: 'cacao-ceremonial', nombre: 'Cacao ceremonial', categoria: 'Superalimento', nombreCientifico: 'Theobroma cacao', hue: 28, casosDeUso: ['mente', 'energia'] },
  { slug: 'matcha-ceremonial', nombre: 'Matcha ceremonial', categoria: 'Superalimento', nombreCientifico: 'Camellia sinensis', hue: 130, casosDeUso: ['mente', 'energia'] },
  { slug: 'mesquite-en-polvo', nombre: 'Mesquite en polvo', categoria: 'Superalimento', nombreCientifico: 'Prosopis', hue: 35, casosDeUso: ['energia'] },
  { slug: 'proteina-de-girasol', nombre: 'Proteína de girasol', categoria: 'Superalimento', nombreCientifico: 'Helianthus annuus', hue: 60, casosDeUso: ['energia'] },
  { slug: 'proteina-de-calabaza', nombre: 'Proteína de calabaza', categoria: 'Superalimento', hue: 90, casosDeUso: ['energia'] },
  { slug: 'proteina-de-soja-aislada', nombre: 'Proteína de soja aislada', categoria: 'Superalimento', nombreCientifico: 'Glycine max', hue: 50, casosDeUso: ['energia'] },
  { slug: 'espirulina-azul', nombre: 'Espirulina azul (ficocianina)', categoria: 'Superalimento', hue: 230, casosDeUso: ['energia', 'defensas'] },
  { slug: 'polvo-de-kale', nombre: 'Polvo de kale', categoria: 'Superalimento', hue: 140, casosDeUso: ['defensas', 'piel-cabello'] },
  { slug: 'polvo-de-espinaca', nombre: 'Polvo de espinaca', categoria: 'Superalimento', hue: 135, casosDeUso: ['defensas'] },

  // ── Legumbres ──
  { slug: 'garbanzo-kabuli', nombre: 'Garbanzo kabuli', categoria: 'Legumbre', nombreCientifico: 'Cicer arietinum', hue: 45, casosDeUso: ['energia'] },
  { slug: 'poroto-cannellini', nombre: 'Poroto cannellini', categoria: 'Legumbre', hue: 55, casosDeUso: ['energia'] },
  { slug: 'poroto-borlotti', nombre: 'Poroto borlotti', categoria: 'Legumbre', hue: 20, casosDeUso: ['energia'] },
  { slug: 'haba-baby', nombre: 'Haba baby', categoria: 'Legumbre', nombreCientifico: 'Vicia faba', hue: 90, casosDeUso: ['energia'] },
  { slug: 'arveja-verde-entera', nombre: 'Arveja verde entera', categoria: 'Legumbre', nombreCientifico: 'Pisum sativum', hue: 110, casosDeUso: ['energia'] },
  { slug: 'soja-amarilla', nombre: 'Soja amarilla', categoria: 'Legumbre', nombreCientifico: 'Glycine max', hue: 55, casosDeUso: ['energia', 'huesos'] },
  { slug: 'lenteja-castellana', nombre: 'Lenteja castellana', categoria: 'Legumbre', nombreCientifico: 'Lens culinaris', hue: 40, casosDeUso: ['energia'] },

  // ── Harinas ──
  { slug: 'harina-de-espelta', nombre: 'Harina de espelta', categoria: 'Harina', nombreCientifico: 'Triticum spelta', hue: 55, casosDeUso: ['energia'] },
  { slug: 'harina-de-kamut', nombre: 'Harina de kamut', categoria: 'Harina', nombreCientifico: 'Triticum turanicum', hue: 50, casosDeUso: ['energia'] },
  { slug: 'harina-de-sorgo', nombre: 'Harina de sorgo', categoria: 'Harina', nombreCientifico: 'Sorghum bicolor', hue: 45, casosDeUso: ['energia'] },
  { slug: 'harina-de-nuez', nombre: 'Harina de nuez', categoria: 'Harina', nombreCientifico: 'Juglans regia', hue: 35, casosDeUso: ['mente'] },
  { slug: 'harina-de-mani', nombre: 'Harina de maní', categoria: 'Harina', nombreCientifico: 'Arachis hypogaea', hue: 35, casosDeUso: ['energia'] },
  { slug: 'harina-de-zapallo', nombre: 'Harina de zapallo', categoria: 'Harina', hue: 35, casosDeUso: ['defensas'] },
  { slug: 'harina-de-batata', nombre: 'Harina de batata', categoria: 'Harina', hue: 30, casosDeUso: ['energia'] },
  { slug: 'harina-leudante-sin-tacc', nombre: 'Harina leudante sin TACC', categoria: 'Harina', hue: 60, casosDeUso: ['energia'] },
  { slug: 'harina-de-trigo-0000', nombre: 'Harina de trigo 0000', categoria: 'Harina', nombreCientifico: 'Triticum aestivum', hue: 60, casosDeUso: ['energia'] },
  { slug: 'harina-de-gluten', nombre: 'Harina de gluten', categoria: 'Harina', hue: 55, casosDeUso: ['energia'] },

  // ── Frutos secos ──
  { slug: 'almendras-tostadas', nombre: 'Almendras tostadas', categoria: 'Fruto seco', nombreCientifico: 'Prunus dulcis', hue: 35, casosDeUso: ['energia', 'circulacion'] },
  { slug: 'almendras-peladas', nombre: 'Almendras peladas', categoria: 'Fruto seco', nombreCientifico: 'Prunus dulcis', hue: 38, casosDeUso: ['energia'] },
  { slug: 'almendras-laminadas', nombre: 'Almendras laminadas', categoria: 'Fruto seco', nombreCientifico: 'Prunus dulcis', hue: 40, casosDeUso: ['energia'] },
  { slug: 'nueces-mariposa', nombre: 'Nueces mariposa', categoria: 'Fruto seco', nombreCientifico: 'Juglans regia', hue: 35, casosDeUso: ['mente', 'circulacion'] },
  { slug: 'avellanas-tostadas', nombre: 'Avellanas tostadas', categoria: 'Fruto seco', nombreCientifico: 'Corylus avellana', hue: 33, casosDeUso: ['energia'] },
  { slug: 'pistachos-pelados', nombre: 'Pistachos pelados', categoria: 'Fruto seco', nombreCientifico: 'Pistacia vera', hue: 90, casosDeUso: ['energia'] },
  { slug: 'nuez-pecan-tostada', nombre: 'Nuez pecán tostada', categoria: 'Fruto seco', nombreCientifico: 'Carya illinoinensis', hue: 28, casosDeUso: ['energia'] },
  { slug: 'mani-blanco', nombre: 'Maní blanco', categoria: 'Fruto seco', nombreCientifico: 'Arachis hypogaea', hue: 40, casosDeUso: ['energia'] },

  // ── Frutas secas / deshidratadas ──
  { slug: 'anana-confitada', nombre: 'Ananá confitada', categoria: 'Fruta seca', hue: 55, casosDeUso: ['energia'] },
  { slug: 'papaya-confitada', nombre: 'Papaya confitada', categoria: 'Fruta seca', hue: 35, casosDeUso: ['energia'] },
  { slug: 'cascara-de-naranja', nombre: 'Cáscara de naranja confitada', categoria: 'Fruta seca', hue: 40, casosDeUso: ['energia'] },
  { slug: 'hongos-secos', nombre: 'Hongos secos', categoria: 'Fruta seca', hue: 30, casosDeUso: ['defensas'] },
  { slug: 'datil-zahidi', nombre: 'Dátil zahidi', categoria: 'Fruta seca', nombreCientifico: 'Phoenix dactylifera', hue: 38, casosDeUso: ['energia'] },
  { slug: 'mango-verde-deshidratado', nombre: 'Mango verde deshidratado', categoria: 'Fruta seca', hue: 60, casosDeUso: ['energia'] },
  { slug: 'cereza-confitada', nombre: 'Cereza confitada', categoria: 'Fruta seca', hue: 350, casosDeUso: ['energia'] },
  { slug: 'chips-de-coco-tostado', nombre: 'Chips de coco tostado', categoria: 'Fruta seca', nombreCientifico: 'Cocos nucifera', hue: 40, casosDeUso: ['energia'] },

  // ── Aceites ──
  { slug: 'aceite-de-maiz', nombre: 'Aceite de maíz', categoria: 'Aceite', nombreCientifico: 'Zea mays', hue: 60, casosDeUso: ['circulacion'] },
  { slug: 'aceite-de-soja', nombre: 'Aceite de soja', categoria: 'Aceite', nombreCientifico: 'Glycine max', hue: 60, casosDeUso: ['circulacion'] },
  { slug: 'aceite-de-cartamo', nombre: 'Aceite de cártamo', categoria: 'Aceite', nombreCientifico: 'Carthamus tinctorius', hue: 55, casosDeUso: ['circulacion'] },
  { slug: 'aceite-de-mostaza', nombre: 'Aceite de mostaza', categoria: 'Aceite', nombreCientifico: 'Brassica', hue: 50, casosDeUso: ['circulacion'] },
  { slug: 'aceite-de-coco-neutro', nombre: 'Aceite de coco neutro', categoria: 'Aceite', nombreCientifico: 'Cocos nucifera', hue: 55, casosDeUso: ['energia'] },
  { slug: 'aceite-de-oliva-suave', nombre: 'Aceite de oliva suave', categoria: 'Aceite', nombreCientifico: 'Olea europaea', hue: 80, casosDeUso: ['circulacion'] },

  // ── Endulzantes ──
  { slug: 'azucar-negro', nombre: 'Azúcar negro', categoria: 'Endulzante', hue: 30, casosDeUso: ['energia'] },
  { slug: 'azucar-organica', nombre: 'Azúcar orgánica', categoria: 'Endulzante', hue: 45, casosDeUso: ['energia'] },
  { slug: 'dextrosa', nombre: 'Dextrosa', categoria: 'Endulzante', hue: 60, casosDeUso: ['energia'] },
  { slug: 'sirope-de-arroz', nombre: 'Sirope de arroz', categoria: 'Endulzante', nombreCientifico: 'Oryza sativa', hue: 50, casosDeUso: ['energia'] },
  { slug: 'alulosa', nombre: 'Alulosa', categoria: 'Endulzante', hue: 55, casosDeUso: ['control-peso'] },
  { slug: 'miel-de-cana', nombre: 'Miel de caña', categoria: 'Endulzante', hue: 30, casosDeUso: ['energia'] },

  // ── Algas ──
  { slug: 'espagueti-de-mar', nombre: 'Espagueti de mar', categoria: 'Alga', nombreCientifico: 'Himanthalia elongata', hue: 120, casosDeUso: ['huesos'] },
  { slug: 'mozuku', nombre: 'Mozuku', categoria: 'Alga', nombreCientifico: 'Cladosiphon okamuranus', hue: 130, casosDeUso: ['defensas'] },
  { slug: 'alga-codium', nombre: 'Alga codium', categoria: 'Alga', nombreCientifico: 'Codium fragile', hue: 140, casosDeUso: ['huesos'] },
  { slug: 'cochayuyo', nombre: 'Cochayuyo', categoria: 'Alga', nombreCientifico: 'Durvillaea antarctica', hue: 30, casosDeUso: ['huesos'] },

  // ── Fermentados ──
  { slug: 'kefir-de-agua', nombre: 'Kéfir de agua', categoria: 'Fermentado', hue: 50, casosDeUso: ['digestion'] },
  { slug: 'chucrut-violeta', nombre: 'Chucrut violeta', categoria: 'Fermentado', hue: 300, casosDeUso: ['digestion', 'defensas'] },
  { slug: 'pickles-de-pepino', nombre: 'Pickles de pepino', categoria: 'Fermentado', hue: 110, casosDeUso: ['digestion'] },
  { slug: 'vinagre-balsamico', nombre: 'Vinagre balsámico', categoria: 'Fermentado', hue: 25, casosDeUso: ['digestion'] },
  { slug: 'vinagre-de-vino', nombre: 'Vinagre de vino', categoria: 'Fermentado', hue: 340, casosDeUso: ['digestion'] },
  { slug: 'encurtidos-mixtos', nombre: 'Encurtidos mixtos', categoria: 'Fermentado', hue: 90, casosDeUso: ['digestion'] },

  // ── Untables ──
  { slug: 'manteca-de-pistacho', nombre: 'Manteca de pistacho', categoria: 'Untable', nombreCientifico: 'Pistacia vera', hue: 90, casosDeUso: ['energia'] },
  { slug: 'crema-de-cacao-y-avellanas', nombre: 'Crema de cacao y avellanas', categoria: 'Untable', hue: 28, casosDeUso: ['energia'] },
  { slug: 'hummus-clasico', nombre: 'Hummus clásico', categoria: 'Untable', nombreCientifico: 'Cicer arietinum', hue: 45, casosDeUso: ['energia', 'digestion'] },
  { slug: 'baba-ganoush', nombre: 'Baba ganoush', categoria: 'Untable', hue: 50, casosDeUso: ['digestion'] },
  { slug: 'pesto-de-albahaca', nombre: 'Pesto de albahaca', categoria: 'Untable', hue: 130, casosDeUso: ['digestion'] },
  { slug: 'mermelada-de-frutos-rojos', nombre: 'Mermelada de frutos rojos', categoria: 'Untable', hue: 340, casosDeUso: ['defensas'] },

  // ── Coco ──
  { slug: 'nata-de-coco', nombre: 'Nata de coco', categoria: 'Coco', nombreCientifico: 'Cocos nucifera', hue: 55, casosDeUso: ['energia'] },
  { slug: 'coco-deshidratado-fino', nombre: 'Coco deshidratado fino', categoria: 'Coco', nombreCientifico: 'Cocos nucifera', hue: 50, casosDeUso: ['energia'] },
  { slug: 'leche-de-coco-light', nombre: 'Leche de coco light', categoria: 'Coco', nombreCientifico: 'Cocos nucifera', hue: 55, casosDeUso: ['energia'] },

  // ── Condimentos ──
  { slug: 'sal-de-mar-gruesa', nombre: 'Sal de mar gruesa', categoria: 'Condimento', hue: 200, casosDeUso: ['digestion'] },
  { slug: 'mix-de-pimientas', nombre: 'Mix de pimientas', categoria: 'Condimento', hue: 30, casosDeUso: ['digestion'] },
  { slug: 'hierbas-finas', nombre: 'Hierbas finas', categoria: 'Condimento', hue: 110, casosDeUso: ['digestion'] },
  { slug: 'sal-de-hierbas', nombre: 'Sal de hierbas', categoria: 'Condimento', hue: 100, casosDeUso: ['digestion'] },
  { slug: 'condimento-para-arroz', nombre: 'Condimento para arroz', categoria: 'Condimento', hue: 60, casosDeUso: ['digestion'] },

  // ── Raíces ──
  { slug: 'raiz-de-diente-de-leon', nombre: 'Raíz de diente de león', categoria: 'Raíz', nombreCientifico: 'Taraxacum officinale', hue: 55, casosDeUso: ['digestion'] },
  { slug: 'ginseng-americano', nombre: 'Ginseng americano', categoria: 'Raíz', nombreCientifico: 'Panax quinquefolius', hue: 45, casosDeUso: ['energia'] },
  { slug: 'raiz-de-loto', nombre: 'Raíz de loto', categoria: 'Raíz', nombreCientifico: 'Nelumbo nucifera', hue: 40, casosDeUso: ['digestion'] },
  { slug: 'jengibre-seco', nombre: 'Jengibre seco', categoria: 'Raíz', nombreCientifico: 'Zingiber officinale', hue: 45, casosDeUso: ['digestion'] },

  // ── Productos apícolas ──
  { slug: 'miel-de-trebol', nombre: 'Miel de trébol', categoria: 'Producto apícola', hue: 50, casosDeUso: ['energia'] },
  { slug: 'miel-de-bosque', nombre: 'Miel de bosque', categoria: 'Producto apícola', hue: 35, casosDeUso: ['defensas'] },
  { slug: 'miel-de-milflores', nombre: 'Miel de milflores', categoria: 'Producto apícola', hue: 48, casosDeUso: ['energia'] },
  { slug: 'propoleo-en-polvo', nombre: 'Propóleo en polvo', categoria: 'Producto apícola', hue: 35, casosDeUso: ['defensas'] },
];
