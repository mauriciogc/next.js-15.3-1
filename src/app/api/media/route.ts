// src/app/api/media/route.ts
import { getSeries } from '@/services/tmdbService';

/*
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'tv'; // tv o movie

    const results = await getSeries(type);

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error al obtener datos' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
*/

// src/app/api/media/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') || 'tv'; // 'tv' o 'movie'

    const results = await getSeries(type);

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener datos' },
      { status: 500 }
    );
  }
}
