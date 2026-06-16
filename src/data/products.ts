import type { Product, UseCaseSlug } from './types';
import { buildProducts } from './productEngine';
import { extraSeeds } from './extraProducts';
import { extraSeeds2 } from './extraProducts2';
import { extraSeeds3 } from './extraProducts3';

const FAQ_BASE = [
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

const MED = { nombre: 'MedlinePlus (Biblioteca Nacional de Medicina, EE. UU.)', url: 'https://medlineplus.gov/spanish/' };
const EFSA = { nombre: 'Autoridad Europea de Seguridad Alimentaria (EFSA)', url: 'https://www.efsa.europa.eu/es' };
const FAO = { nombre: 'Organización de las Naciones Unidas para la Alimentación (FAO)', url: 'https://www.fao.org/home/es' };
const OMS = { nombre: 'Organización Mundial de la Salud (OMS)', url: 'https://www.who.int/es' };
const ODS = { nombre: 'Oficina de Suplementos Dietéticos (NIH, EE. UU.)', url: 'https://ods.od.nih.gov/' };

export const products: Product[] = [
  {
    slug: 'chia',
    nombre: 'Semillas de chía',
    nombreCientifico: 'Salvia hispanica',
    categoria: 'Semilla',
    tagline: 'Semillas pequeñas, fuente de fibra y omega-3 vegetal.',
    resumen:
      'La chía son las semillas de la planta Salvia hispanica. Se usan como alimento por su aporte de fibra y de grasas omega-3 de origen vegetal. Es un alimento, no un medicamento.',
    queEs:
      'La chía es una semilla originaria de Centroamérica, de tamaño muy pequeño y color que va del gris al negro. En contacto con líquido forma un gel característico, por lo que se usa en preparaciones como el clásico pudin de chía. Se consume entera o molida.',
    composicion: [
      'Fibra soluble e insoluble.',
      'Ácidos grasos omega-3 de origen vegetal (ALA).',
      'Proteínas vegetales y minerales como calcio y magnesio.',
      'Antioxidantes naturales.',
    ],
    usosTradicionales: [
      'En pudines, yogures, batidos y bowls de desayuno.',
      'Como espesante natural al hidratarse y formar gel.',
      'Añadida a panes y preparaciones de repostería casera.',
    ],
    comoSeConsume: [
      { forma: 'Hidratada', detalle: 'En líquido (agua, leche o bebida vegetal) hasta formar gel.' },
      { forma: 'Molida', detalle: 'Espolvoreada sobre comidas; molida se aprovecha mejor.' },
      { forma: 'En recetas', detalle: 'En panificados, galletas y barras caseras.' },
    ],
    precauciones: [
      'Acompañar siempre con suficiente líquido, sobre todo si se consume seca.',
      'Personas con dificultad para tragar deben hidratarla antes de consumirla.',
      'Aumentar la fibra de forma gradual para evitar molestias digestivas.',
      'Personas que toman anticoagulantes o medicación para la presión deben consultar.',
      'Introducir con cuidado en niños pequeños.',
    ],
    contraindicaciones:
      'Como alimento es bien tolerada por la mayoría de las personas. Conviene moderar la cantidad y tomar suficiente líquido; ante medicación específica, consultar.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Es mejor entera o molida?',
        a: 'Ambas formas sirven. Molida suele aprovecharse mejor; entera aporta textura y el gel característico. Podés alternar según la preparación.',
      },
    ],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['digestion', 'articulaciones'],
    destacado: true,
    hue: 150,
    imagen: '/productos/chia.png',
  },
  {
    slug: 'avena',
    nombre: 'Avena arrollada',
    nombreCientifico: 'Avena sativa',
    categoria: 'Cereal',
    tagline: 'Cereal versátil, fuente de fibra y energía de liberación lenta.',
    resumen:
      'La avena arrollada son granos de avena prensados en copos. Es un cereal muy usado en el desayuno por su aporte de fibra y carbohidratos. Es un alimento, no un medicamento.',
    queEs:
      'La avena es uno de los cereales más completos. La versión arrollada se obtiene al cocer ligeramente y prensar el grano, lo que la vuelve rápida de preparar. Contiene un tipo de fibra llamada betaglucano, característica de este cereal.',
    composicion: [
      'Fibra, en especial betaglucanos.',
      'Carbohidratos complejos de liberación gradual.',
      'Proteínas vegetales.',
      'Minerales como hierro, magnesio y zinc, y vitaminas del grupo B.',
    ],
    usosTradicionales: [
      'En porridge, avena cocida y overnight oats.',
      'En panes, galletas, granolas y barras caseras.',
      'Como base de bebidas vegetales caseras.',
    ],
    comoSeConsume: [
      { forma: 'Cocida', detalle: 'Con agua o leche para preparar porridge.' },
      { forma: 'En remojo', detalle: 'Overnight oats, lista para el desayuno.' },
      { forma: 'En recetas', detalle: 'En panificados, granola y rebozados.' },
    ],
    precauciones: [
      'Personas celíacas: elegir avena certificada sin gluten para evitar contaminación cruzada.',
      'Aumentar la fibra de forma gradual y con suficiente líquido.',
      'Revisar el etiquetado si hay sensibilidad al gluten.',
      'En personas con diabetes, considerar la cantidad dentro del plan de alimentación.',
    ],
    contraindicaciones:
      'Es un alimento de consumo habitual y bien tolerado. El principal cuidado es la contaminación con gluten en personas celíacas, que deben buscar la versión certificada.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿La avena tiene gluten?',
        a: 'La avena en sí no contiene gluten, pero suele contaminarse con otros cereales durante su procesamiento. Las personas celíacas deben elegir avena certificada sin gluten.',
      },
    ],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['digestion', 'energia', 'descanso'],
    destacado: true,
    hue: 75,
    imagen: '/productos/avena.png',
  },
  {
    slug: 'quinoa',
    nombre: 'Quinoa',
    nombreCientifico: 'Chenopodium quinoa',
    categoria: 'Pseudocereal',
    tagline: 'Grano andino con proteínas completas y sin gluten.',
    resumen:
      'La quinoa es un pseudocereal originario de los Andes que se cocina como un grano. Se valora por su aporte de proteínas vegetales y por no contener gluten. Es un alimento, no un medicamento.',
    queEs:
      'La quinoa es la semilla de una planta andina. Aunque se usa en la cocina como un cereal, botánicamente es un pseudocereal. Aporta proteínas de buena calidad y es naturalmente libre de gluten, por lo que se popularizó en distintos tipos de alimentación.',
    composicion: [
      'Proteínas vegetales con todos los aminoácidos esenciales.',
      'Carbohidratos complejos y fibra.',
      'Minerales como hierro, magnesio y fósforo.',
      'Naturalmente sin gluten.',
    ],
    usosTradicionales: [
      'Como guarnición, en ensaladas tibias y bowls.',
      'En guisos, rellenos y hamburguesas vegetales.',
      'En preparaciones dulces y desayunos.',
    ],
    comoSeConsume: [
      { forma: 'Hervida', detalle: 'Enjuagar bien antes de cocinarla en agua o caldo.' },
      { forma: 'En ensaladas', detalle: 'Fría, combinada con vegetales y legumbres.' },
      { forma: 'En harina', detalle: 'Para panificados y rebozados sin gluten.' },
    ],
    precauciones: [
      'Enjuagar bien el grano antes de cocinarlo para quitar su recubrimiento amargo (saponinas).',
      'Introducir de forma gradual si no se está habituado a su fibra.',
      'Elegir productos de origen confiable.',
      'En dietas específicas, considerar la cantidad dentro del plan.',
    ],
    contraindicaciones:
      'Es un alimento bien tolerado y apto para personas celíacas. El paso clave es enjuagarla antes de cocinar; por lo demás, no presenta cuidados especiales en personas sanas.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Por qué hay que lavarla antes de cocinar?',
        a: 'La quinoa tiene un recubrimiento natural llamado saponina, de sabor amargo. Enjuagarla bajo el agua antes de cocinarla mejora su sabor.',
      },
    ],
    fuentes: [MED, FAO, EFSA],
    casosDeUso: ['energia', 'digestion'],
    destacado: true,
    hue: 95,
    imagen: '/productos/quinoa.png',
  },
  {
    slug: 'lino',
    nombre: 'Semillas de lino',
    nombreCientifico: 'Linum usitatissimum',
    categoria: 'Semilla',
    tagline: 'Semillas fuente de fibra y omega-3 vegetal.',
    resumen:
      'El lino, o linaza, son las semillas de la planta Linum usitatissimum. Se usan como alimento por su aporte de fibra y de omega-3 de origen vegetal. Es un alimento, no un medicamento.',
    queEs:
      'El lino es una semilla pequeña, de color marrón o dorado, con una cáscara dura. Para aprovechar mejor sus nutrientes suele consumirse molida, ya que entera puede pasar por el sistema digestivo sin abrirse. Al hidratarse libera una textura gelatinosa.',
    composicion: [
      'Fibra soluble e insoluble.',
      'Ácidos grasos omega-3 de origen vegetal (ALA).',
      'Lignanos, un tipo de compuesto vegetal.',
      'Proteínas y minerales.',
    ],
    usosTradicionales: [
      'Molido sobre yogures, ensaladas y comidas.',
      'En panes y preparaciones de repostería.',
      'Como sustituto de huevo en recetas veganas, al hidratarse.',
    ],
    comoSeConsume: [
      { forma: 'Molido', detalle: 'Recién molido para aprovechar mejor sus nutrientes.' },
      { forma: 'Hidratado', detalle: 'En agua, forma un gel útil en repostería.' },
      { forma: 'En recetas', detalle: 'En panificados y mezclas de semillas.' },
    ],
    precauciones: [
      'Consumir preferentemente molido y con suficiente líquido.',
      'Aumentar la cantidad de forma gradual para evitar molestias digestivas.',
      'Personas que toman anticoagulantes o medicación hormonal deben consultar.',
      'Conservar molido en frío y por poco tiempo para evitar que se oxide.',
      'Embarazo y lactancia: consultar antes de consumirlo en cantidades altas.',
    ],
    contraindicaciones:
      'Como alimento es bien tolerado en cantidades habituales. Conviene moderar, acompañar con líquido y, ante medicación específica, consultar.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Entero o molido?',
        a: 'Molido se aprovecha mucho mejor, porque la semilla entera suele pasar sin digerirse. Lo ideal es molerlo en el momento y conservarlo en frío.',
      },
    ],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['digestion', 'mente', 'articulaciones'],
    destacado: false,
    hue: 45,
    imagen: '/productos/lino.png',
  },
  {
    slug: 'almendras',
    nombre: 'Almendras',
    nombreCientifico: 'Prunus dulcis',
    categoria: 'Fruto seco',
    tagline: 'Fruto seco nutritivo, fuente de grasas saludables y vitamina E.',
    resumen:
      'Las almendras son el fruto seco del almendro. Se consumen como snack y en múltiples preparaciones por su aporte de grasas saludables, proteínas y vitamina E. Son un alimento, no un medicamento.',
    queEs:
      'La almendra es la semilla comestible del almendro, un árbol de la familia de los rosales. Se consume cruda, tostada, en láminas, en harina o como bebida vegetal. Es un fruto seco muy versátil tanto en preparaciones dulces como saladas.',
    composicion: [
      'Grasas saludables (principalmente monoinsaturadas).',
      'Proteínas vegetales y fibra.',
      'Vitamina E y magnesio.',
      'Calcio y otros minerales.',
    ],
    usosTradicionales: [
      'Como snack, solas o en mix de frutos secos.',
      'En harina para repostería y rebozados sin gluten.',
      'Como base de bebida vegetal y de pastas tipo crema de almendras.',
    ],
    comoSeConsume: [
      { forma: 'Naturales', detalle: 'Crudas o tostadas, como colación.' },
      { forma: 'En harina', detalle: 'Para panificados y postres.' },
      { forma: 'En bebida', detalle: 'Como leche vegetal casera o comprada.' },
    ],
    precauciones: [
      'Alergia a frutos secos: evitar su consumo, las reacciones pueden ser graves.',
      'Son calóricas: cuidar el tamaño de la porción.',
      'En niños pequeños, ofrecerlas molidas o en crema por el riesgo de atragantamiento.',
      'Elegir versiones sin sal ni azúcar agregada cuando sea posible.',
    ],
    contraindicaciones:
      'El principal cuidado es la alergia a frutos secos. En personas sin alergia, son un alimento saludable consumido en porciones moderadas.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Conviene remojarlas?',
        a: 'Es una costumbre habitual: el remojo ablanda la almendra y a algunas personas les resulta más fácil de digerir. No es obligatorio y depende del gusto de cada uno.',
      },
    ],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'mente', 'descanso'],
    destacado: true,
    hue: 60,
    imagen: '/productos/almendras.png',
  },
  {
    slug: 'nueces',
    nombre: 'Nueces',
    nombreCientifico: 'Juglans regia',
    categoria: 'Fruto seco',
    tagline: 'Fruto seco con omega-3 vegetal y grasas saludables.',
    resumen:
      'Las nueces son el fruto seco del nogal. Se destacan entre los frutos secos por su aporte de omega-3 de origen vegetal. Son un alimento, no un medicamento.',
    queEs:
      'La nuez es la semilla del nogal, con una cáscara dura y una parte comestible de forma característica. Se consume cruda o tostada y es uno de los frutos secos con mayor contenido de omega-3 vegetal (ALA).',
    composicion: [
      'Ácidos grasos omega-3 de origen vegetal (ALA).',
      'Grasas saludables y proteínas.',
      'Fibra y antioxidantes.',
      'Minerales como magnesio y cobre.',
    ],
    usosTradicionales: [
      'Como snack y en mix de frutos secos.',
      'En ensaladas, panes y repostería.',
      'Picadas sobre yogur, avena o pastas.',
    ],
    comoSeConsume: [
      { forma: 'Naturales', detalle: 'Crudas o tostadas, como colación.' },
      { forma: 'Picadas', detalle: 'Sobre ensaladas, avena o yogur.' },
      { forma: 'En recetas', detalle: 'En panes, budines y salsas.' },
    ],
    precauciones: [
      'Alergia a frutos secos: evitar su consumo, las reacciones pueden ser graves.',
      'Son calóricas: cuidar el tamaño de la porción.',
      'Conservar en lugar fresco y seco para evitar que se pongan rancias.',
      'En niños pequeños, ofrecerlas molidas por el riesgo de atragantamiento.',
    ],
    contraindicaciones:
      'El cuidado principal es la alergia a frutos secos. En personas sin alergia, son un alimento saludable en porciones moderadas.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Cuántas conviene comer por día?',
        a: 'Suelen recomendarse en porciones pequeñas, ya que son nutritivas pero calóricas. La cantidad ideal depende de cada persona y de su alimentación general; consultá con un profesional si tenés dudas.',
      },
    ],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['mente', 'articulaciones', 'defensas'],
    destacado: false,
    hue: 50,
    imagen: '/productos/nueces.png',
  },
  {
    slug: 'curcuma',
    nombre: 'Cúrcuma en polvo',
    nombreCientifico: 'Curcuma longa',
    categoria: 'Raíz',
    tagline: 'La raíz dorada de la cocina y la tradición.',
    resumen:
      'La cúrcuma es la raíz molida de la planta Curcuma longa, de color amarillo intenso. Se usa como especia y, en la tradición, en preparaciones caseras. No es un medicamento ni reemplaza ningún tratamiento.',
    queEs:
      'La cúrcuma es un rizoma de la familia del jengibre, originaria del sur de Asia. Se seca y se muele hasta obtener un polvo amarillo-anaranjado muy usado en la cocina, sobre todo en mezclas como el curry. Su color proviene de pigmentos llamados curcuminoides.',
    composicion: [
      'Curcuminoides (curcumina y derivados), responsables de su color.',
      'Aceites esenciales aromáticos.',
      'Fibra y almidón propios de la raíz.',
      'Pequeñas cantidades de minerales como hierro y manganeso.',
    ],
    usosTradicionales: [
      'Como especia en guisos, arroces, sopas y bebidas como la leche dorada.',
      'En mezclas de especias y adobos.',
      'Combinada con pimienta negra y una fuente de grasa al cocinar.',
    ],
    comoSeConsume: [
      { forma: 'En polvo', detalle: 'Agregada a comidas y bebidas.' },
      { forma: 'En infusión', detalle: 'Sola o con jengibre y limón.' },
      { forma: 'En pasta', detalle: 'En preparaciones como la leche dorada.' },
    ],
    precauciones: [
      'Embarazo y lactancia: usar cantidades culinarias y consultar antes de tomar concentrados.',
      'Personas con cálculos biliares u obstrucción de las vías biliares.',
      'Personas que toman anticoagulantes o antiagregantes.',
      'Antes de una cirugía programada, comentar su consumo con el equipo médico.',
      'Personas con problemas hepáticos deben consultar.',
    ],
    contraindicaciones:
      'En cantidades culinarias suele ser bien tolerada. Como concentrado conviene moderar la dosis y consultar ante medicación o problemas de salud previos.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Por qué se combina con pimienta negra?',
        a: 'Es una práctica culinaria habitual: la pimienta negra suele acompañar a la cúrcuma en muchas recetas. Cualquier expectativa de salud debe consultarse con un profesional.',
      },
    ],
    fuentes: [MED, OMS, ODS],
    casosDeUso: ['digestion', 'articulaciones'],
    destacado: true,
    hue: 70,
    imagen: '/productos/curcuma.png',
  },
  {
    slug: 'maca',
    nombre: 'Maca peruana',
    nombreCientifico: 'Lepidium meyenii',
    categoria: 'Raíz',
    tagline: 'Raíz andina en polvo, usada como complemento energético.',
    resumen:
      'La maca es una raíz andina que se consume seca y molida en polvo. Se usa tradicionalmente como complemento, sobre todo asociado a la energía y la vitalidad. No es un medicamento.',
    queEs:
      'La maca es una planta que crece en las zonas altas de los Andes. Su raíz se seca y se muele para obtener un polvo de sabor característico que se incorpora a batidos y preparaciones. Se comercializa como complemento alimentario.',
    composicion: [
      'Carbohidratos y fibra.',
      'Proteínas vegetales.',
      'Vitaminas y minerales como hierro y potasio.',
      'Compuestos vegetales propios de la planta.',
    ],
    usosTradicionales: [
      'Añadida a batidos, jugos y desayunos.',
      'En curas de temporada, según costumbre, asociada a etapas de cansancio.',
      'Combinada con cacao y otros superalimentos en polvo.',
    ],
    comoSeConsume: [
      { forma: 'En polvo', detalle: 'Mezclada en batidos, yogur o avena.' },
      { forma: 'En cápsulas', detalle: 'Forma práctica de dosificar; seguir el envase.' },
    ],
    precauciones: [
      'Embarazo y lactancia: consultar antes de consumirla.',
      'Personas con afecciones hormonales o tiroideas deben consultar previamente.',
      'Comenzar con cantidades pequeñas para evaluar la tolerancia.',
      'Personas con presión alta o tratamientos crónicos deben consultar.',
      'Elegir productos de origen confiable y controlado.',
    ],
    contraindicaciones:
      'Suele tolerarse bien como complemento en personas sanas. Ante condiciones hormonales, embarazo, lactancia o medicación, conviene consultar antes de incorporarla.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Qué diferencia hay entre los colores de maca?',
        a: 'Existen variedades de raíz de distintos colores (amarilla, roja, negra). Se comercializan como polvos con matices de sabor; las diferencias entre ellas conviene contrastarlas con fuentes confiables.',
      },
    ],
    fuentes: [MED, ODS, FAO],
    casosDeUso: ['energia', 'mente'],
    destacado: false,
    hue: 55,
    imagen: '/productos/maca.png',
  },
  {
    slug: 'espirulina',
    nombre: 'Espirulina',
    nombreCientifico: 'Arthrospira platensis',
    categoria: 'Alga',
    tagline: 'Microalga verdiazul usada como alimento rico en nutrientes.',
    resumen:
      'La espirulina es una microalga de color verde azulado que se consume en polvo o comprimidos como alimento concentrado en nutrientes. No es un medicamento ni reemplaza una alimentación equilibrada.',
    queEs:
      'La espirulina es una microalga que se cultiva para alimentación. Se comercializa deshidratada, en polvo o comprimidos, y se valora por su contenido de proteínas y otros nutrientes. Su color intenso proviene de pigmentos como la clorofila y la ficocianina.',
    composicion: [
      'Proteínas vegetales con aminoácidos esenciales.',
      'Pigmentos como clorofila y ficocianina.',
      'Vitaminas del grupo B y betacaroteno.',
      'Minerales como hierro.',
    ],
    usosTradicionales: [
      'Como complemento en dietas vegetarianas y veganas.',
      'Añadida a batidos y jugos para enriquecerlos.',
      'En contextos de alimentación deportiva.',
    ],
    comoSeConsume: [
      { forma: 'En polvo', detalle: 'Mezclada en batidos o jugos; tiene sabor intenso.' },
      { forma: 'En comprimidos', detalle: 'Forma práctica de dosificar; seguir el envase.' },
    ],
    precauciones: [
      'Personas con fenilcetonuria, por su contenido de fenilalanina.',
      'Personas con enfermedades autoinmunes deben consultar antes de consumirla.',
      'Embarazo y lactancia: consultar previamente.',
      'Elegir productos de origen confiable y controlado para evitar contaminación.',
      'Personas que toman anticoagulantes deben consultar.',
    ],
    contraindicaciones:
      'Suele ser bien tolerada por personas adultas sanas. La calidad y el origen del producto son importantes; conviene elegir marcas con controles adecuados.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Es lo mismo que la chlorella?',
        a: 'No. Son dos microalgas distintas, con composición y características diferentes, aunque ambas se usan como complementos. Conviene leer la etiqueta de cada producto.',
      },
    ],
    fuentes: [MED, EFSA, ODS],
    casosDeUso: ['energia', 'defensas'],
    destacado: true,
    hue: 165,
    imagen: '/productos/espirulina.png',
  },
  {
    slug: 'aceite-de-coco',
    nombre: 'Aceite de coco virgen',
    nombreCientifico: 'Cocos nucifera',
    categoria: 'Aceite',
    tagline: 'Aceite prensado en frío, usado en cocina y cuidado personal.',
    resumen:
      'El aceite de coco virgen se obtiene de la pulpa del coco mediante prensado. Se usa en la cocina y, tradicionalmente, en cuidado personal. Es un alimento, no un medicamento.',
    queEs:
      'El aceite de coco virgen extra se extrae de la pulpa fresca del coco sin refinar, conservando su aroma característico. A temperatura ambiente puede estar sólido o líquido según el clima. Se usa para cocinar y también de forma cosmética.',
    composicion: [
      'Grasas, en su mayoría saturadas de cadena media.',
      'Aroma y compuestos propios del coco.',
      'Sin refinar cuando es virgen extra.',
    ],
    usosTradicionales: [
      'Para cocinar y saltear, y en repostería.',
      'En batidos y bebidas calientes.',
      'De forma tradicional, en cuidado de piel y cabello.',
    ],
    comoSeConsume: [
      { forma: 'En cocina', detalle: 'Para saltear, hornear o sumar a preparaciones.' },
      { forma: 'En bebidas', detalle: 'Una cucharadita en café o batidos.' },
      { forma: 'Uso externo', detalle: 'Como cosmético en piel y cabello, según costumbre.' },
    ],
    precauciones: [
      'Es rico en grasas saturadas: consumir con moderación dentro de una dieta equilibrada.',
      'Personas con colesterol alto o indicaciones cardiovasculares deben consultar.',
      'No reemplaza a otros aceites vegetales recomendados por profesionales.',
      'Para uso cosmético, probar en una zona pequeña si la piel es sensible.',
    ],
    contraindicaciones:
      'Como alimento conviene usarlo con moderación por su contenido de grasas saturadas. Ante indicaciones cardiovasculares o de colesterol, consultar con un profesional.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Es más saludable que otros aceites?',
        a: 'No necesariamente. Es rico en grasas saturadas, por lo que las recomendaciones generales sugieren usarlo con moderación y no como reemplazo de aceites como el de oliva. Ante dudas, consultá con un profesional.',
      },
    ],
    fuentes: [MED, EFSA, OMS],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 120,
    imagen: '/productos/aceite-de-coco.png',
  },
  {
    slug: 'coco-rallado',
    nombre: 'Coco rallado',
    nombreCientifico: 'Cocos nucifera',
    categoria: 'Coco',
    tagline: 'Pulpa de coco deshidratada y rallada, fuente de fibra.',
    resumen:
      'El coco rallado es la pulpa del coco seca y rallada. Se usa en repostería y cocina por su sabor y su aporte de fibra. Es un alimento, no un medicamento.',
    queEs:
      'El coco rallado se obtiene secando y triturando la pulpa blanca del coco. Aporta fibra y grasas propias del coco, y se utiliza tanto en preparaciones dulces como saladas.',
    composicion: [
      'Fibra.',
      'Grasas propias del coco (en buena parte saturadas).',
      'Pequeñas cantidades de minerales como manganeso y hierro.',
    ],
    usosTradicionales: [
      'En repostería: budines, galletas, bocaditos y coberturas.',
      'En granolas, barras y bowls.',
      'En preparaciones saladas de inspiración asiática.',
    ],
    comoSeConsume: [
      { forma: 'En repostería', detalle: 'Mezclado en masas o como cobertura.' },
      { forma: 'En desayunos', detalle: 'Sobre yogur, avena o frutas.' },
    ],
    precauciones: [
      'Alergia al coco: evitar su consumo.',
      'Aporta grasas saturadas: consumir con moderación.',
      'Elegir versiones sin azúcar agregada cuando sea posible.',
    ],
    contraindicaciones:
      'Es un alimento bien tolerado salvo alergia. Por su contenido de grasas, conviene moderar la cantidad dentro de una dieta equilibrada.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 110,
    imagen: '/productos/coco-rallado.png',
  },
  {
    slug: 'harina-de-almendras',
    nombre: 'Harina de almendras',
    nombreCientifico: 'Prunus dulcis',
    categoria: 'Harina',
    tagline: 'Almendras finamente molidas, sin gluten.',
    resumen:
      'La harina de almendras es el resultado de moler almendras finamente. Se usa como alternativa sin gluten en repostería. Es un alimento, no un medicamento.',
    queEs:
      'Se elabora moliendo almendras hasta obtener una harina fina. Es naturalmente libre de gluten y aporta proteínas y grasas saludables, por lo que se usa mucho en repostería para dietas sin gluten o bajas en carbohidratos.',
    composicion: [
      'Proteínas vegetales.',
      'Grasas saludables (monoinsaturadas).',
      'Fibra y vitamina E.',
      'Naturalmente sin gluten.',
    ],
    usosTradicionales: [
      'En tortas, galletas y panificados sin gluten.',
      'Para rebozar en preparaciones saladas.',
      'Como base de bizcochos húmedos.',
    ],
    comoSeConsume: [
      { forma: 'En repostería', detalle: 'Sola o combinada con otras harinas.' },
      { forma: 'Para rebozar', detalle: 'En reemplazo del pan rallado.' },
    ],
    precauciones: [
      'Alergia a frutos secos: evitar su consumo.',
      'Es calórica: cuidar las porciones.',
      'Conservar en lugar fresco para evitar que se ponga rancia.',
    ],
    contraindicaciones:
      'El cuidado principal es la alergia a frutos secos. En personas sin alergia, es un ingrediente apto y versátil.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'mente'],
    destacado: false,
    hue: 62,
    imagen: '/productos/harina-de-almendras.png',
  },
  {
    slug: 'pasas-de-uva',
    nombre: 'Pasas de uva',
    nombreCientifico: 'Vitis vinifera',
    categoria: 'Fruta seca',
    tagline: 'Uvas deshidratadas, dulces y energéticas.',
    resumen:
      'Las pasas de uva son uvas deshidratadas. Aportan azúcares naturales y fibra, y se usan como snack y en cocina. Son un alimento, no un medicamento.',
    queEs:
      'Las pasas se obtienen al deshidratar uvas, lo que concentra su dulzor y nutrientes. Se consumen solas, en mezclas o en preparaciones dulces y saladas.',
    composicion: [
      'Azúcares naturales.',
      'Fibra.',
      'Antioxidantes y minerales como potasio y hierro.',
    ],
    usosTradicionales: [
      'Como snack, solas o en mix de frutos secos.',
      'En panes dulces, budines y granolas.',
      'En preparaciones saladas como arroces y guisos.',
    ],
    comoSeConsume: [
      { forma: 'Como snack', detalle: 'Solas o combinadas con frutos secos.' },
      { forma: 'En recetas', detalle: 'En panificados y platos dulces o salados.' },
    ],
    precauciones: [
      'Son concentradas en azúcares: moderar la cantidad, sobre todo con diabetes.',
      'Pueden adherirse a los dientes; cuidar la higiene bucal.',
      'En niños pequeños, ofrecerlas con cuidado por el riesgo de atragantamiento.',
    ],
    contraindicaciones:
      'Como alimento son bien toleradas. Por su concentración de azúcares, conviene moderar la porción dentro de una dieta equilibrada.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 35,
    imagen: '/productos/pasas-de-uva.png',
  },
  {
    slug: 'te-verde',
    nombre: 'Té verde en hebras',
    nombreCientifico: 'Camellia sinensis',
    categoria: 'Infusión',
    tagline: 'Hojas de té sin fermentar, con cafeína y antioxidantes.',
    resumen:
      'El té verde se obtiene de las hojas de Camellia sinensis con poca oxidación. Se prepara en infusión y contiene cafeína. Es un alimento, no un medicamento.',
    queEs:
      'El té verde son hojas de la planta del té procesadas para conservar su color y compuestos. Contiene cafeína (a veces llamada teína) y antioxidantes naturales como las catequinas. Se bebe en infusión.',
    composicion: [
      'Cafeína.',
      'Antioxidantes (catequinas y polifenoles).',
      'Pequeñas cantidades de minerales.',
    ],
    usosTradicionales: [
      'Como infusión caliente o fría.',
      'En momentos del día en que se busca una bebida con cafeína.',
      'Como base de tés combinados con otras hierbas.',
    ],
    comoSeConsume: [
      { forma: 'En infusión', detalle: 'Con agua caliente, sin que hierva en exceso, unos minutos.' },
      { forma: 'Frío', detalle: 'Como té helado, sin azúcar agregada.' },
    ],
    precauciones: [
      'Contiene cafeína: moderar en personas sensibles, con hipertensión o problemas para dormir.',
      'Embarazo y lactancia: limitar la cafeína y consultar.',
      'Puede dificultar la absorción de hierro si se toma junto a las comidas.',
      'Evitar en exceso; no recomendado para niños pequeños.',
    ],
    contraindicaciones:
      'El principal punto a considerar es la cafeína. En personas sensibles o con ciertas condiciones, conviene moderar el consumo y consultar.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Tiene cafeína?',
        a: 'Sí, contiene cafeína (también llamada teína), en general menos que el café. La cantidad varía según la preparación.',
      },
    ],
    fuentes: [MED, EFSA, OMS],
    casosDeUso: ['energia', 'mente', 'defensas'],
    destacado: false,
    hue: 150,
    imagen: '/productos/te-verde.png',
  },
  {
    slug: 'azucar-mascabo',
    nombre: 'Azúcar mascabo',
    nombreCientifico: 'Saccharum officinarum',
    categoria: 'Endulzante',
    tagline: 'Azúcar de caña sin refinar, con su melaza natural.',
    resumen:
      'El azúcar mascabo es azúcar de caña sin refinar que conserva parte de la melaza. Sigue siendo azúcar, por lo que conviene consumirlo con moderación. Es un alimento, no un medicamento.',
    queEs:
      'El mascabo se obtiene de la caña de azúcar con un procesamiento mínimo, lo que le da color oscuro, sabor acaramelado y pequeñas cantidades de minerales. Pese a ser integral, sigue siendo azúcar.',
    composicion: [
      'Azúcares (sacarosa).',
      'Melaza natural de la caña.',
      'Trazas de minerales como calcio, hierro y potasio.',
    ],
    usosTradicionales: [
      'Para endulzar infusiones y bebidas.',
      'En repostería, aportando color y sabor.',
      'Como reemplazo del azúcar blanco en recetas.',
    ],
    comoSeConsume: [
      { forma: 'En bebidas', detalle: 'Para endulzar a gusto, con moderación.' },
      { forma: 'En repostería', detalle: 'En reemplazo del azúcar refinado.' },
    ],
    precauciones: [
      'Sigue siendo azúcar: consumir con moderación, especialmente con diabetes o sobrepeso.',
      'No es un endulzante libre de calorías ni un alimento "para adelgazar".',
      'Cuidar la cantidad en la alimentación de niños.',
    ],
    contraindicaciones:
      'No tiene contraindicaciones distintas a las del azúcar común: la clave es moderar el consumo dentro de una dieta equilibrada.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Es más sano que el azúcar blanco?',
        a: 'Conserva algo de minerales y sabor, pero sigue siendo azúcar y aporta calorías similares. La recomendación general es moderar el consumo de azúcares en cualquier forma.',
      },
    ],
    fuentes: [MED, OMS, EFSA],
    casosDeUso: ['energia'],
    destacado: false,
    hue: 50,
    imagen: '/productos/azucar-mascabo.png',
  },
  {
    slug: 'mix-frutos-secos',
    nombre: 'Mix de frutos secos',
    categoria: 'Fruto seco',
    tagline: 'Mezcla de frutos secos y fruta seca, energía para el día.',
    resumen:
      'El mix de frutos secos combina distintos frutos secos y, a veces, fruta seca. Es un snack práctico y nutritivo. Es un alimento, no un medicamento.',
    queEs:
      'Es una mezcla que suele incluir almendras, nueces, castañas de cajú y pasas, entre otros. Aporta grasas saludables, proteínas, fibra y energía, ideal como colación.',
    composicion: [
      'Grasas saludables y proteínas vegetales.',
      'Fibra.',
      'Vitaminas y minerales según la mezcla.',
      'Azúcares naturales si incluye fruta seca.',
    ],
    usosTradicionales: [
      'Como snack o colación entre comidas.',
      'Para llevar y rendir en el día a día.',
      'Sobre yogur, avena o ensaladas.',
    ],
    comoSeConsume: [
      { forma: 'Como snack', detalle: 'Una porción pequeña como colación.' },
      { forma: 'En desayunos', detalle: 'Sobre yogur, avena o frutas.' },
    ],
    precauciones: [
      'Alergia a frutos secos: revisar la composición y evitar si corresponde.',
      'Es calórico: cuidar el tamaño de la porción.',
      'Elegir versiones sin sal ni azúcar agregada cuando sea posible.',
      'En niños pequeños, atención al riesgo de atragantamiento.',
    ],
    contraindicaciones:
      'El cuidado principal son las alergias a frutos secos. En personas sin alergia, es una colación saludable en porciones moderadas.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'mente', 'articulaciones'],
    destacado: true,
    hue: 55,
    imagen: '/productos/mix-frutos-secos.png',
  },
  {
    slug: 'cacao',
    nombre: 'Cacao en polvo',
    nombreCientifico: 'Theobroma cacao',
    categoria: 'Superalimento',
    tagline: 'Cacao puro sin azúcar, intenso y versátil.',
    resumen:
      'El cacao en polvo puro se obtiene de la semilla del cacao, sin azúcar agregada. Se usa en bebidas y repostería. Es un alimento, no un medicamento.',
    queEs:
      'El cacao en polvo se elabora a partir de los granos de cacao tostados y prensados, retirando buena parte de la grasa. Es amargo en su forma pura y aporta antioxidantes y minerales como el magnesio. Contiene teobromina y algo de cafeína.',
    composicion: [
      'Antioxidantes (flavonoides).',
      'Minerales como magnesio y hierro.',
      'Fibra.',
      'Teobromina y algo de cafeína.',
    ],
    usosTradicionales: [
      'En bebidas calientes y batidos.',
      'En repostería y postres.',
      'Mezclado con avena, yogur o frutas.',
    ],
    comoSeConsume: [
      { forma: 'En bebidas', detalle: 'Disuelto en leche o bebida vegetal.' },
      { forma: 'En repostería', detalle: 'En tortas, brownies y postres.' },
    ],
    precauciones: [
      'Contiene teobromina y algo de cafeína: moderar en personas sensibles y por la tarde-noche.',
      'No recomendado en grandes cantidades para niños pequeños.',
      'Elegir cacao puro sin azúcar para evitar azúcares agregados.',
      'Personas con migraña o reflujo sensibles deben observar su tolerancia.',
    ],
    contraindicaciones:
      'En cantidades habituales es bien tolerado por adultos sanos. Por su contenido de teobromina y cafeína, conviene moderar en personas sensibles.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Es lo mismo que el chocolate?',
        a: 'No. El cacao en polvo puro no tiene azúcar ni leche; el chocolate suele incluir azúcar y otros ingredientes. Por eso el cacao puro es amargo.',
      },
    ],
    fuentes: [MED, EFSA, ODS],
    casosDeUso: ['energia', 'mente'],
    destacado: true,
    hue: 35,
    imagen: '/productos/cacao.png',
  },
  {
    slug: 'lentejas',
    nombre: 'Lentejas',
    nombreCientifico: 'Lens culinaris',
    categoria: 'Legumbre',
    tagline: 'Legumbre rica en proteínas vegetales y fibra.',
    resumen:
      'Las lentejas son una legumbre muy nutritiva, fuente de proteínas vegetales y fibra. Son un alimento, no un medicamento.',
    queEs:
      'Las lentejas son semillas de una planta leguminosa. Se cocinan como base de guisos, ensaladas y hamburguesas vegetales, y son una de las principales fuentes de proteína vegetal en la alimentación.',
    composicion: [
      'Proteínas vegetales.',
      'Fibra.',
      'Carbohidratos complejos.',
      'Minerales como hierro y zinc.',
    ],
    usosTradicionales: [
      'En guisos y sopas.',
      'En ensaladas frías y tibias.',
      'En hamburguesas y preparaciones vegetales.',
    ],
    comoSeConsume: [
      { forma: 'Cocidas', detalle: 'En guisos y sopas; algunas variedades no necesitan remojo.' },
      { forma: 'En ensaladas', detalle: 'Frías, combinadas con vegetales.' },
    ],
    precauciones: [
      'Cocinarlas bien antes de consumir.',
      'Aumentar las legumbres de forma gradual para mejorar la tolerancia digestiva.',
      'Combinarlas con vitamina C ayuda a aprovechar mejor el hierro vegetal.',
      'Personas con indicaciones específicas sobre purinas deben consultar.',
    ],
    contraindicaciones:
      'Son un alimento saludable y bien tolerado. Pueden generar gases al principio; incorporarlas de a poco suele ayudar.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 60,
    imagen: '/productos/lentejas.png',
  },
  {
    slug: 'miel',
    nombre: 'Miel pura',
    categoria: 'Producto apícola',
    tagline: 'Endulzante natural producido por las abejas.',
    resumen:
      'La miel es un producto natural elaborado por las abejas a partir del néctar. Se usa como endulzante y en preparaciones caseras. Es un alimento, no un medicamento.',
    queEs:
      'La miel es una sustancia dulce que producen las abejas a partir del néctar de las flores. Su color y sabor varían según el origen floral. Es principalmente azúcares, con pequeñas cantidades de otros compuestos.',
    composicion: [
      'Azúcares naturales (fructosa y glucosa).',
      'Pequeñas cantidades de enzimas y antioxidantes.',
      'Trazas de minerales.',
    ],
    usosTradicionales: [
      'Como endulzante de infusiones y comidas.',
      'En preparaciones caseras, sola o con limón y jengibre.',
      'En repostería y aderezos.',
    ],
    comoSeConsume: [
      { forma: 'Como endulzante', detalle: 'En infusiones, yogur o tostadas.' },
      { forma: 'En recetas', detalle: 'En repostería y aderezos.' },
    ],
    precauciones: [
      'No darla a menores de 1 año por el riesgo de botulismo infantil.',
      'Sigue siendo azúcar: moderar, especialmente con diabetes.',
      'Personas alérgicas al polen o productos de la colmena deben tener precaución.',
      'No es un alimento "para adelgazar".',
    ],
    contraindicaciones:
      'La precaución más importante es no ofrecerla a bebés menores de 1 año. En el resto de las personas, conviene moderar por su contenido de azúcares.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Pueden tomarla los bebés?',
        a: 'No. No se recomienda dar miel a menores de 1 año por el riesgo de botulismo infantil. A partir de esa edad, consultá con el pediatra.',
      },
    ],
    fuentes: [MED, OMS, EFSA],
    casosDeUso: ['energia', 'defensas'],
    destacado: false,
    hue: 65,
    imagen: '/productos/miel.png',
  },
  {
    slug: 'girasol',
    nombre: 'Semillas de girasol',
    nombreCientifico: 'Helianthus annuus',
    categoria: 'Semilla',
    tagline: 'Semillas fuente de vitamina E y grasas saludables.',
    resumen:
      'Las semillas de girasol son las pepitas del girasol, peladas. Aportan grasas saludables y vitamina E. Son un alimento, no un medicamento.',
    queEs:
      'Las semillas de girasol son las pepitas que se extraen del centro de la flor del girasol. Se consumen peladas, crudas o tostadas, y son una colación habitual además de un ingrediente en panes y ensaladas.',
    composicion: [
      'Grasas saludables.',
      'Vitamina E (antioxidante).',
      'Proteínas vegetales y fibra.',
      'Minerales como magnesio y selenio.',
    ],
    usosTradicionales: [
      'Como snack, solas o en mezclas.',
      'En panes, granolas y barras.',
      'Sobre ensaladas y yogur.',
    ],
    comoSeConsume: [
      { forma: 'Como snack', detalle: 'Crudas o tostadas, sin sal en exceso.' },
      { forma: 'En recetas', detalle: 'En panificados, ensaladas y granolas.' },
    ],
    precauciones: [
      'Alergia a semillas: evitar su consumo.',
      'Son calóricas: cuidar la porción.',
      'Elegir versiones sin sal agregada cuando sea posible.',
    ],
    contraindicaciones:
      'Son un alimento saludable y bien tolerado salvo alergia. Conviene moderar la cantidad por su densidad calórica.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'mente'],
    destacado: false,
    hue: 60,
    imagen: '/productos/girasol.png',
  },
  {
    slug: 'sesamo',
    nombre: 'Semillas de sésamo',
    nombreCientifico: 'Sesamum indicum',
    categoria: 'Semilla',
    tagline: 'Pequeñas semillas, fuente de calcio y fibra.',
    resumen:
      'El sésamo son semillas pequeñas usadas en cocina y como base de pastas como el tahini. Aportan calcio, fibra y grasas saludables. Es un alimento, no un medicamento.',
    queEs:
      'Las semillas de sésamo (o ajonjolí) se usan enteras, tostadas o molidas. Son la base del tahini y del gomasio, y aportan calcio, fibra y grasas saludables.',
    composicion: [
      'Calcio y otros minerales.',
      'Fibra.',
      'Grasas saludables.',
      'Proteínas vegetales.',
    ],
    usosTradicionales: [
      'Espolvoreado sobre panes, ensaladas y comidas.',
      'En tahini y salsas.',
      'En gomasio y preparaciones de inspiración asiática.',
    ],
    comoSeConsume: [
      { forma: 'Tostado', detalle: 'Sobre comidas para dar sabor.' },
      { forma: 'En pasta', detalle: 'Como tahini en salsas y untables.' },
    ],
    precauciones: [
      'Alergia al sésamo: evitar su consumo, puede provocar reacciones importantes.',
      'Conviene consumirlo molido o bien masticado para aprovecharlo mejor.',
      'Es calórico: moderar la cantidad.',
    ],
    contraindicaciones:
      'El cuidado principal es la alergia al sésamo. En personas sin alergia, es un alimento nutritivo en porciones moderadas.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['articulaciones', 'digestion'],
    destacado: false,
    hue: 70,
    imagen: '/productos/sesamo.png',
  },
  {
    slug: 'amaranto',
    nombre: 'Amaranto',
    nombreCientifico: 'Amaranthus',
    categoria: 'Pseudocereal',
    tagline: 'Grano ancestral, proteico y sin gluten.',
    resumen:
      'El amaranto es un pseudocereal de grano muy pequeño, fuente de proteínas y fibra, naturalmente sin gluten. Es un alimento, no un medicamento.',
    queEs:
      'El amaranto es la semilla de una planta de origen americano, usada desde tiempos ancestrales. Se cocina como un grano, se infla como cereal y se muele en harina. Es libre de gluten y aporta proteínas de buena calidad.',
    composicion: [
      'Proteínas vegetales.',
      'Fibra y carbohidratos complejos.',
      'Minerales como hierro, magnesio y calcio.',
      'Naturalmente sin gluten.',
    ],
    usosTradicionales: [
      'Cocido como guarnición o en preparaciones dulces.',
      'Inflado, en barras y desayunos.',
      'En harina para panificados sin gluten.',
    ],
    comoSeConsume: [
      { forma: 'Cocido', detalle: 'En agua o caldo, como un grano.' },
      { forma: 'Inflado', detalle: 'En barras, granolas y desayunos.' },
    ],
    precauciones: [
      'Incorporar de forma gradual si no se está habituado a su fibra.',
      'Cocinarlo bien antes de consumir.',
      'Elegir productos de origen confiable.',
    ],
    contraindicaciones:
      'Es un alimento saludable y apto para personas celíacas. No presenta cuidados especiales en personas sanas más allá de una buena cocción.',
    faq: [...FAQ_BASE],
    fuentes: [MED, FAO, EFSA],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 28,
    imagen: '/productos/amaranto.png',
  },
  {
    slug: 'garbanzos',
    nombre: 'Garbanzos',
    nombreCientifico: 'Cicer arietinum',
    categoria: 'Legumbre',
    tagline: 'Legumbre versátil, base del hummus, rica en proteínas.',
    resumen:
      'Los garbanzos son una legumbre muy versátil, fuente de proteínas vegetales y fibra. Son la base del hummus. Son un alimento, no un medicamento.',
    queEs:
      'Los garbanzos son las semillas de una planta leguminosa. Se usan en guisos, ensaladas, hummus y harina (besan). Aportan proteínas, fibra y carbohidratos complejos.',
    composicion: [
      'Proteínas vegetales.',
      'Fibra.',
      'Carbohidratos complejos.',
      'Minerales como hierro y folato.',
    ],
    usosTradicionales: [
      'En guisos, ensaladas y currys.',
      'En hummus y untables.',
      'En harina para panificados y rebozados.',
    ],
    comoSeConsume: [
      { forma: 'Cocidos', detalle: 'Tras remojo previo, en guisos y ensaladas.' },
      { forma: 'En hummus', detalle: 'Procesados con tahini, limón y aceite.' },
    ],
    precauciones: [
      'Remojarlos y cocinarlos bien antes de consumir.',
      'Incorporar las legumbres de a poco para mejorar la tolerancia digestiva.',
      'Personas con indicaciones sobre purinas deben consultar.',
    ],
    contraindicaciones:
      'Son un alimento saludable y bien tolerado. Pueden producir gases al inicio; incorporarlos gradualmente ayuda.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 75,
    imagen: '/productos/garbanzos.png',
  },
  {
    slug: 'datiles',
    nombre: 'Dátiles',
    nombreCientifico: 'Phoenix dactylifera',
    categoria: 'Fruta seca',
    tagline: 'Fruta dulce y energética, sin azúcar agregada.',
    resumen:
      'Los dátiles son el fruto de la palmera datilera, naturalmente dulces. Se usan como snack y endulzante natural. Son un alimento, no un medicamento.',
    queEs:
      'Los dátiles son frutos dulces y energéticos. Se consumen tal cual o se usan como endulzante natural en repostería saludable, ya que su pulpa aporta dulzor y fibra.',
    composicion: [
      'Azúcares naturales.',
      'Fibra.',
      'Minerales como potasio y magnesio.',
      'Antioxidantes.',
    ],
    usosTradicionales: [
      'Como snack energético, solos o rellenos.',
      'Como endulzante natural en postres y barras.',
      'En batidos y pasta de dátil.',
    ],
    comoSeConsume: [
      { forma: 'Como snack', detalle: 'Solos; quitar el carozo antes.' },
      { forma: 'Como endulzante', detalle: 'En pasta o procesados en recetas.' },
    ],
    precauciones: [
      'Concentrados en azúcares: moderar, sobre todo con diabetes.',
      'Quitar el carozo antes de consumir, sobre todo con niños.',
      'Cuidar la higiene bucal por su textura pegajosa.',
    ],
    contraindicaciones:
      'Son un alimento natural y nutritivo. Por su concentración de azúcares, conviene moderar la porción.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 40,
    imagen: '/productos/datiles.png',
  },
  {
    slug: 'ciruelas-pasas',
    nombre: 'Ciruelas pasas',
    nombreCientifico: 'Prunus domestica',
    categoria: 'Fruta seca',
    tagline: 'Ciruelas deshidratadas, conocidas por su fibra.',
    resumen:
      'Las ciruelas pasas son ciruelas deshidratadas, valoradas por su aporte de fibra. Son un alimento, no un medicamento.',
    queEs:
      'Las ciruelas pasas se obtienen al deshidratar ciruelas. Son dulces, ricas en fibra y se asocian tradicionalmente con el bienestar digestivo. Se comen solas o en preparaciones.',
    composicion: [
      'Fibra.',
      'Azúcares naturales y sorbitol.',
      'Antioxidantes.',
      'Minerales como potasio.',
    ],
    usosTradicionales: [
      'Como snack o parte del desayuno.',
      'En compotas, guisos y repostería.',
      'Remojadas, en preparaciones caseras.',
    ],
    comoSeConsume: [
      { forma: 'Como snack', detalle: 'Solas o remojadas.' },
      { forma: 'En recetas', detalle: 'En compotas, panes y platos salados.' },
    ],
    precauciones: [
      'En exceso pueden tener efecto laxante por su fibra y sorbitol.',
      'Concentradas en azúcares: moderar con diabetes.',
      'Quitar el carozo si lo tienen, sobre todo con niños.',
    ],
    contraindicaciones:
      'Son un alimento bien tolerado. Conviene no excederse por su efecto sobre el tránsito intestinal y su contenido de azúcares.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['digestion', 'energia'],
    destacado: false,
    hue: 30,
    imagen: '/productos/ciruelas-pasas.png',
  },
  {
    slug: 'harina-de-coco',
    nombre: 'Harina de coco',
    nombreCientifico: 'Cocos nucifera',
    categoria: 'Harina',
    tagline: 'Pulpa de coco molida, sin gluten y rica en fibra.',
    resumen:
      'La harina de coco se obtiene moliendo la pulpa de coco seca y desgrasada. Es sin gluten y rica en fibra, usada en repostería. Es un alimento, no un medicamento.',
    queEs:
      'La harina de coco es un subproducto de la pulpa de coco, secada y molida tras extraer buena parte de su grasa. Es libre de gluten, absorbe mucho líquido y se usa en repostería, en general combinada con otras harinas.',
    composicion: [
      'Fibra (en alta proporción).',
      'Proteínas vegetales.',
      'Grasas propias del coco.',
      'Naturalmente sin gluten.',
    ],
    usosTradicionales: [
      'En tortas, galletas y panificados sin gluten.',
      'Como espesante en algunas preparaciones.',
      'Combinada con otras harinas por su alta absorción.',
    ],
    comoSeConsume: [
      { forma: 'En repostería', detalle: 'Combinada con otras harinas; absorbe mucho líquido.' },
      { forma: 'Para espesar', detalle: 'En pequeñas cantidades.' },
    ],
    precauciones: [
      'Alergia al coco: evitar su consumo.',
      'Absorbe mucho líquido: ajustar las recetas.',
      'Incorporar la fibra de forma gradual y con suficiente líquido.',
    ],
    contraindicaciones:
      'Es un ingrediente apto salvo alergia. Por su alto contenido de fibra, conviene incorporarla con buena hidratación.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['digestion', 'energia'],
    destacado: false,
    hue: 108,
    imagen: '/productos/harina-de-coco.png',
  },
  {
    slug: 'jengibre',
    nombre: 'Jengibre en polvo',
    nombreCientifico: 'Zingiber officinale',
    categoria: 'Raíz',
    tagline: 'Raíz aromática y picante, en polvo para infusiones y cocina.',
    resumen:
      'El jengibre en polvo se obtiene de la raíz de Zingiber officinale seca y molida. Se usa en infusiones y cocina. No es un medicamento.',
    queEs:
      'El jengibre es un rizoma de sabor picante y aroma fresco, muy usado en infusiones y en la cocina. En polvo es práctico para condimentar y preparar bebidas calientes.',
    composicion: [
      'Compuestos aromáticos (gingeroles).',
      'Aceites esenciales.',
      'Fibra y carbohidratos.',
      'Pequeñas cantidades de minerales.',
    ],
    usosTradicionales: [
      'En infusiones, solo o con limón y miel.',
      'Como especia en platos dulces y salados.',
      'En la leche dorada junto a la cúrcuma.',
    ],
    comoSeConsume: [
      { forma: 'En infusión', detalle: 'Una cucharadita en agua caliente.' },
      { forma: 'Como especia', detalle: 'En guisos, repostería y bebidas.' },
    ],
    precauciones: [
      'Embarazo: consultar antes de tomarlo como complemento.',
      'Personas que toman anticoagulantes deben consultar.',
      'Personas con cálculos biliares deben consultar.',
      'En exceso puede resultar irritante para personas sensibles.',
    ],
    contraindicaciones:
      'En cantidades culinarias es bien tolerado. En dosis altas o como complemento, conviene moderar y consultar ante medicación o problemas digestivos.',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Sirve para las náuseas?',
        a: 'Tradicionalmente se ha asociado al alivio de molestias leves, pero no debe considerarse un tratamiento. Ante náuseas persistentes o durante el embarazo, consultá con un profesional.',
      },
    ],
    fuentes: [MED, OMS, EFSA],
    casosDeUso: ['digestion', 'defensas'],
    destacado: false,
    hue: 55,
    imagen: '/productos/jengibre.png',
  },
  {
    slug: 'granola',
    nombre: 'Granola artesanal',
    categoria: 'Cereal',
    tagline: 'Avena horneada con frutos secos y semillas.',
    resumen:
      'La granola es una mezcla de avena y otros ingredientes horneados hasta quedar crocante. Es una opción de desayuno. Es un alimento, no un medicamento.',
    queEs:
      'La granola combina avena con frutos secos, semillas y, a veces, fruta seca, horneada con un toque de endulzante hasta quedar crujiente. Es una base habitual de desayunos y colaciones.',
    composicion: [
      'Carbohidratos complejos y fibra (de la avena).',
      'Grasas saludables y proteínas (de frutos secos y semillas).',
      'Azúcares según la receta.',
      'Vitaminas y minerales según los ingredientes.',
    ],
    usosTradicionales: [
      'En el desayuno, con leche, bebida vegetal o yogur.',
      'Como topping de frutas y postres.',
      'Como colación.',
    ],
    comoSeConsume: [
      { forma: 'Con líquido', detalle: 'Con leche, bebida vegetal o yogur.' },
      { forma: 'Como topping', detalle: 'Sobre frutas o postres.' },
    ],
    precauciones: [
      'Puede contener frutos secos: revisar en caso de alergias.',
      'Algunas versiones tienen azúcar agregada: leer la etiqueta.',
      'Para celíacos, elegir granola con avena certificada sin gluten.',
      'Es energética: cuidar la porción.',
    ],
    contraindicaciones:
      'Es un alimento práctico y nutritivo. Conviene revisar ingredientes por alergias y azúcares, y moderar la porción.',
    faq: [...FAQ_BASE],
    fuentes: [MED, EFSA, FAO],
    casosDeUso: ['energia', 'digestion'],
    destacado: false,
    hue: 65,
    imagen: '/productos/granola.png',
  },
  {
    slug: 'levadura-nutricional',
    nombre: 'Levadura nutricional',
    categoria: 'Superalimento',
    tagline: 'Copos con sabor a queso, fuente de vitaminas del grupo B.',
    resumen:
      'La levadura nutricional son copos inactivos con sabor tipo queso, usados como condimento. Suele estar enriquecida con vitaminas del grupo B. Es un alimento, no un medicamento.',
    queEs:
      'La levadura nutricional es una levadura desactivada que se presenta en copos o polvo amarillo. Tiene un sabor que recuerda al queso y se usa mucho en cocina vegana para dar sabor. Suele venir enriquecida con vitaminas del grupo B.',
    composicion: [
      'Proteínas vegetales.',
      'Vitaminas del grupo B (a menudo añadidas).',
      'Fibra.',
      'Sin gluten en muchas presentaciones (verificar etiqueta).',
    ],
    usosTradicionales: [
      'Para dar sabor tipo queso a pastas, ensaladas y purés.',
      'En salsas veganas y preparaciones sin lácteos.',
      'Espolvoreada sobre comidas.',
    ],
    comoSeConsume: [
      { forma: 'Espolvoreada', detalle: 'Sobre pastas, ensaladas o pochoclos.' },
      { forma: 'En salsas', detalle: 'Como base de salsas tipo queso.' },
    ],
    precauciones: [
      'No confundir con levadura de panadería: no sirve para leudar.',
      'Personas sensibles a las levaduras deben tener precaución.',
      'Revisar la etiqueta si se buscan productos sin gluten.',
      'En cantidades muy altas puede resultar pesada para algunas personas.',
    ],
    contraindicaciones:
      'Es un condimento bien tolerado por la mayoría. Conviene leer la etiqueta según necesidades particulares (gluten, vitaminas añadidas).',
    faq: [
      ...FAQ_BASE,
      {
        q: '¿Sirve para hacer pan?',
        a: 'No. La levadura nutricional está inactiva y se usa solo para dar sabor; no sirve para leudar masas. Para eso se usa levadura de panadería.',
      },
    ],
    fuentes: [MED, EFSA, ODS],
    casosDeUso: ['energia', 'mente'],
    destacado: false,
    hue: 85,
    imagen: '/productos/levadura-nutricional.png',
  },
  ...buildProducts(extraSeeds),
  ...buildProducts(extraSeeds2),
  ...buildProducts(extraSeeds3),
];

export const allProductSlugs = (): string[] => products.map((p) => p.slug);

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const featuredProducts = (): Product[] => products.filter((p) => p.destacado);

export const productsByUseCase = (slug: UseCaseSlug): Product[] =>
  products.filter((p) => p.casosDeUso.includes(slug));

export const relatedProducts = (product: Product, limit = 3): Product[] =>
  products
    .filter((p) => p.slug !== product.slug)
    .filter((p) => p.casosDeUso.some((c) => product.casosDeUso.includes(c)))
    .slice(0, limit);
