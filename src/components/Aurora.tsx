/**
 * Fondo animado tipo aurora con tonos de naturaleza. CSS puro, sin estado.
 * Se detiene con prefers-reduced-motion. pointer-events: none.
 */
export function Aurora({ className = '' }: { className?: string }) {
  const blobs = [
    { hue: 150, top: '-10%', left: '-5%', size: 460, delay: '0s', o: 0.5 },
    { hue: 78, top: '0%', left: '55%', size: 380, delay: '-6s', o: 0.4 },
    { hue: 175, top: '40%', left: '20%', size: 420, delay: '-12s', o: 0.32 },
    { hue: 120, top: '30%', left: '78%', size: 340, delay: '-3s', o: 0.36 },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="animate-aurora absolute rounded-full blur-3xl"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            background: `radial-gradient(circle, oklch(0.82 0.13 ${b.hue} / ${b.o}), transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
