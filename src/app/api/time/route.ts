// src/app/api/time/route.ts
/*
export async function GET() {
  return new Response(JSON.stringify({ now: new Date().toISOString() }), {
    headers: { 'Content-Type': 'application/json' },
  });
}*/

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ now: new Date().toISOString() });
}
