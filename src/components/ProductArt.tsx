import { Icon } from './Icon';

/**
 * Visual generativo por producto (placeholder premium mientras no haya foto real).
 * Construye una "lámina de espécimen" con gradiente tintado por tono (hue) y un
 * glifo botánico de la librería de iconos. Siempre renderiza, nunca se ve roto.
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
        background: `radial-gradient(120% 120% at 25% 15%, oklch(0.93 0.06 ${hue}) 0%, oklch(0.86 0.09 ${hue}) 40%, oklch(0.62 0.11 ${hue}) 100%)`,
      }}
      aria-hidden
    >
      {/* halo suave */}
      <div
        className="animate-float absolute -right-10 -top-12 h-48 w-48 rounded-full blur-2xl"
        style={{ background: `oklch(0.95 0.08 ${hue} / 0.7)` }}
      />
      {/* anillos concéntricos tipo herbario */}
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        <circle cx="100" cy="100" r="78" fill="none" stroke={`oklch(0.35 0.08 ${hue})`} strokeWidth="0.6" />
        <circle cx="100" cy="100" r="58" fill="none" stroke={`oklch(0.35 0.08 ${hue})`} strokeWidth="0.6" />
        <circle cx="100" cy="100" r="38" fill="none" stroke={`oklch(0.35 0.08 ${hue})`} strokeWidth="0.6" />
      </svg>
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ color: `oklch(0.32 0.09 ${hue})` }}
      >
        <Icon name={glyph} size={glyphSize} weight="duotone" />
      </div>
    </div>
  );
}
