import type { UseCase, UseCaseSlug } from './types';

export const useCases: UseCase[] = [
  {
    slug: 'digestion',
    nombre: 'Digestión',
    descripcion: 'Plantas y nutrientes asociados tradicionalmente al confort digestivo y al bienestar después de las comidas.',
    icon: 'Leaf',
    hue: 150,
  },
  {
    slug: 'energia',
    nombre: 'Energía y vitalidad',
    descripcion: 'Alimentos y complementos que se usan popularmente para acompañar etapas de cansancio o mayor desgaste.',
    icon: 'Lightning',
    hue: 75,
  },
  {
    slug: 'defensas',
    nombre: 'Defensas e inmunidad',
    descripcion: 'Productos ricos en nutrientes que forman parte de hábitos para cuidar el organismo, sobre todo en cambios de estación.',
    icon: 'ShieldCheck',
    hue: 28,
  },
  {
    slug: 'descanso',
    nombre: 'Descanso y relax',
    descripcion: 'Plantas y minerales que la tradición vincula con la calma, la relajación y un mejor descanso nocturno.',
    icon: 'Moon',
    hue: 280,
  },
  {
    slug: 'articulaciones',
    nombre: 'Articulaciones y movilidad',
    descripcion: 'Nutrientes que acompañan el cuidado de articulaciones y músculos en personas activas.',
    icon: 'PersonSimpleWalk',
    hue: 200,
  },
  {
    slug: 'mente',
    nombre: 'Mente y concentración',
    descripcion: 'Alimentos asociados al cuidado de la función cognitiva y al equilibrio en épocas de exigencia mental.',
    icon: 'Brain',
    hue: 330,
  },
  {
    slug: 'piel-cabello',
    nombre: 'Piel y cabello',
    descripcion: 'Alimentos que la tradición asocia al cuidado de la piel y el cabello, dentro de una alimentación variada. No son tratamientos.',
    icon: 'Sparkle',
    hue: 25,
  },
  {
    slug: 'circulacion',
    nombre: 'Corazón y circulación',
    descripcion: 'Alimentos que suelen incluirse en hábitos de cuidado cardiovascular, como parte de una dieta equilibrada. No reemplazan indicaciones médicas.',
    icon: 'Heart',
    hue: 0,
  },
  {
    slug: 'control-peso',
    nombre: 'Control de peso',
    descripcion: 'Alimentos que suelen formar parte de planes de alimentación equilibrada. No son productos para adelgazar; consultá con un profesional.',
    icon: 'Scales',
    hue: 200,
  },
  {
    slug: 'huesos',
    nombre: 'Huesos y dientes',
    descripcion: 'Alimentos con nutrientes que acompañan el cuidado de huesos y dientes dentro de una dieta variada.',
    icon: 'Barbell',
    hue: 220,
  },
];

export const useCaseBySlug = (slug: UseCaseSlug): UseCase | undefined =>
  useCases.find((u) => u.slug === slug);
