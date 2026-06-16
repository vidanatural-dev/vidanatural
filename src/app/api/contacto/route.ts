import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Guarda los leads del formulario de contacto en Supabase (tabla materia_leads).
 * Usa la clave anónima desde variables de entorno del servidor (no se expone al cliente).
 * RLS permite solo INSERT; las lecturas quedan restringidas al panel de Supabase.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const nombre = String(b?.nombre ?? '').trim().slice(0, 120);
  const email = String(b?.email ?? '').trim().slice(0, 160);
  const mensaje = String(b?.mensaje ?? '').trim().slice(0, 4000);
  const page = typeof b?.page === 'string' ? b.page.slice(0, 200) : null;

  if (nombre.length < 2 || !EMAIL_RE.test(email) || mensaje.length < 10) {
    return NextResponse.json({ error: 'Revisá los datos del formulario.' }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: 'El formulario no está configurado.' }, { status: 500 });
  }

  const ua = req.headers.get('user-agent')?.slice(0, 300) ?? null;

  try {
    const res = await fetch(`${url}/rest/v1/materia_leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ nombre, email, mensaje, page, user_agent: ua }),
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'No pudimos guardar tu mensaje.' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'No pudimos guardar tu mensaje.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
