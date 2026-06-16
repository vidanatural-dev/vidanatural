import type { UseCase, UseCaseSlug } from './types';

export const useCases: UseCase[] = [
  {
    slug: 'digestion',
    nombre: 'Digestión',
    descripcion: 'Plantas y nutrientes asociados tradicionalmente al confort digestivo y al bienestar después de las comidas.',
    icon: 'Leaf',
    hue: 150,
    imagen: '/usos/digestion.webp',
    intro:
      'El bienestar digestivo se apoya sobre todo en hábitos: comer despacio, masticar bien, hidratarse y sumar fibra y alimentos fermentados a la dieta diaria. Muchas plantas e infusiones se usan tradicionalmente para acompañar la sensación de liviandad después de las comidas.',
    alimentos: [
      'Fibra soluble e insoluble: avena, chía, lino, salvado, ciruela y frutas con cáscara.',
      'Plantas carminativas de uso tradicional: jengibre, menta, manzanilla, anís e hinojo.',
      'Alimentos fermentados y probióticos: yogur, kéfir, chucrut y kombucha.',
      'Líquidos: agua e infusiones a lo largo del día para acompañar el tránsito.',
    ],
    consejos: [
      'Comé despacio y masticá bien; las comidas muy rápidas favorecen la pesadez.',
      'Sumá fibra de a poco y acompañala con más agua para que cumpla su función.',
      'Un poco de movimiento después de comer (una caminata corta) ayuda al confort digestivo.',
    ],
    faq: [
      {
        q: '¿La fibra siempre cae bien?',
        a: 'Conviene aumentarla de forma gradual y tomar suficiente líquido. Si tenés una condición digestiva diagnosticada, consultá con un profesional antes de hacer cambios grandes.',
      },
      {
        q: '¿Sirven las infusiones digestivas?',
        a: 'Forman parte de hábitos tradicionales para el bienestar después de comer. No reemplazan el tratamiento de ninguna afección; ante molestias persistentes, consultá a tu médico.',
      },
    ],
  },
  {
    slug: 'energia',
    nombre: 'Energía y vitalidad',
    descripcion: 'Alimentos y complementos que se usan popularmente para acompañar etapas de cansancio o mayor desgaste.',
    icon: 'Lightning',
    hue: 75,
    imagen: '/usos/energia.webp',
    intro:
      'La energía sostenida durante el día depende más de la constancia que de un único alimento: comidas equilibradas, buen descanso e hidratación. Algunos alimentos densos en nutrientes se usan para acompañar etapas de mayor desgaste o actividad física.',
    alimentos: [
      'Carbohidratos complejos: avena, quinoa, arroz integral y legumbres.',
      'Frutos secos y semillas: aportan grasas buenas, proteína y minerales.',
      'Frutas frescas y desecadas: dátiles, banana y pasas para energía rápida.',
      'Superalimentos tradicionales: maca, cacao y espirulina.',
    ],
    consejos: [
      'No te saltees el desayuno los días de mayor actividad.',
      'Combiná carbohidrato, proteína y grasa buena para una energía más estable.',
      'El cansancio sostenido puede tener muchas causas: si persiste, consultá a un profesional.',
    ],
    faq: [
      {
        q: '¿Estos alimentos reemplazan el descanso?',
        a: 'No. El sueño y la hidratación son la base; los alimentos solo acompañan.',
      },
      {
        q: '¿La maca o el cacao "dan energía"?',
        a: 'Aportan nutrientes y se usan tradicionalmente en etapas de desgaste, dentro de una dieta variada. No son estimulantes ni medicamentos.',
      },
    ],
  },
  {
    slug: 'defensas',
    nombre: 'Defensas e inmunidad',
    descripcion: 'Productos ricos en nutrientes que forman parte de hábitos para cuidar el organismo, sobre todo en cambios de estación.',
    icon: 'ShieldCheck',
    hue: 28,
    imagen: '/usos/defensas.webp',
    intro:
      'El sistema inmune se cuida con un conjunto de hábitos: alimentación variada, descanso, actividad física y manejo del estrés. Varios alimentos aportan vitaminas y antioxidantes que suelen sumarse a la dieta, especialmente en los cambios de estación.',
    alimentos: [
      'Vitamina C: cítricos, kiwi, frutillas, pimiento y perejil.',
      'Zinc y selenio: semillas, frutos secos (en especial la nuez de Brasil) y legumbres.',
      'Antioxidantes: frutos rojos, cúrcuma, té verde y cacao.',
      'Probióticos: yogur, kéfir y alimentos fermentados.',
    ],
    consejos: [
      'Variedad y color en el plato: distintos vegetales aportan distintos nutrientes.',
      'El descanso y la hidratación influyen tanto como la comida.',
      'Ningún alimento previene enfermedades por sí solo; ante síntomas, consultá a tu médico.',
    ],
    faq: [
      {
        q: '¿La vitamina C evita el resfrío?',
        a: 'La evidencia no muestra que lo prevenga. Forma parte de una dieta equilibrada, nada más.',
      },
      {
        q: '¿Conviene suplementar?',
        a: 'Depende de cada persona. Consultá con un profesional antes de tomar suplementos.',
      },
    ],
  },
  {
    slug: 'descanso',
    nombre: 'Descanso y relax',
    descripcion: 'Plantas y minerales que la tradición vincula con la calma, la relajación y un mejor descanso nocturno.',
    icon: 'Moon',
    hue: 280,
    imagen: '/usos/descanso.webp',
    intro:
      'Un buen descanso se construye con rutina: horarios regulares, menos pantallas antes de dormir y un ambiente tranquilo. Algunas infusiones y alimentos se asocian tradicionalmente con la calma y el momento previo al sueño.',
    alimentos: [
      'Infusiones tradicionales: manzanilla, tilo, melisa, lavanda y valeriana.',
      'Fuentes de magnesio: semillas, frutos secos, cacao y legumbres.',
      'Alimentos con triptófano: avena, banana y frutos secos.',
    ],
    consejos: [
      'Mantené horarios de sueño regulares, incluso los fines de semana.',
      'Evitá la cafeína y las pantallas en las horas previas a dormir.',
      'Si el insomnio es frecuente, consultá con un profesional de la salud.',
    ],
    faq: [
      {
        q: '¿Las infusiones "relax" hacen dormir?',
        a: 'Acompañan el ritual de la noche dentro de hábitos de descanso. No son somníferos ni tratan el insomnio.',
      },
      {
        q: '¿El magnesio mejora el sueño?',
        a: 'Es un mineral presente en una dieta equilibrada. No lo tomes como tratamiento sin indicación profesional.',
      },
    ],
  },
  {
    slug: 'articulaciones',
    nombre: 'Articulaciones y movilidad',
    descripcion: 'Nutrientes que acompañan el cuidado de articulaciones y músculos en personas activas.',
    icon: 'PersonSimpleWalk',
    hue: 200,
    imagen: '/usos/articulaciones.webp',
    intro:
      'Las articulaciones y los músculos se cuidan con movimiento regular, un peso saludable y una dieta variada, con grasas buenas y muchos vegetales. Algunos nutrientes se asocian al cuidado de las personas activas.',
    alimentos: [
      'Omega-3: chía, lino, nueces y pescados azules.',
      'Antioxidantes: cúrcuma, jengibre, frutos rojos y vegetales de hoja.',
      'Proteína de calidad: legumbres, frutos secos y huevo, para el músculo.',
      'Vitamina C: cítricos y vegetales, asociada a la formación de colágeno.',
    ],
    consejos: [
      'El movimiento regular y de bajo impacto es clave para la movilidad.',
      'Mantener un peso saludable reduce la carga sobre las articulaciones.',
      'El dolor articular persistente debe ser evaluado por un profesional.',
    ],
    faq: [
      {
        q: '¿La cúrcuma "desinflama"?',
        a: 'Se usa tradicionalmente y aporta antioxidantes, dentro de una dieta variada. No reemplaza un antiinflamatorio indicado por un médico.',
      },
      {
        q: '¿Necesito suplementos para entrenar?',
        a: 'Con una dieta variada suele alcanzar. Consultá si tenés demandas específicas o un objetivo deportivo.',
      },
    ],
  },
  {
    slug: 'mente',
    nombre: 'Mente y concentración',
    descripcion: 'Alimentos asociados al cuidado de la función cognitiva y al equilibrio en épocas de exigencia mental.',
    icon: 'Brain',
    hue: 330,
    imagen: '/usos/mente.webp',
    intro:
      'La concentración y la memoria dependen del descanso, la actividad física, el manejo del estrés y una alimentación que cuide el cerebro. Algunos alimentos se asocian al equilibrio en épocas de mayor exigencia mental.',
    alimentos: [
      'Omega-3: nueces, chía, lino y pescados azules.',
      'Antioxidantes: frutos rojos, cacao y té verde.',
      'Energía estable para el cerebro: avena, frutos secos y legumbres.',
      'Hidratación: el cerebro rinde mejor bien hidratado.',
    ],
    consejos: [
      'Dormir bien es lo que más impacta en la concentración.',
      'Hacer pausas y moverte entre bloques de estudio o trabajo ayuda al foco.',
      'Evitá los picos de azúcar; preferí energía de liberación lenta.',
    ],
    faq: [
      {
        q: '¿El cacao mejora la memoria?',
        a: 'Aporta antioxidantes y se asocia al ánimo, dentro de una dieta variada. No es un tratamiento cognitivo.',
      },
      {
        q: '¿Conviene estudiar en ayunas?',
        a: 'Mejor con energía estable. Un desayuno equilibrado ayuda al rendimiento.',
      },
    ],
  },
  {
    slug: 'piel-cabello',
    nombre: 'Piel y cabello',
    descripcion: 'Alimentos que la tradición asocia al cuidado de la piel y el cabello, dentro de una alimentación variada. No son tratamientos.',
    icon: 'Sparkle',
    hue: 25,
    imagen: '/usos/piel-cabello.webp',
    intro:
      'La piel y el cabello reflejan la alimentación general, la hidratación y el descanso. Una dieta variada, rica en antioxidantes y grasas buenas, acompaña su cuidado desde adentro. No son tratamientos dermatológicos.',
    alimentos: [
      'Grasas buenas: palta, frutos secos, semillas y aceite de oliva.',
      'Antioxidantes (vitaminas A, C y E): frutos rojos, cítricos, zanahoria y vegetales de hoja.',
      'Zinc y biotina: semillas, frutos secos, legumbres y huevo.',
      'Hidratación: agua a lo largo del día.',
    ],
    consejos: [
      'La hidratación y el sueño impactan en la piel tanto como la dieta.',
      'Protegé la piel del sol; ningún alimento reemplaza el protector solar.',
      'Las afecciones de piel o la caída del cabello deben evaluarse con un dermatólogo.',
    ],
    faq: [
      {
        q: '¿El colágeno en polvo rejuvenece?',
        a: 'Es un complemento proteico y los resultados son variables. No reemplaza el cuidado dermatológico.',
      },
      {
        q: '¿La dieta evita las canas o la caída?',
        a: 'Influyen muchos factores (genética, hormonas). La dieta solo acompaña.',
      },
    ],
  },
  {
    slug: 'circulacion',
    nombre: 'Corazón y circulación',
    descripcion: 'Alimentos que suelen incluirse en hábitos de cuidado cardiovascular, como parte de una dieta equilibrada. No reemplazan indicaciones médicas.',
    icon: 'Heart',
    hue: 0,
    imagen: '/usos/circulacion.webp',
    intro:
      'El cuidado cardiovascular se apoya en hábitos: actividad física, no fumar, manejar el estrés y una dieta equilibrada, baja en sal y en ultraprocesados. Varios alimentos se incluyen tradicionalmente en ese tipo de dieta. No reemplazan indicaciones médicas.',
    alimentos: [
      'Grasas buenas: aceite de oliva, palta, frutos secos y pescados azules.',
      'Fibra: avena, legumbres, frutas y vegetales.',
      'Antioxidantes: frutos rojos, uva, cacao y té verde.',
      'Menos sodio: hierbas y especias en lugar del exceso de sal.',
    ],
    consejos: [
      'Reducí los ultraprocesados y el exceso de sal en el día a día.',
      'La actividad física regular es uno de los mayores aliados del corazón.',
      'Controlá la presión y el colesterol con tu médico; la dieta es un complemento.',
    ],
    faq: [
      {
        q: '¿La avena "baja el colesterol"?',
        a: 'Su fibra forma parte de dietas cardiosaludables. No es un medicamento; seguí siempre las indicaciones de tu médico.',
      },
      {
        q: '¿Puedo dejar mi medicación si como sano?',
        a: 'No. Nunca suspendas un tratamiento sin indicación de tu médico.',
      },
    ],
  },
  {
    slug: 'control-peso',
    nombre: 'Control de peso',
    descripcion: 'Alimentos que suelen formar parte de planes de alimentación equilibrada. No son productos para adelgazar; consultá con un profesional.',
    icon: 'Scales',
    hue: 200,
    imagen: '/usos/control-peso.webp',
    intro:
      'Un peso saludable se sostiene con hábitos a largo plazo: alimentación equilibrada, porciones conscientes, actividad física y descanso. Algunos alimentos saciantes y ricos en fibra suelen formar parte de esos planes. No son productos para adelgazar.',
    alimentos: [
      'Fibra y saciedad: avena, legumbres, vegetales, chía y psyllium.',
      'Proteína magra: legumbres, huevo y frutos secos (con moderación).',
      'Vegetales de bajo aporte calórico y mucho volumen.',
      'Agua antes y durante las comidas para acompañar la saciedad.',
    ],
    consejos: [
      'Las dietas extremas suelen fallar a largo plazo; preferí cambios sostenibles.',
      'Priorizá comida real por sobre los productos "milagro".',
      'Para un plan personalizado, consultá con un nutricionista.',
    ],
    faq: [
      {
        q: '¿Hay alimentos que "queman grasa"?',
        a: 'No. Ningún alimento adelgaza por sí solo; lo que importa es el conjunto de la dieta y la actividad física.',
      },
      {
        q: '¿La fibra ayuda a comer menos?',
        a: 'Aporta saciedad dentro de una alimentación equilibrada. No es un producto para adelgazar.',
      },
    ],
  },
  {
    slug: 'huesos',
    nombre: 'Huesos y dientes',
    descripcion: 'Alimentos con nutrientes que acompañan el cuidado de huesos y dientes dentro de una dieta variada.',
    icon: 'Barbell',
    hue: 220,
    imagen: '/usos/huesos.webp',
    intro:
      'Los huesos y los dientes se cuidan con calcio, vitamina D (sol y dieta), proteína y actividad física con carga. Varios alimentos aportan esos nutrientes dentro de una dieta variada.',
    alimentos: [
      'Calcio: sésamo y tahini, almendras, vegetales de hoja verde y lácteos.',
      'Vitamina D: sol con moderación; en la dieta, pescados y huevo.',
      'Magnesio y vitamina K: frutos secos, semillas y verduras de hoja.',
      'Proteína para la matriz ósea: legumbres, frutos secos y huevo.',
    ],
    consejos: [
      'La actividad física con carga (caminar, fuerza) estimula el hueso.',
      'El calcio se aprovecha mejor con suficiente vitamina D.',
      'Ante dudas sobre la densidad ósea, consultá con tu médico.',
    ],
    faq: [
      {
        q: '¿El sésamo aporta tanto calcio como la leche?',
        a: 'Es una buena fuente vegetal de calcio dentro de una dieta variada; las cantidades reales dependen de la porción.',
      },
      {
        q: '¿Necesito suplementar calcio?',
        a: 'Depende de cada persona. Consultá con un profesional antes de suplementar.',
      },
    ],
  },
];

export const useCaseBySlug = (slug: UseCaseSlug): UseCase | undefined =>
  useCases.find((u) => u.slug === slug);
