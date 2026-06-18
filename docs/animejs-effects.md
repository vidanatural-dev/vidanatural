# Animaciones — Materia Natural

Capa de animaciones implementada sobre el sistema motion/react existente.
Anime.js no se usa directamente; las animaciones usan Web Animations API y helpers propios.

## Arquitectura

```
src/lib/animations/
  config.ts       — Interruptores globales (enabled, floatingElements, mobileAnimations…)
  helpers.ts      — shouldReduceMotion(), isMobile(), constantes EASE y DUR
  counter.ts      — animateCounter() y observeCounter() con IntersectionObserver
  svgPath.ts      — animateUnderline() y observeUnderline() para path SVG
  floating.ts     — floatElement() y floatGroup() con Web Animations API
  pulse.ts        — startPulse() para WhatsApp FAB

src/components/
  AnimatedCounter.tsx    — <AnimatedCounter to={618} suffix=" productos" />
  AnimatedUnderline.tsx  — <AnimatedUnderline>palabra</AnimatedUnderline>
  FloatingLeaves.tsx     — Hojas SVG flotantes en el hero (pointer-events: none)
  HeroEntrance.tsx       — Stagger entrada de hijos directos al montar
```

## Componentes

### AnimatedCounter
Contador que se anima desde 0 hasta `to` cuando entra en viewport (IntersectionObserver).
```tsx
<AnimatedCounter to={618} suffix=" productos" duration={1200} />
```
Sin animación si `prefers-reduced-motion: reduce`.

### AnimatedUnderline
Titulo con subrayado SVG que se dibuja al entrar en viewport.
```tsx
<AnimatedUnderline as="span" className="text-brand">naturales.</AnimatedUnderline>
```

### FloatingLeaves
Hojas SVG sutiles en el fondo del hero. `opacity: 7-13%`, `pointer-events: none`, desactivadas en mobile.
```tsx
<FloatingLeaves />   // solo en hero section
```

### HeroEntrance
Aplica stagger de opacidad + translateY a todos los hijos directos al montar.
```tsx
<HeroEntrance delay={120} stagger={90}>
  <p>Elemento 1</p>
  <p>Elemento 2</p>
</HeroEntrance>
```

## Agregar animación a una sección nueva

```tsx
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';  // motion/react (preferido)
import { AnimatedUnderline } from '@/components/AnimatedUnderline';      // solo para títulos

// Reveal simple
<Reveal delay={0.1}>
  <p>Texto que aparece al scrollear</p>
</Reveal>

// Stagger de lista
<RevealGroup>
  {items.map(item => <RevealItem key={item.id}>{item.name}</RevealItem>)}
</RevealGroup>
```

## Desactivar animaciones

Editar `src/lib/animations/config.ts`:
```ts
export const animConfig = {
  enabled: false,           // apaga todo
  heroAnimations: false,    // solo apaga HeroEntrance
  floatingElements: false,  // apaga FloatingLeaves
  mobileAnimations: 'off',  // 'full' | 'reduced' | 'off'
}
```

## Reduced Motion

Todos los helpers llaman `shouldReduceMotion()` antes de ejecutar.
En CSS: `motion-reduce:` prefix de Tailwind en los componentes que lo necesiten.
MotionConfig `reducedMotion="user"` en layout.tsx cubre motion/react.

## Reglas de performance

- Solo animar `opacity`, `transform`. Nunca `width`, `height`, `top`, `left`.
- IntersectionObserver dispara una sola vez (`triggered = true` + `observer.disconnect()`).
- Loops infinitos usan Web Animations API (no RAF manual). Se cancelan en cleanup.
- FloatingLeaves desactivadas en mobile (`isMobile()` en `floating.ts`).
- AnimatedCounter usa RAF manual pero se limpia en useEffect return.

## Que evitar para no parecer web hecha por IA

- No agregar Reveal en cada elemento de cada sección (ya hay suficientes).
- No animar el navbar en cada scroll — ya tiene transición sticky discreta.
- No usar bounce/elastic. Solo `easeOutExpo` y `easeOutQuart`.
- Counters solo para números reales del catálogo, no inventados.
- FloatingLeaves solo en el hero, no en otras secciones.
