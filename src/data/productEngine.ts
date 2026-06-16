import type { Product, UseCaseSlug, FAQItem, Fuente, FormaDeConsumo } from './types';
import { localImages } from './localImages';

// Productos con foto generada localmente (GPU/SDXL) en /public/productos/local/<slug>.webp
const LOCAL = new Set<string>(localImages);

/**
 * Generador de fichas de producto por categoría. Permite escalar el catálogo
 * con contenido prudente y no médico a partir de datos mínimos por producto.
 */

export interface SeedProduct {
  slug: string;
  nombre: string;
  categoria: string;
  nombreCientifico?: string;
  hue: number;
  casosDeUso: UseCaseSlug[];
  // Texto opcional para personalizar; si falta se genera por categoría.
  queEs?: string;
  resumen?: string;
  tagline?: string;
  destacado?: boolean;
}

const MED: Fuente = { nombre: 'MedlinePlus (Biblioteca Nacional de Medicina, EE. UU.)', url: 'https://medlineplus.gov/spanish/' };
const EFSA: Fuente = { nombre: 'Autoridad Europea de Seguridad Alimentaria (EFSA)', url: 'https://www.efsa.europa.eu/es' };
const FAO: Fuente = { nombre: 'Organización de las Naciones Unidas para la Alimentación (FAO)', url: 'https://www.fao.org/home/es' };
const OMS: Fuente = { nombre: 'Organización Mundial de la Salud (OMS)', url: 'https://www.who.int/es' };
const ODS: Fuente = { nombre: 'Oficina de Suplementos Dietéticos (NIH, EE. UU.)', url: 'https://ods.od.nih.gov/' };

// Productos con packshot real en /public/productos/<slug>.webp (se completa por oleadas).
const PACKSHOTS = new Set<string>([
  'castanas-caju', 'mani', 'avellanas', 'nuez-de-brasil', 'nuez-pecan',
  'pistachos', 'macadamia', 'pinones',
  // Oleada 1 (Materia Natural)
  'semillas-de-calabaza', 'arroz-integral', 'porotos-negros', 'soja',
  'harina-de-garbanzo', 'yerba-mate', 'canela', 'cacao-nibs', 'matcha',
  'datil-medjool', 'higos-secos', 'arandanos-secos', 'goji', 'mijo',
  'trigo-burgol', 'porotos-colorados', 'lenteja-coral', 'polenta',
  'quinoa-roja', 'semillas-de-amapola', 'sesamo-negro', 'cacao-amargo',
  'moringa', 'maca-roja',
  // Oleada 2 (estilo rico Materia Natural)
  'lino-dorado',
  'manzanilla', 'tilo', 'menta', 'valeriana', 'aloe-vera', 'boldo',
  'te-negro', 'rooibos', 'cardamomo', 'clavo-de-olor', 'pimienta-negra',
  'nuez-moscada', 'azafran', 'vainilla', 'laurel', 'oregano', 'romero',
  'tomillo', 'comino', 'curry', 'pimenton', 'chlorella', 'acai', 'reishi',
  'ashwagandha', 'camu-camu', 'guarana', 'maqui', 'baobab', 'lucuma',
  'stevia', 'azucar-de-coco', 'panela', 'chia-blanca', 'semillas-de-canamo',
  'psyllium', 'higos-turcos', 'wheatgrass',
  // Oleada 3 (liquidos en botella/frasco + hierbas)
  'aceite-de-oliva', 'aceite-de-girasol', 'aceite-de-lino', 'aceite-de-sesamo',
  'aceite-de-palta', 'aceite-de-almendras', 'aceite-de-canamo', 'aceite-de-argan',
  'miel-de-eucalipto', 'miel-cremosa', 'tahini', 'manteca-de-mani',
  'pasta-de-datil', 'vinagre-de-manzana', 'miso', 'manteca-de-coco',
  'leche-de-coco', 'agua-de-coco', 'jarabe-de-arce', 'jarabe-de-agave',
  'melaza', 'ginseng', 'regaliz', 'equinacea', 'hibisco', 'cola-de-caballo',
  'diente-de-leon', 'calendula', 'lavanda', 'ginkgo-biloba',
  // Oleada 4 (packshots Materia Natural provistos, ChatGPT)
  'ajo-en-polvo', 'albahaca', 'alcaravea', 'amaranto-inflado', 'anana-deshidratado',
  'anis-estrellado', 'arroz-basmati', 'arroz-negro', 'cebada', 'cebolla-en-polvo',
  'cedron', 'coco-rallado', 'comino-negro', 'copos-de-maiz', 'coriandro', 'couscous',
  'dulse', 'fecula-de-maiz', 'fenogreco', 'frambuesas-deshidratadas',
  'frutos-rojos-deshidratados', 'garam-masala', 'garbanzo-tostado', 'grosella-seca',
  'harina-de-amaranto', 'harina-de-arroz-integral', 'harina-de-castanas',
  'harina-de-mandioca', 'harina-de-quinoa', 'harina-de-teff', 'hinojo', 'lenteja-beluga',
  'maca-negra', 'mango-deshidratado', 'mix-de-pimientas', 'mix-tropical', 'orejones',
  'papaya-deshidratada', 'peras-deshidratadas', 'perejil', 'pimenton-ahumado',
  'polvo-de-espinaca', 'polvo-de-kale', 'polvo-de-remolacha', 'poroto-cranberry',
  'poroto-pallar', 'porotos-blancos', 'proteina-de-soja-aislada', 'quinoa-negra',
  'sal-rosa-del-himalaya', 'salvia', 'semillas-de-mostaza', 'semola', 'tapioca',
  'te-blanco', 'te-rojo', 'tomate-deshidratado', 'trigo-sarraceno', 'wakame',
]);

const FAQ_BASE: FAQItem[] = [
  {
    q: '¿Sirve para adelgazar?',
    a: 'No debe considerarse un producto para adelgazar. Puede formar parte de hábitos alimentarios saludables, pero no reemplaza una alimentación equilibrada ni la actividad física, y los resultados dependen de cada persona.',
  },
  {
    q: '¿Lo puede consumir cualquier persona?',
    a: 'En general sí, como alimento, pero conviene tener en cuenta alergias, intolerancias, edad, estado de salud y medicación. Ante embarazo, lactancia, enfermedades crónicas o tratamientos, consultá con un profesional de la salud.',
  },
  {
    q: '¿Reemplaza a los medicamentos?',
    a: 'No. Es un alimento, no un medicamento, y no debe usarse para sustituir tratamientos indicados por un profesional. Si tenés un problema de salud, consultá con tu médico.',
  },
];

interface CatTemplate {
  tagline: (n: string) => string;
  composicion: string[];
  usos: string[];
  consumo: FormaDeConsumo[];
  precauciones: string[];
  contra: string;
  fuentes: Fuente[];
}

const PREC_COMUNES = ['Elegí productos de origen confiable y leé la etiqueta.', 'Conservá en un lugar fresco y seco, bien cerrado.'];

const CATS: Record<string, CatTemplate> = {
  'Fruto seco': {
    tagline: (n) => `${n}: fruto seco nutritivo, fuente de grasas saludables.`,
    composicion: ['Grasas saludables (mono y poliinsaturadas).', 'Proteínas vegetales y fibra.', 'Vitaminas y minerales como magnesio y zinc.'],
    usos: ['Como snack, solo o en mix de frutos secos.', 'En repostería, granolas y barras.', 'Picado sobre ensaladas, yogur o avena.'],
    consumo: [{ forma: 'Natural', detalle: 'Crudo o tostado, como colación.' }, { forma: 'En recetas', detalle: 'En panificados, ensaladas y postres.' }],
    precauciones: ['Alergia a frutos secos: evitar su consumo, las reacciones pueden ser graves.', 'Es calórico: cuidar el tamaño de la porción.', 'En niños pequeños, ofrecerlo molido por el riesgo de atragantamiento.'],
    contra: 'El cuidado principal es la alergia a frutos secos. En personas sin alergia, es un alimento saludable en porciones moderadas.',
    fuentes: [MED, EFSA, FAO],
  },
  'Semilla': {
    tagline: (n) => `${n}: semillas fuente de fibra y nutrientes.`,
    composicion: ['Fibra soluble e insoluble.', 'Grasas saludables.', 'Proteínas vegetales y minerales.'],
    usos: ['Espolvoreadas sobre comidas, yogur y ensaladas.', 'En panes y preparaciones de repostería.', 'En mezclas de semillas para snack.'],
    consumo: [{ forma: 'Molidas', detalle: 'Para aprovechar mejor sus nutrientes.' }, { forma: 'En recetas', detalle: 'En panificados y bowls.' }],
    precauciones: ['Acompañar con suficiente líquido.', 'Incorporar la fibra de forma gradual.', 'Alergia a semillas: evitar su consumo.'],
    contra: 'Como alimento son bien toleradas en cantidades habituales. Conviene moderar y acompañar con líquido.',
    fuentes: [MED, EFSA, FAO],
  },
  'Fruta seca': {
    tagline: (n) => `${n}: fruta deshidratada, dulce y energética.`,
    composicion: ['Azúcares naturales.', 'Fibra.', 'Antioxidantes y minerales como potasio.'],
    usos: ['Como snack, sola o en mix.', 'En panes dulces, budines y granolas.', 'En preparaciones dulces y saladas.'],
    consumo: [{ forma: 'Como snack', detalle: 'Sola o con frutos secos.' }, { forma: 'En recetas', detalle: 'En repostería y platos.' }],
    precauciones: ['Concentrada en azúcares: moderar, sobre todo con diabetes.', 'Cuidar la higiene bucal por su textura pegajosa.', 'En niños, atención a carozos o atragantamiento.'],
    contra: 'Es un alimento natural y nutritivo. Por su concentración de azúcares, conviene moderar la porción.',
    fuentes: [MED, EFSA, FAO],
  },
  'Cereal': {
    tagline: (n) => `${n}: cereal nutritivo, fuente de fibra y energía.`,
    composicion: ['Carbohidratos complejos y fibra.', 'Proteínas vegetales.', 'Vitaminas del grupo B y minerales.'],
    usos: ['En desayunos, cocido o en preparaciones.', 'En panes, galletas y granolas.', 'Como base de comidas y guarniciones.'],
    consumo: [{ forma: 'Cocido', detalle: 'Según el producto, en agua o leche.' }, { forma: 'En recetas', detalle: 'En panificados y desayunos.' }],
    precauciones: ['Si hay sensibilidad al gluten, verificar el etiquetado.', 'Incorporar la fibra de forma gradual.'],
    contra: 'Es un alimento de consumo habitual y bien tolerado. Verificar el etiquetado ante intolerancias.',
    fuentes: [MED, EFSA, FAO],
  },
  'Pseudocereal': {
    tagline: (n) => `${n}: grano nutritivo y naturalmente sin gluten.`,
    composicion: ['Proteínas vegetales de buena calidad.', 'Fibra y carbohidratos complejos.', 'Minerales como hierro y magnesio.', 'Naturalmente sin gluten.'],
    usos: ['Cocido como guarnición o en ensaladas.', 'En hamburguesas y croquetas.', 'En harina para panificados sin gluten.'],
    consumo: [{ forma: 'Cocido', detalle: 'Enjuagar y cocinar en agua o caldo.' }, { forma: 'En recetas', detalle: 'En ensaladas y bowls.' }],
    precauciones: ['Enjuagar bien antes de cocinar.', 'Incorporar de forma gradual si no se está habituado.'],
    contra: 'Es un alimento saludable y apto para personas celíacas. No presenta cuidados especiales en personas sanas.',
    fuentes: [MED, FAO, EFSA],
  },
  'Legumbre': {
    tagline: (n) => `${n}: legumbre rica en proteínas vegetales y fibra.`,
    composicion: ['Proteínas vegetales.', 'Fibra.', 'Carbohidratos complejos.', 'Minerales como hierro y folato.'],
    usos: ['En guisos, sopas y ensaladas.', 'En untables y hamburguesas vegetales.', 'En harina para panificados.'],
    consumo: [{ forma: 'Cocida', detalle: 'Tras remojo previo según el caso.' }, { forma: 'En recetas', detalle: 'En guisos y ensaladas.' }],
    precauciones: ['Remojar y cocinar bien antes de consumir.', 'Incorporar las legumbres de a poco para mejorar la tolerancia digestiva.'],
    contra: 'Son un alimento saludable y bien tolerado. Pueden generar gases al inicio; incorporarlas gradualmente ayuda.',
    fuentes: [MED, EFSA, FAO],
  },
  'Harina': {
    tagline: (n) => `${n}: harina natural para tus preparaciones.`,
    composicion: ['Carbohidratos y/o proteínas según el origen.', 'Fibra.', 'Minerales propios del ingrediente.'],
    usos: ['En panificados, galletas y budines.', 'Para rebozar y espesar.', 'Combinada con otras harinas.'],
    consumo: [{ forma: 'En repostería', detalle: 'Sola o combinada con otras harinas.' }, { forma: 'Para rebozar', detalle: 'En reemplazo del pan rallado.' }],
    precauciones: ['Verificar el etiquetado si se buscan opciones sin gluten.', 'Conservar bien cerrada para evitar humedad.'],
    contra: 'Es un ingrediente de uso habitual. Verificar el etiquetado ante intolerancias.',
    fuentes: [MED, EFSA, FAO],
  },
  'Aceite': {
    tagline: (n) => `${n}: aceite natural para cocina y mesa.`,
    composicion: ['Grasas propias del fruto o semilla de origen.', 'Compuestos y aroma característicos.'],
    usos: ['Para aderezar y cocinar.', 'En preparaciones frías y calientes.', 'Según el tipo, también en cuidado personal.'],
    consumo: [{ forma: 'En crudo', detalle: 'Para aderezar ensaladas y platos.' }, { forma: 'En cocina', detalle: 'Según su punto de humo.' }],
    precauciones: ['Consumir con moderación por su densidad calórica.', 'Conservar al resguardo de la luz y el calor.'],
    contra: 'Como todo aceite, conviene usarlo con moderación dentro de una dieta equilibrada.',
    fuentes: [MED, EFSA, OMS],
  },
  'Endulzante': {
    tagline: (n) => `${n}: alternativa para endulzar de forma natural.`,
    composicion: ['Azúcares y/o compuestos dulces según el origen.', 'Trazas de minerales en algunos casos.'],
    usos: ['Para endulzar infusiones y bebidas.', 'En repostería y postres.', 'Como reemplazo de otros endulzantes.'],
    consumo: [{ forma: 'En bebidas', detalle: 'A gusto, con moderación.' }, { forma: 'En repostería', detalle: 'Según la receta.' }],
    precauciones: ['Moderar el consumo de azúcares en general.', 'Personas con diabetes deben consultar y controlar cantidades.'],
    contra: 'Sigue siendo un endulzante: la clave es moderar el consumo dentro de una dieta equilibrada.',
    fuentes: [MED, OMS, EFSA],
  },
  'Infusión': {
    tagline: (n) => `${n}: para preparar en infusión, suave y natural.`,
    composicion: ['Compuestos aromáticos de la planta.', 'Antioxidantes naturales.', 'Puede contener cafeína según el tipo.'],
    usos: ['En infusión caliente o fría.', 'Sola o combinada con otras hierbas.', 'En distintos momentos del día.'],
    consumo: [{ forma: 'En infusión', detalle: 'En agua caliente unos minutos.' }, { forma: 'Fría', detalle: 'Como bebida fresca sin azúcar agregada.' }],
    precauciones: ['Si contiene cafeína, moderar en personas sensibles, embarazo o problemas para dormir.', 'Embarazo y lactancia: consultar.'],
    contra: 'En general bien tolerada. Ante cafeína o condiciones particulares, moderar y consultar.',
    fuentes: [MED, EFSA, OMS],
  },
  'Especia': {
    tagline: (n) => `${n}: especia aromática para dar sabor.`,
    composicion: ['Aceites esenciales y compuestos aromáticos.', 'Antioxidantes naturales.', 'Trazas de minerales.'],
    usos: ['Para condimentar comidas dulces y saladas.', 'En infusiones y bebidas.', 'En mezclas de especias.'],
    consumo: [{ forma: 'En polvo', detalle: 'Agregada a comidas y bebidas.' }, { forma: 'En infusión', detalle: 'Sola o combinada.' }],
    precauciones: ['Usar en cantidades culinarias.', 'Embarazo, lactancia o medicación: consultar ante consumos concentrados.'],
    contra: 'En cantidades culinarias suele ser bien tolerada. Moderar en consumos concentrados y consultar ante medicación.',
    fuentes: [MED, OMS, EFSA],
  },
  'Hierba': {
    tagline: (n) => `${n}: hierba de uso tradicional en infusiones.`,
    composicion: ['Compuestos vegetales propios de la planta.', 'Aceites esenciales.', 'Antioxidantes naturales.'],
    usos: ['En infusiones caseras.', 'Combinada con otras hierbas.', 'Como aromática en preparaciones.'],
    consumo: [{ forma: 'En infusión', detalle: 'En agua caliente unos minutos.' }],
    precauciones: ['Embarazo, lactancia, niños y personas medicadas: consultar antes de consumir.', 'No usar para reemplazar tratamientos médicos.'],
    contra: 'Como infusión suele ser bien tolerada. Ante embarazo, medicación o enfermedades, consultar con un profesional.',
    fuentes: [MED, OMS, EFSA],
  },
  'Superalimento': {
    tagline: (n) => `${n}: alimento concentrado en nutrientes.`,
    composicion: ['Nutrientes concentrados según el origen.', 'Antioxidantes naturales.', 'Vitaminas y minerales.'],
    usos: ['Añadido a batidos, jugos y desayunos.', 'En barras y bolitas energéticas.', 'Como complemento de la alimentación.'],
    consumo: [{ forma: 'En polvo', detalle: 'Mezclado en batidos o yogur.' }, { forma: 'En recetas', detalle: 'En desayunos y postres.' }],
    precauciones: ['Comenzar con cantidades pequeñas para evaluar tolerancia.', 'Embarazo, lactancia o medicación: consultar.', 'Elegir productos de origen confiable.'],
    contra: 'Suele tolerarse bien como complemento en personas sanas. Ante condiciones particulares, consultar antes de incorporarlo.',
    fuentes: [MED, EFSA, ODS],
  },
  'Producto apícola': {
    tagline: (n) => `${n}: producto natural de la colmena.`,
    composicion: ['Azúcares y compuestos naturales según el producto.', 'Pequeñas cantidades de vitaminas y minerales.'],
    usos: ['Como complemento o endulzante natural.', 'En preparaciones caseras.', 'Solo o combinado con otros productos de la colmena.'],
    consumo: [{ forma: 'Directo', detalle: 'Una pequeña cantidad, según costumbre.' }],
    precauciones: ['Personas alérgicas a productos de la colmena o al polen deben evitarlo o consultar.', 'No dar miel ni derivados a menores de 1 año.', 'Embarazo, lactancia o enfermedades: consultar.'],
    contra: 'El principal cuidado son las alergias a productos apícolas. Ante antecedentes alérgicos, consultar antes de consumir.',
    fuentes: [MED, OMS, EFSA],
  },
  'Raíz': {
    tagline: (n) => `${n}: raíz de uso tradicional en cocina e infusiones.`,
    composicion: ['Compuestos vegetales y aceites esenciales.', 'Fibra y almidón propios de la raíz.', 'Trazas de minerales.'],
    usos: ['Como condimento o en infusiones.', 'En guisos, sopas y bebidas.', 'En preparaciones tradicionales.'],
    consumo: [{ forma: 'En polvo', detalle: 'Agregada a comidas y bebidas.' }, { forma: 'En infusión', detalle: 'Sola o combinada.' }],
    precauciones: ['Usar en cantidades culinarias.', 'Embarazo, lactancia o medicación: consultar ante consumos concentrados.'],
    contra: 'En cantidades culinarias suele ser bien tolerada. Moderar en consumos concentrados y consultar ante medicación.',
    fuentes: [MED, OMS, EFSA],
  },
};

const DEFAULT_CAT: CatTemplate = {
  tagline: (n) => `${n}: producto natural de dietética.`,
  composicion: ['Nutrientes propios del ingrediente.', 'Fibra y/o compuestos naturales.', 'Vitaminas y minerales según el origen.'],
  usos: ['Como parte de una alimentación variada.', 'En distintas preparaciones caseras.', 'Según las indicaciones del envase.'],
  consumo: [{ forma: 'Según el envase', detalle: 'Seguí las indicaciones del producto.' }],
  precauciones: ['Ante alergias, embarazo, lactancia o medicación, consultar con un profesional.', 'Seguir las indicaciones del envase.'],
  contra: 'Es un producto de consumo alimentario. Ante dudas o condiciones de salud, consultar con un profesional.',
  fuentes: [MED, EFSA, FAO],
};

// Necesidades adicionales asociadas por categoría (informativas, no claims médicos).
const CATEGORY_EXTRA: Record<string, UseCaseSlug[]> = {
  'Fruto seco': ['piel-cabello', 'circulacion'],
  Semilla: ['piel-cabello', 'circulacion'],
  Aceite: ['circulacion', 'piel-cabello'],
  Alga: ['circulacion'],
  Legumbre: ['control-peso', 'huesos'],
  Pseudocereal: ['control-peso'],
  Cereal: ['control-peso'],
  Superalimento: ['piel-cabello', 'circulacion'],
  Hierba: ['circulacion'],
  Especia: ['circulacion'],
  'Producto apícola': ['piel-cabello'],
};

// Aplicaciones extra por categoría (más usos, lenguaje seguro).
const EXTRA_USES: Record<string, string[]> = {
  'Fruto seco': ['En barras y bolitas energéticas caseras.', 'Como crema o manteca untable.'],
  Semilla: ['Como sustituto de huevo al hidratarse, en recetas veganas.', 'En aderezos, salsas y rebozados.'],
  'Fruta seca': ['Como endulzante natural en preparaciones.', 'En barras, bolitas y rellenos.'],
  Cereal: ['En desayunos, galletas y barras caseras.', 'Como guarnición o relleno.'],
  Pseudocereal: ['En bowls, ensaladas y rellenos.', 'En harina para panificados sin gluten.'],
  Legumbre: ['En untables, hamburguesas y croquetas.', 'En harinas para rebozados y panificados.'],
  Harina: ['En premezclas y rebozados.', 'Combinada con otras harinas en panificados.'],
  Aceite: ['Para aderezar ensaladas y bowls.', 'En repostería, según el tipo.'],
  Endulzante: ['En bebidas, postres y aderezos.', 'Como reemplazo de azúcar en recetas.'],
  Infusión: ['Como base de blends con otras hierbas.', 'En versiones frías tipo té helado.'],
  Hierba: ['Combinada con otras hierbas en mezclas.', 'En tisanas caseras.'],
  Especia: ['En adobos y mezclas de especias.', 'En bebidas y repostería.'],
  Superalimento: ['En batidos, bowls y energy balls.', 'Espolvoreado sobre yogur o avena.'],
  Coco: ['En repostería y bebidas.', 'En preparaciones de inspiración tropical.'],
};

// Introducción descriptiva por categoría (para fichas amplias, lenguaje no médico).
const CATEGORY_INTRO_DEFAULT =
  'Es un producto que se ofrece habitualmente en dietéticas y se incorpora a la alimentación según el gusto y las costumbres de cada persona';
const CATEGORY_INTRO: Record<string, string> = {
  'Fruto seco': 'Los frutos secos son semillas oleaginosas muy valoradas por su densidad nutricional: concentran grasas saludables, proteínas vegetales y minerales en muy poco volumen',
  Semilla: 'Las semillas son pequeñas pero muy nutritivas: aportan fibra, grasas buenas y minerales, y son un recurso práctico para enriquecer casi cualquier comida',
  'Fruta seca': 'Las frutas deshidratadas concentran el dulzor y los nutrientes de la fruta fresca al perder agua, lo que las convierte en un snack energético y fácil de llevar',
  Cereal: 'Los cereales son una fuente tradicional de energía de liberación gradual, fibra y vitaminas del complejo B, y son base de la alimentación en casi todas las culturas',
  Pseudocereal: 'Los pseudocereales se cocinan y se usan como un cereal, pero se destacan por aportar proteína de buena calidad y por no contener gluten',
  Legumbre: 'Las legumbres son uno de los pilares de la alimentación basada en plantas: combinan proteína vegetal, fibra y minerales a un costo accesible',
  Harina: 'Las harinas llevan el valor nutritivo de granos, semillas o legumbres a panificados, rebozados y repostería, ampliando mucho las posibilidades en la cocina',
  Aceite: 'Los aceites vegetales aportan grasas y compuestos propios de su materia prima; bien elegidos y usados con medida, suman sabor y calidad a la dieta',
  Endulzante: 'Los endulzantes naturales permiten dar dulzor a las preparaciones como alternativa al azúcar refinado, siempre con moderación',
  Infusión: 'Las infusiones son una forma simple y milenaria de disfrutar hierbas y plantas en agua caliente, como un ritual cotidiano de pausa y bienestar',
  Hierba: 'Las hierbas se usan desde hace siglos en infusiones y en la cocina por su aroma y por su lugar en la tradición popular',
  Especia: 'Las especias concentran aroma, color y sabor: un detalle pequeño que transforma cualquier plato y forma parte del recetario de todo el mundo',
  Superalimento: 'Se llama así, de forma popular, a alimentos especialmente densos en nutrientes o en compuestos de interés, que suelen sumarse en pequeñas cantidades a la dieta',
  Coco: 'El coco da origen a una familia de productos muy versátiles (agua, leche, aceite, harina, ralladura) presentes en la cocina natural y de inspiración tropical',
  Raíz: 'Las raíces guardan los nutrientes y los compuestos aromáticos de la planta, y se usan tanto en la cocina como en infusiones tradicionales',
  Alga: 'Las algas son vegetales marinos apreciados por su perfil de minerales y por su uso en la cocina de Oriente, cada vez más presente en la dietética',
  Untable: 'Los untables a base de frutos secos, semillas o legumbres son una forma práctica y sabrosa de sumar nutrientes a desayunos y meriendas',
  'Producto apícola': 'Los productos de la colmena acompañan a la humanidad desde la antigüedad, valorados como alimento natural y como parte de costumbres de cuidado',
  Condimento: 'Los condimentos realzan el sabor de las comidas y permiten reducir el agregado de sal o de aderezos ultraprocesados',
  Fermentado: 'Los alimentos fermentados son el resultado de procesos naturales con microorganismos, valorados por su sabor característico y por su larga tradición en la cocina',
};

const stripDot = (s: string) => s.replace(/\.$/, '').toLowerCase();

export function buildProduct(seed: SeedProduct): Product {
  const cat = CATS[seed.categoria] ?? DEFAULT_CAT;
  const n = seed.nombre;
  const nl = n.toLowerCase();
  const catl = seed.categoria.toLowerCase();
  const sci = seed.nombreCientifico ? ` (${seed.nombreCientifico})` : '';
  const intro = CATEGORY_INTRO[seed.categoria] ?? CATEGORY_INTRO_DEFAULT;
  const usosTxt = cat.usos.slice(0, 3).map(stripDot).join('; ');
  const compTxt = cat.composicion.map(stripDot).join(', ');
  return {
    slug: seed.slug,
    nombre: n,
    nombreCientifico: seed.nombreCientifico,
    categoria: seed.categoria,
    tagline: seed.tagline ?? cat.tagline(n),
    resumen:
      seed.resumen ??
      `${n} es un producto de la categoría ${catl} de uso habitual en dietética. ${intro}. Se suma a la alimentación diaria en distintas preparaciones, siempre dentro de una dieta variada; es un alimento, no un medicamento, y no reemplaza ningún tratamiento.`,
    queEs:
      seed.queEs ??
      `${n}${sci} es un producto natural que en dietética se ubica dentro de la categoría ${catl}. ${intro}. En la cocina, ${nl} se aprovecha de varias maneras: ${usosTxt}. Por su composición aporta ${compTxt}. Forma parte de una alimentación variada y equilibrada; recordá que es un alimento, no un medicamento, y que no reemplaza una dieta completa ni las indicaciones de un profesional de la salud.`,
    composicion: cat.composicion,
    usosTradicionales: [...cat.usos, ...(EXTRA_USES[seed.categoria] ?? [])],
    comoSeConsume: cat.consumo,
    precauciones: [...cat.precauciones, ...PREC_COMUNES],
    contraindicaciones: cat.contra,
    faq: [...FAQ_BASE],
    fuentes: cat.fuentes,
    casosDeUso: Array.from(new Set([...seed.casosDeUso, ...(CATEGORY_EXTRA[seed.categoria] ?? [])])),
    destacado: seed.destacado,
    hue: seed.hue,
    imagen: PACKSHOTS.has(seed.slug)
      ? `/productos/${seed.slug}.webp`
      : LOCAL.has(seed.slug)
        ? `/productos/local/${seed.slug}.webp`
        : undefined,
  };
}

export function buildProducts(seeds: SeedProduct[]): Product[] {
  return seeds.map(buildProduct);
}
