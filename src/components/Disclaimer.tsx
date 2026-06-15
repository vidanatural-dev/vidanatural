import { Icon } from './Icon';

/**
 * Aviso informativo / no médico. Reutilizable en fichas y páginas.
 */
export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <aside
      className={`flex gap-3 rounded-md border border-line bg-surface-2 p-4 text-sm leading-relaxed text-ink-soft ${className}`}
      role="note"
    >
      <span className="mt-0.5 shrink-0 text-brand">
        <Icon name="Warning" size={18} weight="fill" />
      </span>
      <p>
        <strong className="font-semibold text-ink">Contenido informativo.</strong> Esta web no
        ofrece consejo médico ni vende productos. La información no reemplaza la consulta con un
        profesional de la salud. Ante embarazo, lactancia, enfermedades, medicación o dudas,
        consultá siempre con un profesional y seguí las indicaciones del envase.
      </p>
    </aside>
  );
}
