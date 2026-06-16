import { Icon } from './Icon';

/**
 * Visual generativo premium por producto (placeholder mientras no haya foto real).
 * Lámina tipo "espécimen": gradiente con profundidad, brillo diagonal, arcos
 * concéntricos, glifo botánico y borde interior. Siempre renderiza.
 */
export function ProductArt({
  hue,
  glyph = 'Plant',
  className = '',
  glyphSize = 96,
}: {
  hue: number;
  glyph?: string;
  className?: string;
  glyphSize?: number;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(130% 130% at 22% 12%, oklch(0.95 0.05 ${hue}) 0%, oklch(0.88 0.09 ${hue}) 45%, oklch(0.62 0.12 ${hue}) 100%)`,
      }}
      aria-hidden
    >
      {/* segunda capa de color para dar profundidad */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(75% 75% at 85% 92%, oklch(0.72 0.13 ${hue} / 0.5), transparent 60%)` }}
      />
      {/* brillo diagonal sutil */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(120deg, transparent 32%, oklch(1 0 0 / 0.14) 50%, transparent 68%)' }}
      />
      {/* halo flotante */}
      <div
        className="animate-float absolute -right-10 -top-12 h-44 w-44 rounded-full blur-3xl"
        style={{ background: `oklch(0.96 0.07 ${hue} / 0.7)` }}
      />
      {/* arcos concéntricos tipo herbario */}
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="100" r="86" fill="none" stroke={`oklch(0.32 0.08 ${hue})`} strokeWidth="0.5" />
        <circle cx="100" cy="100" r="66" fill="none" stroke={`oklch(0.32 0.08 ${hue})`} strokeWidth="0.5" />
        <circle cx="100" cy="100" r="46" fill="none" stroke={`oklch(0.32 0.08 ${hue})`} strokeWidth="0.5" />
      </svg>
      {/* glifo central */}
      <div className="absolute inset-0 grid place-items-center" style={{ color: `oklch(0.3 0.1 ${hue})` }}>
        <Icon name={glyph} size={glyphSize} weight="duotone" />
      </div>
      {/* borde interior y reflejo superior */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: `inset 0 1px 0 oklch(1 0 0 / 0.45), inset 0 0 0 1px oklch(0.3 0.06 ${hue} / 0.1)` }}
      />
    </div>
  );
}
