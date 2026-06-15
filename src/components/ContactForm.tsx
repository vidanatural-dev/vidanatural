'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { site } from '@/lib/site';

type Status = 'idle' | 'error' | 'success';

export function ContactForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ nombre?: string; email?: string; mensaje?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (nombre.trim().length < 2) e.nombre = 'Indicá tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Ingresá un email válido.';
    if (mensaje.trim().length < 10) e.mensaje = 'Contanos un poco más (mínimo 10 caracteres).';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    const subject = encodeURIComponent(`Consulta de ${nombre}`);
    const body = encodeURIComponent(`${mensaje}\n\nDe: ${nombre}\nEmail: ${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="grid place-items-center rounded-lg border border-line bg-surface px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand-deep">
          <Icon name="ShieldCheck" size={28} weight="duotone" />
        </span>
        <p className="mt-4 font-display text-2xl text-ink">Gracias por escribir</p>
        <p className="mt-2 max-w-sm text-ink-soft">
          Recibimos tu mensaje. Te responderemos al correo que indicaste apenas podamos.
        </p>
        <button
          type="button"
          onClick={() => {
            setNombre('');
            setEmail('');
            setMensaje('');
            setStatus('idle');
          }}
          className="btn btn-ghost mt-6 py-2 text-sm"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="nombre" className="text-sm font-medium text-ink">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="rounded-md border border-line-strong bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
          placeholder="Cómo te llamás"
        />
        {errors.nombre && <p className="text-sm text-accent-ink">{errors.nombre}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-line-strong bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
          placeholder="tucorreo@ejemplo.com"
        />
        {errors.email && <p className="text-sm text-accent-ink">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mensaje" className="text-sm font-medium text-ink">Mensaje</label>
        <textarea
          id="mensaje"
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="resize-y rounded-md border border-line-strong bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
          placeholder="Contanos qué producto te gustaría ver o tu consulta sobre el sitio"
        />
        {errors.mensaje && <p className="text-sm text-accent-ink">{errors.mensaje}</p>}
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar mensaje
        <Icon name="ArrowRight" size={18} />
      </button>
    </form>
  );
}
