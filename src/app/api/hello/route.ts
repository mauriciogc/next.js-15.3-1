// app/api/hello/route.ts

/* 
export async function GET() {
  return new Response(JSON.stringify({ message: 'Hola mundo desde Next.js' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
*/

import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hola mundo desde Next.js con NextResponse',
  });
}
