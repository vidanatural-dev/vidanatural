import type { Product, Recipe, RecipeType, Dificultad, FAQItem } from './types';

/**
 * Generador determinista de recetas por producto, basado en arquetipos
 * gastronómicos. Funciona como "seed/backfill" puro:
 *  - recorre los productos y genera 5 recetas por cada uno
 *  - el slug es estable (producto + receta), así no se duplica al re-ejecutar
 *  - cubre productos futuros vía fallback por categoría
 * Lenguaje seguro: sin claims médicos.
 */

const NON_GF = new Set(['Cereal']);
const SWEETENERS = new Set(['miel', 'azucar-mascabo']);

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const cleanName = (nombre: string): string =>
  nombre
    .toLowerCase()
    .replace('semillas de ', '')
    .replace(' en polvo', '')
    .replace(' en hebras', '')
    .replace('alga ', '');

const truncate = (s: string, n: number): string => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…');

interface Blueprint {
  key: string;
  tipo: RecipeType;
  prepMin: number;
  cookMin: number;
  porciones: string;
  dificultad: Dificultad;
  vegano: boolean;
  glutenFree: boolean;
  noAddedSugar: boolean;
  extraTags: string[];
  titulo: (cn: string) => string;
  descripcion: (cn: string) => string;
  ingredientes: (cn: string) => string[];
  pasos: (cn: string) => string[];
}

function buildFaq(tipo: RecipeType, cn: string): FAQItem[] {
  const conserva =
    tipo === 'bebida'
      ? 'Es mejor consumirla recién hecha. Si sobra, guardala en la heladera y revolvé o agitá antes de tomar.'
      : tipo === 'panificado' || tipo === 'postre'
        ? 'Sí. Se conserva bien en un recipiente cerrado un par de días, y en general se puede freezar.'
        : 'Sí. Podés dejarla lista en la heladera y consumirla durante el día.';
  return [
    { q: '¿Puedo prepararla con anticipación?', a: conserva },
    {
      q: `¿Cómo incorporo ${cn} en esta receta?`,
      a: `${cap(cn)} se usa en preparaciones como esta para aportar sabor, textura y variedad. Seguí las cantidades indicadas y ajustá a tu gusto.`,
    },
  ];
}

function buildRecipe(product: Product, bp: Blueprint): Recipe {
  const cn = cleanName(product.nombre);
  const titulo = bp.titulo(cn);
  const slug = `${product.slug}-${bp.key}`;
  const tiempoMin = bp.prepMin + bp.cookMin;

  const tags = [...bp.extraTags];
  if (bp.glutenFree && !NON_GF.has(product.categoria)) tags.push('Sin TACC');
  if (bp.vegano && product.slug !== 'miel') tags.push('Vegano');
  if (bp.noAddedSugar && !SWEETENERS.has(product.slug)) tags.push('Sin azúcar agregada');
  const uniqTags = Array.from(new Set(tags));

  const descripcion = bp.descripcion(cn);

  return {
    slug,
    titulo,
    descripcion,
    tipo: bp.tipo,
    prepMin: bp.prepMin,
    cookMin: bp.cookMin,
    tiempoMin,
    porciones: bp.porciones,
    dificultad: bp.dificultad,
    ingredientes: bp.ingredientes(cn),
    pasos: bp.pasos(cn),
    tags: uniqTags,
    producto: product.slug,
    productos: [product.slug],
    casoDeUso: product.casosDeUso[0],
    seoTitle: truncate(`${titulo} | Receta con ${cn}`, 60),
    seoDescription: truncate(descripcion, 155),
    faq: buildFaq(bp.tipo, cn),
    hue: product.hue,
  };
}

/* ============================ ARQUETIPOS ============================ */

const ARCHETYPES: Record<string, Blueprint[]> = {
  SEMILLA_GEL: [
    {
      key: 'pudin', tipo: 'postre', prepMin: 10, cookMin: 0, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: false, extraTags: ['Alto en fibra'],
      titulo: (cn) => `Pudín de ${cn}`,
      descripcion: (cn) => `Un pudín cremoso de ${cn} que se prepara la noche anterior. Una opción para sumar a desayunos o como postre liviano.`,
      ingredientes: (cn) => [`3 cucharadas de ${cn}`, '1 taza de bebida vegetal', '1 cucharadita de vainilla', 'Frutas frescas a gusto', 'Endulzante natural opcional'],
      pasos: (cn) => [`Mezclá ${cn} con la bebida vegetal y la vainilla.`, 'Revolvé y esperá 5 minutos; volvé a revolver para que no queden grumos.', 'Tapá y llevá a la heladera al menos 4 horas o toda la noche.', 'Serví con frutas frescas por encima.'],
    },
    {
      key: 'smoothie', tipo: 'bebida', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Smoothie con ${cn}`,
      descripcion: (cn) => `Un smoothie rápido con ${cn} y fruta, ideal para empezar el día o como merienda.`,
      ingredientes: (cn) => ['1 banana', '1 taza de bebida vegetal', `1 cucharada de ${cn}`, 'Un puñado de frutillas', 'Hielo a gusto'],
      pasos: () => ['Poné todos los ingredientes en la licuadora.', 'Licuá hasta obtener una mezcla homogénea.', 'Ajustá el espesor con más bebida si hace falta.', 'Serví al momento.'],
    },
    {
      key: 'panqueques', tipo: 'desayuno', prepMin: 10, cookMin: 10, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Panqueques con ${cn}`,
      descripcion: (cn) => `Panqueques caseros de avena y banana con ${cn}, sin azúcar agregada.`,
      ingredientes: (cn) => ['1 banana pisada', '1 taza de avena', '1 taza de bebida vegetal', `1 cucharada de ${cn}`, '1 cucharadita de polvo de hornear'],
      pasos: () => ['Mezclá todos los ingredientes hasta formar una pasta.', 'Calentá una sartén apenas aceitada.', 'Cociná porciones pequeñas de cada lado hasta dorar.', 'Serví con fruta.'],
    },
    {
      key: 'galletas', tipo: 'postre', prepMin: 10, cookMin: 15, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Galletas de avena y ${cn}`,
      descripcion: (cn) => `Galletas simples de avena con ${cn}, ideales para la merienda.`,
      ingredientes: (cn) => ['2 bananas pisadas', '1 taza de avena', `2 cucharadas de ${cn}`, 'Un puñado de pasas', 'Canela a gusto'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá todos los ingredientes.', 'Formá las galletas sobre una placa.', 'Horneá 12 a 15 minutos hasta dorar.'],
    },
    {
      key: 'yogur', tipo: 'desayuno', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: false, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Bowl de yogur con ${cn} y frutas`,
      descripcion: (cn) => `Un bowl de yogur con frutas y ${cn} por encima, listo en minutos.`,
      ingredientes: (cn) => ['1 taza de yogur natural', 'Frutas frescas a gusto', `1 cucharada de ${cn}`, 'Un puñado de frutos secos', 'Ralladura de limón opcional'],
      pasos: (cn) => ['Serví el yogur en un bowl.', 'Sumá las frutas cortadas.', `Espolvoreá ${cn} y los frutos secos.`, 'Disfrutá al momento.'],
    },
  ],

  SEMILLA_TOPPING: [
    {
      key: 'topping', tipo: 'guarnicion', prepMin: 5, cookMin: 5, porciones: 'Varias porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Topping crocante de ${cn}`,
      descripcion: (cn) => `${cap(cn)} tostado para sumar sabor y textura a ensaladas, sopas o yogur.`,
      ingredientes: (cn) => [`4 cucharadas de ${cn}`, 'Una pizca de sal opcional'],
      pasos: (cn) => [`Calentá una sartén sin aceite.`, `Tostá ${cn} a fuego suave, revolviendo, hasta que estén doradas.`, 'Dejá enfriar.', 'Usá como topping en tus comidas.'],
    },
    {
      key: 'pan', tipo: 'panificado', prepMin: 15, cookMin: 40, porciones: '1 pan', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: ['Alto en fibra'],
      titulo: (cn) => `Pan de semillas con ${cn}`,
      descripcion: (cn) => `Un pan casero cargado de semillas, con ${cn}, ideal para acompañar.`,
      ingredientes: (cn) => ['2 tazas de harina integral', `4 cucharadas de ${cn}`, '1 sobre de levadura', '1 taza de agua tibia', 'Sal a gusto'],
      pasos: () => ['Mezclá los secos y sumá el agua hasta formar un bollo.', 'Dejá levar tapado una hora.', 'Llevá a un molde y dejá reposar 20 minutos.', 'Horneá a 200 °C unos 40 minutos.'],
    },
    {
      key: 'granola', tipo: 'desayuno', prepMin: 10, cookMin: 25, porciones: 'Varias porciones', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Granola casera con ${cn}`,
      descripcion: (cn) => `Granola crocante de avena y ${cn} para tener lista en casa.`,
      ingredientes: (cn) => ['3 tazas de avena', `4 cucharadas de ${cn}`, '3 cucharadas de aceite de coco', 'Endulzante natural a gusto', 'Una pizca de sal'],
      pasos: () => ['Precalentá el horno a 160 °C.', 'Mezclá todo en un bol.', 'Esparcí en una placa.', 'Horneá 20 a 25 minutos revolviendo a la mitad.'],
    },
    {
      key: 'mix', tipo: 'snack', prepMin: 5, cookMin: 0, porciones: 'Varias porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Mix de semillas con ${cn}`,
      descripcion: (cn) => `Una mezcla práctica de semillas con ${cn} para llevar como snack.`,
      ingredientes: (cn) => [`3 cucharadas de ${cn}`, '3 cucharadas de otras semillas', 'Un puñado de pasas', 'Frutos secos a gusto'],
      pasos: () => ['Mezclá todos los ingredientes.', 'Guardá en un frasco cerrado.', 'Llevá una porción como colación.'],
    },
    {
      key: 'ensalada', tipo: 'ensalada', prepMin: 15, cookMin: 0, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Ensalada con ${cn}`,
      descripcion: (cn) => `Una ensalada fresca terminada con ${cn} para sumar textura.`,
      ingredientes: (cn) => ['Hojas verdes a gusto', 'Tomate y zanahoria', `2 cucharadas de ${cn}`, 'Aceite de oliva, limón y sal'],
      pasos: (cn) => ['Lavá y cortá los vegetales.', 'Armá la ensalada en un bol.', `Espolvoreá ${cn} por encima.`, 'Aderezá con aceite, limón y sal.'],
    },
  ],

  GRANO_DULCE: [
    {
      key: 'porridge', tipo: 'desayuno', prepMin: 5, cookMin: 5, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: ['Alto en fibra'],
      titulo: (cn) => `Porridge de ${cn}`,
      descripcion: (cn) => `La clásica ${cn} cocida, cremosa y tibia, base ideal para frutas y semillas.`,
      ingredientes: (cn) => [`1/2 taza de ${cn}`, '1 taza de bebida vegetal', 'Canela a gusto', 'Frutas para servir'],
      pasos: (cn) => [`Llevá ${cn} con la bebida a fuego medio.`, 'Cociná 4 a 5 minutos hasta espesar.', 'Sumá canela.', 'Serví con frutas.'],
    },
    {
      key: 'overnight', tipo: 'desayuno', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Overnight de ${cn}`,
      descripcion: (cn) => `${cap(cn)} en remojo lista para el desayuno, sin cocción.`,
      ingredientes: (cn) => [`1/2 taza de ${cn}`, '1/2 taza de bebida vegetal', '1 cucharada de chía', 'Frutas a gusto'],
      pasos: () => ['Mezclá todo en un frasco.', 'Tapá y llevá a la heladera toda la noche.', 'A la mañana, sumá frutas y disfrutá.'],
    },
    {
      key: 'panqueques', tipo: 'desayuno', prepMin: 10, cookMin: 10, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Panqueques de ${cn} y banana`,
      descripcion: (cn) => `Panqueques de ${cn} y banana, sin azúcar agregada.`,
      ingredientes: (cn) => ['1 banana pisada', `1 taza de ${cn}`, '1 taza de bebida vegetal', '1 cucharadita de polvo de hornear'],
      pasos: () => ['Mezclá todo hasta formar una pasta.', 'Calentá una sartén apenas aceitada.', 'Cociná de ambos lados hasta dorar.', 'Serví con fruta.'],
    },
    {
      key: 'budin', tipo: 'panificado', prepMin: 15, cookMin: 35, porciones: '1 budín', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Budín de ${cn}`,
      descripcion: (cn) => `Un budín húmedo de ${cn}, ideal para la merienda.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, '2 bananas', '1 taza de bebida vegetal', '1 cucharadita de polvo de hornear', 'Endulzante a gusto'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá todos los ingredientes.', 'Volcá en un molde.', 'Horneá 35 minutos hasta que esté firme.'],
    },
    {
      key: 'granola', tipo: 'desayuno', prepMin: 10, cookMin: 25, porciones: 'Varias porciones', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Granola de ${cn}`,
      descripcion: (cn) => `Granola crocante de ${cn} con frutos secos para tener en casa.`,
      ingredientes: (cn) => [`3 tazas de ${cn}`, '1 taza de frutos secos', '3 cucharadas de aceite de coco', 'Endulzante natural a gusto'],
      pasos: () => ['Precalentá el horno a 160 °C.', 'Mezclá todo.', 'Esparcí en una placa.', 'Horneá 20 a 25 minutos revolviendo a la mitad.'],
    },
  ],

  GRANO_SALADO: [
    {
      key: 'ensalada', tipo: 'ensalada', prepMin: 15, cookMin: 15, porciones: '2 a 3 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Proteico'],
      titulo: (cn) => `Ensalada de ${cn}`,
      descripcion: (cn) => `Una ensalada completa con ${cn} como base, fresca y para llevar.`,
      ingredientes: (cn) => [`1 taza de ${cn}`, '2 tazas de agua', 'Tomate, pepino y morrón', 'Aceite de oliva, limón y sal'],
      pasos: (cn) => [`Enjuagá y cociná ${cn} hasta que esté tierno; dejá entibiar.`, 'Cortá los vegetales.', 'Mezclá todo.', 'Aderezá con aceite, limón y sal.'],
    },
    {
      key: 'hamburguesas', tipo: 'almuerzo', prepMin: 20, cookMin: 15, porciones: '4 porciones', dificultad: 'Media',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Proteico'],
      titulo: (cn) => `Hamburguesas de ${cn}`,
      descripcion: (cn) => `Hamburguesas vegetales con ${cn}, ideales para el almuerzo.`,
      ingredientes: (cn) => [`2 tazas de ${cn} cocido`, '1 zanahoria rallada', '2 cucharadas de harina de garbanzo', 'Condimentos a gusto'],
      pasos: () => ['Pisá la base y mezclá con el resto.', 'Formá las hamburguesas.', 'Cociná en sartén o al horno hasta dorar de ambos lados.'],
    },
    {
      key: 'bowl', tipo: 'almuerzo', prepMin: 15, cookMin: 15, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Bowl nutritivo con ${cn}`,
      descripcion: (cn) => `Un bowl colorido con ${cn}, vegetales y un buen aderezo.`,
      ingredientes: (cn) => [`1 taza de ${cn} cocido`, 'Vegetales asados', 'Hojas verdes', 'Aderezo a gusto'],
      pasos: (cn) => [`Cociná ${cn}.`, 'Asá los vegetales.', 'Armá el bowl con todos los componentes.', 'Terminá con el aderezo.'],
    },
    {
      key: 'croquetas', tipo: 'cena', prepMin: 20, cookMin: 20, porciones: '12 unidades', dificultad: 'Media',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Croquetas de ${cn}`,
      descripcion: (cn) => `Croquetas al horno con ${cn}, crocantes por fuera y tiernas por dentro.`,
      ingredientes: (cn) => [`2 tazas de ${cn} cocido`, '1 cebolla', '2 cucharadas de harina de garbanzo', 'Perejil y condimentos'],
      pasos: () => ['Mezclá todos los ingredientes.', 'Formá las croquetas.', 'Horneá a 200 °C unos 20 minutos girando a la mitad.'],
    },
    {
      key: 'guarnicion', tipo: 'guarnicion', prepMin: 5, cookMin: 15, porciones: '4 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Guarnición de ${cn}`,
      descripcion: (cn) => `${cap(cn)} como guarnición simple para acompañar cualquier plato.`,
      ingredientes: (cn) => [`1 taza de ${cn}`, '2 tazas de caldo de verduras', 'Aceite de oliva y sal'],
      pasos: (cn) => [`Enjuagá ${cn}.`, 'Cociná en el caldo hasta que esté tierno.', 'Terminá con un hilo de aceite de oliva y sal.'],
    },
  ],

  FRUTO_SECO: [
    {
      key: 'mix', tipo: 'snack', prepMin: 5, cookMin: 0, porciones: 'Varias porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Mix energético con ${cn}`,
      descripcion: (cn) => `Una mezcla práctica con ${cn} y fruta seca para llevar de snack.`,
      ingredientes: (cn) => [`1 taza de ${cn}`, 'Pasas y dátiles', 'Otras semillas a gusto'],
      pasos: () => ['Mezclá todos los ingredientes.', 'Guardá en un frasco.', 'Llevá una porción como colación.'],
    },
    {
      key: 'barras', tipo: 'snack', prepMin: 15, cookMin: 15, porciones: '8 barras', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: ['Energético'],
      titulo: (cn) => `Barras de cereal con ${cn}`,
      descripcion: (cn) => `Barras caseras de avena con ${cn}, ideales antes o después de la actividad física.`,
      ingredientes: (cn) => ['2 tazas de avena', `1 taza de ${cn} picado`, '3 cucharadas de miel o pasta de dátil', '2 cucharadas de aceite de coco'],
      pasos: () => ['Mezclá todo.', 'Compactá en una asadera.', 'Horneá a 170 °C unos 15 minutos.', 'Dejá enfriar y cortá en barras.'],
    },
    {
      key: 'budin', tipo: 'postre', prepMin: 15, cookMin: 35, porciones: '1 budín', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Budín con ${cn}`,
      descripcion: (cn) => `Un budín casero con ${cn} para la merienda.`,
      ingredientes: (cn) => ['2 tazas de harina integral', `1 taza de ${cn} picado`, '1 taza de bebida vegetal', 'Endulzante y polvo de hornear'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá los ingredientes.', 'Volcá en un molde.', 'Horneá 35 minutos.'],
    },
    {
      key: 'untable', tipo: 'snack', prepMin: 10, cookMin: 0, porciones: '1 frasco', dificultad: 'Media',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Crema untable de ${cn}`,
      descripcion: (cn) => `Una crema casera de ${cn}, sin azúcar agregada, para untar.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, 'Una pizca de sal', 'Aceite neutro opcional'],
      pasos: (cn) => [`Tostá ${cn} levemente.`, 'Procesá varios minutos hasta que largue sus aceites.', 'Sumá sal y procesá hasta lograr una crema.', 'Guardá en un frasco en la heladera.'],
    },
    {
      key: 'topping', tipo: 'guarnicion', prepMin: 5, cookMin: 0, porciones: 'Varias porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Topping de ${cn}`,
      descripcion: (cn) => `${cap(cn)} picado para terminar ensaladas, yogur o postres.`,
      ingredientes: (cn) => [`1 taza de ${cn}`],
      pasos: (cn) => [`Picá ${cn} groseramente.`, 'Tostá opcionalmente en sartén.', 'Usá como topping en tus comidas.'],
    },
  ],

  FRUTA_DULCE: [
    {
      key: 'snack', tipo: 'snack', prepMin: 2, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Snack natural con ${cn}`,
      descripcion: (cn) => `${cap(cn)} como colación rápida, solos o con frutos secos.`,
      ingredientes: (cn) => [`Un puñado de ${cn}`, 'Frutos secos opcionales'],
      pasos: (cn) => [`Serví ${cn} en un bol.`, 'Acompañá con frutos secos si querés.', 'Llevá como snack.'],
    },
    {
      key: 'barras', tipo: 'snack', prepMin: 15, cookMin: 0, porciones: '8 barras', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Barras energéticas con ${cn}`,
      descripcion: (cn) => `Barras sin horno con ${cn}, que aportan dulzor natural sin azúcar agregada.`,
      ingredientes: (cn) => [`1 taza de ${cn} sin carozo`, '1 taza de avena', '1/2 taza de frutos secos', '2 cucharadas de aceite de coco'],
      pasos: (cn) => [`Procesá ${cn} hasta formar una pasta.`, 'Mezclá con la avena y los frutos secos.', 'Compactá en un molde y llevá al frío.', 'Cortá en barras.'],
    },
    {
      key: 'budin', tipo: 'postre', prepMin: 15, cookMin: 35, porciones: '1 budín', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Budín endulzado con ${cn}`,
      descripcion: (cn) => `Un budín que usa ${cn} como endulzante natural, sin azúcar agregada.`,
      ingredientes: (cn) => ['2 tazas de harina integral', `1 taza de ${cn} sin carozo`, '1 taza de bebida vegetal', 'Polvo de hornear'],
      pasos: (cn) => ['Precalentá el horno a 180 °C.', `Procesá ${cn} con la bebida.`, 'Integrá con los secos.', 'Volcá en molde y horneá 35 minutos.'],
    },
    {
      key: 'bolitas', tipo: 'snack', prepMin: 15, cookMin: 0, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Bolitas energéticas con ${cn}`,
      descripcion: (cn) => `Bolitas sin horno con ${cn} y avena para llevar.`,
      ingredientes: (cn) => [`1 taza de ${cn} sin carozo`, '1 taza de avena', '2 cucharadas de cacao', 'Coco rallado para rebozar'],
      pasos: (cn) => [`Procesá ${cn} hasta formar pasta.`, 'Mezclá con la avena y el cacao.', 'Formá bolitas y rebozá en coco.', 'Llevá al frío 30 minutos.'],
    },
    {
      key: 'desayuno', tipo: 'desayuno', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: false, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Desayuno con ${cn}`,
      descripcion: (cn) => `Un desayuno simple de yogur o avena con ${cn} para sumar dulzor natural.`,
      ingredientes: (cn) => ['1 taza de yogur o avena cocida', `Un puñado de ${cn} sin carozo`, 'Semillas a gusto'],
      pasos: (cn) => ['Serví el yogur o la avena en un bol.', `Sumá ${cn} cortados.`, 'Terminá con semillas.'],
    },
  ],

  HARINA_DULCE: [
    {
      key: 'panqueques', tipo: 'desayuno', prepMin: 10, cookMin: 10, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: false, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Panqueques con ${cn}`,
      descripcion: (cn) => `Panqueques sin gluten con ${cn}, esponjosos y simples.`,
      ingredientes: (cn) => [`1 taza de ${cn}`, '2 huevos', '1/2 taza de bebida vegetal', '1 cucharadita de polvo de hornear'],
      pasos: () => ['Mezclá todo hasta integrar.', 'Calentá una sartén apenas aceitada.', 'Cociná de ambos lados hasta dorar.', 'Serví con fruta.'],
    },
    {
      key: 'galletas', tipo: 'postre', prepMin: 15, cookMin: 12, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: false, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Galletas con ${cn}`,
      descripcion: (cn) => `Galletas sin gluten con ${cn}, ideales para la merienda.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, '1 huevo', 'Endulzante a gusto', 'Esencia de vainilla'],
      pasos: () => ['Precalentá el horno a 170 °C.', 'Formá una masa y dejá reposar.', 'Armá las galletas en una placa.', 'Horneá 10 a 12 minutos.'],
    },
    {
      key: 'budin', tipo: 'postre', prepMin: 15, cookMin: 40, porciones: '1 budín', dificultad: 'Media',
      vegano: false, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Budín húmedo con ${cn}`,
      descripcion: (cn) => `Un budín sin gluten con ${cn}, húmedo y aromático.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, '3 huevos', 'Endulzante a gusto', 'Polvo de hornear y vainilla'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá los ingredientes.', 'Volcá en un molde.', 'Horneá 35 a 40 minutos.'],
    },
    {
      key: 'base-tarta', tipo: 'panificado', prepMin: 15, cookMin: 15, porciones: '1 base', dificultad: 'Media',
      vegano: false, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Base de tarta con ${cn}`,
      descripcion: (cn) => `Una base de tarta sin gluten con ${cn} para rellenos dulces o salados.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, '1 huevo', '2 cucharadas de aceite', 'Una pizca de sal'],
      pasos: () => ['Mezclá hasta formar una masa.', 'Estirá sobre un molde.', 'Pinchá la base.', 'Horneá a 180 °C unos 15 minutos antes de rellenar.'],
    },
    {
      key: 'muffins', tipo: 'postre', prepMin: 15, cookMin: 20, porciones: '6 unidades', dificultad: 'Media',
      vegano: false, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Muffins con ${cn}`,
      descripcion: (cn) => `Muffins sin gluten con ${cn}, prácticos para llevar.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, '2 huevos', 'Endulzante a gusto', 'Frutas o chips de cacao'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá todo.', 'Repartí en moldes para muffins.', 'Horneá 18 a 20 minutos.'],
    },
  ],

  LEGUMBRE: [
    {
      key: 'guiso', tipo: 'almuerzo', prepMin: 15, cookMin: 40, porciones: '4 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Proteico', 'Alto en fibra'],
      titulo: (cn) => `Guiso de ${cn}`,
      descripcion: (cn) => `Un guiso reconfortante de ${cn} con vegetales, ideal para los días fríos.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, 'Cebolla, zanahoria y morrón', 'Tomate triturado', 'Caldo de verduras y condimentos'],
      pasos: (cn) => ['Rehogá los vegetales.', `Sumá ${cn} y el tomate.`, 'Cubrí con caldo y cociná hasta que estén tiernas.', 'Condimentá a gusto.'],
    },
    {
      key: 'ensalada', tipo: 'ensalada', prepMin: 15, cookMin: 20, porciones: '3 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Proteico'],
      titulo: (cn) => `Ensalada de ${cn}`,
      descripcion: (cn) => `Una ensalada fresca de ${cn}, perfecta para llevar.`,
      ingredientes: (cn) => [`2 tazas de ${cn} cocido`, 'Tomate y cebolla morada', 'Perejil', 'Aceite de oliva, limón y sal'],
      pasos: () => ['Cociná la legumbre y dejá entibiar.', 'Cortá los vegetales.', 'Mezclá todo.', 'Aderezá con aceite, limón y sal.'],
    },
    {
      key: 'hamburguesas', tipo: 'almuerzo', prepMin: 20, cookMin: 15, porciones: '4 porciones', dificultad: 'Media',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Proteico'],
      titulo: (cn) => `Hamburguesas de ${cn}`,
      descripcion: (cn) => `Hamburguesas vegetales de ${cn}, sabrosas y nutritivas.`,
      ingredientes: (cn) => [`2 tazas de ${cn} cocido`, '1 zanahoria rallada', '2 cucharadas de avena', 'Condimentos a gusto'],
      pasos: () => ['Pisá la legumbre y mezclá con el resto.', 'Formá las hamburguesas.', 'Cociná en sartén o al horno hasta dorar.'],
    },
    {
      key: 'untable', tipo: 'snack', prepMin: 10, cookMin: 0, porciones: '1 bol', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Untable de ${cn}`,
      descripcion: (cn) => `Un untable cremoso de ${cn} para acompañar tostadas o vegetales.`,
      ingredientes: (cn) => [`2 tazas de ${cn} cocido`, '2 cucharadas de sésamo o tahini', 'Jugo de limón', 'Aceite de oliva, ajo y sal'],
      pasos: () => ['Poné todo en la procesadora.', 'Procesá hasta lograr una crema.', 'Ajustá sal y limón.', 'Serví con un hilo de aceite.'],
    },
    {
      key: 'croquetas', tipo: 'cena', prepMin: 20, cookMin: 20, porciones: '12 unidades', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: ['Proteico'],
      titulo: (cn) => `Croquetas de ${cn}`,
      descripcion: (cn) => `Croquetas al horno de ${cn}, crocantes y fáciles.`,
      ingredientes: (cn) => [`2 tazas de ${cn} cocido`, '1 cebolla', 'Pan rallado', 'Perejil y condimentos'],
      pasos: () => ['Pisá la legumbre y mezclá con el resto.', 'Formá las croquetas.', 'Horneá a 200 °C unos 20 minutos girando a la mitad.'],
    },
  ],

  ESPECIA: [
    {
      key: 'leche-dorada', tipo: 'bebida', prepMin: 5, cookMin: 5, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Leche dorada con ${cn}`,
      descripcion: (cn) => `Una bebida tibia y reconfortante con ${cn}, ideal para la tarde.`,
      ingredientes: (cn) => ['500 ml de bebida vegetal', `1 cucharadita de ${cn}`, 'Una pizca de pimienta', 'Canela y endulzante a gusto'],
      pasos: (cn) => ['Calentá la bebida sin que hierva.', `Sumá ${cn}, la pimienta y la canela.`, 'Revolvé unos minutos.', 'Endulzá y serví tibio.'],
    },
    {
      key: 'infusion', tipo: 'bebida', prepMin: 5, cookMin: 5, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Infusión de ${cn}`,
      descripcion: (cn) => `Una infusión simple de ${cn}, sola o con limón.`,
      ingredientes: (cn) => ['1 taza de agua caliente', `1 cucharadita de ${cn}`, 'Jugo de limón opcional'],
      pasos: (cn) => ['Calentá el agua.', `Sumá ${cn} y dejá reposar unos minutos.`, 'Colá si hace falta.', 'Serví con limón a gusto.'],
    },
    {
      key: 'dressing', tipo: 'guarnicion', prepMin: 5, cookMin: 0, porciones: '1 frasco', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Aderezo con ${cn}`,
      descripcion: (cn) => `Un aderezo casero con ${cn} para realzar ensaladas y bowls.`,
      ingredientes: (cn) => ['Aceite de oliva', 'Jugo de limón', `1/2 cucharadita de ${cn}`, 'Sal y pimienta'],
      pasos: () => ['Mezclá todos los ingredientes en un frasco.', 'Agitá bien.', 'Usá sobre ensaladas o vegetales.'],
    },
    {
      key: 'arroz', tipo: 'guarnicion', prepMin: 5, cookMin: 20, porciones: '4 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Arroz especiado con ${cn}`,
      descripcion: (cn) => `Un arroz aromático con ${cn} para acompañar tus comidas.`,
      ingredientes: (cn) => ['1 taza de arroz', '2 tazas de caldo', `1/2 cucharadita de ${cn}`, 'Aceite de oliva y sal'],
      pasos: (cn) => ['Rehogá el arroz con un poco de aceite.', `Sumá ${cn} y el caldo.`, 'Cociná hasta que el arroz esté listo.', 'Dejá reposar y serví.'],
    },
    {
      key: 'bebida-fria', tipo: 'bebida', prepMin: 10, cookMin: 0, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Bebida fría de ${cn} con limón`,
      descripcion: (cn) => `Una bebida refrescante con ${cn} y limón para los días de calor.`,
      ingredientes: (cn) => ['1 litro de agua fría', `1/2 cucharadita de ${cn}`, 'Jugo de 2 limones', 'Hielo a gusto'],
      pasos: () => ['Mezclá el agua con el limón.', 'Sumá la especia y revolvé.', 'Agregá hielo.', 'Serví bien fría.'],
    },
  ],

  SUPERPOLVO: [
    {
      key: 'smoothie', tipo: 'bebida', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Smoothie con ${cn}`,
      descripcion: (cn) => `Un smoothie cremoso con ${cn} y banana para empezar el día.`,
      ingredientes: (cn) => ['1 banana', '1 taza de bebida vegetal', `1 cucharadita de ${cn}`, 'Un puñado de avena'],
      pasos: () => ['Poné todo en la licuadora.', 'Licuá hasta integrar.', 'Ajustá el espesor.', 'Serví al momento.'],
    },
    {
      key: 'bolitas', tipo: 'snack', prepMin: 15, cookMin: 0, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Bolitas energéticas con ${cn}`,
      descripcion: (cn) => `Bolitas sin horno con ${cn}, dátiles y avena.`,
      ingredientes: (cn) => ['1 taza de dátiles sin carozo', '1 taza de avena', `1 cucharada de ${cn}`, 'Coco rallado para rebozar'],
      pasos: () => ['Procesá los dátiles.', 'Mezclá con la avena y el polvo.', 'Formá bolitas y rebozá en coco.', 'Llevá al frío 30 minutos.'],
    },
    {
      key: 'bowl', tipo: 'desayuno', prepMin: 10, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Bowl de avena con ${cn}`,
      descripcion: (cn) => `Un bowl de avena con ${cn} y frutas, para un desayuno completo.`,
      ingredientes: (cn) => ['1/2 taza de avena', '1 taza de bebida vegetal', `1 cucharadita de ${cn}`, 'Frutas y semillas'],
      pasos: (cn) => ['Cociná o remojá la avena con la bebida.', `Integrá ${cn}.`, 'Serví en un bowl.', 'Terminá con frutas y semillas.'],
    },
    {
      key: 'latte', tipo: 'bebida', prepMin: 5, cookMin: 5, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Latte de ${cn}`,
      descripcion: (cn) => `Un latte cremoso con ${cn} y bebida vegetal.`,
      ingredientes: (cn) => ['1 taza de bebida vegetal', `1 cucharadita de ${cn}`, 'Endulzante a gusto', 'Canela opcional'],
      pasos: (cn) => ['Calentá la bebida sin que hierva.', `Integrá ${cn} batiendo bien.`, 'Endulzá a gusto.', 'Serví con canela.'],
    },
    {
      key: 'budin', tipo: 'postre', prepMin: 15, cookMin: 30, porciones: '1 budín', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Budín con ${cn}`,
      descripcion: (cn) => `Un budín casero con ${cn} para la merienda.`,
      ingredientes: (cn) => ['2 tazas de harina integral', `2 cucharadas de ${cn}`, '1 taza de bebida vegetal', 'Endulzante y polvo de hornear'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá los ingredientes.', 'Volcá en un molde.', 'Horneá unos 30 minutos.'],
    },
  ],

  INFUSION: [
    {
      key: 'caliente', tipo: 'bebida', prepMin: 5, cookMin: 2, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Infusión caliente de ${cn}`,
      descripcion: (cn) => `La preparación clásica de ${cn} en infusión, simple y reconfortante.`,
      ingredientes: (cn) => ['1 taza de agua caliente', `1 cucharadita de ${cn}`],
      pasos: (cn) => ['Calentá el agua sin que hierva en exceso.', `Sumá ${cn}.`, 'Dejá reposar unos minutos.', 'Colá y serví.'],
    },
    {
      key: 'helado', tipo: 'bebida', prepMin: 10, cookMin: 5, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Té helado de ${cn}`,
      descripcion: (cn) => `Una versión fría de ${cn}, refrescante para el verano.`,
      ingredientes: (cn) => ['1 litro de agua', `2 cucharaditas de ${cn}`, 'Rodajas de limón', 'Hielo a gusto'],
      pasos: (cn) => [`Prepará la infusión de ${cn} y dejá enfriar.`, 'Llevá a la heladera.', 'Serví con hielo y limón.'],
    },
    {
      key: 'blend', tipo: 'bebida', prepMin: 5, cookMin: 2, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Blend de ${cn} con especias`,
      descripcion: (cn) => `Una infusión de ${cn} combinada con especias aromáticas.`,
      ingredientes: (cn) => ['1 taza de agua caliente', `1 cucharadita de ${cn}`, 'Jengibre y canela', 'Cáscara de naranja opcional'],
      pasos: () => ['Calentá el agua.', 'Sumá la infusión y las especias.', 'Dejá reposar unos minutos.', 'Colá y serví.'],
    },
    {
      key: 'limonada', tipo: 'bebida', prepMin: 10, cookMin: 0, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Limonada de ${cn} con menta`,
      descripcion: (cn) => `Una limonada con ${cn} y menta, sin azúcar agregada.`,
      ingredientes: (cn) => [`1 infusión concentrada de ${cn} fría`, 'Jugo de 2 limones', 'Hojas de menta', 'Agua y hielo'],
      pasos: () => ['Mezclá la infusión fría con el limón.', 'Completá con agua y hielo.', 'Sumá menta.', 'Serví bien fría.'],
    },
    {
      key: 'latte', tipo: 'bebida', prepMin: 5, cookMin: 5, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Latte de ${cn}`,
      descripcion: (cn) => `Un latte cremoso a base de ${cn} y bebida vegetal.`,
      ingredientes: (cn) => [`1 infusión concentrada de ${cn}`, '1/2 taza de bebida vegetal', 'Endulzante a gusto'],
      pasos: () => ['Prepará la infusión concentrada.', 'Calentá y espumá la bebida vegetal.', 'Combiná y endulzá a gusto.'],
    },
  ],

  ENDULZANTE: [
    {
      key: 'endulzar', tipo: 'bebida', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Bebida endulzada con ${cn}`,
      descripcion: (cn) => `Una forma simple de usar ${cn} para endulzar infusiones y bebidas.`,
      ingredientes: (cn) => ['1 taza de tu infusión preferida', `${cn} a gusto`],
      pasos: (cn) => ['Prepará tu infusión.', `Sumá ${cn} a gusto.`, 'Revolvé y serví.'],
    },
    {
      key: 'granola', tipo: 'desayuno', prepMin: 10, cookMin: 25, porciones: 'Varias porciones', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Granola casera con ${cn}`,
      descripcion: (cn) => `Granola crocante endulzada con ${cn}.`,
      ingredientes: (cn) => ['3 tazas de avena', '1 taza de frutos secos', `3 cucharadas de ${cn}`, '2 cucharadas de aceite de coco'],
      pasos: () => ['Precalentá el horno a 160 °C.', 'Mezclá todo.', 'Esparcí en una placa.', 'Horneá 20 a 25 minutos revolviendo a la mitad.'],
    },
    {
      key: 'budin', tipo: 'postre', prepMin: 15, cookMin: 35, porciones: '1 budín', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Budín endulzado con ${cn}`,
      descripcion: (cn) => `Un budín casero endulzado con ${cn}.`,
      ingredientes: (cn) => ['2 tazas de harina integral', `1/2 taza de ${cn}`, '1 taza de bebida vegetal', 'Polvo de hornear y vainilla'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá los ingredientes.', 'Volcá en un molde.', 'Horneá 35 minutos.'],
    },
    {
      key: 'galletas', tipo: 'postre', prepMin: 15, cookMin: 12, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Galletas con ${cn}`,
      descripcion: (cn) => `Galletas caseras endulzadas con ${cn}.`,
      ingredientes: (cn) => ['1 taza de avena', '1 taza de harina', `1/3 taza de ${cn}`, '2 cucharadas de aceite'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Formá la masa.', 'Armá las galletas.', 'Horneá 10 a 12 minutos.'],
    },
    {
      key: 'vinagreta', tipo: 'guarnicion', prepMin: 5, cookMin: 0, porciones: '1 frasco', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Aderezo agridulce con ${cn}`,
      descripcion: (cn) => `Un aderezo agridulce con ${cn} para ensaladas y vegetales.`,
      ingredientes: (cn) => ['3 cucharadas de aceite de oliva', '1 cucharada de mostaza', `1 cucharada de ${cn}`, 'Jugo de limón, sal y pimienta'],
      pasos: () => ['Mezclá todos los ingredientes en un frasco.', 'Agitá bien.', 'Usá sobre ensaladas.'],
    },
  ],

  ACEITE_COCO: [
    {
      key: 'cafe', tipo: 'bebida', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Café cremoso con ${cn}`,
      descripcion: (cn) => `Un café batido y cremoso con ${cn}.`,
      ingredientes: (cn) => ['1 taza de café', `1 cucharadita de ${cn}`, 'Bebida vegetal a gusto'],
      pasos: (cn) => ['Prepará el café.', `Sumá ${cn} y batí o licuá unos segundos.`, 'Completá con bebida vegetal.', 'Serví caliente.'],
    },
    {
      key: 'salteado', tipo: 'almuerzo', prepMin: 10, cookMin: 10, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Salteado de vegetales con ${cn}`,
      descripcion: (cn) => `Un salteado rápido de vegetales cocinado con ${cn}.`,
      ingredientes: (cn) => ['Vegetales variados', `1 cucharada de ${cn}`, 'Salsa de soja', 'Semillas de sésamo'],
      pasos: (cn) => [`Calentá ${cn} en una sartén o wok.`, 'Salteá los vegetales a fuego fuerte.', 'Sumá salsa de soja.', 'Terminá con sésamo.'],
    },
    {
      key: 'reposteria', tipo: 'postre', prepMin: 15, cookMin: 35, porciones: '1 bizcochuelo', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Bizcochuelo con ${cn}`,
      descripcion: (cn) => `Un bizcochuelo casero que usa ${cn} en reemplazo de otras grasas.`,
      ingredientes: (cn) => ['2 tazas de harina', `1/3 taza de ${cn} derretido`, '1 taza de bebida vegetal', 'Endulzante y polvo de hornear'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá los ingredientes.', 'Volcá en un molde.', 'Horneá unos 35 minutos.'],
    },
    {
      key: 'granola', tipo: 'desayuno', prepMin: 10, cookMin: 25, porciones: 'Varias porciones', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Granola con ${cn}`,
      descripcion: (cn) => `Granola crocante hecha con ${cn}.`,
      ingredientes: (cn) => ['3 tazas de avena', '1 taza de frutos secos', `3 cucharadas de ${cn} derretido`, 'Endulzante natural a gusto'],
      pasos: () => ['Precalentá el horno a 160 °C.', 'Mezclá todo.', 'Esparcí en una placa.', 'Horneá 20 a 25 minutos.'],
    },
    {
      key: 'bolitas', tipo: 'snack', prepMin: 15, cookMin: 0, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Bolitas de coco con ${cn}`,
      descripcion: (cn) => `Bolitas sin horno con coco y ${cn}.`,
      ingredientes: (cn) => ['1 taza de dátiles', '1 taza de coco rallado', `2 cucharadas de ${cn}`, '2 cucharadas de cacao'],
      pasos: () => ['Procesá los dátiles.', 'Mezclá con el resto.', 'Formá bolitas.', 'Llevá al frío 30 minutos.'],
    },
  ],

  COCO_RALLADO: [
    {
      key: 'budin', tipo: 'postre', prepMin: 15, cookMin: 40, porciones: '1 budín', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Budín de ${cn}`,
      descripcion: (cn) => `Un budín húmedo con ${cn}, aromático y simple.`,
      ingredientes: (cn) => ['2 tazas de harina', `1 taza de ${cn}`, '1 taza de bebida vegetal', 'Endulzante y polvo de hornear'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá los ingredientes.', 'Volcá en un molde.', 'Horneá unos 40 minutos.'],
    },
    {
      key: 'bolitas', tipo: 'snack', prepMin: 15, cookMin: 0, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: ['Energético'],
      titulo: (cn) => `Bolitas de ${cn} y avena`,
      descripcion: (cn) => `Bolitas energéticas sin horno con ${cn} y avena.`,
      ingredientes: (cn) => ['1 taza de dátiles', '1 taza de avena', `1/2 taza de ${cn}`, '2 cucharadas de cacao'],
      pasos: () => ['Procesá los dátiles.', 'Mezclá con avena, coco y cacao.', 'Formá bolitas.', 'Llevá al frío.'],
    },
    {
      key: 'granola', tipo: 'desayuno', prepMin: 10, cookMin: 25, porciones: 'Varias porciones', dificultad: 'Media',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Granola con ${cn}`,
      descripcion: (cn) => `Granola crocante con ${cn} para el desayuno.`,
      ingredientes: (cn) => ['3 tazas de avena', `1 taza de ${cn}`, '1/2 taza de frutos secos', '3 cucharadas de aceite de coco'],
      pasos: () => ['Precalentá el horno a 160 °C.', 'Mezclá todo.', 'Esparcí en una placa.', 'Horneá 20 a 25 minutos.'],
    },
    {
      key: 'cobertura', tipo: 'postre', prepMin: 10, cookMin: 0, porciones: 'Varias porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Cobertura crocante con ${cn}`,
      descripcion: (cn) => `Una cobertura de ${cn} para terminar postres y frutas.`,
      ingredientes: (cn) => [`1 taza de ${cn}`, 'Ralladura de limón opcional'],
      pasos: (cn) => [`Tostá ${cn} levemente en sartén.`, 'Dejá enfriar.', 'Usá para cubrir postres, yogur o frutas.'],
    },
    {
      key: 'galletas', tipo: 'postre', prepMin: 15, cookMin: 15, porciones: '12 unidades', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: [],
      titulo: (cn) => `Galletas de ${cn}`,
      descripcion: (cn) => `Galletas caseras con ${cn}, ideales para la merienda.`,
      ingredientes: (cn) => ['1 taza de harina', `1 taza de ${cn}`, 'Endulzante a gusto', '2 cucharadas de aceite'],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Formá la masa.', 'Armá las galletas.', 'Horneá hasta dorar.'],
    },
  ],

  GRANOLA_PRODUCT: [
    {
      key: 'parfait', tipo: 'desayuno', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: false, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Parfait de yogur y ${cn}`,
      descripcion: (cn) => `Un parfait en capas de yogur, frutas y ${cn}.`,
      ingredientes: (cn) => ['1 taza de yogur natural', 'Frutas frescas', `1/2 taza de ${cn}`],
      pasos: (cn) => ['En un vaso, alterná capas de yogur y frutas.', `Sumá ${cn} entre las capas.`, 'Terminá con granola por encima.'],
    },
    {
      key: 'bowl', tipo: 'desayuno', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Bowl de ${cn} con leche y frutas`,
      descripcion: (cn) => `La forma clásica de disfrutar ${cn}: con bebida y frutas.`,
      ingredientes: (cn) => [`1/2 taza de ${cn}`, '1 taza de bebida vegetal', 'Frutas a gusto'],
      pasos: (cn) => [`Serví ${cn} en un bowl.`, 'Sumá la bebida.', 'Terminá con frutas.'],
    },
    {
      key: 'barras', tipo: 'snack', prepMin: 15, cookMin: 10, porciones: '8 barras', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: false, extraTags: ['Energético'],
      titulo: (cn) => `Barras con ${cn}`,
      descripcion: (cn) => `Barras compactas con ${cn} para llevar.`,
      ingredientes: (cn) => [`2 tazas de ${cn}`, '3 cucharadas de miel o pasta de dátil', '2 cucharadas de aceite de coco'],
      pasos: () => ['Mezclá todo.', 'Compactá en una asadera.', 'Llevá al horno suave 10 minutos.', 'Dejá enfriar y cortá.'],
    },
    {
      key: 'manzana', tipo: 'postre', prepMin: 10, cookMin: 25, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Manzana al horno con ${cn}`,
      descripcion: (cn) => `Manzanas horneadas y cubiertas con ${cn}, un postre tibio y simple.`,
      ingredientes: (cn) => ['2 manzanas', 'Canela', `1/2 taza de ${cn}`],
      pasos: (cn) => ['Cortá las manzanas y acomodalas en una fuente.', 'Espolvoreá canela.', 'Horneá a 180 °C unos 20 minutos.', `Terminá con ${cn} por encima.`],
    },
    {
      key: 'smoothie-bowl', tipo: 'desayuno', prepMin: 10, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: false, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Smoothie bowl con ${cn}`,
      descripcion: (cn) => `Un smoothie bowl cremoso terminado con ${cn}.`,
      ingredientes: (cn) => ['1 banana congelada', '1/2 taza de frutas', '1/2 taza de yogur', `1/3 taza de ${cn}`],
      pasos: (cn) => ['Licuá la fruta con el yogur hasta una crema espesa.', 'Volcá en un bowl.', `Terminá con ${cn} y más fruta.`],
    },
  ],

  LEVADURA: [
    {
      key: 'salsa', tipo: 'guarnicion', prepMin: 10, cookMin: 5, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Salsa cremosa tipo queso con ${cn}`,
      descripcion: (cn) => `Una salsa vegana tipo queso que usa ${cn} para dar sabor.`,
      ingredientes: (cn) => ['1 papa y 1 zanahoria cocidas', `3 cucharadas de ${cn}`, 'Bebida vegetal', 'Aceite, sal y ajo'],
      pasos: (cn) => ['Procesá las verduras cocidas.', `Sumá ${cn}, aceite y condimentos.`, 'Ajustá con bebida vegetal hasta la textura deseada.', 'Calentá y serví.'],
    },
    {
      key: 'pastas', tipo: 'almuerzo', prepMin: 5, cookMin: 10, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Pastas con ${cn}`,
      descripcion: (cn) => `Pastas simples terminadas con ${cn} para dar un toque de sabor.`,
      ingredientes: (cn) => ['Pastas a gusto', 'Aceite de oliva y ajo', `2 cucharadas de ${cn}`],
      pasos: (cn) => ['Cociná las pastas.', 'Saltealas con aceite y ajo.', `Terminá con ${cn} por encima.`],
    },
    {
      key: 'pure', tipo: 'guarnicion', prepMin: 10, cookMin: 15, porciones: '3 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Puré cremoso con ${cn}`,
      descripcion: (cn) => `Un puré de papa cremoso con ${cn} para sumar sabor.`,
      ingredientes: (cn) => ['4 papas', 'Bebida vegetal', `2 cucharadas de ${cn}`, 'Aceite de oliva y sal'],
      pasos: (cn) => ['Herví y pisá las papas.', 'Sumá bebida vegetal y aceite.', `Integrá ${cn}.`, 'Ajustá la sal y serví.'],
    },
    {
      key: 'palomitas', tipo: 'snack', prepMin: 5, cookMin: 5, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Pochoclos con ${cn}`,
      descripcion: (cn) => `Pochoclos caseros con ${cn} en lugar de queso.`,
      ingredientes: (cn) => ['1/2 taza de maíz pisingallo', '1 cucharada de aceite', `2 cucharadas de ${cn}`, 'Sal a gusto'],
      pasos: (cn) => ['Hacé los pochoclos en una olla tapada.', `Espolvoreá ${cn} y sal.`, 'Mezclá y serví.'],
    },
    {
      key: 'budin-salado', tipo: 'panificado', prepMin: 15, cookMin: 35, porciones: '1 budín', dificultad: 'Media',
      vegano: false, glutenFree: false, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Budín salado con ${cn}`,
      descripcion: (cn) => `Un budín salado de vegetales con ${cn} para dar sabor.`,
      ingredientes: (cn) => ['2 tazas de harina', '3 huevos', 'Vegetales cocidos', `3 cucharadas de ${cn}`],
      pasos: () => ['Precalentá el horno a 180 °C.', 'Mezclá todos los ingredientes.', 'Volcá en un molde.', 'Horneá 35 minutos.'],
    },
  ],

  GENERICO: [
    {
      key: 'snack', tipo: 'snack', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Snack simple con ${cn}`,
      descripcion: (cn) => `Una colación rápida para sumar ${cn} a tu día.`,
      ingredientes: (cn) => [`${cap(cn)} a gusto`, 'Frutas o frutos secos'],
      pasos: (cn) => [`Serví ${cn} en un bol.`, 'Acompañá con fruta o frutos secos.'],
    },
    {
      key: 'desayuno', tipo: 'desayuno', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: false, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Desayuno con ${cn}`,
      descripcion: (cn) => `Un desayuno simple que incorpora ${cn}.`,
      ingredientes: (cn) => ['1 taza de yogur o avena', `${cap(cn)} a gusto`, 'Frutas'],
      pasos: (cn) => ['Serví la base en un bol.', `Sumá ${cn} y frutas.`],
    },
    {
      key: 'ensalada', tipo: 'ensalada', prepMin: 10, cookMin: 0, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Ensalada con ${cn}`,
      descripcion: (cn) => `Una ensalada fresca que suma ${cn}.`,
      ingredientes: (cn) => ['Hojas verdes y vegetales', `${cap(cn)} a gusto`, 'Aceite, limón y sal'],
      pasos: (cn) => ['Armá la ensalada.', `Sumá ${cn}.`, 'Aderezá y serví.'],
    },
    {
      key: 'bebida', tipo: 'bebida', prepMin: 5, cookMin: 0, porciones: '1 porción', dificultad: 'Fácil',
      vegano: true, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Bebida con ${cn}`,
      descripcion: (cn) => `Una bebida simple para incorporar ${cn}.`,
      ingredientes: (cn) => ['1 taza de bebida vegetal o agua', `${cap(cn)} a gusto`],
      pasos: (cn) => ['Mezclá la base con el producto.', `Integrá ${cn} bien.`, 'Serví.'],
    },
    {
      key: 'postre', tipo: 'postre', prepMin: 10, cookMin: 0, porciones: '2 porciones', dificultad: 'Fácil',
      vegano: false, glutenFree: true, noAddedSugar: true, extraTags: [],
      titulo: (cn) => `Postre simple con ${cn}`,
      descripcion: (cn) => `Un postre liviano que incorpora ${cn}.`,
      ingredientes: (cn) => ['Yogur o crema vegetal', 'Frutas', `${cap(cn)} a gusto`],
      pasos: (cn) => ['Serví la base en copas.', `Sumá frutas y ${cn}.`, 'Llevá al frío y serví.'],
    },
  ],
};

const PRODUCT_ARCHETYPE: Record<string, string> = {
  chia: 'SEMILLA_GEL',
  avena: 'GRANO_DULCE',
  quinoa: 'GRANO_SALADO',
  lino: 'SEMILLA_TOPPING',
  almendras: 'FRUTO_SECO',
  nueces: 'FRUTO_SECO',
  curcuma: 'ESPECIA',
  maca: 'SUPERPOLVO',
  espirulina: 'SUPERPOLVO',
  'aceite-de-coco': 'ACEITE_COCO',
  'coco-rallado': 'COCO_RALLADO',
  'harina-de-almendras': 'HARINA_DULCE',
  'pasas-de-uva': 'FRUTA_DULCE',
  'te-verde': 'INFUSION',
  'azucar-mascabo': 'ENDULZANTE',
  'mix-frutos-secos': 'FRUTO_SECO',
  cacao: 'SUPERPOLVO',
  lentejas: 'LEGUMBRE',
  miel: 'ENDULZANTE',
  girasol: 'SEMILLA_TOPPING',
  sesamo: 'SEMILLA_TOPPING',
  amaranto: 'GRANO_SALADO',
  garbanzos: 'LEGUMBRE',
  datiles: 'FRUTA_DULCE',
  'ciruelas-pasas': 'FRUTA_DULCE',
  'harina-de-coco': 'HARINA_DULCE',
  jengibre: 'ESPECIA',
  granola: 'GRANOLA_PRODUCT',
  'levadura-nutricional': 'LEVADURA',
};

const CATEGORY_FALLBACK: Record<string, string> = {
  Semilla: 'SEMILLA_TOPPING',
  Cereal: 'GRANO_DULCE',
  Pseudocereal: 'GRANO_SALADO',
  Legumbre: 'LEGUMBRE',
  'Fruto seco': 'FRUTO_SECO',
  'Fruta seca': 'FRUTA_DULCE',
  Harina: 'HARINA_DULCE',
  Raíz: 'ESPECIA',
  Infusión: 'INFUSION',
  Endulzante: 'ENDULZANTE',
  Aceite: 'ACEITE_COCO',
  Coco: 'COCO_RALLADO',
  Alga: 'SUPERPOLVO',
  Superalimento: 'SUPERPOLVO',
  'Producto apícola': 'ENDULZANTE',
};

function archetypeFor(product: Product): Blueprint[] {
  const key =
    PRODUCT_ARCHETYPE[product.slug] ?? CATEGORY_FALLBACK[product.categoria] ?? 'GENERICO';
  return ARCHETYPES[key] ?? ARCHETYPES.GENERICO;
}

export function generateRecipesForProduct(product: Product): Recipe[] {
  return archetypeFor(product).map((bp) => buildRecipe(product, bp));
}

export function generateAllRecipes(products: Product[]): Recipe[] {
  const seen = new Set<string>();
  const out: Recipe[] = [];
  for (const p of products) {
    for (const r of generateRecipesForProduct(p)) {
      if (seen.has(r.slug)) continue;
      seen.add(r.slug);
      out.push(r);
    }
  }
  return out;
}
