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
];

export const useCaseBySlug = (slug: UseCaseSlug): UseCase | undefined =>
  useCases.find((u) => u.slug === slug);
