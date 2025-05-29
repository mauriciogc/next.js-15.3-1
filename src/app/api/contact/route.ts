// src/app/api/contact/route.ts

/*
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email || !body.message) {
    return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Aquí podrías guardar en una DB, enviar mail, etc.
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
*/

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email || !body.message) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  // Aquí podrías guardar en una base de datos, enviar correo, etc.
  return NextResponse.json({ success: true });
}
