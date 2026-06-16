'use client';

import {
  Leaf,
  Lightning,
  ShieldCheck,
  Moon,
  PersonSimpleWalk,
  Brain,
  Plant,
  FlowerLotus,
  Drop,
  Hexagon,
  Waves,
  MagnifyingGlass,
  ArrowRight,
  ArrowUpRight,
  List,
  X,
  CaretDown,
  Warning,
  BookOpen,
  Sparkle,
  Sun,
  BowlFood,
  Clock,
  ForkKnife,
  Fire,
  CookingPot,
  WhatsappLogo,
  Envelope,
  Coffee,
  Cake,
  Cookie,
  Bread,
  Heart,
  Scales,
  Barbell,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react';

const map: Record<string, PhosphorIcon> = {
  Leaf,
  Lightning,
  ShieldCheck,
  Moon,
  PersonSimpleWalk,
  Brain,
  Plant,
  FlowerLotus,
  Drop,
  Hexagon,
  Waves,
  MagnifyingGlass,
  ArrowRight,
  ArrowUpRight,
  List,
  X,
  CaretDown,
  Warning,
  BookOpen,
  Sparkle,
  Sun,
  BowlFood,
  Clock,
  ForkKnife,
  Fire,
  CookingPot,
  WhatsappLogo,
  Envelope,
  Coffee,
  Cake,
  Cookie,
  Bread,
  Heart,
  Scales,
  Barbell,
};

interface IconProps {
  name: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  className?: string;
}

export function Icon({ name, size = 20, weight = 'regular', className }: IconProps) {
  const Cmp = map[name] ?? Leaf;
  return <Cmp size={size} weight={weight} className={className} aria-hidden />;
}
