import { NextResponse } from 'next/server';

export function POST(req: Request) {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Eliminar la cookie de autenticación
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,  // Expira inmediatamente
  });

  return response;
}
