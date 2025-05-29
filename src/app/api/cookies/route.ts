// app/api/cookies/route.ts

/*
export function GET() {
  const body = JSON.stringify({ message: 'Cookie seteada' });

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'visited=true; Path=/; Max-Age=86400; HttpOnly',
    },
  });
}
*/

import { NextResponse } from 'next/server';

export function GET() {
  const response = NextResponse.json({ message: 'Cookie seteada' });
  response.cookies.set('visited', 'true', {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  return response;
}
